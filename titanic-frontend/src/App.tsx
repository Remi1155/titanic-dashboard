// src/App.tsx
import { useState, useEffect } from "react";
import "./App.css";
import {
  getSurvivalCounts,
  getSurvivalRateByClass,
  getSurvivalRateBySex,
  getAverageAgeByClass,
  getPassengerCountByEmbarked,
  // getPieceOfData,
} from "./services/titanicApi";
import {
  SurvivalCount,
  SurvivalRateByClass,
  SurvivalRateBySex,
  AvgAgeByClass,
  EmbarkedCount,
  // Passenger,
} from "./types/titanic";

// Importez les composants de graphique
import SurvivalChart from "./components/SurvivalChart";
import SurvivalByClassChart from "./components/SurvivalByClassChart";
import SurvivalBySexChart from "./components/SurvivalBySexChart";
import AvgAgeByClassChart from "./components/AvgAgeByClassChart";
import EmbarkedChart from "./components/EmbarkedChart";
import PieceOfData from "./components/PieceOfData";
import FieldsMeaning from "./components/FieldsMeaning";

// Définir les types possibles pour les graphiques à afficher
type ChartType =
  | "survivalCounts"
  | "survivalByClass"
  | "survivalBySex"
  | "avgAgeByClass"
  | "embarkedCounts"
  | "fareDistribution"
  | "fieldsMeaning"
  | "morceau";

// Options pour la barre de navigation
const chartOptions: { key: ChartType; label: string }[] = [
  { key: "fieldsMeaning", label: "Concernant les données" },
  { key: "morceau", label: "Morceau des données" },
  { key: "survivalByClass", label: "Taux Survie par Classe" },
  { key: "survivalCounts", label: "Survivants vs Non-Survivants" },
  { key: "avgAgeByClass", label: "Âge Moyen par Classe" },
  { key: "survivalBySex", label: "Taux Survie par Sexe" },
  { key: "embarkedCounts", label: "Ports d'Embarquement" },
];

function App() {
  const [survivalCounts, setSurvivalCounts] = useState<SurvivalCount[]>([]);
  const [survivalByClass, setSurvivalByClass] = useState<SurvivalRateByClass[]>(
    []
  );
  const [survivalBySex, setSurvivalBySex] = useState<SurvivalRateBySex[]>([]);
  const [avgAgeByClass, setAvgAgeByClass] = useState<AvgAgeByClass[]>([]);
  const [embarkedCounts, setEmbarkedCounts] = useState<EmbarkedCount[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedChart, setSelectedChart] = useState<ChartType>(
    chartOptions[0].key
  );

  // Récupération des données (inchangée)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [
          survivalCountsData,
          survivalByClassData,
          survivalBySexData,
          avgAgeData,
          embarkedData,
          // fareData,
        ] = await Promise.all([
          getSurvivalCounts(),
          getSurvivalRateByClass(),
          getSurvivalRateBySex(),
          getAverageAgeByClass(),
          getPassengerCountByEmbarked(),
          // getFareDistribution(),
        ]);
        setSurvivalCounts(survivalCountsData);
        setSurvivalByClass(survivalByClassData);
        setSurvivalBySex(survivalBySexData);
        setAvgAgeByClass(avgAgeData);
        setEmbarkedCounts(embarkedData);
        // setFareDistribution(fareData);
      } catch (err) {
        setError("Erreur lors de la récupération des données du Titanic.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fonction pour rendre le graphique sélectionné
  const renderSelectedChart = () => {
    switch (selectedChart) {
      case "survivalCounts":
        return <SurvivalChart data={survivalCounts} />;
      case "survivalByClass":
        return <SurvivalByClassChart data={survivalByClass} />;
      case "survivalBySex":
        return <SurvivalBySexChart data={survivalBySex} />;
      case "avgAgeByClass":
        return <AvgAgeByClassChart data={avgAgeByClass} />;
      case "embarkedCounts":
        return <EmbarkedChart data={embarkedCounts} />;
      case "morceau":
        return <PieceOfData />;
      case "fieldsMeaning":
        return <FieldsMeaning />;
      default:
        return <div>Sélectionnez un graphique dans le menu.</div>;
    }
  };

  // Trouver le label du graphique sélectionné pour le titre
  // const selectedChartLabel =
  //   chartOptions.find((opt) => opt.key === selectedChart)?.label || "Graphique";

  if (loading) {
    return <div className="container">Chargement des données...</div>;
  }

  if (error) {
    return <div className="container error">{error}</div>;
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <h1>Tableau de Bord Titanic</h1>
        {chartOptions.map((option) => (
          <button
            key={option.key}
            className={selectedChart === option.key ? "active" : ""}
            onClick={() => setSelectedChart(option.key)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="chart-area">
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          renderSelectedChart()
        )}
      </div>
    </div>
  );
}

export default App;
