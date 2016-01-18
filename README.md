# redux-spike

Spike project to better understand Redux

* `nvm install 5 && nvm use 5`
* `npm install`
* `npm start`

## Thoughts on stack

### Architecture

* Does the sub-apps architecture make sense?
* How far can React scale maintainbly as a thick-client app?
* Without MVC what does the directory structure look like?
* Which parts of this boilerplate should be a library and which boilerplate/generator?

### Saftey

**Philosophy:** Currently convinced automated tests, 90% unit and 10% integration, are the one true way to preventing bugs and regressions. That in combination with dead simple CI, rollbacks, and robust reporting tools is the way to go IMO. That said, if it isn't for the sake of bikeshedding and doesn't hurt time-to-running/shipping-code, then I'll happily welcome extra saftey guards.

**Useful vs. annoying/ugly?**
_in order of most likely more useful than annoying_

1. Promises and/or Generators to better catch/bubble/trace async errors
2. [Immutable data](https://github.com/facebook/immutable-js/)
3. [Linting tool](https://github.com/feross/standard)
4. [Type inferencing tool](http://flowtype.org/)
5. [Fuzzing](https://www.npmjs.com/package/fuzzer)
6. Type saftey using Typescript or the like
7. Use of `const`
8. `use strict;`
