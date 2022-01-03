class Model{
    constructor(){
        this.tokens = new Array(7); 
        for(var i = 0; i < 7; i++){
            this.tokens[i] = new Array(6);
        }
    }

    addToken(column, color){
        this.tokens[column].push(new Token(color)); 
        console.log(this.tokens); 
    }
}