export const deleteSession = (res) => {
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
};
