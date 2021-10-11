import {
  ADD_TABLE_ROW,
  TABLE_EDIT,
  REMOVE_TABLE_DATA,
  FETCH_TABLE_DATA,
} from "../ducks/table";

const useActionTypes = [ADD_TABLE_ROW, TABLE_EDIT, REMOVE_TABLE_DATA];

const apiList = () => ({
  [FETCH_TABLE_DATA]: {
    url: "https://gist.githubusercontent.com/mariarogina/1bf4e1947ec2fc1e8ded4882e57f4d69/raw/89eb2570fcfd69f31c4dfd21f5f49733fe0bb4d0/countriesdata.json",
    selector: (data) => data,
  },
});

export const persistMiddleware = (storeApi) => (next) => (action) => {
  if (useActionTypes.includes(action.type)) {
    window.localStorage.setItem("table", JSON.stringify(action.payload));
  }

  return next(action);
};

export const fetchMiddleware = (storeAPI) => (next) => (action) => {
  if (action.type.includes("REQUEST")) {
    const getApi = apiList(action.payload)[action.type.replace("_REQUEST", "")];
    console.log(getApi.url);

    fetch(
      "https://gist.githubusercontent.com/mariarogina/1bf4e1947ec2fc1e8ded4882e57f4d69/raw/89eb2570fcfd69f31c4dfd21f5f49733fe0bb4d0/countriesdata.json"
    ).then((data) => {
      storeAPI.dispatch({
        type: action.type.replace("REQUEST", "SUCCESS"),
        payload: getApi.selector(data),
      });
    });
  }

  return next(action);
};
