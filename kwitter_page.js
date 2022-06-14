// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjkykYnAwEFkjGJ6Fb2xUbbGGsGgXGnDM",
  authDomain: "kwitter-e95fe.firebaseapp.com",
  databaseURL: "https://kwitter-e95fe-default-rtdb.firebaseio.com",
  projectId: "kwitter-e95fe",
  storageBucket: "kwitter-e95fe.appspot.com",
  messagingSenderId: "451719192383",
  appId: "1:451719192383:web:80fd2a104edf256395fd8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    });

    document.getElementById("msg").value="";
}
function getData(){
    firebase.database().ref("/"+room_name).on('value'),function(snapshot){
        document.getElementById("output").innerHTML="";
        snapshot.forEach(function(childSnapshot){
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if(childKey != "purpose")
            { 
                firebase_message_id = childKey;
                message_data = childData;

                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like']; 
                row = "<h4> "+ name +"<img class='user_tick' src='tick.png'> class='message_h4'>"+ message +"</h4><button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updateLike(this.id)'> class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

                document.getElementById("output").innerHTML = row;
            }
        });
    };

}

getData();

function updateLike(message_id)
{
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    likes_in_number=Number(likes) + 1;
    console.log(likes_in_number);

    firebase.database().ref(room_name).child(message_id).update({
        like : likes_in_number
    });
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room-name");
    window.location.replace("kwitter.html")
}      