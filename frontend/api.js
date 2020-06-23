// import * as data from "./data";
import Axios from "axios";
import qs from "querystring";

//change http://localhost:8000/api
//tom's:http://210.195.9.215:8000/api
// const BACKEND_URL = "http://192.168.0.175:8000/api";
const BACKEND_URL = "http://210.195.24.173:8000/api";
export function login(email, password) {
  return Axios.post(
    `${BACKEND_URL}/login`,
    qs.stringify({
      email,
      password,
    }),
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
}

export function signup() {}

export function me(token) {
  return Axios.get(`${BACKEND_URL}/me`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getTransactionList(token, month, year) {
  return Axios.get(`${BACKEND_URL}/transactions`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      month,
      year,
    },
  });
}
