import { Todo } from "../types/types";

export const fetchData = (): Todo[] => {
  const savedTodoList = JSON.parse(localStorage.getItem("todoList") || "[]");
  return savedTodoList;
};

export const setData = (todoList: Todo[]): void => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};
