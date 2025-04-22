import React from "react";
import { Passenger } from "../types/titanic";
import PassengerDetailStyle from "../styles/PassengerDetail";

interface PassengerDetailProps {
  passenger: Passenger;
  isOpen: boolean;
  onClose: () => void;
}

const PassengerDetail: React.FC<PassengerDetailProps> = ({
  passenger,
  isOpen,
  onClose,
}) => {
  const styles = PassengerDetailStyle;

  if (!isOpen) {
    return;
  }

  return (
    <div style={styles.container}>
      <button onClick={() => onClose()} style={styles.closeBtn}><div>&times;</div></button>
      <h2 style={styles.title}>{passenger.Name}</h2>
      <ul style={styles.list}>
        {/* <li><strong>ID:</strong> {passenger.PassengerId}</li> */}
        <li>
          <strong>Survived:</strong> {passenger.Survived === 1 ? "Yes" : "No"}
        </li>
        <li>
          <strong>Class:</strong> {passenger.Pclass}
        </li>
        <li>
          <strong>Sex:</strong> {passenger.Sex}
        </li>
        <li>
          <strong>Age:</strong> {passenger.Age}
        </li>
        <li>
          <strong>Siblings/Spouse aboard:</strong> {passenger.SibSp}
        </li>
        <li>
          <strong>Parents/Children aboard:</strong> {passenger.Parch}
        </li>
        <li>
          <strong>Ticket:</strong> {passenger.Ticket}
        </li>
        <li>
          <strong>Fare:</strong>{" "}
          {passenger.Fare ? "$" + passenger.Fare.toFixed(2) : "Manquant"}
        </li>
        <li>
          <strong>Cabin:</strong> {passenger.Cabin ?? "N/A"}
        </li>
        <li>
          <strong>Embarked:</strong> {passenger.Embarked}
        </li>
      </ul>
    </div>
  );
};

export default PassengerDetail;
