
let lastMaleIndex;
let lastFemaleIndex;
let hasOpened = false;
let hasOpenedF = false;
let button;
let Fbutton;


function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('clock').innerHTML =
  h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}



function openNav1() {
  document.getElementById("mySidenav").style.width = "20vw";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function openNav(no) {
    
    if (hasOpened) {
	closeNav();
	lastMaleIndex = no;
	let bignav = document.getElementById("mySidenav");
	let fun = users[no].male;	
	let newText = document.createTextNode(fun);
	let nav1 = document.createElement("A");
	button = document.getElementById(no);
	button.style.color = "green";
	nav1.appendChild(newText);
	bignav.replaceChild(nav1, bignav.childNodes[1]);
	openNav1();
    }
    else {
	hasOpened = true;
	let bignav = document.getElementById("mySidenav");
	button = document.getElementById(no);
	let fun = users[no].male;
	button.style.color = "green";
	let a = document.createElement("A");
	let nav1 = document.createTextNode(fun);
	a.appendChild(nav1);
	bignav.appendChild(a);
	openNav1();
    }       
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "white";
    	button.style.color = "blue";
  
}



function openFemaleNav(no) {
      
    if (hasOpenedF) {
	closeNavF();
	let bignav = document.getElementById("mySidenavf");
	lastFemaleIndex = no;
	let fun = users[no-8].female;
	let newText = document.createTextNode(fun);
	let nav1 = document.createElement("A");
	Fbutton = document.getElementById(no);
	
	Fbutton.style.color = "green";
	nav1.appendChild(newText);
	bignav.replaceChild(nav1, bignav.childNodes[1]);
	openFemaleNav1();
    }
    else {
	hasOpenedF = true;
	lastFemaleIndex = no;
	let bignav = document.getElementById("mySidenavf");
	Fbutton = document.getElementById(no);
	let fun = users[no-8].female;
	Fbutton.style.color = "green";
	let a = document.createElement("A");
	let nav1 = document.createTextNode(fun);
	a.appendChild(nav1);
	bignav.appendChild(a);
	openFemaleNav1();
    }           
}


function openFemaleNav1() {
 document.getElementById("mySidenavf").style.width = "500px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";   
}

function closeNavF() {
  document.getElementById("mySidenavf").style.width = "0";
    document.body.style.backgroundColor = "white";
    	Fbutton.style.color = "red";
  
}

function unMatch() {
    let male = lastMaleIndex;
    let female = lastFemaleIndex;
    if (male == female-10) {
	unmatchedMale.push(users[male].no);
	unmatchedFemale.push(users[male].noF);
	users.splice(pos, male);
    }
    var img = document.createElement('img'); 
    img.src = img/heart.png;
    document.getElementById('heartbutton').appendChild(img); 
    
}

let peopleArray = ["Karl Gustav", "August", "Karl","Mona Lisa", "Malin", "Samantha", "Kim", "Johanna","Lukas", "Amanda", "Richard"];
let myElement = document.getElementById("participants");
  		for(var i = 0; i<peopleArray.length; i++){
  		var listElement = document.createElement("LI");
  		var listValue = document.createTextNode( peopleArray[i]);
  		listElement.appendChild(listValue)
  		myElement.appendChild(listElement);

  		var linebreak = document.createElement('br');
		myElement.appendChild(linebreak);
  		}
