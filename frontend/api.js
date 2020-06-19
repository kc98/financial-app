// import * as data from "./data";
import Axios from "axios";
import qs from "querystring";

//change http://localhost:8000/api
//tom's:http://210.195.9.215:8000/api
const BACKEND_URL = "http://192.168.0.176:8000/api";

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

export function getTransactionList(month, year) {}
