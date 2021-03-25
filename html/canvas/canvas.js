const colorCircle = document.querySelectorAll('.color-circle');

let penSize = 10;
let isDrawing;
let x;
let y;

var canvas = document.querySelector('canvas');
c = canvas.getContext('2d');

canvas.addEventListener('mousedown', (e)=> {
    isDrawing = true;
    x = e.offsetX;
    y = e.offsetY;
    //console.log(x,y); canvas offset
});

canvas.addEventListener('mouseup', ()=> {
    isDrawing = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
    draw(e.offsetX, e.offsetY);
})

c.fillStyle = "black"; // first active color
c.strokeStyle = c.fillStyle;

function draw(x2, y2){
    if(isDrawing){
        c.beginPath();
        c.arc(x2,y2, penSize, 0, Math.PI * 2);
        c.closePath();
        c.fill();
    //draw line(otherwise draw dash)
    drawLine(x,y,x2,y2);
    }    
    x = x2;
    y = y2;
}

function drawLine(x1, y1, x2, y2){
    c.beginPath();
    c.moveTo(x1,y1);
    c.lineTo(x2,y2);
    c.strokeStyle = c.fillStyle;
    c.lineWidth = penSize * 2;
    c.stroke();
}
//clear
document.querySelector('.fa-eraser').addEventListener('click', function(){
    c.clearRect(0,0, canvas.width, canvas.height);
});

// select color
const selectColor = (elem) => {
    removeActiveCircleColor();
    c.fillStyle = elem.getAttribute('data-color');
    elem.classList.add('active');
}
//remove active class
const removeActiveCircleColor = () => {
    colorCircle.forEach((circle)=> {
        circle.classList.remove('active');
    });
}
//size of pen
function penSizeChange(pensize){
    penSize = pensize;
}
const favColor = (elem) => {
    removeActiveCircleColor();
    c.fillStyle = elem.value;
}

//save drawing
document.querySelector('a').addEventListener('click', (e) =>
e.target.href = canvas.toDataURL());