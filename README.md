# Etch-A-Sketch

This is an etch-a-sketch grid in the browser created using:

 - HTML5
 - Bootstrap5
 - CSS3
 - Vanilla JS

## Implementation

### Javascript

 - Dynamically add background colors to each individual square based on the 'mouseover' event listener
 - One function creates a simple black background giving the effect of a black pen and a second function gets a random color by using a for-loop to pick random letters & numbers to create a hex value that is then used to create a 'rainbow' type pen effect
 - Event Listeners on all buttons to apply specific colors, clear the board, change the grid size or re-size the grid back to the default size from page load
 - Clean Board button uses a `ForEach()` to loop through all the divs and set the background color to a blank value of `" "` to effectively "clean" the board
 - Reset Grid button calls a function which removes all the existing square divs and then another function is called to add all the div boxes back in based on the sliders value.  Without removing the boxes first the grid will double up and not match the correct grid size.  CSS `grid-template-columns` & `grid-template-rows` are utilized in this function to dynamically adjust the number of boxes in the grid back based on the sliders value
 - Slider has a `change` event on it so whenever the slider is changed or altered then the `newGrid()` function is called which does almost the same thing as the reset grid button by using `grid-template-columns` & `grid-template-rows` to adjust the number of boxes in the grid to either increase or decrease the size of each individual box
 - Toggle switch uses a `change` event to listen for when the toggle changes.  Depending on the toggle position a function will look to determine that position and dynamically adjust the css style to either add or remove the borders which gives the appears to toggle the grid lines on and off
 - function `addPickedColor` used to listen for the mouseover event and apply a background color based on what the user selects on a color picker.  This color picker will have the attribute of 'hidden' added or removed based on which buttons or pressed.  If "Select A Pen Color" is pressed the color picker appears for the user to make a choice.  If the "Black Pen" or "Random Colors" buttons are pressed the color picker is hidden
 - Pen color buttons are highlighted/change colors based on what is clicked by adding/removing Bootstrap5 classes when a click even fires

### HTML5, Bootstrap5, CSS3

 - CSS grid is the primary foundation of the grid using `display: grid` with a set `height` and `width` to set the etch-a-sketch area for the individual boxes to be placed in
 - Use just one HTML div with an id of `grid-container` as a place to house the dynamically added/removed squares for the grid that is created through JS
 - Primarily use Bootstrap 5 styling for spacing, margins, colors, buttons, fonts
 - Bootstrap 5 `form-switch` class used to turn a check box into a toggle switch
 - Utilize Google Fronts for custom text

## To Play

You can access the etch-a-sketch board [here](https://epetela51.github.io/etch-a-sketch/)

 - Click either the "Black" or "Rainbow" button to draw in whatever color you want.  You can even go back and forth between the two on the same board.  Notice that whatever choice you select that button will turn to black to show you what pen color you are using
 - Click the "Clean Board" button to wipe the board clean but notice that the color you were using is still highlighted/selected so all you need to do is continue to draw
 - Use the slider to adjust how big or small you want the squares to be in the grid
 - If you want to go back to the default size of 38x38 click the "Reset Grid Size" button
