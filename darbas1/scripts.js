import { firebaseConfig } from "./database.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,  onAuthStateChanged,
    signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const SignUpBtn = document.getElementById("signup");
const LogInBtn = document.getElementById('login');
const LogoutBtn = document.getElementById('logout');

const UserRegistration = () => {

    const Username = document.getElementById('username').value
    const Email = document.getElementById("email-signup").value;
    const Passwd = document.getElementById("passwd-signup").value;
    
    createUserWithEmailAndPassword(auth, Email, Passwd)
        .then((userCredential) => {
            const user = userCredential.user;

            const loginTime = new Date()
            set(ref(db, 'users/' + user.uid),{
                user_email: Email,
                user_username: Username,
				last_login: `${loginTime}`
            });

            console.log(user, "User Created")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.message)
        });
}

const UserLogIn = () => {

    const Email = document.getElementById("email-login").value;
    const Passwd = document.getElementById("passwd-login").value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, Email, Passwd)
    .then((userCredential) => {
    const user = userCredential.user;
    const loginTime = new Date()
    update(ref(db, 'users/' + user.uid), {
        lasr_login: loginTime
    });
    console.log(user, "Login Successfull")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message)
    });

}

const UserLogout = () => {
    signOut(auth).then(() => {
        console.log("Logout successful");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message)
    })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log("User is active")
      } else {
        console.log("User is inactive")
      }
    
})

document.getElementById("signup").addEventListener("click", UserRegistration);
document.getElementById('login').addEventListener("click", UserLogIn);
