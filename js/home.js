(function(){
  var c3=document.getElementById('cmp3'),r3=document.getElementById('cmp3r');
  if(c3&&r3){r3.addEventListener('input',function(){c3.style.setProperty('--x',r3.value+'%')})}
  var stage=document.getElementById('stage');
  var tabs=document.querySelectorAll('.tabs .tab');
  function show(i){
    if(!stage)return;
    stage.querySelectorAll('.st').forEach(function(s){s.hidden=(+s.dataset.i!==i)});
    tabs.forEach(function(b){b.setAttribute('aria-pressed',+b.dataset.i===i?'true':'false')});
  }
  tabs.forEach(function(b){b.addEventListener('click',function(){show(+b.dataset.i)})});
})();
