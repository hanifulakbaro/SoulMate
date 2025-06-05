# 💖 SoulMate: Emotion-Based Recommendation App

SoulMate adalah aplikasi yang membantu pengguna mengekspresikan perasaan mereka melalui curhatan, lalu memberikan rekomendasi media (musik & film) yang relevan berdasarkan emosi yang terdeteksi secara otomatis menggunakan machine learning.

---

## 🧠 Fitur Utama

- 📝 Input curhatan bebas dari pengguna
- 🤖 Deteksi emosi otomatis (joy, sadness, anger, fear, love, others)
- 🎧 Rekomendasi musik dan film berdasarkan emosi
- 📈 Visualisasi grafik distribusi emosi mingguan/bulanan
- 🕓 Riwayat curhatan dan rekomendasi
- 🐳 Arsitektur berbasis Docker (frontend, backend, database)

---

## ⚙️ Teknologi yang Digunakan

| Layer      | Teknologi                        |
|------------|----------------------------------|
| Frontend   | React, Tailwind CSS              |
| Backend    | FastAPI, Transformers, PyTorch   |
| Model      | Sentiment classifier (HuggingFace) |
| Database   | PostgreSQL                       |
| Container  | Docker, Docker Compose           |

---

## 🏗️ Arsitektur Sistem (Horizontal)

```text
[ 👤 User ]
    │
    ▼
┌───────────────┐      HTTP/API       ┌────────────────────┐
│ Frontend      ├────────────────────▶│ Backend (FastAPI)  │
│ (React App)   │                    │ + Model Inference  │
└───────────────┘                    └────────┬────────────┘
                                             ▼
                                    ┌──────────────────┐
                                    │ PostgreSQL DB     │
                                    └──────────────────┘
