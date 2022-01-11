class Controller {
    constructor(view){
        this.view = view; 
        
    }

    intiGame(){
        this.view.createGameBoard(); 
        this.grille = new Grille()
    }

    handleTokenAdded(id) {
        colonne = parseInt(id.slice(-1),10);
        this.model.addToken(colonne); 
    } //buttoni



}