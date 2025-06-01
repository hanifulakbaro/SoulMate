"use client";
import React, { useEffect, useState } from "react";
import { Header2 } from "../components/Header2";
import PageTitle from "../components/PageTitle";
import HistoryBubble from "../components/HistoryBubble";

const History = () => {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://localhost:8000/history/?skip=0&limit=1000", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Gagal mengambil data history");
        }

        const data = await res.json();
        setHistories(data);
      } catch (err) {
        console.error("Error fetching user history:", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <main
      className="relative mx-auto w-full max-w-none bg-blue-100 min-h-[1024px] max-md:p-5 max-md:max-w-[991px] max-sm:max-w-screen-sm"
      style={{ backgroundColor: "#D3E3F3" }}
    >
      <Header2 />
      <PageTitle />
      <section className="relative left-[145px] top-[235px] w-[1114px] max-md:static max-md:left-0 max-md:px-5 max-md:py-0 max-md:w-full max-sm:px-4 max-sm:py-0">
        <div className="flex flex-col gap-5">
          {histories.map((item) => (
            <HistoryBubble
              key={item.id}
              id={item.id}
              story={item.text}
              timestamp={item.created_at}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default History;
