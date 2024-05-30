import React, { useState } from "react";
import "./style.css";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { deleteCategory } from "../../services/maintenance/categoryService";

interface CategoryListProps {
  categories: { id: number; catnombre: string; catdescripcion: string }[];
  flag: boolean;
  setFlag: (flag: boolean) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  flag,
  setFlag,
}) => {
  const handleDelete = (id: number) => {
    deleteItem(id);
  };

  const deleteItem = async (id: number) => {
    try {
      console.log("Flag antes:", flag);
      deleteCategory(id);
      setFlag(!flag);
      console.log("Flag despues:", flag);
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="left">Nombre de la categoría</th>
              <th className="left">Descripciónnnnn</th>
              <th className="righ">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{category.catnombre}</td>
                <td>{category.catdescripcion}</td>
                <td className="actions">
                  <button type="button">
                    <CreateOutlinedIcon fontSize="large" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(category.id)}
                  >
                    <DeleteOutlinedIcon fontSize="large" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
