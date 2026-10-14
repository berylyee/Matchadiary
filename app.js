(() => {
  const entries = Array.isArray(window.MATCHA_ENTRIES) ? window.MATCHA_ENTRIES.slice() : [];
  const $ = (id) => document.getElementById(id);
  const search = $('search'), grid = $('entry-grid'), empty = $('empty-state'), filters = $('source-filters');
  let activeSource = 'all';
  const esc = (s='') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const prettyDate = d => { if (!d) return 'Date not recorded'; const date = new Date(`${d}T12:00:00`); return Number.isNaN(date.getTime()) ? d : date.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}).toUpperCase(); };
  const shortDate = d => { if (!d) return 'DATE NOT RECORDED'; const date = new Date(`${d}T12:00:00`); return Number.isNaN(date.getTime()) ? d : date.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}).toUpperCase(); };
  const num = (v, fallback=0) => Number.isFinite(Number(v)) ? Number(v) : fallback;
  const mean = vals => vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : 0;
  const unique = vals => [...new Set(vals.filter(Boolean))];
  function botanicalArt(seed=0, large=false) {
    const leaves = [
      '<path d="M115 145C150 96 182 66 238 38M145 112C113 102 102 80 112 58c24 9 36 27 33 54ZM174 83C172 55 192 37 215 40c-2 24-16 38-41 43ZM202 62c10-23 32-27 49-14-10 20-27 26-49 14Z"/>',
      '<path d="M110 145C135 108 166 76 220 42M134 115C104 110 89 88 97 67c23 7 36 23 37 48ZM165 84C160 59 178 42 200 42c1 23-12 38-35 42ZM192 62c10-22 31-29 49-17-9 21-26 28-49 17Z"/>',
      '<path d="M122 145C155 103 182 73 235 45M151 115C121 108 108 87 118 65c23 9 35 26 33 50ZM181 87C177 62 196 44 218 47c-2 23-16 38-37 40ZM207 67c10-21 32-25 48-12-10 20-27 24-48 12Z"/>'
    ];
    const leaf = leaves[Math.abs(seed)%leaves.length];
    return `<svg viewBox="0 0 340 210" role="img" aria-label="Botanical matcha illustration" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#70845c" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" opacity=".9">${leaf}</g><circle cx="257" cy="48" r="25" fill="#d8cba9" opacity=".65"/><ellipse cx="176" cy="172" rx="86" ry="12" fill="#cfd5bc" opacity=".8"/><path d="M97 114c4 42 27 69 79 69s75-27 79-69" fill="#d1c5a5" stroke="#6c7855" stroke-width="1.7"/><ellipse cx="176" cy="114" rx="79" ry="27" fill="#fffbed" stroke="#6c7855" stroke-width="1.7"/><ellipse cx="176" cy="114" rx="61" ry="18" fill="#81975f"/><path d="M130 114c23-13 45-14 67-5 12 5 23 4 34-2" fill="none" stroke="#c4d0a1" stroke-width="2" stroke-linecap="round"/><g transform="translate(260 91) rotate(25)"><rect x="-4" y="-39" width="8" height="70" rx="4" fill="#c6a578" stroke="#94784e" stroke-width="1"/><path d="M-3 20Q-20 43-16 56M-1 22Q-10 43-7 58M1 22Q7 44 4 58M3 20Q19 41 16 54" fill="none" stroke="#a98b5e" stroke-width="1.5"/></g><g fill="#89996e" opacity=".65"><circle cx="69" cy="151" r="2"/><circle cx="283" cy="160" r="2.5"/><circle cx="82" cy="88" r="1.8"/></g></svg>`;
  }
  function sourceName(entry) { return entry.purchasedFrom || 'Source not recorded'; }
  function radarChart(scores) {
    const axes = [
      { label: 'Umami', key: 'umami', angle: -90 },
      { label: 'Sweetness', key: 'sweetness', angle: -18 },
      { label: 'Bitterness', key: 'bitterness', angle: 54 },
      { label: 'Astringency', key: 'astringency', angle: 126 },
      { label: 'Body', key: 'body', angle: 198 }
    ];
    const cx = 160, cy = 145, radius = 82;
    const point = (angle, value) => {
      const r = radius * value / 5, rad = angle * Math.PI / 180;
      return `${(cx + Math.cos(rad) * r).toFixed(2)},${(cy + Math.sin(rad) * r).toFixed(2)}`;
    };
    const grid = [1,2,3,4,5].map(level => `<polygon points="${axes.map(a=>point(a.angle,level)).join(' ')}" class="radar-grid radar-grid-${level}" />`).join('');
    const spokes = axes.map(a=>`<line x1="${cx}" y1="${cy}" x2="${point(a.angle,5)}" class="radar-spoke" />`).join('');
    const complete = axes.every(a => Number.isFinite(Number(scores[a.key])) && Number(scores[a.key]) >= 1 && Number(scores[a.key]) <= 5);
    const shape = complete ? `<polygon points="${axes.map(a=>point(a.angle,Number(scores[a.key]))).join(' ')}" class="radar-shape" />${axes.map(a=>{const [x,y]=point(a.angle,Number(scores[a.key])).split(',');return `<circle cx="${x}" cy="${y}" r="4" class="radar-point" />`;}).join('')}` : '';
    const labels = [
      { text: 'UMAMI', x: 160, y: 47, anchor: 'middle' },
      { text: 'SWEETNESS', x: 248, y: 108, anchor: 'start' },
      { text: 'BITTERNESS', x: 218, y: 240, anchor: 'middle' },
      { text: 'ASTRINGENCY', x: 102, y: 240, anchor: 'middle' },
      { text: 'BODY', x: 72, y: 108, anchor: 'end' }
    ].map(l=>`<text x="${l.x}" y="${l.y}" text-anchor="${l.anchor}" class="radar-label">${l.text}</text>`).join('');
    return `<svg class="radar-svg" viewBox="0 0 320 290" role="img" aria-label="Five-axis flavour profile, scored from one to five"><g>${grid}${spokes}${shape}</g>${labels}${complete?'':`<text x="160" y="142" text-anchor="middle" class="radar-empty">Complete all five</text><text x="160" y="157" text-anchor="middle" class="radar-empty">scores to show profile</text>`}</svg>`;
  }
  function buildFilters() {
    const sources = unique(entries.map(e=>e.purchasedFrom)).sort((a,b)=>a.localeCompare(b));
    filters.innerHTML = `<button class="chip ${activeSource==='all'?'active':''}" data-source="all">All entries</button>` + sources.map(s=>`<button class="chip ${activeSource===s?'active':''}" data-source="${esc(s)}">${esc(s)}</button>`).join('');
    filters.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{activeSource=b.dataset.source;buildFilters();renderEntries();}));
  }
  function matches(entry, q) {
    const searchable = [entry.name,entry.purchasedFrom,entry.location,entry.dateTasted,entry.style,entry.notesSummary,entry.thoughts,...(entry.tastingNotes||[]),...(entry.personalTags||[])].join(' ').toLowerCase();
    return searchable.includes(q);
  }
  function visibleEntries() {
    const q = search.value.trim().toLowerCase();
    const sort = $('sort').value;
    return entries.filter(e=>(activeSource==='all'||e.purchasedFrom===activeSource)&&matches(e,q)).sort((a,b)=>{
      if(sort==='oldest') return (a.dateTasted||'').localeCompare(b.dateTasted||'');
      if(sort==='rating') return num(b.enjoyment)-num(a.enjoyment);
      if(sort==='name') return (a.name||'').localeCompare(b.name||'');
      return (b.dateTasted||'').localeCompare(a.dateTasted||'');
    });
  }
  function renderEntries() {
    const list=visibleEntries();
    $('results-count').textContent=`${list.length} ${list.length===1?'tasting':'tastings'}`;
    grid.innerHTML=list.map((e,i)=>`<article class="entry-card" tabindex="0" role="button" aria-label="Read ${esc(e.name)} tasting entry" data-id="${esc(e.id)}"><div class="card-art">${botanicalArt(i)}<span class="art-label">A MATCHA NOTE</span><span class="art-no">${esc((e.style||'TASTING').toUpperCase())}</span></div><div class="card-body"><div class="card-meta"><span>${esc(shortDate(e.dateTasted))}</span><span>${esc(e.location||'')}</span></div><h3 class="card-title">${esc(e.name)}</h3><p class="card-shop">Purchased at ${esc(sourceName(e))}</p><p class="card-notes">${esc(e.notesSummary||((e.tastingNotes||[]).slice(0,4).join(' · '))||'Tasting notes to come.')}</p><div class="card-bottom"><span class="rating"><span class="rating-star">★</span><strong>${num(e.enjoyment).toFixed(1)}<span style="font-weight:400;color:#858a79"> / 10</span></strong></span><span class="read-more">Read tasting notes ↗</span></div></div></article>`).join('');
    empty.hidden=list.length!==0; grid.hidden=list.length===0;
    grid.querySelectorAll('.entry-card').forEach(card=>{const open=()=>openEntry(card.dataset.id);card.addEventListener('click',open);card.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();open();}})});
  }
  function openEntry(id) {
    const e=entries.find(x=>x.id===id); if(!e)return;
    const scores=e.scores||{};
    const scoreKeys=[['Umami','umami'],['Sweetness','sweetness'],['Bitterness','bitterness'],['Astringency','astringency'],['Body','body']];
    const preparation=e.preparation||{};
    const scoreRows=scoreKeys.map(([label,key])=>{const value=scores[key]===undefined?null:num(scores[key]);return `<div class="radar-score-row"><span class="radar-score-dot" aria-hidden="true"></span><span class="radar-score-label">${label}</span><strong>${value===null?'—':esc(value)}<small>${value===null?'':'/5'}</small></strong></div>`}).join('');
    $('dialog-content').innerHTML=`<div class="dialog-inner"><div class="dialog-art">${botanicalArt(entries.indexOf(e),true)}</div><p class="eyebrow">THE TASTING ARCHIVE</p><h2>${esc(e.name)}</h2><p class="dialog-meta">Purchased at ${esc(sourceName(e))}${e.location?' · '+esc(e.location):''}<br>Tasted ${esc(prettyDate(e.dateTasted))}${e.style?' · '+esc(e.style):''}</p>${e.tastingNotes?.length?`<div class="dialog-section"><h3>Tasting notes</h3><p>${e.tastingNotes.map(esc).join(' · ')}</p></div>`:''}<div class="dialog-section"><h3>My thoughts</h3><p>${esc(e.thoughts||'No personal thoughts recorded yet.')}</p></div><div class="dialog-section profile-section"><div class="profile-heading"><h3>Flavour profile</h3><span>INTENSITY · 1–5</span></div><div class="radar-layout"><div class="radar-chart-wrap">${radarChart(scores)}</div><div class="radar-score-list">${scoreRows}</div></div><p class="profile-key"><span>1 · Subtle</span><span>5 · Pronounced</span></p></div>${preparation.matchaGrams||preparation.waterMl||preparation.milkMl?`<div class="dialog-section"><h3>Preparation</h3><p>${preparation.matchaGrams?esc(preparation.matchaGrams)+' g matcha':''}${preparation.waterMl?' · '+esc(preparation.waterMl)+' ml water':''}${preparation.milkMl?' · '+esc(preparation.milkMl)+' ml milk':''}${preparation.method?'<br>'+esc(preparation.method):''}</p></div>`:''}<div class="dialog-rating">★ ${num(e.enjoyment).toFixed(1)} <small>/ 10 overall enjoyment</small></div></div>`;
    $('entry-dialog').showModal();
  }
  function renderDashboard() {
    const valid=entries.filter(e=>e.scores&&Object.keys(e.scores).length);
    const avgEnjoy=mean(entries.map(e=>num(e.enjoyment)).filter(v=>v>0));
    const sources=unique(entries.map(e=>e.purchasedFrom));
    $('hero-count').textContent=String(entries.length).padStart(2,'0');
    $('hero-average').textContent=entries.length?avgEnjoy.toFixed(1):'—';
    $('hero-sources').textContent=String(sources.length).padStart(2,'0');
    $('dash-average').textContent=entries.length?avgEnjoy.toFixed(1):'—';
    $('enjoyment-dots').innerHTML=Array.from({length:10},(_,i)=>`<span class="${i<Math.round(avgEnjoy)?'filled':''}"></span>`).join('');
    $('enjoyment-dots').setAttribute('aria-label',`Average enjoyment ${avgEnjoy.toFixed(1)} out of 10`);
    const top=entries.slice().sort((a,b)=>num(b.enjoyment)-num(a.enjoyment))[0]; $('top-matcha').textContent=top?top.name:'Not yet';
    const sourceCounts={}; entries.forEach(e=>{if(e.purchasedFrom)sourceCounts[e.purchasedFrom]=(sourceCounts[e.purchasedFrom]||0)+1;});
    const topSource=Object.entries(sourceCounts).sort((a,b)=>b[1]-a[1])[0]; $('top-source').textContent=topSource?topSource[0]:'Not yet';
    const keys=[['Umami','umami'],['Sweetness','sweetness'],['Bitterness','bitterness'],['Astringency','astringency'],['Body','body']];
    $('score-bars').innerHTML=keys.map(([label,key])=>{const vals=valid.map(e=>num(e.scores[key])).filter(v=>v>0);const m=mean(vals);return `<div class="score-row"><span>${label}</span><div class="score-track"><div class="score-fill" style="width:${m/5*100}%"></div></div><span class="score-value">${vals.length?m.toFixed(1):'—'}</span></div>`}).join('');
    const words={}; entries.forEach(e=>[...(e.tastingNotes||[]),...(e.personalTags||[])].forEach(w=>{const word=String(w).trim().toLowerCase();if(word)words[word]=(words[word]||0)+1;}));
    const recurring=Object.entries(words).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).slice(0,5);
    $('preference-tags').innerHTML=recurring.length?recurring.map(([w])=>`<span class="preference-tag">${esc(w)}</span>`).join(''):'<span class="preference-tag">Your notes will appear here</span>';
    $('preference-copy').textContent=entries.length<3?'As you log more matchas, recurring aromas, flavours and textures will become easier to spot. These are your current notes, not conclusions about your palate yet.':`Across ${entries.length} logged tastings, these are the most frequently recorded flavour notes and personal tags. Use them as prompts, rather than fixed rules, when tasting your next bowl.`;
    $('enjoyment-caption').textContent=entries.length===0?'Your first bowl is waiting.':avgEnjoy>=8.5?'A favourite is taking shape.':avgEnjoy>=7?'A promising bowl, with more to explore.':'Every tasting teaches you something.';
  }
  search.addEventListener('input',renderEntries); $('sort').addEventListener('change',renderEntries); $('clear-search').addEventListener('click',()=>{search.value='';activeSource='all';buildFilters();renderEntries();search.focus();});
  $('dialog-close').addEventListener('click',()=>$('entry-dialog').close()); $('entry-dialog').addEventListener('click',ev=>{if(ev.target===$('entry-dialog'))$('entry-dialog').close()});
  document.addEventListener('keydown',ev=>{if((ev.metaKey||ev.ctrlKey)&&ev.key.toLowerCase()==='k'){ev.preventDefault();search.focus();}});
  buildFilters();renderEntries();renderDashboard();
})();
