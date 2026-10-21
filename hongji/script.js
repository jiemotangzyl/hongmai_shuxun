const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const youth = [
  {img:'statues-close', cap:'群雕特写：从长衫与神情里读初代革命者', t:'代表群雕里的年轻面孔',
   hist:'出席一大的13名代表，大多只有二三十岁，平均年龄约28岁。',
   feel:'站在群雕前我下意识数了一遍，十三个人，差不多就是我们团支部的规模。他们当年的岁数，离我现在也就几年。那一刻我才觉得，“建党”不只是课本里的一个词，而是一群年轻人在一间屋子里做的决定。',
   kw:['年轻','勇气','开始'], say:'原来大事都是从“我先来”开始的，我也该少等一点，多做一点。'},
  {img:'lidazhao', cap:'李大钊像与题词：“试看将来的环球，必是赤旗的世界。”', t:'李大钊像前的那句题词',
   hist:'李大钊是中国共产主义运动的先驱，通过文章向青年传播马克思主义，与陈独秀共同推动建党。',
   feel:'“试看将来的环球，必是赤旗的世界”，我在像前读了三遍。它写在一百多年前，却一点不显得遥远，有一种很笃定的乐观。我们平时刷到的“焦虑”“内卷”，在这句话面前忽然显得很小。',
   kw:['笃定','远见'], say:'对未来有判断，才有不慌的底气，我也要先把自己的方向想清楚。'},
  {img:'table-close', cap:'茶具特写：定格会议现场的细节', t:'会议桌上的那套茶具',
   hist:'1921年7月，一大在石库门住宅里召开；7月30日夜，会场遭巡捕搜查，会议被迫中断。',
   feel:'桌上的茶杯摆得整整齐齐，像刚有人起身离开。大家都在拍大场面，我却被这一小桌茶具“困住”了：原来改变历史的会议，也就是一张桌子、几只杯子、一群人压低声音的讨论。',
   kw:['日常','紧张','真实'], say:'我开始相信历史就藏在普通的细节里，我也要学着多看细节。'},
  {img:'xinqingnian', cap:'《新青年》杂志封面，新思想传播的阵地', t:'《新青年》封面上的“青年”',
   hist:'《新青年》由陈独秀1915年创办，是新文化运动的主要阵地，传播民主、科学和马克思主义。',
   feel:'封面上“青年”两个字特别大。对我们这代人来说，表达靠的是各种平台；他们当年靠一本杂志，就把思想传了出去。我在想，我们今天发出去的每一条内容，会不会也是另一种“新青年”。',
   kw:['青年','表达','传播'], say:'我们手里的话筒比他们大得多，所以我要先想清楚自己想说什么。'},
  {img:'film-boat', cap:'环幕画面：南湖红船', t:'环幕里那条安静的小船',
   hist:'8月初，大会最后一天的会议转移到嘉兴南湖的一艘游船上，这艘船后来被称为“红船”。',
   feel:'环幕上的小船特别安静，水面很平。谁能想到，一个后来领导亿万人民的政党，是在这样一条船上完成诞生的？“小”和“大”的反差，让我起了一身鸡皮疙瘩。',
   kw:['反差','初心','出发'], say:'出发的地方可以很小，我也要从眼前这件小事做起，朝大方向走。'},
  {img:'leaflets', cap:'五四时期的传单与文献，可见“中国危亡”字样', t:'传单上的“中国危亡”',
   hist:'1919年五四运动中，青年学生走上街头，喊出“外争主权，内除国贼”。',
   feel:'传单上“中国危亡”四个字写得又硬又急。你能感觉到写它的人是真的着急，他们不是在写作业，是在喊。我们现在遇到的“急”，大多是deadline；他们的急，是整个国家。',
   kw:['危机感','行动','担当'], say:'看见问题只是第一步，我想成为那个站出来的人。'},
  {img:'wall-b', cap:'文献墙局部：红色底色上的史料层层叠叠', t:'一整面墙的史料',
   hist:'展厅用层叠悬挂的方式，呈现了大量建党时期的文献史料。',
   feel:'抬头是一整面墙的纸，红底金字，像一片安静的森林。每一张纸背后，都是一个具体的人在某一天写下的话。我拍了很多张，才发现根本拍不下它的密度。',
   kw:['密度','史料','敬畏'], say:'尊重历史，从我愿意低头一页页读开始。'},
  {img:'gate', cap:'黄陂南路374号的拱形门楼', t:'石库门里定下的初心',
   hist:'一大会址位于兴业路76号（原望志路106号），是典型的石库门民居。1921年，十几位年轻人就在这样的屋子里开启了建党大业。',
   feel:'站在石库门前，我想的不是它有多老，而是它有多普通：没有殿堂，只有几间屋子、十几个年轻人，却把“为中国人民谋幸福、为中华民族谋复兴”的初心定了下来。条件越简陋，越显得信仰有分量。',
   kw:['初心','理想','担当'], say:'理想不需要大舞台，我也要从身边的小事开始践行初心。'}
];
const names = ['程心宇', '张滢琳', '项宇泽', '黄宇豪', '左浩雨', '潘泺棂', '缪奕秋', '王韵清'];
$('#bubbles').innerHTML = youth.map((y, i) => {
  const n = String(i + 1).padStart(2, '0');
  return `<article class="bubble"><button class="avatar" data-lb data-cap="${esc(y.cap)}" aria-label="查看大图：${esc(y.t)}"><img src="images/${y.img}.jpg" alt="${esc(y.cap)}" loading="lazy"></button><span class="b-no">${n}</span><h3>${esc(y.t)}</h3><p class="b-hist">${esc(y.hist)}</p><p class="b-feel"><small>我的感悟</small>${esc(y.feel)}</p><div class="kw">${y.kw.map(k => `<span>${esc(k)}</span>`).join('')}</div><p class="b-say"><small>我的行动</small>${esc(y.say)}</p><span class="b-by">—— ${esc(names[i])}</span></article>`;
}).join('');

// 灯箱：在同一章节内的所有 [data-lb] 之间切换
const lb = $('#lightbox'), lbImg = $('img', lb), lbCap = $('figcaption', lb);
let list = [], current = 0, lastFocus;
function show(i) {
  current = (i + list.length) % list.length;
  const el = list[current], img = $('img', el);
  lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt;
  lbCap.textContent = `${current + 1} / ${list.length}　${el.dataset.cap || img.alt}`;
}
function openLb(el) {
  lastFocus = el;
  list = $$('[data-lb]', el.closest('section'));
  show(list.indexOf(el)); lb.hidden = false; document.body.style.overflow = 'hidden'; $('.lb-close', lb).focus();
}
function closeLb() { lb.hidden = true; document.body.style.overflow = ''; lastFocus?.focus(); }
document.addEventListener('click', e => { const b = e.target.closest('[data-lb]'); if (b) openLb(b); });
$('.lb-close', lb).addEventListener('click', closeLb);
$('.prev', lb).addEventListener('click', () => show(current - 1));
$('.next', lb).addEventListener('click', () => show(current + 1));
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') closeLb();
  else if (e.key === 'ArrowLeft') show(current - 1);
  else if (e.key === 'ArrowRight') show(current + 1);
});

// 滚动：顶栏变实、章节高亮、内容渐显
const bar = $('.top');
const links = $$('.top nav a');
const secs = links.map(a => $(a.getAttribute('href')));
const onScroll = () => {
  bar.classList.toggle('solid', scrollY > 60);
  let cur = 0; secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * .45) cur = i; });
  links.forEach((a, i) => a.classList.toggle('on', i === cur));
};
addEventListener('scroll', onScroll, {passive: true}); onScroll();

// 背景：红旗飘带、红星、上海天际线。每个章节各带一层，随页面一起滚动。
const wave = (y, amp) => { let d = `M0 ${y}`; for (let x = 0; x < 3200; x += 800) d += `C${x + 200} ${y - amp} ${x + 600} ${y + amp} ${x + 800} ${y}`; return d; };
const ribbon = (cls, y, amp, col) => `<svg class="fx-rib ${cls}" viewBox="0 0 3200 400" preserveAspectRatio="none"><defs><linearGradient id="g-${cls}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col}" stop-opacity=".13"/><stop offset=".55" stop-color="${col}" stop-opacity=".05"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></linearGradient></defs><path class="fill" fill="url(#g-${cls})" d="${wave(y, amp)}V400H0Z"/><path class="edge" d="${wave(y, amp)}"/></svg>`;
const star = cls => `<svg class="fx-star ${cls}" viewBox="0 0 24 24"><polygon points="12,2 14.9,8.6 22,9.3 16.6,14 18.2,21 12,17.3 5.8,21 7.4,14 2,9.3 9.1,8.6"/></svg>`;
const sky = '<svg class="fx-sky" viewBox="30 80 880 400" preserveAspectRatio="xMidYMax meet"><path d="M40 470H125V398H155V357H204V398H241V443H279V330H312V307H348V455H395V380H421V286H430V269H443V139L452 90L461 139V269H474V286H483V380H507V450H545V213L577 175L606 213V450H638V169L660 91L682 169V450H706V248L736 234L767 248V450H819V372H859V470H895"/><circle cx="452" cy="272" r="29"/><ellipse cx="452" cy="375" rx="39" ry="13"/><circle class="glow" cx="452" cy="272" r="5"/><circle class="glow" cx="452" cy="98" r="3"/></svg>';
const fxHTML = ribbon('r1', 170, 70, '#d4473a') + ribbon('r3', 170, 60, '#d9b27c') + ['s1', 's3'].map(star).join('');
$$('.hero, .block').forEach(sec => {
  const d = document.createElement('div');
  d.className = 'fx'; d.setAttribute('aria-hidden', 'true'); d.innerHTML = fxHTML + (sec.id === 'top' || sec.id === 'youth' ? sky : '');
  sec.appendChild(d);
});
