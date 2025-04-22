// src/components/EmbarkedChart.tsx
import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { EmbarkedCount, Passenger } from "../types/titanic";
import axios from "axios";
import PassengersListLineChart from "./PassengerListLineChart";

const API_BASE_URL = "http://localhost:3000/titanic";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

const getPassengersWithSameEmbarked = async (
  embarked: string
): Promise<Passenger[]> => {
  try {
    const response = await apiClient.get(
      `/passengersWithSameEmbarked/${embarked}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching name with same survived:", error);
    throw error;
  }
};

interface Props {
  data: EmbarkedCount[];
}

const COLORS = ["#0088FE", "#FF8042", "#AF19FF"]; // Bleu, Orange, Violet

// Fonction pour obtenir le nom complet du port
const getPortName = (code: string): string => {
  switch (code) {
    case "C":
      return "Cherbourg";
    case "Q":
      return "Queenstown";
    case "S":
      return "Southampton";
    default:
      return code;
  }
};

const EmbarkedChart: React.FC<Props> = ({ data }) => {
  const [showList, setShowList] = useState(false);
  const [passengersList, setPassengersList] = useState<Passenger[]>([]);

  if (!data || data.length === 0) {
    return <div>Loading embarked data...</div>;
  }

  const chartData = data.map((item) => ({
    name: getPortName(item.Embarked),
    value: item.count,
  }));

  // Pour afficher les pourcentages dans le label
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  const handleCellClick = async (index: number) => {
    const clickedData = chartData[index];

    if (clickedData && clickedData.name) {
      const embarked = clickedData.name;

      try {
        const passengers = await getPassengersWithSameEmbarked(embarked);
        setPassengersList(passengers);
        setShowList(true);
      } catch (error) {
        console.error("Erreur récupération passagers:", error);
      }
    }
  };

  return (
    <>
      <ResponsiveContainer width="95%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                style={{ cursor: "pointer" }}
                onClick={() => handleCellClick(index)}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value} passagers`,
              name,
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      {showList && (
        <PassengersListLineChart
          data={passengersList}
          visible={showList}
          onClose={() => setShowList(false)}
        />
      )}
    </>
  );
};

export default EmbarkedChart;
