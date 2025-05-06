import React from "react";
import "../styles/FieldsMeaning.css";
import FieldItem from "./FieldItem";
// import "./FieldsMeaning.css"

const FieldsMeaning: React.FC = () => {
  const fields = [
    { label: 'PassengerId', description: 'Identifiant unique de chaque passager.', bgColor: '#2a2a40', icon: 'fa-user' },
    { label: 'Survived', description: 'Indique si le passager a survécu (1) ou non (0).', bgColor: '#3a2a40', icon: 'fa-life-ring' },
    { label: 'Pclass', description: 'Classe du passager (1 = Première classe, 2 = Deuxième classe, 3 = Troisième classe).', bgColor: '#2a3a40', icon: 'fa-ticket-alt' },
    { label: 'Name', description: 'Nom complet du passager.', bgColor: '#403a2a', icon: 'fa-id-card' },
    { label: 'Sex', description: 'Sexe du passager (male pour homme, female pour femme).', bgColor: '#2a4040', icon: 'fa-venus-mars' },
    { label: 'Age', description: 'Âge du passager en années (avec des valeurs manquantes pour certains).', bgColor: '#402a3a', icon: 'fa-birthday-cake' },
    { label: 'SibSp', description: 'Nombre de frères et sœurs ou conjoints présents à bord (Isan\'ny frere, soeur, epoux, epouse).', bgColor: '#3a402a', icon: 'fa-users' },
    { label: 'Parch', description: 'Nombre de parents ou d’enfants présents à bord (Isan\'ny pere, mere, enfants).', bgColor: '#2a403a', icon: 'fa-child' },
    { label: 'Ticket', description: 'Numéro du billet du passager.', bgColor: '#40302a', icon: 'fa-ticket-alt' },
    { label: 'Fare', description: 'Prix du billet payé par le passager.', bgColor: '#2a3540', icon: 'fa-money-bill' },
    { label: 'Cabin', description: 'Numéro de la cabine.', bgColor: '#402a2a', icon: 'fa-door-closed' },
    { label: 'Embarked', description: 'Port d’embarquement (C = Cherbourg, Q = Queenstown, S = Southampton).', bgColor: '#2a402a', icon: 'fa-ship' },
  ];

  // const bgColor = "gray";

  return (
    <div>
      <h2>Liste des champs dans les données et ses signification:</h2>
      <div className="container">
        {/* <ul className="list-disc list-inside text-gray-800"> */}
          {fields.map((field, index) => (
            <FieldItem
              key={index}
              label={field.label}
              icon={field.icon}
              description={field.description}
              bgColor={field.bgColor}
            />
          ))}
        {/* </ul> */}
      </div>
      <p>
        <a
          href="https://www.kaggle.com/datasets/brendan45774/test-file"
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir données originales
        </a>
      </p>
    </div>
  );
};

export default FieldsMeaning;
