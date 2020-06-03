const log = console.log


var a = [1, 3, 5, 6, 7, 4, 13, 14, 16, 17, 3, 2, 1, 2, 3, 4, 5, 12, 11, 15, 13, 18, 19, 1, 3, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19];



// Instructions: 
// #TODO:
// 1. Add another table inside manager.html for deliveries
// 2. Given data stored in the suggestions and appointments variables below, add each of the appointments and suggestions to their corresponding table
// May assume that both are arrays of objects. i.e. appointments[1].email is a string containing an email
// Refer back to selections.js on how to add div elements to html using js
// Appointment and suggestion objects are stored in the exact same format as appt1 and appt2.


var suggestions;

var appointments;

var appt1 = {
  email: "john123@gmail.com",
  month: "July",
  year: "2020",
  day: "12",
  specialConsiderations: "asd1",
  option: "Curb-side pickup",
  start: "12:00",
  finish: "12:30"
}

var appt2 = {
  email: "hoyt@gmail.com",
  month: "July",
  year: "2020",
  day: "18",
  specialConsiderations: "asd2",
  option: "Injection",
  start: "14:30",
  finish: "15:00"
}

var appts = [appt1, appt2];

(function fetchFeedbacks() {
  const url = '/suggestions';
  const request = new Request(url, {
      method: "GET", 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }
    });
  fetch(request).then((res) => {
    if (res.status === 200) {
        return res.json()
    } else {
        alert(res.status)
    }
  }).then(data => {
    suggestions = data;
  })
}());

(function fetchAppointments() {
    const url = "/appointments"
    const request = new Request(url, {
        method: "GET", 
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    fetch(request).then((res) => {
        if (res.status === 200) {
            return res.json()
        } else {
            alert(res.status)
        }
    }).then(data => {
        appointments = data;
    })
    
}());



function foo(l) {
	var dict = new Map();
	for (let i = 0; i < l.length; i++) {
		let ai = a[i];

		dict.set(ai, dict.get(ai) + 1 || 1)
	}
	log(dict.size, dict);
	for (let k of dict.keys()) {
		if (dict.get(k) < 3) {
			dict.delete(k);
		}
	}

	return Array.from(dict.keys());
}







