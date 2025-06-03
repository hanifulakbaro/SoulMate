import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const HistoryBubble = ({ id, story, timestamp }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recommendation/${id}`); // navigasi ke detail rekomendasi
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-[1114px] h-[120px] flex items-center cursor-pointer"
    >
      {/* Perbaiki path image: /public tidak perlu */}
      <img
        src="bubble3.png"
        alt="History bubble"
        className="absolute inset-0 w-full h-full object-contain"
        style={{ marginTop: "-240px" }}
      />
      
      {/* Teks curhatan */}
      <p
        className="absolute left-[72px] top-[47px] text-[#ABA8A8] font-nunito font-bold text-[17px]"
        style={{ marginLeft: "20px", marginTop: "-140px", maxWidth: "70%" }}
      >
        {story.length > 40 ? story.slice(0, 40) + '...' : story}
      </p>

      {/* Tanggal dan waktu */}
      <p
        className="absolute right-[72px] bottom-[20px] text-[#ABA8A8] font-nunito font-bold text-[15px]"
        style={{ marginBottom: "125px" }}
      >
        {moment(timestamp).format("HH:mm, DD/MM/YY")}
      </p>
    </div>
  );
};

export default HistoryBubble;
