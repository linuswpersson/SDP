
let lastMaleIndex;
let lastFemaleIndex;
let hasOpened = false;
let hasOpenedF = false;
let repetitiveMale = false;
let repetitiveFemale = false;
let button;
let Fbutton;
/*

function openNav1() {
  document.getElementById("maleSidenav").style.width = "500px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function openNav(no) {
    
    if (hasOpened) {
	closeNav();
	lastMaleIndex = no;
	let bignav = document.getElementById("mySidenav");
	let fun = vm.maleArray[no];
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
	lastMaleIndex = no;
	let bignav = document.getElementById("mySidenav");
	button = document.getElementById(no);
	let fun = this.data.maleArray[no];
	button.style.color = "green";
	let a = document.createElement("A");
	let nav1 = document.createTextNode(fun);
	a.appendChild(nav1);
	bignav.appendChild(a);
	openNav1();
    }       
}
*/
/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
/*
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
	let fun = Fuserd[no-8];
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
	let fun = Fuserd[no-8];
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
    	Fbutton.style.color = "blue";
  
}

function unMatch() {
    let male = lastMaleIndex;
    let female = lastFemaleIndex;

    var img = document.createElement('img'); 
    img.src = img/heart.png;
    document.getElementById('heartbutton').appendChild(img); 
    
}
*/
