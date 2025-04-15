import React, { useState } from "react";
import { Passenger } from "../types/titanic";

interface PassengersListProps {
  data: Passenger[];
  visible: boolean;
  // getPassengersSpecificity: () => string;
  onClose: () => void;
}

const PassengersList: React.FC<PassengersListProps> = ({
  data,
  visible,
  // getPassengersSpecificity,
  onClose,
}) => {
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(
    null
  );

  // const passengersSpecificity = getPassengersSpecificity()

  if (!visible) return null;

  return (
    <div style={styles.container}>
      <button onClick={onClose} style={styles.closeBtn}>
        {" "}
        X
      </button>
      <div style={styles.card}>
        <div style={styles.listContainer}>
          <h3>Liste des passagers </h3>
          <ul style={styles.list}>
            {data.map((p) => (
              <li
                key={p.Name}
                style={styles.name}
                onClick={() => setSelectedPassenger(p)}
              >
                {p.Name}
              </li>
            ))}
          </ul>
        </div>

        {selectedPassenger && (
          <div style={styles.details}>
            <h3>{selectedPassenger.Name}</h3>
            <ul style={styles.detailList}>
              <li>
                <strong>Survived:</strong>{" "}
                {selectedPassenger.Survived === 1 ? "Yes" : "No"}
              </li>
              <li>
                <strong>Class:</strong> {selectedPassenger.Pclass}
              </li>
              <li>
                <strong>Sex:</strong> {selectedPassenger.Sex}
              </li>
              <li>
                <strong>Age:</strong> {selectedPassenger.Age ?? "N/A"}
              </li>
              <li>
                <strong>SibSp:</strong> {selectedPassenger.SibSp}
              </li>
              <li>
                <strong>Parch:</strong> {selectedPassenger.Parch}
              </li>
              <li>
                <strong>Ticket:</strong>{" "}
                {selectedPassenger.Ticket ?? "Manquant"}
              </li>
              <li>
                <strong>Fare:</strong> {selectedPassenger.Fare ?? "N/A"}
              </li>
              <li>
                <strong>Cabin:</strong> {selectedPassenger.Cabin ?? "Manquant"}
              </li>
              <li>
                <strong>Embarked:</strong> {selectedPassenger.Embarked ?? "N/A"}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "absolute" as const,
    top: "10%",
    left: "20%",
    backgroundColor: "#f5f5f5",
    border: "1px solid #ccc",
    padding: "20px",
    width: "60%",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    zIndex: 1000,
    borderRadius: "8px",
  },
  listContainer:{
    width: '50%',
    // backgroundColor: "red",
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
    // width: "100%",
  },
  list: {
    listStyle: "none",
    padding: 0,
    height: "400px",
    overflowY: "auto" as const,
    marginBottom: "1rem",
  },
  name: {
    padding: "4px 0",
    cursor: "pointer",
    color: "#007bff",
    textDecoration: "underline",
  },
  details: {
    width: "50%",
  },
  detailList: {
    listStyle: "none",
    padding: 0,
    lineHeight: "1.5",
  },
};

export default PassengersList;
