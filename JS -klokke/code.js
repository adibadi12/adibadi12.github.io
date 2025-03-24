function oppdaterTid() {
    let tid = new Date();
    let dag = tid.getDate();
    let måned = tid.getMonth() + 1; // Månedene er 0-indeksert, så vi legger til 1.
    let år = tid.getFullYear();
    let timer = tid.getHours();
    let minutter = tid.getMinutes();
    let sekunder = tid.getSeconds();

    // Sørg for at timer, minutter og sekunder alltid har to siffer
    if (timer < 10) timer = '0' + timer;
    if (minutter < 10) minutter = '0' + minutter;
    if (sekunder < 10) sekunder = '0' + sekunder;

    // Formatering av dato og tid
    let formaterTid = dag + "/" + måned + "/" + år + " " + timer + ":" + minutter + ":" + sekunder;

    // Oppdater utskriften
    document.getElementById("utskrift").innerText = formaterTid;
}

// Kjør funksjonen en gang i sekundet for å oppdatere tiden
setInterval(oppdaterTid, 1000);