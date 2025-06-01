const Title = ({ children, className = "" }) => {
  return (
    <h2 className={`text-5xl font-bold text-center text-sky-700 max-md:text-4xl ${className}`}
    style={{marginTop: "0px"}}>
      {children}
    </h2>
  );
};

export default Title;
