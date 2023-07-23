const home = document.getElementById("home");
const inserisciGiocatori = document.getElementById("formFormaSquadre");
const partita = document.getElementById("partita");

var bottoneGioca = document.getElementById("gioca");
var bottoneIniziaPartita = document.getElementById("iniziaPartita");
var bottoneAggiungi = document.getElementById("aggiungiRisultato");

var modalitaGiocoDaVerificare = document.getElementById("modalitaDiGioco");
var indiceSelezionato;
var modalitaSelezionata;
var modalitaGioco;

var numeroPartitaCorrente = 2;

class Squadra {
  constructor(vittorie, giocatori) {
    this.vittorie = vittorie;
    this.giocatori = giocatori;
    this.nome =
      this.giocatori[0].substr(0, 5) + " - " + this.giocatori[1].substr(0, 5);
  }

  get nome() {
    return this._nome;
  }

  set nome(nome) {
    this._nome = nome;
  }

  get giocatori() {
    return this._giocatori;
  }

  set giocatori(giocatori) {
    this._giocatori = giocatori;
  }

  get vittorie() {
    return this._vittorie;
  }

  set vittorie(vittorie) {
    this._vittorie = vittorie;
  }
}

var nomiGiocatoriSquadra1 = new Array();
var nomiGiocatoriSquadra2 = new Array();
var Squadra1;
var Squadra2;
var puntiSquadre = [0, 0];
var vittorieBriscola = [0,0];
var vittorieSquadre = [0, 0];
var memoriaPuntiSquadre = [0, 0];

var puntiSquadra1 = document.getElementById("puntiSquadra1");
var puntiSquadra2 = document.getElementById("puntiSquadra2");

const nomeGioco = document.getElementById("nomeGioco");

bottoneGioca.addEventListener("click", function () {
  indiceSelezionato = modalitaGiocoDaVerificare.selectedIndex;
  modalitaSelezionata = modalitaGiocoDaVerificare.options[indiceSelezionato];
  modalitaGioco = modalitaSelezionata.value;
  displayNone(home);
  displayFlex(inserisciGiocatori);
});

bottoneIniziaPartita.addEventListener("click", () => {
  catturaNomi();
  Squadra1 = new Squadra(0, nomiGiocatoriSquadra1);
  Squadra2 = new Squadra(0, nomiGiocatoriSquadra2);
  scriviNomeSquadre();
  displayNone(inserisciGiocatori);
  switch (modalitaGioco) {
    case "meglioDiDue":
    case "meglioDiTre": {
      nomeGioco.innerText = "BRISCOLA";
      document.getElementById("punteggioTotSquadra1").style.display = "block";
      document.getElementById("punteggioTotSquadra2").style.display = "block";
      break;
    }
    case "briscola": {
      nomeGioco.innerText = "BRISCOLA";
      document.getElementById("punteggioTotSquadra1").style.display = "none";
      document.getElementById("punteggioTotSquadra2").style.display = "none";
      break;
    }
    case "tresette": {
      document.getElementById("punteggioTotSquadra1").style.display = "block";
      document.getElementById("punteggioTotSquadra2").style.display = "block";
      document.getElementById("vittorieSquadra1").style.display = "none";
      document.getElementById("vittorieSquadra2").style.display = "none";
      nomeGioco.innerText = "TRESETTE";
      break;
    }
    case "burraco": {
      document.getElementById("punteggioTotSquadra1").style.display = "block";
      document.getElementById("punteggioTotSquadra2").style.display = "block";
      document.getElementById("vittorieSquadra1").style.display = "none";
      document.getElementById("vittorieSquadra2").style.display = "none";
      nomeGioco.innerText = "BURRACO";
    }
  }
  displayFlex(partita);
});

function catturaNomi() {
  for (let i = 1; i < 3; i++) {
    nomiGiocatoriSquadra1[i - 1] = document.getElementById(
      "nomeGiocatore" + i
    ).value;
  }
  for (let i = 1, j = 3; i < 3; i++, j++) {
    nomiGiocatoriSquadra2[i - 1] = document.getElementById(
      "nomeGiocatore" + j
    ).value;
  }
}

function scriviNomeSquadre() {
  document.getElementById("nomeSquadra1").innerText = Squadra1.nome;
  document.getElementById("nomeSquadra2").innerText = Squadra2.nome;
}

bottoneAggiungi.addEventListener("click", () => {
  var punteggioSquadra1 = Number(puntiSquadra1.value);
  var punteggioSquadra2 = Number(puntiSquadra2.value);
  switch(modalitaGioco){
    case "briscola": {
      if(punteggioSquadra1 + punteggioSquadra2 != 120) {
        alert("Punteggio inserito Errato");
        return;
      }

      if(punteggioSquadra1 == punteggioSquadra2) {
        assegnaPunti();
        azzeraPunti();
      } else if(punteggioSquadra1 > punteggioSquadra2) {
        assegnaVittoriaSquadra1();
        assegnaPunti();
        azzeraPunti();
      } else {
        assegnaVittoriaSquadra2();
        assegnaPunti();
        azzeraPunti();
      }

      setTimeout(vittoriaBriscola,500);
    }; break;
    case "tresette": {
      if(punteggioSquadra1 > 30 || punteggioSquadra2 > 30){
        alert("Punteggio inserito Errato");
        return;
      }

      salvaPunti();
      assegnaPunti();
      azzeraPunti();

      setTimeout(vittoriaTresette, 500)
    }; break;
    case "burraco": {
      if(punteggioSquadra1 % 5 == 0 && punteggioSquadra2 % 5 == 0){
        salvaPunti();
        assegnaPunti();
        azzeraPunti();
      } else {
        alert("Punteggio inserito Errato")
      }

      setTimeout(vittoriaBurraco,500);
    };break;
    case "meglioDiDue": {
        if(numeroPartitaCorrente % 2 == 0){
          if(punteggioSquadra1 + punteggioSquadra2 != 120) {
            alert("Punteggio inserito Errato");
            return;
          } else if(punteggioSquadra1 == punteggioSquadra2) {
            assegnaPunti();
            azzeraPunti();
          } else if(punteggioSquadra1 > punteggioSquadra2) {
            vittorieBriscola[0]++;
            assegnaPunti();
            assegnaVittoriaBriscola();
            azzeraPunti();
          } else {
            vittorieBriscola[1]++;
            assegnaPunti();
            assegnaVittoriaBriscola();
            azzeraPunti();
          }
          
          setTimeout(vittoriaBriscolaBabbo,500);
        } else {
          if(punteggioSquadra1 > 30 || punteggioSquadra2 > 30){
            alert("Punteggio inserito Errato");
            return;
          } else{
          salvaPunti();
          assegnaPunti();
          azzeraPunti();
          }
          setTimeout(vittoriaTresetteBabbo, 500);
          
        }
      setTimeout(vittoriaMeglioDiDue, 500);
    }; break;
    case "meglioDiTre": {
        if(numeroPartitaCorrente % 2 == 0){
          if(punteggioSquadra1 + punteggioSquadra2 != 120) {
            alert("Punteggio inserito Errato");
            return;
          } else if(punteggioSquadra1 == punteggioSquadra2) {
            assegnaPunti();
            azzeraPunti();
          } else if(punteggioSquadra1 > punteggioSquadra2) {
            vittorieBriscola[0]++;
            assegnaPunti();
            assegnaVittoriaBriscola();
            azzeraPunti();
          } else {
            vittorieBriscola[1]++;
            assegnaPunti();
            assegnaVittoriaBriscola();
            azzeraPunti();
          }

          setTimeout(vittoriaBriscolaBabbo,500);
          
        } else {
          if(punteggioSquadra1 > 30 || punteggioSquadra2 > 30){
            alert("Punteggio inserito Errato");
            return;
          } else{
          salvaPunti();
          assegnaPunti();
          azzeraPunti();
          }
          setTimeout(vittoriaTresetteBabbo, 500); 
        }
        setTimeout(vittoriaMeglioDiTre,500);
      };break;
      
    };
});

function azzeraPunti() {
  for (let i = 0; i < 2; i++) {
    document.getElementById("puntiSquadra"+(i+1)).value = 0;
  }
}

function salvaPunti() {
  for (let i = 0; i < 2; i++) {
    memoriaPuntiSquadre[i] += Number(document.getElementById("puntiSquadra"+(i+1)).value);
  }
}

function assegnaPunti() {
  for (let i = 0; i < 2; i++) {
    let nuovaRiga = document.createElement("p");
    nuovaRiga.innerText = "- " + document.getElementById("puntiSquadra"+(i+1)).value;
    let barra = document.getElementById("barraSquadra" + (i + 1));
    document.getElementById("risultatiSquadra" + (i + 1)).insertBefore(nuovaRiga, barra);
    document.getElementById("punteggioTotSquadra" + (i + 1)).innerText = "TOT: " + memoriaPuntiSquadre[i];
  }
}

function assegnaVittoriaSquadra1() {
  document.getElementById("vittorieSquadra1").innerText = ++vittorieSquadre[0];
}

function assegnaVittoriaSquadra2() {
  document.getElementById("vittorieSquadra2").innerText = ++vittorieSquadre[1];
}

function assegnaVittoriaBriscola() {
  document.getElementById("punteggioTotSquadra1").innerText ="Vittorie: " + vittorieBriscola[0];
  document.getElementById("punteggioTotSquadra2").innerText ="Vittorie: " + vittorieBriscola[1];
}

function displayNone(elemento) {
  elemento.style.display = "none";
}

function displayFlex(elemento) {
  elemento.style.display = "flex";
}

function cancellaPagina(){
  let risultatiSquadra1 = document.querySelectorAll("#risultatiSquadra1 p");
  let risultatiSquadra2 = document.querySelectorAll("#risultatiSquadra2 p");
  risultatiSquadra1[risultatiSquadra1.length-1].innerText = "";
  risultatiSquadra2[risultatiSquadra2.length-1].innerText = "";
  for (let i = 0; i < risultatiSquadra1.length - 1; i++ ){
    risultatiSquadra1[i].remove();
    risultatiSquadra2[i].remove();
  }
}

function vittoriaBriscola(){
  if(vittorieSquadre[0] == 3){
    alert("Ha vinto " + Squadra1.nome);
    location.reload();
  } else if(vittorieSquadre[1] == 3) {
    alert("Ha vinto " + Squadra2.nome);
    location.reload();
  }
}

function vittoriaBriscolaBabbo(){
  if(vittorieBriscola[0] == 3 || vittorieBriscola[1] == 3){
  if(vittorieBriscola[0] == 3){
    alert("Ha vinto " + Squadra1.nome);
    assegnaVittoriaSquadra1();
  } else if(vittorieBriscola[1] == 3) {
    alert("Ha vinto " + Squadra2.nome);
    assegnaVittoriaSquadra2();
  }
  vittorieBriscola[0] = 0;
  vittorieBriscola[1] = 0;
  cancellaPagina();
  nomeGioco.innerText = "TRESETTE";
  numeroPartitaCorrente++;
  azzeraPunti();
}
}

function vittoriaTresette(){
  if(memoriaPuntiSquadre[0] >= 41 || memoriaPuntiSquadre[1] >= 41){
    if(memoriaPuntiSquadre[0] > memoriaPuntiSquadre[1]){
      alert("Ha vinto " + Squadra1.nome);
      location.reload();
    } else {
      alert("Ha vinto " + Squadra2.nome);
      location.reload();
    }
  }
}

function vittoriaTresetteBabbo(){
  if(memoriaPuntiSquadre[0] >= 41 || memoriaPuntiSquadre[1] >= 41){
    if(memoriaPuntiSquadre[0] > memoriaPuntiSquadre[1]){
      numeroPartitaCorrente++;
      alert("Ha vinto " + Squadra1.nome);
      assegnaVittoriaSquadra1();
    } else if(memoriaPuntiSquadre[0] < memoriaPuntiSquadre[1]) {
      numeroPartitaCorrente++;
      alert("Ha vinto " + Squadra2.nome);
      assegnaVittoriaSquadra2();
    } else {return;}
    memoriaPuntiSquadre[0] = 0;
    memoriaPuntiSquadre[1] = 0;
    cancellaPagina();
    nomeGioco.innerText = "BRISCOLA";
    azzeraPunti();
  }
}

function vittoriaBurraco(){
  if(memoriaPuntiSquadre[0] >= 2005 || memoriaPuntiSquadre[1] >= 2005){
    if(memoriaPuntiSquadre[0] > memoriaPuntiSquadre[1]){
      alert("Ha vinto " + Squadra1.nome);
      location.reload();
    } else {
      alert("Ha vinto " + Squadra2.nome);
      location.reload();
    }
  }
}

function vittoriaMeglioDiDue(){
  if(vittorieSquadre[0] == 2){
    alert("Ha vinto " + Squadra1.nome);
    location.reload();
  } else if(vittorieSquadre[1] == 2){
    alert("Ha vinto " + Squadra2.nome);
    location.reload();
  }
}

function vittoriaMeglioDiTre(){
  if(vittorieSquadre[0] == 3){
    alert("Ha vinto " + Squadra1.nome);
    location.reload();
  } else if(vittorieSquadre[1] == 3){
    alert("Ha vinto " + Squadra2.nome);
    location.reload();
  }
}


