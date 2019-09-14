export const isAuthenticated = request => {
  if (!request.user) {
    throw Error("로그인후 이용하실 수 있습니다.");
  }
  return;
};
