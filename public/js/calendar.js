const log = console.log

const considerations = document.querySelector("#special-considerations");

const deliverySchedule = {
    "Curb-side pickup": 15,
    "In-store pickup": 15,
    "In-store consulting": 30,
    "Injection": 30,
    "Delivery": 15
}

var appointments; // server variables
var slotsTaken = [];
var optionSlot = [];
var injectionSlot = [];
var pickupSlot = [];
var curbSideSlot = [];

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];


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
const firstDay = new Date(today.getFullYear(), today.getMonth(), 1); // first day of month

const grid = document.querySelector(".grid-container");  // my time-grid

const halfIndex = ["00", "30"];

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
    b.addEventListener('change', function() {
        if (this.checked) {
            generateHours()
        }
        else {

        }
    })
    if (b.checked) {
        curChecked = b;
    }
}

var selectedTimeSlot;

const submitButton = document.querySelector("#submit-button");
submitButton.addEventListener('click', record)

const datesAreOnSameDay = (first, second) => // same day checker
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();




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

    var interval;
    var maxIndex;

    if (curChecked.parentElement.childNodes[0].textContent.replace(/(\r\n|\n|\r)/gm,"").trim() === "In-store pickup" || curChecked.parentElement.childNodes[0].textContent.replace(/(\r\n|\n|\r)/gm,"").trim() === "Injection") {
        hourInterval = halfIndex;
        maxIndex = 1;
    } else {
        hourInterval = quarterHours;
        maxIndex = 3;
    }

    while (hourIndex != hours.length - 1) {
        let interval = hours[hourIndex] + ":" + hourInterval[quarterIndex];
        if (quarterIndex === maxIndex) {
            quarterIndex = 0;
            hourIndex++;
        } else {
            quarterIndex++;
        }
        interval = interval + "-" + hours[hourIndex] + ":" + hourInterval[quarterIndex];
        intervals.push(interval);
    }

    log(intervals[14].split("-")[0].split(":")[0], today.getHours());
    if (months.indexOf(monthYear.childNodes[0].textContent) === today.getMonth() && parseInt(year.innerHTML) === today.getFullYear() && parseInt(days.querySelector(".active").innerHTML) === today.getDate()) {
        const filteredIntervals = intervals.filter(i => {
            let h = parseInt(i.split("-")[0].split(":")[0]);
            let m = parseInt(i.split("-")[0].split(":")[1]);
            if (today.getHours() + 1 < h) {
                return i;
            } else if (today.getHours() + 1 === h) {
                if (today.getMinutes() <= m) {
                    log(i, h, m)
                    return i;
                }
            }
            
        })
        intervals = filteredIntervals;
    }
    var selectedDay = new Date(year.innerHTML, months.indexOf(monthYear.childNodes[0].textContent), parseInt(days.querySelector(".active").innerHTML));
    log(selectedDay.getDay())
    if (selectedDay.getDay() === 0) { // Sunday
        intervals = [];
    }

    else if (selectedDay.getDay() === 6) { // Saturday
        intervals = intervals.filter(i => (parseInt(i.split("-")[0].split(":")[0]) >= 9 && parseInt(i.split("-")[1].split(":")[0]) < 15) || i.split("-")[1] == "15:00")
    } else {
        intervals = intervals.filter(i => (parseInt(i.split("-")[0].split(":")[0]) >= 9 && parseInt(i.split("-")[1].split(":")[0]) < 18) || i.split("-")[1] == "18:00")
    }


    if (curChecked.parentElement.childNodes[0].textContent.replace(/(\r\n|\n|\r)/gm,"").trim() === "Injection") {
        var tomorrow = new Date();
        tomorrow.setDate(new Date().getDate()+1);
        if (datesAreOnSameDay(selectedDay, today)) { // scheduling an injection for today, not allowed
            intervals = []
        }

        else if (datesAreOnSameDay(selectedDay, tomorrow)) {
            let separatorHour = today.getHours();
            intervals = intervals.filter(i => (parseInt(i.split("-")[0].split(":")[0]) > separatorHour))
        }
    }

    log(selectedDay, slotsTaken)
    var slotsTakenToday = slotsTaken.filter(slot => datesAreOnSameDay(slot.date, selectedDay))
    log(slotsTakenToday)
    injectionSlot = slotsTakenToday.filter(slot => slot.type === "Injection");
    pickupSlot = slotsTakenToday.filter(slot => slot.type === "In-store pickup");
    curbSideSlot = slotsTakenToday.filter(slot => slot.type === "Curb-side pickup");

    
    injectionSlot = injectionSlot.map(slot => slot.time);
    curbSideSlot = curbSideSlot.map(slot => slot.time);
    pickupSlot = pickupSlot.map(slot => slot.time);
    
    curbSideSlot = curbSideSlot.filter((a, i, aa) => aa.indexOf(a) === i && aa.lastIndexOf(a) !== i);
    pickupSlot = pickupSlot.filter((a, i, aa) => aa.indexOf(a) === i && aa.lastIndexOf(a) !== i);
    log(injectionSlot, pickupSlot, curbSideSlot);

    let option = curChecked.parentElement.childNodes[0].textContent.replace(/(\r\n|\n|\r)/gm,"").trim();
    $('.grid-container').empty();
    intervals.forEach(i => {
        
        let slot = document.createElement("div");
        slot.setAttribute("class", "grid-item")
        let node = document.createTextNode(i);
        slot.appendChild(node);
        grid.appendChild(slot);
        if ((option === "Curb-side pickup" && curbSideSlot.includes(i)) || ((option === "In-store pickup" || option === "Injection") && (pickupSlot.includes(i) || injectionSlot.includes(i)))) {
            log("found it!")
            slot.style.backgroundColor = "grey";
        }
        else {
            slot.addEventListener('click', select);
        }

        
    })
    pickATime.innerHTML = "Pick a Time";
    submitButton.disabled = false;
    if (selectedDay.getDay() === 0) {
        pickATime.innerHTML = "Store closed on Sunday"
        submitButton.disabled = true;
    }


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
    regenerate()
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
    regenerate()
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

function regenerate() {
    //log(monthYear.childNodes[0].textContent);
    days.innerHTML = "";
    var firstDayOfSelectedMonth = new Date(year.innerHTML, months.indexOf(monthYear.childNodes[0].textContent), 1);
    log(firstDayOfSelectedMonth)
    //log(firstDayOfSelectedMonth);
    var totalDays = daysInMonth(firstDayOfSelectedMonth.getMonth() + 1, firstDayOfSelectedMonth.getFullYear());
    var rightShifts = firstDayOfSelectedMonth.getDay();
    log(rightShifts)
    if (rightShifts === 0) {
        rightShifts = 6;
    } else {
        rightShifts--;
    }
    for (let j = 0; j < rightShifts; j++) {
        let curDay = document.createElement("li");
        var node = document.createTextNode("")
        curDay.appendChild(node);
        days.appendChild(curDay);
    }
    var isThisMonth = (firstDayOfSelectedMonth.getMonth() === today.getMonth()) ? true : false;
    log(isThisMonth)
    for (let i = 1; i < totalDays + 1; i++) {

        let curDay = document.createElement("li");
        var node = document.createTextNode(i)
        curDay.appendChild(node);
        if (isThisMonth && today.getDate() <= i) { // 10 is a placeholder for debugging, use today.getDate()
            curDay.style.backgroundColor = "black";
            

        } else {
            curDay.addEventListener('click', makeActive);
        }

        days.appendChild(curDay);
        if (i === 1) {
            let span = document.createElement("span");
            span.setAttribute("class", "active");
            var t = document.createTextNode(i);
            span.appendChild(t);
            curDay.innerHTML = "";
            curDay.appendChild(span);
        }
    }
    // var someDate = // get month and year from innerHTML of DOM, then recreate all days
}

function autoGenerateDates() {


    days.innerHTML = "";
    var totalDays = daysInMonth(today.getMonth() + 1, today.getFullYear());
    var rightShifts = firstDay.getDay();
    var firstDayOfSelectedMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    if (rightShifts === 0) {
        rightShifts = 6;
    } else {
        rightShifts--;
    }
    for (let j = 0; j < rightShifts; j++) {
        let curDay = document.createElement("li");
        var node = document.createTextNode("")
        curDay.appendChild(node);
        days.appendChild(curDay);
    }
    var isThisMonth = (firstDayOfSelectedMonth.getMonth() === today.getMonth()) ? true : false;
    for (let i = 1; i < totalDays + 1; i++) {
        let curDay = document.createElement("li");
        var node = document.createTextNode(i)
        curDay.appendChild(node);
  
        if (isThisMonth && today.getDate() <= i) { // 10 is a placeholder for debugging, use 
            curDay.addEventListener('click', makeActive);

        } else if (isThisMonth) {
            curDay.style.backgroundColor = "black";
        }

        //curDay.addEventListener('click', makeActive);
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


function fetchAppointments() {
    log("loading appointments")
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
        log(appointments)
        appointments.forEach(a => {
            //log(a.start, a.finish, a.date)
            let reconstructedDate = a.date.split("-")
            for (let i = 0; i < 3; i++) {
                reconstructedDate[i] = parseInt(reconstructedDate[i])
            }
            log(reconstructedDate)
            let type;
            let slot = {
                time: a.start + "-" + a.finish,
                date: new Date(reconstructedDate[2], reconstructedDate[0], reconstructedDate[1]),
                type: a.option
            }
            slotsTaken.push(slot)
        })
        log(slotsTaken)
        autoGenerateDates();
    })
    
};






function deleteAppointments() { // for debugging purposes only!!!!!!!!!!
    const url = "/appointments"
    const request = new Request(url, {
        method: "DELETE", 
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    fetch(request).then((res) => {
        if (res.status === 200) {
            log("deleted")
        } else {
            alert(res.status)
        }
    })
}

// deleteAppointments() // comment out if you wish to clear the appointments database

fetchAppointments();


// autoGenerateDates(); // use only if not starting server



