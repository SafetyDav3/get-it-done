// ←←← Form Submission Handling →→→
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function (event) {
  event.preventDefault();
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    repoContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter Github Username");
  }
  console.log(event);
};
// →→→ Form Submission Handling End ←←←
// *
// *
// *
// ←←← Fetch User Data →→→
var userURL = "https://api.github.com/users/"; // Create a var to hold the user url
var getUserRepos = function (user) {
  var response = fetch(userURL + user + "/repos").then(function (response) {
    response.json().then(function (data) {
      displayRepos(data, user);
      console.log(data); // leaving this here
    });
  });
  console.log("outside");
};
userFormEl.addEventListener("submit", formSubmitHandler); // Calling the function
// →→→ Fetch User Data End ←←←
// *
// *
// *
// ←←← Function to display repos →→→
var displayRepos = function (repos, searchTerm) {
  repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    var repoName = repos[i].owner.login + "/" + repos[i].name; // Format repo name

    var repoEl = document.createElement("div"); // Create a container for each repo
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    var titleEl = document.createElement("span"); //Create a span element to hold the repo name
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl); // Append to container

    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        "issue(s)";
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);
  }

  console.log(repos);
  console.log(searchTerm);
};

// →→→ Function to display repos end ←←←
