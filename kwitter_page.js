//varibable to store room name and username
var user_name = localStorage.getItem("username");
var room_name = localStorage.getItem("room name");
console.log(user_name);
console.log(room_name);

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
    

function getData() { firebase.database().ref("/"+room_name).on('value', 
function(snapshot) { document.getElementById("output").innerHTML = "";
 snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       childData = childSnapshot.val(); 
      if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
            console.log(firebase_message_id);
            console.log(message_data);
            name_from_DB= message_data['name'];
            message= message_data['message'];
            likes= message_data['likes'];
// creating html tags for displaying message name and likes
            user_with_tag="<h4>"+ name_from_DB+ "<img class='user_tick' src='tick.png'></h4>";
            message_with_tag="<h4 class='message_h4'>"+ message+ "</h4>";
            like_button="<button class='btn btn-warning' id="+ firebase_message_id+ " value="+ likes+" onclick='updatelike(this.id)'>";
            span_with_tag="<span class='glyphicon glyphicon-thumbs-up'> Likes: "+ likes+ "</span> </button> <hr>";
            row= user_with_tag+ message_with_tag+ like_button+ span_with_tag;
            document.getElementById("output").innerHTML=row;
      }
 }); 
 });
 }
getData();

//function to update likes
function updatelike(message_id){
      console.log("clicked on like button"+ message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      updated_LIKES= Number(likes)+1;
      console.log(updated_LIKES);
      firebase.database().ref(room_name).child(message_id).update({
            likes: updated_LIKES
      });
}


//to logout
function LoggingOut(){
      localStorage.removeItem("username");
      localStorage.removeItem("room name");
          window.location="index.html";
    }
    

//function for sending messages
function send(){
      msg=document.getElementById("message").value;
      firebase.database().ref(room_name).push({
            name: user_name, message: msg, likes: 0
      });
      document.getElementById("message").value="";
}
