// import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// // Import komponen yang sudah dipisah
// import StorySectionDetail from '../components/StorySectionDetail';
// import MediaSectionDetail from '../components/MediaSectionDetail';
// import ChoiceSectionDetail from '../components/ChoiceSectionDetail';
// import { Header2 } from '../components/Header2';
// import Title from '../components/Title';

// const RecommendationDetail = () => {
//   const { id: sentiment_id } = useParams();
//   const [sentimentDetail, setSentimentDetail] = useState(null);
//   // Simpan semua rekomendasi yang terkait dengan sentiment_id ini
//   // Kita asumsikan API akan mengembalikan rekomendasi yang sudah tersimpan
//   // Misalnya, akan ada properti untuk 'same' dan 'opposite' recommendations
//   const [allStoredRecommendations, setAllStoredRecommendations] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedTab, setSelectedTab] = useState("match"); // 'match' atau 'uplift'
//   const mediaRef = useRef(null); // Ref untuk scrolling

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem('access_token');
//         if (!token) {
//           throw new Error('Access token not found. Please log in.');
//         }

//         // 1. Ambil detail curhatan dari /history/
//         const sentimentRes = await axios.get('http://localhost:8000/history/', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const matchedSentiment = sentimentRes.data.find(item => item.id === parseInt(sentiment_id));

//         if (!matchedSentiment) {
//           setError('Sentimen tidak ditemukan.');
//           setSentimentDetail(null);
//           setLoading(false);
//           return;
//         }
//         setSentimentDetail(matchedSentiment);

//         // 2. Ambil rekomendasi yang sudah tersimpan untuk sentiment_id ini
//         // ✅ PANGGIL ENDPOINT YANG BENAR UNTUK REKOMENDASI HISTORY
//         // Asumsi: Endpoint ini akan mengembalikan data rekomendasi yang terkait dengan sentimen ini
//         // dan mungkin juga mencakup kategori 'same' dan 'opposite' jika itu disimpan.
//         // Jika API Anda hanya mengembalikan satu set rekomendasi per sentiment_id,
//         // kita perlu tahu bagaimana cara membedakan antara "same" dan "opposite" di data tersebut.
//         // Untuk contoh ini, saya akan mengasumsikan API Anda `/recommendations/${sentiment_id}`
//         // akan mengembalikan properti yang membedakan 'same' dan 'opposite' atau mengembalikan
//         // *semua* rekomendasi yang pernah didapatkan untuk curhatan itu.

//         // Jika endpoint /recommendations/{sentiment_id} hanya mengembalikan satu set data,
//         // maka "Stay in the moment" dan "Rise & Recharge" tidak relevan di halaman history ini
//         // kecuali rekomendasi yang tersimpan memang sudah dikategorikan.
//         // Untuk saat ini, saya akan menggunakan API yang Anda berikan di awal:
//         // http://localhost:8000/recommendations/${sentiment_id}
//         // Asumsi: API ini akan mengembalikan daftar rekomendasi yang *tersimpan* untuk sentiment_id tersebut.
//         // Dan kita akan filter atau tampilkan berdasarkan `selectedTab` secara UI.

//         // Saya akan menggunakan properti `label` dari sentimentDetail untuk menentukan kategori "same".
//         // Dan kita perlu mencari cara untuk menentukan kategori "opposite" dari data yang tersimpan.
//         // Ini adalah bagian yang paling menantang tanpa API yang jelas untuk history.

//         // SOLUSI SEMENTARA: Kita akan ambil semua rekomendasi yang terkait dengan sentiment_id.
//         // Lalu, kita akan saring secara frontend berdasarkan `sentimentDetail.label`
//         // untuk "match" dan menggunakan map emosi lawan untuk "uplift".
//         // Ini berarti API /recommendations/{sentiment_id} harus mengembalikan rekomenasi yang cukup untuk keduanya.

//         const recRes = await axios.get(`http://localhost:8000/recommendations/${sentiment_id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // Struktur data yang diharapkan dari /recommendations/${sentiment_id}:
//         // recRes.data = [
//         //   { id: ..., sentiment_id: ..., movie_title: ..., music_track: ..., music_artist: ..., label: "joy" },
//         //   { id: ..., sentiment_id: ..., movie_title: ..., music_track: ..., music_artist: ..., label: "sadness" }, // Jika ada rekomendasi opposite
//         //   ...
//         // ]
//         // Atau:
//         // recRes.data = {
//         //   same_recommendations: [ {movie_title: ..., music_track: ...}],
//         //   opposite_recommendations: [ {movie_title: ..., music_track: ...}],
//         // }

//         // Berdasarkan API awal yang Anda berikan (/recommendations/{sentiment_id}),
//         // saya asumsikan ia mengembalikan daftar RecommendationRecord.
//         // Kita perlu memprosesnya untuk mengelompokkan berdasarkan 'label' (same/opposite).
//         // Jika label tidak ada di RecommendationRecord yang tersimpan, maka ini akan sulit.

//         // Karena `RecommendationRecord` di backend Anda memiliki `sentiment_id` tapi
//         // tidak secara eksplisit `emotion_choice` atau `label` untuk rekomendasi itu sendiri
//         // (melainkan label untuk `sentiment_id`nya), ini adalah tantangannya.

//         // Saya akan mengasumsikan bahwa `recRes.data` adalah *semua* rekomendasi yang pernah
//         // dihasilkan untuk `sentiment_id` ini, dan kita akan mencoba memfilternya
//         // secara frontend berdasarkan `sentimentDetail.label`.
//         // Jika rekomendasi untuk "opposite" tidak tersimpan dengan label yang berbeda,
//         // maka fungsi "Rise & Recharge" tidak akan bekerja dengan benar dari data history ini.

//         // ALTERNATIF PALING MUNGKIN DAN AMAN:
//         // API `/recommendations/{sentiment_id}` seharusnya mengembalikan:
//         // {
//         //    curhatan_detail: { id: ..., text: ..., label: ... },
//         //    recommendations_for_same_mood: [{ movie_title: ..., music_track: ..., music_artist: ... }],
//         //    recommendations_for_opposite_mood: [{ movie_title: ..., music_track: ..., music_artist: ... }]
//         // }
//         // Ini akan sangat memudahkan frontend.

//         // Karena struktur API yang Anda berikan belum sepenuhnya mendukung ini untuk history,
//         // saya akan membuat asumsi minimal dan paling logis berdasarkan data yang ada:
//         // `recRes.data` adalah array dari objek rekomendasi. Kita akan asumsikan
//         // rekomendasi ini awalnya terkait dengan sentimen "same".
//         // Untuk "opposite", kita akan memerlukan data yang secara eksplisit "opposite".

//         // KARENA API AWAL HANYA MENYIMPAN movie_title, music_track, music_artist
//         // tanpa label "same" atau "opposite" di level `RecommendationRecord`
//         // dan `get-recommendations` adalah yang menghasilkan "same" / "opposite" baru,
//         // maka kita perlu **memodifikasi alur ini agar sesuai dengan halaman history**:
//         // Kita akan menggunakan `allStoredRecommendations` untuk menyimpan data mentah dari
//         // `http://localhost:8000/recommendations/${sentiment_id}`.
//         // Dan untuk `selectedTab`, kita akan menggunakan data yang sama.
//         // Jika Anda ingin tombol "Stay in the moment" dan "Rise & Recharge" menampilkan
//         // rekomendasi yang *berbeda* yang *tersimpan* untuk satu _curhatan_ historis,
//         // maka backend perlu menyimpan data `RecommendationRecord` dengan indikator
//         // apakah itu rekomendasi "same" atau "opposite".

//         // Solusi A (Paling Mudah dengan API sekarang): Hanya tampilkan satu set rekomendasi tersimpan.
//         // Tombol "Stay in the moment" dan "Rise & Recharge" tidak akan mengubah data,
//         // hanya mengubah judul di MediaSectionDetail (yang mungkin membingungkan user).

//         // Solusi B (Ideal, membutuhkan backend): API `/recommendations/{sentiment_id}`
//         // akan mengembalikan 2 set rekomendasi yang sudah tersimpan: "same" dan "opposite".

//         // Mari kita coba solusi B dengan simulasi data, lalu Anda bisa bicarakan dengan backend.
//         // Saya akan menggunakan `recRes.data` dari `http://localhost:8000/recommendations/${sentiment_id}`
//         // sebagai rekomendasi *default/match* (misal, yang pertama kali disimpan).
//         // Untuk rekomendasi 'opposite', kita perlu simulasi atau klarifikasi backend.

//         // Untuk menjaga fungsionalitas tombol, saya akan simpan `recRes.data`
//         // sebagai rekomendasi "match" dan membuat data dummy untuk "uplift"
//         // sampai backend mendukung penyimpanan rekomendasi "opposite" untuk history.

//         const processedRecs = {
//           match: recRes.data.map(rec => ({
//             movie_title: rec.movie_title,
//             music_track: rec.music_track,
//             music_artist: rec.music_artist
//           })),
//           // Untuk uplift, kita akan gunakan data dummy atau data yang sama untuk sementara
//           // KECUALI backend bisa menyediakan data rekomendasi 'opposite' yang tersimpan.
//           // Saat ini, backend API /recommendations/{sentiment_id} tidak secara eksplisit
//           // membedakan 'same' dan 'opposite' untuk rekomendasi yang *tersimpan*.
//           // Jadi, untuk page history, jika ingin ada dua tab, data ini harus disediakan BE.
//           // Untuk demo UI, saya akan memakai data yang sama atau dummy.
//           // Lebih baik, ambil 3 data pertama untuk match, 3 data berikutnya untuk opposite, jika ada cukup.
//           uplift: recRes.data.map(rec => ({ // Untuk demo, pakai data yang sama atau data lain jika ada
//             movie_title: rec.movie_title,
//             music_track: rec.music_track,
//             music_artist: rec.music_artist
//           }))
//           // Jika backend Anda menyimpan 'label' di RecommendationRecord, bisa seperti ini:
//           // match: recRes.data.filter(rec => rec.label === matchedSentiment.label).map(...),
//           // uplift: recRes.data.filter(rec => rec.label === opposite_of(matchedSentiment.label)).map(...),
//         };
//         setAllStoredRecommendations(processedRecs); // Simpan kedua set rekomendasi

//         setError(null);
//       } catch (err) {
//         console.error("Error in initial data fetch:", err);
//         setError('Gagal memuat data history: ' + (err.response?.data?.detail || err.message));
//         setSentimentDetail(null);
//         setAllStoredRecommendations(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [sentiment_id]); // Dependensi sentiment_id agar fetch ulang jika ID berubah

//   // --- Handler untuk pilihan tab "Stay in the moment" / "Rise & Recharge" ---
//   const handleSelectChoice = (choice) => {
//     // Di halaman history, kita hanya perlu mengubah tab, tidak perlu panggil API lagi
//     setSelectedTab(choice);
//     // Logika scroll sudah ada di ChoiceSection
//   };

//   // Pilih rekomendasi yang akan ditampilkan berdasarkan selectedTab dari data yang sudah diambil
//   const currentRecommendations = { music: [], movie: [] };
//   if (allStoredRecommendations) {
//       if (selectedTab === "match") {
//           currentRecommendations.music = allStoredRecommendations.match.map(rec => ({ title: rec.music_track, artist: rec.music_artist }));
//           currentRecommendations.movie = allStoredRecommendations.match.map(rec => ({ title: rec.movie_title }));
//       } else if (selectedTab === "uplift") {
//           currentRecommendations.music = allStoredRecommendations.uplift.map(rec => ({ title: rec.music_track, artist: rec.music_artist }));
//           currentRecommendations.movie = allStoredRecommendations.uplift.map(rec => ({ title: rec.movie_title }));
//       }
//   }

//   if (loading) return <p className="text-center mt-10">Memuat rekomendasi...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
//   if (!sentimentDetail)
//     return <p className="text-center mt-10">Detail sentimen tidak ditemukan.</p>;
//   // Jika allStoredRecommendations belum ada setelah loading, mungkin belum ada rekomendasi tersimpan
//   if (!allStoredRecommendations || (currentRecommendations.music.length === 0 && currentRecommendations.movie.length === 0)) {
//       return <p className="text-center mt-10">Belum ada rekomendasi tersimpan untuk sentimen ini.</p>;
//   }


//   return (
//     <main className="overflow-hidden bg-white" style={{ backgroundColor: "#D3E3F3" }}>
//       <div className="flex flex-wrap gap-7 px-20 pb-28 bg-blue-100 max-md:px-5 max-md:pb-24">
//         <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
//           <Header2 />
//           <Title className="self-center ml-11">Based on your story....</Title>

//           <div className="flex flex-col items-center pl-16 mt-20 w-full max-md:pl-5 max-md:mt-10 max-md:max-w-full">
//             <div className="self-stretch max-md:max-w-full">
//               <StorySectionDetail
//                 story={sentimentDetail.text || 'Curhatan tidak tersedia'}
//                 emotion={sentimentDetail.label || 'Tidak diketahui'}
//               />
//             </div>
//             <ChoiceSectionDetail 
//               onSelectChoice={handleSelectChoice}
//               selectedTab={selectedTab}
//               mediaRef={mediaRef}
//             />
//             <MediaSectionDetail
//               selectedTab={selectedTab}
//               music={currentRecommendations.music}
//               movie={currentRecommendations.movie}
//               mediaRef={mediaRef}
//             />
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default RecommendationDetail;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios untuk API call

// Import komponen yang sudah dipisah
import StorySectionDetail from '../components/StorySectionDetail';
import MediaSectionDetail from '../components/MediaSectionDetail';
import { Header2 } from '../components/Header2'; // Asumsi komponen Header2 sudah ada
import Title from '../components/Title'; // Asumsi komponen Title sudah ada

const RecommendationDetail = () => {
  const { id: sentiment_id } = useParams(); // Mengambil ID dari URL
  const [sentimentDetail, setSentimentDetail] = useState(null);
  const [recommendations, setRecommendations] = useState({ music: [], movie: [] }); // Inisialisasi dengan array kosong
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect untuk mengambil data dari API saat komponen dimuat atau sentiment_id berubah
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading ke true saat memulai fetch data
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('Access token not found. Please log in.');
        }

        // ✅ PANGGIL ENDPOINT UNTUK HISTORY CURHATAN
        const sentimentRes = await axios.get('http://localhost:8000/history/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Cari curhatan yang cocok berdasarkan sentiment_id dari URL
        const matchedSentiment = sentimentRes.data.find(item => item.id === parseInt(sentiment_id));

        if (!matchedSentiment) {
          setError('Sentimen tidak ditemukan.');
          setSentimentDetail(null); // Clear sentimentDetail jika tidak ditemukan
          setLoading(false); // Selesai loading meskipun ada error
          return;
        }
        setSentimentDetail(matchedSentiment);

        // ✅ PANGGIL ENDPOINT UNTUK REKOMENDASI HISTORY BERDASARKAN SENTIMENT_ID
        // Ini akan mengambil rekomendasi yang SUDAH TERSIMPAN untuk curhatan ini
        const recRes = await axios.get(`http://localhost:8000/recommendations/${sentiment_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Asumsi: recRes.data adalah array dari objek rekomendasi yang tersimpan
        // Contoh: [{ movie_title: "...", music_track: "...", music_artist: "..." }]
        setRecommendations({
          music: recRes.data.map(rec => ({ title: rec.music_track, artist: rec.music_artist })),
          movie: recRes.data.map(rec => ({ title: rec.movie_title })),
        });

        setError(null); // Reset error jika semua berhasil
      } catch (err) {
        console.error("Error in data fetch:", err);
        setError('Gagal memuat data history: ' + (err.response?.data?.detail || err.message));
        setSentimentDetail(null); // Clear sentimentDetail on error
        setRecommendations({ music: [], movie: [] }); // Clear recommendations on error
      } finally {
        setLoading(false); // Set loading ke false setelah fetch selesai (baik sukses atau error)
      }
    };

    fetchData(); // Panggil fungsi fetchData saat komponen di-mount
  }, [sentiment_id]); // Dependensi sentiment_id, agar data di-fetch ulang jika ID di URL berubah

  // Menampilkan status loading, error, atau jika data tidak ditemukan
  if (loading) return <p className="text-center mt-10">Memuat riwayat rekomendasi...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!sentimentDetail)
    return <p className="text-center mt-10">Detail sentimen tidak ditemukan.</p>;

  // Menampilkan pesan jika tidak ada rekomendasi yang diambil dari API setelah loading
  if (recommendations.music.length === 0 && recommendations.movie.length === 0) {
      return <p className="text-center mt-10">Belum ada rekomendasi tersimpan untuk sentimen ini.</p>;
  }

  return (
    <main className="overflow-hidden bg-white" style={{ backgroundColor: "#D3E3F3" }}>
      <div className="flex flex-wrap gap-7 px-20 pb-28 bg-blue-100 max-md:px-5 max-md:pb-24">
        <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
          <Header2 />
          <Title className="self-center ml-11">Based on your story....</Title>

          <div className="flex flex-col items-center pl-16 mt-20 w-full max-md:pl-5 max-md:mt-10 max-md:max-w-full">
            <div className="self-stretch max-md:max-w-full">
              {/* StorySectionDetail menerima data dari state sentimentDetail */}
              <StorySectionDetail
                story={sentimentDetail.text || 'Curhatan tidak tersedia'}
                emotion={sentimentDetail.label || 'Tidak diketahui'}
              />
            </div>
            {/* MediaSectionDetail menerima data dari state recommendations */}
            <MediaSectionDetail
              music={recommendations.music}
              movie={recommendations.movie}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecommendationDetail;