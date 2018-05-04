# xelem
Make HTML elements more easily in JS

Would you rather do this...
````js
let myClass = 'hello';
let elem = document.createElement('div');
elem.setAttribute('class', myClass);
elem.setAttribute('id', 'world');
elem.innerHTML = 'Hello World!';
document.querySelector('.st0').appendChild(elem);
````

Or this?

````js
let myClass = 'hello';
document.querySelector('.st0').appendChild({{
  <div class=%myClass% id="world">
    Hello World!
  </div>
}});
````
