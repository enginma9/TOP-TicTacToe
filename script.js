function winning( board, player ){
    let test = false;
    win_conditions2d.forEach( ( condition ) => {
        if( board[ condition[0] ] == player && board[ condition[1] ] == player && board[ condition[2] ] == player ){
            test = true; 
        } 
    });
    return test;
} // end winning

class villain{
    constructor(  ){
        this.difficulty = goblin;
        this.name = "";

    } // end constructor

    setDifficulty( difficulty, name ){
        this.difficulty = difficulty;
        this.name = name;
    } // end setDifficulty
    getDifficulty(){
        return this.difficulty;
    }

    play( board ){
        let villainSelect = 0; 

        if( this.difficulty == venom ){
            villainSelect = this.playMiniMax({ thisBoard:board, thisPlayer:vill, desiredDepth:4 }).index;
        }else if( this.difficulty == blackCat ){
            villainSelect = this.playMiniMax({ thisBoard:board, thisPlayer:vill, desiredDepth:2 }).index;
        }else if( this.difficulty == sandman ){
            villainSelect = this.playMiniMax({ thisBoard:board, thisPlayer:vill, desiredDepth:1 }).index;
        }else{
            villainSelect = this.randomPlay( board );
        }
        return villainSelect;
    } // end play

    randomPlay( board ){
        let optionList = this.findEmpties( board );
        return optionList[ rando( optionList.length ) ]
    } // end randomPlay

    findEmpties( board ){
        return  board.filter( slot => slot != "O" && slot != "X");
    } // end findEmpties

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
        if( thisPlayer = vill ){ 
            let bestScore = -10000;
            for( let i = 0; i< moves.length; i++ ){
                if( moves[i].score > bestScore ){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }else{  
            let bestScore = 10000;
            for( let i = 0; i< moves.length; i++ ){
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[ bestMove ];
    } // end playMiniMax

    getName(){
        return this.name;
    }
} // end class villain


class gameTemplate {
    constructor(){
        this.slots = [];
        this.gameInProgress = false;
        
        clearElement(document.body);
        this.header = createObject( 'h1', "gameTitle", ["title", "transition-item"] );
        this.header.appendChild( document.createTextNode("Catch the Spidey - by the - Toe") );
        document.body.appendChild(this.header);
        // Communication Area
        this.promptBox = createObject( 'div', "prompt", ["select", "transition-item"] );
        this.actionPrompt = createObject( 'span', "action-prompt", [ "transition-item"] );

        this.jonah = createObject( 'img', "jonah", ["character","hide-me", "transition-item"] );
        this.jonah.src = "img/Jonah.png";

        this.promptBox.appendChild( this.jonah );
        this.actionPrompt.appendChild( document.createTextNode("Prevent enemy from gettng 3 in a row, causing structural collapse.") );
        this.promptBox.appendChild( this.actionPrompt );       
        this.promptBox.addEventListener( "click", this.promptBoxClicked, false );
        document.body.appendChild( this.promptBox);

        // Board area
        this.windowArray = [];
        this.heroSelectArray = [];
        this.villainSelectArray = [];
        this.heroMarkerClass = "";

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
            this.heroSelectArray[i].addEventListener( "click", this.heroClicked, false );
            this.villainSelect.appendChild( this.villainSelectArray[i] );
            this.villainSelectArray[i].addEventListener( "click", this.villainClicked, false );
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
        this.Villain = new villain;
        this.turnOff();
        console.log( this.slots );
        //this.turnOnItems( this.windowArray );
        this.turnOnItem( this.promptBox );
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
            this.slots[i]=i;
        }
        this.windowArray.forEach( ( window ) => {
            window.addEventListener( 'click', this.windowClicked, false );
            this.building.appendChild( window );
        });
    }
    windowClicked( event ){
        console.log( "Clicked window:", event.currentTarget.id );
        let window = event.currentTarget;
        if( game.isEnabled( window ) ){//if( event.currentTarget.classList.contains("select") ){
            console.log( "playable" );
            game.protectWindow( Number(window.id) );
            if( winning( game.slots, hero ) ){
                console.log( 'You saved the building and captured the villain.');
                game.gameOver();
            }else if( winning( game.slots, vill ) ){
                console.log( 'Tragedy struck today.' );
                game.gameOver();
            }else if( game.Villain.findEmpties( [...game.slots] ).length < 1 ){
                console.log("Well, the building's still standing.");
                game.gameOver();
            }else{
                let x = game.Villain.play( [...game.slots] );
                console.log( game.Villain.getName(), "plays", x );
                game.slots[x] = vill;
                game.damageWindows( game.windowArray[x] );
            }
            
        }
    }
    
    whosWinning(){
        if( winning( game.slots, hero ) ){
            console.log( 'You saved the building and captured the villain.');
        }else if( winning( game.slots, vill ) ){
            console.log( 'Tragedy struck today.' )
        }else if( game.Villain.findEmpties( [...game.slots] ).length < 1 ){

        }
    }
    promptBoxClicked( event ){
        if( game.isEnabled( event.currentTarget ) ){//if( this.promptBox.classList.contains("select") ){
            if( game.gameInProgress == true ){
                game.resetGame();
                console.log( "In Progress? ", game.gameInProgress, ", Reset");
            }else{
                game.turnOff( this.promptBox ) ;
                //console.log("Select Hero");
                game.selectYourHero();
                game.gameInProgress = true;
            }
        }else{
            console.log( event.currentTarget.id, " not enabled.")
        }
    }
    selectYourHero(){
        // turns off everything, then enables all heroes
        console.log("Select your hero");
        this.turnOff();
        this.turnOnItems( this.heroSelectArray );
    }
    heroClicked( event ){
        // set current hero string to corresponding class string
        // remove select from all heroes, add select to all villains
        // hide all but selected hero
        if( game.isEnabled( event.currentTarget) ){
            game.setHero( event.currentTarget.id );
        }else{
            console.log( event.currentTarget.id, " not enabled.")
        }
    }
    villainClicked( event ){
        if( game.isEnabled( event.currentTarget) ){
            game.startGame( event.currentTarget.id );
        }else{
            console.log( event.currentTarget.id, " not enabled.")
        }
    }

    damageWindows( window ){    
        window.classList.add( "hit" );
        window.classList.remove("empty", "select" );
        setTimeout( function(){ 
            window.classList.add( "oh" )
            window.classList.remove( "hit" ) 
        }, "300" );
        console.log( "Window ", window.id, " damaged");
    }
    protectWindow( num ){
        game.windowArray[num].classList.remove( "select", "empty" );
        game.windowArray[num].classList.add( game.heroMarkerClass );
        game.slots[num] = hero;
    }
    // ?
    userPlay(){
        // event listener response
    }
    startGame( name ){
        // if game not in progress, reset board and set game to in-progress
        game.hideExcept( game.villainSelectArray, name );
        game.turnOff( game.villainSelectArray );
        if( name == "venom-select" ){
            game.Villain.setDifficulty( venom, "Venom" ); 
            
        }else if( name == "sandman-select" ){
            game.Villain.setDifficulty( sandman, "Sandman" ); 
        }else if( name == "black-cat-select" ){
            game.Villain.setDifficulty( blackCat, "Black Cat" ); 
        }else{
            game.Villain.setDifficulty( goblin, "Goblin" );
        }
        console.log( name.concat("ed, Difficulty:"), game.Villain.getDifficulty() );
        // turn on windows
        game.turnOnItems( game.windowArray );
        game.resetBoard();
    }
    gameOver(){        
        this.turnOff();
        this.turnOnItem( this.promptBox );
    }
    resetGame(){
        this.turnOff();
        // set game in-progress to false
        // remove select, remove gwen, morales, cosmic, spidey, oh, add empty
        this.windowArray.forEach( ( window ) => {
            game.clean( window ); //window.classList.remove( "gwen", "morales", "cosmic", "spidey", "oh", "select" )
            window.classList.add("empty")
        } );
        game.unhide( game.heroSelectArray );
        game.unhide( game.villainSelectArray );
        this.turnOnItem( this.promptBox );
        game.gameInProgress = false;
    }
    setHero( id ){
        game.heroMarkerClass = id;
        console.log( "Setting ", id );
        game.hideExcept( game.heroSelectArray, id );
        game.turnOnItems( game.villainSelectArray );
    }
    clean( window ){
        window.classList.remove( "gwen", "morales", "cosmic", "spidey", "oh", "select", "empty" );
    }
    resetWindows(){
        this.windowArray.forEach( ( window ) => {
            window.classList.remove( "gwen", "morales", "cosmic", "spidey", "oh", "select" )
            window.classList.add("empty")
        } );
    }
    matchBoards(){
        resetWindows();
        for(let i=0;i<9;i++){
            game.clean( windowArray[i] );
            if( slots[i] == hero ){
                game.windowArray[i].classList.add( this.heroMarkerClass );
            }else if( slots[i] == vill ){
                game.windowArray[i].classList.add( "oh" );
            }else{
                game.windowArray[i].classList.add( "empty" );
            }
        }
    }
    isEnabled( item ){
        if( item.classList.contains("select") ){
            return true;
        }else{
            return false;
        }
    }
    turnOff(){
        this.turnOffItems( this.windowArray );
        this.turnOffItem( this.promptBox );
        this.turnOffItems( this.villainSelectArray );
        this.turnOffItems( this.heroSelectArray );
    }
    turnOffItem( item ){
        item.classList.remove("select");
    }
    turnOffItems( items=[] ){
        items.forEach( ( item ) => {
            item.classList.remove("select")
        } );
    }
    turnOnItem( item ){
        item.classList.add("select");
    }
    turnOnItems( items=[] ){
        items.forEach( ( item ) => {
            item.classList.add("select")
        } );
    }
    resetBoard(){
        for( let i = 0; i < 9; i++ ){
            game.slots[i] = i;
        }
    }
    getBoard(){
        return [...game.slots];
    }
    hideExcept( passedArray=[], passedID ){
        let passedLength = passedArray.length;
        for( let i=0; i < passedLength; i++){
            if( passedArray[i].id != passedID ){
                passedArray[i].classList.add( "hide-me" );
            }
        }
    }
    unhide( passedArray=[] ){
        console.log( "unhiding ");
        passedArray.forEach( ( item ) => {
            item.classList.remove("hide-me");
        } );
    }
} // end class gameTemplate

const game = new gameTemplate;
/*
window.onload = function(){
}
*/
// page, or game class
// ai, or villain class
// 