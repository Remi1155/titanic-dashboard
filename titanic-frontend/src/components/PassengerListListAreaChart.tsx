import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Passenger } from "../types/titanic";

interface PassengersListProps {
  data: Passenger[];
  visible: boolean;
  onClose: () => void;
}

const PassengersListAreaChart: React.FC<PassengersListProps> = ({
  data,
  visible,
  onClose,
}) => {
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(
    null
  );

  if (!visible) return null;

  // On ne garde que ceux qui ont un âge défini
  const chartData = data
    .filter((p) => p.Age !== null && p.Age !== undefined)
    .map((p) => ({
      name: p.Name.split(" ")[0], // pour éviter que ce soit trop long
      age: p.Age,
      fullData: p,
    }));

  const handleBarClick = (data: any) => {
    setSelectedPassenger(data.fullData);
  };

  return (
    <div style={styles.container}>
      <button onClick={onClose} style={styles.closeBtn}>
        X
      </button>
      <div style={styles.card}>
        <div style={styles.chartContainer}>
          <h3>Âge des passagers</h3>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 80 }}
              onClick={({ activePayload }) =>
                activePayload && handleBarClick(activePayload[0].payload)
              }
            >
              <defs>
                <linearGradient id="colorAge" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={60}
                tick={false}
              />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="age"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorAge)"
              />
            </AreaChart>
          </ResponsiveContainer>
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
    width: "70%",
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
  details: {
    width: "30%",
  },
  detailList: {
    listStyle: "none",
    padding: 0,
    lineHeight: "1.5",
  },
};

export default PassengersListAreaChart;
