import React, { useState } from "react";

export const CategoriesDrink = ({ value, onClickValue }) => {
  const category = ["Все", "Напитки", "Морс", "Вода", "Соки", "Кофе"];
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
