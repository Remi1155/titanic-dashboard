// src/components/SurvivalBySexChart.tsx
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Passenger, SurvivalRateBySex } from "../types/titanic";
import axios from "axios";
import PassengersListScatterChart from "./PassengerListListScatterChart";

const API_BASE_URL = "http://localhost:3000/titanic";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

const getSurvivedPassengersWithSameSex = async (
  sex: string
): Promise<Passenger[]> => {
  try {
    const response = await apiClient.get(
      `/survivedPassengersWithSameSex/${sex}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Survived passenger with same sex:", error);
    throw error;
  }
};

interface Props {
  data: SurvivalRateBySex[];
}

const SurvivalBySexChart: React.FC<Props> = ({ data }) => {
  const [showList, setShowList] = useState(false);
  const [passengersList, setPassengersList] = useState<Passenger[]>([]);

  if (!data || data.length === 0) {
    return <div>Loading survival rate by sex...</div>;
  }

  const chartData = data.map((item) => ({
    name: item.Sex === "male" ? "Homme" : "Femme",
    "Taux de Survie": item.survival_rate,
  }));

  const handleBarClick = async (payloadFromRecharts: any) => {
    const clickedData = payloadFromRecharts?.payload;
    // console.log("Payload: ", payloadFromRecharts);

    if (clickedData && clickedData.name) {
      const sex = clickedData.name === "Femme" ? "female" : "male";
      // console.log("Clicked data: ", clickedData.name);
      // console.log(sex);

      try {
        const passengers = await getSurvivedPassengersWithSameSex(sex);
        setPassengersList(passengers);
        setShowList(true);
      } catch (error) {
        console.error("Erreur récupération passagers:", error);
      }
    }
  };

  return (
    <>
      <ResponsiveContainer width="95%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            domain={[0, 1]}
            label={{
              value: "Taux de survie",
              angle: -90,
              position: "insideLeft",
              dy: 50,
            }}
          />
          <Tooltip
            formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
          />
          <Legend />
          <Bar
            dataKey="Taux de Survie"
            fill="#ffc658"
            style={{ cursor: "pointer" }}
            onClick={handleBarClick}
          />
        </BarChart>
      </ResponsiveContainer>

      {showList && (
        <PassengersListScatterChart
          data={passengersList}
          visible={showList}
          // getPassengersSpecificity={getPassengersSpecificity}
          onClose={() => setShowList(false)}
        />
      )}
    </>
  );
};

export default SurvivalBySexChart;
