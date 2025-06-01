import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Title from './Title';
import ChoiceButton from './ChoiceButton';
import MediaSection from './MediaSection';

const ChoiceSection = () => {
  const [selectedTab, setSelectedTab] = useState("match");
  const [mediaData, setMediaData] = useState(null);
  const [cache, setCache] = useState({});
  const [curhatText, setCurhatText] = useState("");
  const mediaRef = useRef(null);

  const fetchCurhat = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await axios.get("http://localhost:8000/get-last-curhatan/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.text;
    } catch (err) {
      console.error("Gagal memuat curhatan:", err);
      return null;
    }
  };

  const fetchRecommendations = async (choice, text) => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/get-recommendations/?emotion_choice=${choice}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedCache = { ...cache };
      updatedCache[text] = {
        ...(updatedCache[text] || {}),
        [choice]: res.data,
      };
      setCache(updatedCache);
      setMediaData(res.data);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    }
  };

  const handleTabClick = async (tab) => {
    const choice = tab === "match" ? "same" : "opposite";
    setSelectedTab(tab);

    const text = await fetchCurhat();
    if (!text) return;

    setCurhatText(text);

    // Cek cache dulu
    if (cache[text]?.[choice]) {
      setMediaData(cache[text][choice]);
    } else {
      fetchRecommendations(choice, text);
    }

    // Scroll to media
    setTimeout(() => {
      mediaRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Initial fetch saat mount (tab default: match/same)
  useEffect(() => {
    const init = async () => {
      const text = await fetchCurhat();
      if (!text) return;
      setCurhatText(text);

      if (cache[text]?.same) {
        setMediaData(cache[text].same);
      } else {
        fetchRecommendations("same", text);
      }
    };
    init();
  }, []);

  return (
    <section className="mt-20 max-md:mt-10" style={{ marginTop: "70px" }}>
      <article
        className="flex flex-col justify-center items-center px-7 py-7 w-full rounded-3xl shadow-[4px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full"
        style={{
          borderRadius: "20px",
          background: "linear-gradient(180deg, white, #D4E3F3)",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "50px",
          height: "200px",
        }}
      >
        <Title className="ml-14">How would you like to feel right now?</Title>

        <div
          className="flex flex-wrap gap-5 justify-between mt-16 ml-14 max-w-full w-[540px] max-md:mt-10"
          style={{ marginLeft: "110px" }}
        >
          <ChoiceButton
            onClick={() => handleTabClick("match")}
            isActive={selectedTab === "match"}
          >
            Stay in the moment
          </ChoiceButton>
          <ChoiceButton
            onClick={() => handleTabClick("lift")}
            isActive={selectedTab === "lift"}
          >
            Rise & Recharge
          </ChoiceButton>
        </div>
      </article>

      <MediaSection
        selectedTab={selectedTab}
        mediaRef={mediaRef}
        mediaData={mediaData}
      />
    </section>
  );
};

export default ChoiceSection;
