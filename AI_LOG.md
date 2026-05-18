AI LOG

23.04 11:04:

Troubleshot why hamburger menu was not opening. changes made: Changes made: Divs aren't keyboard focusable so I had to place the hamburger icons into a button. Also Checked and implemented missing accessiblity in the header.

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

07.05 09:46:

(I wanted to create a reuseable toast notification where i could also pass in an argument of an icon from an array). I created the array and tried to pass it in but my logic was off. prompt: "why arent the toast notif icons showing up?" changes made: I needed to add this line

```js
iconImg.src = messageIcons[iconIndex];
```

and change the name of the parameter.

07.05 14:55;

prompt: Does my login and register functions look solid? Changes made: Removed some double error logging and code that was never reached.

09.05 10:30:

Prompt: Why is my access token returning nothing? Changes made: Needed to const the accessToken on the calling of the login function with an await. (async code is hard). My logic was otherwise correct!

```js
const accessToken = await logIn(credentials);
```

09.05 12:08:

prompt: why isnt the popup showing up? Changes made: had to return the toggle function and apply it to the loginPopUp() so i could use it on the add to cart button.

09.05 13:16:

Prompt: Why isnt shoppingcart relocating to login if there is no access token? Changes made: Needed to include both mobile and desktop header links. Needed to const shoppingcarticons with queryselectorAll to get both links. Then looped through the links and added this; to store that link in the shoppingcartLink variable`

```js
const shoppingcartLink = icon.closest("a");
```

09.05 14:04:

prompt: Why isnt my toast notification showing up on the login page if the user was redirected from another page that required login? changes made: Added a params to the checkReferrer function.

```js
const params = new URLSearchParams(window.location.search);
if (params.get("redirected") === "cart") {
  toastNotification(
    "You need to be logged in to access this page",
    "warning",
    2,
  );
}
```

11.05 09:58:

Prompt: What accessibility is missing from my checkout page? Changes made: Moved everything inside the form element, added fieldset and legend for semantic grouping and aria-labels.

11.05 11:02:

prompt: I need to use my toast notification to show that fields cannot be empty but placing it in the forEach makes it repeat as many times as there are inputfields, I dont know where to place it. Changes made: needed to create a let variable that is

```js
isFormValid = true;
```

Placed this in the if statement that if inputfields are empty the form is invalid. And then outside the loop i placed; to keep it away from the loop.

```js
if (!isFormValid) {
  toastNotification("Fields cannot be empty!", "warning", 2);
  return;
}
```

11.05 14:46:

prompt: i want the image to stay to the left, then the : .title-price-quantity-wrapper beside that with a gap and then the .trashcan-quantity-wrapper at the end of the row. changes made: added flex-shrink to the elements.

12.05 10:05:

Prompt: What is my cart html missing in regards of accessibility? Changes made: Added some aria-labels, aria-live and aria-role.

12.05 10:32:
Prompt: What is my cart javascript file missing in regards of accessibility? Changes made: Added an aria-hidden to the empty cart image and added an aria-label to the quantity buttons and a setTimeout to focus to the "Go shopping" button when the cart is empty.

12.05 10:40

Prompt: Can you help me fix this bug with the price having several decimals even though i've set the price toFixed(2)? Changes made: Needed to multiply the price and quantity before adding toFixed(2) and not after.

12:05 15:21:

Prompt: what is wrong with my loading spinner? Needed to add a few things to the loading spinner both for accessibility and needed body[0] and not just body to target the correct thing. Also needed a remove loading spinner function. Needed help with where to place the two different functions in the async code.

14.05 11:50:

Prompt: What is my one product page missing in regards of accessibility? Changes made: Added some aria attributes on the pop up message if prompted to log in. Needed to move my event listeners outside of the display one product so then i needed to

const popupToggle = loginPopUp(addToCartBtn);

14.05 13:03:

Prompt: What is my header missing in regards of accessibility? Changes made: Instead of writing the logic of closing the hamburger menu several times made it into a function and called it when needed inside the event handlers.

16.05 10:30
Prompt: Is my cart js file missing any accessibility? Added inert to the main so that when the login pop up comes up everything else in main is not keyboard focusable also added aria-hidden="true" on svgs.

17.05 09:06

Prompt: How do I make sure items with the same id in cart add to the quantity and not cart length?
Changes made: Added this to the addToCart function:

```js
const alreadyInCart = cart.find((item) => item.id === product.id);
if (alreadyInCart) {
  alreadyInCart.quantity += 1;
}
```

17.05 09:54

Prompt: What is wrong with my popup on clear cart? Changes made: Reused the pop up from the product page but needed tweaking as the clear cart lived inside displayCart. Needed to initialize clearCartBtn and popupToggle globally to null so i could use them in the other functions. Also pass triggerBtn as the parameters of clearCartPopUp so that i could use that in the displayCart function.

18.05 11:38

Prompt: What is wrong with my itemsInCart function? Changes made: Tried appending the div to the svg element which did not work, needed to append it to the anchortag instead.
