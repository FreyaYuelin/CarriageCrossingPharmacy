const log = console.log;

const selectionForm = document.getElementById('selection-form');
selectionForm.addEventListener('submit', submitFunc);

const username = document.getElementById('username');
username.innerHTML = localStorage.getItem('uname');

const submitButton = document.querySelector('#submit-button');

const categories = document.querySelectorAll('#category');
log(categories)
categories.forEach(c => c.addEventListener('click', switchCategory));




myStorage = window.localStorage;

log(localStorage.getItem('uname'));

let item11 = {
    name: 'Item11',
    src: 'heart.png',
    price: 50,
    quantity: 13
}

let item12 = {
    name: 'Item12',
    src: 'heart.png',
    price: 55,
    quantity: 9
}

let item21 = {
    name: 'Item21',
    src: 'heart.png',
    price: 13,
    quantity: 15
}

let item22 = {
    name: 'Item22',
    src: 'heart.png',
    price: 45,
    quantity: 3
}
let item23 = {
    name: 'Item23',
    src: 'heart.png',
    price: 38,
    quantity: 10
}

let item31 = {
    name: 'Item31',
    src: 'heart.png',
    price: 132,
    quantity: 5
}

let item32 = {
    name: 'Item32',
    src: 'heart.png',
    price: 15,
    quantity: 1
}

var category1 = [item11, item12];
var category2 = [item21, item22, item23];
var category3 = [item31, item32];



function switchCategory(e) {
    e.preventDefault();
    $(selectionForm).empty();
    // need to optimize this, switch statement is dumb
    switch(e.target.innerHTML) {
        case 'Category 1':
            log('click1');
            category1.forEach(c => {
                let element = document.createElement("div");
                element.setAttribute("id", "product");

                let image = document.createElement("img");
                image.setAttribute("src", c.src);
                image.setAttribute("width", "120");
                image.setAttribute("height", "80");
                image.setAttribute("style", "border: 1px solid red;");
                

                let label = document.createElement("label");
                label.for = "name";
                label.innerHTML = c.name;

                let input = document.createElement("input");
                input.type = "text";
                input.name = c.name;
                input.id = "input-item";
                input.value = c.quantity;

                let button = document.createElement('button');
                button.setAttribute("type", "button");
                button.setAttribute("id", "add-product");
                button.innerHTML = "Add";


                element.appendChild(image);
                element.appendChild(label);
                element.appendChild(input);
                element.appendChild(button);
                selectionForm.appendChild(element);
            })
            break;
        case 'Category 2':
            log('click2');
            category2.forEach(c => {
                let element = document.createElement("div");
                element.setAttribute("id", "product");

                let image = document.createElement("img");
                image.setAttribute("src", c.src);
                image.setAttribute("width", "120");
                image.setAttribute("height", "80");
                image.setAttribute("style", "border: 1px solid red;");
                

                let label = document.createElement("label");
                label.for = "name";
                label.innerHTML = c.name;

                let input = document.createElement("input");
                input.type = "text";
                input.name = c.name;
                input.id = "input-item";
                input.value = c.quantity;

                let button = document.createElement('button');
                button.setAttribute("id", "add-product");
                button.innerHTML = "Add";


                element.appendChild(image);
                element.appendChild(label);
                element.appendChild(input);
                element.appendChild(button);
                selectionForm.appendChild(element);
            })
            break;
        case 'Category 3':
            log('click3');
            category3.forEach(c => {
                let element = document.createElement("div");
                element.setAttribute("id", "product");

                let image = document.createElement("img");
                image.setAttribute("src", c.src);
                image.setAttribute("width", "120");
                image.setAttribute("height", "80");
                image.setAttribute("style", "border: 1px solid red;");
                

                let label = document.createElement("label");
                label.for = "name";
                label.innerHTML = c.name;

                let input = document.createElement("input");
                input.type = "text";
                input.name = c.name;
                input.id = "input-item";
                input.value = c.quantity;

                let button = document.createElement('button');
                button.setAttribute("id", "add-product");
                button.innerHTML = "Add";


                element.appendChild(image);
                element.appendChild(label);
                element.appendChild(input);
                element.appendChild(button);
                selectionForm.appendChild(element);
            })
            break;
    }
}


function submitFunc(e) {
    e.preventDefault();
    log('success');
    window.location.href = "index.html";
}
