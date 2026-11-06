(function(){
  var doc=document.documentElement;
  doc.classList.remove('no-js');
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var links=document.getElementById('menu');
  var openBtn=document.getElementById('menuOpen');
  var closeBtn=document.getElementById('menuClose');
  function setMenu(open){
    if(!links)return;
    links.classList.toggle('open',open);
    if(openBtn)openBtn.setAttribute('aria-expanded',open?'true':'false');
    if(open&&closeBtn)closeBtn.focus();
    if(!open&&openBtn)openBtn.focus();
  }
  if(openBtn)openBtn.addEventListener('click',function(){setMenu(true)});
  if(closeBtn)closeBtn.addEventListener('click',function(){setMenu(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&links&&links.classList.contains('open'))setMenu(false)});

  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('[data-ev]');
    if(!a)return;
    try{
      var l=JSON.parse(localStorage.getItem('cedra_ev')||'[]');
      l.push({e:a.getAttribute('data-ev'),d:new Date().toISOString().slice(0,10)});
      localStorage.setItem('cedra_ev',JSON.stringify(l));
    }catch(x){}
  },true);

  document.querySelectorAll('.ph img').forEach(function(img){
    if(img.complete&&img.naturalWidth>0)return;
    var ph=img.closest('.ph');
    ph.classList.add('loading');
    function fin(){ph.classList.remove('loading')}
    img.addEventListener('load',fin);
    img.addEventListener('error',fin);
  });

  var items=document.querySelectorAll('.rise');
  if(reduce||!('IntersectionObserver' in window)){
    items.forEach(function(el){el.classList.add('seen')});
  }else{
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('seen');io.unobserve(en.target)}});
    },{rootMargin:'0px 0px -8% 0px'});
    items.forEach(function(el){io.observe(el)});
  }
})();
