let activePlayer = true

class Grille {
    
    constructor() {
        this.largeur = 7
        this.hauteur = 6
        this.tableau = new Array(this.largeur);
        this.activeIA = false
        this.lastRowAdded = null; 

        for (var colonne = 0; colonne < this.largeur; colonne++) {
            var current_colonne = new Array(this.hauteur);
            for (var ligne = 0; ligne < this.hauteur; ligne++) {
                current_colonne[ligne] = null;
            }
            this.tableau[colonne] = current_colonne
        }
    }

    addToken(colonne) {
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
            this.is_winner(token, this.tableau)
        } else {
            console.log("Y a plus de place marcel");
        }

        this.onGridChanged(colonne, this.getLigne(ligne), token)

        return ligne;
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

    is_winner(jeton, tab) {
        console.log("is_winner test")
        console.log("check" + this.check_colonnes(jeton, tab))
        if(this.check_colonnes(jeton, tab) == 4 || this.check_lignes(jeton, tab) == 4 || this.check_diags(jeton, tab) == 4){
            this.onWinning(jeton); 
        }
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
        if(depth == 0 || this.is_winner(player, tab)){
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
                minEval = maxEval < evaluation ? maxEval : evaluation;
                
            }

            return minEval
        }
    }

    evaluation(tab, player) {
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

}