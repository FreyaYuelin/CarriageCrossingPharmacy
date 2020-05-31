const log = console.log

const considerations = document.querySelector("#special-considerations");


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//var myStorage = window.localStorage

const days = document.querySelector(".days");

const rightArrow = document.querySelector(".next");
rightArrow.addEventListener('click', nextMonth);
const leftArrow = document.querySelector(".prev");
leftArrow.addEventListener('click', prevMonth);

const pickATime = document.querySelector("#pick-a-time");

const monthYear = document.querySelector("#month-year");
const year = document.querySelector("#year");

var maxFutureMonths = 3; // to be used later
var monthsIn = 0;

var today = new Date(); // get a valid date

const grid = document.querySelector(".grid-container");  // my time-grid

const quarterHours = ["00", "15", "30", "45"];
const hours = [];

for (let i = 6; i < 25; i++) {
    hours.push(i.toString());
}

const modalContent = document.querySelector(".modal-content");

const modalButtons = document.querySelectorAll("#modal-button");
modalButtons.forEach(b => b.addEventListener('click', closeForm));

const activity = ["One", "Two", "Three", "Four"];

const activities = document.querySelector("#activities");

const checkboxes = activities.getElementsByTagName("input");
var curChecked;



for (let b of checkboxes) {
    b.addEventListener('click', check);
    if (b.checked) {
        curChecked = b;
    }
}

var selectedTimeSlot;

const submitButton = document.querySelector("#submit-button");
submitButton.addEventListener('click', record)




function check(e) {
    //e.preventDefault();
    curChecked = e.target; 
    log(curChecked.parentElement.textContent.trim());
}


function closeForm(e) {
    e.preventDefault();
    log(e.target);
    if (e.target.innerHTML === "Yes") {
        log("wrong!")
        window.location.href = "refillPage.html";
    } else {
        modalContent.style.display = "none";
    }
}

function generateHours() {
    var intervals = [];
    var hourIndex = 0;
    var quarterIndex = 0;

    while (hourIndex != hours.length - 1) {
        let interval = hours[hourIndex] + ":" + quarterHours[quarterIndex];
        if (quarterIndex === 3) {
            quarterIndex = 0;
            hourIndex++;
        } else {
            quarterIndex++;
        }
        interval = interval + "-" + hours[hourIndex] + ":" + quarterHours[quarterIndex];
        intervals.push(interval);
    }
    log(intervals);
    $('.grid-container').empty();
    intervals.forEach(i => {
        let slot = document.createElement("div");
        slot.setAttribute("class", "grid-item")
        let node = document.createTextNode(i);
        slot.appendChild(node);
        grid.appendChild(slot);
        grid.addEventListener('click', select);
    })
    pickATime.innerHTML = "Pick a Time";


}

function select(e) {
    e.preventDefault();
    e.target.style.backgroundColor = "teal";
    let flag = false;
    if (typeof selectedTimeSlot === "undefined") {

    } else if (selectedTimeSlot === e.target) {
        flag = true;
        e.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    }

    else {
        selectedTimeSlot.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    }
    selectedTimeSlot = undefined;
    if (!flag) {
        selectedTimeSlot = e.target;
    }
    log(selectedTimeSlot);

}



function prevMonth() { // changes current month to the previous one
    if (monthsIn === 0) {
        return;
    }
    let curMonth = months.indexOf(monthYear.childNodes[0].textContent);
    let curYear = document.querySelector("#year").innerHTML;
    curMonth--;
    if (curMonth === -1) {
        curMonth = 11;
        curYear--;
    }
    monthYear.childNodes[0].textContent = months[curMonth];
    year.innerHTML = curYear;
    monthsIn--;
}



function nextMonth() {
    if (monthsIn === 3) {
        return;
    }
    let curMonth = months.indexOf(monthYear.childNodes[0].textContent);
    let curYear = document.querySelector("#year").innerHTML;
    curMonth++;
    if (curMonth === 12) {
        curMonth = 0;
        curYear++;
    }
    monthYear.childNodes[0].textContent = months[curMonth];
    year.innerHTML = curYear;
    monthsIn++;
    
}

function daysInMonth(month,year) {
  return new Date(year, month, 0).getDate();
}



function makeActive(e) {
    e.preventDefault();
    let curActive = days.querySelector(".active");
    if (curActive === e.target) {
        return;
    }
    let parent = curActive.parentElement;
    let t = document.createTextNode(parent.childNodes[0].textContent)
    parent.replaceChild(t, curActive);
    curActive.remove();
    let span = document.createElement("span");
    span.setAttribute("class", "active");
    let v = document.createTextNode(e.target.childNodes[0].textContent);
    span.appendChild(v);
    e.target.replaceChild(span, e.target.childNodes[0]);
    generateHours();
}

function autoGenerateDates() {
    var totalDays = daysInMonth(today.getMonth() + 1, today.getFullYear());
    log(totalDays)
    for (let i = 1; i < totalDays + 1; i++) {
        let curDay = document.createElement("li");
        var node = document.createTextNode(i)
        curDay.appendChild(node);
        curDay.addEventListener('click', makeActive);
        days.appendChild(curDay);
        if (today.getDate() == i) {
            let span = document.createElement("span");
            span.setAttribute("class", "active");
            var t = document.createTextNode(i);
            span.appendChild(t);
            curDay.innerHTML = "";
            curDay.appendChild(span);
        }
    }
    var m = document.createTextNode(months[today.getMonth()]);
    monthYear.replaceChild(m, monthYear.childNodes[0]);
    let y = document.querySelector("#year");
    y.innerHTML = today.getFullYear();

}
    // log(monthYear.childNodes[0].textContent);
    // log(year.innerHTML)
    // log(days.querySelector(".active").innerHTML);
    // log(curChecked.parentElement.childNodes[0].textContent) // trim quotes
    // log(selectedTimeSlot.innerHTML.split('-')[0])
    // log(selectedTimeSlot.innerHTML.split('-')[1])
function record(e) {
    e.preventDefault(e);
    var opt = curChecked.parentElement.childNodes[0].textContent.replace(/(\r\n|\n|\r)/gm,"").trim();
    const url = "/appointment";
    const data = {
        email: localStorage.getItem('email'),
        month: monthYear.childNodes[0].textContent,
        year: year.innerHTML,
        day: days.querySelector(".active").innerHTML,
        specialConsiderations: considerations.value,
        // option: curChecked.parentElement.childNodes[0].textContent,
        option: opt,
        start: selectedTimeSlot.innerHTML.split('-')[0],
        finish: selectedTimeSlot.innerHTML.split('-')[1]
    }
    log(data)
    const stringifiedData = JSON.stringify(data);
        const request = new Request(url, {
        method: "POST", 
        body: stringifiedData,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    fetch(request).then((res) => {
        if (res.status === 200) {
            log('success')
        } else {
            alert(res.status)
        }
    })


}

//record();


autoGenerateDates();
//generateHours();

// log(localStorage.getItem('email'))



