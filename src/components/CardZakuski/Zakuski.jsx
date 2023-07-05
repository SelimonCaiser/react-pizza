import React, { useContext, useEffect, useState } from "react";
import CardZakuski from "./CardZakuski";
import { Search } from "../Search/Search";
import { Skeleton } from "../CardPizza/Skeleton";
import Sort from "../Sort";
import { ZakuskiCategories } from "./ZakuskiCategories";
import Pagination from "../CardPagination/Pagination";
import { SearchContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoriesId } from "../../redux/slices/filterSlice";
import axios from "axios";

const Zakuski = ({ search }) => {
  // Redux
  const dispatch = useDispatch();
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const onChangeCategories = (id) => {
    dispatch(setCategoriesId(id));
  };
  // Const
  const [isLoading, setIsLoading] = useState(true);
  let [items, setItems] = useState([]);
  const [paginatePage, setPaginatePage] = useState(1);
  const searchVl = search ? `search=${search}` : "";
  const sort = useSelector((state) => state.filterSlice.sort);

  useEffect(() => {
    setIsLoading(true);
    const sortBy = sort.sort.replace("-", "");
    const order = sort.sort.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    // Axios
    axios
      .get(
        `https://64a2d4c3b45881cc0ae5c4a2.mockapi.io/zakuski?page=
      ${paginatePage}
      &limit=4&${category}&sortBy=
      ${sortBy}&order=
      ${order}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchVl, paginatePage]);

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
      <h2 class="content__title">Все закуски</h2>
      <div className="content__items">{isLoading ? skeleton : zakuski}</div>
      <Pagination
        pageRange={4}
        pageCount={2}
        onChangePage={(number) => setPaginatePage(number)}
      />
    </div>
  );
};

export default Zakuski;
