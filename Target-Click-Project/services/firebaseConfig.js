import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
//Inicializa o firebase com a configuração fornecida.
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
//Acessa e gerencia o banco de dados firestore.
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
//Inicializa e gerencia a autenticação do firebase.

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA24FcK40KsjCczswB4URTOh_u-lQfqv84",
  authDomain: "target-click.firebaseapp.com",
  databaseURL: "https://target-click-default-rtdb.firebaseio.com/",
  projectId: "target-click",
  storageBucket: "target-click.appspot.com",
  messagingSenderId: "894421451418",
  appId: "1:894421451418:web:c3c22c048bc70d3918d523",
  measurementId: "G-FJ4BKH33XX"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
//Inicializa o app do firebase com parametros do firebaseconfig
const db = getDatabase(app);
//Cria uma conexão com o banco de dados firestore, permitindo leitura e gravação.

const auth = getAuth(app);
//Configura a autenticação com a instância do Firebase.
const provider = new GoogleAuthProvider();
//Define o provedor de autenticação via conta Google para login.

export { db, app, auth, provider }