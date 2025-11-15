var main = document.getElementById('main');
var botoes = [];
var vezdox = true;

const vitorias = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
];

var titulo = document.createElement('h1');
titulo.innerText = "Jogo da Velha";
main.appendChild(titulo);

var textoVez = document.createElement("h2");
textoVez.id = "textoVez";
textoVez.classList.add("esconder");
main.appendChild(textoVez);

var inicio = document.createElement('button');
inicio.innerText = "Iniciar Jogo";
main.appendChild(inicio);

var ul = document.createElement('ul');
ul.id = "tabuleiro";
main.appendChild(ul);

// Botões de ação
var btnReiniciar = document.createElement('button');
btnReiniciar.id = "btnReiniciar";
btnReiniciar.innerText = "Reiniciar Jogo";

var btnVoltar = document.createElement('button');
btnVoltar.id = "btnVoltar";
btnVoltar.innerText = "Voltar ao Início";

// Container para os botões de ação
var containerBotoes = document.createElement("div");
containerBotoes.id = "botoesAcao";
containerBotoes.classList.add("esconder");
containerBotoes.appendChild(btnReiniciar);
containerBotoes.appendChild(btnVoltar);
main.appendChild(containerBotoes);

inicio.addEventListener('click', () => { 
    inicio.classList.add('esconder');
    textoVez.classList.remove("esconder");
    textoVez.innerText = "Vez do Jogador 1";

    for (var i = 0; i < 9; i++) {
        var li = document.createElement('li');
        var botao = document.createElement('button');
        botao.id = i;
        li.appendChild(botao);
        ul.appendChild(li);

        botoes.push(botao);

        botao.addEventListener('click', (e) => {
            if (e.target.innerText !== "") return;

            e.target.innerText = vezdox ? "X" : "O";
            vezdox = !vezdox;  
            textoVez.innerText = "Vez do Jogador " + (vezdox ? "1" : "2");

            if (checaVitorias()) {
                textoVez.innerText = "Vitória do Jogador " + (vezdox ? "1" : "2");
                congelarBotoes();
                containerBotoes.classList.remove("esconder");
            } else if(checaEmpate()){
                textoVez.innerText = "Deu velha!";
                congelarBotoes();
                containerBotoes.classList.remove("esconder");
            }
        });
    }
});

function checaVitorias() { 
    for (let array of vitorias) {
        let [a, b, c] = array;
        let v1 = botoes[a].innerText;
        let v2 = botoes[b].innerText;
        let v3 = botoes[c].innerText;

        if (v1 !== "" && v1 === v2 && v1 === v3) {
            return true;
        }
    }
    return false;
}

function checaEmpate() { 
    for (let botao of botoes) {
        if(botao.innerText === ""){
            return false;
        }
    }
    return true;
}

function congelarBotoes() {
    botoes.forEach(btn => btn.disabled = true);
}

btnReiniciar.addEventListener('click', () => {
    reiniciar();
    containerBotoes.classList.add("esconder");
    textoVez.classList.remove("esconder");
    textoVez.innerText = "Vez do Jogador 1";
});

btnVoltar.addEventListener('click', () => {
    voltar();
    containerBotoes.classList.add("esconder");
    textoVez.classList.add("esconder");
});

function reiniciar(){
    botoes.forEach(btn => {
        btn.disabled = false;
        btn.innerText = "";
    });
    vezdox = true;
}

function voltar(){
    inicio.classList.remove('esconder');
    botoes = [];
    ul.innerText = "";
    vezdox = true;
}
