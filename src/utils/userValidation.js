export const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const usernameValidation = async (prisma, username) => {
  if (!username) {
    throw new Error('Username is not valid');
  }
  const usernameTaken = await prisma.exists.User({ username });

  if (usernameTaken) {
    throw new Error('Username already taken.');
  }
};

export const emailValidation = async (prisma, email) => {
  if (!emailRegex.test(email)) {
    throw new Error('Email is not valid');
  }
  const emailTaken = await prisma.exists.User({ email });

  if (emailTaken) {
    throw new Error('Email already taken.');
  }
};

export const nameValidation = (prisma, name) => {
  if (!name) throw new Error('Name is not valid');
};
