const loadPageGame = () => {
    let nameValid = checkNameIsValid();
    if(nameValid) {
        $("#block-name").slideUp();
        $("#block-game").slideDown(1000);
        $("#name-valid").hide();
    } else {
        $("#name-valid").show();
    }
}

const checkNameIsValid = () => {
    let name = $("#name").val();
    if(name != "") return true;
    else return false;
}

//Game
var campo = $("#digitacao");
campo.on("input", function() {
    var frase = campo.val();
    $("#caracteres-digitados").text(frase.length);

    var palavras = frase.split(" ");
    var numPalavras = palavras.reduce((num, palavra) => {
        if(palavra != "") num++;
        return num;
    }, 0);
    $("#palavras-digitadas").text(numPalavras);
});

// Timer
const tempoInicial = 15;
campo.on("focus", function() {
    let tempoRestante = tempoInicial;
    var timer = setInterval(function() {
        let tempPercent = (tempoRestante/tempoInicial) * 100;
        $('.progress-bar').css('width', tempPercent+'%').attr('aria-valuenow', tempPercent);
        $("#tempo").text(tempoRestante);

        if(tempoRestante == 0) { 
            campo.attr("disabled",true);
            clearInterval(timer);
            sendScore();
        } else {
            tempoRestante--;
        }
    }, 1000);
})

//Reset
const resetGame = () => {
    $("#block-score").slideUp();
    $("#block-name").slideDown(1000);
    
    campo.attr("disabled", false);
    $("#name").val("");
    campo.val("");
    $("#caracteres-digitados").text("0");
    $("#palavras-digitadas").text("0");
    $("#tempo").text(tempoInicial);
    $('.progress-bar').css('width', '100%').attr('aria-valuenow', '100');
}

//Score
function sendScore() {
    $("#block-game").slideUp();
    $("#block-score").slideDown(1000);

    var name = $("#name").val();
    var palavras = $("#palavras-digitadas").text();
    $("#score").append(`<tr><td>${name}</td><td>${palavras}</td></tr>`);
}