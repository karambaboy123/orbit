/* ══════════════════════════════════════════════════════════
   ORBIT AUTO-BACKUP — IndexedDB
   ══════════════════════════════════════════════════════════ */
const BACKUP_DB_NAME    = 'orbit_backups';
const BACKUP_STORE      = 'snapshots';
const BACKUP_MAX        = 7;
const BACKUP_PURGE_DAYS = 30;

let _backupDb                 = null;
let _backupToastedThisSession = false;
let _backupBadge              = false; // cached: last backup >7 days old?
let _backupInProgress         = false; // prevent re-entrant snapshots

/* ── Open / init DB ─────────────────────────────────────── */
function backupOpenDB(){
  return new Promise(resolve=>{
    if(_backupDb){resolve(_backupDb);return;}
    if(!window.indexedDB){
      console.warn('[Orbit Backup] IndexedDB niet beschikbaar.');
      resolve(null);return;
    }
    const req=indexedDB.open(BACKUP_DB_NAME,1);
    req.onupgradeneeded=e=>{
      const db=e.target.result;
      if(!db.objectStoreNames.contains(BACKUP_STORE)){
        const store=db.createObjectStore(BACKUP_STORE,{keyPath:'id'});
        store.createIndex('date','date',{unique:false});
      }
    };
    req.onsuccess=e=>{_backupDb=e.target.result;resolve(_backupDb);};
    req.onerror  =e=>{console.warn('[Orbit Backup] DB fout:',e.target.error);resolve(null);};
  });
}

/* ── Get all snapshots (newest first) ───────────────────── */
function backupList(){
  return backupOpenDB().then(db=>{
    if(!db)return[];
    return new Promise(resolve=>{
      const tx=db.transaction(BACKUP_STORE,'readonly');
      const req=tx.objectStore(BACKUP_STORE).getAll();
      req.onsuccess=()=>resolve(req.result.sort((a,b)=>b.date.localeCompare(a.date)));
      req.onerror  =()=>resolve([]);
    });
  });
}

/* ── Collect current app data ───────────────────────────── */
function _backupGetData(){
  return{
    tasks:        S.tasks,
    promptLib:    S.promptLib,
    presets:      S.presets,
    templates:    S.templates,
    goals:        S.goals,
    notes:        S.notes,
    reviews:      S.reviews,
    geminiKey:    S.geminiKey,
    theme:        _baseMode,
    font:         typeof _curFont!=='undefined'?_curFont:null,
    iconStyle:    typeof _iconStyle!=='undefined'?_iconStyle:null,
    customColors: typeof _customColors!=='undefined'?_customColors:null,
    colorPresets: JSON.parse(localStorage.getItem('pb_color_presets')||'[]'),
  };
}

/* ── Take a snapshot ────────────────────────────────────── */
async function backupSnapshot(reason='auto'){
  const db=await backupOpenDB();
  if(!db)return null;
  const snapshot={
    id:'bk'+Date.now(),
    date:new Date().toISOString(),
    reason,
    data:_backupGetData(),
  };
  return new Promise(resolve=>{
    const tx=db.transaction(BACKUP_STORE,'readwrite');
    const store=tx.objectStore(BACKUP_STORE);
    const addReq=store.add(snapshot);
    addReq.onsuccess=()=>{
      _backupPrune(db).then(()=>{
        localStorage.setItem('pb_change_count','0');
        _backupBadge=false;
        _updateBackupBadge();
        if(!_backupToastedThisSession){
          _backupToastedThisSession=true;
          toast('💾 Automatische backup gemaakt');
        }
        resolve(snapshot);
      });
    };
    addReq.onerror=e=>{
      // QuotaExceededError → verwijder oudste en probeer opnieuw
      if(e.target.error?.name==='QuotaExceededError'){
        _backupDeleteOldest(db).then(()=>backupSnapshot(reason)).then(resolve);
      } else {
        console.warn('[Orbit Backup] Snapshot fout:',e.target.error);
        resolve(null);
      }
    };
  });
}

/* ── Prune: bewaar alleen laatste BACKUP_MAX ────────────── */
function _backupPrune(db){
  return new Promise(resolve=>{
    const tx=db.transaction(BACKUP_STORE,'readwrite');
    const store=tx.objectStore(BACKUP_STORE);
    const req=store.getAll();
    req.onsuccess=()=>{
      const all=req.result.sort((a,b)=>b.date.localeCompare(a.date));
      const toDelete=all.slice(BACKUP_MAX);
      if(!toDelete.length){resolve();return;}
      let pending=toDelete.length;
      toDelete.forEach(snap=>{
        const del=store.delete(snap.id);
        del.onsuccess=del.onerror=()=>{if(--pending===0)resolve();};
      });
    };
    req.onerror=()=>resolve();
  });
}

/* ── Verwijder oudste (quota-fallback) ──────────────────── */
function _backupDeleteOldest(db){
  return backupList().then(all=>{
    if(!all.length)return;
    const oldest=all[all.length-1];
    return new Promise(resolve=>{
      const tx=db.transaction(BACKUP_STORE,'readwrite');
      tx.objectStore(BACKUP_STORE).delete(oldest.id).onsuccess=resolve;
    });
  });
}

/* ── Auto-purge items ouder dan BACKUP_PURGE_DAYS ──────── */
function _backupAutoPurge(db){
  const cutoff=new Date(Date.now()-BACKUP_PURGE_DAYS*86400000).toISOString();
  return new Promise(resolve=>{
    const tx=db.transaction(BACKUP_STORE,'readwrite');
    const store=tx.objectStore(BACKUP_STORE);
    const req=store.getAll();
    req.onsuccess=()=>{
      const old=req.result.filter(s=>s.date<cutoff);
      if(!old.length){resolve();return;}
      let pending=old.length;
      old.forEach(s=>{
        const del=store.delete(s.id);
        del.onsuccess=del.onerror=()=>{if(--pending===0)resolve();};
      });
    };
    req.onerror=()=>resolve();
  });
}

/* ── Verwijder één snapshot ─────────────────────────────── */
function backupDelete(id){
  return backupOpenDB().then(db=>{
    if(!db)return;
    return new Promise(resolve=>{
      const tx=db.transaction(BACKUP_STORE,'readwrite');
      tx.objectStore(BACKUP_STORE).delete(id).onsuccess=resolve;
    });
  });
}

/* ── Leeg alle snapshots ────────────────────────────────── */
function backupClear(){
  return backupOpenDB().then(db=>{
    if(!db)return;
    return new Promise(resolve=>{
      const tx=db.transaction(BACKUP_STORE,'readwrite');
      tx.objectStore(BACKUP_STORE).clear().onsuccess=resolve;
    });
  });
}

/* ── Herstel vanuit snapshot ────────────────────────────── */
function backupRestore(id){
  backupOpenDB().then(db=>{
    if(!db)return;
    const tx=db.transaction(BACKUP_STORE,'readonly');
    const req=tx.objectStore(BACKUP_STORE).get(id);
    req.onsuccess=()=>{
      const snap=req.result;
      if(!snap){toast('❌ Snapshot niet gevonden');return;}
      const d=snap.data;
      const date=new Date(snap.date).toLocaleString('nl-NL',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
      const preview=`${d.tasks?.length||0} opdrachten · ${d.notes?.length||0} notities · ${d.goals?.length||0} doelen`;
      orbitConfirm(`Herstellen van backup:\n${date}\n${preview}\n\nJe huidige data wordt VERVANGEN. Doorgaan?`,()=>{
      // Maak eerst backup van huidige staat
      backupSnapshot('pre-restore').then(()=>{
        if(d.tasks)    {S.tasks    =d.tasks;    localStorage.setItem('pb_tasks',    JSON.stringify(d.tasks));}
        if(d.promptLib){S.promptLib=d.promptLib;localStorage.setItem('pb_prompts',  JSON.stringify(d.promptLib));}
        if(d.presets)  {S.presets  =d.presets;  localStorage.setItem('pb_presets',  JSON.stringify(d.presets));}
        if(d.templates){S.templates=d.templates;localStorage.setItem('pb_templates',JSON.stringify(d.templates));}
        if(d.goals)    {S.goals    =d.goals;    localStorage.setItem('pb_goals',    JSON.stringify(d.goals));}
        if(d.notes)    {S.notes    =d.notes;    localStorage.setItem('pb_notes',    JSON.stringify(d.notes));}
        if(d.reviews)  {S.reviews  =d.reviews;  localStorage.setItem('pb_reviews',  JSON.stringify(d.reviews));}
        if(d.colorPresets){localStorage.setItem('pb_color_presets',JSON.stringify(d.colorPresets));}
        if(d.customColors!==undefined&&d.customColors!==null){localStorage.setItem('pb_custom_colors',JSON.stringify(d.customColors));if(typeof _customColors!=='undefined')window._customColors=d.customColors;}
        if(d.theme&&typeof applyTheme==='function')applyTheme(d.theme);
        if(d.font&&typeof applyFont==='function')applyFont(d.font);
        if(d.iconStyle&&typeof _iconStyle!=='undefined'){window._iconStyle=d.iconStyle;localStorage.setItem('pb_icon_style',d.iconStyle);}
        localStorage.setItem('pb_change_count','0');
        toast('✅ Data hersteld van backup!',4000);
        nav('settings');
        renderBackupSection();
      });
      },null,'Backup herstellen');
    };
  });
}

/* ── Download snapshot als JSON ─────────────────────────── */
function backupDownload(id){
  backupOpenDB().then(db=>{
    if(!db)return;
    const tx=db.transaction(BACKUP_STORE,'readonly');
    const req=tx.objectStore(BACKUP_STORE).get(id);
    req.onsuccess=()=>{
      const snap=req.result;if(!snap)return;
      const blob=new Blob([JSON.stringify(snap,null,2)],{type:'application/json'});
      const a=document.createElement('a');
      a.href=URL.createObjectURL(blob);
      const d=new Date(snap.date).toISOString().slice(0,16).replace('T','_').replace(':','-');
      a.download='orbit_backup_'+d+'.json';
      document.body.appendChild(a);a.click();document.body.removeChild(a);
      toast('✅ Backup gedownload!');
    };
  });
}

/* ── Bekijk inhoud van snapshot ─────────────────────────── */
function backupViewContents(id){
  backupOpenDB().then(db=>{
    if(!db)return;
    const tx=db.transaction(BACKUP_STORE,'readonly');
    const req=tx.objectStore(BACKUP_STORE).get(id);
    req.onsuccess=()=>{
      const snap=req.result;if(!snap)return;
      const d=snap.data;
      const date=new Date(snap.date).toLocaleString('nl-NL',{weekday:'long',day:'2-digit',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'});
      orbitAlert(
        `Opdrachten:         ${d.tasks?.length||0}\n`+
        `Notities:           ${d.notes?.length||0}\n`+
        `Doelen:             ${d.goals?.length||0}\n`+
        `Weekreviews:        ${d.reviews?.length||0}\n`+
        `Prompt-bibliotheek: ${d.promptLib?.length||0}\n`+
        `Sjablonen:          ${d.templates?.length||0}\n`+
        `Presets:            ${d.presets?.length||0}`,
        `Backup — ${date}`
      );
    };
  });
}

/* ── Update sidebar-badge op instellingen-item ──────────── */
function _updateBackupBadge(){
  const navEl=document.getElementById('nav-settings');
  if(!navEl)return;
  let badge=document.getElementById('backup-badge');
  if(_backupBadge){
    if(!badge){
      badge=document.createElement('span');
      badge.id='backup-badge';
      badge.textContent='!';
      badge.style.cssText='background:#ef4444;color:#fff;border-radius:50%;width:14px;height:14px;font-size:8px;display:inline-flex;align-items:center;justify-content:center;margin-left:auto;font-weight:700;flex-shrink:0;';
      navEl.appendChild(badge);
    }
  } else {
    if(badge)badge.remove();
  }
}

/* ── Render backup-lijst in settings-sectie ─────────────── */
async function renderBackupSection(){
  const el=document.getElementById('backup-list-content');
  if(!el)return;
  const all=await backupList();
  const reasonLabel=r=>({daily:'Dagelijks',auto:'Auto',  'auto-counter':'Auto (10 wijzigingen)','pre-restore':'Vóór herstel',manual:'Handmatig'}[r]||r);
  if(!all.length){
    el.innerHTML=`<div class="text-sm text-gray-400 py-4 text-center">Nog geen backups — de eerste wordt aangemaakt bij het sluiten van de app of na 10 wijzigingen.</div>
      <button onclick="backupSnapshot('manual').then(()=>{renderBackupSection();toast('✅ Handmatige backup gemaakt!')})" class="btn bs text-sm w-full mt-2">${ic('save',14)} Nu handmatig backup maken</button>`;
    requestAnimationFrame(applyIcons);
    return;
  }
  el.innerHTML=`
    <div class="flex items-center justify-between mb-3">
      <div class="text-xs text-gray-500">${all.length} van ${BACKUP_MAX} backups opgeslagen · oudste worden automatisch gewist</div>
      <button onclick="orbitConfirm('Alle backups permanent verwijderen?',()=>backupClear().then(()=>{renderBackupSection();toast('✅ Alle backups gewist')}),null,'Backups wissen')" class="btn bs text-xs" style="color:#ef4444">${ic('trash',13)} Alles wissen</button>
    </div>
    <div class="space-y-2">
    ${all.map(snap=>{
      const date=new Date(snap.date).toLocaleString('nl-NL',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
      const size=(JSON.stringify(snap.data).length/1024).toFixed(1);
      return`<div class="card p-3 flex items-center gap-3">
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-sm">${date}</div>
          <div class="text-xs text-gray-400 mt-0.5">${reasonLabel(snap.reason)} · ${size} KB · ${snap.data.tasks?.length||0} opdrachten, ${snap.data.notes?.length||0} notities, ${snap.data.goals?.length||0} doelen</div>
        </div>
        <div class="flex gap-1 flex-shrink-0">
          <button onclick="backupViewContents('${snap.id}')" class="btn bs text-xs py-1 px-2" title="Bekijk inhoud">${ic('eye',13)}</button>
          <button onclick="backupDownload('${snap.id}')" class="btn bs text-xs py-1 px-2" title="Download JSON">${ic('download',13)}</button>
          <button onclick="backupRestore('${snap.id}')" class="btn bp text-xs py-1 px-2">${ic('undo',13)} Herstellen</button>
          <button onclick="backupDelete('${snap.id}').then(()=>{renderBackupSection();toast('✅ Backup verwijderd')})" class="btn bs text-xs py-1 px-2" style="color:#ef4444" title="Verwijder">${ic('trash',13)}</button>
        </div>
      </div>`;
    }).join('')}
    </div>
    <button onclick="backupSnapshot('manual').then(()=>{renderBackupSection();toast('✅ Handmatige backup gemaakt!')})" class="btn bs text-sm w-full mt-3">${ic('save',14)} Nu handmatig backup maken</button>`;
  requestAnimationFrame(applyIcons);
}

/* ── Bump change counter — aangeroepen door save-helpers ── */
function backupBumpCounter(){
  if(_backupInProgress)return;
  const n=parseInt(localStorage.getItem('pb_change_count')||'0',10);
  const next=n+1;
  localStorage.setItem('pb_change_count',String(next));
  if(next>=10){
    localStorage.setItem('pb_change_count','0');
    _backupInProgress=true;
    backupSnapshot('auto-counter').then(()=>{_backupInProgress=false;});
  }
}

/* ── Init — aanroepen bij app-start ─────────────────────── */
async function backupInit(){
  const db=await backupOpenDB();
  if(!db)return;

  // Verwijder snapshots ouder dan 30 dagen
  await _backupAutoPurge(db);

  // Badge: is laatste backup >7 dagen oud?
  const all=await backupList();
  if(!all.length){
    _backupBadge=true;
  } else {
    const daysSince=(Date.now()-new Date(all[0].date).getTime())/86400000;
    _backupBadge=daysSince>7;
  }
  _updateBackupBadge();

  // Dagelijkse snapshot: max 1x per dag
  const today=new Date().toISOString().slice(0,10);
  const alreadyToday=all.some(s=>s.date.startsWith(today));
  if(!alreadyToday){
    await backupSnapshot('daily');
  }
}
