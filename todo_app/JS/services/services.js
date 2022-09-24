export const loginUser = async (login, password) => {
  const response = await fetch("http://localhost:8080/login/signIn", {
    headers: {
      "content-type": "text/plain",
    },
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  })
    .then((data) => data.json())
    .then((json) => json)
    .catch((e) => console.log("ERROR IN LOGIN"));

  return await response;
};

export const registerUser = async (login, password) => {
  const response = await fetch("http://localhost:8080/login/registration", {
    headers: {
      "content-type": "text/plain",
    },
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  })
    .then((data) => data.json())
    .then((json) => json)
    .catch((e) => {
      console.log("ERROR IN REGISTRATION", e);
      throw new Error();
    });

  return await response;
};

export const getAllTodos = async (userId) => {
  let url = new URL("http://localhost:8080/todos");
  const params = [["userId", userId]];
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url, {
    headers: {
      "content-type": "text/plain",
    },
    mode: "cors",
    method: "GET",
  })
    .then((data) => data.json())
    .then((json) => json)
    .catch((e) => {
      console.log("ERROR IN LIST", e);
      throw new Error();
    });

  return await response;
};

export const postTodo = async (userId, todo) => {
  let url = new URL("http://localhost:8080/todos");
  const params = [["userId", userId]];
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url, {
    headers: {
      "content-type": "text/plain",
      "x-access-token": window.localStorage.getItem("token-".concat(userId)),
    },
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      todo: todo,
    }),
  })
    .then((data) => data.json())
    .then((json) => json)
    .catch((e) => {
      console.log("ERROR IN LIST", e);
      throw new Error(e.message);
    });

  return await response;
};

export const updateTodo = async (userId, todoId, text) => {
  let url = new URL("http://localhost:8080/todos/edit");
  const params = [
    ["userId", userId],
    ["text", true],
  ];
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url, {
    headers: {
      "content-type": "application/json",
      "x-access-token": window.localStorage.getItem("token-".concat(userId)),
    },
    mode: "cors",
    method: "PATCH",
    body: JSON.stringify({
      userId: userId,
      todoId: todoId,
      text: text,
    }),
  })
    .then((data) => data.json())
    .then((json) => json)
    .catch((e) => {
      console.log("ERROR IN UPDATE", e);
      throw new Error();
    });

  return await response;
};

export const toggleTodoStatus = async (userId, todoId, value) => {
  let url = new URL("http://localhost:8080/todos/edit");
  const params = [
    ["userId", userId],
    ["status", true],
  ];
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url, {
    headers: {
      "content-type": "application/json",
      "x-access-token": window.localStorage.getItem("token-".concat(userId)),
    },
    mode: "cors",
    method: "PATCH",
    body: JSON.stringify({
      userId: userId,
      todoId: todoId,
      value: value,
    }),
  })
    .then((data) => data.json())
    .then((json) => json)
    .catch((e) => {
      console.log("ERROR IN UPDATE", e);
      throw new Error();
    });

  return await response;
};

export const deleteTodo = async (userId, todoId) => {
  let url = new URL("http://localhost:8080/todos");
  const params = [["userId", userId]];
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url, {
    headers: {
      "content-type": "plain/text",
      "x-access-token": window.localStorage.getItem("token-".concat(userId)),
    },
    mode: "cors",
    method: "DELETE",
    body: JSON.stringify({
      userId: userId,
      todoId: todoId,
    }),
  })
    .then((data) => data.json())
    .then((json) => json)
    .catch((err) => {
      console.log(err);
      throw new Error();
    });
  return await response;
};
