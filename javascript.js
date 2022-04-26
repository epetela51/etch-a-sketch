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
    // add an id of square to be used later to toggle grid lines on/off
    square.setAttribute('id', 'square')
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
// Code for highlighting boxes with mouseover

// buttons to choose between a black pen or random colored pen
let blackPenBtn = document.querySelector('#blackPen')
let randomPenBtn = document.querySelector('#randomPen')

// grabs all divs with the class of box and creates a nodeList
let listOfBoxes = document.querySelectorAll('.box')

// function for adding black background to show a black style pen
function addBlackPen(e) {
    e.addEventListener('mouseover', () => {
        e.style.backgroundColor = 'black'
    })
}

// function to get a random color and show a random style pen
function getRandomColor(e) {

    let letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    e.addEventListener('mouseover', () => {
        e.style.backgroundColor = `${color}`
    })
}

// on random btn click get a random color, highlight the random btn and remove highlight from black btn
randomPenBtn.addEventListener('click', () => {
    listOfBoxes.forEach(getRandomColor)
    randomPenBtn.classList.add('btn-dark')
    blackPenBtn.classList.remove('btn-dark')
    selectColorBtn.classList.remove('btn-dark') 
    
    // put the hidden attribute back to hide the picker
    pickPenColor.setAttribute('hidden', 'true') 
})

// on black btn click apply a black background, highlight the black btn and remove highlight from random btn
blackPenBtn.addEventListener('click', () => {
    listOfBoxes.forEach(addBlackPen)
    blackPenBtn.classList.add('btn-dark')
    randomPenBtn.classList.remove('btn-dark')
    selectColorBtn.classList.remove('btn-dark') 
    
    // put the hidden attribute back to hide the picker
    pickPenColor.setAttribute('hidden', 'true') 
})

// color picker input
let pickPenColor = document.querySelector('#pickPenColor')

// on the mouseover add the background color from the color picker
function addPickedColor(e) {
    e.addEventListener('mouseover', () => {
        e.style.backgroundColor = `${pickPenColor.value}`
    })
}

// once the color picker changes/a color is chosen then grab all the divs and loop through each box and apply the chosen color
pickPenColor.addEventListener('change', () => {

    // grab all the boxes for the current grid layout
    let boxList = document.querySelectorAll('.box')

    boxList.forEach(addPickedColor)
})

// btn to select a pen color
let selectColorBtn = document.querySelector('#selectColorBtn')

// clicking the 'select a pen color' btn shows the color picker and applies color selected from picker on mouse over
selectColorBtn.addEventListener('click', () => {
    pickPenColor.removeAttribute('hidden')

    selectColorBtn.classList.add('btn-dark')
    randomPenBtn.classList.remove('btn-dark')
    blackPenBtn.classList.remove('btn-dark')

    // grab divs & loop through again otherwise once this btn is clicked it will keep using the last pen chosen (i.e. either black or random will still be used)
    let boxList = document.querySelectorAll('.box')

    boxList.forEach(addPickedColor)
})



//////////////////////////////////////////////////////////////////////////////
// Code for changing grid size on slider change

// as slider moves in real time, call function to update the value
// 'oninput' allows for real time updates of the value opposed to using 'change' event listener
slider.oninput = updateSliderValue

function updateSliderValue(e) {
    outputGridSize.textContent = `${e.target.value} x ${e.target.value}`
}

// on slider change, run the function
slider.addEventListener('change', newGrid)

// creates a new grid size based off the slider value/change
function newGrid() {
    let currentValue = slider.value

    // changes the css grid columns & rows based off the current value
    container.style.setProperty('grid-template-columns', `repeat(${currentValue}, 1fr)`)
    container.style.setProperty('grid-template-rows', `repeat(${currentValue}, 1fr)`)

    // removes all the prior boxes so clean slate/no doubling up
    removeBoxes()

    // re draws the grid to add correct number of boxes
    addMultipleBoxes(currentValue)

    // removes the highlight for the selected pen btn
    blackPenBtn.classList.remove('btn-dark')    
    randomPenBtn.classList.remove('btn-dark')
    selectColorBtn.classList.remove('btn-dark')
    // put the hidden attribute back to hide the picker
    pickPenColor.setAttribute('hidden', 'true') 

    // reset the grid lines toggle back to checked
    gridToggleSwitch.checked = true

    // re-grabs all the divs with class of box (clicking btn will create a new number of divs so need to re-grab new nodeList)
    // must go last so it has complete nodeList to run through
    let boxList = document.querySelectorAll('.box')
    
    randomPenBtn.addEventListener('click', () => {
        boxList.forEach(getRandomColor)    
    })
    
    blackPenBtn.addEventListener('click', () => {
        boxList.forEach(addBlackPen)
    })
}



//////////////////////////////////////////////////////////////////////////////
// Code for clearing the grid, resetting grid size back to page load size and toggle to add/remove grid lines

// btn to clean the current sized board
let cleanBoardBtn = document.querySelector('#cleanBoard')

cleanBoardBtn.addEventListener('click', () => {

    // re-grabs all the divs with class of box (clicking btn will create a new number of divs so need to re-grab new nodeList)
    // must go last so it has complete nodeList to run through
    let boxList = document.querySelectorAll('.box')

    // loops through and changes the background color to blank/nothing
    boxList.forEach((e) => {
        e.style.backgroundColor = '';
    })

    randomPenBtn.addEventListener('click', () => {
        boxList.forEach(getRandomColor)    
    })
    
    blackPenBtn.addEventListener('click', () => {
        boxList.forEach(addBlackPen)
    })
})

// reset grid size button
let resetGridSizeBtn = document.querySelector('#resetGridSize')

// resets the grid size back to what it was on page load and clears board
resetGridSizeBtn.addEventListener('click', () => {

    // puts the starting point for the slider back to 16x16
    let sliderValue = slider.value = 38;
    outputGridSize.textContent = `${sliderValue} x ${sliderValue}`

    // resets the css grid columns & rows back to the default of 16x16
    container.style.setProperty('grid-template-columns', `repeat(${sliderValue}, 1fr)`)
    container.style.setProperty('grid-template-rows', `repeat(${sliderValue}, 1fr)`)


    removeBoxes()
    addMultipleBoxes(sliderValue)

    // removes the highlight for the selected pen btn
    blackPenBtn.classList.remove('btn-dark')    
    randomPenBtn.classList.remove('btn-dark')
    selectColorBtn.classList.remove('btn-dark')
    // put the hidden attribute back to hide the picker
    pickPenColor.setAttribute('hidden', 'true')  
    
    // reset the grid lines toggle back to checked
    gridToggleSwitch.checked = true

    // re-grabs all the divs with class of box (clicking btn will create a new number of divs so need to re-grab new nodeList)
    // must go last so it has complete nodeList to run through
    let boxList = document.querySelectorAll('.box')
    
    randomPenBtn.addEventListener('click', () => {
        boxList.forEach(getRandomColor)    
    })
    
    blackPenBtn.addEventListener('click', () => {
        boxList.forEach(addBlackPen)

})})

// toggle switch 
let gridToggleSwitch = document.querySelector("#gridToggle")

gridToggleSwitch.addEventListener('change', () => {

    // holds where the toggle is true or false based on if it's toggled
    let toggleChoice = gridToggleSwitch.checked

    // grabs all the id's of square
    let squareList = document.querySelectorAll('#square')

    // if toggle is true then add the border color back to black to show
    if(toggleChoice == true) {
        squareList.forEach((e) => {
            e.style.border = '1px solid black'
        })
    // if the toggle is false make the border 0 so it doesn't show
    } else if (toggleChoice == false) {
        squareList.forEach((e) => {
            e.style.border = '0'
        })
    }

})