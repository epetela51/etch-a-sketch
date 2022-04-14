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

addMultipleBoxes()

// grabs all divs with the class of box
let boxx = document.querySelectorAll('.box')

// adds event listener for moving mouse over div and then adds css class
function addBlackPen(e) {
    e.addEventListener('mouseover', () => {
        e.classList.add('blackPen')
    })
}

// loops through each item in nodelist and adds the function to add css class
boxx.forEach(addBlackPen)







function resetSketch(e) {
    
}

resetBtn.addEventListener('click', resetSketch)