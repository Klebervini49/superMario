/**
 * Dev: Kleberson
 * - Recriando Super Mario -
 * Projeto sem fins lucrativos
 */

/* Variaveis gerais*/
let mscVolume = (document.querySelector('#modelStart audio').volume = 0.15);
let mscIniciar = document.querySelectorAll('.pararIniciar');
let mscTexto = document.querySelectorAll('.stopPlay');

let porcentagemCarregamentoInt = 0;

//config
function config() {
    document.querySelector('.config').addEventListener('click', () => {
        document.querySelector('.configInicio').style.display = 'flex';
    });
}
config();

function fecharModal() {
    document.querySelector('.fechar').addEventListener('click', () => {
        document.querySelector('.configInicio').style.display = 'none';
    });
}
fecharModal();
/* Tela de Start */

/**
 * Entrando com click
 */
function startGame(e) {
    document.documentElement.requestFullscreen();
    setTimeout(() => {
        document.querySelector('#modelStart').style.display = 'none';
    }, 200);
    setInterval(() => {
        if (porcentagemCarregamentoInt < 100) {
            porcentagemCarregamentoInt += 1;
            document
                .querySelector('.progressBar')
                .setAttribute('value', porcentagemCarregamentoInt);
            document.querySelector(
                '.totalProgress',
            ).innerText = `${porcentagemCarregamentoInt}%`;
        }
        if (porcentagemCarregamentoInt >= 100) {
            setTimeout(() => {
                document.querySelector('.loadingScreen').style.display = 'none';
                document.querySelector('#modelStart audio').pause();
            }, 2000);
        }
    }, 30);
}

/**
 * Entrando com Enter
 */
function startGameEnter(e) {
    if (e.key === 'Enter') {
        document.documentElement.requestFullscreen();
        setTimeout(() => {
            document.querySelector('#modelStart').style.display = 'none';
        }, 200);

        setInterval(() => {
            if (porcentagemCarregamentoInt < 100) {
                porcentagemCarregamentoInt += 1;
                document
                    .querySelector('.progressBar')
                    .setAttribute('value', porcentagemCarregamentoInt);
                document.querySelector(
                    '.totalProgress',
                ).innerText = `${porcentagemCarregamentoInt}%`;
            } else {
                document.querySelector('.loadingScreen').style.display = 'none';
                document.querySelector('#modelStart audio').pause();
            }
        }, 30);
    }
}

/* MUSIC */

function startStopMusic() {
    if (
        document
            .querySelectorAll('.pararIniciar span')[0]
            .classList.contains('parado') ||
        document
            .querySelectorAll('.pararIniciar span')[1]
            .classList.contains('parado')
    ) {
        document.querySelector('#modelStart audio').play();

        mscIniciar.forEach((i1) => {
            i1.querySelector('span').classList.remove('parado');
            i1.querySelector('span').classList.add('ouvindo');
        });
        mscTexto.forEach((i2) => {
            i2.innerText = 'Pausar Música';
        });
    } else if (
        document
            .querySelectorAll('.pararIniciar span')[0]
            .classList.contains('ouvindo') ||
        document
            .querySelectorAll('.pararIniciar span')[1]
            .classList.contains('ouvindo')
    ) {
        document.querySelector('#modelStart audio').pause();

        mscIniciar.forEach((i3) => {
            i3.querySelector('span').classList.add('parado');
            i3.querySelector('span').classList.remove('ouvindo');
        });

        mscTexto.forEach((i4) => {
            i4.innerText = 'Iniciar Música';
        });
    }
}

document
    .querySelectorAll('.pararIniciar')[0]
    .addEventListener('click', startStopMusic);
document
    .querySelectorAll('.pararIniciar')[1]
    .addEventListener('click', startStopMusic);

document.querySelector('#startButton').addEventListener('click', startGame);
window.addEventListener('keydown', startGameEnter);

/* Game */
let todasImagens = document.querySelectorAll('img');
todasImagens.forEach((item) => {
    item.setAttribute('draggable', false);
});

// nome vidas e dificuldade
function defaultConfigs() {
    if (!localStorage.configs) {
        let configsInicio = {
            nome_player: 'Mario',
            vidas_player: 3,
            dificuldade_player: 'Médio',
        };

        localStorage.configs = JSON.stringify(configsInicio);
    }
    infos = JSON.parse(localStorage.configs);
    document.querySelector('.nome').value = infos.nome_player;
    document.querySelector('.vidas').value = infos.vidas_player;
    document.querySelector('.dificuldade').value = infos.dificuldade_player;
    document.querySelector('.name_player').innerText = infos.nome_player;
}
defaultConfigs();

function trocarConfig() {
    document.querySelector('button').addEventListener('click', (e) => {
        e.preventDefault();
        let nome = document.querySelector('.nome').value,
            vidas = document.querySelector('.vidas').value,
            dificuldade = document.querySelector('.dificuldade').value;

        vidas = parseInt(vidas);
        if (vidas > 3 || nome === '') {
            alert(
                'Nome não digitado ou número máximo de vidas ultrapassado(3)',
            );
        } else {
            let configsInicio = {
                nome_player: nome,
                vidas_player: vidas,
                dificuldade_player: dificuldade,
            };

            localStorage.configs = JSON.stringify(configsInicio);

            infos = JSON.parse(localStorage.configs);
            document.querySelector('.name_player').innerText =
                infos.nome_player;

            alert('Salvamento completo');
        }
    });
}
trocarConfig();
