<template>
  <div>
    <div class="input-wrap">
      <input
        type="text"
        v-model="todo.todo"
        ref="TodoInput"
        placeholder="Add task description"
        @keydown.enter="createTodo()"
      />
      <button @click="createTodo()">Create</button>
    </div>
    <p class="err-msg" v-if="todo.invalid">{{ todo.errMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { TodoState } from "../types/types";

const TodoInput = ref<HTMLInputElement | null>(null);

const emit = defineEmits(["create-todo"]);

const todo = reactive<TodoState>({
  todo: "",
  invalid: false,
  errMsg: "Todo value cannot be empty!",
});

const createTodo = () => {
  todo.invalid = todo.todo === "";
  if (todo.invalid) return;
  emit("create-todo", todo.todo);
  todo.todo = "";
};
</script>

<style lang="scss" scoped>
.input-wrap {
  display: flex;
  transition: 250ms ease;
  border: 3px solid #62d2c3;
  border-radius: 16px;

  &:focus-within {
    box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1),
      0 -2px 4px -2px rgb(0 0 0 / 0.1);
  }

  input {
    width: 100%;
    padding: 16px 16px;
    border: none;
    border-radius: 16px;

    &:focus {
      outline: none;
    }
  }

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 0 16px 16px 0;
  }
}

.err-msg {
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
  color: red;
}
</style>
