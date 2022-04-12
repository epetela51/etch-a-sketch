let container = document.querySelector('#grid-container')

function addBox() {
    let square = document.createElement('div')
    square.setAttribute('class', 'box')
    container.appendChild(square)
}

function addMultipleBoxes() {
    //get total number of divs with class of 'box' on the page
    let totalBoxes = document.querySelectorAll('.box').length;
    console.log('Number of divs with the box class: ' + totalBoxes)

    if(totalBoxes < 10) {
        for(let i = 0; i < totalBoxes; i++) {
            console.log(i)
            addBox()
        }
    } else {
        console.log('woops')
    }
}

addMultipleBoxes()