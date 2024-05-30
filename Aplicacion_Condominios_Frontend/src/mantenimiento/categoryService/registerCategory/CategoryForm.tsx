import React, { useState } from "react";
import "./style.css";
import { createCategory } from "../../services/maintenance/categoryService";

interface CategoryFormProps {
  onRegister: (id: number, catnombre: string, catdescripcion: string) => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const id: number = 0;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() && description.trim()) {
      onRegister(id, name, description);
      setName("");
      setDescription("");
      registerData();
    } else {
      alert("Todos los campos deben ser llenados");
    }
  };

  const registerData = async () => {
    try {
      createCategory({
        catnombre: name,
        catdescripcion: description,
        disabled: false,
      });
    } catch (error) {
      console.error("Error creating new category:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="form-field">
      <div className="input">
        <p>Nombre de la categoríAAAa</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input">
        <p>DescripcionFFF</p>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
};
