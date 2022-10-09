const DATA_BASE = [
  {
    id: 1,
    login: 'vlad',
    password: '1234',
  },
  {
    id: 2,
    login: 'alex',
    password: '1234',
  },
];

const loginRequest = (login, password) => {
  return new Promise((resolve, reject) => {
    const foundUser = DATA_BASE.find((user) => user.login === login && user.password === password);

    if (foundUser) resolve({ status: 200, id: foundUser.id });
    reject({ status: 404 });
  });
};

export default loginRequest;
