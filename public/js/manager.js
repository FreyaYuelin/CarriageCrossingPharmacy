const log = console.log


var a = [1, 3, 5, 6, 7, 4, 13, 14, 16, 17, 3, 2, 1, 2, 3, 4, 5, 12, 11, 15, 13, 18, 19, 1, 3, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19];

const curbside = document.querySelector("#curb-side-table");
const pickup = document.querySelector("#pickup-table");
const injection = document.querySelector("#injection-table");
const delivery = document.querySelector("#delivery-table");

const info = document.querySelector('#info')

const suggestionTable = document.querySelector(".suggestions-table")

log(suggestionTable.childNodes[1].childNodes[2].childNodes[0])



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


function addItem(item) {
  let row=document.createElement("tr")
  let td1=document.createElement("td")
  let td2=document.createElement("td")
  let td3=document.createElement("td")
  let td4=document.createElement("td")
  let td5=document.createElement("td")
  let td6=document.createElement("td")
  let td7=document.createElement("td")
  td1.innerHTML=item.id
  td2.innerHTML=item.date
  td3.innerHTML=item.start
  td4.innerHTML=item.finish
  let b5 = document.createElement("button")
  b5.setAttribute("id", "info-button");
  b5.setAttribute("type", "button");
  b5.addEventListener('click', showInfo)
  b5.innerHTML="Info"
  let b6 = document.createElement("button")
  b6.setAttribute("id", "remove-button");
  b6.setAttribute("type", "button");
  b6.addEventListener('click', removeElement)
  b6.innerHTML="Remove"
  let b7 = document.createElement("button")
  b7.setAttribute("id", "edit-button");
  b7.setAttribute("type", "button");
  b7.addEventListener('click', makeEditable)
  b7.innerHTML="Edit"
  td5.appendChild(b5)
  td6.appendChild(b6)
  td7.appendChild(b7)
  row.appendChild(td1)
  row.appendChild(td2)
  row.appendChild(td3)
  row.appendChild(td4)
  row.appendChild(td5)
  row.appendChild(td6)
  row.appendChild(td7)
  if (item.option.trim() === "Curb-side pickup") {
    curbside.appendChild(row)
  }
  else if (item.option.trim() === "In-store pickup") {
    pickup.appendChild(row)
  }
  else if (item.option.trim() === "Injection") {
    injection.appendChild(row)
  }
  else if (item.option.trim() === "Delivery") {
    delivery.appendChild(row)
  }
  else {
    alert("Unidentified option")
  }
}


function makeEditable(e) {
  e.preventDefault()
  log(e.target.parentElement.parentElement)
  let buttonSlot = e.target.parentElement;
  var tr = e.target.parentElement.parentElement;
  for (let i = 1; i < 4; i++) {
    tr.childNodes[i].contentEditable = true;
  }
  buttonSlot.removeChild(e.target);
  let newButton = document.createElement("button")
  newButton.setAttribute("type", "button");
  newButton.addEventListener('click', saveChanges)
  newButton.innerHTML = "Save";
  buttonSlot.appendChild(newButton);

}

function saveChanges(e) { // sends update request to server, updating single appointment by ID
  e.preventDefault()
  let edit = document.createElement("button")
  edit.setAttribute("id", "edit-button");
  edit.setAttribute("type", "button");
  edit.addEventListener('click', makeEditable);
  edit.innerHTML = "Edit";
  var tr = e.target.parentElement.parentElement;
  var buttonSlot = e.target.parentElement;
  for (let i = 1; i < 4; i++) {
    tr.childNodes[i].contentEditable = false;
  }
  buttonSlot.removeChild(e.target);
  buttonSlot.appendChild(edit)

}

function viewMessage(e) {
  e.preventDefault();
  var tr = e.target.parentElement.parentElement;
  var obj = suggestions.filter(s => parseInt(s.id) === tr.childNodes[0].innerHTML)[0]
  let infoString = "Message: " + obj.message;
  info.innerHTML = infoString;
}

function removeElement(e) { // send delete request
  log(e.target.parentElement.parentElement)
  e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement)
}

function showInfo(e) {
  e.preventDefault();
  let id = e.target.parentElement.parentElement.childNodes[0].innerHTML;
  log(e.target.parentElement.parentElement.childNodes[0].innerHTML);
  var list_of_id = appointments.map(a => a.id);
  var obj = appointments.filter(a => a.id === parseInt(id))[0]
  let phone = obj.phone
  let address = obj.address
  let considerations = obj.considerations
  let email = obj.email
  let infoString = "Email: " + email + ", Address: " + address + ", Special Considerations: " + considerations + ", Phone Number: " + phone;
  info.innerHTML = infoString;

}


function sortItems(arr) {
  var dates = []
  arr.forEach(a => {
    let date = a.date.split("-")
    a.actualDate = new Date(date[2], date[0], date[1], a.start.split(":")[0], a.start.split(":")[1]);

  })
  arr = arr.sort((a, b) => {
    return a.actualDate - b.actualDate;
  })
  return arr
}


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
        data = sortItems(data)
        appointments = data;
        let options = appointments.map(a => a.option)
        log(options)
        for (let item of appointments) {
          addItem(item)
        }

    })
    
}());





// function foo(l) {
// 	var dict = new Map();
// 	for (let i = 0; i < l.length; i++) {
// 		let ai = a[i];

// 		dict.set(ai, dict.get(ai) + 1 || 1)
// 	}
// 	log(dict.size, dict);
// 	for (let k of dict.keys()) {
// 		if (dict.get(k) < 3) {
// 			dict.delete(k);
// 		}
// 	}

// 	return Array.from(dict.keys());
// }



































