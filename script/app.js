const firebaseConfig = {
  apiKey: "AIzaSyAhphZnEirws3UFiJv1bW7k5-7yYLWGVpo",
  authDomain: "requizz.firebaseapp.com",
  projectId: "requizz",
  storageBucket: "requizz.appspot.com",
  messagingSenderId: "337964707076",
  appId: "1:337964707076:web:db14a2788b869de3a1b451",
  measurementId: "G-BZTE4T4D65"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function generateKey(){
  return(Math.floor(Math.random() * 900000) + 100000)
}

function setCookie(name, value, daysToExpire) {
  var date = new Date();
  date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  var expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function checkCookieExists(name) {
  var cookies = document.cookie.split("; ");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return true; 
    }
  }
  return false; 
}

function getCookieValue(name) {
  var cookies = document.cookie.split("; ");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return decodeURIComponent(cookie[1]); 
    }
  }
  return null; 
}

document.getElementById("submit").addEventListener("click", function(){

  if(checkCookieExists("game_id")){
    alert("you've already started a game")
    return
  }

  const pushKey = {
    game_id: generateKey()
  };

  var newPushRef = database.ref("game_id").push();
  newPushRef.set(pushKey)

  .then(function () {
    console.log("Data pushed successfully!", newPushRef.key);
    setCookie("game_id", newPushRef.key, 365);
  })
  .catch(function (error) {
    console.error("Error pushing data:", error);
  });

});

//this is broken im trying
document.getElementById("remove").addEventListener("click", function(){
  deleteCookie("game_id");

});