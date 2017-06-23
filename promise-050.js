if (process.env.CORK) { process.stderr.cork(); }

// and what about Promise.all? Same thing, need an immediately
// attached catch block. But this is a very easy mistake to make.
//

let promises = [
  new Promise((resolve, reject) => { badDeref(); resolve(); }),
  new Promise((resolve, reject) => { badDeref(); resolve(); })
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

function badDeref() {
  let o = {};
  return o.a.b;
}
