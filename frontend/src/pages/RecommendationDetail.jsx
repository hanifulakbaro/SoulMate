import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import StorySectionDetail from '../components/StorySectionDetail';
import MediaSection from '../components/MediaSectionDetail';

const RecommendationDetail = () => {
  const { id: sentiment_id } = useParams(); // ubah nama param untuk lebih konsisten
  const [recommendations, setRecommendations] = useState([]);
  const [sentimentDetail, setSentimentDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // ✅ PANGGIL ENDPOINT YANG BENAR UNTUK REKOMENDASI
        const recRes = await axios.get(`http://localhost:8000/recommendations/${sentiment_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setRecommendations(recRes.data);

        // ✅ Ambil data curhatan yang cocok dari /history/
        const sentimentRes = await axios.get('http://localhost:8000/history/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        const matchedSentiment = sentimentRes.data.find(item => item.id === parseInt(sentiment_id));
        setSentimentDetail(matchedSentiment);

        setError(null);
      } catch (err) {
        setError('Gagal mengambil data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sentiment_id]);

  if (loading) return <p className="text-center mt-10">Memuat rekomendasi...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!sentimentDetail)
    return <p className="text-center mt-10">Sentimen tidak ditemukan.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F6F4EB] font-nunito">
      <StorySectionDetail
        story={sentimentDetail.text || 'Curhatan tidak tersedia'}
        emotion={sentimentDetail.label || 'Tidak diketahui'}
      />
      <MediaSection
        music={recommendations.map(rec => ({ title: rec.music_track, artist: rec.music_artist }))}
        movie={recommendations.map(rec => ({ title: rec.movie_title }))}
      />
    </div>
  );
};

export default RecommendationDetail;
