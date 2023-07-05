import React, { useState } from "react";
import { Categories } from "../Categories";
import Sort from "../Sort";
import CardSouses from "./CardSouses";
import items from "../../assets/souses.json";
const Souses = () => {
  return (
    <div>
      <h2 class="content__title">Все соусы</h2>
      <div className="content__items">
        {items.map((obj) => (
          <CardSouses
            key={obj.id}
            title={obj.title}
            price={obj.price}
            imgUrl={obj.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Souses;
