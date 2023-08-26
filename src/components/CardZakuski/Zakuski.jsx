import React, { useContext, useEffect, useRef, useState } from "react";
import CardZakuski from "./CardZakuski";
import { Search } from "../Search/Search";
import { Skeleton } from "../CardPizza/Skeleton";
import Sort, { list } from "../Sort";
import { ZakuskiCategories } from "./ZakuskiCategories";
import Pagination from "../CardPagination/Pagination";
import { SearchContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoriesId,
  setCurrentPage,
  setFilter,
} from "../../redux/slices/filterSlice";
import axios from "axios";
// Images
import burger from "../../img/banner/zakuski/burger.png";
import chicken from "../../img/banner/zakuski/chiken.png";
import Banner from "../Banner/Banner";
import QueryString from "qs";
import { useNavigate } from "react-router-dom";

const Zakuski = ({ search }) => {
  // Redux
  const isSearch = useRef(false);
  const dispatch = useDispatch();
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const currentPage = useSelector((state) => state.filterSlice.currentPage);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const onChangeCategories = (id) => {
    dispatch(setCategoriesId(id));
  };
  // Const for REST API
  const [isLoading, setIsLoading] = useState(true);
  let [items, setItems] = useState([]);
  const searchVl = search ? `search=${search}` : "";
  const sort = useSelector((state) => state.filterSlice.sort);

  // URL for params

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

  useEffect(() => {
    setIsLoading(true);
    const sortBy = sort.sort.replace("-", "");
    const order = sort.sort.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    // Axios
    axios
      .get(
        `https://64a2d4c3b45881cc0ae5c4a2.mockapi.io/zakuski?page=
      ${currentPage}
      &limit=4&${category}&sortBy=
      ${sortBy}&order=
      ${order}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchVl, currentPage]);

  // Search function
  const zakuski = items
    .filter((obj) => {
      if (obj.title.includes(searchValue)) {
        return true;
      }
      return false;
    })
    .map((obj) => <CardZakuski key={obj.id} {...obj} />);
  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div>
      <div className="content__top">
        <ZakuskiCategories
          onClickValue={onChangeCategories}
          value={categoryId}
        />
        <Sort />
      </div>
      <Search
        searchText={"Поиск закусок.."}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
      <Banner img={burger} />
      <h2 class="content__title">Все закуски</h2>
      <div className="content__items">{isLoading ? skeleton : zakuski}</div>
      <Banner img={chicken} />
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Zakuski;
