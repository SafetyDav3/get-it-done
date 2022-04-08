
var userName = "octocat"

// ↓↓↓ Create a var to hold the user url ↓↓↓
var userURL = "https://api.github.com/users/" + userName;

// ↓↓↓ Function to fetch api data from a url ↓↓↓
var getUserRepos = function () {
  var response = fetch(userURL + "/repos").then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
  console.log("outside");
};

// ↓↓↓ Calling the function ↓↓↓
getUserRepos();
