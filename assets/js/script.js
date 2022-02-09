/**
 * Dev: Kleberson
 * - Recriando Super Mario -
 * Por favor, não me processa nintendo!!!!!!!!!!!
 */

document.querySelector('#modelStart audio').play()

/* Variaveis gerais*/
let mscVolume = document.querySelector('#modelStart audio').volume = 0.03
let mscIniciar = document.querySelectorAll('.pararIniciar')
let mscTexto = document.querySelectorAll('.stopPlay')

let porcentagemCarregamentoInt = 0;

/* Tela de Start */

/**
 * Entrando com click
 */
function startGame(e) {
    document.documentElement.requestFullscreen();
    setTimeout(() => {
        document.querySelector('#modelStart').style.display = 'none';
    }, 200)
    setInterval(() => {
        if (porcentagemCarregamentoInt < 100) {
            porcentagemCarregamentoInt += 1;
            document.querySelector('.progressBar').setAttribute('value', porcentagemCarregamentoInt)
            document.querySelector('.totalProgress').innerText = `${porcentagemCarregamentoInt}%`
        }
        if (porcentagemCarregamentoInt >= 100) {
            setTimeout(() => {
                document.querySelector('.loadingScreen').style.display = 'none';
                document.querySelector('#modelStart audio').pause()
            }, 2000)
        }
    }, 30)
};

/**
 * Entrando com Enter
 */
function startGameEnter(e) {
    if (e.key === 'Enter') {
        document.documentElement.requestFullscreen();
        setTimeout(() => {
            document.querySelector('#modelStart').style.display = 'none';
        }, 200)

        setInterval(() => {
            if (porcentagemCarregamentoInt < 100) {
                porcentagemCarregamentoInt += 1;
                document.querySelector('.progressBar').setAttribute('value', porcentagemCarregamentoInt)
                document.querySelector('.totalProgress').innerText = `${porcentagemCarregamentoInt}%`
            } else {
                document.querySelector('.loadingScreen').style.display = 'none';
                document.querySelector('#modelStart audio').pause()
            }
        }, 30)
    };
};

/* MUSIC */

function startStopMusic() {
    if (document.querySelectorAll('.pararIniciar span')[0].classList.contains('parado') ||
        document.querySelectorAll('.pararIniciar span')[1].classList.contains('parado')) {

        document.querySelector('#modelStart audio').play()

        mscIniciar.forEach((i1) => {
            i1.querySelector('span').classList.remove('parado')
            i1.querySelector('span').classList.add('ouvindo')
        })
        mscTexto.forEach((i2) => {
            i2.innerText = 'Pausar Música'
        })

    } else if (document.querySelectorAll('.pararIniciar span')[0].classList.contains('ouvindo') ||
        document.querySelectorAll('.pararIniciar span')[1].classList.contains('ouvindo')) {

        document.querySelector('#modelStart audio').pause()

        mscIniciar.forEach((i3) => {
            i3.querySelector('span').classList.add('parado')
            i3.querySelector('span').classList.remove('ouvindo')
        })

        mscTexto.forEach((i4) => {
            i4.innerText = 'Iniciar Música'
        })
    }
}

document.querySelectorAll('.pararIniciar')[0].addEventListener('click', startStopMusic)
document.querySelectorAll('.pararIniciar')[1].addEventListener('click', startStopMusic)

document.querySelector('#startButton').addEventListener('click', startGame);
window.addEventListener('keydown', startGameEnter);

/* Game */
let todasImagens = document.querySelectorAll('img');
todasImagens.forEach((item) => {
    item.setAttribute('draggable', false);
});
