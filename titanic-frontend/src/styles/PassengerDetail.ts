const PassengerDetailStyle = {
  container: {
    position: "absolute",
    right: "150px",
    border: "1px solid #444",
    borderRadius: "12px",
    padding: "20px",
    maxWidth: "500px",
    margin: "20px auto",
    backgroundColor: "#2a2a2a",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.6)",
    fontFamily: "Segoe UI, sans-serif",
    color: "#f0f0f0",
  },
  title: {
    marginBottom: "16px",
    fontSize: "1.7rem",
    textAlign: "center" as const,
    color: "#00ffaa", // vert-bleu clair
  },
  list: {
    listStyle: "none",
    paddingLeft: 0,
    lineHeight: "1.6",
    color: "#dddddd",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    fontSize: "30px",
    cursor: "pointer",
    color: "#ff5555",
  },
  containerCloseBtn:{
    display: "flex",
    justifyContent: "end"
  }
};

export default PassengerDetailStyle;
