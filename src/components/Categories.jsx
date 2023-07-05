import React from "react";

export const Categories = ({ value, onClickValue }) => {
  const category = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div class="categories">
      <ul>
        {category.map((categoryName, i) => 
          <li
          key={i}
            onClick={() => onClickValue(i)}
            className={value === i ? "active" : ""}
          >
            {categoryName}
          </li>
        )}
      </ul>
    </div>
  );
};
