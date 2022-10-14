export const signInUser = async (login, password) => {
  const url = 'http://localhost:3000/users/authenticate';
  const response = fetch(url, {
    headers: {
      'Content-type': 'application/json',
    },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  })
    .then((data) => data.json())
    .then((json) => {
      console.log('JSON', json);
      if (json.status === 'error') {
        throw new Error(json.message);
      }

      return json.data;
    })
    .catch((e) => console.log('ERROR IN LOGIN', e));

  return response;
};

export const regUser = async (login, password) => {
  const url = 'http://localhost:3000/users/register';
  const response = fetch(url, {
    headers: {
      'Content-type': 'application/json',
    },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  })
    .then((data) => data.json())
    .then((json) => {
      if (json.status === 'error') {
        throw new Error(json.message);
      }
      return json;
    })
    .catch((e) => {
      console.log('ERROR IN REGISTRATION', e);
      throw new Error();
    });

  return response;
};

export const postTodo = async (userId, todo) => {
  const url = 'http://localhost:3000/todos/create';
  console.log('REQUEST');

  const response = await fetch(url, {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': window.localStorage.getItem('token-'.concat(userId)),
    },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      userId: userId,
      todo: todo,
    }),
  })
    .then((data) => {
      // console.log('DATA', json);
      const json = data.json();

      return json;
    })
    .then((json) => {
      console.log('JSON SERVECE', json);
      if (json.status !== 'success') {
        throw new Error(json.message);
      }
      return json.data.todoId;
    })
    .catch((e) => {
      console.log('ERROR IN LIST', e);
      throw new Error(e.message);
    });

  return response;
};

export const deleteTodo = async (userId, todoId) => {
  const url = new URL('http://localhost:3000/todos/delete');

  const response = fetch(url, {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': window.localStorage.getItem('token-'.concat(userId)),
    },
    mode: 'cors',
    method: 'DELETE',
    body: JSON.stringify({
      userId: userId,
      todoId: todoId,
    }),
  })
    .then((data) => data.json())
    .then((json) => {
      if (json.status === 'error') new Error(json.message);
      return json.data.todoId;
    })
    .catch((err) => {
      console.log(err);
      throw new Error();
    });
  return response;
};

export const editTodo = async (userId, todoId, editedText) => {
  const url = new URL('http://localhost:3000/todos/edit');

  const response = fetch(url, {
    headers: {
      'Content-type': 'application/json',
      // 'Access-Control-Allow-Methods': '*',
      'x-access-token': window.localStorage.getItem('token-'.concat(userId)),
    },
    mode: 'cors',
    method: 'PATCH',
    body: JSON.stringify({
      userId: userId,
      todoId: todoId,
      editedText: editedText,
    }),
  })
    .then((data) => data.json())
    .then((json) => {
      if (json.status === 'error') new Error(json.message);
      return json.data.todoId;
    })
    .catch((err) => {
      console.log(err);
      throw new Error();
    });
  return response;
};

export const setTodoStatus = async (userId, todoId, newStatus) => {
  const url = new URL('http://localhost:3000/todos/status');

  const response = fetch(url, {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': window.localStorage.getItem('token-'.concat(userId)),
    },
    mode: 'cors',
    method: 'PATCH',
    body: JSON.stringify({
      userId: userId,
      todoId: todoId,
      newStatus: newStatus,
    }),
  })
    .then((data) => data.json())
    .then((json) => {
      if (json.status === 'error') new Error(json.message);
      return json.data.todoId;
    })
    .catch((err) => {
      console.log(err);
      throw new Error();
    });
  return response;
};
