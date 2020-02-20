let users = [
    {
	"name": "Karl Gustav",
	"gender": true
    },
    {
	"name": "Mona Lisa",
	"gender": false
    },
    {
	"name": "August",
	"gender": true
    },
    {
	"name": "Malin",
	"gender": false
    }    
]



// main app
new Vue({
    el: '#app',
    data: { list: users
	  }
})

