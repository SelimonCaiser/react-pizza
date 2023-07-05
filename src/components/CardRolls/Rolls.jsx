import React, { useContext, useEffect, useState } from "react";
import CardRolls from "./CardRolls";
import Sort from "../Sort";
import { Search } from "../Search/Search";
import { Skeleton } from "../CardPizza/Skeleton";
import Pagination from "../CardPagination/Pagination";
import { SearchContext } from "../../App";
import { useSelector } from "react-redux";
import axios from "axios";

const Rolls = ({ search }) => {
  // Redux
  const sort = useSelector((state) => state.filterSlice.sort);

  // Const
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);
  let [items, setItems] = useState([]);
  const [paginatePage, setPaginatePage] = useState(1);
  const [categoryId, setCategoryId] = useState(0);

  // Axios
  useEffect(() => {
    setIsLoading(true);
    const sortBy = sort.sort.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const order = sort.sort.includes("-") ? "asc" : "desc";
    const searchVl = search ? `search=${search}` : "";
    axios
      .get(
        `https://64a2997ab45881cc0ae568a2.mockapi.io/rolls?page
    ${paginatePage}
    &limit=4&${category}
    ${search}&sortBy=
    ${sortBy}&order=
    ${order}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, search, paginatePage]);
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
      <div className="content__top">
        <Search
          searchText={"Поиск роллов..."}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Sort />
      </div>
      <h2 class="content__title">Все роллы</h2>
      <div className="content__items">{isLoading ? skeleton : rolls}</div>
      <Pagination
        pageRange={4}
        pageCount={3}
        onChangePage={(number) => setPaginatePage(number)}
      />
    </div>
  );
};

export default Rolls;
