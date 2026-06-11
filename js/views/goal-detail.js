/* ── GOAL DETAIL VIEW ───────────────────────────────────── */
function vGoalDetail(){
  const g=S.goals.find(x=>x.id===S.gid);
  if(!g)return`<div class="card p-10 text-center"><button class="btn bp" onclick="nav('portfolio')">← Terug</button></div>`;
  const lc=lvlColor(g.level||1);
  const pct=goalPct(g);
  const msDone=g.milestones.filter(x=>x.done).length;
  const msTotal=g.milestones.length;

  const histRows=(g.history||[]).slice().reverse().map((h,i)=>`
    <div class="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
      <span class="text-xs font-bold px-2 py-0.5 rounded-full text-white flex-shrink-0 mt-0.5" style="background:${h.delta>=0?'#10b981':'#ef4444'}">${h.delta>=0?'+':''}${h.delta}</span>
      <div class="flex-1 min-w-0">
        <div class="text-xs text-gray-700">${h.reason}</div>
        <div class="text-xs text-gray-400 mt-0.5">${h.oldLevel} → ${h.newLevel} · ${h.date}</div>
      </div>
      <button onclick="undoHistory('${g.id}',${(g.history||[]).length-1-i})" class="text-gray-300 hover:text-red-400 text-xs font-bold flex-shrink-0" title="Ongedaan maken">↩</button>
    </div>`).join('');

  const milestoneRows=g.milestones.map((m,i)=>`
    <div class="ci-row">
      <input type="checkbox" class="w-4 h-4 flex-shrink-0 cursor-pointer" style="accent-color:#4f46e5" ${m.done?'checked':''}
        onchange="toggleMilestone('${g.id}',${i},this.checked)">
      <span class="flex-1 text-sm ${m.done?'tdone':''}" id="ms-${i}">${m.label.replace(/</g,'&lt;')}</span>
      <button onclick="deleteMilestone('${g.id}',${i})" class="text-gray-300 hover:text-red-400 font-bold text-sm px-1">✕</button>
    </div>`).join('');

  return `<div class="space-y-5">
    <div class="flex items-center gap-3">
      <button class="btn bs text-sm" onclick="nav('portfolio')">← Portfolio</button>
      <div class="flex-1"></div>
      <button class="btn bs text-sm" style="color:#ef4444" onclick="deleteGoal('${g.id}')">🗑️ Verwijder</button>
    </div>

    <!-- Info + niveau slider -->
    <div class="card p-5 space-y-4">
      <div class="flex items-start gap-4">
        <div class="flex-1 space-y-3">
          <input class="text-xl font-bold bg-transparent border-none outline-none w-full text-gray-900"
            value="${g.name.replace(/"/g,'&quot;')}" onchange="updateGoal('${g.id}','name',this.value)" placeholder="Naam van het doel">
          <textarea class="inp text-sm w-full" rows="2" placeholder="Omschrijving (optioneel)..."
            onblur="updateGoal('${g.id}','desc',this.value)">${g.desc||''}</textarea>
          <div><label class="lbl">Categorie</label>
            <select class="inp text-sm" style="max-width:200px" onchange="updateGoal('${g.id}','category',this.value)">
              ${GOAL_CATS.map(c=>`<option ${g.category===c?'selected':''}>${c}</option>`).join('')}</select></div>
        </div>
        <!-- Niveau cirkel -->
        <div class="flex-shrink-0 text-center" style="width:100px">
          <svg viewBox="0 0 36 36" style="width:88px;height:88px;transform:rotate(-90deg)">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" stroke-width="3.5"/>
            <circle id="goal-level-circle" cx="18" cy="18" r="15.9" fill="none" stroke="${lc}" stroke-width="3.5"
              stroke-dasharray="${g.level||1} ${100-(g.level||1)}" stroke-linecap="round"/>
          </svg>
          <div id="goal-level-num" style="margin-top:-64px;font-size:1.3em;font-weight:800;color:${lc}">${g.level||1}</div>
          <div id="goal-level-lbl" style="margin-top:34px" class="text-xs font-semibold" style="color:${lc}">${lvlLabel(g.level||1)}</div>
        </div>
      </div>

      <!-- Slider (geen history logging) -->
      <div id="goal-slider-wrap">
        <div class="flex justify-between items-center text-xs text-gray-400 mb-1">
          <span>Niveau (sleept alleen, geen log)</span><span class="font-bold" id="lvl-val" style="color:${lc}">${g.level||1} / 100</span>
        </div>
        <input type="range" min="1" max="100" value="${g.level||1}" class="w-full" style="accent-color:${lc}"
          oninput="updateGoalLevel('${g.id}',+this.value)">
        <div class="flex justify-between text-xs text-gray-300 mt-0.5">
          <span>Starter</span><span>Beginner</span><span>Gemiddeld</span><span>Gevorderd</span><span>Expert</span>
        </div>
        <button class="btn bs text-xs mt-2" onclick="openManualLevel('${g.id}')">📝 Handmatig instellen (met reden)</button>
      </div>
    </div>

    <!-- Mijlpalen -->
    <div class="card p-5 space-y-3">
      <div class="flex items-center justify-between">
        <div class="font-semibold text-sm">🏁 Mijlpalen</div>
        <div class="text-xs text-gray-400">${msDone}/${msTotal} afgerond</div>
      </div>
      ${msTotal>0?`<div class="pbar"><div class="pfill" style="width:${pct}%"></div></div>`:''}
      <div class="space-y-1">${milestoneRows||'<div class="text-sm text-gray-400 py-2">Nog geen mijlpalen</div>'}</div>
      <div class="flex gap-2 pt-2 border-t border-gray-100">
        <input id="ms-new" class="inp flex-1 text-sm" placeholder="Nieuwe mijlpaal..."
          onkeydown="if(event.key==='Enter')addMilestone('${g.id}')">
        <button class="btn bp text-sm" onclick="addMilestone('${g.id}')">➕</button>
      </div>
    </div>

    <!-- Notities -->
    <div class="card p-5 space-y-2">
      <div class="font-semibold text-sm">📝 Aantekeningen & reflectie</div>
      <textarea class="inp text-sm w-full" rows="4"
        placeholder="Wat leer je? Bronnen, inzichten, wat werkt goed..."
        onblur="updateGoal('${g.id}','notes',this.value)">${g.notes||''}</textarea>
    </div>

    <!-- Mijn werk -->
    <div class="card p-5 space-y-3">
      <div class="font-semibold text-sm">💼 Mijn werk — koppel opdrachten en beschrijvingen</div>

      <!-- Bestaande taak koppelen -->
      <div>
        <label class="lbl">Koppel een bestaande opdracht uit de app</label>
        <div class="flex flex-wrap gap-1.5 mt-1">
          ${S.tasks.filter(t=>!t.archived).slice(0,10).map(t=>{
            const linked=(g.linkedTasks||[]).includes(t.id);
            return `<button onclick="toggleLinkedTask('${g.id}','${t.id}')"
              class="text-xs px-2.5 py-1 rounded-lg border transition-all ${linked?'bg-indigo-600 text-white border-indigo-600':'bg-white text-gray-600 border-gray-200 hover:border-indigo-400'}">
              ${linked?'✓ ':''} ${(t.name||t.input?.goal||'Opdracht').slice(0,28)}</button>`;
          }).join('')||'<span class="text-xs text-gray-400">Geen opdrachten — maak eerst een opdracht aan</span>'}
        </div>
      </div>

      <!-- Eigen werk toevoegen -->
      <div class="border-t border-gray-100 pt-3 space-y-2">
        <label class="lbl">Voeg werk toe — tekst, link of verslag</label>
        <div class="flex gap-2 flex-wrap">
          <select id="werk-type" class="inp text-sm" style="max-width:120px" onchange="toggleWerkFields(this.value)">
            <option value="tekst">Tekst</option>
            <option value="link">Link</option>
            <option value="verslag">Verslag</option>
          </select>
          <input id="werk-title" class="inp text-sm" style="max-width:200px" placeholder="Naam (bijv. Scriptie H3)">
          <input id="werk-url" class="inp text-sm flex-1 hidden" placeholder="https://...">
          <input id="werk-body" class="inp text-sm flex-1" placeholder="Korte beschrijving of samenvatting van het werk...">
          <button class="btn bp text-sm flex-shrink-0" onclick="addWerkItem('${g.id}')">➕</button>
        </div>
        ${(g.werkItems||[]).length?`<div class="space-y-1.5 mt-2">
          ${(g.werkItems||[]).map((w,i)=>{
            const wtype=w.type||'tekst';
            const wic=wtype==='link'?'🔗':wtype==='verslag'?'📄':'📝';
            return `<div class="flex items-start gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
            <span class="text-sm flex-shrink-0 mt-0.5">${wic}</span>
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-xs">${w.title}</div>
              ${wtype==='link'&&w.url?`<a href="${w.url.replace(/"/g,'&quot;')}" target="_blank" rel="noopener" class="text-xs text-indigo-600 hover:underline mt-0.5 block truncate">${w.url}</a>`:''}
              ${w.body?`<div class="text-xs text-gray-500 mt-0.5">${w.body.slice(0,100)}${w.body.length>100?'...':''}</div>`:''}
            </div>
            <button onclick="removeWerkItem('${g.id}',${i})" class="text-gray-300 hover:text-red-400 font-bold text-sm flex-shrink-0">✕</button>
          </div>`;}).join('')}
        </div>`:''}
      </div>
    </div>

    <!-- Groeigeschiedenis -->
    ${(g.history||[]).length?`<div class="card p-5 space-y-2">
      <div class="font-semibold text-sm">📈 Groeigeschiedenis</div>
      <div class="space-y-0">${histRows}</div>
    </div>`:''}
  </div>`;
}

function updateGoal(id,field,val){const g=S.goals.find(x=>x.id===id);if(g){g[field]=val;saveGoals();}}
function toggleLinkedTask(gid,tid){
  const g=S.goals.find(x=>x.id===gid);if(!g)return;
  g.linkedTasks=g.linkedTasks||[];
  const idx=g.linkedTasks.indexOf(tid);
  if(idx>-1)g.linkedTasks.splice(idx,1);else g.linkedTasks.push(tid);
  saveGoals();S.gid=gid;render();
}
function toggleWerkFields(type){
  const urlEl=document.getElementById('werk-url');
  const bodyEl=document.getElementById('werk-body');
  if(!urlEl||!bodyEl)return;
  if(type==='link'){
    urlEl.classList.remove('hidden');
    bodyEl.placeholder='Korte omschrijving (optioneel)...';
  } else {
    urlEl.classList.add('hidden');
    bodyEl.placeholder=type==='verslag'?'Samenvatting of inhoud van het verslag...':'Korte beschrijving of samenvatting van het werk...';
  }
}
function addWerkItem(gid){
  const type=document.getElementById('werk-type')?.value||'tekst';
  const title=document.getElementById('werk-title')?.value?.trim();
  const url=document.getElementById('werk-url')?.value?.trim();
  const body=document.getElementById('werk-body')?.value?.trim();
  if(type==='link'&&!url){toast('⚠️ Vul een link (URL) in');return;}
  if(!title&&!body&&!url){toast('⚠️ Vul naam, link of beschrijving in');return;}
  const g=S.goals.find(x=>x.id===gid);if(!g)return;
  g.werkItems=g.werkItems||[];
  g.werkItems.push({id:mkId(),type,title:title||(type==='link'?'Link':'Werk'),url:url||'',body:body||'',date:new Date().toISOString().slice(0,10)});
  saveGoals();S.gid=gid;render();toast('💼 Werk toegevoegd!');
}
function removeWerkItem(gid,i){
  const g=S.goals.find(x=>x.id===gid);if(!g)return;
  g.werkItems.splice(i,1);saveGoals();S.gid=gid;render();
}
function updateGoalLevel(id,val){
  const g=S.goals.find(x=>x.id===id);if(!g)return;
  g.level=val;saveGoals();
  // Update DOM in-place — no history log, no re-render
  const lc=lvlColor(val);
  const circle=document.getElementById('goal-level-circle');
  if(circle){circle.setAttribute('stroke-dasharray',val+' '+(100-val));circle.setAttribute('stroke',lc);}
  const numEl=document.getElementById('goal-level-num');if(numEl){numEl.textContent=val;numEl.style.color=lc;}
  const lblEl=document.getElementById('goal-level-lbl');if(lblEl)lblEl.textContent=lvlLabel(val);
  const rangeEl=document.querySelector('#goal-slider-wrap input[type=range]');
  if(rangeEl)rangeEl.style.accentColor=lc;
  const valEl=document.getElementById('lvl-val');if(valEl){valEl.textContent=val+' / 100';valEl.style.color=lc;}
}
function undoHistory(gid,i){
  const g=S.goals.find(x=>x.id===gid);if(!g||!g.history)return;
  const h=g.history[i];if(!h)return;
  orbitConfirm(`Wil je deze groei ongedaan maken? (${g.name}: ${h.newLevel} → ${h.oldLevel})`,()=>{
    g.level=h.oldLevel;g.history.splice(i,1);saveGoals();render();toast('↩ Ongedaan gemaakt');
  },null,'Ongedaan maken');
}
function deleteGoal(id){orbitConfirm('Doel verwijderen?',()=>{S.goals=S.goals.filter(x=>x.id!==id);saveGoals();nav('portfolio');},null,'Doel verwijderen');}
function toggleMilestone(gid,i,done){
  const g=S.goals.find(x=>x.id===gid);if(!g)return;
  g.milestones[i].done=done;saveGoals();
  const el=document.getElementById('ms-'+i);if(el){done?el.classList.add('tdone'):el.classList.remove('tdone');}
}
function addMilestone(gid){
  const inp=document.getElementById('ms-new');if(!inp)return;
  const lbl=inp.value.trim();if(!lbl){toast('⚠️ Vul een mijlpaal in');return;}
  const g=S.goals.find(x=>x.id===gid);if(!g)return;
  g.milestones.push({id:mkId(),label:lbl,done:false});
  saveGoals();inp.value='';S.gid=gid;render();
}
function deleteMilestone(gid,i){
  const g=S.goals.find(x=>x.id===gid);if(!g)return;
  g.milestones.splice(i,1);saveGoals();S.gid=gid;render();
}
