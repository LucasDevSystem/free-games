import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Com uma otima documentacao foi plu in play usar o firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// inicia o firebase
const firebaseApp = initializeApp(firebaseConfig);
// servicos disponiveis
export const database = getDatabase(firebaseApp);
export const auth = getAuth(firebaseApp);

export default firebaseApp;
