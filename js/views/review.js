/* ══════════════════════════════════════════════════════════
   📊  WEEKREVIEW
   ══════════════════════════════════════════════════════════ */
function getWeekBounds(offset=0){
  const now=new Date();
  const day=now.getDay();
  const diffToMon=day===0?-6:1-day;
  const mon=new Date(now);mon.setDate(now.getDate()+diffToMon+(offset*7));mon.setHours(0,0,0,0);
  const sun=new Date(mon);sun.setDate(mon.getDate()+6);sun.setHours(23,59,59,999);
  return{mon,sun,
    monStr:mon.toISOString().slice(0,10),
    sunStr:sun.toISOString().slice(0,10),
    label:mon.toLocaleDateString('nl-NL',{day:'2-digit',month:'long'})+' – '+sun.toLocaleDateString('nl-NL',{day:'2-digit',month:'long',year:'numeric'})
  };
}

function vReview(){
  const offset=S._reviewOffset||0;
  const week=getWeekBounds(offset);
  const isCurrentWeek=offset===0;
  const today=new Date().toISOString().slice(0,10);

  // Taken die deze week aangemaakt of afgerond zijn
  const weekTasks=S.tasks.filter(t=>{
    const created=t.createdAt?.slice(0,10)||'';
    return created>=week.monStr&&created<=week.sunStr;
  });
  const completedTasks=S.tasks.filter(t=>taskPct(t)===100&&!t.archived);
  const overdueTasks=S.tasks.filter(t=>t.deadline&&t.deadline<today&&taskPct(t)<100&&!t.archived);
  const nextWeek=getWeekBounds(1);
  const upcomingTasks=S.tasks.filter(t=>t.deadline&&t.deadline>=today&&t.deadline<=nextWeek.sunStr&&!t.archived);
  const goalProgress=S.goals.filter(g=>goalPct(g)>0&&goalPct(g)<100);

  // Bestaande review voor deze week ophalen of leeg
  const revKey=week.monStr;
  let rev=S.reviews.find(r=>r.weekStart===revKey);
  if(!rev){rev={id:mkId(),weekStart:revKey,reflection:'',nextGoals:'',createdAt:new Date().toISOString()};S.reviews.push(rev);saveReviews();}

  const taskRow=(t,emoji='')=>{
    const pct=taskPct(t);
    const lbl=t.name||(t.input?.goal||'Opdracht').slice(0,45);
    return `<div class="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
      <span class="text-sm">${emoji||'📋'}</span>
      <span class="flex-1 text-sm truncate ${pct===100?'text-emerald-600 font-medium':''}">${lbl}</span>
      <span class="text-xs font-bold ${pct===100?'text-emerald-500':'text-indigo-500'}">${pct}%</span>
    </div>`;
  };

  return `<div class="space-y-5">
    <!-- Header + navigatie -->
    <div class="flex items-center justify-between flex-wrap gap-3">
      <div>
        <h1 class="text-2xl font-bold">📊 Weekreview</h1>
        <p class="text-gray-400 text-sm mt-0.5">${week.label}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn bs text-sm" onclick="S._reviewOffset=(S._reviewOffset||0)-1;nav('review')">← Vorige week</button>
        ${!isCurrentWeek?`<button class="btn bp text-sm" onclick="S._reviewOffset=0;nav('review')">Huidige week</button>`:'<span class="text-xs text-indigo-500 font-semibold px-2">Huidige week</span>'}
        ${offset<0?`<button class="btn bs text-sm" onclick="S._reviewOffset=(S._reviewOffset||0)+1;nav('review')">Volgende week →</button>`:''}
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <!-- Linker kolom -->
      <div class="space-y-4">
        <!-- Afgeronde taken -->
        <div class="card p-4">
          <div class="font-semibold text-sm mb-3 flex items-center gap-2">
            <span class="text-green-500">✅</span> Afgeronde opdrachten (${completedTasks.length})
          </div>
          ${completedTasks.length
            ?completedTasks.slice(0,6).map(t=>taskRow(t,'✅')).join('')
            :'<div class="text-xs text-gray-400 py-2">Nog geen afgeronde opdrachten</div>'}
        </div>

        <!-- Deze week aangemaakt -->
        <div class="card p-4">
          <div class="font-semibold text-sm mb-3 flex items-center gap-2">
            <span>📋</span> Aangemaakt deze week (${weekTasks.length})
          </div>
          ${weekTasks.length
            ?weekTasks.slice(0,5).map(t=>taskRow(t)).join('')
            :'<div class="text-xs text-gray-400 py-2">Geen opdrachten aangemaakt deze week</div>'}
        </div>

        <!-- Leerdoelen in uitvoering -->
        ${goalProgress.length?`<div class="card p-4">
          <div class="font-semibold text-sm mb-3 flex items-center gap-2"><span>🎯</span> Leerdoelen in uitvoering</div>
          ${goalProgress.slice(0,4).map(g=>`<div class="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
            <span class="flex-1 text-sm truncate">${g.name}</span>
            <div class="pbar" style="width:60px"><div class="pfill" style="width:${goalPct(g)}%"></div></div>
            <span class="text-xs font-bold text-indigo-500">${goalPct(g)}%</span>
          </div>`).join('')}
        </div>`:''}
      </div>

      <!-- Rechter kolom -->
      <div class="space-y-4">
        <!-- Openstaand / verlopen -->
        <div class="card p-4">
          <div class="font-semibold text-sm mb-3 flex items-center gap-2">
            <span class="text-red-500">⚠️</span> Verlopen / niet afgerond (${overdueTasks.length})
          </div>
          ${overdueTasks.length
            ?overdueTasks.slice(0,5).map(t=>taskRow(t,'⏰')).join('')
            :'<div class="text-xs text-emerald-600 py-2 font-medium">✅ Niets verlopen — goed bezig!</div>'}
        </div>

        <!-- Komende week -->
        <div class="card p-4">
          <div class="font-semibold text-sm mb-3 flex items-center gap-2">
            <span>📅</span> Deadlines komende week (${upcomingTasks.length})
          </div>
          ${upcomingTasks.length
            ?upcomingTasks.slice(0,5).map(t=>taskRow(t,'📅')).join('')
            :'<div class="text-xs text-gray-400 py-2">Geen deadlines komende week</div>'}
        </div>

        <!-- Snel actie -->
        <div class="card p-4 bg-indigo-50 border-indigo-200">
          <div class="font-semibold text-sm text-indigo-800 mb-2">⚡ Snel naar</div>
          <div class="grid grid-cols-2 gap-2">
            <button class="btn bs text-xs w-full justify-center" onclick="nav('new-task')">✏️ Nieuwe opdracht</button>
            <button class="btn bs text-xs w-full justify-center" onclick="S.tid=null;nav('ai-checklist')">📥 AI → Checklist</button>
            <button class="btn bs text-xs w-full justify-center" onclick="nav('portfolio')">🎯 Portfolio</button>
            <button class="btn bs text-xs w-full justify-center" onclick="createNote();nav('notes')">📓 Notitie</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Reflectie sectie -->
    <div class="card p-5 space-y-4">
      <div class="font-semibold text-sm">💭 Reflectie — week van ${week.label}</div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="lbl">Wat ging goed? Wat heb ik geleerd?</label>
          <textarea class="inp text-sm w-full" rows="5"
            placeholder="Schrijf hier je reflectie op de afgelopen week..."
            onchange="updateReview('${rev.id}','reflection',this.value)">${rev.reflection||''}</textarea>
        </div>
        <div>
          <label class="lbl">Doelen & focus voor volgende week</label>
          <textarea class="inp text-sm w-full" rows="5"
            placeholder="Wat ga ik volgende week oppakken? Wat wil ik afronden?"
            onchange="updateReview('${rev.id}','nextGoals',this.value)">${rev.nextGoals||''}</textarea>
        </div>
      </div>
      <div class="flex gap-2 flex-wrap">
        <button class="btn bp text-sm" onclick="copyReviewAsPrompt('${rev.id}')">📋 Kopieer als AI-prompt</button>
        <button class="btn bs text-sm" onclick="exportReviewMd('${rev.id}')">⬇️ Export .md</button>
        <button id="gen-planning-btn" class="btn bs text-sm" onclick="generateWeekPlanning('${rev.id}')">${ic('calendar',13)} Genereer weekplanning</button>
      </div>
    </div>

    <!-- Weekplanning resultaat -->
    ${rev.planning?`<div class="card p-5 space-y-3">
      <div class="flex items-center justify-between">
        <div class="font-semibold text-sm flex items-center gap-2">${ic('calendar',15)} Weekplanning — ${getWeekBounds((S._reviewOffset||0)+1).label}</div>
        <div class="flex gap-2">
          <button class="btn bs text-xs" onclick="copyText(getReviewPlanning('${rev.id}'),'Planning gekopieerd!')">📋 Kopieer</button>
          <button class="btn bs text-xs" onclick="savePlanningAsNote('${rev.id}')">💾 Als notitie</button>
          <button class="btn bs text-xs" onclick="savePlanningAsTask('${rev.id}')">📋 Als checklist-taak</button>
          <button class="btn bs text-xs" style="color:#ef4444" onclick="clearPlanning('${rev.id}')">🗑️</button>
        </div>
      </div>
      <div class="prose text-sm" style="max-width:none">${DOMPurify.sanitize(marked.parse(rev.planning))}</div>
      <div class="text-xs text-gray-400">Gegenereerd op ${rev.planningGeneratedAt?new Date(rev.planningGeneratedAt).toLocaleString('nl-NL'):''}</div>
    </div>`:''}
  </div>`;
}

function updateReview(id,field,val){const r=S.reviews.find(x=>x.id===id);if(r){r[field]=val;saveReviews();}}
function copyReviewAsPrompt(id){
  const r=S.reviews.find(x=>x.id===id);if(!r)return;
  const week=getWeekBounds(S._reviewOffset||0);
  const prompt=`Dit is mijn weekreview voor ${week.label}.\n\nReflectie:\n${r.reflection||'(nog niet ingevuld)'}\n\nDoelen volgende week:\n${r.nextGoals||'(nog niet ingevuld)'}\n\nHelp mij:\n1. Mijn reflectie te verdiepen met gerichte vragen\n2. Mijn doelen voor volgende week concreter en SMART te maken\n3. Tips te geven om effectiever te werken`;
  copyText(prompt,'Review als AI-prompt gekopieerd!');
}
function exportReviewMd(id){
  const r=S.reviews.find(x=>x.id===id);if(!r)return;
  const week=getWeekBounds(S._reviewOffset||0);
  const md=`# 📊 Weekreview — ${week.label}\n\n## Reflectie\n\n${r.reflection||'—'}\n\n## Doelen volgende week\n\n${r.nextGoals||'—'}\n`;
  dlMd(md,'weekreview_'+r.weekStart);
}
function getReviewPlanning(id){const r=S.reviews.find(x=>x.id===id);return r?.planning||'';}
function clearPlanning(id){const r=S.reviews.find(x=>x.id===id);if(r){r.planning=null;r.planningGeneratedAt=null;saveReviews();render();}}
function savePlanningAsNote(id){
  const r=S.reviews.find(x=>x.id===id);if(!r||!r.planning)return;
  const week=getWeekBounds((S._reviewOffset||0)+1);
  const n=mkNote('Weekplanning '+week.label);
  n.body=r.planning;n.tags=['planning','weekreview'];
  S.notes.unshift(n);saveNotes();S.nid=n.id;nav('notes');
  toast('✅ Opgeslagen als notitie!');
}
function savePlanningAsTask(id){
  const r=S.reviews.find(x=>x.id===id);if(!r||!r.planning)return;
  const week=getWeekBounds((S._reviewOffset||0)+1);
  const name='Weekplanning '+week.label;
  const t=mkTask('task',{goal:name},name);
  t.analysis=r.planning;t.tags=['planning'];
  saveT();S.tid=t.id;toast('✅ Opgeslagen als checklist-taak!');nav('analysis');
}
