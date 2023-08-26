import React, { useContext, useEffect, useRef, useState } from "react";
import CardRolls from "./CardRolls";
import Sort, { list } from "../Sort";
import { Search } from "../Search/Search";
import { Skeleton } from "../CardPizza/Skeleton";
import Pagination from "../CardPagination/Pagination";
import { SearchContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// Image
import BannerImage from "../../img/banner/roll/rolls.png";
import Banner from "../Banner/Banner";
import { setCurrentPage, setFilter } from "../../redux/slices/filterSlice";
import QueryString from "qs";
import { useNavigate } from "react-router-dom";

const Rolls = ({ search }) => {
  // Redux
  const isSearch = useRef(false);
  const sort = useSelector((state) => state.filterSlice.sort);
  const { currentPage } = useSelector((state) => state.filterSlice);
  const dispatch = useDispatch();
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // URL is params
  // URL is params
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
  // Const
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);
  let [items, setItems] = useState([]);
  const [categoryId, setCategoryId] = useState(0);

  // Axios
  useEffect(() => {
    setIsLoading(true);
    const sortBy = sort.sort.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const order = sort.sort.includes("-") ? "asc" : "desc";
    const searchV1 = search ? `search=${search}` : "";
    axios
      .get(
        `https://64a2997ab45881cc0ae568a2.mockapi.io/rolls?page=
    ${currentPage}
    &limit=4&${category}
    ${searchV1}&sortBy=
    ${sortBy}&order=
    ${order}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, search, currentPage]);
  // Search function
  const rolls = items
    .filter((obj) => {
      if (obj.title.includes(searchValue)) {
        return true;
      }
      return false;
    })
    .map((obj) => <CardRolls key={obj.id} {...obj} />);
  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div>
      <Sort />
      <div className="content__top">
        <Search
          searchText={"Поиск роллов..."}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>
      <Banner img={BannerImage} />
      <h2 class="content__title">Все роллы</h2>
      <div className="content__items">{isLoading ? skeleton : rolls}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Rolls;
