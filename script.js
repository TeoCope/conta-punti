const home = document.getElementById('home');
const formaSquadre = document.getElementById('formFormaSquadre');

var bottoneGioca = document.getElementById('gioca');

bottoneGioca.addEventListener('click',function() {
    displayNone(home);
    displayFlex(formaSquadre);
});

function displayNone(elemento){
    elemento.style.display="none";
}

function displayFlex(elemento){
    elemento.style.display="flex";
}

