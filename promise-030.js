if (process.env.CORK) { process.stderr.cork(); }

// catch
//
Promise.resolve()
  .then(() => {
    badDeref();
  }).catch((e) => {
    console.log('--> great, catch block catches the error:', e.message);
  });

// ----

function badDeref() {
  let o = {};
  return o.a.b;
}
