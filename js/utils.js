/* ── SIDEBAR TOGGLE ─────────────────────────────────────── */
let _sbOpen=localStorage.getItem('pb_sb_open')!=='false';
function toggleSidebar(){
  _sbOpen=!_sbOpen;
  localStorage.setItem('pb_sb_open',_sbOpen);
  const sb=document.getElementById('sidebar');
  const tb=document.getElementById('sb-toggle');
  if(_sbOpen){
    sb.classList.remove('sb-closed');
    tb.classList.add('hidden');
  } else {
    sb.classList.add('sb-closed');
    tb.classList.remove('hidden');
    // style toggle button with current colors
    const c=_getActiveColors();
    if(tb){tb.style.background=c.sb;tb.style.color=c.navHover;}
  }
}
// Apply sidebar state on load
(function(){
  if(!_sbOpen){
    const sb=document.getElementById('sidebar');
    const tb=document.getElementById('sb-toggle');
    if(sb)sb.classList.add('sb-closed');
    if(tb){
      tb.classList.remove('hidden');
      const c=_getActiveColors();
      tb.style.background=c.sb;tb.style.color=c.navHover;
    }
  }
})();

/* ── TOAST ──────────────────────────────────────────────── */
let _tt;
function toast(m,d=2800){const e=document.getElementById('toast');e.textContent=m;e.style.display='block';clearTimeout(_tt);_tt=setTimeout(()=>e.style.display='none',d);}

/* ── COPY / DOWNLOAD ────────────────────────────────────── */
function getPromptForUse(p){return p?.trim()?`Verbeter eerst deze prompt en maak hem zo goed en volledig mogelijk, voer hem daarna pas uit:\n\n---\n\n${p.trim()}`:''}
function copyText(t,lbl='Gekopieerd!'){if(!t?.trim()){toast('⚠️ Niets te kopiëren');return;}navigator.clipboard?.writeText(t).then(()=>toast('✅ '+lbl)).catch(()=>fbCopy(t,lbl))||fbCopy(t,lbl);}
function copyPrompt(t){copyText(getPromptForUse(t),'Prompt gekopieerd!');}
function fbCopy(t,lbl){const ta=document.createElement('textarea');ta.value=t;ta.style.cssText='position:fixed;opacity:0';document.body.appendChild(ta);ta.focus();ta.select();try{document.execCommand('copy');toast('✅ '+lbl);}catch{toast('❌ Kopiëren mislukt');}document.body.removeChild(ta);}
function dlMd(content,name='download'){const b=new Blob([content],{type:'text/markdown;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name.replace(/[^a-z0-9]/gi,'_').toLowerCase()+'.md';document.body.appendChild(a);a.click();document.body.removeChild(a);toast('✅ Gedownload!');}

/* ── PDF SUPPORT ────────────────────────────────────────── */
(function(){try{if(typeof pdfjsLib!=='undefined')pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';}catch(e){}})();
async function loadPDF(file){
  if(typeof pdfjsLib==='undefined')throw new Error('PDF.js niet beschikbaar');
  const ab=await file.arrayBuffer();
  const pdf=await pdfjsLib.getDocument({data:ab}).promise;
  let out='';
  for(let i=1;i<=pdf.numPages;i++){
    const page=await pdf.getPage(i);
    const content=await page.getTextContent();
    let line='';
    content.items.forEach(item=>{if(item.hasEOL){line+=item.str+'\n';}else{line+=item.str+' ';}});
    out+=line.trim()+'\n';
  }
  return out.trim();
}
function showPDFTip(){const el=document.getElementById('fta-pdf-tip');if(el)el.classList.remove('hidden');}
function updateCharCount(){const t=document.getElementById('fta-txt')?.value||'';const e=document.getElementById('fta-charcount');if(e)e.textContent=t.length?t.length.toLocaleString()+' tekens':'';}
function ftaSetup(){selectPreset(_ftaSelId);updateCharCount();}

/* ── TEMPLATE AI HELPERS ────────────────────────────────── */
function buildTemplatePrompt(tmpl,vals){
  let p=tmpl?.aiPrompt||`Jij bent een expert assistent.\n\nHelp mij met:\n${vals.goal}${vals.aud?'\n\nDoelgroep: '+vals.aud:''}${vals.tone?'\nToon: '+vals.tone:''}${vals.out?'\nOutput: '+vals.out:''}${vals.ctx?'\n\nContext:\n'+vals.ctx:''}`;
  p=p.replace(/\{\{doel\}\}/g,vals.goal||'');
  p=p.replace(/\{\{doelgroep\}\}/g,vals.aud||'');
  p=p.replace(/\{\{toon\}\}/g,vals.tone||'');
  p=p.replace(/\{\{output\}\}/g,vals.out||'');
  p=p.replace(/\{\{context\}\}/g,vals.ctx?'Context:\n'+vals.ctx:'');
  return p.trim();
}
function toggleSendAIRow(){const r=document.getElementById('nt-ai-row');if(r)r.classList.toggle('hidden');}
function sendTemplateToAI(siteId){
  const s=SITES.find(x=>x.id===siteId);if(!s)return;
  const goal=document.getElementById('nt-goal')?.value?.trim()||'';
  if(!goal){toast('⚠️ Vul eerst het doel in');return;}
  const tmpl=S.templates.find(t=>t.id===_ntSelTmplId)||S.templates[0];
  const vals={goal,aud:document.getElementById('nt-aud')?.value?.trim()||'',tone:document.getElementById('nt-tone')?.value||'',out:document.getElementById('nt-out')?.value||'',ctx:document.getElementById('nt-ctx')?.value?.trim()||''};
  const prompt=buildTemplatePrompt(tmpl,vals);
  window.open(s.url,'_blank','noopener');
  navigator.clipboard?.writeText(prompt).catch(()=>fbCopy(prompt,''));
  toast('✅ '+s.l+' geopend & prompt gekopieerd!',3000);
  document.getElementById('nt-ai-row')?.classList.add('hidden');
}
function toggleAcc(id){const b=document.getElementById('acc-body-'+id);const ic=document.getElementById('acc-ic-'+id);if(!b)return;b.classList.toggle('hidden');if(ic)ic.textContent=b.classList.contains('hidden')?'▼':'▲';}

/* ── PDF EXPORT ─────────────────────────────────────────── */
function exportPDF(title,html){
  const win=window.open('','_blank');
  if(!win){toast('❌ Pop-up geblokkeerd — sta pop-ups toe');return;}
  win.document.write(`<!DOCTYPE html><html lang="nl"><head><meta charset="UTF-8"><title>${title}</title><style>
    body{font-family:'Segoe UI',sans-serif;max-width:800px;margin:40px auto;color:#111;line-height:1.7;padding:0 20px}
    h1{color:#1e1b4b;border-bottom:2px solid #e5e7eb;padding-bottom:10px;margin-bottom:6px}
    h2{color:#1e1b4b;margin-top:24px} h3{color:#374151}
    pre{background:#f3f4f6;padding:12px;border-radius:8px;overflow-x:auto}
    code{background:#f3f4f6;padding:2px 5px;border-radius:4px;font-size:13px}
    ul,ol{padding-left:20px} li{margin:3px 0}
    input[type=checkbox]{margin-right:5px}
    .meta{color:#6b7280;font-size:13px;margin-bottom:24px;border-bottom:1px solid #f3f4f6;padding-bottom:12px}
    blockquote{border-left:3px solid #4f46e5;margin:0;padding-left:16px;color:#6b7280}
    @media print{body{margin:20px}}
  </style></head><body>${html}</body></html>`);
  win.document.close();win.focus();
  setTimeout(()=>win.print(),400);
}
function exportNotePDF(id){
  const n=S.notes.find(x=>x.id===id);if(!n)return;
  const html=`<h1>${n.title||'Notitie'}</h1><div class="meta">${new Date(n.createdAt).toLocaleDateString('nl-NL')}${n.tags.length?' · Tags: '+n.tags.join(', '):''}</div>${DOMPurify.sanitize(marked.parse(n.body||''))}`;
  exportPDF(n.title||'Notitie',html);
}
function exportTaskPDF(id){
  const t=S.tasks.find(x=>x.id===id);if(!t)return;
  const tagStr=(t.tags||[]).length?' · Tags: '+t.tags.join(', '):'';
  const html=`<h1>${t.name||t.input?.goal||'Opdracht'}</h1><div class="meta">Aangemaakt: ${new Date(t.createdAt).toLocaleDateString('nl-NL')}${tagStr}</div>${t.analysis?DOMPurify.sanitize(marked.parse(t.analysis)):'<p>Nog geen analyse beschikbaar.</p>'}`;
  exportPDF(t.name||'Opdracht',html);
}
function exportChecklistPDF(id){
  const t=S.tasks.find(x=>x.id===id);if(!t)return;
  const order=getCheckOrder(t);
  const taskKeys=order.filter(e=>!e.startsWith('__phase__'));
  const done=taskKeys.filter(k=>t.checks[k]).length;
  const total=taskKeys.length;
  const pct=total?Math.round(done/total*100):0;
  let taskNum=0;
  let rows='';
  order.forEach(entry=>{
    if(entry.startsWith('__phase__')){
      rows+=`<h2 style="margin-top:20px;margin-bottom:6px;color:#1e1b4b;font-size:15px">${entry.slice(9)}</h2>`;
    } else {
      taskNum++;
      const isChecked=t.checks[entry];
      const lbl=t.checkLabels[entry]||'';
      const date=t.checkDates[entry]?`<span style="color:#9ca3af;font-size:11px;margin-left:8px">📅 ${t.checkDates[entry]}</span>`:'';
      rows+=`<div style="display:flex;align-items:flex-start;gap:8px;padding:4px 0;border-bottom:1px solid #f3f4f6">
        <span style="font-size:16px;flex-shrink:0;margin-top:1px">${isChecked?'☑':'☐'}</span>
        <span style="${isChecked?'text-decoration:line-through;color:#9ca3af':''}">${taskNum}. ${lbl}</span>${date}
      </div>`;
    }
  });
  const dl=t.deadline?`<span>Deadline: ${new Date(t.deadline+'T12:00:00').toLocaleDateString('nl-NL',{day:'2-digit',month:'long',year:'numeric'})}</span> · `:'';
  const html=`
    <h1>${t.name||'Checklist'}</h1>
    <div class="meta">${dl}${done}/${total} afgerond (${pct}%)${t.input?.source?' · Bron: '+t.input.source:''}</div>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px 14px;margin-bottom:16px">
      <div style="font-size:13px;font-weight:600;color:#166534">Voortgang: ${pct}% voltooid — ${done} van ${total} taken afgerond</div>
      <div style="height:8px;background:#d1fae5;border-radius:4px;margin-top:6px">
        <div style="height:100%;width:${pct}%;background:#10b981;border-radius:4px"></div>
      </div>
    </div>
    ${rows}`;
  exportPDF(t.name||'Checklist',html);
}
function exportPortfolioPDF(){
  const cats=[...new Set(S.goals.map(g=>g.category||'Overig'))].sort();
  let html=`<h1>Portfolio — Leerdoelen</h1>
    <div class="meta">Geëxporteerd: ${new Date().toLocaleDateString('nl-NL',{day:'2-digit',month:'long',year:'numeric'})} · ${S.goals.length} doelen</div>`;
  const lvlLabel=l=>l>=90?'Expert':l>=70?'Gevorderd':l>=40?'Gemiddeld':l>=20?'Beginner':'Start';
  const lvlColor=l=>l>=90?'#7c3aed':l>=70?'#2563eb':l>=40?'#0891b2':l>=20?'#16a34a':'#6b7280';
  cats.forEach(cat=>{
    const goals=S.goals.filter(g=>(g.category||'Overig')===cat);
    html+=`<h2 style="margin-top:24px;padding-bottom:4px;border-bottom:2px solid #e5e7eb">${cat}</h2>`;
    goals.forEach(g=>{
      const done=g.milestones.filter(m=>m.done).length,tot=g.milestones.length;
      const pct=tot?Math.round(done/tot*100):0;
      const lv=g.level||1;
      const color=lvlColor(lv);
      html+=`<div style="margin:10px 0;padding:12px;border:1px solid #e5e7eb;border-radius:8px;display:flex;align-items:center;gap:16px">
        <div style="flex:1;min-width:0">
          <div style="font-weight:600;font-size:14px">${g.name}</div>
          ${tot>0?`<div style="font-size:12px;color:#6b7280;margin-top:2px">${done}/${tot} mijlpalen afgerond</div>`:''}
          <div style="height:6px;background:#f3f4f6;border-radius:3px;margin-top:6px">
            <div style="height:100%;width:${lv}%;background:${color};border-radius:3px"></div>
          </div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-size:22px;font-weight:800;color:${color}">${lv}</div>
          <div style="font-size:10px;color:${color};font-weight:600">${lvlLabel(lv)}</div>
        </div>
      </div>`;
    });
  });
  exportPDF('Portfolio',html);
}

/* ── GLOBAL SEARCH ──────────────────────────────────────── */
function openSearch(){
  _searchOpen=true;
  let modal=document.getElementById('search-modal');
  if(!modal){
    modal=document.createElement('div');
    modal.id='search-modal';
    modal.style.cssText='position:fixed;inset:0;z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding-top:80px;background:rgba(0,0,0,0.5)';
    modal.innerHTML=`<div id="search-box" style="background:var(--card);border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,0.3);width:100%;max-width:560px;overflow:hidden">
      <div style="display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--card-border)">
        <span style="font-size:18px">🔍</span>
        <input id="search-inp" style="flex:1;border:none;outline:none;font-size:15px;background:transparent;color:var(--txt)" placeholder="Zoek in opdrachten, notities, prompts, doelen...">
        <button onclick="closeSearch()" style="background:none;border:none;cursor:pointer;color:var(--txt2);font-size:18px;line-height:1">×</button>
      </div>
      <div id="search-results" style="max-height:400px;overflow-y:auto;padding:8px 0"></div>
      <div style="padding:8px 16px;border-top:1px solid var(--card-border);font-size:11px;color:var(--txt2)">↵ openen · Esc sluiten</div>
    </div>`;
    modal.addEventListener('click',e=>{if(!document.getElementById('search-box').contains(e.target))closeSearch();});
    document.body.appendChild(modal);
  } else {
    modal.style.display='flex';
  }
  const inp=document.getElementById('search-inp');
  if(inp){inp.value='';inp.focus();inp.addEventListener('input',e=>doSearch(e.target.value));}
  doSearch('');
}
function closeSearch(){
  _searchOpen=false;
  const modal=document.getElementById('search-modal');
  if(modal)modal.style.display='none';
}
function doSearch(q){
  const el=document.getElementById('search-results');if(!el)return;
  const sq=q.toLowerCase().trim();
  const results=[];
  // Tasks
  S.tasks.forEach(t=>{
    const txt=(t.name+(t.input?.goal||t.input?.promptGoal||'')+(t.analysis||'')).toLowerCase();
    if(!sq||txt.includes(sq))results.push({type:'Opdracht',icon:'✏️',label:t.name||(t.input?.goal||'Opdracht').slice(0,40),sub:t.type,action:`closeSearch();nav('analysis','${t.id}')`});
  });
  // Notes
  S.notes.forEach(n=>{
    const txt=(n.title+n.body+n.tags.join(' ')).toLowerCase();
    if(!sq||txt.includes(sq))results.push({type:'Notitie',icon:'📓',label:n.title||'Naamloos',sub:n.body.slice(0,60),action:`closeSearch();S.nid='${n.id}';nav('notes')`});
  });
  // PromptLib
  (S.promptLib||[]).forEach(p=>{
    const txt=(p.name+(p.prompt||'')).toLowerCase();
    if(!sq||txt.includes(sq))results.push({type:'Prompt',icon:'⚡',label:p.name,sub:'',action:`closeSearch();nav('prompt-gen')`});
  });
  // Goals
  (S.goals||[]).forEach(g=>{
    const txt=(g.goal||'').toLowerCase();
    if(!sq||txt.includes(sq))results.push({type:'Leerdoel',icon:'🎯',label:g.goal||'Doel',sub:'',action:`closeSearch();nav('portfolio')`});
  });
  if(!results.length){el.innerHTML=`<div style="padding:24px;text-align:center;color:var(--txt2);font-size:14px">${sq?'Geen resultaten voor <strong>'+q+'</strong>':'Begin met typen om te zoeken...'}</div>`;return;}
  el.innerHTML=results.slice(0,30).map(r=>`<div onclick="${r.action}" style="display:flex;align-items:center;gap:10px;padding:10px 16px;cursor:pointer;transition:background .1s" onmouseover="this.style.background='var(--hover-bg)'" onmouseout="this.style.background='transparent'">
    <span style="font-size:18px;flex-shrink:0">${r.icon}</span>
    <div style="flex:1;min-width:0">
      <div style="font-size:13px;font-weight:600;color:var(--txt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.label}</div>
      ${r.sub?`<div style="font-size:11px;color:var(--txt2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.sub.replace(/</g,'&lt;')}</div>`:''}
    </div>
    <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;background:#e0e7ff;color:#4f46e5;flex-shrink:0">${r.type}</span>
  </div>`).join('');
}
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();_searchOpen?closeSearch():openSearch();}
  if(e.key==='Escape'&&_searchOpen){closeSearch();}
});

/* ── OFFLINE INDICATOR ──────────────────────────────────── */
function _setOfflineUI(isOnline){
  const bar=document.getElementById('connection-bar');
  const dot=document.getElementById('connection-dot');
  const txt=document.getElementById('connection-txt');
  if(!bar)return;
  if(isOnline){
    bar.style.cssText='background:rgba(16,185,129,.1);color:#6ee7b7;border:1px solid rgba(16,185,129,.2)';
    if(dot){dot.style.background='#10b981';dot.style.animation='';}
    if(txt)txt.textContent='Online';
  } else {
    bar.style.cssText='background:rgba(239,68,68,.15);color:#fca5a5;border:1px solid rgba(239,68,68,.25)';
    if(dot){dot.style.background='#ef4444';dot.style.animation='orbitPulse 2s ease-in-out infinite';}
    if(txt)txt.textContent='Offline';
  }
}
window.addEventListener('online', ()=>{
  _setOfflineUI(true);
  toast('✅ Je bent weer online');
});
window.addEventListener('offline', ()=>{
  _setOfflineUI(false);
  toast('⚠️ Je bent offline — wijzigingen worden lokaal opgeslagen', 5000);
});
// Controleer status bij laden
_setOfflineUI(navigator.onLine);
