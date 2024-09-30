const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const startButton = document.querySelector('.start');
const gameOverScreen = document.querySelector('.game-over');

const audioStart = new Audio('./soung/audio_theme.mp3');
const audioGameover = new Audio('./soung/audio_gameover.mp3');

const startGame = () => {
    pipe.classList.add('pipe-animation');
    startButton.style.display = 'none';
    gameOverScreen.style.display = 'none';  // Esconder a tela de game over

    // Áudio
    audioStart.play();
}

const restartGame = () => {
    gameOverScreen.style.display = 'none';
    pipe.style.animation = 'pipe-animation 1.5s infinite linear';  // Reinicia a animação do pipe
    pipe.style.left = '';  // Reseta a posição do pipe

    mario.src = './img/mario.gif';
    mario.style.width = '150px';
    mario.style.bottom = '0';  // Reseta a posição do Mario

    // Reiniciar áudio
    audioGameover.pause();
    audioGameover.currentTime = 0;
    audioStart.play();
    audioStart.currentTime = 0;
}

// Função de pulo
const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

// Colisão
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // Verifica a colisão
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        // Parar música do jogo e tocar música de game over
        audioStart.pause();
        audioGameover.play();

        // Mostrar tela de game over
        gameOverScreen.style.display = 'flex';

        clearInterval(loop);  // Para o loop quando a colisão ocorre
    }
}, 10);

document.addEventListener('keypress', e => {
    const tecla = e.key;
    if (tecla === 'Enter') {
        startGame();
    }
});

document.addEventListener('keypress', jump);
