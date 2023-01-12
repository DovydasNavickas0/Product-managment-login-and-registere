import { firebaseConfig } from "./database.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,  onAuthStateChanged,
    signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get, set, child, update, remove, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const UserRegistration = () => {

    const Username = document.getElementById('username').value
    const Email = document.getElementById("email-signup").value;
    const Passwd = document.getElementById("passwd-signup").value;
    
    createUserWithEmailAndPassword(auth, Email, Passwd)
        .then((userCredential)  => {
            const user = userCredential.user;

            const loginTime = new Date()
            set(ref(db, 'users/' + user.uid),{
                user_email: Email,
                user_username: Username,
				last_login: `${loginTime}`
            })

            console.log(user, "User Created");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.message)
        });
}

const UserLogIn = () => {

    const Username = document.getElementById('username').value
    const Email = document.getElementById("email-signup").value;
    const Passwd = document.getElementById("passwd-signup").value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, Email, Passwd)
    .then((userCredential) => {
    const user = userCredential.user;
    const loginTime = new Date()
    update(ref(db, 'users/' + user.uid), {
        last_login: loginTime
    });
    console.log(user, "Login Successfull");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
    });

}

//Login checker
const StatusMonitor = async () => {

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log("User is active");
          }
          else {
            console.log("User is inactive");
          }
        
    })
}


document.getElementById("signup").addEventListener("click", UserRegistration);
document.getElementById('login').addEventListener("click", UserLogIn);
StatusMonitor()


// window.location.replace("./product.html") is the thing that is causing the problem of the user's data not being created in "Realtime Database"
// 500-700 ms delay works (based of latency)
// P.S database isn't being triggered
// also also Login doesn't get logged 

// Writing to the database is asynchronous operation so it can take some time
// tl:dr works at it's own pace
// so I have to write a function that waits on the database to get updated
// and only then does it use the windows.location command.

//https://stackoverflow.com/questions/70725838/firebase-realtime-database-not-saving-data-when-i-add-location-replace

//setTimeout(() => {StatusMonitor()}, 600)
//.then(setTimeout(() => {window.location.replace("./product.html")}, 50))