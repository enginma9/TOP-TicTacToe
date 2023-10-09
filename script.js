const windowArea = document.getElementById("windows");


/*

type: What a good day.  No Spiderman in sight...

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


/*
const cosmic = document.getElementById("cosmic");
const cosmic = document.getElementById("cosmic");
const cosmic = document.getElementById("cosmic");
const cosmic = document.getElementById("cosmic");

const gwen
*/
function repairWindows(){

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

window.onload = function(){
    //clearWindows();
}

