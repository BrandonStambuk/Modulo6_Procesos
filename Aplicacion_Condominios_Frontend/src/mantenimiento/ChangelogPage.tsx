import React, { useEffect, useState } from "react";
import "./style.css";
import { CategoryForm } from "./categoryService/registerCategory/CategoryForm";
import CategoryList from "./categoryService/categoryList/CategoryList";
import { getAllCategories } from "./services/maintenance/categoryService";

type Props = {};

const ChangelogPage = (props: Props) => {
  const [categories, setCategories] = useState<
    { id: number; catnombre: string; catdescripcion: string }[]
  >([]);

  const [flag, setFlag] = useState(true);

  const handleRegisterCategory = (
    id: number,
    catnombre: string,
    catdescripcion: string
  ) => {
    setCategories([...categories, { id, catnombre, catdescripcion }]);
  };

  useEffect(() => {
    getCategories();
  }, [flag]);

  const getCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error) {}
  };

  return (
    <>
      <h2>CATEGORÍAS DE SERVICIOS</h2>
      <div id="content">
        <CategoryForm onRegister={handleRegisterCategory} />
        <CategoryList categories={categories} flag={flag} setFlag={setFlag} />
      </div>
    </>
  );
};

export default ChangelogPage;
