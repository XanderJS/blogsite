const gameId = "#chess";

let square;
let player = "white";
let cells  = document.querySelectorAll( gameId + " .board td" );

window.addEventListener( "load", () => {
    for ( let i = 0; i < cells.length; i++ ) {
        cells[i].addEventListener( "click", turns );
    }
    document.querySelector( gameId + " button.reset" ).addEventListener( "click", reset );
} );

function turns(object) {
    let target = ( object.target.parentNode.tagName == "TD" ) ? object.target.parentNode : object.target;

    if ( target.firstChild && target.firstChild.classList.contains(player) ) {
        if (square) {
            square.classList.remove("selected");
            for ( let i = 0; i < cells.length; i++ ) {
                cells[i].removeEventListener( "click", turn );
            }
        }
        square = target;
        square.classList.add("selected");
        for ( let i = 0; i < cells.length; i++ ) {
            cells[i].addEventListener( "click", turn );
        }
    }
}

function turn(object) {
    let place = ( object.target.parentNode.tagName == "TD" ) ? object.target.parentNode : object.target;
    target    = document.querySelector( gameId + " .board .selected div" );

    if ( place.firstChild && place.firstChild.classList != null ) {
        place.removeChild(place.childNodes[0]);
        place.appendChild(target);
    }
    else {
        place.appendChild(target);
    }

    player = ( player == "white" ) ? "black" : "white";

    for ( let i = 0; i < cells.length; i++ ) {
        cells[i].removeEventListener( "click", turn );
    }
}

function reset() {
    location.reload();
}
