const regForUsername = /^[a-zA-Z]{6,20}$/;
const regForPassword = /^[a-zA-Z0-9]{6,18}$/;

export const userNameValidate = (str) => {
  return regForUsername.test(String(str));
};

export const passwordValidate = (str) => {
  return regForPassword.test(String(str));
};
