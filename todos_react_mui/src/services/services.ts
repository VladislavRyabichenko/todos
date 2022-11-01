import { TodoType } from '../types/commonTypes/commonTypes';
import { SignInUserDataType, ResisterUserDataType, TodosResponseDataType } from '../types/servicesTypes/servicesTypes';

// type Todo = {
//   text: string;
//   completed: boolean;
// };
//
//

export const signInUser = async (login: string, password: string): Promise<SignInUserDataType> => {
  const url: string = 'http://localhost:3000/users/authenticate';
  return await fetch(url, {
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
    .then((data) => data.json()) // as Promise T = json NOT WORKING
    .then((json) => {
      if (json.status === 'error') {
        throw new Error(json.message);
      }

      return json.data;
    })
    .catch((error: Error) => console.log('ERROR IN LOGIN', error));
};

export const regUser = async (login: string, password: string): Promise<ResisterUserDataType> => {
  const url: string = 'http://localhost:3000/users/register';

  return await fetch(url, {
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
    .catch((error: Error) => {
      console.log('ERROR IN REGISTRATION', error);
      throw new Error();
    });
};

export const postTodo = async (userId: string, todo: TodoType): Promise<TodosResponseDataType> => {
  const url = 'http://localhost:3000/todos/create';

  return await fetch(url, {
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
      if (json.status !== 'success') {
        throw new Error(json.message);
      }
      return json.data.todoId;
    })
    .catch((error: Error) => {
      console.log('ERROR IN LIST', error);
      throw new Error(error.message);
    });
};

export const deleteTodo = async (userId: string, todoId: string): Promise<TodosResponseDataType> => {
  const url: string = 'http://localhost:3000/todos/delete';

  return await fetch(url, {
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
    .catch((error: Error) => {
      console.log(error);
      throw new Error();
    });
};

export const editTodo = async (userId: string, todoId: string, editedText: string): Promise<TodosResponseDataType> => {
  const url: string = 'http://localhost:3000/todos/edit';

  return await fetch(url, {
    headers: {
      'Content-type': 'application/json',
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
    .catch((error: Error) => {
      console.log(error);
      throw new Error();
    });
};

export const setTodoStatus = async <T>(
  userId: string,
  todoId: string,
  newStatus: boolean,
): Promise<TodosResponseDataType> => {
  const url: string = 'http://localhost:3000/todos/status';

  return await fetch(url, {
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
    .catch((error: Error) => {
      console.log(error);
      throw new Error();
    });
};
