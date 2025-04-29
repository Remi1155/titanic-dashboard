const PassengerListStyle = {
  container: {
    position: "absolute" as const,
    top: "10%",
    left: "10%",
    backgroundColor: "#1f1f1f", // fond sombre
    border: "1px solid #444",
    padding: "20px",
    width: "80%",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
    zIndex: 1000,
    borderRadius: "10px",
    color: "#f0f0f0",
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
    fontSize: "28px",
    cursor: "pointer",
    color: "#ff5555", // rouge doux pour le bouton de fermeture
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
  },
  name: {
    padding: "4px 0",
    cursor: "pointer",
    color: "#00bfff", // bleu clair
    textDecoration: "underline",
    transition: "color 0.3s",
  },
  tooltip: {
    contentStyle: {
      backgroundColor: "#ffffff",
      border: "1px solid #ccc",
      borderRadius: "8px",
      color: "#333",
      fontSize: "0.9rem",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    itemStyle: {
      color: "#333",
    },
    labelStyle: {
      color: "#555",
      fontWeight: "bold",
    },
  },
};

export default PassengerListStyle;
