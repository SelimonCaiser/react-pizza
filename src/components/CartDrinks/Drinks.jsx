import React, { useContext, useEffect, useState } from "react";
import CardDrinks from "./CartDrinks";
import { CategoriesDrink } from "./DrinksCategory";
import Sort from "../Sort";
import { Skeleton } from "../CardPizza/Skeleton";
import { Search } from "../Search/Search";
import Pagination from "../CardPagination/Pagination";
import { SearchContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoriesId } from "../../redux/slices/filterSlice";
import axios from "axios";

const Drinks = ({ search }) => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filterSlice.sort);
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const searchVl = search ? `search=${search}` : "";
  const [isLoading, setIsLoading] = useState(true);
  let [items, setItems] = useState([]);
  const [paginatePage, setPaginatePage] = useState(1);
  const onChangeCategories = (id) => {
    dispatch(setCategoriesId(id));
  };
  useEffect(() => {
    setIsLoading(true);
    const sortBy = sort.sort.replace("-", "");
    const order = sort.sort.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    // fetch(
    //   `https://64a28641b45881cc0ae5484a.mockapi.io/drink?page=${paginatePage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((arr) => {
    //     setItems(arr);
    //     setIsLoading(false);
    //   });
    axios
      .get(
        `https://64a28641b45881cc0ae5484a.mockapi.io/drink?page=${paginatePage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, paginatePage]);

  const drinks = items
    .filter((obj) => {
      if (obj.title.includes(searchValue)) {
        return true;
      }
      return false;
    })
    .map((obj) => <CardDrinks key={obj.id} {...obj} />);
  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div>
      <div class="content__top">
        <CategoriesDrink onClickValue={onChangeCategories} value={categoryId} />
        <Sort />
      </div>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchText={"Поиск напитков..."}
      />
      <h2 class="content__title">Все напитки</h2>

      <div className="content__items">{isLoading ? skeleton : drinks}</div>
      <Pagination
        pageRange={4}
        pageCount={4}
        onChangePage={(number) => setPaginatePage(number)}
      />
    </div>
  );
};

export default Drinks;
