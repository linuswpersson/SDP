
var modal = document.getElementById("createEventModal");
var btn = document.getElementById("createEventClick");
var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

/*window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}*/

// JAVA SCRIPT FÖR FORM!


var x = document.getElementById("eventInfo");
var createform = document.createElement('form'); 
createform.setAttribute("action", ""); 
createform.setAttribute("method", "post");
x.appendChild(createform);

var heading = document.createElement('h2'); 
heading.innerHTML = "Please fill in the information: ";
createform.appendChild(heading);

var line = document.createElement('hr'); 
createform.appendChild(line);

var linebreak = document.createElement('br');
createform.appendChild(linebreak);

// För namn
var namelabel = document.createElement('label'); 
namelabel.innerHTML = "Your Name : ";
createform.appendChild(namelabel);

var inputelement = document.createElement('input'); 
inputelement.setAttribute("type", "text");
inputelement.setAttribute("name", "dname");
createform.appendChild(inputelement);

var linebreak = document.createElement('br');
createform.appendChild(linebreak);

// För Email
var emaillabel = document.createElement('label'); 
emaillabel.innerHTML = "Your Email : ";
createform.appendChild(emaillabel);

var emailelement = document.createElement('input'); 
emailelement.setAttribute("type", "text");
emailelement.setAttribute("name", "demail");
createform.appendChild(emailelement);

var emailbreak = document.createElement('br');
createform.appendChild(emailbreak);


// FÖR LOCATION - OBS ingen tillagd karta!!!!
var locationlabel = document.createElement('label');
locationlabel.innerHTML = "Location : ";
createform.appendChild(locationlabel);

var locationelement = document.createElement('input');
locationelement.setAttribute("type", "text");
locationelement.setAttribute("name", "dlocation");
createform.appendChild(locationelement);

var locationbreak = document.createElement('br');
createform.appendChild(locationbreak);


// För textruta
var messagelabel = document.createElement('label'); 
messagelabel.innerHTML = "Your Message : ";
createform.appendChild(messagelabel);

var texareaelement = document.createElement('textarea');
texareaelement.setAttribute("name", "dmessage");
createform.appendChild(texareaelement);

var messagebreak = document.createElement('br');
createform.appendChild(messagebreak);

//OBS HAR INTE LÖST hur man ska skicka infon!
var submitelement = document.createElement('input'); 
submitelement.setAttribute("type", "submit");
submitelement.setAttribute("name", "dsubmit");
submitelement.setAttribute("value", "Submit");
createform.appendChild(submitelement);

