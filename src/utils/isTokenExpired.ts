import { jwtDecode } from "jwt-decode";
export const isTokenExpired = (token: string) => {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (err) {
    console.log(err);
    return true;
  }
};
