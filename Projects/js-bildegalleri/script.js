let bilde = document.getElementById("bilde");

let bildeGalleri = [
    "lillypads.jpg",
    "ogle.jpg",
    "snake.jpg",
    "germanlandscape.jpg"
];

//bilde.src = "bilder/" + bildeGalleri[0];

let activePic = 0;
bilde.src = "bilder/" + bildeGalleri[activePic];

setInterval(skiftBilde, 5000)

function skiftBilde() {
    activePic = activePic + 1;
    if (activePic > bildeGalleri.length-1) { //skjekker om jeg kommer uterfor arrayen, altså ikke noe bilde
        activePic = 0;
        
    } else {
        
    }
    bilde.src = "bilder/" + bildeGalleri[activePic];
}