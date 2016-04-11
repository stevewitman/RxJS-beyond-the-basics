// Observable (PUSH)
// Producer determines when the values are sent
var bar = Rx.Observable.create(function(observer) {
  console.log('Hello');
  observer.next(42);
  observer.next(100);
  observer.next(200);
  setTimeout(function() {
    observer.next(300);
  });
});

// Consumer
bar.subscribe(function(x) {
  console.log(x);
})



// Generator (PULL)
// Producer
function* baz() {
  console.log('Hello');
  yield 42;
  yield 100;
  yield 200;
}

// Consumer determines when the values are sent
var iterator = baz();
console.log(iterator.next().value);
console.log(iterator.next().value);
