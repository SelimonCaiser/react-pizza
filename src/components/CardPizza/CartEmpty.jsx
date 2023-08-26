import React from "react";

const CartEmpty = () => {
  return (
    <>
      <div class="container container--cart">
        <div class="cart cart--empty">
          <h2>
            Корзина пустая <icon>😕</icon>
          </h2>
          <p>
            Вероятней всего, вы еще не чего не заказывали.
            <br />
            Для того, чтобы заказать еду, перейди на главную страницу.
          </p>
          <img src="https://lred.ru/images/2023/promo4.webp" alt="Empty cart" />
          <a href="/pizzas" class="button button--black">
            <span>Вернуться назад</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default CartEmpty;
