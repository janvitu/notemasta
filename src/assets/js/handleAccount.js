import page from "page";
import axios from "axios";
import { resetForms } from "./useInput";
import { usr } from "@/store/state";

/**
 * sends user authentication data
 * @param { String } user
 */
export async function login(user) {
  let error = false;
  try {
    await axios.post(
      `${import.meta.env.SNOWPACK_PUBLIC_API_URL}/account/login`,
      user
    );
    sessionStorage.setItem("uID", user.username);
    usr.set(user.username);
    page.redirect("/dashboard");
  } catch (err) {
    console.error(["Error in login", err]);
    error = true;
  } finally {
    resetForms();
  }
  return error;
}
/**
 * sends create user request
 * @param { String } user
 */
export async function signUp(user) {
  let error = false;
  try {
    await axios.post(
      `${import.meta.env.SNOWPACK_PUBLIC_API_URL}/account/signup`,
      user
    );
  } catch (err) {
    console.error(["Error in signUP", err]);
    error = true;
  } finally {
    resetForms();
  }
  return error;
}

/**
 *
 * @param { Object } e
 */
export function logOut(e) {
  e.preventDefault();
  sessionStorage.clear();
  usr.set(null);
  page.redirect("/");
}
