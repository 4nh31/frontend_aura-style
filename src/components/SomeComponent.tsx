import React from "react";
import { useNavigate } from "react-router";

const SomeComponent: React.FC = () => {
  let navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(-1);  // Navegar a la página anterior en el historial
      }}
    >
      Go Back
    </button>
  );
}

export default SomeComponent;