let tokensRadius = 45;
let spaceBetween = 10;
let playerColor = "red";
let buttonEnabled = true;
let grid_width = 7*(tokensRadius+spaceBetween)*2;
let grid_height = 6*(tokensRadius+spaceBetween)*2;

createSideMenu();
createGameBoard();
addToken(3);


function createSideMenu(){

    document.querySelector("input[name=activeIA]").addEventListener('change', function() {
    if (this.checked) {
        console.log("TODO:Enable IA");
    } else {
        console.log("TODO:Disable IA");
    }
    });

    document.getElementById("restartButton").addEventListener('click', function() {
        console.log("TODO: Implement reset tab stocké en back");
        resetGrid();
    });

    

    console.log(document.querySelectorAll("input[name='startplayer']"))
    document.querySelectorAll("input[name='startplayer']").forEach(element => element.addEventListener('click', function() {
        console.log("TODO: Implement choice : " + this.value);
    }));
    


}

function createHeader(){
    for(let i = 0; i<7; i++){
        let button = document.createElement("div");
        button.id="button"+i;
        button.style.width=(tokensRadius-5)*2+"px";
        button.style.height=(tokensRadius-5)*2+"px";
    
        button.addEventListener("click", onButtonClick);
        button.addEventListener("mouseenter", function(event){
            event.target.style.backgroundColor = playerColor;
        });
        button.addEventListener("mouseout", function(event){
            event.target.style.backgroundColor = "";
        });
        
        document.getElementById("gameboard_buttons").appendChild(button);
    
    }
    
    function onButtonClick(){
        addToken(this.id.slice(this.id.length - 1));
    }

    
}

function addToken(column, row = 0){
    if(buttonEnabled){
        buttonEnabled = false;
        var canvas = document.getElementById('tokens');
        var ctx = canvas.getContext('2d');

        var ball = {
            x: (tokensRadius+spaceBetween)+((tokensRadius+spaceBetween)*2)*column,
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
                ctx.strokeStyle = "grey";
                ctx.stroke();
                ctx.closePath();
            }
        };
    
        

        function draw() {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ball.draw();
            ball.y += ball.vy;
            if(ball.y< canvas.height-spaceBetween-tokensRadius-((spaceBetween+tokensRadius)*2)*row){
                if (ball.y + ball.vy > canvas.height-spaceBetween-tokensRadius-((spaceBetween+tokensRadius)*2)*row ) {
                    ball.vy *= .6;
                    ball.vy = -ball.vy;
                }
                
            ball.vy *= .99;
            ball.vy += .25;
            raf = window.requestAnimationFrame(draw);
            }else{

                let grid = document.getElementById('grid');
                let ctx = grid.getContext('2d');
                ctx.globalCompositeOperation = "destination-over";
                
                ctx.beginPath();

                ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, true);
                ctx.fillStyle = ball.color;

                ctx.fill();
                ctx.closePath();

                buttonEnabled = true;
            }
        }


        raf = window.requestAnimationFrame(draw);
        ball.draw();
    }
}

function createGrid(){
    let tokens = document.createElement("canvas");
    tokens.id="tokens";
    tokens.width=grid_width;
    tokens.height=grid_height
    document.getElementById("gameboard_body").appendChild(tokens);


    let grid = document.createElement("canvas");
    grid.id="grid";
    grid.width=grid_width;
    grid.height=grid_height
    grid.style.zIndex="1";
    document.getElementById("gameboard_body").appendChild(grid);
    document.getElementById("gameboard_body").style.height=grid_height+"px";

    var ctx = grid.getContext("2d");


    ctx.beginPath();
    ctx.moveTo(grid_height,grid_height);
    ctx.arcTo(0,grid_height,0,0,10);
    ctx.arcTo(0,0,grid_height,0,10);
    ctx.arcTo(grid_width,0,grid_height,grid_height,10);
    ctx.arcTo(grid_width,grid_height,0,grid_height,10);
    ctx.fillStyle = "#0030da";
    ctx.fill();
    ctx.beginPath();


    ctx.globalCompositeOperation = "destination-out";
    for(let j = 0; j< 6 ; j++){
        for(let i = 0; i< 7 ; i++){
            ctx.beginPath();
            ctx.arc(spaceBetween+ tokensRadius + (tokensRadius*2+ spaceBetween*2)*i, grid_height-tokensRadius-spaceBetween - (tokensRadius*2+ spaceBetween*2)*j, tokensRadius, 0, 2 * Math.PI, false);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
            
        }
    }

    
}

function resetGrid(){
    document.getElementById("tokens").remove();
    document.getElementById("grid").remove();
    createGrid();
}

function createModal(){
    let mymodal = document.createElement("div");
    mymodal.setAttribute("class", "modal");
    mymodal.id="myModal";

    let div = document.createElement("div");
    div.setAttribute("class", "modal-content");
    
    let close = document.createElement("span");
    close.setAttribute("class", "close");
    close.innerHTML="&times;";
    div.appendChild(close);


    let p = document.createElement("p");
    p.innerHTML="TODO: ADD PLAYER NAME";
    div.appendChild(p);

    mymodal.appendChild(div);
    document.body.appendChild(mymodal);

    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
        modal.style.display = "block";
    }
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

function createGameBoard(){
    createHeader();
    createGrid();
    createModal();
}