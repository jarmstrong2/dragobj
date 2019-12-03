
dragItem = document.querySelector("#box");
dragBox = document.querySelector("#box_draggable");
container_main = document.querySelector("#container_main");
container_secondary = document.querySelector("#container_secondary");

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;
var XPosOnScreen = 0;
var YPosOnScreen = 0;

container_main.addEventListener('mousedown', dragStart, false);
container_main.addEventListener('mouseup', dragEnd, false);
container_main.addEventListener('mousemove', drag, false);

function dragStart(e) {
  initialX = e.clientX;
  initialY = e.clientY;

  console.log(e.target.id)

  if (e.target.id.includes("box")) {
    dragItem = e.target
    dragItem.classList.add("boxgray")
  }

  if (e.target === dragItem) {
    active = true;
    dragCoordinates = dragItem.getBoundingClientRect();
    dragBox.style.display = "block";

    setTranslate(dragCoordinates.x, dragCoordinates.y, dragBox)
    container_secondary.style.backgroundColor = "";
  }
}

function drag(e) {
  if (active) {

    e.preventDefault();

    dragCoordinates = dragItem.getBoundingClientRect();

    console.log(dragCoordinates)

    currentX = dragCoordinates.x + e.clientX - initialX;
    currentY = dragCoordinates.y + e.clientY - initialY;

    setTranslate(currentX, currentY, dragBox);
  }
}

function dragEnd(e) {
  active = false
  setTranslate(0, 0, dragBox);
  cSecondary = container_secondary.getBoundingClientRect();
  dragBoxCoordinates = dragBox.getBoundingClientRect();
  dragItemCoordinates = dragItem.getBoundingClientRect();
  dragBox.style.display = "None";




  if ((currentX + dragBoxCoordinates.width) < cSecondary.left || currentX >  cSecondary.right) {
    dragItem.parentNode.parentNode.removeChild(dragItem.parentNode)
  }

  else if ((currentY + dragBoxCoordinates.height) < cSecondary.top || currentY >  cSecondary.bottom) {
    dragItem.parentNode.parentNode.removeChild(dragItem.parentNode)
  }

  else if (
    (currentX <= dragItemCoordinates.right && currentX >= dragItemCoordinates.left && currentY <= dragItemCoordinates.bottom && currentY >= dragItemCoordinates.top) || 
    ((currentX + dragBoxCoordinates.width) <= dragItemCoordinates.right && (currentX + dragBoxCoordinates.width) >= dragItemCoordinates.left && currentY <= dragItemCoordinates.bottom && currentY >= dragItemCoordinates.top) || 
    ((currentX + dragBoxCoordinates.width) <= dragItemCoordinates.right && (currentX + dragBoxCoordinates.width) >= dragItemCoordinates.left && (currentY + dragBoxCoordinates.height) <= dragItemCoordinates.bottom && (currentY + dragBoxCoordinates.height) >= dragItemCoordinates.top) || 
    (currentX <= dragItemCoordinates.right && currentX >= dragItemCoordinates.left && (currentY + dragBoxCoordinates.height) <= dragItemCoordinates.bottom && (currentY + dragBoxCoordinates.height) >= dragItemCoordinates.top)
  ) {
    dragItem.classList.remove("boxgray")
  }
  else {
    dragItem.parentNode.parentNode.removeChild(dragItem.parentNode)
  }


}


function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}