const PassengerDetailStyle = {
  container: {
    // width: "30%",
    position: "absolute",
    right: "150px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
    maxWidth: "500px",
    margin: "20px auto",
    backgroundColor: "#f1f1f1",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "16px",
    fontSize: "1.5rem",
    textAlign: "center" as const,
    color: "#333",
  },
  list: {
    listStyle: "none",
    paddingLeft: 0,
    lineHeight: "1.6",
    color: "#555",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    fontSize: "30px",
    cursor: "pointer",
  },
};

export default PassengerDetailStyle;
