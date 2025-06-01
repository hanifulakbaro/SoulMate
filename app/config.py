from dotenv import load_dotenv
import os

load_dotenv() # Memuat variabel dari .env ke dalam lingkungan

class Settings:
    def __init__(self):
        self.DATABASE_URL: str = os.getenv("DATABASE_URL")
        self.MODEL_PATH: str = os.getenv("MODEL_PATH")
        self.SECRET_KEY: str = os.getenv("SECRET_KEY")
        self.ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
        self.ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
        required_vars = {
            "DATABASE_URL": self.DATABASE_URL,
            "MODEL_PATH": self.MODEL_PATH,
            "SECRET_KEY": self.SECRET_KEY,
            }
        
        
        for var, value in required_vars.items():
            if not value:
                raise ValueError(f"{var} must be set in .env")

settings = Settings()