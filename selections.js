const log = console.log;

const selectionForm = document.getElementById('selection-form');
selectionForm.addEventListener('submit', submitFunc);

const username = document.getElementById('username');
username.innerHTML = localStorage.getItem('uname');

myStorage = window.localStorage;

log(localStorage.getItem('uname'));

function submitFunc(e) {
    e.preventDefault();
    log('success');
    window.location.href = "index.html";
}

