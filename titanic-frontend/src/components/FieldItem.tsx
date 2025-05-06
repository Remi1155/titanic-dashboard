import React from "react";
import "../styles/FieldItem.css";

interface FieldItemProps {
  label: string;
  description: string;
  bgColor: string;
  icon: string;
}

const FieldItem: React.FC<FieldItemProps> = ({
  label,
  description,
  bgColor,
  icon,
}) => {
  return (
    <div className="field-item" style={{ backgroundColor: bgColor }}>
      <div className="head-item">
        <i className={`fas ${icon} field-item-icon`}></i>
        <h3>{label}</h3>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default FieldItem;
