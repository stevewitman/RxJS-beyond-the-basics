var foo = Rx.Observable.of(42, 100, 200);

// var bar = Rx.Observable.create(function(observer) {
//   observer.next(42);
//   observer.next(100);
//   observer.next(200);
//   observer.complete();
// })

foo.subscribe(function(x) {
  console.log('next ' + x);
}, function(err) {
  console.log('error ' + err);
}, function () {
  console.log('done')
});
