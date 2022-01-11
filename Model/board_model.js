class Grille {
    constructor() {
        this.largeur = 7
        this.hauteur = 6
        this.tableau = new Array(this.largeur);
        this.activeIA = false;
        this.player1 = "Player1";
        this.player2 = "Player2";
        this.activePlayer = this.player1;

        for (var colonne = 0; colonne < this.largeur; colonne++){
            var current_colonne = new Array(this.hauteur);
            for (var ligne = 0; ligne < this.hauteur; ligne++){
                current_colonne[ligne] = null; 
            }
            this.tableau[colonne] = current_colonne
        }
    }

    addToken(colonne){
        var token = "RED";
        if(this.activePLayer==this.player1){
            token = ("RED");
        } else {
            token = ("YELLOW");
        }
        
        var ligne = 0
        while (this.tableau[colonne][ligne+1] == null && ligne<5){
            ligne++;
        }
        this.tableau[colonne][ligne] = token

        //this.is_winner()
        this.isWinner(token);

        // if(this.activePLayer==this.player1) {
        //     this.activePlayer=this.player2
        // } else {
        //     this.activePlayer=this.player1
        // }

        this.to_string()
    }

    isWinner(jeton){
        for(let colonne = 0; colonne < this.largeur; colonne++){
            for (let ligne = 0; ligne < this.hauteur; ligne++) {
                if(this.checkAlignement(ligne, colonne, jeton, 1, -1, -1) == 4){
                    alert("Vous avez gagné");
                    console.log("gagné")
                }
            }
        }
    }

    checkAlignement(l, c, color, val, lprev, cprev){
        
        console.log(c)
        if(lprev!=l && cprev!=c && c >= 0 && c < 7 && l >= 0 && l<6 && this.tableau[c][l] == color && val < 5){
            val++
            val = val + this.checkAlignement(l-1, c, color, val, l, c) + this.checkAlignement(l-1, c+1, color, val, l, c) +
            this.checkAlignement(l, c+1, color, val, l, c) + this.checkAlignement(l+1, c+1, color, val, l, c) +
            this.checkAlignement(l+1, c, color, val, l, c) + this.checkAlignement (l+1, c-1, color, val, l, c) +
            this.checkAlignement(l, c-1, color, val, l, c) + this.checkAlignement (l-1, c-1, color, val, l, c);

            console.log("ifffffffff")

            return val
        } else {
            return 0
        }
    }

    is_winner(){
        console.log("is_winner test")
        if(this.check_colonnes || this.check_lignes){
            console.log("ca marche tu as gagné !!!")
        }
    }

    check_colonnes(){
        let nombre_jeton = 0
        for(let colonne = 0; colonne < this.largeur; colonne++){
            for (let ligne = 0; ligne < this.hauteur; ligne++) {
                if(this.tableau[colonne][ligne]) nombre_jeton ++
                if(nombre_jeton == 4) return true
            }
        }
        return false
    }

    check_lignes(){
        let nombre_jeton = 0
        for(let ligne = 0; ligne < this.hauteur; ligne++){
            for(let colonne = 0; colonne < this.largeur; colonne++){
                if(this.tableau[colonne][ligne]) nombre_jeton ++
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