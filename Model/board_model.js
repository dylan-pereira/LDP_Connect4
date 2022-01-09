class Grille {
    constructor() {
        this.largeur = 7
        this.hauteur = 6
        this.tableau = new Array(this.largeur);

        for (var colonne = 0; colonne < this.largeur; colonne++){
            current_colonne = new Array(this.hauteur);
            for (var ligne = 0; ligne < this.hauteur; ligne++){
                current_colonne[ligne] = NULL; 
            }
            this.tableau[id_colonne] = current_colonne
        }
    }

    ajouterJeton(colonne, jeton){
        ligne = 0
        while (this.tableau[colonne][ligne+1] != NULL){
            ligne++;
        }
        this.tableau[colonne][ligne] = jeton
        this.isWinner(jeton);
    }

    isWinner(jeton){
        for(let colonne = 0; colonne < this.largeur; colonne++){
            for (let ligne = 0; ligne < this.hauteur; ligne++) {
                if(checkAlignement(ligne, colonne,jeton.getColor(), 0) == 4){
                    alert("Vous avez gagné");
                }
            }
        }
    }

    checkAlignement(l, c, color, val){
        
        if(c >= 0 && c <= 7 && l >= 0 && l<=6 && this.tableau[c][l] == color && val < 5){
            val++; 
            val = val + this.checkAlignement(l-1, c, color) + this.checkAlignement(l-1, c+1, color) +
            this.checkAlignement(l, c+1, color) + this.checkAlignement(l+1, c+1, color) +
            this.checkAlignement(l+1, c, color) + this.checkAlignement (l+1, c-1, color) +
            this.checkAlignement(l, c-1, color) + this.checkAlignement (l-1, c-1, color);

            return val
        } else {
            return 0; 
        }
    }

 }
