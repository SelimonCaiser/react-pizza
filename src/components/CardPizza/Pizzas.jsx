import React, { useContext, useEffect, useState } from "react";
import { Skeleton } from "./Skeleton";
import CardPizza from ".";
import { Categories } from "../Categories";
import Sort from "../Sort";
import { Search } from "../Search/Search";
import Pagination from "../CardPagination/Pagination";
import { SearchContext } from "../../App";
import { setCategoriesId, setSort } from "../../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Pizzas = ({ search }) => {
  // Redux
  const sort = useSelector((state) => state.filterSlice.sort.sort);
  const dispatch = useDispatch();

  const onChangeCategories = (id) => {
    dispatch(setCategoriesId(id));
  };

  // Const
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = React.useState([]);
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const [paginatePage, setPaginatePage] = useState(1);

  // Axios
  useEffect(() => {
    setIsLoading(true);
    const sortBy = sort.replace("-", "");
    const order = sort.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const searchVl = search ? `search=${search}` : "";
    axios
      .get(
        `https://649af5e2bf7c145d0239c6cc.mockapi.io/react-pizza-v2?page=${paginatePage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, search, paginatePage]);

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
      <h2 class="content__title">Вcе пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination
        pageRange={4}
        pageCount={3}
        onChangePage={(number) => setPaginatePage(number)}
      />
    </div>
  );
};

export default Pizzas;
