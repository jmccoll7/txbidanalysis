// export let accessToken = "";

// export const setAccessToken = (token: string) => {
//   accessToken = token;
// };

// export const getAccessToken = () => {
//   console.log("getting token..: ", accessToken)
//   return accessToken;
// };

export const setAccessToken = (token: string) => {
  sessionStorage.setItem("jwt", token);
};

export const getAccessToken = () => {
  return sessionStorage.getItem("jwt");
};