'use strict';

// target our order form from the html
const orderForm = document.getElementById('orderForm');
const orders = document.getElementById('orders');

// set the global array to empty
// let drinks = [];
Coffee.drinks = [];
// let array1 = ['abrar', 23];

// let normalObj = { name: 'abrar', age: 23 };
// console.log('normal ', typeof normalObj);
// let stringObj = JSON.stringify(normalObj);
// console.log('stringified ', typeof stringObj);

// console.log(JSON);

// constructor function to create a basic drink
function Coffee(name, size, milk, isHot, drinkType) {
    this.name = name;
    this.size = size;
    this.isHot = isHot;
    this.drinkType = drinkType;
    this.milk = milk;

    // add every drink that gets created into an array
    Coffee.drinks.push(this);
    settingItems();
}

function settingItems() {
    let data = JSON.stringify(Coffee.drinks);
    console.log(data)
    localStorage.setItem('coffee', data);
}

function gettingItems() {
    let stringObj = localStorage.getItem('coffee');
    // console.log(stringObj);
    let normalObj = JSON.parse(stringObj);
    // console.log(normalObj);
    if (normalObj !== null) {
        Coffee.drinks = normalObj;
    }
    renderOrders();
}
// event handler function to run every time the form is submitted
function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);

    // get all the values from the form
    // const drink = event.target;
    const name = event.target.name.value;
    const size = event.target.size.value;
    const isHot = event.target.isHot.checked;
    const dType = event.target.drinkType.value;
    const milk = event.target.milk.value;

    new Coffee(name, size, milk, isHot, dType);

    // update the previous orders with the new order
    renderOrders();

}


function renderOrders() {
    // clear all my current uls to prevent duplicate information
    orders.textContent = '';

    // go through the array and output the details of each drink in the array
    for (let i = 0; i < Coffee.drinks.length; i++) {
        const drinkLI = document.createElement('li');
        const infoP = document.createElement('p');
        let temp;
        if (Coffee.drinks[i].isHot) {
            temp = 'hot';
        } else {
            temp = 'cold';
        }
        infoP.textContent = `${Coffee.drinks[i].name} ordered a ${temp} ${Coffee.drinks[i].size} ${Coffee.drinks[i].drinkType} with ${Coffee.drinks[i].milk}`;
        drinkLI.appendChild(infoP);
        orders.appendChild(drinkLI);
    }
}

// Add an event listener to the submit button
orderForm.addEventListener('submit', handleSubmit);
gettingItems();