// div container holding all the child divs
let container = document.querySelector('#grid-container')

// input slider to change grid size
let slider = document.querySelector('#sliderRange')
let outputSliderValue = document.querySelector('#sliderValue')

// display the starting value of the slider on page load for the grid size
outputSliderValue.textContent = `${slider.value} x ${slider.value}`


function box() {
    let square = document.createElement('div')
    square.setAttribute('class', 'box')
    container.appendChild(square)
}

// removes all the boxes so the page is blank
function removeBoxes() {
    while(container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

// Sets up the etch-a-sketch grid by adding multiple boxes
function addMultipleBoxes(value) {
    let newValue = value*value
    
    for(let i = 0; i < newValue; i++) {
        box()
    }
}

// on page load, run function to draw the grid
addMultipleBoxes(slider.value)
container.style.setProperty('grid-template-columns', `repeat(${slider.value}, auto)`)


//////////////////////////////////////////////////////////////////////////////
// Code for highlighting boxes with mouseover & resetting grid with button click

// reset button
let resetBtn = document.querySelector('#reset')

// grabs all divs with the class of box and creates a nodeList
let boxx = document.querySelectorAll('.box')

// function for moving mouse over div and colors box using css class
function addBlackPen(e) {
    e.addEventListener('mouseover', () => {
        e.classList.add('blackPen')
    })
}

// loops through each item in nodelist and adds the function
boxx.forEach(addBlackPen)

// clears board on reset button click by looping through nodeList using forEach()
resetBtn.addEventListener('click', () => {
    boxx.forEach((e) => {
        e.classList.remove('blackPen')
    })

    // puts the starting point for the slider back to 16x16
    let sliderValue = slider.value = 16;
    outputSliderValue.textContent = `${sliderValue} x ${sliderValue}`

    removeBoxes()
    addMultipleBoxes(sliderValue)

    // resets the grid size back to the default of 16x16
    container.style.setProperty('grid-template-columns', `repeat(${sliderValue}, auto)`)

    // re-grabs all the divs with class of box (clicking is btn will creating a new number of divs so need to re-grab)
    let box = document.querySelectorAll('.box')
    box.forEach(addBlackPen)
})



///////////////////////////////////////////////////////////////////////////
// Code for slider & changing grid size

// as slider moves in real time, call function to update the value
// 'oninput' allows for real time updates of the value opposed to using 'change' event listener
slider.oninput = updateSliderValue

function updateSliderValue(e) {
    outputSliderValue.textContent = `${e.target.value} x ${e.target.value}`
}

// btn to change the grid size
let newGridBtn = document.querySelector('#newGrid')

newGridBtn.addEventListener('click', newGrid)

// creates new grid size
function newGrid() {
    let currentValue = slider.value

    // changes the grid size based off the current value
    container.style.setProperty('grid-template-columns', `repeat(${currentValue}, auto)`)

    // removes all the prior boxes so clean slate/no doubling up
    removeBoxes()

    // re draws the grid to add correct number of boxes
    addMultipleBoxes(currentValue)

    // re-grabs all the divs with class of box (clicking is btn will creating a new number of divs so need to re-grab)
    let box = document.querySelectorAll('.box')
    box.forEach(addBlackPen)
}