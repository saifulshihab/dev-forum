const users = [];

export const addUser = ({ id, name, room }) => {
  const user = { id, name, room };

  users.push(user);

  return { user };
};

export const getUser = (id) => users.find((user) => user.id === id);
