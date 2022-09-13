const generateId = (data) => {
  return data.length + 1;
};

export const todos = {
  data: [],

  generateId() {
    return this.data.length + 1;
  },

  getCompleted() {
    console.log("data", this.data);
    return this.data.filter((item) => item.completed);
  },

  addTodo(value) {
    const id = this.generateId();
    const todoItem = {
      id: id,
      value: value,
      completed: false,
    };

    this.data.push(todoItem);
  },

  getTodo(id) {
    const itemIdx = this.data.findIndex((item) => +item.id === +id);

    return this.data[itemIdx];
  },

  getAllTodos() {
    return this.data;
  },

  changeToDoStatus(id) {
    const itemIdx = this.data.findIndex((item) => +item.id === +id);
    this.data[itemIdx].completed = !this.data[itemIdx].completed;
  },
  editToDo(id, value) {
    const itemIdx = this.data.findIndex((item) => +item.id === +id);
    this.data[itemIdx].value = value;
  },

  removeToDo(id) {
    const idx = this.data.findIndex((item) => item.id === +item);

    this.data.splice(idx, 1);
  },
};
