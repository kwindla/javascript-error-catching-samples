
// An error somewhere inside a Promise chain, with no catch
// immediately wrapping it, is bad, bad news. Errors are silently
// swallowed.

// no catch -- error silently swallowed
//
Promise.resolve()
  .then(() => {
    console.log('uh oh, error inside a promise chain with no catch');
    badDeref();
  });

// catch
//
Promise.resolve()
  .then(() => {
    badDeref();
  }).catch((e) => {
    console.error('--> great, catch block catches the error', e.message);
  });

// but catch is not magic. inside the promise chain one level deeper,
// if we forget the catch, the error is still silently swallowed.
//
Promise.resolve()
  .then(() => {
    Promise.resolve()
      .then(() => {
        console.log('oh uh, one level deeper in the promise chain than the catch');
        badDeref();
      });
  }).catch((e) => {
    console.error('--> error', e.message);
  });



// ----

function badDeref() {
  let o = {};
  return o.a.b;
}
