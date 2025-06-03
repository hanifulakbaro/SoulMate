// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import StorySectionDetail from '../components/StorySectionDetail';
// import MediaSection from '../components/MediaSectionDetail';

// const RecommendationDetail = () => {
//   const { id: sentiment_id } = useParams(); // ubah nama param untuk lebih konsisten
//   const [recommendations, setRecommendations] = useState([]);
//   const [sentimentDetail, setSentimentDetail] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         // ✅ PANGGIL ENDPOINT YANG BENAR UNTUK REKOMENDASI
//         const recRes = await axios.get(`http://localhost:8000/recommendations/${sentiment_id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//           },
//         });
//         setRecommendations(recRes.data);

//         // ✅ Ambil data curhatan yang cocok dari /history/
//         const sentimentRes = await axios.get('http://localhost:8000/history/', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//           },
//         });
//         const matchedSentiment = sentimentRes.data.find(item => item.id === parseInt(sentiment_id));
//         setSentimentDetail(matchedSentiment);

//         setError(null);
//       } catch (err) {
//         setError('Gagal mengambil data: ' + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [sentiment_id]);

//   if (loading) return <p className="text-center mt-10">Memuat rekomendasi...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
//   if (!sentimentDetail)
//     return <p className="text-center mt-10">Sentimen tidak ditemukan.</p>;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[#F6F4EB] font-nunito">
//       <StorySectionDetail
//         story={sentimentDetail.text || 'Curhatan tidak tersedia'}
//         emotion={sentimentDetail.label || 'Tidak diketahui'}
//       />
//       <MediaSection
//         music={recommendations.map(rec => ({ title: rec.music_track, artist: rec.music_artist }))}
//         movie={recommendations.map(rec => ({ title: rec.movie_title }))}
//       />
//     </div>
//   );
// };

// export default RecommendationDetail;

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Import komponen yang sudah dipisah
import StorySectionDetail from '../components/StorySectionDetail';
import MediaSectionDetail from '../components/MediaSectionDetail';
import ChoiceSectionDetail from '../components/ChoiceSectionDetail';
import { Header2 } from '../components/Header2';
import Title from '../components/Title';

const RecommendationDetail = () => {
  const { id: sentiment_id } = useParams();
  const [recommendations, setRecommendations] = useState({ music: [], movie: [] }); // Inisialisasi dengan array kosong
  const [sentimentDetail, setSentimentDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("match"); // State untuk pilihan tab
  const mediaRef = useRef(null); // Ref untuk scrolling

  // --- Fungsi untuk mengambil rekomendasi berdasarkan pilihan tab dan sentiment ID ---
  const fetchRecommendations = async (choice) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Access token not found. Please log in.');
      }

      // *** PENTING: Perhatikan kembali diskusi tentang API backend.
      // API Anda `/get-recommendations/` yang diberikan di awal hanya menerima `emotion_choice`
      // dan mengembalikan rekomendasi berdasarkan *curhatan terakhir*.
      // Untuk halaman history ini, idealnya backend harus menyediakan endpoint
      // yang bisa memberikan rekomendasi (same/opposite) berdasarkan `sentiment_id` tertentu.
      // Contohnya: `/recommendations/${sentiment_id}/choice?emotion_choice=${choice}`
      // Karena belum ada konfirmasi dari backend, saya akan tetap menggunakan API yang ada,
      // tetapi perlu diingat bahwa ini mungkin tidak mengembalikan rekomendasi yang
      // *relevan dengan curhatan historis yang sedang dilihat* jika backend tidak dimodifikasi. ***

      const response = await axios.get(`http://localhost:8000/get-recommendations/?emotion_choice=${choice}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecommendations({
        music: response.data.recommended_music.map(m => ({ title: m.track, artist: m.artist })),
        movie: response.data.recommended_movies.map(m => ({ title: m.title })),
      });
      setError(null);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError('Gagal mengambil rekomendasi: ' + (err.response?.data?.detail || err.message));
      setRecommendations({ music: [], movie: [] });
    } finally {
      setLoading(false);
    }
  };

  // --- useEffect utama untuk mengambil detail sentiment dan memuat rekomendasi awal ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('Access token not found. Please log in.');
        }

        // 1. Ambil detail curhatan dari /history/
        const sentimentRes = await axios.get('http://localhost:8000/history/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const matchedSentiment = sentimentRes.data.find(item => item.id === parseInt(sentiment_id));

        if (matchedSentiment) {
          setSentimentDetail(matchedSentiment);
          // 2. Setelah sentiment detail didapatkan, panggil rekomendasi awal (default "match")
          // Panggil fetchRecommendations dengan pilihan awal "same"
          await fetchRecommendations("same"); // Gunakan await agar state recommendations terisi sebelum render
        } else {
          setError('Sentimen tidak ditemukan.');
          setSentimentDetail(null);
        }
      } catch (err) {
        console.error("Error in initial data fetch:", err);
        setError('Gagal memuat data: ' + (err.response?.data?.detail || err.message));
        setSentimentDetail(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sentiment_id]); // Dependensi sentiment_id agar fetch ulang jika ID berubah

  // --- Handler untuk pilihan tab "Stay in the moment" / "Rise & Recharge" ---
  const handleSelectChoice = (choice) => {
    setSelectedTab(choice);
    // Panggil API rekomendasi sesuai pilihan user
    const emotionChoiceForApi = (choice === "match") ? "same" : "opposite";
    fetchRecommendations(emotionChoiceForApi);
  };


  if (loading) return <p className="text-center mt-10">Memuat rekomendasi...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!sentimentDetail)
    return <p className="text-center mt-10">Detail sentimen tidak ditemukan.</p>;

  return (
    <main className="overflow-hidden bg-white" style={{ backgroundColor: "#D3E3F3" }}>
      <div className="flex flex-wrap gap-7 px-20 pb-28 bg-blue-100 max-md:px-5 max-md:pb-24">
        <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
          <Header2 />
          <Title className="self-center ml-11">Based on your story....</Title>

          <div className="flex flex-col items-center pl-16 mt-20 w-full max-md:pl-5 max-md:mt-10 max-md:max-w-full">
            <div className="self-stretch max-md:max-w-full">
              <StorySectionDetail
                story={sentimentDetail.text || 'Curhatan tidak tersedia'}
                emotion={sentimentDetail.label || 'Tidak diketahui'}
              />
            </div>
            <ChoiceSectionDetail
              onSelectChoice={handleSelectChoice}
              selectedTab={selectedTab}
              mediaRef={mediaRef}
            />
            <MediaSectionDetail
              selectedTab={selectedTab}
              music={recommendations.music}
              movie={recommendations.movie}
              mediaRef={mediaRef}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecommendationDetail;
