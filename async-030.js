if (process.env.CORK) { process.stderr.cork(); }

// and what about Promise.all with async functions. Well, works fine,
// as we now might expect, if we remember that the function returns
// a Promise.
//

let promises = [
  badDeref(),
  badDeref()
];

// this does not catch the error
//
Promise.resolve()
  .then(() => {
    console.log('uh oh, we need a catch block attached to our Promise.all()');
    Promise.all(promises);
  }).catch((e) => {
    console.log('--> this will not get called:', e.message);
  });

// this does
//
Promise.resolve()
  .then(() => {
    Promise.all(promises)
      .catch((e) => {
        console.log('--> catching from the Promise.all():', e.message);
      })
  }).catch((e) => {
    console.log('--> this will not get called:', e.message);
  });

// ----

async function badDeref() {
  let o = {};
  return o.a.b;
}
