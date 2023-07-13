const home = document.getElementById("home");
const inserisciGiocatori = document.getElementById("formFormaSquadre");
const gioco = document.getElementById("briscola");

var bottoneGioca = document.getElementById("gioca");
var bottoneIniziaPartita = document.getElementById("iniziaPartita");

bottoneGioca.addEventListener("click", function () {
  displayNone(home);
  displayFlex(inserisciGiocatori);
});

bottoneIniziaPartita.addEventListener("click", () => {
  displayNone(inserisciGiocatori);
  displayFlex(gioco);
});

function displayNone(elemento) {
  elemento.style.display = "none";
}

function displayFlex(elemento) {
  elemento.style.display = "flex";
}

var nomiGiocatori = new Array();

bottoneIniziaPartita.addEventListener("click", () => {
  catturaNomi();
  formaSquadre();
  displayNone(inserisciGiocatori);
  displayFlex(briscola);
});

function catturaNomi() {
  for (let i = 1; i < 5; i++) {
    nomiGiocatori[i - 1] = document.getElementById("nomeGiocatore" + i).value;
  }
}

var nomeSquadra1;
var nomeSquadra2;

function formaSquadre() {
  creaNomiSquadre();

  document.getElementById("nomeSquadra1").innerText = nomeSquadra1;
  document.getElementById("nomeSquadra2").innerText = nomeSquadra2;
}

function creaNomiSquadre() {
  for (let i = 0; i < 5; i++) {
    if (nomiGiocatori[i] == "") {
      nomiGiocatori[i] = "gioc" + (i + 1);
    }
  }

  nomeSquadra1 =
    nomiGiocatori[0].substr(0, 5) + " - " + nomiGiocatori[1].substr(0, 5);
  nomeSquadra2 =
    nomiGiocatori[2].substr(0, 5) + " - " + nomiGiocatori[3].substr(0, 5);
}

function combinaNomi() {}

var punteggioVittorieSquadra1 = document.getElementById("punteggioSquadra1");
var punteggioVittorieSquadra2 = document.getElementById("punteggioSquadra2");

var bottoneIncrementaSquadra1 = document.getElementById("incrementaSquadra1");
var bottoneDecrementaSquadra1 = document.getElementById("decrementaSquadra1");

var bottoneIncrementaSquadra2 = document.getElementById("incrementaSquadra2");
var bottoneDecrementaSquadra2 = document.getElementById("decrementaSquadra2");

var puntiSquadra1 = 0;
var puntiSquadra2 = 0;

var vittorieSquadra1 = 0;
var vittorieSquadra2 = 0;

var numeroPartitaCorrente = 1;

bottoneIncrementaSquadra1.addEventListener("click", () => {
  if (!isBriscola()) {
    if (puntiSquadra1 < 2) {
      puntiSquadra1++;
      assegnaPuntiSquadra1();
      return;
    }

    if (puntiSquadra1 == 2 && confirm("Ha vinto " + nomeSquadra1)) {
        assegnaVittoriaSquadra1();
        controllaVincitore()
        azzeraPunti();
        assegnaPuntiSquadra1();
        assegnaPuntiSquadra2();
    }
  } else {
    if(puntiSquadra1 < 40){
        puntiSquadra1++;
        assegnaPuntiSquadra1();
        return;
    }

    if(puntiSquadra1 == 40 && confirm("Ha vinto " + nomeSquadra1)) {
        assegnaVittoriaSquadra1();
        controllaVincitore()
        azzeraPunti();
        assegnaPuntiSquadra1();
        assegnaPuntiSquadra2();
    }
  }
});

bottoneDecrementaSquadra1.addEventListener("click", () => {
  if (puntiSquadra1 >= 1) {
    puntiSquadra1--;
    assegnaPuntiSquadra1();
  }
});

bottoneIncrementaSquadra2.addEventListener("click", () => {
    if(!isBriscola()){
  if (puntiSquadra2 < 2) {
    puntiSquadra2++;
    assegnaPuntiSquadra2();
    return
  }

  if (puntiSquadra2 == 2 && confirm("Ha vinto " + nomeSquadra2)) {
    assegnaVittoriaSquadra2();
    controllaVincitore()
    azzeraPunti();
    assegnaPuntiSquadra1();
    assegnaPuntiSquadra2();
  }
} else {
    if(puntiSquadra2 < 40){
        puntiSquadra2++;
        assegnaPuntiSquadra2();
        return;
    }

    if(puntiSquadra2 == 40 && confirm("Ha vinto " + nomeSquadra2)) {
        assegnaVittoriaSquadra2();
        controllaVincitore()
        azzeraPunti();
        assegnaPuntiSquadra1();
        assegnaPuntiSquadra2();
    }
  }
});

bottoneDecrementaSquadra2.addEventListener("click", () => {
  if (puntiSquadra2 >= 1) {
    puntiSquadra2--;
    assegnaPuntiSquadra2();
  }
});

function isBriscola() {
  return numeroPartitaCorrente % 2 == 0;
}

function assegnaPuntiSquadra1() {
  document.getElementById("puntiSquadra1").innerText = puntiSquadra1;
}

function assegnaPuntiSquadra2() {
  document.getElementById("puntiSquadra2").innerText = puntiSquadra2;
}

function assegnaVittoriaSquadra1() {
    document.getElementById("punteggioSquadra1").innerText = ++vittorieSquadra1;
}

function assegnaVittoriaSquadra2() {
    document.getElementById("punteggioSquadra2").innerText = ++vittorieSquadra2;
}

function azzeraPunti() {
    puntiSquadra1 = 0;
    puntiSquadra2 = 0;
}

const nomeGioco = document.getElementById("nomeGioco");
function controllaVincitore() {
    if(vittorieSquadra1 < 2 && vittorieSquadra2 < 2){
        numeroPartitaCorrente++;
        if(isBriscola()){
            nomeGioco.innerText = "TRESETTE";
        }
        else{
            nomeGioco.innerText ="BRISCOLA";
        }
    } else if( vittorieSquadra1 == 2) {
        alert("Ha vinto " + nomeSquadra1);
        location.reload();
    } else {
        alert("Ha vinto " + nomeSquadra2);
        location.reload();
    }
}
