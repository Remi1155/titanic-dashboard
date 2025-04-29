import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Passenger } from "../types/titanic";
import PassengerDetail from "./PassengerDetail";
import PassengerListStyle from "../styles/PassengerList";

interface PassengersListProps {
  data: Passenger[];
  visible: boolean;
  onClose: () => void;
}

const PassengersListLineChart: React.FC<PassengersListProps> = ({
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

  // On ne garde que ceux qui ont un âge défini
  const chartData = data
    .filter((p) => p.Age !== null && p.Age !== undefined && p.Fare !== null)
    .map((p) => ({
      name: p.Name.split(" ")[0], // pour éviter que ce soit trop long
      age: p.Age,
      fare: p.Fare,
      fullData: p,
    }));

  const handleBarClick = (data: any) => {
    setSelectedPassenger(data.fullData);
    setIsPassengerDetailOpen(true);
  };

  return (
    <div style={styles.container}>
      <button onClick={onClose} style={styles.closeBtn}>
        <div>&times;</div>
      </button>
      <div style={styles.card}>
        <div style={styles.chartContainer}>
          <h3>Prix du billet(fare) en fonction de l'age des passagers</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 80 }}
              onClick={({ activePayload }) =>
                activePayload && handleBarClick(activePayload[0].payload)
              }
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="fare"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={60}
                tick={false}
                label={{ value: "Fare" }}
              />
              <YAxis
                label={{ value: "Age", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                contentStyle={styles.tooltip.contentStyle}
                itemStyle={styles.tooltip.itemStyle}
                labelStyle={styles.tooltip.labelStyle}
              />
              <Line type="monotone" dataKey="age" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
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

export default PassengersListLineChart;
