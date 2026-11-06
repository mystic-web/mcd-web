const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const I={phone:'<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1z"/></svg>',
wa:'<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1a14 14 0 0 1-5.5-4.8c-.5-.7-1.3-1.9-1.3-3s.6-1.6.8-1.8c.2-.2.4-.3.6-.3h.5c.2 0 .4 0 .5.4l.8 1.9c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6a8 8 0 0 0 2.4 2.2c.3.2.5.1.6-.1l.7-.9c.2-.2.3-.2.6-.1l1.8.9c.2.1.4.2.4.3.1.2.1.8-.1 1.4z"/></svg>',
pin:'<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>'};
let D,NO;
const wa=t=>'https://wa.me/'+NO+'?text='+encodeURIComponent(t),tel=()=>'tel:+'+NO;
const NAV=[['index.html','home','Home'],['services.html','services','Services'],['process.html','process','Process & FAQ'],['contact.html','contact','Contact']];
const header=()=>{const s=D.site,pg=document.body.dataset.page;return `<header class="theme-main-menu sticky-menu" id="top"><div class="hd">
<a class="brand" href="index.html" aria-label="${esc(s.name)}"><img class="logo" src="images/logo.png" alt="${esc(s.name)}" width="130" height="52"></a>
<button class="burger" id="burger" aria-label="Menu"><i></i></button>
<nav class="hd-nav" id="hdnav">${NAV.map(n=>`<a class="l${n[1]===pg?' on':''}" href="${n[0]}">${n[2]}</a>`).join('')}<a class="btn-x" href="${tel()}">${I.phone}Call ${esc(s.phone)}</a></nav></div></header>`};
const footer=()=>{const s=D.site,ar='<svg viewBox="0 0 24 24"><path d="M8.6 5.4 7.2 6.8 12.4 12l-5.2 5.2 1.4 1.4L15.2 12z"/></svg>';return `<footer class="ft"><div class="ft-line"></div><div class="ft-wrap">
<div class="ft-grid">
<div class="ft-col ft-brand"><a class="ft-logo" href="index.html" aria-label="${esc(s.name)}"><img src="images/logo.png" alt="${esc(s.name)}" width="180" height="72"></a>
<p>${esc(s.managed)} ${esc(s.tagline)}.</p>
<div class="ft-act"><a class="ft-btn" href="${tel()}">${I.phone}<span>${esc(s.phone)}</span></a><a class="ft-btn g" href="${wa('Hello '+s.name)}" target="_blank" rel="noopener">${I.wa}<span>WhatsApp</span></a></div></div>
<div class="ft-col"><h5>Quick links</h5><ul>${NAV.map(n=>`<li><a href="${n[0]}">${ar}${n[2]}</a></li>`).join('')}</ul></div>
<div class="ft-col"><h5>Our services</h5><ul>${D.services.map(x=>`<li><a href="services.html">${ar}${esc(x.title)}</a></li>`).join('')}</ul></div>
<div class="ft-col"><h5>Visit us</h5><ul class="ft-ct"><li>${I.pin}<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}" target="_blank" rel="noopener">${esc(s.address)}</a></li><li>${I.phone}<a href="${tel()}">${esc(s.phone)}</a></li><li>${I.wa}<a href="${wa('Hello '+s.name)}" target="_blank" rel="noopener">Chat on WhatsApp</a></li></ul></div>
</div>
<div class="ft-bot"><p>&copy; ${new Date().getFullYear()} ${esc(s.name)}. All rights reserved.</p><p class="ft-note">Private documentation service, not an official government website.</p><button type="button" class="ft-top" id="totop" aria-label="Back to top"><svg viewBox="0 0 24 24"><path d="M12 7.5 5.5 14l1.4 1.4L12 10.3l5.1 5.1 1.4-1.4z"/></svg></button></div>
</div></footer>
<div class="float"><a class="w" href="${wa('Hello '+s.name)}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a><a class="c" href="${tel()}" aria-label="Call">${I.phone}</a></div>`};
const SIMG=[['gpa','gpa-spa-will'],['registered','registered-rent'],['survivor','survivor-certificate'],['stamp','stamp-paper'],['gift','gift-deed'],['sale','sale-deed'],['rent','registered-rent'],['will','gpa-spa-will']];
const simg=t=>{t=String(t).toLowerCase();const m=SIMG.find(k=>t.includes(k[0]));return m?'images/services/'+m[1]+'.jpg':''};
const svc=(s,i)=>{const im=simg(s.title);return `<article class="svc${im?' has-img':''}">${im?`<div class="svc-img"><img src="${im}" alt="${esc(s.title)}" loading="lazy" width="628" height="429"></div>`:`<div class="dot c${i%6}">${esc((s.title[0]||'D').toUpperCase())}</div>`}<div class="svc-body"><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p><a class="btn-x wa sm" target="_blank" rel="noopener" href="${wa('Hello '+D.site.name+', I want to enquire about: '+s.title)}">${I.wa}Enquire on WhatsApp</a></div></article>`};
const stepsHtml=()=>`<div class="steps">${D.steps.map((s,i)=>`<div class="step"><i>${i+1}</i><b>${esc(s.t)}</b><span>${esc(s.d)}</span></div>`).join('')}</div>`;
const cta=()=>`<div class="fancy-short-banner-two mt-120"><div class="container"><div class="content-wrapper"><div class="bg-wrapper"><div class="row align-items-center"><div class="col-lg-8"><h2>Need a property document? Call us before you visit.</h2></div><div class="col-lg-4"><a class="cta" href="${tel()}">Call ${esc(D.site.phone)}</a></div></div></div></div></div></div>`;
const hero=(t,p)=>`<div class="page-hero ${p||''}"><div class="container"><h1>${t[0]}</h1><p>${t[1]}</p></div></div>`;
const pages={
home(){const [a,b,c]=D.slides,w=a.h.split(' '),last=w.pop();
const ck='<svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>';
const ws=a.h.split(' ');
return `<section class="hx"><div class="hx-bg"><i class="b1"></i><i class="b2"></i><i class="b3"></i></div><div class="container"><div class="hx-grid">
<div class="hx-text"><div class="hx-badge"><i></i>${esc(D.site.managed)}</div>
<h1 class="hx-h1">${ws.map((w,i)=>`<span class="w${i===ws.length-1?' hl':''}" style="--d:${(.15+i*.08).toFixed(2)}s">${esc(w)}</span>`).join(' ')}</h1>
<p class="hx-sub">${esc(a.p)}</p>
<ul class="hx-chips">${a.items.map((i,n)=>`<li style="--d:${(.9+n*.1).toFixed(2)}s">${ck}${esc(i)}</li>`).join('')}</ul>
<div class="hx-btns"><a class="btn-x" href="${tel()}">${I.phone}Call ${esc(D.site.phone)}</a><a class="btn-x wa pulse" target="_blank" rel="noopener" href="${wa(a.msg)}">${I.wa}WhatsApp us</a></div>
<div class="hx-loc">${I.pin}<span>${esc(D.site.tagline)}</span></div></div>
<div class="hx-vis" id="hxv" aria-hidden="true"><div class="ring r1"></div><div class="ring r2"></div>
<div class="hc c1" style="--k:14"><img src="images/services/sale-deed.jpg" alt=""><span>Sale Deed</span></div>
<div class="hc c2" style="--k:-18"><img src="images/services/stamp-paper.jpg" alt=""><span>Stamp Paper</span></div>
<div class="hc c3" style="--k:10"><img src="images/services/registered-rent.jpg" alt=""><span>Registered Rent Agreement</span></div>
<div class="hb ba" style="--k:-26">${ck}Same-day stamp paper</div><div class="hb bb" style="--k:22">${ck}Drafted correctly</div></div></div>
<div class="trust"><div><b>Retd. Sub-Registrar</b><span>Guidance from an experienced registration officer</span></div><div><b>Same-day stamp paper</b><span>Up to ₹1,00,000, delivered the same day</span></div><div><b><em data-count="${D.services.length}">${D.services.length}</em> core services</b><span>Deeds, agreements, wills and certificates</span></div></div></div></section>
<section class="sec"><div class="svc-wrap"><div class="container"><div class="title-style-twelve text-center"><div class="upper-title">What we do</div><h2>Documents we <span>prepare</span></h2><p>Pick a service and message us on WhatsApp in one tap.</p></div><div class="svc-grid">${D.services.map(svc).join('')}</div></div></div></section>
<section class="sec"><div class="container"><div class="feat"><div class="feat-t"><div class="title-style-twelve"><div class="upper-title">Fast service</div></div><h3>${esc(b.h)}</h3><p>${esc(b.p)}</p><a class="btn-x wa" target="_blank" rel="noopener" href="${wa(b.msg)}">${I.wa}Ask on WhatsApp</a></div><div class="feat-card"><ul>${b.items.map(i=>'<li>'+esc(i)+'</li>').join('')}</ul></div></div></div></section>
<section class="sec"><div class="container"><div class="feat rev"><div class="feat-t"><div class="title-style-twelve"><div class="upper-title">Also available</div></div><h3>${esc(c.h)}</h3><p>${esc(c.p)}</p><a class="btn-x" href="${tel()}">${I.phone}Call now</a></div><div class="feat-card b"><ul>${c.items.map(i=>'<li>'+esc(i)+'</li>').join('')}</ul></div></div></div></section>
<section class="sec"><div class="container"><div class="title-style-twelve text-center"><div class="upper-title">Working process</div><h2>Four simple <span>steps</span></h2></div>${stepsHtml()}</div></section>
<section class="sec"><div class="container"><div class="row"><div class="col-lg-8 m-auto"><div class="title-style-twelve text-center mb-30"><div class="upper-title">Notice board</div><h2>Latest <span>updates</span></h2></div><ul class="upd">${D.updates.map(u=>'<li>'+esc(u.text)+(u.new?'<span class="tag-new">NEW</span>':'')+'</li>').join('')}</ul></div></div></div></section>${cta()}`},
services(){return hero(['Our services','Everything for property paperwork, under one roof in Janak Puri.'])+`<section class="sec" style="padding-top:60px"><div class="container"><div class="svc-grid" style="margin-top:0">${D.services.map(svc).join('')}</div>
<div class="title-style-twelve mt-100 mb-30"><h2 style="font-size:38px">Documents <span>usually needed</span></h2></div><div class="scroll-x"><table class="tbl"><tr><th>Service</th><th>Commonly asked for</th></tr>${D.docs.map(d=>`<tr><td><b>${esc(d.s)}</b></td><td>${esc(d.d)}</td></tr>`).join('')}</table></div>
<p class="mt-20" style="font-size:15px">This list is indicative. Requirements differ by case, so please call before you visit.</p></div></section>${cta()}`},
process(){return hero(['How it works','Four steps from your first call to a signed document.'],'warm')+`<section class="sec" style="padding-top:50px"><div class="container">${stepsHtml()}
<div class="title-style-twelve text-center mt-100 mb-30"><div class="upper-title">FAQ</div><h2>Frequently asked <span>questions</span></h2></div><div class="row"><div class="col-lg-9 m-auto faq-classic">${D.faqs.map((f,i)=>`<div class="card"><div class="card-header"><button type="button" data-t="f${i}">${esc(f.q)}</button></div><div class="collapse${i===0?' show':''}" id="f${i}"><div class="card-body"><p>${esc(f.a)}</p></div></div></div>`).join('')}</div></div></div></section>${cta()}`},
contact(){const s=D.site;return hero(['Contact us','Call, WhatsApp or visit us. We reply fast.'],'mint')+`<section class="sec" style="padding-top:50px"><div class="container"><div class="ci">
<a href="${tel()}">${I.phone}<b>${esc(s.phone)}</b><span>Tap to call</span></a>
<a href="${wa('Hello '+s.name)}" target="_blank" rel="noopener">${I.wa}<b>WhatsApp</b><span>Chat with us</span></a>
<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}" target="_blank" rel="noopener">${I.pin}<b>Visit office</b><span>${esc(s.address)}</span></a></div>
<div class="row"><div class="col-lg-9 m-auto"><div class="form-style-light" style="background:#fff;border-radius:10px;box-shadow:0 10px 30px rgba(14,49,42,.07)"><h3 style="font-weight:800;font-size:30px;margin-bottom:30px">Send an enquiry</h3>
<form id="f" novalidate><div class="row"><div class="col-md-6"><div class="input-group-meta"><label for="n">Your name</label><input id="n" maxlength="80" autocomplete="name"><div class="msg-err" id="en"></div></div></div>
<div class="col-md-6"><div class="input-group-meta"><label for="m">Mobile number</label><input id="m" inputmode="tel" placeholder="10-digit number" autocomplete="tel"><div class="msg-err" id="em"></div></div></div>
<div class="col-12"><div class="input-group-meta"><label for="sv">Service needed</label><select id="sv">${D.services.map(x=>'<option>'+esc(x.title)+'</option>').join('')}</select></div></div>
<div class="col-12"><div class="input-group-meta lg"><label for="t">Message (optional)</label><textarea id="t" maxlength="500"></textarea></div></div></div>
<button class="btn-x wa" type="submit">${I.wa}Send enquiry</button><div class="msg-ok" id="ok"></div></form></div></div></div></div></section>`}};
function wire(){
 const hd=document.getElementById('top'),sc=()=>hd.classList.toggle('fixed',scrollY>20);addEventListener('scroll',sc);sc();
 const b=document.getElementById('burger'),n=document.getElementById('hdnav');b.onclick=()=>{b.classList.toggle('open');n.classList.toggle('open')};
 document.querySelectorAll('[data-t]').forEach(x=>x.onclick=()=>{const t=document.getElementById(x.dataset.t),o=t.classList.contains('show');document.querySelectorAll('.faq-classic .collapse').forEach(c=>c.classList.remove('show'));if(!o)t.classList.add('show')});

 const tt=document.getElementById('totop');if(tt)tt.onclick=()=>scrollTo({top:0,behavior:'smooth'});
 // scroll reveal
 const rv=[...document.querySelectorAll('.ft-col,.svc,.step,.feat,.title-style-twelve,.upd li,.trust>div,.tbl,.ci a,.faq-classic .card,.fancy-short-banner-two')];
 rv.forEach((e,i)=>{e.classList.add('reveal');e.style.setProperty('--rd',(i%3)*.09+'s')});
 if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});rv.forEach(e=>io.observe(e))}else rv.forEach(e=>e.classList.add('in'));
 // hero parallax
 const hx=document.querySelector('.hx'),hv=document.getElementById('hxv');
 if(hx&&hv&&matchMedia('(hover:hover)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){hx.addEventListener('pointermove',e=>{const r=hx.getBoundingClientRect();hv.style.setProperty('--px',((e.clientX-r.left)/r.width-.5).toFixed(3));hv.style.setProperty('--py',((e.clientY-r.top)/r.height-.5).toFixed(3))});hx.addEventListener('pointerleave',()=>{hv.style.setProperty('--px',0);hv.style.setProperty('--py',0)})}
 const f=document.getElementById('f');
 if(f)f.addEventListener('submit',async e=>{e.preventDefault();
  const n=f.n.value.trim(),m=f.m.value.replace(/\D/g,'').slice(-10),ok=/^[6-9]\d{9}$/.test(m),sv=f.sv.value,msg=f.t.value.trim();
  document.getElementById('en').textContent=n?'':'Enter your name.';document.getElementById('em').textContent=ok?'':'Enter a valid 10-digit mobile number.';
  if(!n||!ok)return;
  try{await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n,mobile:m,service:sv,message:msg})})}catch(_){}
  let t='Hello '+D.site.name+',\nName: '+n+'\nMobile: '+m+'\nService: '+sv;if(msg)t+='\nMessage: '+msg;
  window.open(wa(t),'_blank','noopener');document.getElementById('ok').textContent='Thank you. Your enquiry has been recorded.';f.reset()});
}
fetch('/api/data').then(r=>r.json()).then(d=>{D=d;NO=D.site.whatsapp;
 document.getElementById('hdr').innerHTML=header();document.getElementById('main').innerHTML=pages[document.body.dataset.page]();
 document.getElementById('ftr').innerHTML=footer();wire()}).catch(()=>{document.getElementById('main').innerHTML='<div class="container" style="padding:80px 15px"><h2>Unable to load.</h2><p>Please call 98732 48111.</p></div>'});
