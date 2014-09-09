# simple-swipe.js

SimpleSwipe provides a JavaScript interface for handling basic one-finger swiping on touch screens.  The code, which began as a refactoring of [padilicious.com's swipe code](http://padilicious.com/code/touchevents/swipesensejs.html), is short and (hopefully) easy to understand.  It was written for projects that don't need things like pinch zoom or multi-finger swiping, and don't necessarily want large libraries like [jQuery mobile](http://jquerymobile.com/) or [TouchSwipe](https://github.com/mattbryson/TouchSwipe-Jquery-Plugin).

## Usage

Attach swipe listeners:
```JavaScript
var s = new SimpleSwipe(elementId,
    function (swipe, element) {
        console.log('swipe move', swipe);
    }, function (swipe, element) {
        console.log('swipe end', swipe);
    });
```
The callbacks fire on the `touchmove` and `touchend` events respectively.  Note that the context for the `this` keyword inside the callbacks is the SimpleSwipe object

Remove swipe listeners:
```JavaScript
s.removeListeners();
```

That's it!

For more details [take a look at the code](https://github.com/Lochlan/swipe-demo/blob/master/simple-swipe.js) or [view an example](http://lochlan.github.io/simple-swipe).

## Build Tools

A makefile-based build system is provided to ease development.  It requires [node.js](http://nodejs.org/), [npm](https://www.npmjs.org/), and (of course) [GNU Make](http://www.gnu.org/software/make/).  Once those are installed, run `make` in your shell to install node packages and then lint and minify the code.  See [the makefile](https://github.com/Lochlan/swipe-demo/blob/master/Makefile) for details.
