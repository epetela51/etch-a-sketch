let container = document.querySelector('#grid-container')
let resetBtn = document.querySelector('#reset')


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

// clears board on reset button click by looping through nodeList
resetBtn.addEventListener('click', () => {
    boxx.forEach((e) => {
        e.classList.remove('blackPen')
    })
})