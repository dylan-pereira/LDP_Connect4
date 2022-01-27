let activePlayer = true

class Grille {
    
    constructor() {
        this.largeur = 7
        this.hauteur = 6
        this.tableau = new Array(this.largeur);
        this.lastRowAdded = null; 
        this.pauseModel = false; 
        this.IATurn = true; 

        for (var colonne = 0; colonne < this.largeur; colonne++) {
            var current_colonne = new Array(this.hauteur);
            for (var ligne = 0; ligne < this.hauteur; ligne++) {
                current_colonne[ligne] = null;
            }
            this.tableau[colonne] = current_colonne
        }
    }

    addToken(colonne) {

        if(!this.pauseModel){

            let token = "red"
            if (activePlayer) token = "red";
            else token = "yellow";

            activePlayer = !activePlayer

            var ligne = 0
            while (this.tableau[colonne][ligne + 1] == null && ligne < 5) {
                ligne++;
            }

            if (this.tableau[colonne][ligne] == null) {
                this.tableau[colonne][ligne] = token
                //this.is_winner(token, this.tableau)
            } else {
                console.log("Y a plus de place marcel");
            }

            this.onGridChanged(colonne, this.getLigne(ligne), token)

            this.pauseModel = true; 

        }

    }

    getLigne(ligne){
        switch (ligne) {
            case 5:
                return 0

            case 4:
                return 1

            case 3:
                return 2

            case 2:
                return 3

            case 1:
                return 4

            case 0:
                return 5

            default:
                return 0;
        }
    }

    is_winner(jeton, tab, minimax) {
        if(this.check_colonnes(jeton, tab) == 4 || this.check_lignes(jeton, tab) == 4 || this.check_diags(jeton, tab) == 4){
            if(!minimax){
                this.onWinning(jeton);  
            }
            return true;
        }
        return false; 
    }

    check_colonnes(jeton, tab ){
        var value = 0
        for(let colonne = 0; colonne < this.largeur; colonne++){
            for (let ligne = 0; ligne < this.hauteur; ligne++) {
                var newVal = 0
                while(newVal != 4 && tab[colonne][ligne+(newVal)] == jeton){
                    newVal++
                }
                if(newVal == 4){
                    return newVal
                } else {
                    value = newVal > value ? newVal : value
                }
            }
        }
        return value
    }

    check_lignes(jeton, tab){
        var value = 0
        for(let ligne = 0; ligne < this.hauteur; ligne++){
            for(let colonne = 0; colonne < this.largeur-3; colonne++){
                var newVal = 0
                while(newVal != 4 && tab[colonne+newVal][ligne] == jeton){
                    newVal++
                }
                if(newVal == 4){
                    return newVal
                } else {
                    value = newVal > value ? newVal : value
                }
    
            }
        }
        return value
    }

    check_diags(jeton, tab) {
        var max = 0
        for (let ligne = 0; ligne < this.hauteur; ligne++) {
            for (let colonne = 0; colonne < this.largeur; colonne++) {
                max =  Math.max(this.checkDiagRight(colonne, ligne, jeton, 0, tab), this.checkDiagLeft(colonne, ligne, jeton, 0, tab), max)
            }
        }
        return max
    }

    checkDiagRight(c, l, color, val, tab) {
        if(c >= 0 && c < 7 && l < 6 && val < 5 && tab[c][l] == color){
            val = 1 + this.checkDiagRight(c-1, l+1, color, val, tab);
            return val;
        } else {
            return 0;
        }
    }

    checkDiagLeft(c, l, color, val, tab) {
        if (c >= 0 && l < 6 && val < 5 && tab[c][l] == color) {
            val = 1 + this.checkDiagLeft(c - 1, l - 1, color, val, tab);
            return val;
        } else {
            return 0;
        }
    }

    to_string() {
        for (let colonne = 0; colonne < this.largeur; colonne++) {
            for (let ligne = 0; ligne < this.hauteur; ligne++) {
                console.log(this.tableau[colonne][ligne])
            }
            console.log('\n')
        }
    }

    minimax(tab, depth, player){
        console.log(depth)
        if(depth <= 0 || this.is_winner(player, tab, true)){
            return this.evaluation(tab, player);
        }

        if(player == "yellow"){
            var maxEval = Number.NEGATIVE_INFINITY
            for (let i = 0; i < tab.length; i++) {
                var newTab = this.copyArray(tab)

                var ligne = 0
                while (newTab[i][ligne + 1] == null && ligne < 5) {
                    ligne++;
                }

                if (newTab[i][ligne] == null) {
                    newTab[i][ligne] = "yellow"
                }

                var evaluation = this.minimax(newTab, depth-1, "red");

                maxEval = maxEval > evaluation ? maxEval : evaluation;
                
            }

            return maxEval
        } else {
            var minEval = Number.POSITIVE_INFINITY
            for (let i = 0; i < tab.length; i++) {
                var newTab = this.copyArray(tab)

                var ligne = 0
                while (newTab[i][ligne + 1] == null && ligne < 5) {
                    ligne++;
                }

                if (newTab[i][ligne] == null) {
                    newTab[i][ligne] = "red"
                }


                var evaluation = this.minimax(newTab, depth-1, "yellow");

                minEval = minEval < evaluation ? minEval : evaluation;
                
            }

            return minEval
        }
    }

    evaluation(tab, player) {
        console.log("TEST EVAL");
        var value = Math.max(this.check_colonnes(player, tab), this.check_lignes(player, tab), this.check_diags(player, tab))
        return player == "yellow" ? value : -value;
    }

    copyArray(array) {
        var newTab = new Array(this.largeur)

        for (let i = 0; i < array.length; i++) {
            newTab[i] = array[i].slice()            
        }

        return newTab
    }

    getLastRowAdded(){
        let row = this.getLastRowAdded
        this.getLastRowAdded = null
        return row
    }

    setLastRowAdded(row) {
        this.lastRowAdded = row
    }

    bindOnGridChanged(callback) {
        this.onGridChanged = callback
    }

    bindOnWinning(callback){
        this.onWinning = callback
    }

    unlockModel(){
        this.pauseModel = false; 
        this.is_winner(activePlayer == true ? "yellow" : "red", this.tableau, false);
        if(this.activeIA && this.IATurn){

            //let minMaxRes = this.play_minimax(activePlayer == "yellow" ? "red" : "yellow")

            const secondPart = async () => {
                const minMaxRes = await this.play_minimax(activePlayer == "yellow" ? "red" : "yellow");
                console.log("resMinMax : "+minMaxRes)
                this.addToken(minMaxRes, false)
                this.setIATurn(false) 
            }

            secondPart()

        }
    }

    enableIA(enable){
        this.activeIA = enable; 
    }

    play_minimax(player) {
        let store_tab = this.copyArray(this.tableau)
        let best_eval = 0
        let colonne_played;
        for (var colonne = 0; colonne < this.largeur; colonne++) {
            let tab = this.copyArray(store_tab)
            this.add_to_column(tab, colonne, player)
            let minimax_eval = this.minimax(tab, 4, player)
            console.log(minimax_eval)
            if (minimax_eval > best_eval) {
                best_eval = minimax_eval
                colonne_played = colonne
            }
        }
        return colonne_played
    }

    get_minimax_depth() {
        let depth = 0
        for (var colonne = 0; colonne < this.largeur; colonne++) {
            for (var ligne = 0; ligne < this.hauteur; ligne++) {
                if (this.tableau[colonne][ligne] == null) {
                    depth ++
                }
            }
        }
        return depth
    }

    add_to_column(tab, colonne, player) {
        var ligne = 0
        while (tab[colonne][ligne + 1] == null && ligne < 5) {
            ligne++
        }
        tab[colonne][ligne] = player
        return tab
    }

    setIATurn(IATurn){
        this.IATurn = IATurn
    }

}
