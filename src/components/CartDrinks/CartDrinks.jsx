import React, { useState } from "react";
import "../../scss/CartDrinks.scss";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../redux/slices/cartSlice";

const CardDrinks = ({ id, title, price, imageUrl, types, desc }) => {
  // Redux
  const [activeType, setActiveTypes] = useState(0);
  const [activeSizes, setActiveSizes] = useState(0);
  const cartItem = useSelector((state) =>
    state.cartSlice.items.find((obj) => obj.id === id)
  );

  const addedProductInCart = cartItem ? cartItem.count : 0;
  const dispath = useDispatch();
  const onClickAddProductInCart = () => {
    const item = {
      id: id,
      price: price,
      title: title,
      types: types[activeType],
      imageUrl: imageUrl,
    };
    dispath(addProducts(item));
  };

  return (
    <div>
      <div className="pizza-block__wrapper wrapper_drinks drinks">
        <div class="pizza-block">
          <img class="pizza-block__image" src={imageUrl} alt={title} />
          <h4 class="pizza-block__title">{title}</h4>
          <p className="desc">{desc}</p>
          <div class="pizza-block__selector my_class">
            <ul>
              {types.map((type, index) => {
                return (
                  <li
                    onClick={() => setActiveSizes(index)}
                    className={activeSizes === index ? "active" : ""}
                    key={index}
                  >
                    {type}
                  </li>
                );
              })}
            </ul>
          </div>
          <div class="pizza-block__bottom">
            <div class="pizza-block__price">
              <b>{price} руб.</b>
            </div>
            <button
              onClick={onClickAddProductInCart}
              class="button button--outline button--add"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Добавить</span>
              {addedProductInCart > 0 && <i>{addedProductInCart}</i>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDrinks;
