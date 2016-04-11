# RxJS Beyond the Basics: Creating Observables from scratch

## Egghead.io Video Series (April 2016)
- [01 - Let's learn RxJS](https://egghead.io/lessons/rxjs-let-s-learn-rxjs?series=rxjs-beyond-the-basics-creating-observables-from-scratch#/tab-transcript)

## 01 - Let's learn RxJS

*This lesson is to kickstart our course on RxJS Observables and their operators. Know what is the purpose of this series and which RxJS version we will use while learning.*

Hi. My name is Andre. In this series of lessons, we will learn about ReactiveX, a library for Reactive programming. I'm talking about RxJS. This series will be a deep dive into what the observable type is and the different ways of creating observables.
First important thing to know is there's actually two JavaScript libraries. There's one living under Reactive Extensions RxJS, and the other one is living under ReactiveX RxJS. The Reactive Extensions library is a bit older that's why it has more stars. We will refer to this one as version 4. The ReactiveX has less stars. It's younger. We're going to refer to it as version 5.

http://reactivex.io

https://github.com/Reactive-Extensions/RxJS (Version 4)

https://github.com/ReactiveX/RxJS (Version 5 beta … used by Angular 2)

For the purpose of this series, we're going to study Version 5. Because it's newer, it's more likely to last over time. It's also being used in Angular too. Apart from minor differences, it doesn't matter which version we use, either v4 or v5. The overall concept is the same. We're going to look at the observable type in details. Later on, we're going to see about creation functions.
