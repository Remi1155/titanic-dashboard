import React from "react";

interface Passenger {
  PassengerId: number;
  Survived: number;
  Pclass: number;
  Name: string;
  Sex: string;
  Age: number;
  SibSp: number;
  Parch: number;
  Ticket: string;
  Fare: number;
  Cabin: string | null;
  Embarked: string;
}

interface Props {
  passenger: Passenger;
}

const PassengerDetail: React.FC<Props> = ({ passenger }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{passenger.Name}</h2>
      <ul style={styles.list}>
        <li><strong>ID:</strong> {passenger.PassengerId}</li>
        <li><strong>Survived:</strong> {passenger.Survived === 1 ? "Yes" : "No"}</li>
        <li><strong>Class:</strong> {passenger.Pclass}</li>
        <li><strong>Sex:</strong> {passenger.Sex}</li>
        <li><strong>Age:</strong> {passenger.Age}</li>
        <li><strong>Siblings/Spouse aboard:</strong> {passenger.SibSp}</li>
        <li><strong>Parents/Children aboard:</strong> {passenger.Parch}</li>
        <li><strong>Ticket:</strong> {passenger.Ticket}</li>
        <li><strong>Fare:</strong> ${passenger.Fare.toFixed(2)}</li>
        <li><strong>Cabin:</strong> {passenger.Cabin ?? "N/A"}</li>
        <li><strong>Embarked:</strong> {passenger.Embarked}</li>
      </ul>
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
    maxWidth: "500px",
    margin: "20px auto",
    backgroundColor: "#f9f9f9",
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
};

export default PassengerDetail;
