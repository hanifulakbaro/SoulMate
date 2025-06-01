const ChoiceButton = ({ children, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 pt-3 pb-6 text-3xl font-bold rounded-3xl transition-colors duration-200 max-md:pr-5 ${
        isActive
          ? "bg-sky-700 text-white"
          : "bg-white text-sky-700 border border-sky-700 hover:bg-sky-50"
      }`}
      style={{
        marginLeft: "-25px",
        marginRight: "85px",
        backgroundColor: isActive ? "#00509D" : "#ffffff",
        color: isActive ? "white" : "#00509D",
      }}
    >
      {children}
    </button>
  );
};

export default ChoiceButton;
