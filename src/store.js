// import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, applyMiddleware } from "redux";
import { userLoginReducer } from "./redux/reducers/authenticationReducer";
import {
  taskListReducer,
  taskDeleteReducer,
} from "./redux/reducers/taskReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  getTaskList: taskListReducer,
  deleteTask: taskDeleteReducer,
});

const middleware = [thunk];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
    membersInfo: [],
    tasksInfo: [],
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
