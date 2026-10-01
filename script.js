const $ = s => document.querySelector(s);
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pending = label => `【待成员填写：${label}】`;
const text = (value,label) => escapeHTML(value || pending(label));
const dialog = $('#detail');
let lastTrigger;
function photo(site,key,label){
 const src=site.images?.[key];
 return `<figure class="photo">${src ? `<img src="${escapeHTML(src)}" alt="${escapeHTML(site.image_captions?.[key] || site.site_name+' · '+label)}" loading="lazy">` : `<div class="photo-box"><span class="photo-symbol" aria-hidden="true">▧</span><span>${label}待上传</span></div>`}<figcaption>${text(site.image_captions?.[key],label+'说明')}</figcaption></figure>`;
}
function openSite(id,trigger){
 const s=sites.find(site=>site.id===id);if(!s)return;lastTrigger=trigger;
 const fields=[['所在区','district'],['详细地址','address'],['采集方式','collection_type'],['采集日期','collection_date'],['主题关键词','theme']];
 const sources=[...(s.sources||[])];while(sources.length<2)sources.push({});
 $('#detail-content').innerHTML=`<span class="detail-no">${s.id}</span><h2 id="detail-title">${escapeHTML(s.site_name)}</h2><p class="detail-owner">负责人：${escapeHTML(s.collector)}</p><p class="detail-tagline">${text(s.tagline,'一句话标题')}</p>${photo(s,'cover','封面图片')}<dl class="facts">${fields.map(([label,key])=>`<div class="fact"><dt>${label}</dt><dd>${text(s[key],label)}</dd></div>`).join('')}</dl>${[['地标简介','summary','80—120字地标简介'],['红色故事','story','180—250字红色故事'],['我的寻迹发现','student_note','60—100字我的寻迹发现']].map(([label,key,hint])=>`<section class="detail-section ${key==='student_note'?'note':''}"><h3>${label}</h3><p class="${s[key]?'':'placeholder'}">${text(s[key],hint)}</p></section>`).join('')}<section class="detail-section"><h3>关键词标签</h3><div class="tags">${s.keywords?.length?s.keywords.map(t=>`<span class="tag">${escapeHTML(t)}</span>`).join(''):`<span class="tag">${pending('3—4个关键词')}</span>`}</div></section><section class="detail-section"><h3>寻迹影像</h3><div class="gallery">${photo(s,'building','建筑/场馆图片')}${photo(s,'detail','展品/细节图片')}${photo(s,'visit','寻迹过程图片')}</div></section><section class="detail-section"><h3>资料来源</h3>${sources.map((source,i)=>`<div class="source">${String(i+1).padStart(2,'0')} · ${escapeHTML(source.name||'资料来源待成员补充')}<small>${escapeHTML(source.publisher||'发布机构待成员补充')}</small>${/^https?:\/\//i.test(source.url||'')?`<a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">查看来源</a>`:'<small>来源链接待成员补充</small>'}</div>`).join('')}</section>`;
 $('#detail-content').querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{const box=document.createElement('div');box.className='photo-box';box.textContent='图片暂不可用，请检查图片路径';img.replaceWith(box)}));
 document.body.style.overflow='hidden';dialog.hidden=false;document.getElementById("detail-overlay").hidden=false;dialog.scrollTop=0;$('#close-detail').focus();
}
function closeSite(){dialog.hidden=true;document.getElementById("detail-overlay").hidden=true;document.body.style.overflow='';lastTrigger?.focus()}
$('#close-detail').addEventListener('click',closeSite);
let backdropStart = false;
dialog.addEventListener('pointerdown',e=>{const r=dialog.getBoundingClientRect();backdropStart=e.target===dialog && (e.clientX<r.left||e.clientX>r.right)});
dialog.addEventListener('click',e=>{if(backdropStart && e.target===dialog)closeSite();backdropStart=false});
dialog.addEventListener('close',()=>{document.body.style.overflow='';lastTrigger?.focus()});
$('#nodes').innerHTML=sites.map(s=>`<g class="node" role="button" tabindex="0" aria-label="${s.id} ${escapeHTML(s.site_name)}，负责人${escapeHTML(s.collector)}" data-id="${s.id}" transform="translate(${s.map_position.x} ${s.map_position.y})"><title>${s.site_name} · ${s.collector}</title><circle class="halo" r="25"/><circle class="pin" r="17"/><text y="1">${s.id}</text></g>`).join('');
$('#connections').setAttribute('d',sites.map((s,i)=>`${i?'L':'M'}${s.map_position.x} ${s.map_position.y}`).join(' '));
$('#map-list').innerHTML=sites.map(s=>`<button class="map-list-button" data-id="${s.id}"><span>${s.id}</span>${escapeHTML(s.site_name)}</button>`).join('');
$('#cards').innerHTML=sites.map(s=>`<article class="card"><div class="card-art"><span class="card-number">${s.id}</span><small>SHANGHAI · 红色坐标</small></div><div class="card-content"><h3>${escapeHTML(s.site_name)}</h3><p class="collector">寻迹者 / ${escapeHTML(s.collector)}</p><p class="card-tagline">${escapeHTML(s.tagline||'寻迹内容正在采集中……')}</p><button data-id="${s.id}" aria-label="查看${escapeHTML(s.site_name)}寻迹">查看寻迹</button></div></article>`).join('');
$('#team-grid').innerHTML=sites.map(s=>`<article class="member"><span class="avatar">${s.id}</span><div><h3>${escapeHTML(s.collector)}</h3><p>${escapeHTML(s.site_name)}</p></div></article>`).join('');
document.querySelectorAll('[data-id]').forEach(el=>{el.addEventListener('click',()=>openSite(el.dataset.id,el));if(el.tagName.toLowerCase()==='g')el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openSite(el.dataset.id,el)}})});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');observer.unobserve(e.target)}}),{threshold:.06});document.querySelectorAll('.card,.member,.about').forEach(el=>{el.classList.add('reveal');observer.observe(el)})}


$('#detail-overlay').addEventListener('click',closeSite);
document.addEventListener('keydown',e=>{if(dialog.hidden)return;if(e.key==='Escape'){e.preventDefault();closeSite()}if(e.key==='Tab'){const focusable=Array.from(dialog.querySelectorAll('button,a[href]'));const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});

