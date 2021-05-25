const users = [];

export const addUser = ({ id, name, room }) => {
  name = name?.trim().toLowerCase();
  room = room?.trim().toLowerCase();

  const user = { id, name, room };

  users.push(user);

  return { user };
};

export const getUser = (id) => users.find((user) => user.id === id);
