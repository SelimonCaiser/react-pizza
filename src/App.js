import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import "./scss/app.scss";
import NotFound from "./pages/NotFound";
import Cart from "./components/CardPizza/Cart";
import Pizzas from "./components/CardPizza/Pizzas";
import Drinks from "./components/CartDrinks/Drinks";
import Zakuski from "./components/CardZakuski/Zakuski";
import Rolls from "./components/CardRolls/Rolls";
import React, { useState } from "react";
import CartEmpty from "./components/CardPizza/CartEmpty";

export const SearchContext = React.createContext("");

function App() {
  const [searchValue, setSearchValue] = useState("");
  console.log(searchValue);
  const path = useLocation().pathname;
  const location = path.split("/")[1];

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div className={"image " + location}>
        <div class="wrapper wrp">
          <Header />
          <div class="content">
            <div class="container">
              <Routes>
                <Route path="/cartEmpty" element={<CartEmpty />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/drinks" element={<Drinks />} />
                <Route path="/pizzas" element={<Pizzas />} />
                <Route path="/rolls" element={<Rolls />} />
                <Route path="/zakuski" element={<Zakuski />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
