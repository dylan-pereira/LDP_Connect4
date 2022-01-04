class Grille {
    constructor() {
        this.largeur = 7
        this.hauteur = 6
        this.tableau = new Array(this.largeur);

        for (var colonne = 0; colonne < this.largeur; colonne++){
            current_colonne = new Array(this.hauteur);
            //for (var ligne = 0; ligne < 6; ligne++){
            //    current_colonne[ligne] = new Case(colonne, ligne)
            //}
            this.tableau[id_colonne] = current_colonne
        }
    }

    ajouterJeton(colonne, jeton){
        ligne = 0
        while (this.tableau[colonne][ligne+1] != null){
            ligne++;
        }
        this.tableau[colonne][ligne] = jeton
    }



 }
