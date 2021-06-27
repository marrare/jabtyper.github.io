$(document).ready(() => {
    let db;
    const request = window.indexedDB.open("jabtyper", 2);

    const frases = [
        { dificuldade: 1, frase: "Testando isso aqui" },
        { dificuldade: 2, frase: "Eu nem concordo nem discordo, muito pelo contrário" },
        { dificuldade: 3, frase: "Eu nem concordo nem discordo, muito pelo contrário..." }
    ];

    request.onupgradeneeded = (event) => {
        console.log("database updated");
        db = event.target.result;

        var fraseStore = db.createObjectStore("frases", { autoIncrement : true });
        var pontuacaoStore = db.createObjectStore("pontuacoes", { autoIncrement : true });

        fraseStore.transaction.oncomplete = function(event) {
            var clientesObjectStore = db.transaction("frases", "readwrite").objectStore("frases");
            for (var i in frases) {
                clientesObjectStore.add(frases[i]);
            }
        }
    };
    request.onsuccess = (e) => {
        console.log("database conected");
        db = e.target.result;
        getAllFrases();
    }
    request.onerror = (e) => console.log(e.target.error);

    function getAllFrases() {
        const fraseStore = db.transaction(["frases"]).objectStore("frases");
        const requestFrases = fraseStore.getAll();

        requestFrases.onsuccess = function(event) {
            event.target.result.map((frase) => {
                
            })
        };
    }
})