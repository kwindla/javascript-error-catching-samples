
// an async function that isn't wrapped in try/catch is equivalent to
// a promise with no catch block!
//
console.log('uh oh, calling an async function silently swallows errors');
badDeref();

// in fact, here it is expanded out so that the returned promise has a
// then but no catch
//
console.log('same thing, pretty much, but more explicitly structured');
badDeref()
  .then((val) => {
    console.log('return value', val);
  });

// this works fine, though
//
badDeref()
  .then((val) => {
    console.log('return value', val);
  })
  .catch((e) => {
    console.log('--> ok, errors can be handled by a tacked-on catch:', e.message);
  });

// this doesn't work, though. blech. you have to know when you call it
// whether a function is async or not. and if you *add* the async
// keyword to an existing function, calling code might all of a sudden
// not be able to catch errors!
//
try {
  console.log('and it will not work just to wrap the call in try/catch')
  badDeref();
} catch (e) {
  console.log('--> error:', e.message);
}

// this does work. an async function needs to be called with await for
// an error that it throws to be catchable. (the outer
// dummySyntaxWrapper IIFE is only there so we can use 'await', which
// we can only do inside a function declared as async).
//
(async function dummySyntaxWrapper () {
  try {
    await badDeref();
  } catch (e) {
    console.log('--> using await allows wrapping in try/catch:', e.message);
  }
})();

// ----

async function badDeref() {
  let o = {};
  return o.a.b;
}
