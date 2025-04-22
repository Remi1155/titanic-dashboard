const PassengerListStyle = {
  container: {
    position: "absolute" as const,
    top: "10%",
    left: "10%",
    backgroundColor: "#f5f5f5",
    border: "1px solid #ccc",
    padding: "20px",
    width: "80%",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    zIndex: 1000,
    borderRadius: "8px",
  },
  chartContainer: {
    width: "100%",
  },
  closeBtn: {
    position: "absolute" as const,
    top: "8px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "30px",
    cursor: "pointer",
  },
  card: {
    display: "flex",
    gap: "20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    height: "400px",
    overflowY: "auto" as const,
    marginBottom: "1rem",
  },
  listContainer: {
    width: "50%",
    // backgroundColor: "red",
  },
  name: {
    padding: "4px 0",
    cursor: "pointer",
    color: "#007bff",
    textDecoration: "underline",
  },
};

export default PassengerListStyle;
