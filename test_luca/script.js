class Controller {
    constructor(model, view) {
      this.model = model
      this.view = view
      this.view.bindAddToken(this.handleAddToken); 
    }

    handleAddToken = (column) => {
        this.model.addToken(column, "red");
    }

}

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

class View{
    constructor(){
        this.button = this.getElement('#boutton'); 
    }

    getElement(selector) {
        const element = document.querySelector(selector);
    
        return element;
      }

      bindAddToken(handler) {
            this.button.addEventListener('click', event => {
                event.preventDefault();
                handler(2);
              });
      }
}

const app = new Controller(new Model(), new View()); 



