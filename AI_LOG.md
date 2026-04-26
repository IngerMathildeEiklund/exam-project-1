AI LOG

21.04: 14.13:

Troubleshot why images on the cards were not scaling correctly.

23.04 11:04:

Troubleshot why hamburger menu was not opening.

23.04 11.42:

Checked and implemented missing accessiblity in the header. Divs aren't keyboard focusable so I had to place the hamburger icons into a button.

23.04 13:57:

Checked and implemented missing accessibility in the footer. Prompt: "what accessibility is missing in my footer" Changes made: Added some aria-labels and made the links in the footer into <ul> with <li> elements.

24.04 18:39:

Troubleshot why API fetch request was not working, "Prompt: Why is the api returning an empty array? " Changes made: The product.image.alt did not work because in the api that field is empty, which halted the whole code. Used the products name as the alt text instead.

26.04 12:41:

Troubleshot why items were showing up in a different order than expected. Prompt: "why is the buttons div showing up at the top and not the bottom?" Changes made: appended the buttons wrapper in javascript as the dynamically rendered items showed up before the wrapper in the html.
