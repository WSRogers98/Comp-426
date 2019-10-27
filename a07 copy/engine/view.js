import Game from "./game.js"

export const newGame = function (game) {
    const $root = $('#root');
    let gamestate=``;
    let restart=`  <button type="button" class="restart">Restart</button>`
    let spoopy=`<p>Want a spooky thought? Imagine KMP with hair.</p>`;
    let gameBox=`<div class="gameBox">`;
    for(let i=0; i<game.fullSize; i++){
        gameBox+=`<div class="piece">${game.gameState.board[i]}</div>`
    }
    let score= `<div class="score">Current Score: ${game.gameState.score}</div>`
    if(game.gameState.won==true){
        gamestate=`the game is won!`
    }
    if(game.gameState.over==true){
        gamestate=`the game is over`
    }

    $root.html(game)
    $root.append(score)
    $root.append(gameBox)
    $root.append(restart)
    $root.append(spoopy)
}

$(function(){
    let game = new Game(4);
    newGame(game); 
    $(document).on('keydown', function(p) {
        p.preventDefault();
        if (p.keyCode == '38') {
            game.move('up');
        }
        if (p.keyCode == '40') {
            game.move('down');
        }
        if (p.keyCode == '37') {
            game.move('left');
        }
        if (p.keyCode == '39') {
            game.move('right');
        }
        const $root = $('#root');
        let gamestate=``;
        let restart=`  <button type="button" id="restart">Restart</button>`
        let spoopy=`<p>Want a spooky thought? Imagine KMP with hair.</p>`;
        let gameBox=`<div class="gameBox">`;
        for(let i=0; i<game.fullSize; i++){
            gameBox+=`<div class="piece">${game.gameState.board[i]}</div>`
        }
        let score= `<div class="score">Current Score: ${game.gameState.score}</div>`
        if(game.gameState.won==true){
            gamestate=`<div class="gameWon">You won the game!</div>`
        }
        if(game.gameState.over==true){
            gamestate=`<h3 class="gameLost">The game is over, you lose!</h3>`
        }

        $(document).on('click',`#restart`,function(){
            //this was a good meme
            game.setupNewGame();

        const $root = $('#root');
        let gamestate=``;
        let restart=`  <button type="button" id="restart">Restart</button>`
        let spoopy=`<p>Want a spooky thought? Imagine KMP with hair.</p>`;
        let gameBox=`<div class="gameBox">`;
        for(let i=0; i<game.fullSize; i++){
            gameBox+=`<div class="piece">${game.gameState.board[i]}</div>`
        }
        let score= `<div class="score">Current Score: ${game.gameState.score}</div>`
        if(game.gameState.won==true){
            gamestate=`<div class="gameWon">You won the game!</div>`
        }
        if(game.gameState.over==true){
            gamestate=`<h3 class="gameLost">The game is over, you lose!</h3>`
        }
            $root.html(game)
            $root.append(score)
            $root.append(gameBox)
            $root.append(restart)
            $root.append(spoopy)
            $root.append(gamestate)
        });
        $root.html(game)
        $root.append(score)
        $root.append(gameBox)
        $root.append(restart)
        $root.append(spoopy)
        $root.append(gamestate)
        
    });
});