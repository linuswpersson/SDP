/*const name = document.getElementById('eventcode')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')

form.addEventListener('submit', (e) => {
	let messages = []
	if (eventcode.value === '' || eventcode.value == null){
		messages.push('Eventcode is required')
	}
	
	if(eventcode.value.length <= 6){
		messages.push('Password must be longer than 6 characters')
	}
	
		if(eventcode.value .length >= 20){
		messages.push('Password must be less than 20 characters')
	}
	
	if(messages.length > 0){
		e.preventDefault()
		errorElement.innerText = messages.join(', ')
	}
})
*/

const vm = new Vue({
    el: '#buttons',
    data: {
	userHome: 'user_home.html',
	joinEvent: 'event_wait.html',
    },
    methods: {
	userHomeClick: function() {
	    document.location.href = this.userHome;
	},
	joinEventClick: function(){

	    document.location.href = this.joinEvent;
		
    },

	},
})
