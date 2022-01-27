class Controller {
    constructor(view, model){
        this.view = view; 
        this.model = model; 
        this.view.bindAddToken(this.handleAddToken)
        this.view.bindResetGrid(this.handleResetGrid)
        this.view.bindUnlockModel(this.handleUnlockModel)
        this.view.bindEnableIA(this.handleEnableIA)
        this.model.bindOnGridChanged(this.onGridChanged)
        this.model.bindOnWinning(this.onWinning)
        this.model.bindChangePlayerColor(this.onChangePlayerColor)
    }

    onGridChanged = (column, row, color) => {
        this.view.addToken(column, row, color)
      }

    onWinning = (player) => {
        this.view.win(player)
    }

    onChangePlayerColor = (playerColor) => {
        this.view.setPlayerColor(playerColor)
    }

    handleAddToken = (column) => {
        this.model.addToken(column)
        this.model.setIATurn(true)
    }

    handleResetGrid = (playerColor) => {
        this.model = new Grille();
        this.model.bindOnGridChanged(this.onGridChanged)
        this.model.bindOnWinning(this.onWinning)
        this.model.bindChangePlayerColor(this.onChangePlayerColor)
        this.model.setPlayerColor(playerColor)
    }

    handleUnlockModel = () => {
        this.model.unlockModel()
    }

    handleEnableIA = (enable) => {
        this.model.enableIA(enable)
    }

}

const app = new Controller(new View(), new Grille())