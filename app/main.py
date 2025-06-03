from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
import random
from typing import List

import sentiment
from database import get_db
from models import User, SentimentRecord, Movie, Music, RecommendationRecord
from schemas import (
    TextRequest,
    AnalysisResult,
    UserCreate,
    UserLogin,
    UserOut,
    RecommendationResponse,
    RecommendationHistory,
    Token,
    TokenData,
    SentimentSchema
)
from security import (
    get_password_hash,
    verify_password,
    create_access_token,
    get_current_user
)
from config import settings

app = FastAPI()

# Add CORS middleware to handle OPTIONS requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# AUTH (Dengan Autentikasi JWT)
# -------------------------------

@app.post("/signup", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user_by_username = db.query(User).filter(User.username == user.username).first()
    if db_user_by_username:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")

    db_user_by_email = db.query(User).filter(User.email == user.email).first()
    if db_user_by_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    hashed_password = get_password_hash(user.password)

    try:
        new_user = User(username=user.username, email=user.email, hashed_password=hashed_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to create user: {str(e)}")

@app.post("/token", response_model=Token)
async def login_for_access_token(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == user_credentials.username).first()

    if not user or not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password", headers={"WWW-Authenticate": "Bearer"})

    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me/", response_model=UserOut)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

# -------------------------------
# SIMPAN CURHATAN (Dilindungi)
# -------------------------------

@app.post("/submit-curhatan/", response_model=SentimentSchema)
async def submit_curhatan(request: TextRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user_id = current_user.id
    try:
        emotion = sentiment.predict_emotion(request.text).lower()

        sentiment_record = SentimentRecord(
            text=request.text,
            label=emotion,
            user_id=user_id
        )
        db.add(sentiment_record)
        db.commit()
        db.refresh(sentiment_record)

        return sentiment_record

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to save curhatan: {str(e)}")


@app.get("/get-last-curhatan/", response_model=SentimentSchema)
async def get_last_curhatan(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    last_sentiment = (
        db.query(SentimentRecord)
        .filter(SentimentRecord.user_id == current_user.id)
        .order_by(SentimentRecord.created_at.desc())
        .first()
    )

    if not last_sentiment:
        raise HTTPException(status_code=404, detail="No curhatan found.")

    return last_sentiment


# -------------------------------
# REKOMENDASI (Dilindungi)
# -------------------------------

@app.get("/get-recommendations/", response_model=RecommendationResponse)
async def get_recommendations(
    emotion_choice: str = "same",  # "same" atau "opposite"
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user_id = current_user.id

    # Ambil curhatan terakhir
    last_sentiment = db.query(SentimentRecord).filter(
        SentimentRecord.user_id == user_id
    ).order_by(SentimentRecord.created_at.desc()).first()

    if not last_sentiment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No sentiment found for user.")

    original_emotion = last_sentiment.label

    # Peta emosi lawan
    opposite_emotion_map = {
        "joy": "sadness",
        "love": "anger",
        "anger": "love",
        "fear": "joy",
        "sadness": "love",
        "others": "joy"
    }

    # Tentukan emosi target (kalau opposite)
    target_emotion = (
        opposite_emotion_map.get(original_emotion, original_emotion)
        if emotion_choice == "opposite"
        else original_emotion
    )

    # Atur label musik: kalau target_emotion == "love", pakai joy
    music_label = "joy" if target_emotion == "love" else target_emotion

    # Ambil data movie dan music
    movies = db.query(Movie).filter(func.lower(Movie.label) == target_emotion).all()
    music_tracks = db.query(Music).filter(func.lower(Music.label) == music_label).all()

    if not movies or not music_tracks:
        raise HTTPException(status_code=404, detail="Not enough data for recommendation.")

    # Ambil 3 sample
    sample_size = min(3, len(movies), len(music_tracks))
    selected_movies = random.sample(movies, sample_size)
    selected_tracks = random.sample(music_tracks, sample_size)

    # Buat response list
    recommended_movies = [{"title": movie.title} for movie in selected_movies]
    recommended_music = [{"track": track.track, "artist": track.artist} for track in selected_tracks]

    # Simpan ke DB
    for movie, track in zip(selected_movies, selected_tracks):
        rec = RecommendationRecord(
            user_id=user_id,
            sentiment_id=last_sentiment.id,
            movie_title=movie.title,
            music_track=track.track,
            music_artist=track.artist
        )
        db.add(rec)

    db.commit()

    # label untuk response disesuaikan dengan pilihan emosi
    label_for_response = original_emotion if emotion_choice == "same" else target_emotion

    return {
        "label": label_for_response,
        "music_label_used": music_label,
        "recommended_movies": recommended_movies,
        "recommended_music": recommended_music
    }





# -------------------------------
# HISTORY (Dilindungi)
# -------------------------------

@app.get("/history/", response_model=List[AnalysisResult])
async def get_user_history(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user_id = current_user.id
    records = db.query(SentimentRecord)\
                .filter(SentimentRecord.user_id == user_id)\
                .order_by(SentimentRecord.created_at.desc())\
                .offset(skip)\
                .limit(limit)\
                .all()
    
    return records

@app.get("/recommendations/{sentiment_id}", response_model=list[RecommendationHistory])
async def get_recommendations_by_sentiment(
    sentiment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # Pastikan autentikasi pengguna
):
    recommendations = db.query(RecommendationRecord).filter(
        RecommendationRecord.sentiment_id == sentiment_id,
        RecommendationRecord.user_id == current_user.id  # Memastikan hanya rekomendasi milik pengguna
    ).all()

    if not recommendations:
        raise HTTPException(status_code=404, detail="No recommendations found for this sentiment")

    return [RecommendationHistory.from_orm(rec) for rec in recommendations]

# -------------------------------
# STATISTIK EMOSI (Dilindungi)
# -------------------------------

@app.get("/sentiment-stats/")
async def sentiment_statistics(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user_id = current_user.id
    stats = (
        db.query(SentimentRecord.label, func.count(SentimentRecord.label))
        .filter(SentimentRecord.user_id == user_id)
        .group_by(SentimentRecord.label)
        .all()
    )
    
    return {label: count for label, count in stats}

@app.get("/sentiment-chart-detailed/")
async def sentiment_chart_detailed(days: int = 7, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user_id = current_user.id
    date_threshold = datetime.utcnow() - timedelta(days=days)
    records = (
        db.query(SentimentRecord)
        .filter(SentimentRecord.user_id == user_id)
        .filter(SentimentRecord.created_at >= date_threshold)
        .order_by(SentimentRecord.created_at)
        .all()
    )
    
    result = {}
    for record in records:
        date_str = record.created_at.date().isoformat()
        if date_str not in result:
            result[date_str] = {}
        if record.label not in result[date_str]:
            result[date_str][record.label] = {"count": 0, "texts": []}
        result[date_str][record.label]["count"] += 1
        result[date_str][record.label]["texts"].append(record.text)

    return result