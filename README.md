# RxJS Beyond the Basics: Creating Observables from scratch

#### Egghead.io Video Series (April 2016)
- [01 - Let's learn RxJS](https://egghead.io/lessons/rxjs-let-s-learn-rxjs?series=rxjs-beyond-the-basics-creating-observables-from-scratch#/tab-transcript)
- [02 - Observables are almost like Functions](https://egghead.io/lessons/rxjs-observables-are-almost-like-functions)
- [03 - Observables (push) compared to generator functions (pull)](https://egghead.io/lessons/rxjs-observables-push-compared-to-generator-functions-pull)

## 01 - Let's learn RxJS

*This lesson is to kickstart our course on RxJS Observables and their operators. Know what is the purpose of this series and which RxJS version we will use while learning.*

Hi. My name is Andre. In this series of lessons, we will learn about ReactiveX, a library for Reactive programming. I'm talking about RxJS. This series will be a deep dive into what the observable type is and the different ways of creating observables.
First important thing to know is there's actually two JavaScript libraries. There's one living under Reactive Extensions RxJS, and the other one is living under ReactiveX RxJS. The Reactive Extensions library is a bit older that's why it has more stars. We will refer to this one as version 4. The ReactiveX has less stars. It's younger. We're going to refer to it as version 5.

http://reactivex.io

https://github.com/Reactive-Extensions/RxJS (Version 4)

https://github.com/ReactiveX/RxJS (Version 5 beta … used by Angular 2)

For the purpose of this series, we're going to study Version 5. Because it's newer, it's more likely to last over time. It's also being used in Angular too. Apart from minor differences, it doesn't matter which version we use, either v4 or v5. The overall concept is the same. We're going to look at the observable type in details. Later on, we're going to see about creation functions.

## 02 - Observables are almost like Functions

*This lesson introduces the concept of an Observable. We will see how similar it behaves to a function and what is the fundamental difference between them.*

Now we are in JS Bin, and here we have RxJS version 5 imported.

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://npmcdn.com/@reactivex/rxjs@5.0.0-beta.1/dist/global/Rx.umd.js"></script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>JS Bin</title>
  </head>
  <body>
    <script src="main.js"></script>
  </body>
</html>
```

That gives us the global object Rx, which has observable.

```JavaScript
Rx.Observable
```


Observable is by far the most important concept in this library.



It's important to note that it's not like an event stream, such as EventEmitter in Node.js. It's better to think of it as a powerful generalization of a function. I can explain what I mean.

Let's make a function here called foo, which takes no arguments. Then it's just going to cause side effects such as console.log saying hello. Then it returns a value, like 42. Once you've called this function, it will immediately give you a value which we can store in a variable called X. We can also console.log that X.

When we run this, we see hello, and 42. I'm also going to simplify this by just replacing X with the actual call of foo. Once we call foo, we get that value, and we can put it in the console.log.

Besides that, I'm also going to do .call. Every function in JavaScript has this method called call. This does the same thing that we had before. You're probably wondering, why am I doing this now? But bear with me.

```javascript
function foo() {
  console.log('Hello');
  return 42;
}

console.log(foo.call());
```
```
> "Hello"
> 42
```

Please note this also, that whatever's inside of here, the function, it won't happen if I don't call that function. If I comment this out and run this, nothing happens. That's because whatever is inside here is a lazy computation. Because it's lazy, it won't happen until I actually ask for it with call.

Keep all that in mind, and let's look at observables now. Let's make an observable called bar. We are going to use the API to create observables like this, which takes a function, which takes an observer. Here inside, we're going to write almost the same thing that we had here for function. We're going to do a Console.log saying hello, and also how we need to return a value, so we do observer. Here is the next value.

Now, observables have a method called subscribe. That takes a function which takes the value X. X is whatever was fed here through .next. Once I have that value X, I can just put it in console.log, almost the same thing we had for functions. If I run this, I see hello and 42. So far, no difference with functions.

```javascript
var bar = Rx.Observable.create(function(observer) {
  console.log('Hello');
  observer.next(42);
})

bar subscribe(function(x) {
  console.log(x);
})
```
```
> "Hello"
> 42
```

What happens then if I comment this out? Basically, I don't have a subscribe anymore. What will happen? Well, nothing. That means that whatever is inside an observable is also a lazy computation. Just like with functions, if you don't express your interest in the values, then nothing will happen.

What is the difference between observables and functions? Maybe if we call subscribe twice, what happens really? Let's see. We see hello, 42, hello and 42. What happened here was duplicated for each of these calls to subscribe, so these are really independent to each other. They're not common or shared. If we try to call the function foo twice, what happens?

As most people expect, we're calling the function twice, so we're going to see hello, 42, and hello, 42. So far, no difference. Hmm. People say sometimes that observables are asynchronous. Is that true? Let's check that. Let's first make a sanity check to see that functions are actually synchronous.

If we put the function call between a sandwich here before and after, we expect to see before, hello, 42, and then after. We see before, hello, 42, and after. Functions are working as expected, so how do observables compare in this regard? Let's see.

Surrounding the subscribe, I'm going to put a console.log for before, and a console.log for after. Now it's in the sandwich, so what's going to happen when I run this? Are we going to see before, after, and then after some while, hello, 42? Or are we going to see hello, 42 happening in between these? Let's check.

We see before, hello, 42, and after. It means the observable here in this case, this bar, is completely synchronous just like the function is. So far, no difference at all. What is really the difference between observables and functions?

Here is one major thing, is that you can call observer.next multiple times. You can give another value, so here is next 100. Here is next 200, and now we're basically returning many values.

When we now run this, we see 42, 100, and 200, and this happens synchronously. All of these values were delivered between this before and after, which means that this is happening really all here.

```javascript
var bar = Rx.Observable.create(function(observer) {
  console.log('Hello');
  observer.next(42);
  observer.next(100);
  observer.next(200);
})

console.log('before');
bar.subscribe(function(x) {
  console.log(x);
})
console.log('after');
```
```
> before
> Hello
> 42
> 100
> 200
> after
```

That's interesting, but observables also allow you to not just be synchronous. You can also set a timeout here which will happen after one second. Then you can deliver yet another value like 300. When we run this now, we see 100, 200, and then after one second, we saw 300.

```javascript
var bar = Rx.Observable.create(function(observer) {
  console.log('Hello');
  observer.next(42);
  observer.next(100);
  observer.next(200);
  setTimeout(function() {
    observer.next(300);
  });
})

console.log('before');
bar.subscribe(function(x) {
  console.log(x);
})
console.log('after');
```
```
> before
> Hello
> 42
> 100
> 200
> after
> 300
```

These values happened between the sandwich of these calls, but the value 300 was delivered after one second. That's the difference between observables and functions.

In functions, you can't really return multiple times. That doesn't work. Also, it's kind of cheating to return an array, because still, you are returning one value, and that value is the array. **The fundamental difference between functions and observables are that observables can return you multiple values.**

When you .call on a function, you're basically saying, give me a value immediately, and just one value. But when you're saying .subscribe on an observable, you're saying, give me values. I don't know, maybe they come immediately. Maybe it's just one. Maybe they are asynchronous. That is basically the difference. It's like a powerful generalization of a function.

## 03 - Observables (push) compared to generator functions (pull)

*Observables are almost like functions, but allow you to return many values. There is another concept in JavaScript (ES6), called Generator Functions, which do something very similar. In this lesson we will see what Observables and Generators have in common, and how they differ.*

We just saw how observables are almost like functions but allow you to return many values. There's another concept in JavaScript called generator functions, which do something very similar. Generator functions were added in ECMAScript 2015, so they're a relatively new feature. Basically, they allow you to return multiple values as well.

This is how we would create one. We say function bas, but after the function keyword, we'll put a star. That's to indicate that this function can give many values. I'm also going to comment out these codes so they don't interfere with our output. Then I'm going to create console log, as we had before. I'm going to yield a value, which is the generator style of giving a value.

Then I'm going to yield more values. This is sort of like return, but we're going to see how it's different. This is also a lazy computation, so nothing will happen until we ask for these values. The way we do that is by getting an iterator when calling this function bas. Once we have that iterator, we can get values from that by saying next value. Once I do that, it will give me the next value, sort of.

```javascript
//Generator
function* baz() {
  console.log('Hello');
  yield 42;
  yield 100;
  yield 200; // did not get logged
}

var iterator = baz();
console.log(iterator.next().value);
console.log(iterator.next().value);
```
```
> Hello
> 42
> 100
```

If we run this, we see hello 42 and 100. It executed this side effect. Then it gave me the value 42 and 100, but it didn't give me 200. That's because the generator function is allowed to pause its execution. For instance, here it paused on 100. That's because you need to explicitly pull out the values from this generator function by saying iterator next. That's why I need to put yet another iterator next here to get the third value out, like that.

How does that differ from observables? You need to look at the observable here as a producer of values. Also, this part here is the consumer of those values. With the generator function, this is producing many values, and this part here is consuming those values. The difference is that with observables, the producer determines when the values are sent and with generators, the consumer determines when the values are sent.

```javascript
// Observable (PUSH)
// Producer - determines when the values are sent
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
// Consumer - determines when the values are sent
var iterator = baz();
console.log(iterator.next().value);
console.log(iterator.next().value);
```

The first style is generally called push, and the second style is generally called pull. Observables are more useful for sequences of values that are sort of alive, such as setting a timeout or setting an interval to run every second to deliver values or click events. It doesn't make sense to put a set interval inside a generator function, because the values won't be necessarily sent every one second. You would need to put the set interval on the consumer side, like that.

Generator functions are more useful as a passive factory of values. For instance, you can think of the Fibonacci sequence, right? Let's keep in mind that with observables, the values are pushed from the producer, and with generators, the values are pulled from the consumer.
