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
            this.is_winner(token)
        } else {
            console.log("Y a plus de place marcel");
        }
    }

    is_winner(jeton) {
        console.log("is_winner test")
        if(this.check_colonnes(jeton) || this.check_lignes(jeton) || this.check_diags(jeton)){
            console.log("ca marche tu as gagné !!!")
        }
    }

    check_colonnes(jeton){
        for(let colonne = 0; colonne < this.largeur; colonne++){
            for (let ligne = 0; ligne < this.hauteur-3; ligne++) {
                if( this.tableau[colonne][ligne] == jeton && 
                    this.tableau[colonne][ligne+1] == jeton &&
                    this.tableau[colonne][ligne+2] == jeton &&
                    this.tableau[colonne][ligne+3] == jeton ) return true
            }
        }
        return false
    }

    check_lignes(jeton){
        for(let ligne = 0; ligne < this.hauteur; ligne++){
            for(let colonne = 0; colonne < this.largeur-3; colonne++){
                if( this.tableau[colonne][ligne] == jeton && 
                    this.tableau[colonne+1][ligne] == jeton &&
                    this.tableau[colonne+2][ligne] == jeton &&
                    this.tableau[colonne+3][ligne] == jeton ) return true
            }
        }
        return false
    }

    check_diags(jeton) {
        var diagsRight, diagsLeft = false;
        for (let ligne = 0; ligne < this.hauteur; ligne++) {
            for (let colonne = 0; colonne < this.largeur; colonne++) {
                diagsRight = this.checkDiagRight(colonne, ligne, jeton, 0) == 4;
                diagsLeft = this.checkDiagLeft(colonne, ligne, jeton, 0) == 4;
                if (diagsLeft || diagsRight) {
                    return true;
                }
            }
        }

        return false;
    }

    checkDiagRight(c, l, color, val) {
        if(c >= 0 && c < 7 && l < 6 && val < 5 && this.tableau[c][l] == color){
            val = 1 + this.checkDiagRight(c-1, l+1, color, val);
            return val;
        } else {
            return 0;
        }
    }

    checkDiagLeft(c, l, color, val) {
        if (c >= 0 && l < 6 && val < 5 && this.tableau[c][l] == color) {
            val = 1 + this.checkDiagLeft(c - 1, l - 1, color, val);
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

}