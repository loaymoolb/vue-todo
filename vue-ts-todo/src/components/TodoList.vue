<template>
  <draggable
    tag="ul"
    :list="todoList"
    class="todo-list"
    itemKey="todo.id"
    handle=".handle"
    @end="dragTodo"
  >
    <template #item="{ element: todo, index }">
      <TodoItem
        :key="todo.id"
        :todo="todo"
        :index="index"
        @toggle-complete="toggleTodoComplete"
        @edit-todo="toggleEditTodo"
        @update-todo="updateTodo"
        @delete-todo="deleteTodo"
      />
    </template>
  </draggable>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import TodoItem from "../components/TodoItem.vue";

defineProps({
  todoList: {
    type: Array as any,
    required: true,
  },
  dragTodo: {
    type: Function as any,
    required: true,
  },
  toggleEditTodo: {
    type: Function as any,
    required: true,
  },
  updateTodo: {
    type: Function as any,
    required: true,
  },
  toggleTodoComplete: {
    type: Function as any,
    required: true,
  },
  deleteTodo: {
    type: Function as any,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  margin-top: 24px;
  gap: 20px;
  padding: 0;
}
</style>
