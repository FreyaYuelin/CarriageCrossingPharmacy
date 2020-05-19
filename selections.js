const log = console.log;

const selectionForm = document.getElementById('selection-form');
selectionForm.addEventListener('submit', submitFunc);

const username = document.getElementById('username');
username.innerHTML = localStorage.getItem('uname');

const submitButton = document.querySelector('#submit-button');

myStorage = window.localStorage;

log(localStorage.getItem('uname'));

function submitFunc(e) {
    e.preventDefault();
    log('success');
    window.location.href = "index.html";
}

function addToProductsList(e) {
    e.preventDefault();
    selectionForm.insertBefore(e.target.parentElement, submitButton);
    let textfield = e.target.parentElement.querySelector('#item-input');
    textfield.style.visibility = 'visible';
    e.target.style.visibility = 'hidden';


    

}

const addButton = document.querySelector('#add-button');
addButton.addEventListener('click', addToProductsList);