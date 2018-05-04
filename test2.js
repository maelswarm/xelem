let f = 'this should be before';
let c = 'hello';
let d = 'universe';let xelem1000 = document.createElement('div');xelem1000.setAttribute('class',c);xelem1000.setAttribute('id','world');xelem1000.innerHTML = `<div class="${c}" id="${d}">
      Hello Universe
    </div>`;
document.querySelector('.st0').appendChild(xelem1000);

c = 'hello';
d = 'universe';let xelem1001 = document.createElement('div');xelem1001.setAttribute('class',c);xelem1001.setAttribute('id','world');xelem1001.innerHTML = `<div class="${c}" id="${d}">
      Hello Universe
    </div>`;
document.querySelector('.st0').appendChild(xelem1001);

c = 'hello';
d = 'universe';let xelem1002 = document.createElement('div');xelem1002.setAttribute('class',c);xelem1002.setAttribute('id','world');xelem1002.innerHTML = `<div class="${c}" id="${d}">
      Hello Universe
    </div>`;
document.querySelector('.st0').appendChild(xelem1002);
