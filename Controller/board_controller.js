class Controller {
    constructor(view, model){
        this.view = view; 
        this.model = model; 
        this.view.bindAddToken(this.handleAddToken)
    }

    intiGame(){
        this.view.createGameBoard(); 
        this.grille = new Grille()
    }

    handleAddToken(id) {
        colonne = parseInt(id.slice(-1),10);
        this.model.addToken(colonne); 
    } //buttoni

}

const app = new Controller(new ViewConnect4(), new Grille());