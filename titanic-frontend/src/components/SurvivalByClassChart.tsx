// src/components/SurvivalByClassPieChart.tsx
import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Passenger, SurvivalRateByClass } from "../types/titanic";
import axios from "axios";
import PassengersListChart from "./PassengersListChart";

const API_BASE_URL = "http://localhost:3000/titanic";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

const getPassengersWithSameClass = async (
  pclass: number
): Promise<Passenger[]> => {
  try {
    const response = await apiClient.get(
      `/survivedPassengersWithSameClass/${pclass}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching passengers with same class:", error);
    throw error;
  }
};

interface Props {
  data: SurvivalRateByClass[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const SurvivalByClassPieChart: React.FC<Props> = ({ data }) => {
  const [showList, setShowList] = useState(false);
  const [passengersList, setPassengersList] = useState<Passenger[]>([]);

  if (!data || data.length === 0) {
    return <div>Loading survival rate by class...</div>;
  }

  const handlePieClick = async (_: string, index: number) => {
    const pclass = data[index].Pclass;

    try {
      const passengers = await getPassengersWithSameClass(pclass);
      setPassengersList(passengers);
      setShowList(true);
      // console.log(`Passagers de la classe ${pclass}:`, passengers);
    } catch (error) {
      console.error("Erreur lors du chargement des passagers :", error);
    }
  };

  const chartData = data.map((item) => ({
    name: `Classe ${item.Pclass}`,
    value: item.survival_rate,
  }));

  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Tooltip
            formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
          />
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            onClick={handlePieClick}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                style={{ cursor: "pointer" }}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {showList && (
        <PassengersListChart
          data={passengersList}
          visible={showList}
          // getPassengersSpecificity={getPassengersSpecificity}
          onClose={() => setShowList(false)}
        />
      )}
    </>
  );
};

export default SurvivalByClassPieChart;
