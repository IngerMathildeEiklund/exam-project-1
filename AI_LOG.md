AI LOG

21.04: 14.13:

Troubleshot why images on the cards were not scaling correctly.

23.04 11:04:

Troubleshot why hamburger menu was not opening.

23.04 11.42:

Checked and implemented missing accessiblity in the header. Divs aren't keyboard focusable so I had to place the hamburger icons into a button.

23.04 13:57:

Checked and implemented missing accessibility in the footer. Prompt: "what accessibility is missing in my footer" Changes made: Added some aria-labels and made the links in the footer into <ul> with <li> elements for screen readers and more semantic html.

24.04 18:39:

Troubleshot why API fetch request was not working, "Prompt: Why is the api returning an empty array? " Changes made: The product.image.alt did not work because in the api that field is empty, which halted the whole code. Used the products name as the alt text instead.

26.04 12:41:

Troubleshot why items were showing up in a different order than expected. Prompt: "why is the buttons div showing up at the top and not the bottom?" Changes made: appended the buttons wrapper in javascript as the dynamically rendered items showed up before the wrapper in the html.

27.04 11:03:

troubleshot why my loop of displaying reviews was not working. prompt: what is wrong with my code? Changes made: I was trying to target like "review.reviews.description" instead of "review.description". chatgpt

27.04 11:11

Asked chatgpt for a code to have a few images and choosing one of them to display on the review section to mimmic random users.

```js
const avatars = ["images/user1.png", "images/user2.png", "images/user3.png"];

function getRandomAvatar() {
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return avatars[randomIndex];
}
```

01.05 09:58:

prompt: "can you help me with pagination for my cards?" Changes made: Added the core functionality of pagination as when i tried on my own the previous day it did not work. Learned that it needs a function for how many cards to display, one to navigate on the carousel and one to clear the carousel.

01.05 10:45:

prompt: The cards doesn't change depending on screen size. changes made: Needed a function to rerender the cards again to run the checkScreenSize function.

01.05 13:43

prompt: When clicking the next/prev button on the carousel 3 new products come into frame, but the goal is to have just one product come into frame when clicking. changes made: Had to change the currentPage into currentStartIndex to 0 and calculate it differently by using a modulo operator to give me the remainder of the array after the division. Also needed to update the logic in the showCards function into a for loop.

03.05 14:25

prompt: making cleaner rendering of products (not writing everything in javascript) changes made: Learned about the <template> tag in html to copy the markup into a template that can be reused. I usually render everything in javascript, but styling gets overly complicated. I knew there would be an easier way. I found this very valuable and will do it in this way going forward. No more creating everything in javascript!!!!

04.05 11:32:

Promt: why isnt my quantity button working? Changes made: Had to change logic as using a cloned template works differently. I had to target the "cart[index].quantity"
