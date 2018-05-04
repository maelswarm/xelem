# xelem
Make HTML elements more easily in JS

Would you rather do this...
````js
let elem = document.createElement('div');
elem.setAttribute('class','hello');
elem.setAttribute('id','world');
elem.innerHTML = 'Hello World!';
document.querySelector('.st0').appendChild(elem);
````

Or this?

````js
document.querySelector('.st0').appendChild({{
  <div class="hello" id="world">
    Hello World!
  </div>
}});
````
