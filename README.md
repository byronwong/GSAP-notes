Green Sock Animation Platform
=============================

<!-- TOC -->

    - [0.1. Global requirements](#01-global-requirements)
    - [0.2. Getting started](#02-getting-started)
- [1. GSAP](#1-gsap)
    - [1.1. Basic signiture](#11-basic-signiture)
    - [1.2. Vars](#12-vars)
        - [1.2.1. Auto alpha](#121-auto-alpha)
    - [1.3. Animation Complete](#13-animation-complete)
    - [1.4. Delaying (Staggering)](#14-delaying-staggering)
    - [1.5. Timelines](#15-timelines)
        - [1.5.1. Basic](#151-basic)
        - [1.5.2. Applying controls](#152-applying-controls)
        - [1.5.3. Cleaner Syntax](#153-cleaner-syntax)
    - [1.6. More complex animations](#16-more-complex-animations)
    - [1.7. Draggable](#17-draggable)

<!-- /TOC -->

> IMPORTANT waiting for NSP to be updated till then it has been removed from pre-start


## 0.1. Global requirements
To package this (deleting node modules) you can use `npm run package`
- `del-cli` - `npm install --global del-cli`


## 0.2. Getting started
- `npm i`
- `npm start` - NOTE: we are using `nodemon` to reset the serve on change.

# 1. GSAP


## 1.1. Basic signiture
these css properties can be edited:
https://developer.mozilla.org/en-US/docs/Web/CSS/transform

Others to note:
- alpha vs opacity

```js 
  // https://greensock.com/docs/TweenMax/static.to()
  // .to(domNode, duration(s), options({}))
  let toolBox = document.querySelector('.tool-box');
  TweenMax.to(toolBox, 1, {
    x: 250, 
    y: 250,
    rotation: 90,
    alpha: .2,
    fontSize: '150%' // note string
  });
```


## 1.2. Vars

We can pass in options in the form of an object:
```js 
  {
    x: 50, // auto px
    y: 50
    height: 50 // recommend scale as this is rendered outside of document flow
    fontSize: '+=150' // we can scale relative, also note camelCase
  }
```


### 1.2.1. Auto alpha
To get auto alpha to work you will need to set:

```js 
  {
    visibility: hidden
    opacity: 0  
  }
```


## 1.3. Animation Complete
```js 

  // recommend creating a function
  function returnToNormal() {
    TweenMax.to(toolBox, 1, {x: 0, y: 0,rotation: 0, alpha: 1, fontSize: '100%'});
  }
  
  TweenMax.to(toolBox, 1, {x: 250, y: 250,rotation: 90, alpha: 0.2, fontSize: '150%', onComplete: returnToNormal});

```


## 1.4. Delaying (Staggering)
```js 

  // recommend creating a function
  function returnToNormal() {
    TweenMax.to(toolBox, 1, {x: 0, y: 0,rotation: 0, alpha: 1, fontSize: '100%'});
  }
  
  var d = 1;
  TweenMax.to(toolBox, 1, {delay: d, x: 250, y: 250,rotation: 90, alpha: 0.2, fontSize: '150%', onComplete: returnToNormal});

  // another animation with stagger
  TweenMax.to(toolBox, 1, {delay: d+1, x: 250, y: 250,rotation: 90, alpha: 0.2, fontSize: '150%', onComplete: returnToNormal});

```

## 1.5. Timelines
> Requires `timeline lite`


### 1.5.1. Basic 
```js 
  // creating your first sequence
  let myTimeline = new TimelineLite();

  // adding to your timeline
  myTimeline.add(TweenMax.to(toolBox, 1, {delay: d+1, x: 250, y: 250,rotation: 90, alpha: 0.2, fontSize: '150%', onComplete: returnToNormal}));

  myTimeline.add(TweenMax.to(toolBox, 1, {delay: d+1, x: 250, y: 250,rotation: 90, alpha: 0.2, fontSize: '150%', onComplete: returnToNormal}));

```


### 1.5.2. Applying controls
```js
  let myButton = document.querySelector('#buttonId');

  myButton.on('click', function(){
    myTimeline.play();
  });

  // if you want your timeline to be displayed pause initially pass in options
  let myTimeline = new TimelineLite({paused: true});

```


### 1.5.3. Cleaner Syntax
```js

  let myTimeline = new TimelineMax();

  // myTimeline.to([element], [duration], {options}, [wait in s]);

  // Instead of using timeline.add() you can use .to()
  myTimeline.to(toolBox, 1, {delay: d+1, x: 250, y: 250,rotation: 90, alpha: 0.2, fontSize: '150%', onComplete: returnToNormal});
  myTimeline.to(toolBox, 1, {delay: d+1, x: 250, y: 250,rotation: 90, alpha: 0.2, fontSize: '150%', onComplete: returnToNormal});

```


## 1.6. More complex animations
```js
  // taking an array 
  // .tool is a class shared by multiple elements
  //  myTimeline.to('element', duration, {options}, stagger, timelinePosition);
  myTimeline.to('.tool', 1, {delay: d+1, x: 250, y: 250,rotation: 90, alpha: 0.2, fontSize: '150%', onComplete: returnToNormal} 0.2, 1);

```


## 1.7. Draggable 
```html
  <!-- Important to create a bounding box -->
  <div class="grid-box">
    <!-- Items to drag -->
    <!-- ensure they are position: relative -->
    <div class="box box1"></div>
    <div class="box box2"></div>
  </div>
```
```js

  let gridContainer = document.querySelector('.grid-box');
  // Be sure to include the draggable plugin
  Draggable.create(
    '.box',
    {
      bounds: gridContainer,
      edgeResistance: 0.2,
      throwProps: true
    }
  );

```





