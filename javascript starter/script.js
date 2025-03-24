console.log("Adibadi er en ekte G");
alert("HEISANN, ER DU VELKOMMEN HER?");
// black attack in a shack and a smack with a snack doing crack you allways lack your moms got a rack

//spør etter navner til besøkende og skriv ut.
let brukernavn = prompt("Hei, hva heter du da lille venn? :)");
console.log(brukernavn);
document.getElementById("utskrift").innerText = "Hei, lille " + brukernavn;
let hobbyer = prompt("Si hva du liker å gjøre på fritiden, ELLERS...");
document.getElementById("hobby").innerText = "Jeg liker " + hobbyer + ". Oi oi oi, det høres kjekt ut!"

// Select the button and the paragraph where the secret message is stored
const Hemmelig = document.getElementById("Hemmelig");
const melding = document.getElementById("melding");

// Add an event listener for when the button is clicked
Hemmelig.addEventListener("click", function() {
    // Toggle visibility of the secret message
    if (melding.style.display === "none") {
        melding.style.display = "block";
        Hemmelig.textContent = "Jeg er skuffet";  // Change button text
    } else {
        melding.style.display = "none";
        Hemmelig.textContent = "IKKE TRYKK MED MINDRE DU ER FORBERET PÅ ALT!";  // Reset button text
    }
});

let birthday = prompt("Når ble du født?");
let alder = Date.getFullYear - birthday;
document.getElementById("burth").innerText = "Du er " + alder + " år gammel";

let dato = new Date();
console.log(dato);

//vi spør hva fav farge er 
let color = prompt("Favorite-Color");
document.body.style.backgroundColor = color;


