<template>
  <li>
    <input
      type="checkbox"
      :checked="todo.isCompleted"
      @input="$emit('toggle-complete', index)"
    />
    <div class="todo">
      <input
        v-if="todo.isEditing"
        class="todo-description"
        type="text"
        ref="editInput"
        :value="todo.todo"
        @input="
          $emit('update-todo', ($event.target as HTMLInputElement).value, index)
        "
        @keydown.enter="$emit('edit-todo', index)"
        @blur="$emit('edit-todo', index)"
      />
      <span
        v-else
        :class="{
          'completed-todo': todo.isCompleted,
        }"
        @click="$emit('edit-todo', index)"
      >
        {{ todo.todo }}
      </span>
    </div>
    <div class="todo-actions">
      <Icon
        v-if="todo.isEditing"
        icon="mdi:check-bold"
        class="icon check-icon"
        color="62D2C3"
        width="22"
        @click="$emit('edit-todo', index)"
      />
      <Icon
        v-else
        icon="mdi:pencil"
        class="icon edit-icon"
        color="62D2C3"
        width="22"
        @click="$emit('edit-todo', index)"
      />
      <Icon
        icon="mdi:trash-can-outline"
        class="icon trash-icon"
        color="red"
        width="22"
        @click="$emit('delete-todo', todo)"
      />
      <Icon
        icon="mdi:dots-horizontal"
        class="icon drag-icon handle todo-actions"
        color="gray"
        width="22"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { Todo } from "../types/types";

interface Props {
  todo: Todo;
  index: number;
}

defineProps<Props>();

const editInput = ref<HTMLInputElement | null>(null);

defineEmits(["edit-todo", "update-todo", "toggle-complete", "delete-todo"]);
</script>

<style lang="scss" scoped>
li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 10px;
  background-color: #f1f1f1;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  border-radius: 16px;

  &:hover {
    .todo-actions {
      opacity: 1;
    }
  }

  input[type="checkbox"] {
    appearance: none;
    width: 24px;
    height: 24px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 4px 4px 0px rgb(0 0 0 / 0.1);

    &:checked {
      background: url("https://api.iconify.design/mdi/check-circle-outline.svg?color=%2362D2C3")
        no-repeat center center / cover;
    }
  }

  .todo {
    flex: 1;

    span {
      word-break: break-word;
    }

    .completed-todo {
      text-decoration: line-through;
    }

    input[type="text"] {
      width: 100%;
      border: none;
      outline: none !important;
      font-size: 16px;
      background-color: transparent;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;

      &:focus {
        border: none;
        background-color: transparent;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
      }
    }
  }

  .todo-actions {
    display: flex;
    gap: 6px;
    opacity: 0;
    transition: 150ms ease-in-out;

    .icon {
      cursor: pointer;
    }

    .drag-icon {
      cursor: grab;
    }
  }
}
</style>
