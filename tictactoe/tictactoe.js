const gameId    = "#ttt";
const player1   = "X";
const player2   = "O";
const winCombos = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

let player = player1;
let board  = {};
let cells;

window.addEventListener( "load", () => {
    cells = document.querySelectorAll( gameId + " .main .game td" );

    for ( let i = 0; i < cells.length; i++ ) {
        cells[i].innerText = "";
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener( "click", turnClick, false );
    }

    document.querySelector( gameId + " button.reset" ).addEventListener( "click", reset, false );
} );

function turnClick(square) {
    if ( square.target.innerText == "" ) {
        square.srcElement.innerText = player;
        board[ square.srcElement.className ] = player;

        if ( Object.keys(board).length >= 5 ) {

            for ( let i = 0; i < winCombos.length; i++ ) {
                if (
                    board[ "cell_" + winCombos[i][0] ] == player &&
                    board[ "cell_" + winCombos[i][1] ] == player &&
                    board[ "cell_" + winCombos[i][2] ] == player
                ) {
                    gameOver( winCombos[i] );
                    return;
                }
            }

            if ( Object.keys(board).length >= 9 ) {

                for ( let i = 0; i < cells.length; i++) {
                    document.querySelector( gameId + " .cell_" + i ).style.backgroundColor = "#0c0";
                }

                document.querySelector( gameId + " .endgame" ).style.display = "block";
                document.querySelector( gameId + " .restart" ).style.display = "block";
                document.querySelector( gameId + " .endgame" ).innerHTML     = "Tie";
            }
        }

        player = ( player == player1 ) ? player2 : player1;
        document.querySelector( gameId + " .player" ).innerHTML = player;
    }
}

function gameOver(winCombo) {
    for ( let i = 0; i < winCombo.length; i++ ) {
        document.querySelector( gameId + " .cell_" + winCombo[i] ).style
                .backgroundColor = ( player == player1 ) ? "#09f" : "#f00" ;
    }

    document.querySelector( gameId + " .endgame" ).style.display = "block";
    document.querySelector( gameId + " .restart" ).style.display = "block";
    document.querySelector( gameId + " .endgame" ).innerHTML     = player + " Wins!";

    for ( let i = 0; i < cells.length; i++ ) {
        cells[i].removeEventListener( "click", turnClick, false );
    }
}

function reset() {
    document.querySelector( gameId + " .endgame" ).style.display = "none";
    document.querySelector( gameId + " .restart" ).style.display = "none";

    player = player1;
    document.querySelector( gameId + " .player" ).innerHTML = player;
    board = {};

    for ( let i = 0; i < cells.length; i++ ) {
        cells[i].innerText = "";
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener( "click", turnClick, false );
    }
}
