import { useEffect, useState, useMemo } from "react";
import { Passenger } from "../types/titanic";
import { getAllPassengers, getPieceOfData } from "../services/titanicApi";
import "../styles/PieceOfData.css";

const PieceOfData = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [allPassengers, setAllPassengers] = useState<Passenger[]>([]);
  const [passengersToShow, setPassengersToShow] = useState<Passenger[]>([]);

  const [filters, setFilters] = useState({
    Survived: "",
    Pclass: "",
    Sex: "",
    Embarked: "",
  });

  useEffect(() => {
    const fetchAllPassengers = async () => {
      try {
        const all = await getAllPassengers();
        setAllPassengers(all);
      } catch (err) {
        console.error("Erreur lors du chargement de tous les passagers :", err);
      }
    };
    fetchAllPassengers();
  }, []);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const { data, total } = await getPieceOfData(page, limit);
        setPassengers(data);
        setTotal(total);
      } catch (err) {
        console.error("Erreur lors du chargement des passagers :", err);
      }
    };
    fetchPageData();
  }, [page, limit]);

  const uniqueValues = useMemo(() => {
    const getUnique = (key: keyof Passenger) =>
      Array.from(
        new Set(
          allPassengers
            .map((p) => p[key])
            .filter((v) => v !== null && v !== undefined)
        )
      ).map(String); // tout convertir en string

    return {
      Survived: getUnique("Survived"),
      Pclass: getUnique("Pclass"),
      Sex: getUnique("Sex"),
      Embarked: getUnique("Embarked"),
    };
  }, [allPassengers]);

  useEffect(() => {
    let data = searchTerm.trim()
      ? allPassengers.filter((passenger) =>
          passenger.Name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : passengers;

    data = data.filter(
      (p) =>
        (!filters.Survived || String(p.Survived) === filters.Survived) &&
        (!filters.Pclass || String(p.Pclass) === filters.Pclass) &&
        (!filters.Sex || p.Sex === filters.Sex) &&
        (!filters.Embarked || p.Embarked === filters.Embarked)
    );

    setPassengersToShow(data);
  }, [searchTerm, allPassengers, passengers, filters]);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container">
      <div className="header">
        <h2 className="titre">Liste des passagers</h2>
        <div className="search-bar">
          <label htmlFor="limit">Afficher par: </label>
          <input
            type="number"
            placeholder="Nombre de passagers a afficher"
            value={limit}
            max={30}
            min={1}
            name="limit"
            onChange={(e) => setLimit(Number(e.target.value))}
            className="search-input"
            style={{marginRight: "50px"}}
          />
          <input
            type="text"
            placeholder="Rechercher par nom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="table-container">
        <table className="passenger-table">
          <thead>
            <tr>
              <th></th>
              <th>
                <select
                  className="filter-select"
                  value={filters.Survived}
                  onChange={(e) =>
                    handleFilterChange("Survived", e.target.value)
                  }
                >
                  <option value="">Tous</option>
                  {uniqueValues.Survived.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <select
                  className="filter-select"
                  value={filters.Pclass}
                  onChange={(e) => handleFilterChange("Pclass", e.target.value)}
                >
                  <option value="">Tous</option>
                  {uniqueValues.Pclass.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <select
                  className="filter-select"
                  value={filters.Sex}
                  onChange={(e) => handleFilterChange("Sex", e.target.value)}
                >
                  <option value="">Tous</option>
                  {uniqueValues.Sex.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>
                <select
                  className="filter-select"
                  value={filters.Embarked}
                  onChange={(e) =>
                    handleFilterChange("Embarked", e.target.value)
                  }
                >
                  <option value="">Tous</option>
                  {uniqueValues.Embarked.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Survived</th>
              <th>Pclass</th>
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
            {passengersToShow.map((passenger, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "row-even" : "row-odd"}
              >
                <td>{passenger.Name}</td>
                <td>{passenger.Survived}</td>
                <td>{passenger.Pclass}</td>
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
      </div>

      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Précédent
        </button>

        <span className="pagination-info">
          Page {totalPages === 0 ? 0 : page} sur {totalPages}
        </span>

        <button
          className="pagination-button"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default PieceOfData;
