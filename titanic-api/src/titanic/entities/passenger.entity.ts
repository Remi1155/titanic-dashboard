// src/titanic/entities/passenger.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('passengers') // Nom de la table dans la base de données
export class Passenger {
  @PrimaryGeneratedColumn() // Ou @PrimaryColumn() si PassengerId n'est pas auto-incrémenté
  PassengerId: number;

  @Column({ type: 'int' }) // ou boolean si stocké comme booléen
  Survived: number;

  @Column({ type: 'int' })
  Pclass: number;

  @Column({ type: 'varchar', length: 255 }) // Ajustez la longueur si nécessaire
  Name: string;

  @Column({ type: 'varchar', length: 10 })
  Sex: string;

  @Column({ type: 'float', nullable: true }) // float ou decimal selon la précision
  Age: number | null;

  @Column({ type: 'int' })
  SibSp: number;

  @Column({ type: 'int' })
  Parch: number;

  @Column({ type: 'varchar', length: 50, nullable: true }) // Ajustez la longueur
  Ticket: string | null;

  @Column({ type: 'float', nullable: true }) // float ou decimal
  Fare: number | null;

  @Column({ type: 'varchar', length: 50, nullable: true }) // Ajustez la longueur
  Cabin: string | null;

  @Column({ type: 'char', length: 1, nullable: true })
  Embarked: string | null;
}
