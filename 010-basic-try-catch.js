

// need to wrap code that might result in an Error in try/catch
// 
try {
  badDeref();
} catch (e) {
  console.log('--> great. we caught an error:', e.message);
}

function badDeref() {
  let o = {};
  return o.a.b;
}
