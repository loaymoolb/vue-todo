export interface Todo {
  id: string;
  todo: string;
  isCompleted: boolean;
  isEditing: boolean;
}

export interface TodoState {
  todo: string;
  invalid: boolean;
  errMsg: string;
}
