// import * as data from "./data";
import Axios from "axios";
import qs from "querystring";

//change http://localhost:8000/api
//tom's:http://210.195.9.215:8000/api
const BACKEND_URL = "http://192.168.0.175:8000/api";
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

export function updateProfile(token, name, email) {
  return Axios.put(
    `${BACKEND_URL}/profile`,
    qs.stringify({
      name,
      email,
    }),
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
export function updatePassword(token, old_password, password) {
  return Axios.put(
    `${BACKEND_URL}/profile/password`,
    qs.stringify({
      old_password,
      password,
    }),
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
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

export function getTransaction(token, id) {
  return Axios.get(`${BACKEND_URL}/transactions/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getCategoryList() {
  return Axios.get(`${BACKEND_URL}/categories`, {
    headers: {
      Accept: "application/json",
    },
  });
}
