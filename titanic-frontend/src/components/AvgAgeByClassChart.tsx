// src/components/AvgAgeByClassChart.tsx
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
import { AvgAgeByClass, Passenger } from "../types/titanic";
import axios from "axios";
import PassengersListBarChart from "./PassengersListBarChart";
import PassengerListStyle from "../styles/PassengerList";

const API_BASE_URL = "http://localhost:3000/titanic";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

const getPassengersWithSameClass = async (
  survived: number
): Promise<Passenger[]> => {
  try {
    const response = await apiClient.get(
      `/passengersWithSameClass/${survived}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching name with same survived:", error);
    throw error;
  }
};

interface Props {
  data: AvgAgeByClass[];
}

const AvgAgeByClassChart: React.FC<Props> = ({ data }) => {
  const [showList, setShowList] = useState(false);
  const [passengersList, setPassengersList] = useState<Passenger[]>([]);
  const styles = PassengerListStyle;

  if (!data || data.length === 0) {
    return <div>Loading average age by class...</div>;
  }

  const chartData = data.map((item) => ({
    name: `Classe ${item.Pclass}`,
    "Âge Moyen": item.avg_age,
  }));

  const handleBarClick = async (payloadFromRecharts: any) => {
    const clickedData = payloadFromRecharts?.payload;
    // console.log("Payload: ", payloadFromRecharts);

    if (clickedData && clickedData.name) {
      let pclass = 0;
      if (clickedData.name === "Classe 1") {
        pclass = 1;
      } else if (clickedData.name === "Classe 2") {
        pclass = 2;
      } else if (clickedData.name === "Classe 3") {
        pclass = 3;
      } else {
        console.error("Classe non reconnue");
      }

      try {
        const passengers = await getPassengersWithSameClass(pclass);
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
            label={{
              value: "Âge moyen",
              angle: -90,
              position: "insideLeft",
              dy: 50,
            }}
          />
          <Tooltip
            formatter={(value: number) => `${value.toFixed(1)} ans`}
            contentStyle={styles.tooltip.contentStyle}
            itemStyle={styles.tooltip.itemStyle}
            labelStyle={styles.tooltip.labelStyle}
          />
          <Legend />
          <Bar
            dataKey="Âge Moyen"
            fill="#d0ed57"
            onClick={handleBarClick}
            style={{ cursor: "pointer" }}
          />
        </BarChart>
      </ResponsiveContainer>

      {showList && (
        <PassengersListBarChart
          data={passengersList}
          visible={showList}
          onClose={() => setShowList(false)}
        />
      )}
    </>
  );
};

export default AvgAgeByClassChart;
