let dificuldade;
let userName;
let timer;


const loadPageGame = () => {
    dificuldade = $('input[name="dificuldade"]:checked').val();
    userName = $("#name").val();

    $("#name-valid").hide();
    $("#dificuldade-valid").hide();
    let valid = checkInputIsValid();
    if(valid) {
        $("#block-name").slideUp();
        setFrase();
        $("#block-game").slideDown(1000);
        countdownToStart();
    } else {
        $("#name-valid").show();
    }
}

const pressEnterLoadPage = (e) => {
    if(e.keyCode === 13){
        e.preventDefault();
        loadPageGame();
    }
}

const checkInputIsValid = () => {
    let valid = true;
    if(userName == "") {
        valid = false;
        $("#name-valid").show();
    }
    if(dificuldade == undefined) {
        valid = false;
        $("#dificuldade-valid").show();
    }
    return valid;
}

let countdownActual;
function countdownToStart() {
    countdownActual = 3;
    const countTimer = setInterval(() => {
        switch (countdownActual) {
            case 3:
                $("#block-count-start").show();
                $("#countThree").show();
                countdownActual = 2;
                break;
            case 2:
                $("#countThree").hide();
                $("#countTwo").show();
                countdownActual = 1;
                break;
            case 1:
                $("#countTwo").hide();
                $("#countOne").show();
                countdownActual = 0;
                break;
            case 0:
                $("#countOne").hide();
                $("#block-count-start").hide();
                $("#block-game-text").slideDown(1000);
                setTimeout(() => startTimerGamer(), 1000);
                clearInterval(countTimer);
                break;
        }
    }, 1000);
    
}

const setFrase = async () => {
    const frases = await getAllFrases();
    const frasePorDificuldade = frases.filter((frase) => { return frase.dificuldade == dificuldade; });
    const fraseSelecionada = frasePorDificuldade[Math.floor(Math.random() * frasePorDificuldade.length)];
    
    $("#frase").text(fraseSelecionada.frase);
    checarPalavras();
}

//Game
var campo = $("#digitacao");
campo.on("input", function() {
    checarPalavras();
});
function checarPalavras() {
    let fraseResposta = campo.val();
    $("#caracteres-digitados").text(fraseResposta.length);

    let palavrasBase = $("#frase").text().split(" ");
    let palavrasResposta = fraseResposta.split(" ");
    const palavrasCorretas = palavrasBase.reduce((num, palavraBase, index) => {
        return num += palavrasResposta[index] == palavraBase ? 1 : 0;
    }, 0);
    $("#palavras-digitadas").text(`${palavrasCorretas}/${palavrasBase.length}`);

    if(palavrasCorretas == palavrasBase.length) finishGame();
}

// Timer
let tempoInicial = 0; //time in miliseconds
function setTime() {
    switch (dificuldade) {
        case "1":
            tempoInicial = 300;
            break;
        case "2":
            tempoInicial = 250;
            break;
        case "3":
            tempoInicial = 200;
            break;
    }
}
function startTimerGamer() {
    setTime();
    let tempoRestante = tempoInicial;
    campo.focus();
    timer = setInterval(function() {
        let tempPercent = (tempoRestante/tempoInicial) * 100;
        $('.progress-bar').css('width', tempPercent+'%').attr('aria-valuenow', tempPercent);
        $("#tempo").text(tempoRestante/10);

        if(tempoRestante == 0) { 
            finishGame();
        } else {
            tempoRestante--;
        }
    }, 100);
}

function finishGame() {
    campo.attr("disabled",true);
    clearInterval(timer);
    sendScore();
}


//Reset
const resetGame = () => {
    $("#block-score").slideUp();
    $("#block-name").slideDown(1000);
    dificuldade = undefined;
    userName == "";
    campo.attr("disabled", false);
    $("#name").val("");
    campo.val("");
    $("#caracteres-digitados").text("0");
    $("#palavras-digitadas").text("0");
    $("#tempo").text(tempoInicial/10);
    $('.progress-bar').css('width', '100%').attr('aria-valuenow', '100');
}

//Score
async function sendScore() {
    $("#block-game").slideUp();
    $("#block-game-text").slideUp();
    $('#block-score').css('display', 'flex');
    $("#block-score").slideDown(1000);
    insertPontuacao({ userName: $("#name").val(), pontuacao: $("#palavras-digitadas").text() });
    const pontuacoes = await getAllPontuacoes();

    $("#score").html("");
    pontuacoes.map((pontuacao) => {
        $("#score").append(`<tr><td>${pontuacao.userName}</td><td>${pontuacao.pontuacao}</td></tr>`);
    });
}