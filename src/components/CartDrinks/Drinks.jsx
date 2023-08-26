import React, { useContext, useEffect, useRef, useState } from "react";
import CardDrinks from "./CartDrinks";
import { CategoriesDrink } from "./DrinksCategory";
import Sort, { list } from "../Sort";
import { Skeleton } from "../CardPizza/Skeleton";
import { Search } from "../Search/Search";
import Pagination from "../CardPagination/Pagination";
import { SearchContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoriesId,
  setCurrentPage,
  setFilter,
} from "../../redux/slices/filterSlice";
import axios from "axios";
import Banner from "../Banner/Banner";
// Images
import BANNER_DRINK from "../../img/banner/drinks/drink.png";
import BANNER_DRINK_TWO from "../../img/banner/drinks/drink_two.png";
import QueryString from "qs";
import { useNavigate } from "react-router-dom";

const Drinks = ({ search }) => {
  // Redux
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filterSlice.sort);
  const { categoryId } = useSelector((state) => state.filterSlice.categoryId);
  const { currentPage } = useSelector((state) => state.filterSlice);
  const onChangeCategories = (id) => {
    dispatch(setCategoriesId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  // Const
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const searchVl = search ? `search=${search}` : "";
  const [isLoading, setIsLoading] = useState(true);
  let [items, setItems] = useState([]);

  // URL for params

  const isSearch = useRef(false);

  const navigate = useNavigate();
  React.useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.substring(1));

      const sortList = list.find((obj) => obj.sort === params.sort);

      dispatch(
        setFilter({
          ...params,
          sortList,
        })
      );
      isSearch.current = true;
    }
  }, []);
  useEffect(() => {
    const queryString = QueryString.stringify({
      currentPage: currentPage,
      sort: sort,
    });
    navigate(`?${queryString}`);
  }, [currentPage, sort.sort]);

  // Axios
  useEffect(() => {
    setIsLoading(true);
    const sortBy = sort.sort.replace("-", "");
    const order = sort.sort.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    axios
      .get(
        `https://64a28641b45881cc0ae5484a.mockapi.io/drink?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

  // Search Function

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
      <Banner img={BANNER_DRINK} />
      <h2 class="content__title">Все напитки</h2>

      <div className="content__items">{isLoading ? skeleton : drinks}</div>
      <Banner img={BANNER_DRINK_TWO} />
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Drinks;
