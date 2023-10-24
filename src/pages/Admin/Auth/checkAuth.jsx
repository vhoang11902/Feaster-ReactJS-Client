import jwt_decode from "jwt-decode";
export const isAuthenticated = () => {
  const auth_token =  localStorage.getItem('auth-token');
  if (auth_token) {
    const decodedToken = jwt_decode(auth_token);
    const current_time = Date.now() / 1000; // Lấy thời gian hiện tại
    if (current_time > decodedToken.exp) {
      return false;
    } else {
      return true;
    }
  }
  return false;
}