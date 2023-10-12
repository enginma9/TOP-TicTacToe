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
/*
function type( text, i=0 ) {
    if ( i < text.length ) {
      title = title.concat(text[i]);
      document.getElementById("title").innerText = title;
      i++;
      setTimeout( () => type( text, i ), 75);
    }
}
*/
function rando( numberOfOptions=6 ){
    return Math.floor(Math.random()*numberOfOptions)
}

const quotes = [
    "What a good day.  No Spiderman in sight...",
    "the enemy got the drop on you",
    "Its public enemy number one, Spider-Man!",
    "Everything Spider-Man touches comes to ruin!",
    "Spider-Man, he's a menace!",
    "Jonah Jameson --the man who destroyed Spider-Man!",
    "Spider-Man... a cowardly quitter."
]
class boardObject{
    constructor(){
        this.win_conditions2d = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
    }
    
}