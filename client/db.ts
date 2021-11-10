import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

let API_BASE_URL: string;

// @ts-ignore
if (process.env.NODE_ENV == "production") {
  API_BASE_URL = "";
} else {
  API_BASE_URL = "http://localhost:3005";
}

const firebaseConfig = {
  apiKey: "1JK2ZvgV8xvn3O2nj5KwhN1RjCEUUko9PnHV1Ntj",
  databaseURL: "https://dwf-m6-desafio-6f595-default-rtdb.firebaseio.com/",
  projectId: "dwf-m6-desafio-6f595",
  authDomain: "dwf-m6-desafio.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);

export { API_BASE_URL, getDatabase, ref, onValue, app };
