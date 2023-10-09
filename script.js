/*

Jonah appears,
type: "What a good day.  No Spiderman in sight..."

"Pick your hero"

event listeners on spidey-heads will check whether they have permission to go or not
set this to true

select spider-hero -> computer randomly selects villain
set spidey-heads to false, hide characters but the ones selected, remove "select" class.

Remove windows from board, set up array, divs(.select), and event listeners

Hide Jonah, flip coin, 
    if enemy goes first, print out, "the enemy got the drop on you"
    otherwise, "We need to protect the city from {enemy-name}"
    or
    Look, its public enemy number one!

When the enemy damages the building:
    apply .hit to window for .3s then remove and change .empty to .oh
    Jonah reappears, with some complaint
        Everything Spider-Man touches comes to ruin!
    
Hero wins:
    Spider-Man, he's a menace!
    
Hero loses:
    Jonah Jameson --the man who destroyed Spider-Man!
    Spider-Man... a cowardly quitter.

 */

const cosmic = 0;
const morales = 1;
const gwen = 2;
const spidey =3;

const win_conditions = [
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

class PageTemplate {
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

        this.villainSelectArray[0] = createObject( 'div', "venom-select", ["character", "transition-item"] );
        this.villainSelectArray[1] = createObject( 'div', "sandman-select", ["character", "transition-item"] );
        this.villainSelectArray[2] = createObject( 'div', "black-cat-select", ["character", "transition-item"] );
        this.villainSelectArray[3] = createObject( 'div', "goblin-select", ["character", "transition-item"] );

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
        this.creatorLink = createLink({ text:"ENGINMA9", address:"https://google.com", classes:[], id:"" });
        this.githubLink = createLink({ text:"GH", address:"https://google.com", classes:[], id:"" });
        this.odinLink = createLink({ text:"TOP", address:"https://google.com", classes:[], id:"" });
        this.backgroundLink = createLink({ text:"BACKGROUND", address:"https://unsplash.com/@mroz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash", classes:[], id:"" });
        this.headsLink = createLink({ text:"HEADS", address:"https://scottfarrisdesign.wordpress.com/2013/08/06/spider-man-doodle-heads/", classes:[], id:"" });
        appendChildren({ parent:this.footer, children:[ 
            this.creatorLink, 
            document.createTextNode(" - "),
            this.githubLink,  
            document.createTextNode(" - "),
            this.odinLink,
            document.createTextNode(" - "),
            this.backgroundLink,
            document.createTextNode(" - "),
            this.headsLink
        ]});
        //this.footer.appendChild( this.creatorLink );
        document.body.appendChild( this.footer );

    }
    
    showJonah(){
        this.jonah.classList.remove('hide-me');
    }

    buildWindows(  ){
        for( let i=0; i<9; i++){
            this.windowArray[i] = createObject( "div", i, [ "window","empty", "transition-item" ] );
            this.building.appendChild( this.windowArray[i] );
        }       
    }
}

function buildWindows(){
    board = createObject("div", "board", ["board"]);
    for(i=0;i<9;i++){
        windowArray[i] = document.createElement('div', { id: i }); //document.createElement('div', { id: i });
        windowArray[i].classList.add( "window", "empty" );
        board.appendChild( windowArray[i] );
    }
    document.body.appendChild( board );
}
function repairWindows(){
    for(i=0;i<9;i++){
        windowArray[i].className = "" ;
        windowArray[i].classList.add( "window", "empty" );
        board.appendChild( windowArray[i] );
    }
}

function buildCharacters(){
    for(i=0;i<4;i++){
        characterArray[i]
    }
}

function showWindows(){

}

function clearWindows(){
    var first = board.firstElementChild;
    while(first){
        first.remove();
        first = board.firstElementChild;
    }
}

//

function clearElement(item){
    var first = item.firstElementChild;
    while(first){
        first.remove();
        first = item.firstElementChild;
    }
}



const page = new PageTemplate;
/*
window.onload = function(){
    buildPage();
    clearWindows();
    buildWindows();
}
*/
