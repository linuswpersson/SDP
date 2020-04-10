const socket = io();

const vm = new Vue ({
    el: '#contactsWrapper',

    data: {
	userHome: 'user_home.html',
	matchContactInfoResponse: [],
	modalContent: {name: '', email: '', phone: ''},
	privID: '',
	
    },

    methods: {
	showInfo: function (match) {
	    let element = 'myModal';
	    document.getElementById('myModal').style.display = "block";
	    this.modalContent.name = match.name;
	    this.modalContent.email = match.email;
	    this.modalContent.phone = match.phone;
	    
	},
	closeModal: function() {
	    console.log("closemodal clicked");
	    document.getElementById('myModal').style.display = "none";
	},
	nextClick: function() {
	    document.location.href = this.userHome;
	},
	
    },
    created: function(){
	socket.on('sendMatchContactInfo', function(contactInfo) 
	    this.privID = sessionStorage.getItem("UniqueId");
	    this.matchContactInfoResponse = contactInfo.contact[this.privID];
	    console.log(this.matchContactInfoResponse);
	}.bind(this));
    },
})
