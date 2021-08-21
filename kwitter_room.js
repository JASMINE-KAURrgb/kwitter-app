var firebaseConfig = {
      apiKey: "AIzaSyDYD5jznBiN7MHoEFVRvu05xjDevcn_Iz4",
      authDomain: "kwitter-de751.firebaseapp.com",
      databaseURL: "https://kwitter-de751-default-rtdb.firebaseio.com",
      projectId: "kwitter-de751",
      storageBucket: "kwitter-de751.appspot.com",
      messagingSenderId: "1029497086590",
      appId: "1:1029497086590:web:d48f165aef843ee3fd6e2f",
      measurementId: "G-86Z41BXXZ3"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    // to log out
    function logout(){
      localStorage.removeItem("username");
          window.location="index.html";
    }
user_name= localStorage.getItem("username");
document.getElementById("showingusername").innerHTML="Welcome to KWITTER "+ user_name+ " !!";

//function to add a room
    function addroom(){
      room_name=document.getElementById("newroominput").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room"
      });
      localStorage.setItem("room name", room_name);
      window.location="kwitter_page.html";
    }

function getData() {
      firebase.database().ref("/").on('value',
       function(snapshot) {document.getElementById("output").innerHTML = "";
       snapshot.forEach(function(childSnapshot) 
       {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("room name- "+ Room_names);
      row= "<div class='room_name' id= "+ Room_names+" onclick='redirectTORoomName(this.id)'> #"+Room_names+ "</div><hr>";
      document.getElementById("output").innerHTML+=row;
      });
});
}
// given to automatically perform once js is loaded
getData();

function redirectTORoomName(name){
      console.log(name);
      localStorage.setItem("room name", name);
      window.location="kwitter_page.html";
}