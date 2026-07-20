/* ── ANALYSIS VIEW ──────────────────────────────────────── */
function vAnalysis(){
  const t=getTask();
  if(!t)return`<div class="card p-10 text-center text-gray-400"><div class="text-4xl mb-3">🔍</div><div>Geen analyse</div><button class="btn bp mt-4" onclick="nav('dashboard')">Dashboard</button></div>`;

  // AI Checklist tasks → redirect
  if(t.type==='ai-checklist'){S.view='ai-checklist';return vAIChecklistResult(t);}

  const lbl=t.name||(t.input?.goal||t.input?.promptGoal||'Analyse');
  const date=new Date(t.createdAt).toLocaleDateString('nl-NL',{day:'2-digit',month:'long',year:'numeric'});
  const today=new Date().toISOString().slice(0,10);
  const dlColor=t.deadline&&t.deadline<today?'text-red-500 font-bold':'text-gray-400';
  const improved=extractPrompt(t.analysis||'');
  const checks=Object.values(t.checks||{});
  const total=checks.length,done=checks.filter(Boolean).length,pct=total?Math.round(done/total*100):0;

  let md=t.analysis||'',ci=0,_chInit=false;
  md=md.replace(/- \[( |x)\] (.+)/gi,(_,ch,label)=>{
    const k='c'+ci++;
    const isX=ch.trim().toLowerCase()==='x';
    // Initialiseer altijd — dit zorgt dat taskTotalCount klopt op het dashboard
    if(t.checks[k]===undefined){t.checks[k]=isX;_chInit=true;}
    const isChecked=t.checks[k];
    return `<li style="list-style:none;display:flex;align-items:flex-start;gap:8px;margin:3px 0"><input type="checkbox" class="task-cb" data-key="${k}" ${isChecked?'checked':''} style="margin-top:3px;width:16px;height:16px;cursor:pointer;accent-color:#4f46e5;flex-shrink:0"><span id="cl-${k}" class="${isChecked?'tdone':''}">${label}</span></li>`;
  });
  if(_chInit)saveT(); // Sla op zodat dashboard direct de juiste % toont
  const html=DOMPurify.sanitize(marked.parse(md),{ADD_ATTR:['data-key']});

  return `<div class="space-y-4">
    <div class="flex items-start justify-between gap-3">
      <div class="flex-1">
        <input class="text-xl font-bold text-gray-900 bg-transparent border-none outline-none w-full" value="${lbl.replace(/"/g,'&quot;')}" onchange="renameTask('${t.id}',this.value)" title="Klik om naam te wijzigen">
        <div class="flex items-center gap-3 text-xs mt-1">
          <span class="text-gray-400">${date}</span>
          ${t.deadline?`<span class="${dlColor}">📅 ${new Date(t.deadline+'T12:00:00').toLocaleDateString('nl-NL',{day:'2-digit',month:'short',year:'numeric'})}</span>`:''}
          <span class="ml">⚡ Lokaal</span>
        </div>
      </div>
      <div class="flex gap-2 flex-shrink-0">
        <input type="date" class="inp text-xs py-1" style="width:140px" value="${t.deadline||''}" onchange="setDeadline('${t.id}',this.value)" title="Deadline instellen">
        <button class="btn bs text-xs" onclick="rerun('${t.id}')">🔄</button>
        <button class="btn bs text-xs" style="color:#ef4444" onclick="delTask('${t.id}')">🗑️</button>
      </div>
    </div>

    ${total>0?`<div class="card p-3"><div class="flex justify-between text-xs mb-1.5"><span class="font-semibold">Checklist</span><span class="font-bold ${pct===100?'text-emerald-600':'text-indigo-600'}">${done}/${total} (${pct}%)</span></div><div class="pbar"><div class="pfill" id="pf" style="width:${pct}%"></div></div></div>`:''}

    <div class="flex flex-wrap gap-2">
      ${improved?`<button class="btn bg" onclick="copyPrompt('${improved.replace(/'/g,"\\'")}')">📋 Kopieer prompt</button>`:''}
      <button class="btn bs" onclick="copyText(getTask()?.analysis||'','Analyse gekopieerd!')">📄 Kopieer alles</button>
      <button class="btn bs" onclick="dlMd(getTask()?.analysis||'','${lbl}')">⬇️ .md</button>
      <button class="btn bs" onclick="exportTaskPDF('${t.id}')">📄 PDF</button>
      ${improved?`<button class="btn bs" onclick="saveToLib('${lbl.replace(/'/g,"\\'")}',extractPrompt(getTask()?.analysis||''))">💾 Opslaan in bibliotheek</button>`:''}
      <button class="btn bs" onclick="nav('launcher')">🌐 AI Launcher</button>
      <button class="btn bs" onclick="archiveTask(S.tid);nav('dashboard')" title="Archiveer deze opdracht">📦 Archiveer</button>
    </div>

    <div class="card p-5"><div class="prose">${html}</div></div>
  </div>`;
}

function bindChecks(){
  const t=getTask();if(!t)return;
  document.querySelectorAll('.task-cb').forEach(cb=>{
    cb.addEventListener('change',e=>{
      const k=e.target.dataset.key;t.checks[k]=e.target.checked;saveT();
      const sp=document.getElementById('cl-'+k);if(sp){e.target.checked?sp.classList.add('tdone'):sp.classList.remove('tdone');}
      const vals=Object.values(t.checks),tot=vals.length,dn=vals.filter(Boolean).length;
      const pf=document.getElementById('pf');if(pf)pf.style.width=Math.round(dn/tot*100)+'%';
    });
  });
}

async function rerun(tid){
  const t=S.tasks.find(x=>x.id===tid);if(!t)return;
  t.checks={};saveT();S.tid=tid;
  await runAnalysis(t,null);
}
