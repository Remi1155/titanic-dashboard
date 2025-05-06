// src/services/titanicApi.ts
import axios from "axios";
import {
  SurvivalCount,
  SurvivalRateByClass,
  AvgAgeByClass,
  EmbarkedCount,
  FareDistributionData,
  SurvivalRateBySex,
  Passenger,
} from "../types/titanic"; // Ajustez le chemin si nécessaire

// Définissez l'URL de base de votre API NestJS
const API_BASE_URL = "http://localhost:3000/titanic"; // Changez si votre backend tourne sur un autre port

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllPassengers = async (): Promise<Passenger[]> => {
  try {
    const response = await apiClient.get("/passengers");
    return response.data;
  } catch (error) {
    console.error("Error fetching all passengers:", error);
    throw error;
  }
};

export const getSurvivalCounts = async (): Promise<SurvivalCount[]> => {
  try {
    const response = await apiClient.get("/stats/survival-counts");
    return response.data;
  } catch (error) {
    console.error("Error fetching survival counts:", error);
    throw error; // Relancez l'erreur pour la gérer dans le composant
  }
};

export const getSurvivalRateByClass = async (): Promise<
  SurvivalRateByClass[]
> => {
  try {
    const response = await apiClient.get("/stats/survival-rate/by-class");
    return response.data;
  } catch (error) {
    console.error("Error fetching survival rate by class:", error);
    throw error;
  }
};

export const getSurvivalRateBySex = async (): Promise<SurvivalRateBySex[]> => {
  try {
    const response = await apiClient.get("/stats/survival-rate/by-sex");
    return response.data;
  } catch (error) {
    console.error("Error fetching survival rate by sex:", error);
    throw error;
  }
};

export const getAverageAgeByClass = async (): Promise<AvgAgeByClass[]> => {
  try {
    const response = await apiClient.get("/stats/average-age/by-class");
    return response.data;
  } catch (error) {
    console.error("Error fetching average age by class:", error);
    throw error;
  }
};

export const getPassengerCountByEmbarked = async (): Promise<
  EmbarkedCount[]
> => {
  try {
    const response = await apiClient.get("/stats/passengers/by-embarked");
    return response.data;
  } catch (error) {
    console.error("Error fetching passenger count by embarked:", error);
    throw error;
  }
};

export const getFareDistribution = async (): Promise<
  FareDistributionData[]
> => {
  try {
    // Cet endpoint retourne une liste { Pclass, Fare }
    const response = await apiClient.get("/stats/fare-distribution/by-class");
    return response.data;
  } catch (error) {
    console.error("Error fetching fare distribution:", error);
    throw error;
  }
};

export const getPieceOfData = async (
  page: number,
  limit: number
): Promise<{ data: Passenger[]; total: number }> => {
  try {
    const response = await apiClient.get("/morceau", {
      params: { page, limit }, // ✅ paramètres pour la pagination
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching piece of data:", error);
    throw error;
  }
};


// export const getPieceOfData = async (): Promise<{
//   data: Passenger[];
//   total: number;
// }> => {
//   try {
//     const response = await apiClient.get("/morceau");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching piece of data:", error);
//     throw error;
//   }
// };
