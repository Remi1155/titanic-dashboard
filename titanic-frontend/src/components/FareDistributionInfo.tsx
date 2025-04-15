// src/components/FareDistributionInfo.tsx
import React, { useMemo } from "react";
import { FareDistributionData } from "../types/titanic";

interface Props {
  data: FareDistributionData[];
}

// Fonction simple pour calculer les quartiles (approximatif)
const getQuartiles = (
  arr: number[]
): { q1: number; median: number; q3: number } => {
  const sortedArr = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sortedArr.length / 2);
  const median =
    sortedArr.length % 2 === 1
      ? sortedArr[mid]
      : (sortedArr[mid - 1] + sortedArr[mid]) / 2;
  const lowerHalf = sortedArr.slice(0, mid);
  const upperHalf = sortedArr.slice(sortedArr.length % 2 === 1 ? mid + 1 : mid);
  const q1 =
    lowerHalf.length > 0
      ? (lowerHalf[
          Math.floor(lowerHalf.length / 2) -
            (lowerHalf.length % 2 === 0 ? 1 : 0)
        ] +
          lowerHalf[Math.floor(lowerHalf.length / 2)]) /
        2
      : median; // Simple median of lower half
  const q3 =
    upperHalf.length > 0
      ? (upperHalf[
          Math.floor(upperHalf.length / 2) -
            (upperHalf.length % 2 === 0 ? 1 : 0)
        ] +
          upperHalf[Math.floor(upperHalf.length / 2)]) /
        2
      : median; // Simple median of upper half
  return {
    q1: lowerHalf.length > 0 ? getQuartiles(lowerHalf).median : median, // Median of lower half
    median,
    q3: upperHalf.length > 0 ? getQuartiles(upperHalf).median : median, // Median of upper half
  };
};

const FareDistributionInfo: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Loading fare distribution data...</div>;
  }

  // Grouper les tarifs par classe
  const faresByClass = useMemo(() => {
    const grouped: { [key: number]: number[] } = { 1: [], 2: [], 3: [] };
    data.forEach((item) => {
      if (item.Fare !== null && item.Pclass in grouped) {
        grouped[item.Pclass].push(item.Fare);
      }
    });
    return grouped;
  }, [data]);

  // Calculer les statistiques pour chaque classe
  const statsByClass = useMemo(() => {
    return Object.entries(faresByClass)
      .map(([pclass, fares]) => {
        const validFares = fares.filter((f) => f !== null) as number[];
        if (validFares.length === 0) {
          return {
            pclass: parseInt(pclass, 10),
            min: null,
            q1: null,
            median: null,
            q3: null,
            max: null,
            avg: null,
          };
        }
        const quartiles = getQuartiles(validFares);
        const min = Math.min(...validFares);
        const max = Math.max(...validFares);
        const avg =
          validFares.reduce((sum, val) => sum + val, 0) / validFares.length;
        return {
          pclass: parseInt(pclass, 10),
          min: min.toFixed(2),
          q1: quartiles.q1.toFixed(2),
          median: quartiles.median.toFixed(2),
          q3: quartiles.q3.toFixed(2),
          max: max.toFixed(2),
          avg: avg.toFixed(2),
          count: validFares.length,
        };
      })
      .sort((a, b) => a.pclass - b.pclass); // Trier par classe
  }, [faresByClass]);

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        margin: "10px 0",
        borderRadius: "5px",
      }}
    >
      <h4>Répartition des Tarifs par Classe (Statistiques)</h4>
      <p style={{ fontStyle: "italic", color: "#666" }}>
        Note : Recharts n'a pas de composant Box Plot direct. Voici des
        statistiques descriptives. Pour une visualisation en Box Plot, une autre
        bibliothèque (ex: Plotly, Visx) serait nécessaire.
      </p>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>
            <th>Classe</th>
            <th>Min</th>
            <th>Q1</th>
            <th>Médiane</th>
            <th>Q3</th>
            <th>Max</th>
            <th>Moyenne</th>
            <th>N</th>
          </tr>
        </thead>
        <tbody>
          {statsByClass.map((stats) => (
            <tr key={stats.pclass} style={{ borderBottom: "1px solid #eee" }}>
              <td>{stats.pclass}</td>
              <td>{stats.min ?? "N/A"}</td>
              <td>{stats.q1 ?? "N/A"}</td>
              <td>{stats.median ?? "N/A"}</td>
              <td>{stats.q3 ?? "N/A"}</td>
              <td>{stats.max ?? "N/A"}</td>
              <td>{stats.avg ?? "N/A"}</td>
              <td>{stats.count ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FareDistributionInfo;
