import _ from "lodash";

export const useLocalStorage = () => {
  const set = (key: string, value: any = {}) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  function get<T>(key: string, type: string = "{}", chain: string = "", fallback?: any): T {
    const value = JSON.parse(localStorage.getItem(key) || type);

    if (Array.isArray(value)) {
      return value as unknown as T;
    }

    if (typeof value === "object") {
      return _.get(value, chain, fallback || "");
    }

    return value;
  }

  return {
    set,
    get,
  };
};
