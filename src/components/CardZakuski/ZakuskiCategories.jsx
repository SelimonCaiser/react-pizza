import React, { useState } from "react";

export const ZakuskiCategories = ({ value, onClickValue }) => {
  const category = ["Все", "Картошка", "Курица", "Салаты", "Креветки"];
  return (
    <div class="categories">
      <ul>
        {category.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onClickValue(i)}
            className={value === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
