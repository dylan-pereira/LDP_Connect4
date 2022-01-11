let activePlayer = true

class Grille {
    constructor() {
        this.largeur = 7
        this.hauteur = 6
        this.tableau = new Array(this.largeur);
        this.activeIA = false

        for (var colonne = 0; colonne < this.largeur; colonne++){
            var current_colonne = new Array(this.hauteur);
            for (var ligne = 0; ligne < this.hauteur; ligne++){
                current_colonne[ligne] = null; 
            }
            this.tableau[colonne] = current_colonne
        }
    }

    addToken(colonne){
        let token = "RED"
        if(activePlayer) token = "RED";
        else token = "YELLOW";
        
        activePlayer = !activePlayer
        
        var ligne = 0
        while (this.tableau[colonne][ligne+1] == null && ligne<5){
            ligne++;
        }
        this.tableau[colonne][ligne] = token

        this.is_winner(token)
    }

    is_winner(jeton){
        console.log("is_winner test")
        if(this.check_colonnes(jeton) || this.check_lignes(jeton)){
            console.log("ca marche tu as gagné !!!")
        }
    }

    check_colonnes(jeton){
        let nombre_jeton = 0
        for(let colonne = 0; colonne < this.largeur; colonne++){
            for (let ligne = 0; ligne < this.hauteur; ligne++) {
                if(this.tableau[colonne][ligne] == jeton) nombre_jeton ++
                if(nombre_jeton == 4) return true
            }
        }
        return false
    }

    check_lignes(jeton){
        let nombre_jeton = 0
        for(let ligne = 0; ligne < this.hauteur; ligne++){
            for(let colonne = 0; colonne < this.largeur; colonne++){
                if(this.tableau[colonne][ligne] ==  jeton) nombre_jeton ++
                if(nombre_jeton == 4) return true
            }
        }
        return false
    }

    to_string(){
        for(let colonne = 0; colonne < this.largeur; colonne++){
            for (let ligne = 0; ligne < this.hauteur; ligne++) {
                console.log(this.tableau[colonne][ligne])
            }
            console.log('\n')
        }
    }

    test(){
        console.log("Paulin pd");
    }

 }