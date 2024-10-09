export const setToken = (key: string, value: string) => {
  return sessionStorage.setItem(key, value);
};

export const getToken = (key: string) => {
  return sessionStorage.getItem(key);
};

export const clearToken = () => {
  return sessionStorage.clear();
};
