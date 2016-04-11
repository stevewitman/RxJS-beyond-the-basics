// Function
// function foo() {
//   console.log('Hello');
//   throw new Error('invalid something');
//   return 42;
// }
// try {
//   console.log(foo.call());
// } catch (err) {
//   console.log('Something wrong happened: ' + err);
// }

// Observable
var bar = Rx.Observable.create(function(observer) {
  try {
    console.log('Hello');
    observer.next(42);
    observer.next(100);
    observer.next(200);
    setTimeout(function() {
      observer.next(300);
    });
  } catch (err) {
    observer.error(err);
  }
});

bar.subscribe(function nextValueHandler(x) {
  console.log(x);
}, function errorHandler(err) {
  console.log('Something wrong happened: ' + err);
});
