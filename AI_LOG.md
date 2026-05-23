AI LOG

| Prompt                                                                                                                                      | Time         | Changes made                                                                                                                                                                                                                                      | AI TOOL used |     |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --- |
| "Why is my hamburger menu not opening?                                                                                                      | 23.04 11:04: | Using div's aren't the best practice so I had to place the hamburger icons into a button instead.                                                                                                                                                 | CLAUDE AI    |     |
| "Is my footer missing any accessibility?"                                                                                                   | 23.04 13:57  | Added some aria-labels and made the links in the footer into `<ul>` with `<li>` elements for screen readers and more semantic html.                                                                                                               | CLAUDE AI    |     |
| "Why is the API fetch returning an empty array?"                                                                                            | 24.04 18:39  | The product.image.alt did not work because in the api that field is empty, which halted the whole code. Used the products name as the alt text instead.                                                                                           | CLAUDE AI    |
| "Why is my buttons wrapper showing up at the top and not the bottom if it exists in the html?"                                              | 26.04 12:41  | Appended the buttons wrapper in javascript as the dynamically rendered items showed up before the wrapper in the html.                                                                                                                            | CLAUDE AI    |
| "Why is my loop if reviews not working?"                                                                                                    | 27.04 11:03  | I was trying to target like "review.reviews.description" instead of "review.description".                                                                                                                                                         | CHATGPT      |
| "Is there a way to have JavaScript choose from a random array of images?"                                                                   | 27.04 11:11  | Could make a function using `Math.floor(Math.random())` to return a random index.                                                                                                                                                                 | CHATGPT      |
| "Can you help me with pagination of my cards on my carousel?"                                                                               | 01.05 09:58  | Needed help with the core functionality of pagination as the code I had did not work. Learned that it needs a function for how many cards to display, one to navigate on the carousel and one to clear the carousel. I found this very hard.      | CLAUDE AI    |
| "The cards does not change amount even though the grid changes depending on screen size"                                                    | 01.05 10:45  | Created a function that rerender the cards if the screen size changes.                                                                                                                                                                            | CLAUDE AI    |
| "Clicking next/previous button on the carousel 3 new items come into frame, and not just one more"                                          | 01.05 13:43  | Had to change the currentPage into currentStartIndex to 0 and calculate it differently by using a modulo operator to give back the remainder of the array after the division. Also updated the logic in the showCards function into a `for` loop. | CLAUDE AI    |
| "I think my way of rendering dynamic elements is overly complex (rendering EVERYTHING in Javascript), is there a cleaner way to do it?"     | 03.05 14:25  | Learned about the <template> tag in html to copy the markup into a template that can be reused. Used this way to refactor the cart page too.                                                                                                      | CLAUDE AI    |
| "Why isn't the quantity button working?"                                                                                                    | 04.05 11:32  | A cloned template works differently, had to target `cart[index].quantity`.                                                                                                                                                                        | CLAUDE AI    |
| " I want to be able to pass in an argument of an icon depending on which user feedback message that is displayed (error, warning, success), | 07.05 09:46  | Needed to add this `iconImg.src = messageIcons[iconIndex];`and change the name in the parameter to iconIndex.                                                                                                                                     | CLAUDE AI    |
| "Can you check that my login and register function looks solid?"                                                                            | 07.05 14:55  | Removed some double error logging and code that was never reached.                                                                                                                                                                                | CLAUDE AI    |
| "Why is my access token returning nothing? (not even an empty array)                                                                        | 09.05 10:30  | Needed to const the accessToken on the calling of the login function with an await.                                                                                                                                                               | CLAUDE AI    |
| " why isn't the popup showing up on the product page?"                                                                                      | 09.05 12:08  | Had to return the toggle function and apply it to the loginPopUp() so i could use it on the add to cart button.                                                                                                                                   | CLAUDE AI    |

| "Why isn't shopping cart relocating to login if there is no access token?" |09.05 13:16 |Needed to include both mobile and desktop header links. Needed to const shoppingcarticons with queryselectorAll to get both links. Then looped through the links and added this: `const shoppingcartLink = icon.closest("a");` to store that link in the shoppingcartLink variable. | CLAUDE AI |
| "Why isnt my toast notification showing up on the login page if the user was redirected from another page that required login?" |09.05 14:04| Needed to add a params to the checkReferrer function. `const params = new URLSearchParams(window.location.search);
if (params.get("redirected") === "cart") {
  toastNotification(
    "You need to be logged in to access this page",
    "warning",
    2,
  );
}` | CLAUDE AI |

:

prompt: changes made: Added a

```js

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

19.05 14:03

Prompt: I want my cards title, description and price to be at the same height regardless of differentiating content. Changes made: Added flex shrink on the image, and flex grow on the info container so it takes up the remaining space.
