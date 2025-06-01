from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
import os
from app.config import settings

model_path = settings.MODEL_PATH
model = AutoModelForSequenceClassification.from_pretrained(model_path, num_labels=6)
tokenizer = AutoTokenizer.from_pretrained(model_path)

# Pastikan ini cocok dengan label saat training
labels = ["sadness","joy", "love", "anger", "fear", "others"]

def predict_emotion(text: str) -> str:
    if not text.strip():
        return "others"  # Atau bisa raise error
    inputs = tokenizer(text, return_tensors="pt", truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
        pred = torch.argmax(outputs.logits, dim=1)
    return labels[pred.item()]