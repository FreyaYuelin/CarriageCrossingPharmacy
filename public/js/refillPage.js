const log = console.log;

var myStorage = window.localStorage;

const quickRefillContainer = document.querySelector('.quickRefillContainer');
quickRefillContainer.addEventListener('submit', logUser);

const quickRefill = document.querySelector('#quickRefill');
// quickRefill.addEventListener('click', register);

const quickEmail = document.querySelector('#quick-email');

const registerEmail = document.querySelector('#email')
const registerPhone = document.querySelector('#phone')
const registerAddress = document.querySelector('#address')

const user1 = {
    uname: "david",
    pwd: "liu"
}

function logUser() { // not very useful
	// var u = fetchUser(quickEmail.value)
	// log(u)
	localStorage.setItem('email', quickEmail.value)

	// localStorage.set('phone', registerPhone.phone)
	// localStorage.set('address', registerAddress.address)
}



