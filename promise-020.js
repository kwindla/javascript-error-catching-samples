if (process.env.CORK) { process.stderr.cork(); }

// try/catch doesn't work, either, unless it immediately encloses the
// function call.
//
console.log('uh oh, try/catch will not work to catch inner errors');
try {
  Promise.resolve()
    .then(() => {
      badDeref();
    });
} catch (e) {
  console.log('--> this will never get called', e.message);
}

Promise.resolve()
  .then(() => {
    try {
      badDeref();
    } catch (e) {
      console.log('--> it\'s okay if the try immediately wraps the bad call',
                    e.message);
    }
  });

// ----

function badDeref() {
  let o = {};
  return o.a.b;
}
