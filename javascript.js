//////////////////////////////////////////////////////////////////////////////
// Code to run on page load

// div container holding all the child divs
let container = document.querySelector('#grid-container')

// input slider to change grid size
let slider = document.querySelector('#sliderRange')
let outputGridSize = document.querySelector('#sliderValue')

// display the starting value of the slider on page load for the grid size
outputGridSize.textContent = `${slider.value} x ${slider.value}`



//////////////////////////////////////////////////////////////////////////////
// Code for a single box, creating multiple boxes and removing all boxes

// on page load, run function to draw the grid
addMultipleBoxes(slider.value)
// add & set property for css grid columns & rows
container.style.setProperty('grid-template-columns', `repeat(${slider.value}, 1fr)`)
container.style.setProperty('grid-template-rows', `repeat(${slider.value}, 1fr)`)


// draws a single box
function box() {
    let square = document.createElement('div')
    square.setAttribute('class', 'box')
    container.appendChild(square)
}

// Sets up the etch-a-sketch grid by adding multiple boxes
function addMultipleBoxes(value) {
    let newValue = value*value
    
    for(let i = 0; i < newValue; i++) {
        box()
    }
}

// removes all the boxes so the page is blank
// without this function, when resetting the page, the existing number of boxes are just added on to which squishes more boxes together at the bottom
function removeBoxes() {
    while(container.firstChild) {
        container.removeChild(container.firstChild)
    }
}



//////////////////////////////////////////////////////////////////////////////
// Code for highlighting boxes with mouseover & resetting grid with button click

// grabs all divs with the class of box and creates a nodeList
let listOfBoxes = document.querySelectorAll('.box')

// function for moving mouse over div and colors box using css class
function addBlackPen(e) {
    e.addEventListener('mouseover', () => {
        e.classList.add('blackPen')
    })
}

// loops through each item in nodelist and adds function to 'draw' a black pen on mouseover
listOfBoxes.forEach(addBlackPen)

// reset button
let resetGridSizeBtn = document.querySelector('#resetGridSize')

// clears board on reset button click
resetGridSizeBtn.addEventListener('click', () => {
    listOfBoxes.forEach((e) => {
        e.classList.remove('blackPen')
    })

    // puts the starting point for the slider back to 16x16
    let sliderValue = slider.value = 38;
    outputGridSize.textContent = `${sliderValue} x ${sliderValue}`

    // resets the css grid columns & rows back to the default of 16x16
    container.style.setProperty('grid-template-columns', `repeat(${sliderValue}, 1fr)`)
    container.style.setProperty('grid-template-rows', `repeat(${sliderValue}, 1fr)`)


    removeBoxes()
    addMultipleBoxes(sliderValue)

    // re-grabs all the divs with class of box (clicking btn will create a new number of divs so need to re-grab new nodeList)
    // must go last so it has complete nodeList to run through
    let boxList = document.querySelectorAll('.box')
    boxList.forEach(addBlackPen)
})



//////////////////////////////////////////////////////////////////////////////
// Code for slider, changing grid size & clearing current sized grid

// as slider moves in real time, call function to update the value
// 'oninput' allows for real time updates of the value opposed to using 'change' event listener
slider.oninput = updateSliderValue

function updateSliderValue(e) {
    outputGridSize.textContent = `${e.target.value} x ${e.target.value}`
}


// on slider change, run the function
slider.addEventListener('change', newGrid)

// creates new grid size
function newGrid() {
    let currentValue = slider.value

    // changes the css grid columns & rows based off the current value
    container.style.setProperty('grid-template-columns', `repeat(${currentValue}, 1fr)`)
    container.style.setProperty('grid-template-rows', `repeat(${currentValue}, 1fr)`)

    // removes all the prior boxes so clean slate/no doubling up
    removeBoxes()

    // re draws the grid to add correct number of boxes
    addMultipleBoxes(currentValue)

    // re-grabs all the divs with class of box (clicking btn will create a new number of divs so need to re-grab new nodeList)
    // must go last so it has complete nodeList to run through
    let boxList = document.querySelectorAll('.box')
    boxList.forEach(addBlackPen)
}

// btn to clean the current sized board
let cleanBoardBtn = document.querySelector('#cleanBoard')

cleanBoardBtn.addEventListener('click', () => {
    listOfBoxes.forEach((e) => {
        e.classList.remove('blackPen')
    })

    // grabs the current sliders value (aka the current grid size)
    let sliderValue = slider.value;

    removeBoxes()
    addMultipleBoxes(sliderValue)

    // re-grabs all the divs with class of box (clicking btn will create a new number of divs so need to re-grab new nodeList)
    // must go last so it has complete nodeList to run through
    let boxList = document.querySelectorAll('.box')
    boxList.forEach(addBlackPen)
})