// Code for populating individual boxes & grid
let container = document.querySelector('#grid-container')

function box() {
    let square = document.createElement('div')
    square.setAttribute('class', 'box')
    container.appendChild(square)
}

// Sets up the etch-a-sketch grid by adding multiple boxes
function addMultipleBoxes() {
    for(let i = 0; i < 256; i++) {
        box()
    }
}

// on page load, run function to draw the grid
addMultipleBoxes()



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
    slider.value = 16;
    outputSliderValue.textContent = `${slider.value} x ${slider.value}`
})



///////////////////////////////////////////////////////////////////////////
// Code for slider & changing grid size

let slider = document.querySelector('#sliderRange')
let outputSliderValue = document.querySelector('#sliderValue')

// display the starting value of the slider on page load
outputSliderValue.textContent = `${slider.value} x ${slider.value}`

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
    console.log(currentValue)

    container.style.gridTemplateColumns = repeat(currentValue, auto);
}