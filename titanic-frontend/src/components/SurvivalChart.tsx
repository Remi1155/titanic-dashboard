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
import { Passenger, SurvivalCount } from "../types/titanic";
import axios from "axios";
import PassengersList from "./PassengersList";
import PassengerDetailStyle from "../styles/PassengerDetail";
import PassengerListStyle from "../styles/PassengerList";

const API_BASE_URL = "http://localhost:3000/titanic";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

const getPassengersWithSameSurvived = async (
  survived: number
): Promise<Passenger[]> => {
  try {
    const response = await apiClient.get(
      `/passengersWithSameSurvived/${survived}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching name with same survived:", error);
    throw error;
  }
};

interface Props {
  data: SurvivalCount[];
}

const SurvivalChart: React.FC<Props> = ({ data }) => {
  const [showList, setShowList] = useState(false);
  const [passengersList, setPassengersList] = useState<Passenger[]>([]);
  const styles = PassengerListStyle

  if (!data || data.length === 0) {
    return <div>Loading survival data...</div>;
  }

  const chartData = data.map((item) => ({
    name: item.Survived,
    count: item.count,
  }));

  // const getPassengersSpecificity = (payloadFromRecharts: any) => {
  //   const clickedData = payloadFromRecharts?.payload;
  //   const passengersSpecificity = clickedData.name;
  //   return passengersSpecificity
  // }

  const handleBarClick = async (payloadFromRecharts: any) => {
    const clickedData = payloadFromRecharts?.payload;
    // console.log("Payload: ", payloadFromRecharts);
    
    if (clickedData && clickedData.name) {
      const survived = clickedData.name === "Survivants" ? 1 : 0;
      // console.log("Clicked data: ", clickedData.name);

      try {
        const passengers = await getPassengersWithSameSurvived(survived);
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
              value: "Nombre de passagers",
              angle: -90,
              position: "insideLeft",
              dy: 70,
            }}
          />
          <Tooltip
            contentStyle={styles.tooltip.contentStyle}
            itemStyle={styles.tooltip.itemStyle}
            labelStyle={styles.tooltip.labelStyle} 
          />
          <Legend />
          <Bar
            dataKey="count"
            fill="#8884d8"
            name="Nombre de passagers"
            onClick={handleBarClick}
            style={{ cursor: "pointer" }}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* ✅ AJOUT DU COMPOSANT DÉTAILS */}
      {showList && (
        <PassengersList
          data={passengersList}
          visible={showList}
          // getPassengersSpecificity={getPassengersSpecificity}
          onClose={() => setShowList(false)}
        />
      )}
    </>
  );
};

export default SurvivalChart;
