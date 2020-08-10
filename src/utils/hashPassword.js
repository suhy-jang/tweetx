import bcrypt from 'bcryptjs';

const passwordLength = 6;

const hashPassword = (password) => {
  if (password.length < passwordLength) {
    throw new Error(`Password must be ${passwordLength} characters or longer.`);
  }
  return bcrypt.hash(password, 10);
};

const verifyPassword = (inputPW, userPW) => {
  if (inputPW.length < passwordLength) {
    throw new Error(`Password must be ${passwordLength} characters or longer.`);
  }
  return bcrypt.compare(inputPW, userPW);
};

export { hashPassword, verifyPassword };
