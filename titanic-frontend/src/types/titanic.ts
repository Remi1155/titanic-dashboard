// src/types/titanic.ts

export interface SurvivalCount {
  Survived: string; // 'Survivants' ou 'Non Survivants'
  count: number;
}

export interface SurvivalRateByClass {
  Pclass: number;
  survival_rate: number;
}

export interface SurvivalRateBySex {
  Sex: string;
  survival_rate: number;
}

export interface AvgAgeByClass {
  Pclass: number;
  avg_age: number;
}

export interface EmbarkedCount {
  Embarked: string;
  count: number;
}

// Pour la répartition des tarifs, le backend renvoie des objets partiels
export interface FareDistributionData {
  Pclass: number;
  Fare: number | null; // Le tarif peut être null
}

// Optionnel: Type pour un passager complet si vous l'utilisez
export interface Passenger {
  PassengerId: number;
  Survived: number;
  Pclass: number;
  Name: string;
  Sex: string;
  Age: number | null;
  SibSp: number;
  Parch: number;
  Ticket: string | null;
  Fare: number | null;
  Cabin: string | null;
  Embarked: string | null;
}
