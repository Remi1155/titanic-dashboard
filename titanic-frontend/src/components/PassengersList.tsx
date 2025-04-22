import React, { useState } from "react";
import { Passenger } from "../types/titanic";
import PassengerDetail from "./PassengerDetail";
import PassengerListStyle from "../styles/PassengerList";

interface PassengersListProps {
  data: Passenger[];
  visible: boolean;
  onClose: () => void;
}

const PassengersList: React.FC<PassengersListProps> = ({
  data,
  visible,
  onClose,
}) => {
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(
    null
  );
  const [isPassengerDetailOpen, setIsPassengerDetailOpen] =
    useState<boolean>(true);
  const styles = PassengerListStyle;

  if (!visible) return null;

  return (
    <div style={styles.container}>
      <button onClick={onClose} style={styles.closeBtn}>
        {" "}
        <div>&times;</div>
      </button>
      <div style={styles.card}>
        <div style={styles.listContainer}>
          <h3>Liste des passagers </h3>
          <ul style={styles.list}>
            {data.map((p) => (
              <li
                key={p.Name}
                style={styles.name}
                onClick={() => {
                  setSelectedPassenger(p);
                  setIsPassengerDetailOpen(true);
                }}
              >
                {p.Name}
              </li>
            ))}
          </ul>
        </div>

        {selectedPassenger && (
          <PassengerDetail
            passenger={selectedPassenger}
            isOpen={isPassengerDetailOpen}
            onClose={() => setIsPassengerDetailOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PassengersList;
