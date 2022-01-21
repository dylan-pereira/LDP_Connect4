class Controller {
    constructor(view, model){
        this.view = view; 
        this.model = model; 
        this.view.bindAddToken(this.handleAddToken)
        this.view.bindResetGrid(this.handleResetGrid)
        this.model.bindOnGridChanged(this.onGridChanged)
        this.model.bindOnWinning(this.onWinning)
    }

    onGridChanged = (column, row, color) => {
        this.view.addToken(column, row, color)
      }

    onWinning = (player) => {
        this.view.win(player)
    }

    handleAddToken = (column) => {
        this.model.addToken(column)
    }

    handleResetGrid = () => {
        this.model = new Grille();
        this.model.bindOnGridChanged(this.onGridChanged)
        this.model.bindOnWinning(this.onWinning)
    }

    // handleAddToken(id) {
    //     colonne = parseInt(id.slice(-1),10);
    //     this.model.addToken(colonne); 
    // } //buttoni

}

const app = new Controller(new View(), new Grille())