/* ── DASHBOARD ──────────────────────────────────────────── */
function mkTaskCard(t,today,archived=false){
  const pct=taskPct(t), done=taskDoneCount(t), tot=taskTotalCount(t);
  const lbl=t.name||(t.input?.goal||t.input?.promptGoal||'Opdracht').slice(0,40);
  const typeKey=t.type==='ai-checklist'?'checklist':t.type==='prompt'?'prompt':t.type==='file-ai'?'upload':'edit';
  const date=new Date(t.createdAt).toLocaleDateString('nl-NL',{day:'2-digit',month:'short'});
  const dlColor=t.deadline&&t.deadline<today?'text-red-500 font-bold':'text-gray-400';
  const dlLabel=t.deadline?new Date(t.deadline+'T12:00:00').toLocaleDateString('nl-NL',{day:'2-digit',month:'short',year:'numeric'}):'Geen deadline';
  const pctColor=pct===100?'text-emerald-600':pct>50?'text-indigo-600':'text-gray-500';
  const openView=t.type==='ai-checklist'?`S.tid='${t.id}';nav('ai-checklist','${t.id}')`:`nav('analysis','${t.id}')`;
  return `<div class="card p-4 hover:shadow-md transition-shadow${archived?' opacity-60':''}">
    <div class="flex items-start gap-3">
      <span class="text-xl mt-0.5">${ic(typeKey,16)}</span>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <input class="font-semibold text-sm text-gray-900 bg-transparent border-none outline-none flex-1 truncate cursor-text"
            value="${lbl.replace(/"/g,'&quot;')}"
            onchange="renameTask('${t.id}',this.value)"
            onclick="event.stopPropagation()"
            title="Klik om naam te wijzigen">
          ${archived?`<span style="font-size:10px;background:#e5e7eb;color:#6b7280;padding:1px 5px;border-radius:4px;white-space:nowrap">Archief</span>`:''}
        </div>
        <div class="flex items-center gap-3 text-xs text-gray-400 mb-2">
          <span>${date}</span>
          <span>·</span>
          <span class="${dlColor}">📅 ${dlLabel}</span>
          ${t.mode==='ai'?`<span class="ma">AI</span>`:`<span class="ml">Lokaal</span>`}
        </div>
        ${tot>0?`<div class="pbar mb-1"><div class="pfill" style="width:${pct}%"></div></div>
        <div class="flex justify-between text-xs">
          <span class="text-gray-400">${done}/${tot} taken</span>
          <span class="${pctColor} font-bold">${pct}%${pct===100?' ✅':''}</span>
        </div>`:'<div class="text-xs text-gray-300 italic">Nog geen checklist</div>'}
      </div>
    </div>
    <!-- Task tags -->
    <div class="flex items-center gap-1 flex-wrap mt-2" onclick="event.stopPropagation()">
      ${(t.tags||[]).map(tg=>`<span class="text-xs bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">${tg}<button onclick="removeTaskTag('${t.id}','${tg}')" class="text-indigo-300 hover:text-red-400 font-bold leading-none ml-0.5">×</button></span>`).join('')}
      <input class="inp text-xs py-0.5" style="width:90px;flex-shrink:0" placeholder="+ tag"
        onkeydown="if(event.key==='Enter'){addTaskTag('${t.id}',this.value);this.value='';}" onclick="event.stopPropagation()">
    </div>
    <div class="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
      <button class="btn bs text-xs py-1 px-2 flex-1" onclick="${openView}">Openen</button>
      <input type="date" class="inp text-xs py-1" style="width:130px" value="${t.deadline||''}"
        onchange="setDeadline('${t.id}',this.value)" onclick="event.stopPropagation()" title="Stel deadline in">
      <button class="btn bs text-xs py-1 px-2" onclick="event.stopPropagation();exportTaskPDF('${t.id}')" title="Exporteer als PDF">📄</button>
      ${archived
        ?`<button class="btn bs text-xs py-1 px-2" onclick="event.stopPropagation();unarchiveTask('${t.id}')" title="Herstellen">↩️</button>`
        :`<button class="btn bs text-xs py-1 px-2" onclick="event.stopPropagation();archiveTask('${t.id}')" title="Archiveren">📦</button>`}
      <button class="btn bs text-xs py-1 px-2" onclick="event.stopPropagation();delTask('${t.id}')" title="Verwijder" style="color:#ef4444">🗑️</button>
    </div>
  </div>`;
}

function vDash(){
  const activeTasks=S.tasks.filter(t=>!t.archived);
  const archivedTasks=S.tasks.filter(t=>t.archived);
  const total=activeTasks.length;
  const analyzed=activeTasks.filter(t=>t.analysis).length;
  const today=new Date().toISOString().slice(0,10);
  const allTaskTags=getAllTaskTags();
  const filteredActive=_dashTag?activeTasks.filter(t=>(t.tags||[]).includes(_dashTag)):activeTasks;

  const taskCards=filteredActive.map(t=>mkTaskCard(t,today,false)).join('');
  const archCards=archivedTasks.map(t=>mkTaskCard(t,today,true)).join('');

  return `<div class="space-y-5">
    <div class="flex items-center justify-between">
      <div><h1 class="text-2xl font-bold">Dashboard</h1><p class="text-gray-400 text-sm mt-0.5">Alle opdrachten op één plek</p></div>
      ${S.geminiKey?`<span class="ma">🤖 Gemini actief</span>`:`<span class="ml">⚡ Lokale generator</span>`}
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-3">
      <div class="card p-3 text-center"><div class="text-2xl font-bold text-indigo-600">${total}</div><div class="text-xs text-gray-400">Actief</div></div>
      <div class="card p-3 text-center"><div class="text-2xl font-bold text-emerald-500">${analyzed}</div><div class="text-xs text-gray-400">Geanalyseerd</div></div>
      <div class="card p-3 text-center"><div class="text-2xl font-bold text-violet-500">${activeTasks.filter(t=>taskPct(t)===100).length}</div><div class="text-xs text-gray-400">Afgerond</div></div>
      <div class="card p-3 text-center"><div class="text-2xl font-bold text-orange-400">${activeTasks.filter(t=>t.deadline&&t.deadline<today&&taskPct(t)<100).length}</div><div class="text-xs text-gray-400">Verlopen</div></div>
    </div>

    <!-- Quick actions -->
    <div class="grid grid-cols-5 gap-3">
      ${[['✏️','new-task','Nieuwe Opdracht'],['⚡','prompt-gen','Prompt Genereren'],['📤','file-to-ai','Bestand → AI'],['📥','ai-checklist','AI → Checklist'],['🌐','launcher','AI Launcher']].map(([ic,v,l])=>`<div class="card p-3 cursor-pointer hover:shadow-md transition-shadow text-center" onclick="${v==='ai-checklist'?'S.tid=null;':''}nav('${v}')"><div class="text-2xl mb-1">${ic}</div><div class="font-semibold text-xs text-gray-700">${l}</div></div>`).join('')}
    </div>

    <!-- Tag filter bar -->
    ${allTaskTags.length?`<div class="flex flex-wrap gap-1 items-center">
      <span class="text-xs text-gray-400 font-semibold mr-1">Filter:</span>
      <button onclick="_dashTag='';render()" class="text-xs px-2 py-0.5 rounded-full border" style="${!_dashTag?`background:var(--p);color:var(--icon-txt,#fff);border-color:var(--p)`:`background:var(--card);color:var(--txt2);border-color:var(--card-border)`}">Alle</button>
      ${allTaskTags.map(tg=>`<button onclick="_dashTag='${tg}';render()" class="text-xs px-2 py-0.5 rounded-full border" style="${_dashTag===tg?`background:var(--p);color:var(--icon-txt,#fff);border-color:var(--p)`:`background:var(--card);color:var(--txt2);border-color:var(--card-border)`}">${tg}</button>`).join('')}
    </div>`:''}

    <!-- Active tasks -->
    ${total>0?`<div>
      <div class="flex items-center justify-between mb-3">
        <h2 class="font-semibold text-gray-800">Actieve opdrachten${_dashTag?` <span style="font-size:11px;background:#e0e7ff;color:#4f46e5;padding:1px 8px;border-radius:10px;font-weight:700">${filteredActive.length} van ${total}</span>`:''}</h2>
        <div class="flex gap-3">
          <span class="text-xs text-gray-400">📦 = archiveer · 🗑️ = verwijder</span>
          <button class="text-xs text-red-400 hover:text-red-600" onclick="if(confirm('Alle actieve opdrachten wissen?')){S.tasks=S.tasks.filter(t=>t.archived);saveT();nav('dashboard')}">Wis actieve</button>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">${taskCards||'<div class="col-span-2 text-center text-gray-400 py-6 text-sm">Geen opdrachten met tag <strong>'+_dashTag+'</strong></div>'}</div>
    </div>`:`<div class="card p-10 text-center text-gray-400"><div class="text-4xl mb-3">📋</div><div class="font-semibold">Nog geen actieve opdrachten</div><div class="text-sm mt-1">Klik op een snelkoppeling hierboven om te beginnen</div></div>`}

    <!-- Archived tasks -->
    ${archivedTasks.length?`<div class="card overflow-hidden">
      <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left" onclick="toggleArchiveView()">
        <div class="flex items-center gap-2">
          <span class="text-lg">📦</span>
          <div class="font-semibold text-sm text-gray-700">Archief</div>
          <span style="background:#e5e7eb;color:#6b7280;padding:1px 8px;border-radius:10px;font-size:11px;font-weight:700">${archivedTasks.length}</span>
        </div>
        <span id="arch-ic" class="text-gray-400 text-xs">▼</span>
      </button>
      <div id="arch-list" class="hidden border-t border-gray-100 p-4">
        <div class="grid grid-cols-2 gap-3">${archCards}</div>
        <button class="btn bs text-xs mt-3" onclick="if(confirm('Archief leegmaken? (worden verwijderd)')){S.tasks=S.tasks.filter(t=>!t.archived);saveT();render()}">🗑️ Archief leegmaken</button>
      </div>
    </div>`:''}

    ${!S.geminiKey?`<div class="card p-4 bg-blue-50 border-blue-200"><div class="font-semibold text-blue-900 mb-1">🚀 Gratis upgrade: Gemini AI</div><div class="text-sm text-blue-800">Voeg een gratis Gemini API sleutel toe voor betere AI-analyses.</div><button class="btn bp text-xs mt-2" onclick="nav('settings')">⚙️ Instellen</button></div>`:''}
  </div>`;
}

function renameTask(id,name){const t=S.tasks.find(x=>x.id===id);if(t){t.name=name;saveT();renderHist();}}
function setDeadline(id,date){const t=S.tasks.find(x=>x.id===id);if(t){t.deadline=date;saveT();render();}}
function delTask(id){if(!confirm('Verwijder deze opdracht?'))return;S.tasks=S.tasks.filter(x=>x.id!==id);saveT();if(S.tid===id){S.tid=null;nav('dashboard');}else{render();}}
function archiveTask(id){const t=S.tasks.find(x=>x.id===id);if(t){t.archived=true;saveT();render();toast('📦 Gearchiveerd');}}
function unarchiveTask(id){const t=S.tasks.find(x=>x.id===id);if(t){t.archived=false;saveT();render();toast('✅ Hersteld');}}
function toggleArchiveView(){const el=document.getElementById('arch-list');const ic=document.getElementById('arch-ic');if(!el)return;el.classList.toggle('hidden');if(ic)ic.textContent=el.classList.contains('hidden')?'▼':'▲';}
function addTaskTag(id,tag){const tg=tag.trim().toLowerCase();if(!tg)return;const t=S.tasks.find(x=>x.id===id);if(!t)return;if(!t.tags)t.tags=[];if(t.tags.includes(tg))return;t.tags.push(tg);saveT();render();}
function removeTaskTag(id,tag){const t=S.tasks.find(x=>x.id===id);if(!t)return;t.tags=(t.tags||[]).filter(tg=>tg!==tag);saveT();render();}
function getAllTaskTags(){const s=new Set();S.tasks.filter(t=>!t.archived).forEach(t=>(t.tags||[]).forEach(tg=>s.add(tg)));return[...s].sort();}
