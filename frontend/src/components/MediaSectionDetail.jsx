// import React from 'react';
// import Title from './Title'; // Import Title karena digunakan di sini

// const MediaSectionDetail = ({ selectedTab, music, movie, mediaRef }) => {
//   return (
//     <section ref={mediaRef} className="mt-[110px] max-md:mt-10">
//       <Title className="ml-8">
//         {selectedTab === "match"
//           ? "Melodies and movies that match your vibes"
//           : "Melodies and movies to make you feel better"}
//       </Title>

//       <div className="mt-6 ml-12 w-full max-w-[764px]">
//         <div className="flex gap-5 max-md:flex-col" style={{marginTop: "-40px"}}>
//           {/* MUSIC */}
//           <div className="relative w-[56%] max-md:w-full">
//             <img
//               src="/music.png"
//               alt="Music recommendation"
//               className="object-contain w-full aspect-[0.78] max-md:mt-10 ml-[-30px]"
//             />
//             <div className="absolute top-[180px] left-[35px] right-5 text-white text-lg font-bold leading-tight z-10 text-center"
//             style={{fontSize: "17px"}}>
//               {Array.isArray(music) && music.length > 0 ? (
//                 music.map((m, i) => (
//                   <div key={i}>
//                     {m.title} - <span className="italic">{m.artist}</span>
//                   </div>
//                 ))
//               ) : (
//                 <div>No music recommendation available</div>
//               )}
//             </div>
//           </div>

//           {/* MOVIES */}
//           <div className="relative w-[44%] max-md:w-full ml-5">
//             <img
//               src="/movie.png"
//               alt="Movie recommendation"
//               className="object-contain w-full aspect-[0.54] max-md:mt-10 ml-[70px] -mt-[138px] mb-[50px]"
//               style={{width: "400px"}}
//             />
//             <div className="absolute top-[200px] left-[125px] w-[320px] text-white text-lg font-bold leading-tight z-10 text-center">
//               {Array.isArray(movie) && movie.length > 0 ? (
//                 movie.map((m, i) => (
//                     <div key={i} style={{marginBottom: "30px", color: "white", fontSize: "17px"}}>
//                         {m.title}</div>))
//               ) : (
//                 <div>No movie recommendation available</div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MediaSectionDetail;

import React from 'react';
import Title from './Title'; // Import Title karena digunakan di sini

const MediaSectionDetail = ({ music, movie }) => {
  return (
    <section className="mt-[110px] max-md:mt-10">
      <Title className="ml-8">Your Past Media Recommendations</Title>

      <div className="mt-6 ml-12 w-full max-w-[764px]">
        <div className="flex gap-5 max-md:flex-col" style={{marginTop: "150px"}}>
          {/* MUSIC */}
          <div className="relative w-[56%] max-md:w-full">
            <img
              src="/playermusic.png" // Pastikan path gambar ini benar di folder public
              alt="Music recommendation"
              className="object-contain w-full aspect-[0.78] max-md:mt-10 ml-[-30px]"
            />
            <div className="absolute top-[140px] left-[25px] right-5 text-white text-lg font-bold leading-tight z-10 text-center"
            style={{fontSize: "17px"}}>
              {Array.isArray(music) && music.length > 0 ? (
                music.map((m, i) => (
                  <div key={i}>
                    {m.title} - <span className="italic">{m.artist}</span>
                  </div>
                ))
              ) : (
                <div>No music recommendation available</div>
              )}
            </div>
          </div>

          {/* MOVIES */}
          <div className="relative w-[44%] max-md:w-full ml-5">
            <img
              src="/clappermovie.png" // Pastikan path gambar ini benar di folder public
              alt="Movie recommendation"
              className="object-contain w-full aspect-[0.54] max-md:mt-10 ml-[70px] -mt-[138px] mb-[50px]"
              style={{width: "400px"}}
            />
            <div className="absolute top-[150px] left-[125px] w-[300px] text-white text-lg font-bold leading-tight z-10 text-center">
              {Array.isArray(movie) && movie.length > 0 ? (
                movie.map((m, i) => (
                    <div key={i} style={{marginBottom: "20px", fontSize: "19px"}}>
                        {m.title}</div>))
              ) : (
                <div>No movie recommendation available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSectionDetail;