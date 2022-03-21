/**
 * Dev: Kleberson
 * - Recriando Super Mario -
 * Projeto sem fins lucrativos
 */
//inicio / config
let inicio_config = `<!-- config -->
<div id="config">
    <form class="configInicio">
        <h1>Configuracoes</h1>
        <div class="configCentralizado">
            <label>
                Nick:<br>
                <input type="text" maxlength="10" class="form__input nome" id="name" placeholder="Nick" required="" />
            </label>
            <label>
                Vidas:<br>
                <input type="number" min="1" max="3" class="form__input vidas" value="3" placeholder="Máximo 3" required>
            </label>
            <label>
                Dificuldade:<br>
                <select name="select" class="form__input dificuldade" required>
                    <option value="Fácil">Fácil</option>
                    <option value="Médio" selected>Médio</option>
                    <option value="Difícil">Difícil</option>
                </select>
            </label>
            <h1 class="home_nome"></h1>
            <h3 class="home_vidas"></h3>
            <h3 class="home_dificuldade"></h3>
            <button>
                <span class="button_top"> Salvar
                </span>
            </button>
        </div>

        <div class="fechar">Fechar</div>
    </form>
</div>
<!-- Tela inicio -->
<div id="modelStart">
    <div class="toggles">
        <div class="toggle-music" style="margin-right: 50px;"">
        <button class=" pararIniciar">
            <span class="stopPlay ouvindo">
                Pausar Música
            </span>
            </button>
        </div>

        <div class="config toggle-music">
            <i class="fa-solid fa-gear"></i>
        </div>
    </div>
    <audio autoplay loop>
        <source src="assets/music/8-Bit-Fantasy.mp3" type="audio/mp3">
    </audio>
    <h1 class="text-pop-up-top" style="text-align: center;"><span style="color: red;">S</span><span style="color: cyan;">u</span><span style="color: yellow;">p</span><span style="color: cyan;">e</span><span style="color: green;">r</span><br>
        <span style="color: green;">M</span><span style="color: cyan;">a</span><span style="color: yellow;">r</span><span style="color: red;">i</span><span style="color: green;">o</span>
        <span style="color: yellow;">W</span><span style="color: cyan;">o</span><span style="color: green;">r</span><span style="color: red;">l</span><span style="color: green;">d</span>
    </h1>
    <button id="startButton">START</button>
    <span style="font-size: 16px;">Or press Enter</span>
</div>`;

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
}
defaultConfigs(); // CRIANDO AS INFORMAÇÕES PRIMARIAS

function trocarConfig() {
    document.querySelector('button').addEventListener('click', (e) => {
        e.preventDefault();
        let nome = document.querySelector('.nome').value,
            vidas = document.querySelector('.vidas').value,
            dificuldade = document.querySelector('.dificuldade').value;

        vidas = parseInt(vidas);
        if (vidas > 3) {
            alert('Número máximo de vidas ultrapassado(3)');
        } else if (nome === '') {
            alert('Nick não digitado');
        } else {
            let configsInicio = {
                nome_player: nome,
                vidas_player: vidas,
                dificuldade_player: dificuldade,
            };

            localStorage.configs = JSON.stringify(configsInicio);

            infos = JSON.parse(localStorage.configs);
            vidasAtual = `${infos.vidas_player}`;
            alert('Salvamento completo');
        }
    });
}
trocarConfig(); // TROCANDO PARA AS INFORMAÇÕES ESCOLHIDAS PELO USUARIO

/* Variaveis gerais*/
let mscVolume = () =>
    (document.querySelector('#modelStart audio').volume = 0.03);
mscVolume();

let porcentagemCarregamentoInt = 0;
let coins = 0;
let vidasAtual = `${infos.vidas_player}`;

//config
function config() {
    document.querySelector('.config').addEventListener('click', () => {
        document.querySelector('.configInicio').style.display = 'flex'; //ABRINDO MODAL
    });
}
config();
function fecharModal() {
    document.querySelector('.fechar').addEventListener('click', () => {
        document.querySelector('.configInicio').style.display = 'none'; //FECHANDO MODAL
    });
}
fecharModal();

function tempoDeJogo() {
    let hora = 0;
    let minuto = 0;
    let segundo = 0;

    setInterval(() => {
        if (hora.toString().length < 2) {
            hora = `0${hora}`;
        }

        if (minuto.toString().length < 2) {
            minuto = `0${minuto}`;
        }
        if (segundo.toString().length < 2) {
            console.log(segundo);

            segundo = `0${segundo}`;
        }

        if (segundo < 59) {
            ++segundo;
        } else {
            ++minuto;
            segundo = 0;
        }
        if (minuto === 60) {
            ++hora;
            minuto = 0;
        }
        if (hora === 1) {
            alert('Você está nessa fase a uma hora, mds meu amigo');
            document.querySelector('.game').remove();
            document.body.innerHTML = inicio_config;

            mscVolume();
        }
        let inicioTimer = `${hora}:${minuto}:${segundo}`;

        document.querySelector('.time').innerText = `TIMER: ${inicioTimer}`;
    }, 1000);
}

/* TELA DE CARREGAMENTO */
function startGame() {
    // Colocando em tela cheia e iniciando carregamento
    document.documentElement.requestFullscreen();
    setTimeout(() => {
        let carregamentoTela = `
        <!-- Tela de carregamento -->
        <div class="loadingScreen">
        
            <h1 class="text-pop-up-top" style="text-align: center;"><span style="color: red;">S</span><span style="color: cyan;">u</span><span style="color: yellow;">p</span><span style="color: cyan;">e</span><span style="color: green;">r</span><br>
                <span style="color: green;">M</span><span style="color: cyan;">a</span><span style="color: yellow;">r</span><span style="color: red;">i</span><span style="color: green;">o</span>
                <span style="color: yellow;">W</span><span style="color: cyan;">o</span><span style="color: green;">r</span><span style="color: red;">l</span><span style="color: green;">d</span>
            </h1>
            <div>
                <progress class="progressBar" value="0" max="100">10%</progress>
                <span class="totalProgress">0%</span>
            </div>
        </div>`;

        document.querySelector('body').innerHTML = carregamentoTela;
    }, 100);

    setInterval(() => {
        if (porcentagemCarregamentoInt < 100) {
            porcentagemCarregamentoInt += 1;
            document
                .querySelector('.progressBar')
                .setAttribute('value', porcentagemCarregamentoInt);
            document.querySelector(
                '.totalProgress',
            ).innerText = `${porcentagemCarregamentoInt}%`;

            if (porcentagemCarregamentoInt >= 100) {
                let jogo = `<div class="game">
                <header class="infos">
                    <div class="lifes">
                            
                    </div>
                    <div class="coins">MOEDAS: </div>
                    <div class="level">FASE: 1</div>
                    <div class="time"></div>
                </header>
                <main class="tela">
                    
                </main>
                </div>`;

                // Iniciando o jogo
                document.querySelector('.loadingScreen').remove();
                document.querySelector('body').innerHTML = jogo;

                document.querySelector('.coins').innerText += ` ${coins}`;
                document.querySelector(
                    '.lifes',
                ).innerHTML = `${infos.nome_player.toUpperCase()} x ${vidasAtual}<div class='dificuldade' style='margin-left:0'>Dificuldade: ${
                    infos.dificuldade_player
                }</div>`;
                tempoDeJogo();

                document.querySelector('#modelStart audio').pause();
            }
        }
    }, 20);
}
function startGameEnter(e) {
    if (e.key === 'Enter') {
        startGame();
    }
}
document.querySelector('#startButton').addEventListener('click', startGame); // entrando no jogo com click
window.addEventListener('keydown', startGameEnter); // entrando no game com Enter

/* MUSIC */
function startStopMusic() {
    if (
        document
            .querySelector('.pararIniciar span')
            .classList.contains('parado')
    ) {
        document.querySelector('#modelStart audio').play();

        document.querySelector('.pararIniciar span').classList.remove('parado');
        document.querySelector('.pararIniciar span').classList.add('ouvindo');
        document.querySelector('.stopPlay').innerText = 'Pausar Música';
    } else if (
        document
            .querySelector('.pararIniciar span')
            .classList.contains('ouvindo')
    ) {
        document.querySelector('#modelStart audio').pause();

        document
            .querySelector('.pararIniciar span')
            .classList.remove('ouvindo');
        document.querySelector('.pararIniciar span').classList.add('parado');

        document.querySelector('.stopPlay').innerText = 'Iniciar Música';
    }
}
document
    .querySelector('.pararIniciar')
    .addEventListener('click', startStopMusic); // INICIANDO A FUNCÃO DE MÚSICA

/* Game */

let todasImagens = document.querySelectorAll('img');
todasImagens.forEach((item) => {
    item.setAttribute('draggable', false);
}); // DEIXANDO TODAS AS IMAGEM SEM O ARRASTAR
