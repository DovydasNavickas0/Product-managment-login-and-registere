import { firebaseConfig } from "./database.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const enterID = document.getElementById("enterID");
const enterName = document.getElementById("enterName");
const enterQuantity = document.getElementById("enterQuantity");
const enterPrice = document.getElementById("enterPrice");
const enterDescription = document.getElementById("enterDescription");
const enterImg = document.getElementById('enterImgLink');

const insertbtn = document.getElementById("insert");
const updaterbtn = document.getElementById("update");
const deletebtn = document.getElementById("remove");

const findData = document.getElementById("findData");

function insertDataIntoDB(evt){
    evt.preventDefault();

    const user = auth.currentUser

    if( enterID.value.length < 3){
        alert("ID too short");
        return
    }
    if(enterName.value === ""){
        alert("Name not found");
        return
    }
    if(enterQuantity.value === ""){
        alert("Quantity not found");
        return
    }
    if( enterPrice.value <= 0){
        alert("Price too low");
        return
    }
    if(enterDescription.value === ""){
        alert("Description not found");
        return
    }
    if(enterImg.value === ""){
        alert("Link not found");
        return
    }

    console.log(enterID.value, enterName.value, enterQuantity.value, 
        enterPrice.value, enterDescription.value, enterImg.value);

    update(ref(db, 'users/' + user.uid + "/Products/" + enterID.value), { // add user email or username
        Name: enterName.value,                  // to keep track of the post
        ID: enterID.value,
        Quantity: enterQuantity.value,
        Price: enterPrice.value,
        Description: enterDescription.value,
        ImgLink: enterImg.value 
    })
        .then(() => {
            alert("Data added succesfullty");
        })
        .catch((error) => {
            alert(error)
        })
}

setTimeout(() => {
    (function selectData(){ // replace this with something that will keep track of
                       // a accounts postings(everyone has diffrent posts)

    const user = auth.currentUser

    const Findtable = document.createElement('table');
    const rowheader = document.createElement('tr');
    rowheader.style.border = "medium solid #000000";
    
    const listName = document.createElement('th');
    listName.innerText = "Name";
    listName.style.border = "thin solid #000000";

    const listQuantity = document.createElement('th');
    listQuantity.innerText = "Quantity";
    listQuantity.style.border = "thin solid #000000";

    const listPrice = document.createElement('th');
    listPrice.innerText = "Price";
    listPrice.style.border = "thin solid #000000";

    const listDescription = document.createElement('th');
    listDescription.innerText = "Description";
    listDescription.style.border = "thin solid #000000";

    const listImg = document.createElement('th');
    listImg.innerText = "Image";
    listImg.style.border = "thin solid #000000";

    Findtable.appendChild(rowheader);
    rowheader.appendChild(listName);
    rowheader.appendChild(listQuantity);
    rowheader.appendChild(listPrice);
    rowheader.appendChild(listDescription);
    rowheader.appendChild(listImg);
    findData.appendChild(Findtable);

    get(ref(db, 'users/' + user.uid + "/Products/"))
        .then((snapshot) => {

                //console.log(snapshot.val())
                //console.log(snapshot.val());
                //console.log(snapshot.val()[4534]);
                //console.log(filter(snapshot.val()[ID].ID === findID));
                //console.log(snapshot.val()[ID].Quantity);
                //console.log(snapshot.val()[findID.value].Description)

            for(let ID in snapshot.val()){

                //console.log(ID)
                //console.log(snapshot.val()[ID]);

                const rowproduct = document.createElement('tr');
                rowproduct.style.border = "medium solid #000000";

                const colname = document.createElement('td')
                colname.textContent = snapshot.val()[ID].Name
                colname.style.border = "thin solid #000000";

                const colquantity = document.createElement('td')
                colquantity.textContent = snapshot.val()[ID].Quantity
                colquantity.style.border = "thin solid #000000";

                const colprice = document.createElement('td')
                colprice.textContent = snapshot.val()[ID].Price
                colprice.style.border = "thin solid #000000";

                const ColDesc = document.createElement('td')
                ColDesc.textContent = snapshot.val()[ID].Description
                ColDesc.style.border = "thin solid #000000";

                const colimage = document.createElement('td')
                const imgsrc = document.createElement('img')
                imgsrc.src = snapshot.val()[ID].ImgLink
                imgsrc.classList.add("form-control")
                colimage.style.border = "thin solid #000000";

                colimage.appendChild(imgsrc)
                rowproduct.appendChild(colname);
                rowproduct.appendChild(colquantity)
                rowproduct.appendChild(colprice);
                rowproduct.appendChild(ColDesc);
                rowproduct.appendChild(colimage);
                Findtable.appendChild(rowproduct)
                }
        })
        .catch((error) => {
            alert(error)
        })
})()}, 600)


function updateData(evt){
    evt.preventDefault()

    const user = auth.currentUser

    if( enterID.value.length < 3){
        alert("ID too short");
        return
    }
    if(enterName.value === ""){
        alert("Name not found");
        return
    }
    if(enterQuantity.value === ""){
        alert("Quantity not found");
        return
    }
    if( enterPrice.value <= 0){
        alert("Price too low");
        return
    }
    if(enterDescription.value === ""){
        alert("Description not found");
        return
    }
    if(enterImg.value === ""){
        alert("Link not found");
        return
    }
    console.log(enterID.value, enterName.value, enterQuantity.value);
    update(ref(db, 'users/' + user.uid + "/Products/" + enterID.value), {
        Name: enterName.value,
        Quantity: enterQuantity.value,
        Price: enterPrice.value,
        Description: enterDescription.value,
        ImgLink: enterImg.value,
    })
        .then(() => {
            alert("Data update is successfull")
        })
        .catch((error) => {
            alert(error)
        })
}

function deleteData(evt){
    evt.preventDefault()

    const user = auth.currentUser

    if( enterID.value.length < 3){
        alert("ID too short");
        return
    }
    if(enterName.value === ""){
        alert("Name not found");
        return
    }
    if(enterQuantity.value === ""){
        alert("Quantity not found");
        return
    }
    if( enterPrice.value <= 0){
        alert("Price too low");
        return
    }
    if(enterDescription.value === ""){
        alert("Description not found");
        return
    }
    if(enterImg.value === ""){
        alert("Link not found");
        return
    }
    console.log(enterID.value, enterName.value, enterQuantity.value)
    remove(ref(db, 'users/' + user.uid + "/Products/" + enterID.value))
        .then(() => {
            alert("Data has been successfully deleted");
        })
        .catch((error) => {
            alert(error);
        })
}

insertbtn.addEventListener("click", insertDataIntoDB);
updaterbtn.addEventListener("click", updateData);
deletebtn.addEventListener("click", deleteData);



//-----------------------------------------------------
//new code
//-----------------------------------------------------

setTimeout(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log("User is active")
          } else {
            console.log("User is inactive")
            window.location.replace("./index.html")
          }
    })
}, 100)

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

document.getElementById('logout').addEventListener("click", UserLogout);
