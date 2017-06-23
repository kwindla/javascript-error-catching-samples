if (process.env.CORK) { process.stderr.cork(); }

// but catch is not magic. inside the promise chain one level deeper,
// if we forget the catch, the error is still silently swallowed.
//
Promise.resolve()
  .then(() => {
    Promise.resolve()
      .then(() => {
        console.log('oh uh, one level deeper in the chain than the catch');
        badDeref();
      });
  }).catch((e) => {
    console.log('--> error', e.message);
  });

// ----

function badDeref() {
  let o = {};
  return o.a.b;
}
