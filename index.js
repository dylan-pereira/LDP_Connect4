let tokensRadius = 50;
let spaceBetween = 10;
let playerColor = "red";

for(let i = 0; i<7; i++){
    let button = document.createElement("div");
    button.id="button"+i;
    button.addEventListener("click", onButtonClick);
    button.addEventListener("mouseenter", onButtonOver);

    document.getElementById("gameboard_buttons").appendChild(button);

}

function onButtonClick(){
    console.log(this.id.slice(this.id.length - 1));
}

function onButtonOver(){
    console.log(this.style);
    this.style.visibility = "hidden";
}





var c = document.getElementById("grid");
var ctx = c.getContext("2d");

ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 840, 720);


ctx.globalCompositeOperation = "destination-out";
for(let j = 0; j< 6 ; j++){
    for(let i = 0; i< 7 ; i++){
        ctx.beginPath();
        ctx.arc(spaceBetween+ tokensRadius + (tokensRadius*2+ spaceBetween*2)*i, 720-tokensRadius-spaceBetween - (tokensRadius*2+ spaceBetween*2)*j, tokensRadius, 0, 2 * Math.PI, false);
        ctx.fill();
        
    }
}



var canvas = document.getElementById('tokens');
var ctx = canvas.getContext('2d');
var raf;

var ball = {
x: tokensRadius+spaceBetween,
y: 0,
vx: 0,
vy: 2,
radius: tokensRadius,
color: playerColor,
draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
}
};

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ball.draw();
    ball.y += ball.vy;
    if(ball.y< canvas.height-spaceBetween-tokensRadius){
        if (ball.y + ball.vy > canvas.height-spaceBetween-tokensRadius ) {
            ball.vy *= .6;
            ball.vy = -ball.vy;
        }
    ball.vy *= .99;
    ball.vy += .25;
    raf = window.requestAnimationFrame(draw);
    }
}


raf = window.requestAnimationFrame(draw);
ball.draw();