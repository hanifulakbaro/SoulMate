const MoodButton = ({ children }) => {
  return (
    <span
    style={{
        // backgroundColor: "#00509D",
        color: "#00509D",
        width: "24px",
        height: "2px",
        padding: "20px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "30PX"
    }}
    >
    {children}
    </span>

  );
};

export default MoodButton;
