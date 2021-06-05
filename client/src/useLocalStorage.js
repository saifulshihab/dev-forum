export const useLocalStorage = (item) => {
  const ls = localStorage.getItem(item);
  const parsedLS = JSON.parse(ls);
  return { loggedUserId: parsedLS?._id };
};
