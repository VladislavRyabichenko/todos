const initialState = {
  todosList: [],
};

export const todos = (state = initialState, action) => {
  switch (action.type) {
    case "todos/setAllTodos":
      return { ...state, todosList: [...action.payload.todos] };

    case "todos/addTodo":
      return { ...state, todosList: [...state.todosList, action.payload] };

    case "todos/removeTodo":
      const filteredTodosList = state.todosList.filter(
        (todoItem) => todoItem.id !== action.payload.id
      );
      return {
        ...state,
        todosList: filteredTodosList,
      };

    case "todos/toggleTodoStatus":
      const todoList = state.todosList;
      const foundIdx = state.todosList.findIndex(
        (todoItem) => todoItem.id === action.payload.id
      );
      if (foundIdx !== -1) {
        todoList[foundIdx].completed = !state.todosList[foundIdx].completed;
        return { ...state, todosList: [...todoList] };
      }
      return state;

    case "todos/editTodo":
      const newTodoList = state.todosList;
      const foundTodoIdx = newTodoList.findIndex(
        (todoItem) => todoItem.id === action.payload.id
      );
      if (foundTodoIdx !== -1) {
        newTodoList[foundTodoIdx].text = action.payload.text;
        return { ...state, todosList: [...newTodoList] };
      }
      return state;

    default:
      return state;
  }
};
