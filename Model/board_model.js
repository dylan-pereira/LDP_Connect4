let activePlayer = true

class Grille {
    
    constructor() {
        this.largeur = 7
        this.hauteur = 6
        this.tableau = new Array(this.largeur);
        this.activeIA = false

        for (var colonne = 0; colonne < this.largeur; colonne++) {
            var current_colonne = new Array(this.hauteur);
            for (var ligne = 0; ligne < this.hauteur; ligne++) {
                current_colonne[ligne] = null;
            }
            this.tableau[colonne] = current_colonne
        }
    }

    addToken(colonne) {
        let token = "RED"
        if (activePlayer) token = "RED";
        else token = "YELLOW";

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

        return ligne;
    }

    is_winner(jeton, tab) {
        console.log("is_winner test")
        if(this.check_colonnes(jeton, tab) == 4 || this.check_lignes(jeton, tab) == 4 || this.check_diags(jeton, tab) == 4){
            console.log("ca marche tu as gagné !!!")
        }
    }

    check_colonnes(jeton, tab ){
        for(let colonne = 0; colonne < this.largeur; colonne++){
            for (let ligne = 0; ligne < this.hauteur-3; ligne++) {

                let value = 0
                while(value < 4 && tab[colonne][ligne+(value++)] == jeton)
                return value
            }
        }
        return false
    }

    check_lignes(jeton, tab){
        for(let ligne = 0; ligne < this.hauteur; ligne++){
            for(let colonne = 0; colonne < this.largeur-3; colonne++){

                let value = 0
                while(value < 4 && tab[colonne+(value++)][ligne] == jeton)
                return value

            }
        }
        return false
    }

    check_diags(jeton, tab) {
        for (let ligne = 0; ligne < this.hauteur; ligne++) {
            for (let colonne = 0; colonne < this.largeur; colonne++) {
                return Math.max(this.checkDiagRight(colonne, ligne, jeton, 0, tab), this.checkDiagLeft(colonne, ligne, jeton, 0, tab))
            }
        }

        return false;
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

        if(player == "YELLOW"){
            var maxEval = Number.NEGATIVE_INFINITY
            for (let i = 0; i < tab.length; i++) {
                var newTab = this.copyArray(tab)

                var ligne = 0
                while (newTab[i][ligne + 1] == null && ligne < 5) {
                    ligne++;
                }

                if (newTab[i][ligne] == null) {
                    newTab[i][ligne] = "YELLOW"
                }

                var evaluation = this.minimax(newTab, depth-1, "RED");
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
                    newTab[i][ligne] = "RED"
                }

                var evaluation = this.minimax(newTab, depth-1, "YELLOW");
                minEval = maxEval < evaluation ? maxEval : evaluation;
                
            }

            return minEval
        }
    }

    evaluation(tab, player) {
        var value = Math.max(this.check_colonnes(player, tab), this.check_lignes(player, tab), this.check_diags(player, tab))
        return player == "YELLOW" ? value : -value;
    }

    copyArray(array) {
        var newTab = new Array(this.largeur)

        for (let i = 0; i < array.length; i++) {
            newTab[i] = array[i].slice()            
        }

        return newTab
    }

    play_minimax() {
        let tableau = this.tableau
        let best_eval = 0
        for (var colonne = 0; colonne < this.largeur; colonne++) {
            let tab = tableau
            this.add_to_column(tab, colonne)
            if (this.minimax(tab) > best_eval) {
                this.tableau = tab
            }
        }
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
        console.log(depth)
    }

    add_to_column(tab, colonne) {
        var ligne = 0
        while (tab[colonne][ligne + 1] == null && ligne < 5) {
            ligne++
        }
        tab[colonne][ligne]
        return tab
    }

}