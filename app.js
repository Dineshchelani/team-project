// -----------Sign Up Function------------
// storing input from SignUp-form to local storage
function signUpF(event) {
    let users = [];

    // Name, email and Password from the signup-form
    let username = document.getElementById('nUsername');
    let email = document.getElementById('nEmail')
    let password = document.getElementById('nPassword');

    //creating object of user
    let usersData = {
        Name: username.value,
        Email: email.value,
        Password: password.value,
    }

    //importing data from local storage if any
    let arr = JSON.parse(localStorage.getItem("users")) || [];

    //pushing data to array
    arr.push(usersData)

    // savin data to local storage
    localStorage.setItem('users', JSON.stringify(arr));

    alert("Congratulation " + username.value + " you Sign Up successfully ")
    event.preventDefault();
    username.value = "";
    email.value = "";
    password.value = "";
    window.open("./index.html", "_self");
}

// ===================Login Function===================
// check if stored data from signUp-form is equal to entered data in the login-form
function loginF(event) {
    let login = false;

    // entered data from the login-form
    let email = document.getElementById('email')
    let password = document.getElementById('password');

    // stored data from the signup-form
    var registerdUsers = JSON.parse(localStorage.getItem("users")) || [];

    // check if stored data from register-form is equal to data from login form
    registerdUsers.forEach(myFunction);

    function myFunction(item, index) {

        if (email.value == registerdUsers[index]['Email'] && password.value == registerdUsers[index]['Password']) {
            login = true;
            alert('You are loged in successfully.');
            event.preventDefault();
            email.value = "";
            password.value = "";
            saveCU(registerdUsers[index]);
            window.open("./teams.html", "_self");

        }
    }
    if (login !== true) {
        alert(" Ivalid Email or Password enterd ");
    }
}

//=================== save current user data in local storage Function ===================
function saveCU(currentUser) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}
//=================== get current user data from local storage and display on teams page Function ===================
function getCU() {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    document.getElementById("cUName").innerHTML = currentUser['Name'];
    document.getElementById("cUEmail").innerHTML = currentUser['Email'];
}
//=================== logout Function ===================
function logOut() {
    localStorage.removeItem('currentUser')
    window.open("./index.html", "_self");
}


//=================== Create team Function ===================
var users = [];
function add_element_to_array() {
    users.push(document.getElementById("users").value)
    document.getElementById("users").value = "";
}
function createTeam(event) {  // cUName = Current user name

    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let cUName = currentUser['Name'];
    let cUEmail = currentUser['Email'];
    let TeamName = document.getElementById("TeamName").value;
    let category = document.getElementById("category").value;
    users.push(document.getElementById("users").value)
    let tid = new Date().getTime();

    //creating object of users
    let teamData = {
        tid: tid,
        ownerName: cUName,
        ownerEmail: cUEmail,
        teamName: TeamName,
        category: category,
        users: users,
    }

    console.log(teamData.users)
    //importing data from local storage if any
    let arr = JSON.parse(localStorage.getItem("teams")) || [];

    //pushing data to array
    arr.push(teamData)

    // savin data to local storage
    localStorage.setItem('teams', JSON.stringify(arr));

    event.preventDefault();
    alert("Congratulation " + cUName + " your team created  successfully ")
    document.getElementById("TeamName").value = "";
    document.getElementById("category").value = "";
    document.getElementById("users").value = "";
    location.href = "./teams.html";
    teamsOwn();

}

// display the team that user own
function teamsOwn() {

    let flag = false;
    let status = "owner";
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let cUName = currentUser['Name'];
    let cUEmail = currentUser['Email'];
    // stored teams
    var createdTeams = JSON.parse(localStorage.getItem("teams")) || [];

    // check the user own any team
    createdTeams.forEach(myFunction);

    function myFunction(item, index) {

        if (cUEmail == createdTeams[index]['ownerEmail'] && cUName == createdTeams[index]['ownerName']) {
            flag = true
            let tid = createdTeams[index]['tid'];
            const mainDiv = document.getElementById("teamsOwn");
            const childDiv = mainDiv.appendChild(document.createElement('div'));
            childDiv.classList.add("team");
            childDiv.setAttribute("onclick", `ownerView(${tid}, "owner")`);
            childDiv.style.cursor = "pointer"
            let h4 = childDiv.appendChild(document.createElement("h4"));
            h4.classList.add("teamName-heading");
            h4.textContent = createdTeams[index]['teamName'];
            noOfUsers = createdTeams[index]['users'].length
            let span = childDiv.appendChild(document.createElement("span"));
            span.innerText = `Members: you and ${noOfUsers} other`
            span.style.fontWeight = "bold";
        }
    }
    if (flag !== true) {
        const mainDiv = document.getElementById("teamsOwn");
        const childDiv = mainDiv.appendChild(document.createElement('div'));
        childDiv.classList.add("team");
        childDiv.innerHTML = "<h3> No team available </h3>"
    }
}

// display the team that user is part of
function teamsPart() {

    let flag = false;
    let status = "user";
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let cUEmail = currentUser['Email'];
    // stored teams
    let createdTeams = JSON.parse(localStorage.getItem("teams")) || [];
    
    // check the user is part of any team
    createdTeams.forEach(myFunction1);
    function myFunction1(item, index1) {
        
        let users = createdTeams[index1]['users']
        users.forEach(myFunction2);
        
        function myFunction2(item, index) {

            if (cUEmail == users[index]) {
                flag = true
                let tid = createdTeams[index1]['tid'];
                const mainDiv = document.getElementById("teamsPart");
                const childDiv = mainDiv.appendChild(document.createElement('div'));
                childDiv.classList.add("team");
                childDiv.setAttribute("onclick", `userView(${tid}, "user")`);
                childDiv.style.cursor = "pointer"
                let h4 = childDiv.appendChild(document.createElement("h4"));
                h4.classList.add("teamName-heading");
                h4.textContent = createdTeams[index1]['teamName'];
                noOfUsers = users.length
                let span = childDiv.appendChild(document.createElement("span"));
                span.innerText = `Members: you and ${noOfUsers} other`
                span.style.fontWeight = "bold";
            }
        }
    }
    if (flag !== true) {
        const mainDiv = document.getElementById("teamsPart");
        const childDiv = mainDiv.appendChild(document.createElement('div'));
        childDiv.classList.add("team");
        childDiv.innerHTML = "<h3> No team available </h3>"

    }

}

//Display the team owner settings 
function ownerView(temId, status) {

    location.href = "./teamManager.html"
}
//Display the team owner settings 
function userView(teamId, status){
    location.href = "./teamManager.html"
}
