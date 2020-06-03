// <<<<<<< HEAD
  
const sendButton = document.querySelector("#send-button");

const phone = document.querySelector("#phone-number");

const email = document.querySelector("#email");

const message = document.querySelector("#message");

const name = document.querySelector("#name");

const suggest = document.querySelector(".suggestion-box");
suggest.addEventListener("submit", goto);

function goto(e) {
	e.preventDefault();
	console.log(phone.value, email.value, message.value, name.value);
	
}
// =======
// const sendButton = document.querySelector("#send-button");

// const phone = document.querySelector("#phone-number");

// const email = document.querySelector("#email");

// const message = document.querySelector("#message");

// const name = document.querySelector("#name");

// const suggest = document.querySelector(".suggestion-box");
// suggest.addEventListener("submit", goto);

// function goto(e) {
// 	e.preventDefault();
// 	console.log(phone.value, email.value, message.value, name.value);
	
// }
// >>>>>>> 99c977682bd3a6082ef799a5e6b54cdcdc257650
