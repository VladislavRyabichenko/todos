const initialState = {
  todosList: [],
};

export const todos = (state = initialState, action) => {
  switch (action.type) {
    case "todos/addTodo":
      state.todosList = [...state.todosList, action.payload];
      return state;

    case "todos/removeTodo":
      state.todosList = state.todosList.filter(
        (todoItem) => todoItem.id !== action.payload.id
      );
      return state;
    case "todos/toggleTodoStatus":
      const foundIdx = state.todosList.findIndex(
        (todoItem) => todoItem.id === action.payload.id
      );
      if (foundIdx !== -1) {
        state.todosList[foundIdx].completed =
          !state.todosList[foundIdx].completed;
      }
      return state;

    case "todos/editTodo":
      const foundTodoIdx = state.todosList.findIndex(
        (todoItem) => todoItem.id === action.payload.id
      );
      if (foundTodoIdx !== -1) {
        state.todosList[foundTodoIdx].text = action.payload.text;
      }
      return state;

    default:
      return state;
  }
};
