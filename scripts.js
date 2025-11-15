const telaInicio = document.getElementById('tela-inicio')
const telaComo = document.getElementById('tela-como')
const telaJogo = document.getElementById('tela-jogo')
const popupFinal = document.getElementById('popup-final')

const btnIniciar = document.getElementById('btnIniciar')
const btnComo = document.getElementById('btnComo')
const btnFecharComo = document.getElementById('btnFecharComo')
const btnReiniciar = document.getElementById('btnReiniciar')
const btnVoltar = document.getElementById('btnVoltar')

const tabuleiro = document.getElementById('tabuleiro')
const vezEl = document.getElementById('vezJogador')
const textoFinal = document.getElementById('texto-final')
const placar1 = document.getElementById('placar1')
const placar2 = document.getElementById('placar2')

let pontos1 = 0
let pontos2 = 0
let botoes = []
let vez = 1

const vitorias = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]

btnIniciar.onclick = () => {
  telaInicio.classList.remove('ativa')
  telaJogo.classList.add('ativa')
  iniciar()
}

btnComo.onclick = () => telaComo.classList.add('ativo')
btnFecharComo.onclick = () => telaComo.classList.remove('ativo')

btnReiniciar.onclick = () => {
  popupFinal.classList.remove('ativo')
  iniciar()
}

btnVoltar.onclick = () => {
  pontos1 = 0
  pontos2 = 0
  placar1.textContent = pontos1
  placar2.textContent = pontos2
  popupFinal.classList.remove('ativo')
  telaJogo.classList.remove('ativa')
  telaInicio.classList.add('ativa')
}

function iniciar(){
  tabuleiro.innerHTML = ''
  botoes = []
  vez = 1
  vezEl.textContent = 1

  for(let i=0;i<9;i++){
    const li = document.createElement('li')
    const btn = document.createElement('button')
    btn.dataset.pos = i
    btn.onclick = jogar
    li.appendChild(btn)
    tabuleiro.appendChild(li)
    botoes.push(btn)
  }
}

function jogar(e){
  const btn = e.target
  if(btn.innerText !== '') return

  btn.innerText = vez === 1 ? 'X' : 'O'

  if(verificar()){
    if(vez === 1) pontos1++
    else pontos2++
    placar1.textContent = pontos1
    placar2.textContent = pontos2
    finalizar('Jogador ' + vez + ' venceu')
  }
  else if(empate()){
    finalizar('Empate')
  }
  else{
    vez = vez === 1 ? 2 : 1
    vezEl.textContent = vez
  }
}

function verificar(){
  return vitorias.some(v => {
    const [a,b,c] = v
    return botoes[a].innerText &&
           botoes[a].innerText === botoes[b].innerText &&
           botoes[b].innerText === botoes[c].innerText
  })
}

function empate(){
  return botoes.every(b => b.innerText !== '')
}

function finalizar(msg){
  botoes.forEach(b => b.disabled = true)
  textoFinal.textContent = msg
  popupFinal.classList.add('ativo')
}