(function(){
  var grid=document.getElementById('grid');
  if(grid){
    var btns=document.querySelectorAll('.filters .tab');
    var empty=document.getElementById('empty'),count=document.getElementById('count');
    function filtrar(f){
      var n=0;
      grid.querySelectorAll('.wcard').forEach(function(li){
        var ok=f==='all'||li.dataset.cats.split(' ').indexOf(f)>=0;
        li.hidden=!ok;if(ok)n++;
      });
      btns.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.f===f?'true':'false')});
      empty.hidden=n>0;
      if(count)count.textContent=n+' / '+grid.querySelectorAll('.wcard').length;
    }
    btns.forEach(function(b){b.addEventListener('click',function(){filtrar(b.dataset.f)})});
  }

  document.querySelectorAll('.stagebox').forEach(function(box){
    var tabs=box.querySelectorAll('.tab');
    tabs.forEach(function(b){b.addEventListener('click',function(){
      var i=+b.dataset.i;
      box.querySelectorAll('.st').forEach(function(s){s.hidden=(+s.dataset.i!==i)});
      tabs.forEach(function(x){x.setAttribute('aria-pressed',+x.dataset.i===i?'true':'false')});
    })});
  });

  var lb=document.getElementById('lb');
  if(lb&&lb.showModal){
    var items=Array.prototype.slice.call(document.querySelectorAll('.gbtn'));
    var img=document.getElementById('lbimg'),cap=document.getElementById('lbcap');
    var idx=0;
    function ver(i){
      idx=(i+items.length)%items.length;
      img.src=items[idx].dataset.full;img.alt=items[idx].dataset.alt;
      cap.textContent=(idx+1)+' / '+items.length+' · '+items[idx].dataset.alt;
    }
    items.forEach(function(b,i){b.addEventListener('click',function(){ver(i);lb.showModal();document.getElementById('lbclose').focus()})});
    document.getElementById('lbprev').addEventListener('click',function(){ver(idx-1)});
    document.getElementById('lbnext').addEventListener('click',function(){ver(idx+1)});
    document.getElementById('lbclose').addEventListener('click',function(){lb.close()});
    lb.addEventListener('keydown',function(e){
      if(e.key==='ArrowRight'){e.preventDefault();ver(idx+1)}
      if(e.key==='ArrowLeft'){e.preventDefault();ver(idx-1)}
    });
  }
})();
