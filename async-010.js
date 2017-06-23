if (process.env.CORK) { process.stderr.cork(); }

// an async function that is called without await is equivalent to
// the function call wrapped in a Promise.then( ... )
//
console.log('uh oh, not awaiting silently swallows errors');
badDeref();

// in fact, here it is expanded out so that the returned promise has a
// then but no catch
//
console.log('same thing, pretty much, but more explicitly structured');
badDeref()
  .then((val) => {
    console.log('return value', val);
  });

// of course, attaching a catch does work
//
badDeref()
  .then((val) => {
    console.log('return value', val);
  })
  .catch((e) => {
    console.log('--> errors can be handled by a catch block:', e.message);
});

// ----

async function badDeref() {
  let o = {};
  return o.a.b;
}
