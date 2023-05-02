<template>
  <main>
    <h1>To-Do List</h1>
    <TodoInput @create-todo="createTodo" />
    <TodoList
      v-if="todoList.length > 0"
      :todoList="todoList"
      :dragTodo="dragTodo"
      :toggleEditTodo="toggleEditTodo"
      :toggleTodoComplete="toggleTodoComplete"
      :updateTodo="updateTodo"
      :deleteTodo="deleteTodo"
    />
    <p v-else class="todos-msg">
      <span>There's no tasks yet!</span>
    </p>
    <p v-if="todosCompleted && todoList.length > 0" class="todos-msg">
      <Icon icon="noto-v1:party-popper" />
      <span>You have completed all your tasks!</span>
    </p>
    <button v-if="todoList.length > 0" @click="resetTodos" class="reset-todos">
      Reset Tasks
    </button>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import { Icon } from "@iconify/vue";
import TodoInput from "../components/TodoInput.vue";
import TodoList from "../components/TodoList.vue";
import { Todo } from "../types/types";
import { fetchData, setData } from "../utils/localStorage";

const todoList = ref<Todo[]>([]);
const todosCompleted = computed(() => {
  return todoList.value.every((todo) => todo.isCompleted);
});

// Fetch initial todo list from local storage on component mount
todoList.value = fetchData();

// Functions for updating todo list
const createTodo = (todo: string): void => {
  const newTodo: Todo = {
    id: uuidv4(),
    todo,
    isCompleted: false,
    isEditing: false,
  };
  todoList.value.push(newTodo);
  setData(todoList.value);
};

const resetTodos = () => {
  todoList.value = [];
  setData(todoList.value);
};

const toggleTodoComplete = (index: number): void => {
  todoList.value[index].isCompleted = !todoList.value[index].isCompleted;
  setData(todoList.value);
};
const toggleEditTodo = (index: number): void => {
  todoList.value[index].isEditing = !todoList.value[index].isEditing;
  setData(todoList.value);
};

const updateTodo = (todo: string, index: number): void => {
  if (todo.trim() !== "") {
    todoList.value[index].todo = todo;
    setData(todoList.value);
  }
};

const deleteTodo = (todo: { id: string }): void => {
  todoList.value = todoList.value.filter(
    (todoFilter) => todoFilter.id !== todo.id
  );
  setData(todoList.value);
};

const dragTodo = (): void => {
  setData(todoList.value);
};
</script>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 24px auto;
  padding: 48px 16px;

  h1 {
    margin-bottom: 16px;
    text-align: center;
  }

  .todos-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }

  .reset-todos {
    background: #62d2c3;
    color: #fff;
    border: 1px solid #62d2c3;
    padding: 12px 16px;
    border-radius: 16px;
    width: 60%;
    margin: 24px auto;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
  }
}
</style>
