document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let jogoIniciado = false;
    let intervaloJogo;
    let velocidade = 20;
    let direcao = 'direita';
    let proximaDirecao = 'direita'; 
    let pontuacao = 0;
    let cobra = [
        {x: 200, y: 200},
        {x: 180, y: 200},
        {x: 160, y: 200},
        {x: 140, y: 200}
    ];
    let maca = { x: 300, y: 300 };

    const desenharCobra = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cobra.forEach(parte => {
            ctx.fillStyle = 'green';
            ctx.fillRect(parte.x, parte.y, velocidade, velocidade);
        });
        ctx.fillStyle = 'red';
        ctx.fillRect(maca.x, maca.y, velocidade, velocidade);
    };

    const gerarNovaMaca = () => {
        maca.x = Math.floor(Math.random() * (canvas.width / velocidade)) * velocidade;
        maca.y = Math.floor(Math.random() * (canvas.height / velocidade)) * velocidade;
    };

    const moverCobra = () => {
        direcao = proximaDirecao;

        const cabeca = { x: cobra[0].x, y: cobra[0].y };

        if (direcao === 'direita') cabeca.x += velocidade;
        if (direcao === 'esquerda') cabeca.x -= velocidade;
        if (direcao === 'cima') cabeca.y -= velocidade;
        if (direcao === 'baixo') cabeca.y += velocidade;

        if (cabeca.x < 0 || cabeca.x >= canvas.width || cabeca.y < 0 || cabeca.y >= canvas.height) {
            reiniciarJogo('Game Over! A cobra colidiu com a parede.');
            return;
        }

        for (let i = 1; i < cobra.length; i++) {
            if (cabeca.x === cobra[i].x && cabeca.y === cobra[i].y) {
                reiniciarJogo('Game Over! A cobra colidiu com ela mesma.');
                return;
            }
        }

        cobra.unshift(cabeca);

        if (cabeca.x === maca.x && cabeca.y === maca.y) {
            pontuacao++;
            gerarNovaMaca();
        } else {
            cobra.pop();
        }
        desenharCobra();
    };

    const reiniciarJogo = (mensagem) => {
        alert(mensagem);
        jogoIniciado = false;
        clearInterval(intervaloJogo);
        intervaloJogo = null;
        cobra = [
            {x: 200, y: 200},
            {x: 180, y: 200},
            {x: 160, y: 200},
            {x: 140, y: 200}
        ];
        direcao = 'direita';
        proximaDirecao = 'direita'; 
        pontuacao = 0;
        desenharCobra();
    };

    const iniciarJogo = () => {
        if (!intervaloJogo) {
            jogoIniciado = true;
            intervaloJogo = setInterval(moverCobra, 100);
        }
    };

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !jogoIniciado) {
            iniciarJogo();
        }
        if ((event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') && direcao !== 'esquerda') {
            proximaDirecao = 'direita';
        }
        if ((event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') && direcao !== 'direita') {
            proximaDirecao = 'esquerda';
        }
        if ((event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') && direcao !== 'baixo') {
            proximaDirecao = 'cima';
        }
        if ((event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') && direcao !== 'cima') {
            proximaDirecao = 'baixo';
        }
    });

    desenharCobra();
});
