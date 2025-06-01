from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean # <<< TAMBAHKAN Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False) # <<< TAMBAHKAN KOLOM EMAIL
    hashed_password = Column(String, nullable=False) # <<< GANTI DARI 'password' KE 'hashed_password'
    is_active = Column(Boolean, default=True) # <<< OPSIONAL: TAMBAHKAN KOLOM is_active

    sentiments = relationship("SentimentRecord", back_populates="user", cascade="all, delete-orphan")
    recommendations = relationship("RecommendationRecord", back_populates="user", cascade="all, delete-orphan")

class SentimentRecord(Base):
    __tablename__ = "sentiments"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    label = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="sentiments")
    recommendations = relationship("RecommendationRecord", back_populates="sentiment", cascade="all, delete-orphan")

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    label = Column(String, index=True, nullable=False)

class Music(Base):
    __tablename__ = "music"

    id = Column(Integer, primary_key=True, index=True)
    track = Column(String, index=True, nullable=False)
    artist = Column(String, nullable=False)
    label = Column(String, index=True, nullable=False)

class RecommendationRecord(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    sentiment_id = Column(Integer, ForeignKey("sentiments.id"), nullable=False)
    movie_title = Column(String, nullable=True)
    music_track = Column(String, nullable=True)
    music_artist = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="recommendations")
    sentiment = relationship("SentimentRecord", back_populates="recommendations")