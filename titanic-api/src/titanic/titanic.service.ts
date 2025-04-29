// src/titanic/titanic.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passenger } from './entities/passenger.entity';

// Optionnel : DTOs pour structurer les réponses (bonne pratique)
export interface SurvivalCountDto {
  Survived: number | string; // Peut être string après mapping
  count: number;
}

export interface SurvivalRateByClassDto {
  Pclass: number;
  survival_rate: number;
}

export interface SurvivalRateBySexDto {
  Sex: string;
  survival_rate: number;
}

export interface AvgAgeByClassDto {
  Pclass: number;
  avg_age: number;
}

export interface EmbarkedCountDto {
  Embarked: string;
  count: number;
}

@Injectable()
export class TitanicService {
  constructor(
    @InjectRepository(Passenger)
    private passengersRepository: Repository<Passenger>,
  ) {}

  // Récupérer tous les passagers (potentiellement à paginer)
  async findAll(): Promise<Passenger[]> {
    return this.passengersRepository.find();
  }

  // Récupérer un passager par ID
  async findOne(id: number): Promise<Passenger> {
    const passenger = await this.passengersRepository.findOneBy({
      PassengerId: id,
    });
    if (!passenger) {
      throw new NotFoundException(`Passenger with ID ${id} not found`);
    }
    return passenger;
  }

  // 1. Nombre de survivants vs non-survivants
  async getSurvivalCounts(): Promise<SurvivalCountDto[]> {
    const results = await this.passengersRepository.query(`
      SELECT 
        Survived, COUNT(*) as count
      FROM passengers
      GROUP BY Survived
    `);

    // Conversion du count en nombre (getRawMany peut retourner des strings)
    // et mapping optionnel des labels 0/1
    return results.map((row) => ({
      Survived: row.Survived === 1 ? 'Survivants' : 'Non Survivants', // Map 0/1 to labels
      count: parseInt(row.count, 10),
    }));
  }

  // 2. Taux de survie par classe
  async getSurvivalRateByClass(): Promise<SurvivalRateByClassDto[]> {
    const results = await this.passengersRepository.query(`
      SELECT 
        Pclass, AVG(Survived) as survival_rate
      FROM passengers
      GROUP BY Pclass
      ORDER BY Pclass
    `);

    // Assurer que survival_rate est un nombre
    return results.map((row) => ({
      Pclass: row.Pclass,
      survival_rate: parseFloat(row.survival_rate),
    }));
  }

  // 3. Taux de survie par sexe
  async getSurvivalRateBySex(): Promise<SurvivalRateBySexDto[]> {
    const results = await this.passengersRepository.query(`
      SELECT 
        Sex, AVG(Survived) as survival_rate
      FROM passengers
      GROUP BY Sex
    `);

    return results.map((row) => ({
      Sex: row.Sex,
      survival_rate: parseFloat(row.survival_rate),
    }));
  }

  // 4. Âge moyen par classe (en ignorant les âges nuls)
  async getAverageAgeByClass(): Promise<AvgAgeByClassDto[]> {
    const results = await this.passengersRepository.query(`
      SELECT 
        Pclass, AVG(Age) as avg_age
      FROM passengers
      WHERE Age IS NOT NULL
      GROUP BY Pclass
      ORDER BY Pclass
    `);

    return results.map((row) => ({
      Pclass: row.Pclass,
      avg_age: parseFloat(row.avg_age),
    }));
  }

  // 5. Nombre de passagers par port d'embarquement
  async getPassengerCountByEmbarked(): Promise<EmbarkedCountDto[]> {
    const results = await this.passengersRepository.query(`
      SELECT 
        Embarked, COUNT(*) as count
      FROM passengers
      WHERE Embarked IS NOT NULL
      GROUP BY Embarked
    `);

    return results.map((row) => ({
      Embarked: row.Embarked,
      count: parseInt(row.count, 10),
    }));
  }

  // 6. Répartition des tarifs par classe (retourne toutes les données pertinentes)
  async getFareDistributionByClass(): Promise<
    Pick<Passenger, 'Pclass' | 'Fare'>[]
  > {
    // On retourne juste les colonnes Pclass et Fare pour que le front-end fasse la visualisation (boxplot)
    return this.passengersRepository.find({
      select: ['Pclass', 'Fare'],
      where: {
        Fare: Not(IsNull()),
      },
    });
  }

  // 5. Passagers de meme Survived
  async getPassengerWithSameSurvived(survived: number): Promise<Passenger[]> {
    const results = await this.passengersRepository.query(`
      SELECT * 
      FROM passengers 
      WHERE Survived=${survived};
    `);

    return results.map((row) => ({
      PassengerId: row.PassengerId,
      Survived: row.Survived,
      Pclass: row.Pclass,
      Name: row.Name,
      Sex: row.Sex,
      Age: row.Age,
      SibSp: row.SibSp,
      Parch: row.Parch,
      Ticket: row.Ticket,
      Fare: row.Fare,
      Cabin: row.Cabin,
      Embarked: row.Embarked,
    }));
  }

  // 6. Passagers de meme Class
  async getPassengersWithSameClass(pclass: number): Promise<Passenger[]> {
    const results = await this.passengersRepository.query(`
      SELECT *
      FROM passengers
      WHERE Pclass=${pclass}
    `);

    return results.map((row) => ({
      PassengerId: row.PassengerId,
      Survived: row.Survived,
      Pclass: row.Pclass,
      Name: row.Name,
      Sex: row.Sex,
      Age: row.Age,
      SibSp: row.SibSp,
      Parch: row.Parch,
      Ticket: row.Ticket,
      Fare: row.Fare,
      Cabin: row.Cabin,
      Embarked: row.Embarked,
    }));
  }

  // 7. Passagers de meme sexe survivant
  async getSurvivedPassengersWithSameSex(sex: string): Promise<Passenger[]> {
    const results = await this.passengersRepository.query(`
      SELECT *
      FROM passengers
      WHERE Sex='${sex}'
      AND Survived=1
    `);

    return results.map((row) => ({
      PassengerId: row.PassengerId,
      Survived: row.Survived,
      Pclass: row.Pclass,
      Name: row.Name,
      Sex: row.Sex,
      Age: row.Age,
      SibSp: row.SibSp,
      Parch: row.Parch,
      Ticket: row.Ticket,
      Fare: row.Fare,
      Cabin: row.Cabin,
      Embarked: row.Embarked,
    }));
  }

  // 8. Passagers de meme port d'embarquement
  async getPassengersWithSameEmbarked(embarked: string): Promise<Passenger[]> {
    const results = await this.passengersRepository.query(`
      SELECT *
      FROM passengers
      WHERE Embarked LIKE '%${embarked}%'
    `);

    return results.map((row) => ({
      PassengerId: row.PassengerId,
      Survived: row.Survived,
      Pclass: row.Pclass,
      Name: row.Name,
      Sex: row.Sex,
      Age: row.Age,
      SibSp: row.SibSp,
      Parch: row.Parch,
      Ticket: row.Ticket,
      Fare: row.Fare,
      Cabin: row.Cabin,
      Embarked: row.Embarked,
    }));
  }

  // 9. Passagers survivant de meme classe
  async getSurvivedPassengersWithSameClass(
    pclass: number,
  ): Promise<Passenger[]> {
    const results = await this.passengersRepository.query(`
      SELECT *
      FROM passengers
      WHERE Pclass=${pclass}
      AND Survived=1
      AND Age IS NOT NULL
    `);

    return results.map((row) => ({
      PassengerId: row.PassengerId,
      Survived: row.Survived,
      Pclass: row.Pclass,
      Name: row.Name,
      Sex: row.Sex,
      Age: row.Age,
      SibSp: row.SibSp,
      Parch: row.Parch,
      Ticket: row.Ticket,
      Fare: row.Fare,
      Cabin: row.Cabin,
      Embarked: row.Embarked,
    }));
  }
}

import { IsNull, Not } from 'typeorm';
