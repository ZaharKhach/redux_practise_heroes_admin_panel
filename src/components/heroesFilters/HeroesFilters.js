import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";

import {
  filtersFetched,
  filtersFetching,
  filtersFetchingError,
} from "../../actions";
import { filterHeroes } from "../../actions";

import classNames from "classnames";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const { filters, filtersLoadingStatus } = useSelector((state) => state);
  const [active, setActive] = useState(null);

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then((res) => dispatch(filtersFetched(res)))
      .catch(() => filtersFetchingError());
  }, []);

  const btnOnClick = (e, item) => {
    dispatch(filterHeroes(item.name));
    setActive(item.name);
  };

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderFilters = (arr) => {
    return arr.map((item, index) => {
      return (
        <button
          onClick={(e) => btnOnClick(e, item)}
          key={index}
          className={classNames(`${item.className}`, {
            active: item.name === active,
          })}
        >
          {item.name}
        </button>
      );
    });
  };

  const filtersNodes = renderFilters(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Filter heroes by filter</p>
        <div className="btn-group">{filtersNodes}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
