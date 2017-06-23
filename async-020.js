if (process.env.CORK) { process.stderr.cork(); }

// since an async function returns a promise, you can't just wrap it
// in a try/tach
//
try {
  console.log('try catch will not work around bare async function calls');
  badDeref();
} catch (e) {
  console.log('--> this will not get called:', e.message);
}

// but if you await on it, try/catch does work. (ignore the IIFE
// ... that's just a syntactic necessity so we can use the await
// keyword.
//
(async () => {
  try {
    await badDeref();
  } catch (e) {
    console.log('--> try/catch is fine if you await properly:', e.message);
  }
})();

// ----

async function badDeref() {
  let o = {};
  return o.a.b;
}
