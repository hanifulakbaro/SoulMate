import React from 'react';
import Title from './Title';

const MediaSection = ({ selectedTab, mediaRef, mediaData }) => {
  const musicList = mediaData?.recommended_music || [];
  const movieList = mediaData?.recommended_movies || [];
  const loading = !mediaData;

  return (
    <section ref={mediaRef} className="mt-20 max-md:mt-10" style={{ marginTop: "110px" }}>
      <Title className="ml-8">
        {selectedTab === "match"
          ? "Melodies and movies that match your vibes"
          : "Melodies and movies to make you feel better"}
      </Title>

      <div className="mt-6 ml-12 max-w-full w-[764px]">
        <div className="flex gap-5 max-md:flex-col">
          {loading ? (
            <p className="text-center text-gray-600">Loading recommendations...</p>
          ) : (
            <>
              {/* Music */}
              <div className="w-[56%] max-md:w-full relative">
                <img
                  src="/playermusic.png"
                  alt="Music recommendation"
                  className="object-contain grow mt-14 w-full rounded-none aspect-[0.78] max-md:mt-10"
                  style={{ marginTop: "20px", marginLeft: "-30px" }}
                />

                {/* Teks berada di atas gambar */}
                <div
                  className="absolute text-white text-lg font-bold leading-tight"
                  style={{
                    top: "90px", // Geser ke bawah agar masuk layar player
                    left: "20px",
                    right: "20px", // Agar teks tidak terlalu lebar
                    zIndex: 10,
                  }}
                >
                  {musicList.length > 0 ? (
                    musicList.map((m, i) => (
                      <div key={i}>
                        {m.track} - <span className="italic">{m.artist}</span>
                      </div>
                    ))
                  ) : (
                    <div>No music recommendation</div>
                  )}
                </div>
              </div>



              {/* Movies */}
              <div className="ml-5 w-[44%] max-md:w-full relative">
                <p
                  className="absolute text-white text-lg font-bold w-[300px]"
                  style={{ marginTop: "300px", marginLeft: "100px" }}
                >
                  {movieList.length > 0
                    ? movieList.map((m, i) => <div key={i}>{m.title}</div>)
                    : "No movie recommendation"}
                </p>
                <img
                  src="/clappermovie.png"
                  alt="Movie recommendation"
                  className="object-contain grow w-full rounded-none aspect-[0.54] max-md:mt-10"
                  style={{ marginTop: "-30px", marginLeft: "70px", marginBottom: "50px" }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
