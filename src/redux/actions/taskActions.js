import {
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_LIST_FAIL,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
} from "../constants/taskConstants";

export const listTasks = () => async (dispatch) => {
  dispatch({
    type: TASK_LIST_REQUEST,
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const tasksListFromStorage = localStorage.getItem("tasksList")
    ? JSON.parse(localStorage.getItem("tasksList"))
    : null;

  if (tasksListFromStorage) {
    dispatch({
      type: TASK_LIST_SUCCESS,
      payload: tasksListFromStorage,
    });
  } else {
    dispatch({
      type: TASK_LIST_FAIL,
      payload: "not found",
    });
  }
};

export const deleteTaskAction = (id) => async (dispatch) => {
  dispatch({
    type: TASK_DELETE_REQUEST,
  });

  const tasksListFromStorage = localStorage.getItem("tasksList")
    ? JSON.parse(localStorage.getItem("tasksList"))
    : null;

  const newTasksList = tasksListFromStorage.filter((task) => task.id !== id);
  localStorage.setItem("tasksList", JSON.stringify(newTasksList));

  if (newTasksList.length > 0) {
    dispatch({
      type: TASK_DELETE_SUCCESS,
    });
  } else {
    dispatch({
      type: TASK_DELETE_FAIL,
      payload: "not found",
    });
  }
};
