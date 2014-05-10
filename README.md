# dom-fit

Yo dawg I heard you like [fitting things into other things](https://github.com/soulwire/fit.js)...

Dom-fit provides a DOM wrapper for [Fit.js](https://github.com/soulwire/fit.js), to allow you to quickly, easily, and painlessly fit things into other things without manually writing the Javascript!

Usage is simple. Add a `data-fit` to your element (or add the class ".js-fit"), and pass `data-fit-<options>` in order to configure Fit.js's options. Any element with a property like `data-fit-*` will automatically be fitted. By default the element is fitted to its direct parent, but you can use `data-fit-to="selector"` to fit inside any element you want!

Now, normally in dom-fit, we fit with a method which simply adjusts the relative position of the element. You can adjust the fitting function, however, by passing in `data-fit-with="function"`, where "function" is the fitting function that you want to use for the element.

Example of an element, fitting in the `<body>`, using Fit's cssMargin fit mode.

```
<div id="foo">
    <div data-fit data-fit-to="body" data-fit-with="fit.cssMargin">
</div>
```

We also have some built-in fitting functions for your pleasure:

 * `domFit.position` - Positions the element horizontally and vertically within the element.
 * `domFit.vertical` - Restricts fitting to be relative, only in the "y" axis.
 * `domFit.horizontal` - Restricts fitting to be relative, only in the "x" axis.