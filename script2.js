function type() {
    if ( i < text.length ) {
      title = title.concat(text[i]);
      document.getElementById("title").innerText = title;
      i++;
      setTimeout(type, 75);
    }
}

"What a good day.  No Spiderman in sight..."
"the enemy got the drop on you"
"Its public enemy number one, Spider-Man!"
"Everything Spider-Man touches comes to ruin!"
"Spider-Man, he's a menace!"
"Jonah Jameson --the man who destroyed Spider-Man!"
"Spider-Man... a cowardly quitter."