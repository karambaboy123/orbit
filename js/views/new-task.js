/* ── NIEUWE OPDRACHT ────────────────────────────────────── */
function vNewTask(){
  const tmpls=S.templates;
  const pills=tmpls.map(t=>`<div class="tpl${t.id===_ntSelTmplId?' sel':''}" onclick="applyTmpl('${t.id}')" id="tpl-${t.id}">${t.ic?icData(t.ic,13)+' ':''}${t.l}</div>`).join('');
  const siteRow=SITES.map(s=>`<button onclick="sendTemplateToAI('${s.id}')" class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90 transition-all" style="background:${s.c}">${s.l}${s.free?' 🆓':''}</button>`).join('');

  return `<div class="space-y-5">
    <div><h1 class="text-2xl font-bold">✏️ Nieuwe Opdracht</h1><p class="text-gray-400 text-sm mt-0.5">Kies een sjabloon, vul je opdracht in en analyseer of stuur direct naar AI</p></div>

    <!-- Snelstart templates -->
    <div class="card p-4 space-y-3">
      <div class="flex items-center justify-between">
        <div class="font-semibold text-sm">⚡ Snelstart — klaar-om-te-gebruiken sjablonen</div>
        <div class="text-xs text-gray-400">Klik → direct een checklist-opdracht aanmaken</div>
      </div>
      <div class="grid grid-cols-3 gap-2">
        ${QUICK_TASK_TMPLS.map(t=>`
          <button onclick="quickStartTask('${t.id}')"
            class="flex items-center gap-2 p-3 rounded-xl border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all text-left group">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background:var(--p)18;color:var(--p)">${ic(t.ic,15)}</div>
            <div class="min-w-0">
              <div class="font-semibold text-xs">${t.name}</div>
              <div class="text-xs text-gray-400 truncate">${t.desc}</div>
            </div>
          </button>`).join('')}
      </div>
    </div>

    <!-- Sjablonen -->
    <div class="card p-4 space-y-2">
      <div class="flex items-center justify-between">
        <div class="lbl mb-0">Sjabloon kiezen</div>
        <button class="text-xs text-indigo-500 hover:underline" onclick="nav('settings')">⚙️ Sjablonen beheren</button>
      </div>
      <div class="flex flex-wrap gap-2">${pills}</div>
      <div class="text-xs text-gray-400">Elk sjabloon heeft een eigen AI-prompt. Gebruik <strong>🚀 Stuur naar AI</strong> om die prompt direct te gebruiken.</div>
    </div>

    <!-- Form -->
    <div class="card p-6 space-y-4">
      <div>
        <label class="lbl">${ic('portfolio',13)} Opdracht / doel <span class="text-red-400">*</span></label>
        <textarea id="nt-goal" class="inp" rows="3" placeholder="Beschrijf zo concreet mogelijk wat je wilt bereiken..."></textarea>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="lbl">${ic('users',13)} Voor wie?</label><input id="nt-aud" class="inp" placeholder="Klanten, management, studenten..."></div>
        <div><label class="lbl">${ic('palette',13)} Toon / stijl</label>
          <select id="nt-tone" class="inp"><option value="">-- Kies toon --</option><option>Professioneel en formeel</option><option>Vriendelijk en informeel</option><option>Zakelijk en bondig</option><option>Creatief en inspirerend</option><option>Technisch en precies</option><option>Professioneel en zelfverzekerd</option><option>Zakelijk en feitelijk</option></select></div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="lbl">${ic('checklist',13)} Gewenste output</label>
          <select id="nt-out" class="inp"><option value="">-- Kies output --</option><option>Document / rapport</option><option>Plan / stappenplan</option><option>E-mail of brief</option><option>Presentatie</option><option>Social media content</option><option>Checklist</option><option>Samenvatting</option><option>Rapport / analyse</option></select></div>
        <div><label class="lbl">${ic('caldate',13)} Deadline (optioneel)</label><input id="nt-dl" class="inp" type="date"></div>
      </div>
      <div><label class="lbl">${ic('paperclip',13)} Extra context</label><textarea id="nt-ctx" class="inp" rows="3" placeholder="Achtergrond, beperkingen, specifieke wensen... (wordt ook ingevuld in de AI-prompt via {{context}})"></textarea></div>

      <!-- Knoppen -->
      <div class="space-y-2">
        <div class="flex gap-3 flex-wrap">
          <button id="btn-nt" class="btn bp" onclick="submitNewTask()">✏️ Analyseer Opdracht</button>
          <button class="btn bg" onclick="toggleSendAIRow()">🚀 Stuur naar AI ▾</button>
          <button class="btn bs" onclick="clearNT()">Wis</button>
        </div>
        <!-- AI site picker -->
        <div id="nt-ai-row" class="hidden p-4 bg-emerald-50 border border-emerald-200 rounded-lg space-y-3">
          <div class="font-semibold text-emerald-900 text-sm">Kies een AI — de sjabloon-prompt wordt ingevuld met jouw gegevens en gekopieerd:</div>
          <div class="flex flex-wrap gap-2">${siteRow}</div>
          <div class="text-xs text-emerald-700">💡 De AI-prompt van sjabloon "<span id="nt-tmpl-lbl">${tmpls.find(t=>t.id===_ntSelTmplId)?.l||'Blanco'}</span>" wordt gebruikt. Variabelen ({{doel}} etc.) worden automatisch ingevuld.</div>
        </div>
      </div>
    </div>

    <div class="card p-4 bg-indigo-50 border-indigo-200 text-sm text-indigo-800">
      💡 <strong>Twee mogelijkheden:</strong> "Analyseer" maakt een checklist + verbeterde prompt in de app. "Stuur naar AI" kopieert de sjabloon-prompt direct naar de AI van jouw keuze.
    </div>
  </div>`;
}

function applyTmpl(id){
  const t=S.templates.find(x=>x.id===id);if(!t)return;
  _ntSelTmplId=id;
  document.querySelectorAll('.tpl').forEach(e=>e.classList.remove('sel'));
  document.getElementById('tpl-'+id)?.classList.add('sel');
  if(t.goal!==undefined)document.getElementById('nt-goal').value=t.goal;
  if(t.aud!==undefined)document.getElementById('nt-aud').value=t.aud;
  if(t.tone!==undefined)document.getElementById('nt-tone').value=t.tone;
  if(t.out!==undefined)document.getElementById('nt-out').value=t.out;
  const lbl=document.getElementById('nt-tmpl-lbl');if(lbl)lbl.textContent=t.l;
}
function clearNT(){
  ['nt-goal','nt-aud','nt-ctx'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  ['nt-tone','nt-out'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  const dl=document.getElementById('nt-dl');if(dl)dl.value='';
  document.getElementById('nt-ai-row')?.classList.add('hidden');
}
async function submitNewTask(){
  const goal=document.getElementById('nt-goal').value.trim();
  if(!goal){toast('⚠️ Vul het doel in');return;}
  const inp={goal,audience:document.getElementById('nt-aud').value.trim(),tone:document.getElementById('nt-tone').value,outputFormat:document.getElementById('nt-out').value,context:document.getElementById('nt-ctx').value.trim()};
  const dl=document.getElementById('nt-dl').value;
  const task=mkTask('task',inp,goal.slice(0,40));
  if(dl)task.deadline=dl;
  saveT();
  await runAnalysis(task,'btn-nt');
}
