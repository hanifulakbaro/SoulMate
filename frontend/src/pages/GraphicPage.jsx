import React, { useEffect, useState } from "react";
import { Header2 } from "../components/Header2";
import Filter from "../components/Filter";
import EmotionFrequency from "../components/EmotionFrequency";
import EmotionSummary from "../components/EmotionSummary";

function Graph() {
  const [filter, setFilter] = useState({ type: "week" });
  const [sentimentData, setSentimentData] = useState({});
  const [emotionCounts, setEmotionCounts] = useState({});
  const [mostFrequent, setMostFrequent] = useState(null);
  const [leastFrequent, setLeastFrequent] = useState(null);

  useEffect(() => {
    const fetchSentimentData = async () => {
      const token = localStorage.getItem("access_token");
      const days = filter.type === "week" ? 7 : filter.type === "month" ? 30 : 0;

      try {
        const response = await fetch(`http://localhost:8000/sentiment-chart-detailed/?days=${days}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Data received:", data);
          setSentimentData(data);
          processEmotionData(data);
        } else {
          const errorMessage = await response.text();
          console.error("Failed to fetch sentiment data:", response.status, response.statusText, errorMessage);
        }
      } catch (error) {
        console.error("Error fetching sentiment data:", error);
      }
    };

    fetchSentimentData();
  }, [filter]);

  const processEmotionData = (data) => {
    const counts = {};

    // Step 1: Kumpulkan semua hitungan emosi dari data
    for (const date in data) {
      for (const emotion in data[date]) {
        counts[emotion] = (counts[emotion] || 0) + data[date][emotion].count;
      }
    }

    // Step 2: Temukan emosi paling sering dan paling jarang dari 'counts' yang sudah lengkap
    let most = null;
    let least = null;
    let minCount = Infinity; // Inisialisasi dengan nilai sangat besar
    let maxCount = -Infinity; // Inisialisasi dengan nilai sangat kecil

    // Iterasi melalui semua emosi yang terhitung
    for (const emotion in counts) {
      const currentCount = counts[emotion];

      // Temukan yang paling sering
      if (currentCount > maxCount) {
        maxCount = currentCount;
        most = emotion;
      }

      // Temukan yang paling jarang
      if (currentCount < minCount) {
        minCount = currentCount;
        least = emotion;
      }
    }

    // *Penting:* Jika ada emosi yang tidak muncul sama sekali di data (count 0),
    // tapi ingin dihitung sebagai "paling jarang", Anda perlu memastikan
    // counts juga mencakup emosi dengan count 0 yang tidak ada di data API.
    // Misalnya, inisialisasi semua emosi ke 0 terlebih dahulu:
    const allEmotions = ["joy", "sadness", "anger", "fear", "love"]; // Daftar semua emosi yang mungkin
    const finalCounts = {};
    allEmotions.forEach(emotion => {
      finalCounts[emotion] = counts[emotion] || 0; // Ambil dari hasil hitungan atau 0 jika tidak ada
    });

    // Ulangi pencarian most/least dari finalCounts yang sudah lengkap
    most = null;
    least = null;
    minCount = Infinity;
    maxCount = -Infinity;

    for (const emotion in finalCounts) {
      const currentCount = finalCounts[emotion];

      if (currentCount > maxCount) {
        maxCount = currentCount;
        most = emotion;
      }

      if (currentCount < minCount) {
        minCount = currentCount;
        least = emotion;
      }
    }


    setEmotionCounts(finalCounts); // Pastikan emotionCounts menyimpan semua emosi, termasuk yang 0
    setMostFrequent(most);
    setLeastFrequent(least);
  };

  return (
    <main className="overflow-hidden bg-white">
      <section className="flex flex-col px-20 pb-36 w-full min-h-screen bg-blue-100 max-md:px-5 max-md:pb-24 max-md:max-w-full" style={{ background: "#D3E3F3" }}>
        <Header2 />
        <h1 className="self-center mt-5 text-5xl font-bold text-center text-sky-700 max-md:max-w-full max-md:text-4xl" style={{ color: "#00509D", marginTop: "8px", marginBottom: "80px" }}>
          Let's see what you've been through
        </h1>

        <Filter onChange={setFilter} />

        <div className="self-center mt-7 -mb-7 w-full max-w-[1242px] max-md:mb-2.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-[56%] max-md:ml-0 max-md:w-full">
              <EmotionFrequency sentimentData={sentimentData} />
            </div>
            <div className="ml-5 w-[44%] max-md:ml-0 max-md:w-full">
              <EmotionSummary 
                emotionCounts={emotionCounts} 
                mostFrequent={mostFrequent} 
                leastFrequent={leastFrequent} 
                timeUnit={filter.type} 
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Graph;