import React, { useEffect, Fragment, useState } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategoriesRequest,
  fetchItemsRequest,
  fetchMoreRequest,
} from "../actions/actionCreators";
import Preloader from "./Preloader";
import Error from "./Error";
import Search from "./Search";

function Catalog({ location, history }) {
  const params = new URLSearchParams(location.search);
  const [activeCategory, setActiveCategory] = useState(
    params.has("categoryId") ? params.get("categoryId") : null
  );
  const { items, categories, more } = useSelector((state) => state.catalog);

  const { searchString } = useSelector((state) => state.search);

  const dispatch = useDispatch();
  const offset = items.data.length;

  const setUrl = () =>
    history.replace(`${location.pathname}?${params.toString()}`);

  useEffect(() => {
    if (params.has("offset")) params.delete("offset");
    dispatch(fetchCategoriesRequest());
    dispatch(fetchItemsRequest(params));
  }, []);

  const handleClickCategory = (evt, id) => {
    evt.preventDefault();
    if (id == activeCategory) return;
    if (!activeCategory) {
      params.delete("categoryId");
    } else {
      params.set("categoryId", id);
    }
    setActiveCategory(id);

    params.delete("offset");
    setUrl();
    dispatch(fetchItemsRequest(params));
  };

  const handleMore = () => {
    params.set("offset", offset);
    setUrl();
    dispatch(fetchMoreRequest(params));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    params.set("q", searchString);
    setUrl();
    dispatch(fetchItemsRequest(params));
  };

  const handleChange = (evt) => {
    dispatch(fetchItemsRequest(evt.target.value));
  };

  return (
    <Fragment>
      {location.pathname === "/catalog" && (
        <Search
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchString={searchString}
          className="catalog-search-form form-inline"
        />
      )}
      <ul className="catalog-categories nav justify-content-center">
        <li className="nav-item">
          <NavLink
            to="#"
            isActive={() => !activeCategory}
            onClick={(evt) => handleClickCategory(evt, null)}
            className="nav-link"
            activeClassName="active"
          >
            Все
          </NavLink>
        </li>
        {categories &&
          categories.data &&
          categories.data.length &&
          categories.data.map((item) => (
            <li className="nav-item" key={item.id}>
              <NavLink
                to="#"
                isActive={() => activeCategory == item.id}
                onClick={(evt) => handleClickCategory(evt, item.id)}
                className="nav-link"
                activeClassName="active"
              >
                {item.title}
              </NavLink>
            </li>
          ))}
      </ul>
      {items.error ? (
        <div></div>
      ) : (
        items.data &&
        items.data.length > 0 && (
          <div className="row">
            {items.data.map((item) => (
              <div className="col-4" key={item.id}>
                <div
                  className="card catalog-item-card"
                  style={{ height: "400px" }}
                >
                  <img
                    src={item.images[0]}
                    className="card-img-top img-fluid"
                    alt={item.title}
                    style={{
                      maxHeight: "220px",
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <div className="card-body">
                    <p className="card-text">{item.title}</p>
                    <p className="card-text">{item.price} руб.</p>
                    <Link
                      to={`/products/${item.id}`}
                      className="btn btn-outline-primary"
                    >
                      Заказать
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
      {(!items.loading && items.data.length) === 0 && (
        <p className="text-center">Ничего не найдено :(</p>
      )}
      {items.loading && <Preloader />}
      {more.error && <Error callback={handleMore} />}
      {!items.loading && more.show && items.data.length > 5 && (
        <div className="text-center">
          <button className="btn btn-outline-primary" onClick={handleMore}>
            Загрузить ещё
          </button>
        </div>
      )}
    </Fragment>
  );
}

const CatalogWithRouter = withRouter(Catalog);
export default CatalogWithRouter;
