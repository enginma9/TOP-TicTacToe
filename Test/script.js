// Just made a function to save time
function createObject({ type='div', id="", classes=[]}){
    let object = document.createElement( type );
    object.setAttribute( 'id', id );
    object.classList.add( ...classes );
    console.log('Creating object: type:', type, " id:", id );
    return object;
}
function clearElement(item){
    var first = item.firstElementChild;
    while(first){
        first.remove();
        first = item.firstElementChild;
    }
}

const cosmic = 0;
const morales = 1;
const gwen = 2;
const spidey =3;

const venom = 0;
const sandman = 1;
const blackCat = 2;
const goblin = 3;

var hero = "O";
var villain = "X";
let difficulty = goblin;

function tryToPlay( id ){
    console.log( "player selecting", id );
    //slotDivs.forEach( (slot) => {
    //    slot.classList.remove("select")
    //} );
    turnOff();
    showBoard();
    slots[id] = hero;
    setTimeout( function() {
        let villainSelect; 
        
        if( difficulty == venom ){
            villainSelect = villainMiniMax({ thisBoard:slots, thisPlayer:villain, desiredDepth:4 }).index;
        }else if( difficulty == blackCat ){
            villainSelect = villainMiniMax({ thisBoard:slots, thisPlayer:villain, desiredDepth:2 }).index;
        }else if( difficulty == sandman ){
            villainSelect = villainMiniMax({ thisBoard:slots, thisPlayer:villain, desiredDepth:1 }).index;
        }else{
            villainSelect = villainRandom( slots );
        }
        printBoard();
        console.log( difficulty, "selecting", villainSelect );
        villainPlays( villainSelect );
        printBoard();
        if( winningLoop( slots, villain ) ){
            announcements.innerText = "villain won";
        }else if( winningLoop( slots, hero ) ){
            announcements.innerText = "player won";
        }else{
            showPlayable();    
        }
        
    } )
}

let slotDivs = [];
let slots = [];
const announcements = createObject({ type:"div", id:"announcements", classes:[ "announce" ] });
document.body.appendChild( announcements );
const boardDiv = createObject({ type:"div", id:"board", classes:[ "board" ] });
for(i=0;i<9;i++){
    slotDivs[i] = createObject({ type:"div", id:i, classes:[ "slot", "select" ] });
    slotDivs[i].addEventListener( "click", function(e){
        let id = e.target.id
        if( slotDivs[id].classList.contains("select") ){
            tryToPlay(id) //console.log(e)
        }
    });
    slots[i] = i;
    boardDiv.appendChild( slotDivs[i] );
}
document.body.appendChild( boardDiv );

function turnOff(){
    slotDivs.forEach( (slot) => {
        slot.classList.remove("select")
    } );
}

function setDifficulty( x ){
    difficulty = x;
}

function villainPlays( id ){
    slots[id] = villain;
    showBoard();
}   

function turnOff2(){
    for(i=0;i<9;i++){
        slotDivs[i].classList.remove("select");
    }
}
function showBoard(){
    for(i=0;i<9;i++){
        if( slots[i] != hero && slots[i] != villain ){
            slotDivs[i].classList.remove("blue");
            slotDivs[i].classList.remove("red");
            //slotDivs[i].classList.add("select");
        }else if( slots[i] == hero ){
            slotDivs[i].classList.add("blue");
        }else if( slots[i] == villain ){
            slotDivs[i].classList.add("red");
        }
    }
}
function showPlayable(){
    for(i=0;i<9;i++){
        if( slots[i] != hero && slots[i] != villain ){
            slotDivs[i].classList.remove("blue");
            slotDivs[i].classList.remove("red");
            slotDivs[i].classList.add("select");
        }else if( slots[i] == hero ){
            slotDivs[i].classList.add("blue");
        }else if( slots[i] == villain ){
            slotDivs[i].classList.add("red");
        }
    }
}
function printBoard(){
    console.log( slots[0], " | ", slots[1], " | ",  slots[2]);
    console.log( slots[3], " | ", slots[4], " | ",  slots[5]);
    console.log( slots[6], " | ", slots[7], " | ",  slots[8]);
    console.log( "end" );
}

function prepareTurn(){
    turnOff();
    showPlayable();
    printBoard();
}

const win_conditions2d = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function winningLoop( board, player ){
    let test = false;
    win_conditions2d.forEach( ( condition ) => {
        if( board[ condition[0] ] == player && board[ condition[1] ] == player && board[ condition[2] ] == player ){
            test = true; 
        } 
    });
    return test;
}

function findEmpties( board ){
    return  board.filter( slot => slot != "O" && slot != "X");
}

function rando( numberOfOptions=6 ){
    return Math.floor(Math.random()*numberOfOptions)
}

function villainRandom( board ){
    optionList = findEmpties( board );
    //console.log( optionList );
    //console.log( rando( optionList.length ) );
    return optionList[ rando( optionList.length ) ]
}

function villainMiniMax({ thisBoard, thisPlayer, desiredDepth=Infinity, currentDepth=0 }){ 
    let newDepth = currentDepth + 1;
    let availableSlots = findEmpties( thisBoard ); 
    if( winningLoop( thisBoard, hero )){    
        return { score:-10 };           
    }else if( winningLoop( thisBoard, villain )){ 
        if( currentDepth < 2 ){
            return{ score:100 };             
        }else{
            return{ score:10 };             
        }
    }else if( availableSlots.length===0 || desiredDepth === currentDepth ){  
        return { score:0 };
    }
    let moves = [];
    for( let i = 0; i < availableSlots.length; i++ ){
        let move = {};                  
        move.index = thisBoard[ availableSlots[i] ];
        thisBoard[ availableSlots[i] ] = thisPlayer;

        if( thisPlayer == villain ){
            let result = villainMiniMax({ thisBoard:[...thisBoard], thisPlayer:hero, desiredDepth:desiredDepth, currentDepth:newDepth });
            move.score = result.score;
        }else{
            let result = villainMiniMax({ thisBoard:[...thisBoard], thisPlayer:villain, desiredDepth:desiredDepth, currentDepth:newDepth });
            move.score = result.score;
        }
        thisBoard[ availableSlots[i] ] = move.index;
        moves.push( move );
    }
    let bestMove;
    if( thisPlayer = villain ){ 
        let bestScore = -10000;
        for( i = 0; i< moves.length; i++ ){
            if( moves[i].score > bestScore ){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }else{  
        let bestScore = 10000;
        for( i = 0; i< moves.length; i++ ){
            if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[ bestMove ];
}

prepareTurn();
/*
villainNextMove = villainMiniMax({ thisBoard:slots, thisPlayer:villain, desiredDepth:1 }); 
console.log( "mini3 x1 - Index:", villainNextMove.index, " Score:", villainNextMove.score );

villainNextMove = villainMiniMax({ thisBoard:slots, thisPlayer:villain, desiredDepth:2 }); 
console.log( "mini3 x2 - Index:", villainNextMove.index, " Score:", villainNextMove.score );

villainNextMove = villainMiniMax({ thisBoard:slots, thisPlayer:villain, desiredDepth:3 }); 
console.log( "mini3 x3 - Index:", villainNextMove.index, " Score:", villainNextMove.score );

villainNextMove = villainMiniMax({ thisBoard:slots, thisPlayer:villain }); 
console.log( "mini3 Infinite - Index:", villainNextMove.index, " Score:", villainNextMove.score );                    
*/
/*
slots = [ hero, 1, villain, 
        villain, 4, villain, 
        6, hero, hero 
    ];

prepareTurn();

console.log( villainRandom( slots ) );

villainNextMove = villainMiniMax({ thisBoard:slots, thisPlayer:villain, desiredDepth:1 }); 
console.log( "mini3 x1 - Index:", villainNextMove.index, " Score:", villainNextMove.score );

villainNextMove = villainMiniMax({ thisBoard:slots, thisPlayer:villain, desiredDepth:2 }); 
console.log( "mini3 x2 - Index:", villainNextMove.index, " Score:", villainNextMove.score );

villainNextMove = villainMiniMax({ thisBoard:slots, thisPlayer:villain, desiredDepth:3 }); 
console.log( "mini3 x3 - Index:", villainNextMove.index, " Score:", villainNextMove.score );

villainNextMove = villainMiniMax({ thisBoard:slots, thisPlayer:villain }); 
console.log( "mini3 Infinite - Index:", villainNextMove.index, " Score:", villainNextMove.score );     
*/