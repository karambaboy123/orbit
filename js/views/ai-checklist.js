/* ── AI → CHECKLIST ─────────────────────────────────────── */
let _aioDragIdx=null,_aioDragTid=null;
const _aioCollapsed={}; // { 'tid:phaseName': true } — in-memory, resets on page reload

function toggleAIOPhase(tid,phaseName){
  const key=tid+':'+phaseName;
  _aioCollapsed[key]=!_aioCollapsed[key];
  S.tid=tid;render();
}

function getCheckOrder(t){
  if(!t.checkOrder||!t.checkOrder.length){
    t.checkOrder=Object.keys(t.checkLabels||{});
    saveT();
  }
  return t.checkOrder;
}
function aioOnDragStart(e,tid,i){
  _aioDragIdx=i;_aioDragTid=tid;
  e.dataTransfer.effectAllowed='move';
  e.dataTransfer.setData('text/plain',String(i));
  setTimeout(()=>{const el=document.getElementById('aio-item-'+i);if(el)el.classList.add('aio-dragging');},0);
}
function aioOnDragEnd(e){
  document.querySelectorAll('.aio-item').forEach(el=>{el.classList.remove('aio-over');el.classList.remove('aio-dragging');});
  _aioDragIdx=null;
}
function aioOnDragOver(e,i){
  e.preventDefault();
  e.dataTransfer.dropEffect='move';
  document.querySelectorAll('.aio-item').forEach(el=>el.classList.remove('aio-over'));
  const el=document.getElementById('aio-item-'+i);
  if(el)el.classList.add('aio-over');
}
function aioOnDrop(e,tid,toIdx){
  e.preventDefault();
  document.querySelectorAll('.aio-item').forEach(el=>el.classList.remove('aio-over'));
  if(_aioDragTid!==tid||_aioDragIdx===null)return;
  const fromIdx=_aioDragIdx;
  if(fromIdx===toIdx){_aioDragIdx=null;return;}
  const t=S.tasks.find(x=>x.id===tid);if(!t)return;
  const order=getCheckOrder(t);
  const [item]=order.splice(fromIdx,1);
  const insertAt=fromIdx<toIdx?toIdx-1:toIdx;
  order.splice(insertAt,0,item);
  t.checkOrder=order;
  saveT();_aioDragIdx=null;
  S.tid=tid;render();
}

function vAIChecklist(){
  const t=S.tasks.find(x=>x.id===S.tid&&x.type==='ai-checklist');
  if(t&&t.analysis)return vAIChecklistResult(t);

  return `<div class="space-y-5">
    <div><h1 class="text-2xl font-bold">📥 AI → Checklist</h1><p class="text-gray-400 text-sm mt-0.5">Plak de reactie van een AI hieronder — de app maakt er automatisch een interactieve checklist van</p></div>

    <div class="card p-6 space-y-4">
      <div>
        <label class="lbl">📋 Plak hier de AI-reactie <span class="text-red-400">*</span></label>
        <textarea id="aio-txt" class="inp text-sm" rows="13" placeholder="Plak hier de volledige reactie van ChatGPT, Gemini, Claude of een andere AI.

Werkt met:
• Genummerde lijsten (1. 2. 3.)
• Bullet points (- of *)
• Checkboxes (- [ ])
• Combinaties van hoofd- en subtaken

Tip: vraag de AI eerst om een checklist- of takenlijst-formaat te gebruiken voor het beste resultaat."></textarea>
      </div>
      <div class="grid grid-cols-3 gap-3">
        <div><label class="lbl">📝 Naam van de opdracht</label><input id="aio-name" class="inp" placeholder="Bijv: Marketingplan Q3"></div>
        <div><label class="lbl">🤖 Bron (optioneel)</label>
          <select id="aio-src" class="inp"><option value="">-- AI-tool --</option><option>ChatGPT</option><option>Gemini</option><option>Claude</option><option>Copilot</option><option>Andere</option></select></div>
        <div><label class="lbl">📅 Deadline opdracht</label><input id="aio-dl" class="inp" type="date"></div>
      </div>
      <div class="flex gap-3 flex-wrap">
        <button id="btn-aio" class="btn bp" onclick="processAIO()">✅ Maak Checklist</button>
        <button class="btn bs" onclick="saveAIOutputAsTask()" title="Sla de AI-output op als een gewone analyseopdracht met interactieve checkboxes">💾 Sla op als Opdracht</button>
        <button class="btn bs" onclick="document.getElementById('aio-txt').value=''">Wis</button>
      </div>
      <div class="text-xs text-gray-400">💡 <strong>Maak Checklist</strong> = interactieve drag & drop lijst · <strong>Sla op als Opdracht</strong> = volledige analyse met checkboxes in de analyse-weergave</div>
    </div>

    <div class="card p-4 bg-indigo-50 border-indigo-200 text-sm text-indigo-800">
      💡 <strong>Tip:</strong> Gebruik <strong>📤 Bestand → AI</strong> om de AI te vragen een checklist te maken. Kies "Checklist" of "Hoofd+Sub" als preset, kopieer het resultaat en plak het hier.
    </div>
  </div>`;
}

// Taak-extractie — pakt alles wat op een lijst-item lijkt
function extractTaken(txt){
  const taken=[];
  const seen=new Set();
  txt.split('\n').forEach(raw=>{
    const r=raw.trim();
    if(!r||r.length<3)return;
    let label=null;
    // Checkboxes: - [ ] of - [x]
    const cb=/^[-*]\s*\[[x ✓Xx]\]\s*(.+)/i.exec(r);
    if(cb){label=cb[1];}
    // Genummerd: 1. of 1)
    if(!label){const nm=/^\d{1,3}[.)]\s+(.+)/.exec(r);if(nm)label=nm[1];}
    // Bullets: - * • + (ook met bold markdown)
    if(!label){const bl=/^[-*•+]\s+(.+)/.exec(r);if(bl)label=bl[1];}
    // Schoon en voeg toe
    if(label){
      // Strip markdown bold/italic/code
      label=label.replace(/\*\*/g,'').replace(/\*/g,'').replace(/`/g,'').replace(/_/g,'').trim();
      // Strip lange verklaringen na een koppelteken of dubbele punt
      label=label.replace(/\s*[-–—:]\s{0,3}[A-Z].{20,}$/,'').trim();
      label=label.replace(/\s*\([^)]{15,}\)$/,'').trim();
      if(label.length>3&&!seen.has(label.toLowerCase())){
        seen.add(label.toLowerCase());
        taken.push(label);
      }
    }
  });
  return taken;
}

function saveAIOutputAsTask(){
  const txt=document.getElementById('aio-txt')?.value?.trim()||'';
  if(!txt||txt.length<5){toast('⚠️ Voer eerst AI-output in');return;}
  const name=document.getElementById('aio-name')?.value?.trim()||'AI Output';
  const src=document.getElementById('aio-src')?.value||'';
  const dl=document.getElementById('aio-dl')?.value||'';
  const t=mkTask('task',{goal:name,source:src},name);
  t.analysis=txt;
  t.deadline=dl;
  t.mode=src?'ai':'local';
  saveT();S.tid=t.id;
  toast('✅ Opgeslagen als opdracht!');
  nav('analysis');
}
function processAIO(){
  const txt=document.getElementById('aio-txt')?.value?.trim()||'';
  if(!txt||txt.length<5){toast('⚠️ Voer een AI-reactie in');return;}
  const name=document.getElementById('aio-name')?.value?.trim()||'AI Checklist';
  const src=document.getElementById('aio-src')?.value||'';
  const dl=document.getElementById('aio-dl')?.value||'';
  let taken=extractTaken(txt);
  // Noodplan: als er echt niks gevonden is, maak dan van elke niet-lege regel een taak
  if(!taken.length){
    taken=txt.split('\n').map(r=>r.trim()).filter(r=>r.length>8&&!/^#+/.test(r)&&!/^\*\*/.test(r));
    taken=taken.slice(0,40);
  }
  const task=mkTask('ai-checklist',{rawOutput:txt,source:src},name);
  task.deadline=dl;
  taken.forEach((lbl,i)=>{const k='c'+i;task.checkLabels[k]=lbl;task.checks[k]=false;task.checkDates[k]='';});
  task.checkOrder=taken.map((_,i)=>'c'+i);
  task.analysis='generated';
  saveT(); S.tid=task.id; nav('ai-checklist',task.id);
}

function vAIChecklistResult(t){
  const order=getCheckOrder(t);
  const today=new Date().toISOString().slice(0,10);
  const dlColor=t.deadline&&t.deadline<today?'text-red-500':'text-gray-500';

  // Stats: alleen echte taken tellen (niet fase-headers)
  const taskKeys=order.filter(e=>!e.startsWith('__phase__'));
  const done=taskKeys.filter(k=>t.checks[k]).length;
  const total=taskKeys.length;
  const pct=total?Math.round(done/total*100):0;

  let taskNum=0,insideCollapsed=false;
  const rows=order.map((entry,i)=>{
    if(entry.startsWith('__phase__')){
      const pn=entry.slice(9);
      const collapsed=!!_aioCollapsed[t.id+':'+pn];
      insideCollapsed=collapsed;
      // Tel taken en afgerond in deze fase
      let ptotal=0,pdone=0;
      for(let j=i+1;j<order.length&&!order[j].startsWith('__phase__');j++){
        ptotal++;if(t.checks[order[j]])pdone++;
      }
      const safePN=pn.replace(/'/g,"\\'").replace(/"/g,'&quot;');
      return `<div class="aio-phase-row aio-item" id="aio-item-${i}"
        draggable="true"
        ondragstart="aioOnDragStart(event,'${t.id}',${i})"
        ondragover="aioOnDragOver(event,${i})"
        ondrop="aioOnDrop(event,'${t.id}',${i})"
        ondragend="aioOnDragEnd(event)">
        <span class="drag-handle" title="Slepen">⠿</span>
        <button onclick="toggleAIOPhase('${t.id}','${safePN}')"
          class="flex-shrink-0 text-indigo-500 hover:text-indigo-700 font-bold transition-colors"
          style="width:18px;text-align:center;font-size:10px;line-height:1"
          title="${collapsed?'Uitklappen':'Inklappen'}">
          ${collapsed?'▶':'▼'}
        </button>
        <span class="text-indigo-400 text-sm flex-shrink-0">📁</span>
        <input class="flex-1 font-bold text-sm text-indigo-700 bg-transparent border-none outline-none min-w-0"
          value="${safePN}"
          onchange="renameAIOPhase('${t.id}',${i},this.value)"
          placeholder="Fase naam...">
        <span class="text-xs flex-shrink-0 font-medium ${collapsed?'text-gray-500':'text-indigo-300'}"
          style="white-space:nowrap">
          ${collapsed?`${pdone}/${ptotal} afgerond ▸`:`${ptotal} taken`}
        </span>
        <button onclick="deleteAIOPhase('${t.id}',${i})"
          class="text-gray-300 hover:text-red-400 font-bold text-sm px-1 flex-shrink-0"
          title="Fase verwijderen">✕</button>
      </div>`;
    }
    // Taak binnen ingeklapte fase → niet renderen, wel nummeren
    taskNum++;
    if(insideCollapsed)return'';
    const k=entry;
    const lbl=(t.checkLabels[k]||'Taak').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const checked=t.checks[k]||false;
    const date=t.checkDates[k]||'';
    const overdue=date&&date<today&&!checked;
    return `<div class="ci-row aio-item ${overdue?'bg-red-50 border-red-200':''}"
      id="aio-item-${i}" draggable="true"
      ondragstart="aioOnDragStart(event,'${t.id}',${i})"
      ondragover="aioOnDragOver(event,${i})"
      ondrop="aioOnDrop(event,'${t.id}',${i})"
      ondragend="aioOnDragEnd(event)">
      <span class="drag-handle" title="Slepen om te herordenen">⠿</span>
      <span class="text-xs text-gray-400 font-mono flex-shrink-0 select-none" style="width:22px;text-align:right">${taskNum}.</span>
      <input type="checkbox" class="w-4 h-4 flex-shrink-0 cursor-pointer" style="accent-color:#4f46e5" ${checked?'checked':''}
        onchange="toggleAIOCheck('${t.id}','${k}',this.checked)">
      <span class="flex-1 text-sm ${checked?'tdone':''}" id="al-${k}">${lbl}</span>
      ${overdue?'<span class="text-xs text-red-500 flex-shrink-0 font-semibold">⚠️ Verlopen</span>':''}
      <input type="date" class="inp text-xs py-1 flex-shrink-0" style="width:130px" value="${date}"
        onchange="setCheckDate('${t.id}','${k}',this.value)" title="Deadline voor deze taak">
      <button onclick="deleteAIOTask('${t.id}','${k}',${i})"
        class="text-gray-300 hover:text-red-400 flex-shrink-0 font-bold text-sm px-1"
        title="Taak verwijderen">✕</button>
    </div>`;
  }).join('');

  return `<div class="space-y-4">
    <!-- Header -->
    <div class="flex items-start justify-between gap-3 flex-wrap">
      <div class="flex-1 min-w-0">
        <input class="text-xl font-bold text-gray-900 bg-transparent border-none outline-none w-full"
          value="${(t.name||'Checklist').replace(/"/g,'&quot;')}"
          onchange="renameTask('${t.id}',this.value)" title="Klik om naam te wijzigen">
        <div class="flex items-center gap-3 text-xs text-gray-400 mt-1">
          ${t.input?.source?`<span>Van: ${t.input.source}</span><span>·</span>`:''}
          <span class="${dlColor}">📅 ${t.deadline?new Date(t.deadline+'T12:00:00').toLocaleDateString('nl-NL',{day:'2-digit',month:'long',year:'numeric'}):'Geen deadline'}</span>
        </div>
      </div>
      <div class="flex gap-2 flex-wrap flex-shrink-0">
        <input type="date" class="inp text-xs py-1" style="width:135px" value="${t.deadline||''}"
          onchange="setDeadline('${t.id}',this.value)" title="Deadline opdracht">
        <button class="btn bs text-xs" onclick="S.tid=null;nav('ai-checklist')">↩ Nieuwe</button>
        <button class="btn bs text-xs" onclick="dlMd(aioToMd('${t.id}'),'${t.name||'checklist'}')">⬇️ .md</button>
        <button class="btn bs text-xs" onclick="exportChecklistPDF('${t.id}')">📄 PDF</button>
        <button class="btn bs text-xs" onclick="archiveTask('${t.id}');S.tid=null;nav('dashboard')" title="Archiveren">📦</button>
        <button class="btn bs text-xs" style="color:#ef4444" onclick="delTask('${t.id}')">🗑️</button>
      </div>
    </div>

    <!-- Progress -->
    <div class="card p-4">
      <div class="flex justify-between text-sm mb-2">
        <span class="font-semibold">Voortgang</span>
        <span class="font-bold ${pct===100?'text-emerald-600':'text-indigo-600'}" id="aio-pct">${done}/${total} taken (${pct}%)</span>
      </div>
      <div class="pbar"><div class="pfill" id="aio-pf" style="width:${pct}%"></div></div>
      ${pct===100?'<div class="text-xs text-emerald-600 font-bold mt-2">✅ Alle taken afgerond!</div>':''}
    </div>

    <!-- Add taak + fase -->
    <div class="card p-4 space-y-2">
      <div class="flex gap-2">
        <input id="aio-new" class="inp flex-1 text-sm" placeholder="Nieuwe taak toevoegen..."
          onkeydown="if(event.key==='Enter')addAIOTask('${t.id}')">
        <button class="btn bp text-sm" onclick="addAIOTask('${t.id}')">➕ Taak</button>
        <button class="btn bs text-sm" onclick="addAIOPhase('${t.id}')" title="Voeg een fase-header toe om taken te groeperen">📁 Fase</button>
      </div>
      <div class="text-xs text-gray-400">💡 Sleep taken en fases met het <strong>⠿</strong>-icoontje om te herordenen</div>
    </div>

    <!-- Checklist -->
    <div class="card p-4">
      <div class="flex items-center justify-between mb-3">
        <div class="font-semibold text-sm">📋 Taken (${total})</div>
        <div class="text-xs text-gray-400">${done} afgerond · ${total-done} open</div>
      </div>
      <div id="aio-rows"
        ondragover="aioOnDragOver(event,${order.length})"
        ondrop="aioOnDrop(event,'${t.id}',${order.length})">
        ${rows||'<div class="text-sm text-gray-400 py-3 text-center">Nog geen taken — voeg ze toe via het veld hierboven</div>'}
      </div>
    </div>
  </div>`;
}

function toggleAIOCheck(tid,k,checked){
  const t=S.tasks.find(x=>x.id===tid);if(!t)return;
  t.checks[k]=checked;saveT();
  const lbl=document.getElementById('al-'+k);
  if(lbl){checked?lbl.classList.add('tdone'):lbl.classList.remove('tdone');}
  // Herbereken voortgang zonder re-render
  const order=getCheckOrder(t);
  const taskKeys=order.filter(e=>!e.startsWith('__phase__'));
  const tot=taskKeys.length,dn=taskKeys.filter(k2=>t.checks[k2]).length;
  const pct=tot?Math.round(dn/tot*100):0;
  const pf=document.getElementById('aio-pf');if(pf)pf.style.width=pct+'%';
  const pctEl=document.getElementById('aio-pct');if(pctEl)pctEl.textContent=`${dn}/${tot} taken (${pct}%)`;
}
function setCheckDate(tid,k,date){const t=S.tasks.find(x=>x.id===tid);if(!t)return;t.checkDates[k]=date;saveT();}
function addAIOTask(tid){
  const inp=document.getElementById('aio-new');if(!inp)return;
  const lbl=inp.value.trim();if(!lbl){toast('⚠️ Vul een taak in');return;}
  const t=S.tasks.find(x=>x.id===tid);if(!t)return;
  const k='c'+Date.now();
  t.checkLabels[k]=lbl;t.checks[k]=false;t.checkDates[k]='';
  getCheckOrder(t).push(k);
  saveT();inp.value='';S.tid=tid;render();
}
function deleteAIOTask(tid,k,i){
  const t=S.tasks.find(x=>x.id===tid);if(!t)return;
  delete t.checkLabels[k];delete t.checks[k];delete t.checkDates[k];
  const order=getCheckOrder(t);
  const idx=order.indexOf(k);if(idx>-1)order.splice(idx,1);
  saveT();S.tid=tid;render();
}
function addAIOPhase(tid){
  const t=S.tasks.find(x=>x.id===tid);if(!t)return;
  const phaseCount=getCheckOrder(t).filter(e=>e.startsWith('__phase__')).length;
  const name='Fase '+(phaseCount+1);
  getCheckOrder(t).push('__phase__'+name);
  saveT();S.tid=tid;render();
  toast('📁 Fase toegevoegd — sleep hem naar de juiste plek');
}
function deleteAIOPhase(tid,i){
  const t=S.tasks.find(x=>x.id===tid);if(!t)return;
  getCheckOrder(t).splice(i,1);
  saveT();S.tid=tid;render();
}
function renameAIOPhase(tid,i,newName){
  const t=S.tasks.find(x=>x.id===tid);if(!t)return;
  const order=getCheckOrder(t);
  if(order[i]&&order[i].startsWith('__phase__')){order[i]='__phase__'+newName;saveT();}
}
function aioToMd(tid){
  const t=S.tasks.find(x=>x.id===tid);if(!t)return'';
  let md=`# ${t.name||'Checklist'}\n\n`;
  if(t.deadline)md+=`**Deadline:** ${t.deadline}\n`;
  if(t.input?.source)md+=`**Bron:** ${t.input.source}\n\n`;
  let taskNum=0;
  getCheckOrder(t).forEach(entry=>{
    if(entry.startsWith('__phase__')){md+=`\n## ${entry.slice(9)}\n\n`;}
    else{
      taskNum++;
      const done=t.checks[entry],lbl=t.checkLabels[entry]||'',date=t.checkDates[entry]||'';
      md+=`- [${done?'x':' '}] **${taskNum}.** ${lbl}${date?' — 📅 '+date:''}\n`;
    }
  });
  return md;
}
