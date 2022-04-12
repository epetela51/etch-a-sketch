let container = document.querySelector('#grid-container')
//totalBoxes will show 0 at page load since there are no divs with class box in html on page load and they get added dynamically
let totalBoxes = document.querySelectorAll('.box').length;

function addBox() {
    let square = document.createElement('div')
    square.setAttribute('class', 'box')
    container.appendChild(square)
}

function addMultipleBoxes() {
    for(let i = 0; i < 256; i++) {
        addBox()
        totalBoxes++
        console.log(totalBoxes)
    }
}

addMultipleBoxes()