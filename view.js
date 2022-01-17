class View {

    constructor(){
        this.tokensRadius = 45;
        this.spaceBetween = 10;
        this.playerColor = "red";
        this.buttonEnabled = true;
        this.grid_width = 7*(this.tokenRadius+this.spaceBetween)*2;
        this.grid_height = 6*(this.tokenRadius+this.spaceBetween)*2;

        this.createSideMenu();
        this.createGameBoard();
    }

createSideMenu(){

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

createHeader(){
    for(let i = 0; i<7; i++){
        let button = document.createElement("div");
        button.id="button"+i;
        button.style.width=(this.tokenRadius-5)*2+"px";
        button.style.height=(this.tokenRadius-5)*2+"px";
    
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

addToken(column, row = 0){
    if(buttonEnabled){
        buttonEnabled = false;
        var canvas = document.getElementById('tokens');
        var ctx = canvas.getContext('2d');

        var ball = {
            x: (this.tokenRadius+this.spaceBetween)+((this.tokenRadius+this.spaceBetween)*2)*column,
            y: 0,
            vx: 0,
            vy: 2,
            radius: this.tokenRadius,
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
            if(ball.y< canvas.height-this.spaceBetween-this.tokenRadius-((this.spaceBetween+this.tokenRadius)*2)*row){
                if (ball.y + ball.vy > canvas.height-this.spaceBetween-this.tokenRadius-((this.spaceBetween+this.tokenRadius)*2)*row ) {
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

createGrid(){
    let tokens = document.createElement("canvas");
    tokens.id="tokens";
    tokens.width=this.grid_width;
    tokens.height=this.grid_height
    document.getElementById("gameboard_body").appendChild(tokens);


    let grid = document.createElement("canvas");
    grid.id="grid";
    grid.width=this.grid_width;
    grid.height=this.grid_height
    grid.style.zIndex="1";
    document.getElementById("gameboard_body").appendChild(grid);
    document.getElementById("gameboard_body").style.height=this.grid_height+"px";

    var ctx = grid.getContext("2d");


    ctx.beginPath();
    ctx.moveTo(this.grid_height,this.grid_height);
    ctx.arcTo(0,this.grid_height,0,0,10);
    ctx.arcTo(0,0,this.grid_height,0,10);
    ctx.arcTo(this.grid_width,0,this.grid_height,this.grid_height,10);
    ctx.arcTo(this.grid_width,this.grid_height,0,this.grid_height,10);
    ctx.fillStyle = "#0030da";
    ctx.fill();
    ctx.beginPath();


    ctx.globalCompositeOperation = "destination-out";
    for(let j = 0; j< 6 ; j++){
        for(let i = 0; i< 7 ; i++){
            ctx.beginPath();
            ctx.arc(this.spaceBetween+ this.tokenRadius + (this.tokenRadius*2+ this.spaceBetween*2)*i, this.grid_height-this.tokenRadius-this.spaceBetween - (this.tokenRadius*2+ this.spaceBetween*2)*j, this.tokenRadius, 0, 2 * Math.PI, false);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
            
        }
    }

    
}

resetGrid(){
    document.getElementById("tokens").remove();
    document.getElementById("grid").remove();
    createGrid();
}

createModal(){
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

createGameBoard(){
    this.createHeader();
    this.createGrid();
    this.createModal();
}

bindAddToken(callback){
    callback(test);
}
}