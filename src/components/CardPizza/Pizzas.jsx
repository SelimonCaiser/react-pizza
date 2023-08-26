import React, { useContext, useEffect, useRef, useState } from "react";
import { Skeleton } from "./Skeleton";
import CardPizza from ".";
import { Categories } from "../Categories";
import Sort, { list } from "../Sort";
import { Search } from "../Search/Search";
import Pagination from "../CardPagination/Pagination";
import { SearchContext } from "../../App";
import qs from "qs";
// Redux Imports
import {
  setCategoriesId,
  setCurrentPage,
  setFilter,
} from "../../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Banner from "../Banner/Banner";
//Images
import BACK from "../../img/banner/pizza/banner.jpg";
import BACK_TWO from "../../img/banner/pizza/banner_two.png";
import { useNavigate } from "react-router-dom";

const Pizzas = ({ search }) => {
  // Redux
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = React.useRef(false);
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const { sort } = useSelector((state) => state.filterSlice.sort);
  const { categoryId, currentPage } = useSelector((state) => state.filterSlice);

  const onChangeCategories = (id) => {
    dispatch(setCategoriesId(id));
  };

  // Const
  const navigate = useNavigate();
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sort,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sort.sort, categoryId, currentPage]);

  // URL is params
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sort === params.sort);

      dispatch(
        setFilter({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);
  useEffect(() => {
    const queryString = qs.stringify({
      categoryId: categoryId,
      currentPage: currentPage,
      sort: sort,
    });
    navigate(`?${queryString}`);
  }, [categoryId, currentPage, sort.sort]);

  // Axios
  useEffect(() => {
    setIsLoading(true);
    const sortBy = sort.replace("-", "");
    const order = sort.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    axios
      .get(
        `https://649af5e2bf7c145d0239c6cc.mockapi.io/react-pizza-v2?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [sort, categoryId, currentPage, search]);

  // Search function
  const pizzas = items
    .filter((obj) => {
      if (obj.title.includes(searchValue)) {
        return true;
      }
      return false;
    })
    .map((obj) => <CardPizza key={obj.id} {...obj} />);
  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  return (
    <div>
      <div class="content__top">
        <Categories value={categoryId} onClickValue={onChangeCategories} />
        <Sort />
      </div>
      <Search
        searchText={"Поиск пицц..."}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
      <Banner img={BACK} />
      <h2 class="content__title">Вcе пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Banner img={BACK_TWO} />
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Pizzas;
