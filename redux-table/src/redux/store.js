import { createStore, applyMiddleware,compose  } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { persistMiddleware, fetchMiddleware } from "./middlewares";

import reducer from "./reducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(
    applyMiddleware(
        thunk,
        persistMiddleware,
        fetchMiddleware,
        logger
      ),
  // other store enhancers if any
);

const store = createStore(reducer, enhancer
  );

export default store;
