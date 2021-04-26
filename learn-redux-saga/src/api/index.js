export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve(username);
      } else {
        reject('login error');
      }
    }, 1000);
  });
};
