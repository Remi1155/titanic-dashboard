// src/App.tsx
import { useState, useEffect } from "react";
import "./App.css";
import {
  getSurvivalCounts,
  getSurvivalRateByClass,
  getSurvivalRateBySex,
  getAverageAgeByClass,
  getPassengerCountByEmbarked,
  getFareDistribution,
} from "./services/titanicApi";
import {
  SurvivalCount,
  SurvivalRateByClass,
  SurvivalRateBySex,
  AvgAgeByClass,
  EmbarkedCount,
  // FareDistributionData,
} from "./types/titanic";

// Importez les composants de graphique
import SurvivalChart from "./components/SurvivalChart";
import SurvivalByClassChart from "./components/SurvivalByClassChart";
import SurvivalBySexChart from "./components/SurvivalBySexChart";
import AvgAgeByClassChart from "./components/AvgAgeByClassChart";
import EmbarkedChart from "./components/EmbarkedChart";
// import FareDistributionInfo from "./components/FareDistributionInfo";
// import PassengerDetail from "./components/PassengerDetail";

// Définir les types possibles pour les graphiques à afficher
type ChartType =
  | "survivalCounts"
  | "survivalByClass"
  | "survivalBySex"
  | "avgAgeByClass"
  | "embarkedCounts"
  | "fareDistribution"; // Inclure la vue des tarifs

// Options pour la barre de navigation
const chartOptions: { key: ChartType; label: string }[] = [
  { key: "survivalByClass", label: "Taux Survie / Classe" },
  { key: "survivalCounts", label: "Survivants vs Non-Survivants" },
  { key: "survivalBySex", label: "Taux Survie / Sexe" },
  { key: "avgAgeByClass", label: "Âge Moyen / Classe" },
  { key: "embarkedCounts", label: "Ports d'Embarquement" },
  // { key: "fareDistribution", label: "Répartition Tarifs / Classe" },
];

function App() {
  // États pour les données de chaque graphique
  const [survivalCounts, setSurvivalCounts] = useState<SurvivalCount[]>([]);
  const [survivalByClass, setSurvivalByClass] = useState<SurvivalRateByClass[]>(
    []
  );
  const [survivalBySex, setSurvivalBySex] = useState<SurvivalRateBySex[]>([]);
  const [avgAgeByClass, setAvgAgeByClass] = useState<AvgAgeByClass[]>([]);
  const [embarkedCounts, setEmbarkedCounts] = useState<EmbarkedCount[]>([]);
  // const [fareDistribution, setFareDistribution] = useState<
  //   FareDistributionData[]
  // >([]);

  // États pour le chargement et les erreurs
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // État pour le graphique sélectionné
  const [selectedChart, setSelectedChart] = useState<ChartType>(
    chartOptions[0].key
  ); // Afficher le premier par défaut

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
          getFareDistribution(),
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
      // case "fareDistribution":
      //   return <FareDistributionInfo data={fareDistribution} />;
      default:
        return <div>Sélectionnez un graphique dans le menu.</div>;
    }
  };

  // Trouver le label du graphique sélectionné pour le titre
  const selectedChartLabel =
    chartOptions.find((opt) => opt.key === selectedChart)?.label || "Graphique";

  if (loading) {
    return <div className="container">Chargement des données...</div>;
  }

  if (error) {
    return <div className="container error">{error}</div>;
  }

  return (
    <div className="container">
      <h1>Tableau de Bord - Titanic</h1>

      {/* Barre de Navigation */}
      <nav className="navbar">
        {chartOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => setSelectedChart(option.key)}
            className={`nav-button ${
              selectedChart === option.key ? "active" : ""
            }`}
          >
            {option.label}
          </button>
        ))}
      </nav>

      {/* Zone d'affichage du graphique sélectionné */}
      <div className="chart-display-area">
        {/* Affiche un titre dynamique */}
        <h2>{selectedChartLabel}</h2>
        {renderSelectedChart()}
      </div>
    </div>
  );
}

export default App;
