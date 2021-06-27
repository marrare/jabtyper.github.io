let db;
const request = window.indexedDB.open("jabtyper", 2);

const frases = [
    { dificuldade: 1, frase: "Água mole, pedra dura tanto bate até que fura." },
    { dificuldade: 1, frase: "Tudo, antes de ser fácil, é difícil." },
    { dificuldade: 1, frase: "Velhas convicções não levam a um novo lugar." },
    { dificuldade: 2, frase: "Se você não sabe aonde quer chegar, nenhum vento lhe é favorável." },
    { dificuldade: 2, frase: "Tem coisas que dão medo, mas não são perigosas, assim como tem coisas que são perigosas, mas não dão medo." },
    { dificuldade: 2, frase: "Nada é mais fugaz do que a forma exterior, sua aparência muda como as flores do campo." },
    { dificuldade: 3, frase: "Ela é de gêmeos, é mutável regida por Mercúrio. Ela é curiosa, loquaz, volátil, e adaptável como uma camaleoa. Rotina não é sua praia, aliás, ela também não gosta de praia." },
    { dificuldade: 3, frase: "Entre um estimulo e uma resposta há um espaço, nesse espaço reside a nossa liberdade, e o nosso poder para escolher uma resposta, nessa resposta reside o potencial do nosso crescimento e bem estar." },
    { dificuldade: 3, frase: "Sabendo o que sei e sabendo o que sabes e o que não sabes e o que não sabemos, ambos saberemos se somos sábios, sabidos ou simplesmente saberemos se somos sabedores." }
];

request.onupgradeneeded = (event) => {
    console.log("database updated");
    db = event.target.result;

    let fraseStore = db.createObjectStore("frases", { autoIncrement : true });
    let pontuacaoStore = db.createObjectStore("pontuacoes", { autoIncrement : true });

    fraseStore.transaction.oncomplete = function(event) {
        let frasesObjectStore = db.transaction("frases", "readwrite").objectStore("frases");
        for (var i in frases) {
            frasesObjectStore.add(frases[i]);
        }
    }
};

request.onsuccess = (e) => {
    console.log("database conected");
    db = e.target.result;
}
request.onerror = (e) => console.log(e.target.error);

function getAllFrases() {
    return new Promise((resolve, reject) => {
        const fraseStore = db.transaction(["frases"]).objectStore("frases");
        const requestFrases = fraseStore.getAll();

        requestFrases.onsuccess = function(event) {
            resolve(event.target.result);
        }
    });
}

function insertPontuacao(pontuacao) {
    return new Promise((resolve, reject) => {
        const pontuacoesObjectStore = db.transaction("pontuacoes", "readwrite").objectStore("pontuacoes");
        pontuacoesObjectStore.add(pontuacao);
    });
}

function getAllPontuacoes() {
    return new Promise((resolve, reject) => {
        const pontuacoesObjectStore = db.transaction(["pontuacoes"]).objectStore("pontuacoes");
        const requestPontuacoes = pontuacoesObjectStore.getAll();

        requestPontuacoes.onsuccess = function(event) {
            resolve(event.target.result);
        }
    });
}