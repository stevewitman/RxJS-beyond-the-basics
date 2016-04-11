// Observable
var bar = Rx.Observable.create(function(observer) {
  try {
    console.log('Hello');
    observer.next(42);
    observer.next(100);
    observer.next(200);
    setTimeout(function() {
      observer.next(300);
      observer.complete();
    });
  } catch (err) {
    observer.error(err);
  }
});

bar.subscribe(
  function nextValueHandler(x) {
    console.log(x);
  },
  function errorHandler(err) {
    console.log('Something wrong happened: ' + err);
  },
  function completeHandler() {
    console.log('done');
  }  
);
