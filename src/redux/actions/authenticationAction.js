import {
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../constants/authenticationConstants";
import { users } from "../../data/users";
import { members } from "../../data/members";
import { tasks } from "../../data/tasks";

export const loginAction = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  let data;
  const user = users.find((user) => user.email === email);
  if (user && user.password === password) {
    data = user;

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    localStorage.setItem("membersList", JSON.stringify(members));
    localStorage.setItem("tasksList", JSON.stringify(tasks));
  } else {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: "Invalid email or password",
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: USER_LOGOUT });
};
