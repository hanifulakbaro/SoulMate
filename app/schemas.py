from pydantic import BaseModel, EmailStr # <<< TAMBAHKAN EmailStr
from typing import List, Optional # <<< TAMBAHKAN Optional
from datetime import datetime

# === User Schemas ===
class UserBase(BaseModel):
    username: str
    email: EmailStr # <<< TAMBAHKAN KOLOM EMAIL DENGAN VALIDASI EMAIL

class UserCreate(UserBase):
    password: str # Ini adalah password plain text yang akan di-hash saat pendaftaran

class UserLogin(BaseModel): # <<< UBAH INI: Tidak perlu mewarisi UserBase karena hanya untuk login
    username: str # Atau Anda bisa pakai email: EmailStr
    password: str

class UserOut(UserBase):
    id: int
    is_active: bool # <<< TAMBAHKAN is_active jika Anda menambahkannya di model

    class Config:
        from_attributes = True

# Skema untuk Token JWT
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel): # Skema untuk payload token (misalnya, untuk mengambil username dari token)
    username: Optional[str] = None # Sesuaikan dengan 'sub' di JWT, bisa username atau email

# === Sentiment Schemas ===
class TextRequest(BaseModel):
    text: str

class SentimentSchema(BaseModel):
    id: int
    text: str
    label: str
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class AnalysisResult(BaseModel):
    id: int
    text: str
    label: str
    created_at: datetime

    class Config:
        from_attributes = True

# === Movie & Music Schemas ===
class MovieOut(BaseModel):
    title: str

    class Config:
        from_attributes = True

class MusicOut(BaseModel):
    track: str
    artist: str

    class Config:
        from_attributes = True

# === Recommendation Schemas ===
class RecommendationResponse(BaseModel):
    label: str
    music_label_used: str
    recommended_movies: List[MovieOut]
    recommended_music: List[MusicOut]

class RecommendationHistory(BaseModel):
    id: int
    user_id: int  # Menambahkan user_id
    sentiment_id: int  # Menambahkan sentiment_id
    movie_title: Optional[str]  # Jika movie_title bisa null
    music_track: Optional[str]   # Jika music_track bisa null
    music_artist: Optional[str]  # Jika music_artist bisa null
    created_at: datetime

    class Config:
        orm_mode = True  # Agar dapat bekerja dengan ORM
        from_attributes = True  # Mengizinkan penggunaan dari atribut ORM