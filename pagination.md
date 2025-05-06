Très bien, pour ajouter une **pagination** en dessous du tableau React, il faut que **le back (NestJS)** et **le front (React)** coopèrent :

---

## ✅ Étape 1 : Adapter le backend NestJS pour la pagination

Dans ton service `titanic.service.ts`, ajoute des **paramètres de pagination** (`page`, `limit`) :

```ts
async getPieceOfData(page: number = 1, limit: number = 10): Promise<{ data: Passenger[]; total: number }> {
  const offset = (page - 1) * limit;

  const [data, totalResult] = await Promise.all([
    this.passengersRepository.query(`
      SELECT *
      FROM passengers
      LIMIT ${limit}
      OFFSET ${offset}
    `),
    this.passengersRepository.query(`
      SELECT COUNT(*) as count
      FROM passengers
    `),
  ]);

  const total = parseInt(totalResult[0].count, 10);

  const passengers: Passenger[] = data.map((row) => ({
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

  return { data: passengers, total };
}
```

Dans le controller, expose une route comme :

```ts
@Get('piece-of-data')
async getPieceOfData(@Query('page') page = '1', @Query('limit') limit = '10') {
  return this.titanicService.getPieceOfData(Number(page), Number(limit));
}
```

---

## ✅ Étape 2 : Adapter le frontend React

Supposons que tu utilises `axios` pour les requêtes. Voici un composant React avec pagination :

```tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Passenger } from "../types/titanic";

const PieceOfData: React.FC = () => {
  const [data, setData] = useState<Passenger[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/piece-of-data?page=${page}&limit=${limit}`)
      .then((res) => {
        setData(res.data.data);
        setTotal(res.data.total);
      });
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h2>Liste des passagers</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>PassengerId</th>
            <th>Survived</th>
            <th>Pclass</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Age</th>
            <th>SibSp</th>
            <th>Parch</th>
            <th>Ticket</th>
            <th>Fare</th>
            <th>Cabin</th>
            <th>Embarked</th>
          </tr>
        </thead>
        <tbody>
          {data.map((passenger, index) => (
            <tr key={index}>
              <td>{passenger.PassengerId}</td>
              <td>{passenger.Survived}</td>
              <td>{passenger.Pclass}</td>
              <td>{passenger.Name}</td>
              <td>{passenger.Sex}</td>
              <td>{passenger.Age ?? "N/A"}</td>
              <td>{passenger.SibSp}</td>
              <td>{passenger.Parch}</td>
              <td>{passenger.Ticket ?? "N/A"}</td>
              <td>{passenger.Fare ?? "N/A"}</td>
              <td>{passenger.Cabin ?? "N/A"}</td>
              <td>{passenger.Embarked ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Précédent
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page} / {totalPages}
        </span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default PieceOfData;
```

---

### ✅ Résultat

- Les données sont paginées côté back avec `LIMIT` et `OFFSET`.
- Le frontend affiche 10 lignes par page, avec des boutons `Précédent / Suivant`.

Souhaites-tu remplacer les boutons par des numéros de page cliquables pour une pagination plus avancée ?