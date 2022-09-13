const DATA_BASE = [
  { id: 1, login: "vlad", password: "1234" },
  { id: 2, login: "aleksandr", password: "5678" },
];

export const fakeRequest = (login, password) => {
  return new Promise((resolve, reject) => {
    const res = DATA_BASE.find((user) => {
      return user.login === login && user.password === password;
    });
    setTimeout(() => {
      res ? resolve(res) : reject("error");
    }, 1000);
  });
};
