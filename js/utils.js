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

/* ── HTML ESCAPING ──────────────────────────────────────── */
function esc(s){return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

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
function exportPDF(title,html,extraStyle='',useIcons=false){
  const win=window.open('','_blank');
  if(!win){toast('❌ Pop-up geblokkeerd — sta pop-ups toe');return;}

  let iconHead='',iconScript='',printDelay=400,autoPrint=true;
  if(useIcons&&_iconStyle!=='emoji'){
    if(_iconStyle==='lu'){
      iconHead=`<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>`;
      iconScript=`<script>
        var _printed=false;
        function _doPrint(){if(_printed)return;_printed=true;window.print();}
        window.addEventListener('load',function(){
          try{if(window.lucide)lucide.createIcons();}catch(e){}
          setTimeout(_doPrint,300);
        });
        setTimeout(_doPrint,2500);
      </script>`;
      autoPrint=false;
    } else if(_iconStyle.startsWith('ma')){
      const fam=_iconStyle==='ma-rnd'?'Rounded':_iconStyle==='ma-shp'?'Sharp':'Outlined';
      iconHead=`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+${fam}:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block">`;
      printDelay=1000;
    } else if(_iconStyle.startsWith('ph')){
      iconHead=`<script src="https://unpkg.com/@phosphor-icons/web@2.1.1/src/index.js"></script>`;
      printDelay=1000;
    }
  }

  win.document.write(`<!DOCTYPE html><html lang="nl"><head><meta charset="UTF-8"><title>${title}</title>${iconHead}<style>
    *{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;color-adjust:exact!important}
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
    ${extraStyle}
  </style></head><body>${html}${iconScript}</body></html>`);
  win.document.close();win.focus();
  if(autoPrint)setTimeout(()=>win.print(),printDelay);
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
/* ── Portfolio PDF: stap 1 — vraag persoonlijke gegevens ── */
function exportPortfolioPDF(){
  if(!S.goals.length){toast('⚠️ Voeg eerst leerdoelen toe');return;}
  const saved=_safeJSON('pb_portfolio_personal',{});
  document.getElementById('pdf-naam').value=saved.naam||'';
  document.getElementById('pdf-opleiding').value=saved.opleiding||'';
  document.getElementById('pdf-klas').value=saved.klas||'';
  document.getElementById('pdf-periode').value=saved.periode||'';
  renderPdfColorPicker();
  document.getElementById('pdf-export-modal').classList.remove('hidden');
}

/* Render een 'mijn werk'/bijlage-item (tekst, link of verslag) als nette kaart */
function renderWerkItem(w){
  const title=esc(w.title||'Werk');
  const body=esc(w.body||'');
  if(w.type==='link'&&w.url){
    const url=esc(w.url);
    return `<div class="link-card">
      <div class="link-card-ic">${ic('link',16)}</div>
      <div class="link-card-body">
        <div class="link-card-title">${title}</div>
        <a class="link-card-url" href="${url}">${url}</a>
        ${body?`<div class="link-card-desc">${body}</div>`:''}
      </div>
    </div>`;
  }
  if(w.type==='verslag'||w.type==='doc'){
    return `<div class="link-card">
      <div class="link-card-ic">${ic('doc',16)}</div>
      <div class="link-card-body">
        <div class="link-card-title">${title}</div>
        ${body?`<div class="link-card-desc">${body}</div>`:''}
      </div>
    </div>`;
  }
  return `<div class="timeline-item"><strong>${title}</strong>${body?': '+body:''}</div>`;
}

/* ── Portfolio PDF: stap 2 — genereer professioneel document ── */
function generatePortfolioPDF(){
  const personal={
    naam:document.getElementById('pdf-naam')?.value?.trim()||'',
    opleiding:document.getElementById('pdf-opleiding')?.value?.trim()||'',
    klas:document.getElementById('pdf-klas')?.value?.trim()||'',
    periode:document.getElementById('pdf-periode')?.value?.trim()||'',
  };
  _safeSave('pb_portfolio_personal',personal);
  document.getElementById('pdf-export-modal').classList.add('hidden');

  const color=PORTFOLIO_COLORS.find(c=>c.id===_pdfColor)||PORTFOLIO_COLORS[0];
  const accent=color.hex;
  const datum=new Date().toLocaleDateString('nl-NL',{day:'2-digit',month:'long',year:'numeric'});

  const logoSvg=(clr,w=90)=>`<svg viewBox="0 0 100 100" width="${w}" height="${w}" xmlns="http://www.w3.org/2000/svg" style="color:${clr}">
    <path d="M 88 23 A 47 13 -35 0 0 12 77" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <circle cx="50" cy="50" r="31" fill="none" stroke="currentColor" stroke-width="10.5"/>
    <path d="M 88 23 A 47 13 -35 0 1 12 77" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <circle cx="12" cy="77" r="8" fill="currentColor"/>
    <circle cx="88" cy="23" r="5" fill="currentColor"/>
  </svg>`;

  /* Kleine ringbadge met niveau (per leerdoel) */
  const ringBadge=(lv,lc)=>`<svg viewBox="0 0 36 36" width="56" height="56" style="flex-shrink:0">
    <circle cx="18" cy="18" r="15.5" fill="none" stroke="#eef0f4" stroke-width="3"/>
    <circle cx="18" cy="18" r="15.5" fill="none" stroke="${lc}" stroke-width="3" stroke-linecap="round"
      stroke-dasharray="${(lv/100*97.4).toFixed(1)} 97.4" transform="rotate(-90 18 18)"/>
    <text x="18" y="16.5" text-anchor="middle" font-size="10.5" font-weight="800" fill="${lc}" font-family="Segoe UI,sans-serif">${lv}</text>
    <text x="18" y="25.5" text-anchor="middle" font-size="5.5" font-weight="700" fill="#9ca3af" font-family="Segoe UI,sans-serif">/100</text>
  </svg>`;

  /* ── Voorpagina ── */
  let html=`<div class="cover">
    <div class="cover-shape cover-shape-1"></div>
    <div class="cover-shape cover-shape-2"></div>
    <div class="cover-card">
      <div class="cover-logo">${logoSvg('#fff',90)}</div>
      <div class="cover-eyebrow">AI WORKFLOW TOOL · ORBIT</div>
      <h1>Portfolio</h1>
      <div class="cover-sub">Persoonlijk ontwikkelportfolio</div>
      ${(personal.naam||personal.opleiding||personal.klas)?`<div class="cover-info">
        ${personal.naam?`<div class="cover-naam">${personal.naam}</div>`:''}
        ${(personal.opleiding||personal.klas)?`<div class="cover-sub2">${[personal.opleiding,personal.klas].filter(Boolean).join(' · ')}</div>`:''}
      </div>`:''}
      ${personal.periode?`<div class="cover-periode">${personal.periode}</div>`:''}
    </div>
    <div class="cover-date">Gegenereerd op ${datum} · Orbit AI Workflow Tool</div>
  </div>`;

  /* ── Overzicht / statistieken ── */
  const experts=S.goals.filter(g=>g.level>=80).length;
  const growth=S.goals.reduce((a,g)=>a+(g.history||[]).filter(h=>h.delta>0).length,0);
  const avgLevel=Math.round(S.goals.reduce((a,g)=>a+(g.level||1),0)/S.goals.length);
  html+=`<div class="section-hd"><span class="section-ic">${ic('dashboard',18)}</span><h2>Overzicht</h2></div>
  <div class="stats-grid">
    <div class="stat-box"><div class="num">${S.goals.length}</div><div class="lbl">Leerdoelen</div></div>
    <div class="stat-box"><div class="num">${avgLevel}</div><div class="lbl">Gemiddeld niveau</div></div>
    <div class="stat-box"><div class="num">${experts}</div><div class="lbl">Expert (80+)</div></div>
    <div class="stat-box"><div class="num">${growth}</div><div class="lbl">Groeimomenten</div></div>
  </div>`;

  /* ── Vaardighedenradar ── */
  if(S.goals.length>=2){
    html+=`<div class="section-hd"><span class="section-ic">${ic('radar',18)}</span><h2>Vaardighedenradar</h2></div>
    <div class="radar-card">${buildRadarChart(S.goals,300)}</div>`;
  }

  /* ── Groeidiagram ── */
  const growthChart=buildGrowthChart(S.goals,560,240);
  if(growthChart){
    html+=`<div class="section-hd"><span class="section-ic">${ic('growth',18)}</span><h2>Groeidiagram</h2></div>
    <div class="radar-card" style="flex-direction:column">${growthChart}</div>`;
  }

  /* ── Per categorie ── */
  const cats=[...new Set(S.goals.map(g=>g.category||'Overig'))];
  cats.forEach(cat=>{
    const goals=S.goals.filter(g=>(g.category||'Overig')===cat);
    html+=`<div class="cat-section"><div class="cat-title"><span class="cat-dot"></span>${cat}</div>`;
    goals.forEach(g=>{
      const lc=lvlColor(g.level||1);
      const done=g.milestones.filter(m=>m.done).length,tot=g.milestones.length;
      const hist=g.history||[];
      html+=`<div class="goal-card">
        <div class="goal-head">
          ${ringBadge(g.level||1,lc)}
          <div style="flex:1;min-width:0">
            <div class="goal-name">${esc(g.name)}</div>
            ${g.desc?`<div class="goal-desc">${esc(g.desc)}</div>`:''}
            <div class="goal-bar"><div class="goal-bar-fill" style="width:${g.level||1}%;background:${lc}"></div></div>
            ${tot>0?`<div class="goal-meta">${done}/${tot} mijlpalen afgerond</div>`:''}
          </div>
          <div class="goal-tag" style="background:${lc}1a;color:${lc}">${lvlLabel(g.level||1)}</div>
        </div>
        ${g.notes?`<div class="goal-section-lbl">${ic('thought',13)} Reflectie</div><div class="goal-text">${esc(g.notes)}</div>`:''}
        ${hist.length?`<div class="goal-section-lbl">${ic('growth',13)} Groeitraject</div>${hist.map(h=>`<div class="timeline-item"><strong style="color:${h.delta>=0?'#10b981':'#ef4444'}">${h.delta>=0?'+':''}${h.delta}</strong> · ${h.oldLevel} → ${h.newLevel} · ${esc(h.reason)} <span class="timeline-date">(${h.date})</span></div>`).join('')}`:''}
        ${(g.werkItems&&g.werkItems.length)?`<div class="goal-section-lbl">${ic('briefcase',13)} Mijn werk</div><div class="werk-grid">${g.werkItems.map(w=>renderWerkItem(w)).join('')}</div>`:''}
      </div>`;
    });
    html+=`</div>`;
  });

  /* ── Bijlagen & links ── */
  if((S.attachments||[]).length){
    html+=`<div class="section-hd"><span class="section-ic">${ic('paperclip',18)}</span><h2>Bijlagen & links</h2></div>
    <div class="werk-grid">${S.attachments.map(a=>renderWerkItem(a)).join('')}</div>`;
  }

  html+=`<div class="pdf-footer">
    <div class="pdf-footer-logo">${logoSvg(accent,22)}</div>
    <div>Gemaakt met <strong>Orbit</strong> — AI Workflow Tool</div>
  </div>`;

  const extraStyle=`
    body{font-family:'Segoe UI',sans-serif}
    h1,h2,h3{font-family:'Segoe UI',sans-serif}
    .cover{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
      min-height:96vh;page-break-after:always;overflow:hidden;border-radius:18px;
      background:linear-gradient(135deg,${accent} 0%,color-mix(in srgb,${accent} 55%,#1e1b4b) 100%);color:#fff}
    .cover-shape{position:absolute;border-radius:50%;background:rgba(255,255,255,0.08)}
    .cover-shape-1{width:340px;height:340px;top:-120px;left:-100px}
    .cover-shape-2{width:260px;height:260px;bottom:-100px;right:-80px;background:rgba(255,255,255,0.06)}
    .cover-card{position:relative;z-index:1;background:rgba(255,255,255,0.08);backdrop-filter:blur(2px);
      border:1px solid rgba(255,255,255,0.25);border-radius:20px;padding:48px 56px;max-width:520px}
    .cover-logo svg{filter:drop-shadow(0 4px 10px rgba(0,0,0,.25))}
    .cover-logo{margin-bottom:14px}
    .cover-eyebrow{font-size:11px;letter-spacing:.25em;color:rgba(255,255,255,.75);font-weight:700;margin-bottom:10px}
    .cover h1{font-size:46px;border:none;color:#fff;margin:0 0 6px;padding:0;font-weight:800;letter-spacing:.02em}
    .cover-sub{color:rgba(255,255,255,.85);font-size:13px;letter-spacing:.12em;text-transform:uppercase}
    .cover-info{margin-top:34px;padding-top:24px;border-top:1px solid rgba(255,255,255,.25)}
    .cover-naam{font-size:22px;font-weight:800;color:#fff}
    .cover-sub2{font-size:13px;color:rgba(255,255,255,.8);margin-top:4px}
    .cover-periode{margin-top:14px;display:inline-block;padding:5px 16px;border-radius:999px;background:rgba(255,255,255,.18);font-weight:600;font-size:12px}
    .cover-date{position:relative;z-index:1;margin-top:40px;color:rgba(255,255,255,.7);font-size:11px;letter-spacing:.05em}
    .section-hd{display:flex;align-items:center;gap:10px;margin-top:28px;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid color-mix(in srgb,${accent} 22%,transparent)}
    .section-hd h2{margin:0;padding:0;border:none;font-size:18px;color:${accent};font-weight:800}
    .section-ic{font-size:18px;display:inline-flex;width:32px;height:32px;align-items:center;justify-content:center;
      border-radius:9px;background:color-mix(in srgb,${accent} 14%,white)}
    .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:0 0 8px}
    .stat-box{border-radius:12px;padding:16px 8px;text-align:center;
      background:linear-gradient(160deg,color-mix(in srgb,${accent} 12%,white) 0%,white 100%);
      border:1px solid color-mix(in srgb,${accent} 18%,transparent)}
    .stat-box .num{font-size:26px;font-weight:800;color:${accent}}
    .stat-box .lbl{font-size:10px;color:#6b7280;margin-top:3px;text-transform:uppercase;letter-spacing:.06em;font-weight:600}
    .radar-card{display:flex;justify-content:center;margin:8px 0 4px;padding:16px;border-radius:14px;
      background:linear-gradient(160deg,color-mix(in srgb,${accent} 8%,white) 0%,white 100%);
      border:1px solid color-mix(in srgb,${accent} 16%,transparent)}
    .cat-section{margin-top:30px}
    .cat-title{display:flex;align-items:center;gap:8px;font-size:16px;font-weight:800;color:#1e1b4b;
      border-bottom:2px solid color-mix(in srgb,${accent} 20%,transparent);padding-bottom:8px;margin-bottom:14px;
      letter-spacing:.02em}
    .cat-dot{width:10px;height:10px;border-radius:50%;background:${accent};flex-shrink:0}
    .goal-card{border:1px solid #ececf2;border-left:5px solid ${accent};border-radius:12px;padding:16px 18px;
      margin-bottom:14px;page-break-inside:avoid;box-shadow:0 1px 3px rgba(0,0,0,.04)}
    .goal-head{display:flex;align-items:flex-start;gap:14px}
    .goal-name{font-size:15px;font-weight:800;color:#1e1b4b}
    .goal-desc{font-size:12px;color:#6b7280;margin-top:2px}
    .goal-bar{height:7px;background:#f1f2f6;border-radius:4px;margin-top:10px;overflow:hidden}
    .goal-bar-fill{height:100%;border-radius:4px}
    .goal-meta{font-size:11px;color:#9ca3af;margin-top:6px;font-weight:600}
    .goal-tag{flex-shrink:0;font-size:10px;font-weight:800;padding:4px 10px;border-radius:999px;text-transform:uppercase;letter-spacing:.04em}
    .goal-section-lbl{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;margin-top:12px;color:${accent}}
    .goal-text{font-size:13px;color:#374151;margin-top:4px;white-space:pre-wrap;line-height:1.6}
    .timeline-item{font-size:12px;color:#4b5563;padding:4px 0;border-bottom:1px dashed #f1f2f6}
    .timeline-item:last-child{border-bottom:none}
    .timeline-date{color:#9ca3af}
    .pdf-footer{margin-top:40px;padding-top:16px;border-top:1px solid #ececf2;display:flex;align-items:center;
      justify-content:center;gap:8px;color:#9ca3af;font-size:11px}
    .pdf-footer-logo svg{display:block}
    .werk-grid{display:flex;flex-direction:column;gap:6px;margin-top:6px}
    .link-card{display:flex;align-items:flex-start;gap:10px;padding:8px 10px;border-radius:9px;
      background:color-mix(in srgb,${accent} 6%,white);border:1px solid color-mix(in srgb,${accent} 16%,transparent)}
    .link-card-ic{flex-shrink:0;width:26px;height:26px;border-radius:7px;display:flex;align-items:center;justify-content:center;
      background:color-mix(in srgb,${accent} 16%,white);color:${accent};font-size:14px}
    .link-card-body{flex:1;min-width:0}
    .link-card-title{font-size:12px;font-weight:700;color:#1e1b4b}
    .link-card-url{font-size:11px;color:${accent};word-break:break-all;text-decoration:none}
    .link-card-desc{font-size:11px;color:#6b7280;margin-top:2px}
  `;
  exportPDF('Portfolio',html,extraStyle,true);
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
        <span style="font-size:18px;display:flex;align-items:center;color:var(--txt2)">${ic('search',18)}</span>
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
  const _taskTypeLbl={task:'Analyse-opdracht','ai-checklist':'AI Checklist',prompt:'Prompt-opdracht','file-ai':'Bestand → AI'};
  const results=[];
  // Tasks
  S.tasks.forEach(t=>{
    const lbl=t.name||(t.input?.goal||t.input?.promptGoal||'Opdracht').slice(0,50);
    const txt=(lbl+(t.analysis||'')).toLowerCase();
    if(!sq||txt.includes(sq))results.push({type:'Opdracht',icKey:'edit',label:lbl,sub:_taskTypeLbl[t.type]||t.type,action:`closeSearch();${t.type==='ai-checklist'?`S.tid='${t.id}';`:''}nav('${t.type==='ai-checklist'?'ai-checklist':'analysis'}','${t.id}')`});
  });
  // Notes
  S.notes.forEach(n=>{
    const txt=(n.title+n.body+n.tags.join(' ')).toLowerCase();
    if(!sq||txt.includes(sq))results.push({type:'Notitie',icKey:'notes',label:n.title||'Naamloos',sub:n.body.replace(/[#*`]/g,'').slice(0,60),action:`closeSearch();S.nid='${n.id}';nav('notes')`});
  });
  // PromptLib
  (S.promptLib||[]).forEach(p=>{
    const txt=(p.name+(p.prompt||'')).toLowerCase();
    if(!sq||txt.includes(sq))results.push({type:'Prompt',icKey:'prompt',label:p.name,sub:(p.prompt||'').slice(0,60),action:`closeSearch();nav('prompt-gen')`});
  });
  // Goals
  (S.goals||[]).forEach(g=>{
    const txt=(g.name||g.goal||'').toLowerCase();
    if(!sq||txt.includes(sq))results.push({type:'Leerdoel',icKey:'portfolio',label:g.name||g.goal||'Doel',sub:(g.category?g.category+' · ':'')+'Niveau '+(g.level||1)+'/100',action:`closeSearch();S.gid='${g.id}';nav('goal-detail')`});
  });
  if(!results.length){el.innerHTML=`<div style="padding:24px;text-align:center;color:var(--txt2);font-size:14px">${sq?'Geen resultaten voor <strong>'+q+'</strong>':'Begin met typen om te zoeken...'}</div>`;return;}
  el.innerHTML=results.slice(0,30).map(r=>`<div onclick="${r.action}" style="display:flex;align-items:center;gap:10px;padding:10px 16px;cursor:pointer;transition:background .1s" onmouseover="this.style.background='var(--nav-hover,rgba(0,0,0,.04))'" onmouseout="this.style.background='transparent'">
    <span style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;background:var(--bg);flex-shrink:0;color:var(--p)">${ic(r.icKey,16)}</span>
    <div style="flex:1;min-width:0">
      <div style="font-size:13px;font-weight:600;color:var(--txt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.label}</div>
      ${r.sub?`<div style="font-size:11px;color:var(--txt2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.sub.replace(/</g,'&lt;')}</div>`:''}
    </div>
    <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;background:#e0e7ff;color:#4f46e5;flex-shrink:0">${r.type}</span>
  </div>`).join('');
  if(_iconStyle==='lu'&&typeof lucide!=='undefined')setTimeout(()=>{try{lucide.createIcons();}catch(e){}},16);
}
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();_searchOpen?closeSearch():openSearch();}
  if(e.key==='Escape'){
    const om=document.getElementById('orbit-modal');
    if(om&&!om.classList.contains('hidden')){_omDoCancel();return;}
    if(_searchOpen){closeSearch();return;}
    if(window.innerWidth<768&&document.getElementById('sidebar')?.classList.contains('mobile-open')){closeMobileSidebar();}
  }
});

/* ── CUSTOM MODALS (vervangt alert / confirm / prompt) ───── */
let _omOk=null,_omCancel=null;
function _omClose(){document.getElementById('orbit-modal').classList.add('hidden');_omOk=null;_omCancel=null;}
function _omDoOk(){const cb=_omOk;_omClose();if(cb)cb();}
function _omDoCancel(){const cb=_omCancel;_omClose();if(cb)cb();}

function orbitAlert(msg,title,onOk){
  title=title||'Melding';
  document.getElementById('orbit-modal-title').textContent=title;
  document.getElementById('orbit-modal-msg').textContent=msg;
  document.getElementById('orbit-modal-input-wrap').classList.add('hidden');
  document.getElementById('orbit-modal-btns').innerHTML=
    '<button class="btn bp text-sm px-5" onclick="_omDoOk()">OK</button>';
  _omOk=onOk||null;_omCancel=null;
  document.getElementById('orbit-modal').classList.remove('hidden');
}

function orbitConfirm(msg,onOk,onCancel,title){
  title=title||'Bevestigen';
  document.getElementById('orbit-modal-title').textContent=title;
  document.getElementById('orbit-modal-msg').textContent=msg;
  document.getElementById('orbit-modal-input-wrap').classList.add('hidden');
  document.getElementById('orbit-modal-btns').innerHTML=
    '<button class="btn bs text-sm px-4" onclick="_omDoCancel()">Annuleer</button>'+
    '<button class="btn bp text-sm px-4" onclick="_omDoOk()">Doorgaan</button>';
  _omOk=onOk||null;_omCancel=onCancel||null;
  document.getElementById('orbit-modal').classList.remove('hidden');
}

function orbitPrompt(msg,defaultVal,onOk,title){
  title=title||'Invoer';
  document.getElementById('orbit-modal-title').textContent=title;
  document.getElementById('orbit-modal-msg').textContent=msg;
  document.getElementById('orbit-modal-input-wrap').classList.remove('hidden');
  const inp=document.getElementById('orbit-modal-input');
  inp.value=defaultVal||'';
  const okBtn='<button class="btn bp text-sm px-4" id="orbit-modal-ok-btn">OK</button>';
  document.getElementById('orbit-modal-btns').innerHTML=
    '<button class="btn bs text-sm px-4" onclick="_omClose()">Annuleer</button>'+okBtn;
  _omOk=onOk||null;_omCancel=null;
  document.getElementById('orbit-modal-ok-btn').onclick=()=>{
    const v=document.getElementById('orbit-modal-input').value;
    _omClose();if(_omOk)_omOk(v);
  };
  inp.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();document.getElementById('orbit-modal-ok-btn')?.click();}};
  document.getElementById('orbit-modal').classList.remove('hidden');
  setTimeout(()=>inp.focus(),50);
}

/* ── MOBILE SIDEBAR ─────────────────────────────────────── */
function isMobile(){return window.innerWidth<768;}
function openMobileSidebar(){
  document.getElementById('sidebar').classList.add('mobile-open');
  document.body.classList.add('mob-sb-open');
  const ov=document.getElementById('mobile-overlay');
  if(ov)ov.style.display='block';
}
function closeMobileSidebar(){
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.body.classList.remove('mob-sb-open');
  const ov=document.getElementById('mobile-overlay');
  if(ov)ov.style.display='none';
}

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
