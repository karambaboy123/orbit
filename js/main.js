/* ── NAVIGATE ───────────────────────────────────────────── */
function nav(v,tid=null){
  S.view=v; if(tid!==null)S.tid=tid;
  document.querySelectorAll('.ni').forEach(e=>e.classList.remove('active'));
  const el=document.getElementById('nav-'+v); if(el)el.classList.add('active');
  render(); document.querySelector('#main').parentElement.scrollTop=0;
  if(window.innerWidth<768&&typeof closeMobileSidebar==='function')closeMobileSidebar();
  if(typeof helpCheckFirstVisit==='function')helpCheckFirstVisit(v);
}

/* ── RENDER ─────────────────────────────────────────────── */
function render(){
  // Onthoud welke accordions open zijn zodat ze na re-render open blijven
  const _openAccs=[...document.querySelectorAll('[id^="acc-body-"]')]
    .filter(el=>!el.classList.contains('hidden'))
    .map(el=>el.id.replace('acc-body-',''));

  // Onthoud scrollpositie zodat je niet steeds terug bovenaan begint
  const _scroller=document.querySelector('#main')?.parentElement;
  const _scrollTop=_scroller?_scroller.scrollTop:0;

  // Onthoud het actieve invoerveld (id, waarde, cursorpositie) zodat typen niet onderbroken wordt
  const _active=document.activeElement;
  let _focus=null;
  if(_active&&_active.id&&(_active.tagName==='INPUT'||_active.tagName==='TEXTAREA'||_active.tagName==='SELECT')
     &&document.getElementById('main')?.contains(_active)){
    _focus={id:_active.id,tag:_active.tagName,value:_active.value,
      selStart:_active.selectionStart,selEnd:_active.selectionEnd};
  }

  const el=document.getElementById('main');
  switch(S.view){
    case 'home':        el.innerHTML=vHome(); break;
    case 'dashboard':   el.innerHTML=vDash(); break;
    case 'new-task':    el.innerHTML=vNewTask(); break;
    case 'prompt-gen':  el.innerHTML=vPromptGen(); break;
    case 'file-to-ai':  el.innerHTML=vFileToAI(); ftaSetup(); break;
    case 'ai-checklist':el.innerHTML=vAIChecklist(); break;
    case 'launcher':    el.innerHTML=vLauncher(); break;
    case 'analysis':    el.innerHTML=vAnalysis(); bindChecks(); break;
    case 'settings':    el.innerHTML=vSettings(); renderBackupSection(); break;
    case 'portfolio':   el.innerHTML=vPortfolio(); break;
    case 'goal-detail': el.innerHTML=vGoalDetail(); break;
    case 'notes':       el.innerHTML=vNotes(); bindNoteEditor(); break;
    case 'review':      el.innerHTML=vReview(); break;
    case 'help':        el.innerHTML=vHelp(); break;
    default: el.innerHTML=vDash();
  }

  // Herstel scrollpositie direct (nav() zet 'm evt. daarna zelf terug naar 0 bij paginawissel)
  if(_scroller)_scroller.scrollTop=_scrollTop;

  // Herstel focus + cursor/waarde van het veld waar je in aan het typen was
  if(_focus){
    const elF=document.getElementById(_focus.id);
    if(elF){
      elF.value=_focus.value;
      elF.focus();
      if(_focus.tag!=='SELECT'&&typeof elF.setSelectionRange==='function'){
        try{elF.setSelectionRange(_focus.selStart,_focus.selEnd);}catch(e){}
      }
    }
  }

  renderHist();
  // Apply icon style after DOM is ready + herstel open accordions
  requestAnimationFrame(()=>{
    applyIcons();
    // Herstel open accordions na re-render
    _openAccs.forEach(id=>{
      const b=document.getElementById('acc-body-'+id);
      const arrow=document.getElementById('acc-ic-'+id);
      if(b){b.classList.remove('hidden');if(arrow)arrow.textContent='▲';}
    });
    // Activate any data-lucide icons baked into template strings (e.g. ic() calls)
    if(_iconStyle==='lu'&&typeof lucide!=='undefined'){
      setTimeout(()=>{try{lucide.createIcons();}catch(e){}},16);
    }
  });
}

function renderHist(){
  const el=document.getElementById('hist'); if(!el)return;
  const active=S.tasks.filter(t=>!t.archived);
  if(!active.length){el.innerHTML='<div style="font-size:11.5px;padding:5px 8px;border-radius:7px;color:var(--nav-txt);opacity:0.55;font-style:italic">Geen opdrachten</div>';return;}
  el.innerHTML=active.slice(0,8).map(t=>{
    const lbl=(t.name||t.input?.goal||t.input?.promptGoal||'Opdracht').slice(0,22);
    const typeKey=t.type==='ai-checklist'?'checklist':t.type==='prompt'?'prompt':t.type==='file-ai'?'upload':'edit';
    const onclick=t.type==='ai-checklist'?`S.tid='${t.id}';nav('ai-checklist','${t.id}')`:`nav('analysis','${t.id}')`;
    return `<div class="ni text-xs ${t.id===S.tid?'active':''}" onclick="${onclick}" title="${lbl}">${ic(typeKey,13)} ${lbl}</div>`;
  }).join('');
  if(_iconStyle==='lu'&&typeof lucide!=='undefined')setTimeout(()=>{try{lucide.createIcons();}catch(e){}},16);
}

/* ── BOOT ───────────────────────────────────────────────── */
render();nav('home');
backupInit();
// Apply icons after all scripts/fonts may have loaded
window.addEventListener('load',()=>{ requestAnimationFrame(applyIcons); });
