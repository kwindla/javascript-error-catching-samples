if (process.env.CORK) { process.stderr.cork(); }

// with no catch block, errors are silently swallowed
//
Promise.resolve()
  .then(() => {
    console.log('uh oh, error inside a promise chain with no catch');
    badDeref();
  });

// ----

function badDeref() {
  let o = {};
  return o.a.b;
}
