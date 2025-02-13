import { auth, provider } from "../services/firebaseConfig.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import { signInWithPopup, setPersistence, browserLocalPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

const Logar = document.querySelector("#logar");
const LogarcomGoogle = document.querySelector("#ContinuarComGoogle");
const CadastrarSeComGoogle = document.querySelector("#CadastrocomGoogle");
const menuOverlayCadastro = document.querySelector("#menuOverlayCadastro");
const menuOverlayLogin = document.querySelector("#menuOverlayLogin");
const IniciarContagem = document.querySelector("#iniciar");
const Cadastrar = document.querySelector("#cadastrar-se");
const AccountPhoto = document.querySelector("#AccountPhoto");
const TextCadastro = document.querySelector("#textCadastro");
const TextOU = document.querySelector("#StyleText_2");
const TextLogin = document.querySelector("#login");
const CheckBoxRememberLogin = document.querySelector("#rememberMeCheckbox");
const SignOutButton = document.querySelector("#signOutText");
const DropdownMenu = document.querySelector("#DropdownMenu");

let EmailinputCadastro = document.querySelector("#EmailEntry");
let UserNameinputCadastro = document.querySelector("#usernameEntryCadastro");
let EmailInputLogin = document.querySelector("#EmailEntryLogin");
let PasswordInputLogin = document.querySelector("#passwordEntry")
let PasswordinputCadastro = document.querySelector("#passwordEntryCadastro");

let UserLoggedIn;
let MenuDropdownOpen = "closed";

AccountPhoto.style.visibility = "hidden";
DropdownMenu.style.visibility = "hidden";

function CheckUserLogin() {

  auth.onAuthStateChanged((user) => {

    if (user) {
      UserLoggedIn = "Logado"
    menuOverlayLogin.style.visibility = "hidden";
    TextLogin.style.visibility = "hidden"
    TextOU.style.visibility = "hidden"
    TextCadastro.style.visibility = "hidden"
    IniciarContagem.style.visibility = "visible";
    AccountPhoto.style.visibility = "visible";
    }
    else {
      console.log("Faça Login")
    }
  })
}

CheckUserLogin();

// Configura a persistência e login com popup
export async function loginWithGoogle() {
  try {
    // Garante persistência da sessão
    const persistenceType = CheckBoxRememberLogin.checked ? browserLocalPersistence : browserSessionPersistence;
  
  await setPersistence(auth, persistenceType);
    // Define o provedor com a sugestão de conta
    provider.setCustomParameters({
      prompt: 'select_account' // Exibe as contas já logadas
    });

    const result = await signInWithPopup(auth, provider);
    console.log("Usuário logado: ", result.user.displayName);
    return result.user;
  } catch (error) {
    console.error("Erro ao fazer login: ", error);
  }
};

LogarcomGoogle.addEventListener("click", async function(){
  const user = await loginWithGoogle();

  if (user) {
    console.log("Usuário logado com sucesso:", user.displayName);
    UserLoggedIn = "Logado"
    menuOverlayLogin.style.visibility = "hidden";
    TextLogin.style.visibility = "hidden"
    TextOU.style.visibility = "hidden"
    TextCadastro.style.visibility = "hidden"
    IniciarContagem.style.visibility = "visible";
    AccountPhoto.style.visibility = "visible";

      if (Estado === "jogoPausado"){
          Iniciar();
          PausarJogo.style.visibility = "visible";
          Contagem.style.visibility = "visible";
      }
  }  else {
    console.error("O login falhou. Usuário não foi definido.");
  }
});

CadastrarSeComGoogle.addEventListener("click", async function(){
  const user = await loginWithGoogle();
  FireGif.style.visibility = "hidden";
  if (user) {
    console.log("Usuário logado com sucesso:", user.displayName);
      UserLoggedIn = "Logado"
      menuOverlayCadastro.style.visibility = "hidden";
      TextLogin.style.visibility = "hidden"
      TextOU.style.visibility = "hidden"
      TextCadastro.style.visibility = "hidden"
      IniciarContagem.style.visibility = "visible";
      AccountPhoto.style.visibility = "visible"
      menuOverlayCadastro.style.visibility = "hidden";
      IniciarContagem.style.visibility = "visible";

    if (Estado === "jogoPausado"){
          Iniciar();
          PausarJogo.style.visibility = "visible";
          Contagem.style.visibility = "visible";
      }
 
  } else {
    console.error("O login falhou. Usuário não foi definido.");
  }
});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.+[^\s@]+$/.test(email);
  const validateName = (username) => /^[A-Za-zÀ-ÖØ-öø-ÿ0-9]{3,}$/.test(username);
  const validatePassword = (password) => /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/.test(password);
  //Ao menos 1 caracteres especiais, 1 maiúscula, não pode ser menos do que 8 caracteres nem mais do que 16

  EmailinputCadastro.addEventListener("input", function() {
  const email = EmailinputCadastro.value.trim();
  if (!validateEmail(email)) {
    document.querySelector("#emailTextCadastro").style.color = "red";
  } else {
    document.querySelector("#emailTextCadastro").style.color = "white";
  }
});

  UserNameinputCadastro.addEventListener("input", function() {
  const username = UserNameinputCadastro.value.trim();
  if (!validateName(username)) {
    document.querySelector("#usernameTextCadastro").style.color = "red";
  } else {
    document.querySelector("#usernameTextCadastro").style.color = "white";
  }
});

  PasswordinputCadastro.addEventListener("input", function() {
  const password = PasswordinputCadastro.value;
  if (!validatePassword(password)) {
    document.querySelector("#passwordTextCadastro").style.color = "red";
  } else {
    document.querySelector("#passwordTextCadastro").style.color = "white";
  }
  
});

Cadastrar.addEventListener("click", async function(){
  const email = EmailinputCadastro.value.trim();
  const username = UserNameinputCadastro.value.trim();
  const password = PasswordinputCadastro.value;

  try {
    menuOverlayCadastro.style.visibility = "hidden";
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Usuário criado com sucesso:", user.uid);

    UserLoggedIn = "Logado";
    menuOverlayLogin.style.visibility = "hidden";
    TextLogin.style.visibility = "hidden";
    TextOU.style.visibility = "hidden";
    TextCadastro.style.visibility = "hidden";
    IniciarContagem.style.visibility = "visible";
    AccountPhoto.style.visibility = "visible";

    const db = getDatabase();
    await set(ref(db, 'users/' + user.uid), {
      email: email,
      username: username
    });
  } catch (error) {
    if (error.code === "auth/email-already-in-use"){
      IniciarContagem.style.visibility = "visible";
      alert("Email já em uso");
      return {success: false, message: "Este e-mail já está em uso. Use outro e-mail."}
    }else {
      IniciarContagem.style.visibility = "visible";
      console.log("Erro ao criar conta:", error.message);
      return {success: false, message: "Erro ao criar conta. Tente novamente"}
    }
    c
  }
});


  

Logar.addEventListener("click", async function(){
  const email = EmailInputLogin.value.trim();
  const password = PasswordInputLogin.value;

  try {
    menuOverlayCadastro.style.visibility = "hidden";
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Usuário logado com sucesso:", user.uid);

    UserLoggedIn = "Logado";
    menuOverlayLogin.style.visibility = "hidden";
    TextLogin.style.visibility = "hidden";
    TextOU.style.visibility = "hidden";
    TextCadastro.style.visibility = "hidden";
    IniciarContagem.style.visibility = "visible";
    AccountPhoto.style.visibility = "visible";

    const db = getDatabase();
    await set(ref(db, 'users/' + user.uid), {
      email: email,
      password: password
    });
  } catch (error) {
    IniciarContagem.style.visibility = "visible";
    console.log("Erro ao criar usuário:", error.message);
  }
});

SignOutButton.addEventListener("click", function(){
  Logout();
});

AccountPhoto.addEventListener("click", function(){
  
  if (MenuDropdownOpen === "closed"){
    DropdownMenu.style.visibility = "visible";
    MenuDropdownOpen = "open"
  }else if (MenuDropdownOpen === "open"){
    DropdownMenu.style.visibility = "hidden";
    MenuDropdownOpen = "closed"
  }
})


function Logout(){
  auth.setPersistence(browserSessionPersistence)
  .then(() => {
     auth.signOut();
  })
  .then(() => {
    TextLogin.style.visibility = "visible"
      TextOU.style.visibility = "visible"
      TextCadastro.style.visibility = "visible"
      AccountPhoto.style.visibility = "hidden"
      IniciarContagem.style.visibility = "visible";
      DropdownMenu.style.visibility = "hidden";
  })
  .catch((error) => {
    alert("Erro ao tentar deslogar" + error.message)
  })
}