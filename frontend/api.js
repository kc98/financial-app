// import * as data from "./data";
import Axios from "axios";
import qs from "querystring";
import moment from "moment";

//change http://localhost:8000/api

const BACKEND_URL = "http://192.168.0.135:8000/api";

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

export function signup(name, email, password) {
  return Axios.post(
    `${BACKEND_URL}/signup`,
    qs.stringify({
      name,
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
export function addTransaction(token, description, amount, category, date) {
  return Axios.post(
    `${BACKEND_URL}/transactions`,
    qs.stringify({
      description,
      amount,
      category,
      date: moment(date).format("YYYY-MM-DD[T]HH:mm:ss[Z]"),
    }),
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function updateTransaction(
  token,
  id,
  description,
  amount,
  category,
  date
) {
  return Axios.put(
    `${BACKEND_URL}/transactions/${id}`,
    qs.stringify({
      description,
      amount,
      category,
      date: moment(date).format("YYYY-MM-DD[T]HH:mm:ss[Z]"),
    }),
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function deleteTransaction(token, id) {
  return Axios.delete(`${BACKEND_URL}/transactions/${id}`, {
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

export function getBudget(token) {
  return Axios.get(`${BACKEND_URL}/insights/budget`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateBudget(token, budget) {
  return Axios.put(
    `${BACKEND_URL}/insights/budget`,
    qs.stringify({
      budget,
    }),
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
