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
    // Utilisation de QueryBuilder pour plus de flexibilité que le raw SQL
    const results = await this.passengersRepository
      .createQueryBuilder('passenger')
      .select('passenger.Survived', 'Survived')
      .addSelect('COUNT(*)', 'count')
      .groupBy('passenger.Survived')
      .getRawMany(); // getRawMany retourne des objets simples

    // Conversion du count en nombre (getRawMany peut retourner des strings)
    // et mapping optionnel des labels 0/1
    return results.map((row) => ({
      Survived: row.Survived === 1 ? 'Survivants' : 'Non Survivants', // Map 0/1 to labels
      count: parseInt(row.count, 10),
    }));
  }

  // 2. Taux de survie par classe
  async getSurvivalRateByClass(): Promise<SurvivalRateByClassDto[]> {
    const results = await this.passengersRepository
      .createQueryBuilder('passenger')
      .select('passenger.Pclass', 'Pclass')
      .addSelect('AVG(passenger.Survived)', 'survival_rate')
      .groupBy('passenger.Pclass')
      .orderBy('passenger.Pclass', 'ASC')
      .getRawMany();

    // Assurer que survival_rate est un nombre
    return results.map((row) => ({
      Pclass: row.Pclass,
      survival_rate: parseFloat(row.survival_rate),
    }));
  }

  // 3. Taux de survie par sexe
  async getSurvivalRateBySex(): Promise<SurvivalRateBySexDto[]> {
    const results = await this.passengersRepository
      .createQueryBuilder('passenger')
      .select('passenger.Sex', 'Sex')
      .addSelect('AVG(passenger.Survived)', 'survival_rate')
      .groupBy('passenger.Sex')
      .getRawMany();

    return results.map((row) => ({
      Sex: row.Sex,
      survival_rate: parseFloat(row.survival_rate),
    }));
  }

  // 4. Âge moyen par classe (en ignorant les âges nuls)
  async getAverageAgeByClass(): Promise<AvgAgeByClassDto[]> {
    const results = await this.passengersRepository
      .createQueryBuilder('passenger')
      .select('passenger.Pclass', 'Pclass')
      .addSelect('AVG(passenger.Age)', 'avg_age')
      .where('passenger.Age IS NOT NULL') // Exclure les âges nuls
      .groupBy('passenger.Pclass')
      .orderBy('passenger.Pclass', 'ASC')
      .getRawMany();

    return results.map((row) => ({
      Pclass: row.Pclass,
      avg_age: parseFloat(row.avg_age),
    }));
  }

  // 5. Nombre de passagers par port d'embarquement
  async getPassengerCountByEmbarked(): Promise<EmbarkedCountDto[]> {
    const results = await this.passengersRepository
      .createQueryBuilder('passenger')
      .select('passenger.Embarked', 'Embarked')
      .addSelect('COUNT(*)', 'count')
      .where('passenger.Embarked IS NOT NULL') // Exclure les nuls
      .groupBy('passenger.Embarked')
      .getRawMany();

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
        Fare: Not(IsNull()), // Exclure les tarifs nuls si nécessaire (optionnel ici)
      },
    });
    // Alternative avec QueryBuilder si plus de logique est nécessaire
    /*
        return this.passengersRepository
            .createQueryBuilder('passenger')
            .select(['passenger.Pclass', 'passenger.Fare'])
            .where('passenger.Fare IS NOT NULL')
            .getMany(); // getMany retourne des entités partielles
        */
  }
}

// Ajoutez cette importation si vous utilisez la version commentée de getFareDistributionByClass
import { IsNull, Not } from 'typeorm';

// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class TitanicService {}
