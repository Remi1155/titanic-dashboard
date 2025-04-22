import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
} from "recharts";
import { Passenger } from "../types/titanic";
import PassengerDetail from "./PassengerDetail";
import PassengerListStyle from "../styles/PassengerList";

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
  const styles = PassengerListStyle;
  const [isPassengerDetailOpen, setIsPassengerDetailOpen] =
    useState<boolean>(true);

  if (!visible) return null;

  // On ne garde que ceux qui ont un âge défini
  const chartData = data
    .filter((p) => p.Age !== null && p.Age !== undefined)
    .map((p) => ({
      name: p.Name.split(" ")[0], // pour éviter que ce soit trop long
      age: p.Age,
      sibsp: p.SibSp,
      parch: p.Parch,
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
          <h3>Age, SibSp et Parch des passagers</h3>
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
                <linearGradient id="colorSibSp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorParch" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
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
                label={{
                  value: "Passagers",
                  position: "insideBottom",
                  offset: 30,
                }}
              />
              {/* <YAxis/> */}
              <YAxis
                yAxisId="left"
                label={{ value: "Âge", angle: -90, position: "insideLeft" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: "SibSp / Parch",
                  angle: 90,
                  position: "insideRight",
                }}
              />
              <Tooltip />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="age"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorAge)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="sibsp"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorSibSp)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="parch"
                stroke="#ffc658"
                fillOpacity={1}
                fill="url(#colorParch)"
              />
              <Legend verticalAlign="bottom" height={36} />
            </AreaChart>
          </ResponsiveContainer>
          <div>
            <ul>
              <li>
                <b>age: </b>Age du passager
              </li>
              <li>
                <b>sibsp: </b>Nombre des frères et soeurs ou conjoints présent à
                bord
              </li>
              <li>
                <b>parch: </b>Nombre des parents ou enfants présent à bord
              </li>
            </ul>
          </div>
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

export default PassengersListAreaChart;
