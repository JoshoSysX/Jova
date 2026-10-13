const dialog = document.getElementById('essence-dialog');
document.getElementById('open-essence').addEventListener('click', () => dialog.showModal());
document.getElementById('close-essence').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
});
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const hero = document.querySelector('.hero');
  if (hero.animate) hero.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:800,easing:'ease-out'});
}

// Actualiza el año de derechos reservados según la fecha en Perú.
document.getElementById('copyright-year').textContent = new Intl.DateTimeFormat('es-PE', {year:'numeric',timeZone:'America/Lima'}).format(new Date());

// Reutiliza la animación preparada; progreso fijo del 35 % sin número visible.
(() => {
 const container=document.querySelector('.construction');
 function positionShepherd(){const tip=container.querySelector('.scene').clientWidth*.35;container.querySelector('.lead-pastor').style.left=tip+'px';container.querySelector('.sheep-window').style.width=Math.max(0,tip-24)+'px';}
 new ResizeObserver(positionShepherd).observe(container);
 positionShepherd();
  const poseTemplates={normal:document.getElementById('walking-sheep').innerHTML,head:document.getElementById('head-sheep').innerHTML,jump:'<use href="#original-sheep"/>'};
  function applyPose(sheep,name){const old=sheep.querySelector('.pose-art');const group=document.createElementNS('http://www.w3.org/2000/svg','g');group.setAttribute('class','pose-art');group.innerHTML=poseTemplates[name];old.replaceWith(group);}
  document.querySelectorAll('.sheep-sprite').forEach((sheep,i)=>{applyPose(sheep,'normal');const gait=.72+(i%4)*.04;sheep.style.setProperty('--gait',gait+'s');sheep.style.setProperty('--half',gait/2+'s');sheep.style.setProperty('--phase',(-i*.13)+'s');});
  const poses={normal:'315 123 101 111',head:'205 117 96 106',jump:'82 107 107 118'};
  document.querySelectorAll('[data-sheep]').forEach(sheep=>{
    const hop=document.getElementById('hop-'+sheep.dataset.sheep);
    let singleTimer,resetTimer;
    function pose(name){clearTimeout(resetTimer);hop.classList.remove('jumping','nodding');sheep.setAttribute('viewBox',poses[name]);applyPose(sheep,name);void hop.getBoundingClientRect();hop.classList.add(name==='jump'?'jumping':'nodding');resetTimer=setTimeout(()=>{hop.classList.remove('jumping','nodding');sheep.setAttribute('viewBox',poses.normal);applyPose(sheep,'normal');},name==='jump'?850:1300);}
    sheep.addEventListener('click',()=>{clearTimeout(singleTimer);singleTimer=setTimeout(()=>pose('head'),260);});
    sheep.addEventListener('dblclick',event=>{event.preventDefault();clearTimeout(singleTimer);pose('jump');});
    sheep.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();pose(event.shiftKey?'jump':'head');}});
  });

})();
