const userNameTextField = document.getElementById("username");
const addUserBtn = document.getElementById("addUser");
const recorddata = document.querySelector("#records");
// Here we are using DOM model to get input from the user
// we are getting the value of the input field and storing it in a variable

// let userArray = [
//     {name: "ram"},    //We need in an array of objects format for the user names
// ];  //data structure to store the user names

let userArray = []; //data structure to store the user names
// as we want to store the user names in the form of objects, we are using an array of objects
// because we want in the form of key - value pairs and we want to store multiple user names

let edit_id = null;

// STEP - 1
// here we are adding an event listener to the button
// when the button is clicked, the function is executed
addUserBtn.onclick = function () {
  // alert(name);
  // here we are getting the value of the input field and storing it in a variable
  let name = userNameTextField.value;
  if (edit_id != null) {
    userArray.splice(edit_id, 1, { username: name });    // splicing the edit_id and adding the username:name on that same place
    edit_id = null; 
  } else {
    userArray.push({ username: name });
  }
  // console.log(userArray);
  // savedata(userArray);
  // console.log(userArray)    // userArray remains the same , it isn't modified
  document.getElementById("addUser").innerText = "Add Task"; // we want when we click (Edit User -> Add User)
  userNameTextField.value = "";
  savedata(userArray);
};

// STEP - 2
// here we are saving the data in the local storage
// the data is saved in the form of a string
// the key is "username"
// the value is the stringified version of the userArray
// JSON.stringify() is used to convert the object to a string
// localStorage.setItem() is used to save the data in the local storage
function savedata(a) {
  //   console.log(a);
  let strdata = JSON.stringify(a); // changes the object to string
  // console.log(strdata)

  localStorage.setItem("username", strdata);
  displaydata(); // Did this because we want data to be immediately visible when the data is added , not on refreshing the page
}

// // STEP - 3
// // data get local storage
// // here we are getting the data from the local storage
// // the data is stored in the form of a string
// // the key is "username"
let data = localStorage.getItem("username");
// console.log(data)   // data is in string format
// Still if we add data , then refresh the page ,  and then again add data then the previous data is lost
// because the data is stored in the local storage in the form of a string
// So...

// STEP-4
if (data != null) {
  userArray = JSON.parse(data); //string to object
}
// console.log(userArray)

//STEP-5
function displaydata() {
  let data1 = "";
  userArray.forEach((item, index) => {
    // console.log(item)
    // console.log(index)
    data1 += `
    <tr>
      <td>${index + 1}</td>
      <td>${item.username}</td>
      <td>
      <a href='#' onclick='EditInfo(${index})'>Edit</a>
      <a href='#' onclick='DeleteInfo(${index})'>Delete</a>
      </td>
    </tr>
    `;
  });
  // console.log(data1);
  recorddata.innerHTML = data1;
}
displaydata();
// This is important because if removed then data will not be visible until the value is added

//STEP-6
function EditInfo(id) {
  // alert(id);
  edit_id = id;
  // console.log(userArray)
  userNameTextField.value = userArray[id].username; //
  document.getElementById("addUser").innerText = "Edit Task"; // used this for when clicked Edit, then we should get from name of (Add User -> Edit User)
}
function DeleteInfo(id) {
  // alert(id);
  userArray.splice(id, 1); //THis deletes only the item of id
  savedata(userArray); // This daves now the userArray with the deleted element
}
