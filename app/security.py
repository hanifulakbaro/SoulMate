# app/security.py

from datetime import datetime, timedelta
from typing import Optional

from jose import JWTError, jwt
from passlib.context import CryptContext

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import get_db # Pastikan path ini benar
from models import User # Pastikan path ini benar
from config import settings # <<< IMPORT SETTINGS

# Konfigurasi Hashing Password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Konfigurasi JWT - Ambil dari settings
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

# tokenUrl="/token" adalah endpoint yang akan menerima kredensial login dan memberikan token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Memverifikasi apakah password biasa cocok dengan password yang di-hash.
    """
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """
    Menghasilkan hash dari sebuah password.
    """
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Membuat token akses JWT.

    Args:
        data (dict): Data yang akan dienkode ke dalam token (misalnya, {"sub": "username"}).
        expires_delta (Optional[timedelta]): Waktu kadaluarsa token. Jika None, menggunakan ACCESS_TOKEN_EXPIRE_MINUTES.

    Returns:
        str: Token JWT yang telah dibuat.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    """
    Mendapatkan pengguna saat ini dari token JWT yang diberikan.
    Digunakan sebagai dependency untuk melindungi endpoint.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    # Query database untuk menemukan pengguna berdasarkan username (atau email, tergantung apa yang Anda masukkan di 'sub')
    user = db.query(User).filter(User.username == username).first() # Atau User.email == username jika Anda menggunakan email untuk 'sub'
    
    if user is None:
        raise credentials_exception
    
    if not user.is_active: # Cek apakah user aktif
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")

    return user