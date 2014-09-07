# simple-swipe.js

SimpleSwipe provides a JavaScript interface for handling basic one-finger swiping on touch screens.  The code, which began as a refactoring of [padilicious.com's swipe code](http://padilicious.com/code/touchevents/swipesensejs.html), is short and (hopefully) easy to understand.  It was written for projects that don't need things like pinch zoom or multi-finger swiping, and don't necessarily want large libraries like [jQuery mobile](http://jquerymobile.com/) or [TouchSwipe](https://github.com/mattbryson/TouchSwipe-Jquery-Plugin).

## Usage

Attach swipe listeners:
```JavaScript
var s = new SimpleSwipe(elementId, function (direction, element) {
    // do something
    console.log(direction);
}, minSwipeLength);
```
The callback fires on the `touchend` event.  The `minSwipeLength` argument is optional, defaulting to 72 pixels.

Remove swipe listeners:
```JavaScript
s.removeListeners();
```

That's it!

For more details [take a look at the code](https://github.com/Lochlan/swipe-demo/blob/master/simple-swipe.js) or [view an example](http://lochlan.github.io/simple-swipe).
