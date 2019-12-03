var myDragFlag = false;

document.getElementById("box").onmousedown = function (e) {
  this.startX = (e.pageX - this.offsetLeft);
  this.startY = (e.pageY - this.offsetTop);
  myDragFlag = true;

}

document.body.onmousemove = function(e) {
  if (myDragFlag) {
    document.getElementById("box").style.left = (e.pageX - document.getElementById("box").startX) + "px";
    document.getElementById("box").style.top = (e.pageY - document.getElementById("box").startY) + "px";
  }
}

document.getElementById("box").onmouseup = function(e) {
  myDragFlag = false;
}

document.getElementById("box").onmouseout = function(e) {
  if (myDragFlag) {
    var minEdge = 48;
    var edgeCorrect = 0.9;
    var minEdgeCorrect = (minEdge * edgeCorrect) | 0;
    var bcr = this.getBoundingClientRect();
    var bcrw = bcr.width;
    var bcrh = bcr.height;
    if (this.startX < minEdge) {
      this.style.left = (e.pageX - minEdgeCorrect) + "px";
    } else if (this.startX > bcrw - minEdge) {
      this.style.left = (e.pageX - this.startX + minEdgeCorrect) + "px";
    }
    if (this.startY < minEdge) {
      this.style.top = (e.pageY - minEdgeCorrect) + "px";
    } else if (this.startY > bcrh - minEdge) {
      this.style.top = (e.pageY - this.startY + minEdgeCorrect) + "px";
    }
  }
}