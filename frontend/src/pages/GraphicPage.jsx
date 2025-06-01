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
    let most = null;
    let least = null;

    for (const date in data) {
      for (const emotion in data[date]) {
        counts[emotion] = (counts[emotion] || 0) + data[date][emotion].count;

        if (!most || counts[emotion] > counts[most]) {
          most = emotion;
        }
        if (!least || counts[emotion] < counts[least]) {
          least = emotion;
        }
      }
    }

    setEmotionCounts(counts);
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