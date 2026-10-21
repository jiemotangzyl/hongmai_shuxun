const $ = s => document.querySelector(s);
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pending = () => ''; 
const text = (value,label) => escapeHTML(value || pending(label));
const dialog = $('#detail');
let lastTrigger;
function photo(site,key,label){
 const src=site.images?.[key];
 return `<figure class="photo">${src ? `<a class="photo-link" href="${escapeHTML(src)}" target="_blank" rel="noopener noreferrer" aria-label="查看${escapeHTML(label)}大图"><img src="${escapeHTML(src)}" alt="${escapeHTML(site.image_captions?.[key] || site.site_name+' · '+label)}" loading="lazy"></a>` : `<div class="photo-box"><span class="photo-symbol" aria-hidden="true">▧</span><span>${label}待上传</span></div>`}<figcaption>${text(site.image_captions?.[key],label+'说明')}</figcaption></figure>`;
}
function openSite(id,trigger){
 const s=sites.find(site=>site.id===id);if(!s)return;lastTrigger=trigger;
 const fields=[['所在区','district'],['详细地址','address'],['采集方式','collection_type'],['采集日期','collection_date'],['主题关键词','theme']];
 const sources=(s.sources||[]).filter(source=>source.name||source.url);
 $('#detail-content').innerHTML=`<span class="detail-no">${s.id}</span><h2 id="detail-title">${escapeHTML(s.site_name)}</h2><p class="detail-owner">负责人：${escapeHTML(s.collector)}</p><p class="detail-tagline">${text(s.tagline,'一句话标题')}</p>${photo(s,'cover','封面图片')}<dl class="facts">${fields.map(([label,key])=>`<div class="fact"><dt>${label}</dt><dd>${text(key==='collection_type'?(s[key]||'实地采集＋资料整理'):s[key],label)}</dd></div>`).join('')}</dl>${[['地标简介','summary','80—120字地标简介'],['红色故事','story','180—250字红色故事'],[s.note_title||'我的寻迹发现','student_note','60—100字我的寻迹发现']].map(([label,key,hint])=>`<section class="detail-section ${key==='student_note'?'note':''}"><h3>${label}</h3><p class="${s[key]?'':'placeholder'}">${text(s[key],hint)}</p></section>`).join('')}<section class="detail-section"><h3>关键词标签</h3><div class="tags">${s.keywords?.length?s.keywords.map(t=>`<span class="tag">${escapeHTML(t)}</span>`).join(''):`<span class="tag">${pending('3—4个关键词')}</span>`}</div></section><section class="detail-section"><h3>寻迹影像</h3><div class="gallery">${Object.keys(s.images||{}).filter(key=>key!=='cover'&&s.images[key]).map(key=>photo(s,key,'寻迹影像')).join('')}</div></section><section class="detail-section"><h3>资料来源</h3>${sources.map((source,i)=>`<div class="source">${String(i+1).padStart(2,'0')} · ${escapeHTML(source.name||'')}<small>${escapeHTML(source.publisher||'')}</small>${/^https?:\/\//i.test(source.url||'')?`<a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">查看来源</a>`:''}</div>`).join('')}</section>`;
 $('#detail-content').querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{const box=document.createElement('div');box.className='photo-box';box.textContent='图片暂不可用，请检查图片路径';img.replaceWith(box)}));
 document.querySelectorAll('header,main,footer').forEach(el=>el.inert=true);document.body.style.overflow='hidden';dialog.hidden=false;document.getElementById("detail-overlay").hidden=false;dialog.scrollTop=0;$('#close-detail').focus();
}
function closeSite(){document.querySelectorAll('header,main,footer').forEach(el=>el.inert=false);dialog.hidden=true;document.getElementById("detail-overlay").hidden=true;document.body.style.overflow='';lastTrigger?.focus()}
$('#close-detail').addEventListener('click',closeSite);
let backdropStart = false;
dialog.addEventListener('pointerdown',e=>{const r=dialog.getBoundingClientRect();backdropStart=e.target===dialog && (e.clientX<r.left||e.clientX>r.right)});
dialog.addEventListener('click',e=>{if(backdropStart && e.target===dialog)closeSite();backdropStart=false});
dialog.addEventListener('close',()=>{document.body.style.overflow='';lastTrigger?.focus()});
$('#nodes').innerHTML=sites.map(s=>`<g class="node" role="button" tabindex="0" aria-label="${s.id} ${escapeHTML(s.site_name)}，负责人${escapeHTML(s.collector)}" data-id="${s.id}" transform="translate(${s.map_position.x} ${s.map_position.y})"><title>${s.site_name} · ${s.collector}</title><circle class="halo" r="18"/><circle class="ripple" r="12"/><circle class="pin" r="12"/><text y="1">${s.id}</text></g>`).join('');
$('#connections').setAttribute('d',sites.map((s,i)=>`${i?'L':'M'}${s.map_position.x} ${s.map_position.y}`).join(' '));
$('#map-list').innerHTML=sites.map(s=>`<button class="map-list-button" data-id="${s.id}"><span>${s.id}</span>${escapeHTML(s.site_name)}</button>`).join('');
$('#cards').innerHTML=sites.map(s=>`<article class="card"><div class="card-art ${s.images?.cover?'has-photo':''}">${s.images?.cover?`<img src="${escapeHTML(s.images.cover)}" alt="${escapeHTML(s.site_name)}封面" loading="lazy">`:''}<span class="card-number">${s.id}</span><small>SHANGHAI · 红色坐标</small></div><div class="card-content"><h3>${escapeHTML(s.site_name)}</h3><p class="collector">寻迹者 / ${escapeHTML(s.collector)}</p><p class="card-tagline">${escapeHTML(s.tagline||'寻迹内容正在采集中……')}</p><button data-id="${s.id}" aria-label="查看${escapeHTML(s.site_name)}寻迹">查看寻迹</button></div></article>`).join('');
document.querySelectorAll('[data-id]').forEach(el=>{el.addEventListener('click',()=>openSite(el.dataset.id,el));if(el.tagName.toLowerCase()==='g')el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openSite(el.dataset.id,el)}})});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');observer.unobserve(e.target)}}),{threshold:.06});document.querySelectorAll('.card,.member,.about').forEach(el=>{el.classList.add('reveal');observer.observe(el)})}


$('#detail-overlay').addEventListener('click',closeSite);
document.addEventListener('keydown',e=>{if(dialog.hidden)return;if(e.key==='Escape'){e.preventDefault();closeSite()}if(e.key==='Tab'){const focusable=Array.from(dialog.querySelectorAll('button,a[href]'));const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});


// 进度来自统一数据，后续补齐01号后自动同步。
const collected=sites.filter(s=>s.summary&&s.story&&s.images?.cover).length;
$('.status') && ($('.status').textContent=`已收录 ${collected} / ${sites.length} 处`);
$('.map-note') && ($('.map-note').textContent='沿着八处坐标，阅读上海的红色记忆。');
document.querySelectorAll('.card-art img').forEach(img=>img.addEventListener('error',()=>{img.parentElement.classList.remove('has-photo');img.remove()}));

// 首屏高度 = 视口高度 - 页头高度，保证封面恰好占满一屏
const setHeaderHeight=()=>document.documentElement.style.setProperty('--header-h',(document.querySelector('header')?.offsetHeight||86)+'px');
setHeaderHeight();addEventListener('resize',setHeaderHeight);


// 封面科技感：粒子网络、鼠标光斑、HUD 坐标读数、标题译码
(()=>{
 const hero=$('.hero'),cv=$('.hero-canvas');if(!hero||!cv)return;
 const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const ctx=cv.getContext('2d');let W=0,H=0,dpr=1,pts=[],visible=true,mouse={x:-999,y:-999};
 const size=()=>{dpr=Math.min(devicePixelRatio||1,2);W=hero.clientWidth;H=hero.clientHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
  const n=Math.min(90,Math.round(W*H/15000));pts=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.4+.6}))};
 const draw=()=>{ctx.clearRect(0,0,W,H);const L=130;
  for(const p of pts){if(!calm){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1}}
  for(let i=0;i<pts.length;i++){const a=pts[i];
   for(let j=i+1;j<pts.length;j++){const b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<L){ctx.strokeStyle=`rgba(239,201,140,${(1-d/L)*.28})`;ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}
   const dm=Math.hypot(a.x-mouse.x,a.y-mouse.y);if(dm<170){ctx.strokeStyle=`rgba(255,236,200,${(1-dm/170)*.6})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(mouse.x,mouse.y);ctx.stroke()}
   ctx.fillStyle='rgba(246,220,174,.8)';ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,6.283);ctx.fill()}};
 const loop=()=>{if(visible)draw();if(!calm)requestAnimationFrame(loop)};
 size();addEventListener('resize',size);draw();if(!calm)requestAnimationFrame(loop);
 if('IntersectionObserver' in window)new IntersectionObserver(e=>{visible=e[0].isIntersecting}).observe(hero);
 hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;hero.style.setProperty('--mx',mouse.x+'px');hero.style.setProperty('--my',mouse.y+'px')});
 hero.addEventListener('pointerleave',()=>{mouse.x=mouse.y=-999});
 if(calm)return;
 const lat=$('#hud-lat'),lon=$('#hud-lon');
 setInterval(()=>{if(!visible)return;lat&&(lat.textContent=(31.2304+Math.random()*.0009).toFixed(4)+'° N');lon&&(lon.textContent=(121.4737+Math.random()*.0009).toFixed(4)+'° E')},140);
 const eb=$('.hero .eyebrow');if(eb){const full=eb.textContent,glyphs='01<>/+—#$%&*',t0=performance.now()+350;
  const tick=now=>{const k=Math.max(0,(now-t0)/1500),n=Math.floor(k*full.length);
   eb.textContent=[...full].map((c,i)=>i<n||c===' '||c==='/'?c:glyphs[Math.floor(Math.random()*glyphs.length)]).join('');
   if(n<full.length)requestAnimationFrame(tick);else eb.textContent=full};requestAnimationFrame(tick)}
})();
