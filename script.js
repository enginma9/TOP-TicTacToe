const cosmic = 0;
const morales = 1;
const gwen = 2;
const spidey =3;

const venom = 0;
const sandman = 1;
const blackCat = 2;
const goblin = 3;

const hero = "X";
const vill = "O";

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

function createObject( type='div', id="", classes=[]){
    let object = document.createElement( type );
    object.setAttribute( 'id', id );
    object.classList.add( ...classes );
    console.log('Creating object: type:', type, " id:", id );
    return object;
}
function createLink({ text="A Link", address="https://google.com", classes=[], id="" }){
    const newLink = document.createElement( 'a' );
    if( id!=""){
        newLink.setAttribute( id );
    }
    newLink.classList.add( ...classes );
    newLink.appendChild( document.createTextNode( text ) );
    newLink.href = address;
    newLink.target = "_blank";
    newLink.rel = "noreferrer noopener";
    return newLink;
}
function appendChildren({ parent, children=[]}){
    children.forEach((child) => {
        parent.appendChild( child )
    });

}
function clearElement(item){
    var first = item.firstElementChild;
    while(first){
        first.remove();
        first = item.firstElementChild;
    }
}

function winning( board, player ){
    let test = false;
    win_conditions2d.forEach( ( condition ) => {
        if( board[ condition[0] ] == player && board[ condition[1] ] == player && board[ condition[2] ] == player ){
            test = true; 
        } 
    });
    return test;
}

class villain{
    constructor(  ){
        self.difficulty = goblin;

    }

    setDifficulty( difficulty ){
        self.difficulty = difficulty;
    }

    play( board ){
        let villainSelect; 
        
        if( this.difficulty == venom ){
            villainSelect = this.playMiniMax({ thisBoard:board, thisPlayer:vill, desiredDepth:4 }).index;
        }else if( this.difficulty == blackCat ){
            villainSelect = this.playMiniMax({ thisBoard:board, thisPlayer:vill, desiredDepth:2 }).index;
        }else if( this.difficulty == sandman ){
            villainSelect = this.playMiniMax({ thisBoard:board, thisPlayer:vill, desiredDepth:1 }).index;
        }else{
            villainSelect = this.randomPlay( board );
        }
    }



    randomPlay( board ){
        let optionList = this.findEmpties( board );
        return optionList[ rando( optionList.length ) ]
    }

    findEmpties( board ){
        return  board.filter( slot => slot != "O" && slot != "X");
    }

    playMiniMax({ thisBoard, thisPlayer, desiredDepth=Infinity, currentDepth=0 }){
        let newDepth = currentDepth + 1;
        let availableSlots = this.findEmpties( thisBoard ); 
        if( winning( thisBoard, hero )){    
            return { score:-10 };           
        }else if( winning( thisBoard, vill )){ 
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
    
            if( thisPlayer == vill ){
                let result = this.playMiniMax({ thisBoard:[...thisBoard], thisPlayer:hero, desiredDepth:desiredDepth, currentDepth:newDepth });
                move.score = result.score;
            }else{
                let result = this.playMiniMax({ thisBoard:[...thisBoard], thisPlayer:vill, desiredDepth:desiredDepth, currentDepth:newDepth });
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
    } // end playMiniMax
}





class gameTemplate {
    constructor(){
        clearElement(document.body);
        this.header = createObject( 'h1', "gameTitle", ["title", "transition-item"] );
        this.header.appendChild( document.createTextNode("Catch the Spidey - by the - Toe") );
        document.body.appendChild(this.header);
        // Communication Area
        this.promptBox = createObject( 'div', "prompt", ["transition-item"] );
        this.actionPrompt = createObject( 'span', "action-prompt", [ "transition-item"] );

        this.jonah = createObject( 'img', "jonah", ["character","hide-me", "transition-item"] );
        this.jonah.src = "img/Jonah.png";

        this.promptBox.appendChild( this.jonah );
        this.actionPrompt.appendChild( document.createTextNode("Pick your hero.") );
        this.promptBox.appendChild( this.actionPrompt );       
        document.body.appendChild( this.promptBox);
        // Board area
        this.windowArray = [];
        this.heroSelectArray = [];
        this.villainSelectArray = [];

        this.boardArea = createObject( 'div', "board-area", ["board-area", "transition-item"] );
        this.heroSelect = createObject( 'div', "hero-select", ["characters", "transition-item"] );
        this.villainSelect = createObject( 'div', "villain-select", ["characters", "transition-item"] );

        this.heroSelectArray[cosmic] = createObject( 'div', "cosmic", ["character", "transition-item", "select"] ) ;
        this.heroSelectArray[morales] = createObject( 'div', "morales", ["character", "transition-item", "select"] ) ;
        this.heroSelectArray[gwen] = createObject( 'div', "gwen", ["character", "transition-item", "select"] ) ;
        this.heroSelectArray[spidey] = createObject( 'div', "spidey", ["character", "transition-item", "select"] ) ;

        this.villainSelectArray[venom] = createObject( 'div', "venom-select", ["character", "transition-item"] );
        this.villainSelectArray[sandman] = createObject( 'div', "sandman-select", ["character", "transition-item"] );
        this.villainSelectArray[blackCat] = createObject( 'div', "black-cat-select", ["character", "transition-item"] );
        this.villainSelectArray[goblin] = createObject( 'div', "goblin-select", ["character", "transition-item"] );

        for( let i=0; i<4; i++ ){
            this.heroSelect.appendChild( this.heroSelectArray[i] );
            this.villainSelect.appendChild( this.villainSelectArray[i] );
        }

        this.building = createObject( 'div', "board", ["board", "transition-item"]);
        this.buildWindows();

        this.boardArea.appendChild( this.heroSelect );
        this.boardArea.appendChild( this.building );
        this.boardArea.appendChild( this.villainSelect );
        document.body.appendChild( this.boardArea );

        this.footer = createObject( 'div', "footer", [ "footer" ]);
        this.creatorLink = createLink({ text:"ENGINMA9", address:"https://enginma9.github.io/", classes:[], id:"" });
        this.githubLink = createLink({ text:"GH", address:"https://github.com/enginma9/TOP-TicTacToe", classes:[], id:"" });
        this.odinLink = createLink({ text:"TOP", address:"https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe", classes:[], id:"" });
        this.likeMe = createLink({ text:"LIKE ME", address:"https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe/project_submissions", classes:[], id:"" });
        this.backgroundLink = createLink({ text:"BACKGROUND", address:"https://unsplash.com/@mroz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash", classes:[], id:"" });
        this.headsLink = createLink({ text:"HEADS", address:"https://scottfarrisdesign.wordpress.com/2013/08/06/spider-man-doodle-heads/", classes:[], id:"" });
        appendChildren({ parent:this.footer, children:[ 
            this.creatorLink, 
            document.createTextNode(" - "),
            this.githubLink,  
            document.createTextNode(" - "),
            this.odinLink,
            document.createTextNode(" - "),
            this.likeMe,
            document.createTextNode(" - "),
            this.backgroundLink,
            document.createTextNode(" - "),
            this.headsLink
        ]});
        document.body.appendChild( this.footer );
        //this.damageWindows( this.windowArray[1] );
    }
    
    showJonah(){
        this.jonah.classList.remove('hide-me');
    }
    hideJonah(){
        this.jonah.classList.add('hide-me');
    }

    buildWindows(){
        for( let i=0; i<9; i++){
            this.windowArray[i] = createObject( "div", i, [ "window","empty", "transition-item" ] );
            this.building.appendChild( this.windowArray[i] );
        }       
    }
    damageWindows( window ){    // pass villain.
        window.classList.add( "hit" );
        setTimeout( function(){ 
            window.classList.add( "oh" )
            window.classList.remove( "hit" ) 
        }, "300" );
        console.log("damage");
    }
} // end class

const game = new gameTemplate;
/*
window.onload = function(){
}
*/
// page, or game class
// ai, or villain class
// 