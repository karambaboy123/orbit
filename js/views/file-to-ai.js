/* ── BESTAND → AI ───────────────────────────────────────── */
function vFileToAI(){
  const presets=S.presets;
  const presetCards=presets.map(p=>`<div class="pp${p.id===_ftaSelId?' sel':''}" id="pp-${p.id}" onclick="selectPreset('${p.id}')" title="${p.l}">
    <div style="font-size:20px;line-height:1;margin-bottom:5px">${icData(p.ic,18)}</div>
    <div style="font-size:10px;font-weight:700;line-height:1.3;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${p.l}</div>
  </div>`).join('');

  const siteButtons=SITES.map(s=>`<button onclick="launchFTA('${s.id}')" class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90" style="background:${s.c}">${s.l}${s.free?' 🆓':''}</button>`).join('');

  return `<div class="space-y-5">
    <div><h1 class="text-2xl font-bold">📤 Bestand → AI</h1><p class="text-gray-400 text-sm mt-0.5">Voer je document in, kies een instructie en kopieer alles naar de AI</p></div>

    <!-- Stap 1: Document -->
    <div class="card p-5 space-y-4">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold flex-shrink-0" style="background:var(--p);color:var(--icon-txt,#fff)">1</div>
        <div class="font-bold">Document invoeren</div>
      </div>

      <div class="dz" onclick="document.getElementById('fta-fi').click()"
        ondragover="event.preventDefault();this.classList.add('over')"
        ondragleave="this.classList.remove('over')"
        ondrop="event.preventDefault();this.classList.remove('over');ftaLoad(event.dataTransfer.files[0])">
        <input type="file" id="fta-fi" class="hidden" accept=".txt,.md,.html,.json,.csv,.pdf" onchange="ftaLoad(this.files[0])">
        <div class="text-2xl mb-1">📂</div>
        <div class="font-semibold text-gray-600 text-sm">Sleep bestand of klik om te uploaden</div>
        <div class="text-xs text-gray-400">.txt .md .pdf .html .json .csv — PDF wordt automatisch omgezet naar tekst</div>
      </div>

      <div id="fta-pdf-tip" class="hidden bg-amber-50 border border-amber-200 rounded-lg p-3">
        <div class="font-semibold text-amber-900 text-sm mb-1">📄 Gescande PDF — weinig tekst gevonden</div>
        <div class="text-amber-800 text-xs leading-relaxed">Dit document bevat waarschijnlijk gescande afbeeldingen i.p.v. tekst.<br><strong>Kopieer handmatig:</strong><br>1. Open de PDF in je browser of Adobe Reader<br>2. Druk <kbd class="bg-amber-100 border border-amber-300 rounded px-1 font-mono">Ctrl+A</kbd> dan <kbd class="bg-amber-100 border border-amber-300 rounded px-1 font-mono">Ctrl+C</kbd><br>3. Plak de tekst in het veld hieronder</div>
        <button onclick="this.parentElement.classList.add('hidden')" class="text-amber-600 text-xs mt-2 hover:underline">× Sluiten</button>
      </div>

      <div>
        <div class="flex items-center justify-between mb-1">
          <label class="lbl mb-0">📋 Inhoud van het document</label>
          <div class="flex items-center gap-2">
            <span id="fta-charcount" class="text-xs text-gray-400"></span>
            <button class="btn bs text-xs py-1" onclick="copyText(document.getElementById('fta-txt')?.value||'','Document gekopieerd!')">📄 Kopieer</button>
            <button class="btn bs text-xs py-1" onclick="document.getElementById('fta-txt').value='';updateCharCount();toast('Gewist')">Wis</button>
          </div>
        </div>
        <textarea id="fta-txt" class="inp text-sm" rows="9" placeholder="Sleep een bestand hierboven, of plak hier je tekst...&#10;&#10;Werkt met: rapporten, briefings, projectplannen, e-mails, notulen, code, artikelen." oninput="updateCharCount()"></textarea>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div><label class="lbl">📝 Naam (optioneel)</label><input id="fta-name" class="inp" placeholder="Bijv: Projectplan Q3"></div>
        <div><label class="lbl">🔍 Extra focus (optioneel)</label><input id="fta-q" class="inp" placeholder="Focus extra op bijv. risico's of deadlines"></div>
      </div>
    </div>

    <!-- Stap 2: Instructie -->
    <div class="card p-5 space-y-4">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold flex-shrink-0" style="background:var(--p);color:var(--icon-txt,#fff)">2</div>
        <div class="font-bold">Instructie kiezen</div>
        <span class="text-xs text-gray-400 ml-1">— klik op een preset of schrijf zelf</span>
      </div>

      <div class="grid gap-2" style="grid-template-columns:repeat(auto-fill,minmax(90px,1fr))" id="fta-presets-grid">
        ${presetCards}
      </div>

      <div>
        <div class="flex items-center justify-between mb-1">
          <label class="lbl mb-0">✏️ Instructie aan de AI <span class="text-gray-400 font-normal text-xs">(direct bewerkbaar)</span></label>
          <button class="btn bs text-xs py-1" onclick="nav('settings')">⚙️ Presets beheren</button>
        </div>
        <textarea id="fta-custom" class="inp text-sm" rows="6" placeholder="Selecteer een preset hierboven, of schrijf je eigen instructie..."></textarea>
      </div>
    </div>

    <!-- Stap 3: Kopiëren -->
    <div class="card p-5 space-y-4">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold flex-shrink-0" style="background:var(--p);color:var(--icon-txt,#fff)">3</div>
        <div class="font-bold">Kopiëren & naar AI sturen</div>
      </div>

      <div class="flex flex-wrap gap-2">
        <button class="btn bp" onclick="copyFTAInstr()">📋 Kopieer instructie</button>
        <button class="btn bs" onclick="copyText(document.getElementById('fta-txt')?.value||'','Document gekopieerd!')">📄 Kopieer document</button>
        <button class="btn bg" onclick="copyFTAAll()">📦 Kopieer alles samen</button>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
        💡 <strong>Tip voor ChatGPT:</strong> Upload het bestand via de paperclip <strong>📎</strong> en plak alleen de <strong>instructie</strong>. Of gebruik <strong>"Kopieer alles samen"</strong> als platte tekst.
      </div>

      <div>
        <div class="text-xs font-semibold text-gray-500 uppercase mb-2">Direct openen + instructie kopiëren</div>
        <div class="flex flex-wrap gap-2">${siteButtons}</div>
      </div>
    </div>
  </div>`;
}

function selectPreset(id){
  const preset=S.presets.find(p=>p.id===id);
  if(!preset)return;
  _ftaSelId=id;
  document.querySelectorAll('.pp').forEach(e=>e.classList.remove('sel'));
  document.getElementById('pp-'+id)?.classList.add('sel');
  const ta=document.getElementById('fta-custom');
  if(ta)ta.value=preset.p||'';
}

async function ftaLoad(file){
  if(!file)return;
  const n=document.getElementById('fta-name');
  if(n&&!n.value)n.value=file.name;
  if(file.type==='application/pdf'||file.name?.toLowerCase().endsWith('.pdf')){
    const el=document.getElementById('fta-txt');
    const origPh=el?.placeholder||'';
    if(el){el.value='';el.placeholder='⏳ PDF wordt omgezet naar tekst...';}
    try{
      const text=await loadPDF(file);
      if(el)el.placeholder=origPh;
      if(text.trim().length<80){
        if(el)el.value=text;
        showPDFTip();
        toast('⚠️ Weinig tekst gevonden — mogelijk gescande PDF',4500);
      } else {
        if(el)el.value=text;
        toast('✅ PDF geladen: '+text.length.toLocaleString()+' tekens');
        updateCharCount();
      }
    }catch(e){
      if(el){el.value='';el.placeholder=origPh;}
      showPDFTip();
      toast('⚠️ PDF niet leesbaar — plak tekst handmatig',4500);
    }
  } else {
    const r=new FileReader();
    r.onload=e=>{const el=document.getElementById('fta-txt');if(el){el.value=e.target.result;toast('📄 Geladen: '+file.name);updateCharCount();}};
    r.readAsText(file,'UTF-8');
  }
}

function getFTAPrompt(){return document.getElementById('fta-custom')?.value?.trim()||'';}

function copyFTAInstr(){
  const instr=getFTAPrompt();
  const q=document.getElementById('fta-q')?.value?.trim()||'';
  if(!instr){toast('⚠️ Kies eerst een instructie bij stap 2');return;}
  copyText(instr+(q?'\n\nExtra aandacht voor: '+q:''),'Instructie gekopieerd!');
}

function copyFTAAll(){
  const txt=document.getElementById('fta-txt')?.value?.trim()||'';
  const instr=getFTAPrompt();
  const q=document.getElementById('fta-q')?.value?.trim()||'';
  const name=document.getElementById('fta-name')?.value?.trim()||'';
  if(!txt){toast('⚠️ Voer eerst het document in bij stap 1');return;}
  if(!instr){toast('⚠️ Kies eerst een instructie bij stap 2');return;}
  const full=instr+(q?'\n\nExtra aandacht voor: '+q:'')+'\n\n'+'─'.repeat(50)+'\nDOCUMENT'+(name?' "'+name+'"':'')+'\n'+'─'.repeat(50)+'\n\n'+txt;
  copyText(full,'Alles gekopieerd!');
}

function launchFTA(siteId){
  const s=SITES.find(x=>x.id===siteId);if(!s)return;
  const instr=getFTAPrompt();
  if(!instr){toast('⚠️ Kies eerst een instructie bij stap 2');return;}
  window.open(s.url,'_blank','noopener');
  const q=document.getElementById('fta-q')?.value?.trim()||'';
  const full=instr+(q?'\n\nExtra aandacht voor: '+q:'');
  navigator.clipboard?.writeText(full).catch(()=>fbCopy(full,''));
  toast('✅ '+s.l+' geopend & instructie gekopieerd!',3000);
}

/* ── PRESET BEHEER ──────────────────────────────────────── */
function startAddPreset(){
  _editingPresetId=null;
  const f=document.getElementById('preset-form');
  document.getElementById('preset-form-title').textContent='Nieuwe preset toevoegen';
  document.getElementById('pf-ic').value='💬';
  document.getElementById('pf-name').value='';
  document.getElementById('pf-prompt').value='';
  if(f){f.classList.remove('hidden');f.scrollIntoView({behavior:'smooth'});}
}
function editPreset(id){
  const p=S.presets.find(x=>x.id===id);if(!p)return;
  _editingPresetId=id;
  const f=document.getElementById('preset-form');
  document.getElementById('preset-form-title').textContent='Preset bewerken';
  document.getElementById('pf-ic').value=p.ic||'💬';
  document.getElementById('pf-name').value=p.l||'';
  document.getElementById('pf-prompt').value=p.p||'';
  if(f){f.classList.remove('hidden');f.scrollIntoView({behavior:'smooth'});}
}
function cancelPresetForm(){document.getElementById('preset-form')?.classList.add('hidden');_editingPresetId=null;}
function savePresetForm(){
  const ic=document.getElementById('pf-ic').value.trim()||'💬';
  const name=document.getElementById('pf-name').value.trim();
  const prompt=document.getElementById('pf-prompt').value.trim();
  if(!name){toast('⚠️ Vul een naam in');return;}
  if(!prompt){toast('⚠️ Vul een instructie in');return;}
  if(_editingPresetId){
    const p=S.presets.find(x=>x.id===_editingPresetId);
    if(p){p.ic=ic;p.l=name;p.p=prompt;}
  } else {
    S.presets.push({id:'p'+Date.now(),ic,l:name,p:prompt});
  }
  savePresets();_editingPresetId=null;toast('✅ Preset opgeslagen!');nav('settings');
}
function deletePreset(id){
  orbitConfirm('Preset verwijderen?',()=>{
    S.presets=S.presets.filter(x=>x.id!==id);
    if(_ftaSelId===id)_ftaSelId=S.presets[0]?.id||'';
    savePresets();toast('🗑️ Verwijderd');nav('settings');
  },null,'Preset verwijderen');
}
function resetPresets(){
  orbitConfirm('Alle presets terugzetten naar standaard? Jouw aanpassingen worden gewist.',()=>{
    S.presets=DFLT_PRESETS.map(p=>({...p}));
    _ftaSelId=S.presets[0]?.id||'';
    savePresets();toast('✅ Presets hersteld!');nav('settings');
  },null,'Presets resetten');
}

/* ── SJABLOON BEHEER ────────────────────────────────────── */
function startAddTemplate(){
  _editingTmplId=null;
  const f=document.getElementById('tmpl-form');
  document.getElementById('tmpl-form-title').textContent='Nieuw sjabloon toevoegen';
  document.getElementById('tf-ic').value='📝';
  document.getElementById('tf-name').value='';
  document.getElementById('tf-goal').value='';
  document.getElementById('tf-aud').value='';
  document.getElementById('tf-tone').value='';
  document.getElementById('tf-out').value='';
  document.getElementById('tf-prompt').value='';
  if(f){f.classList.remove('hidden');f.scrollIntoView({behavior:'smooth'});}
}
function editTemplate(id){
  const t=S.templates.find(x=>x.id===id);if(!t)return;
  _editingTmplId=id;
  const f=document.getElementById('tmpl-form');
  document.getElementById('tmpl-form-title').textContent='Sjabloon bewerken';
  document.getElementById('tf-ic').value=t.ic||'📝';
  document.getElementById('tf-name').value=t.l||'';
  document.getElementById('tf-goal').value=t.goal||'';
  document.getElementById('tf-aud').value=t.aud||'';
  document.getElementById('tf-tone').value=t.tone||'';
  document.getElementById('tf-out').value=t.out||'';
  document.getElementById('tf-prompt').value=t.aiPrompt||'';
  if(f){f.classList.remove('hidden');f.scrollIntoView({behavior:'smooth'});}
}
function cancelTmplForm(){document.getElementById('tmpl-form')?.classList.add('hidden');_editingTmplId=null;}
function saveTmplForm(){
  const ic=document.getElementById('tf-ic').value.trim()||'📝';
  const name=document.getElementById('tf-name').value.trim();
  const goal=document.getElementById('tf-goal').value.trim();
  const aud=document.getElementById('tf-aud').value.trim();
  const tone=document.getElementById('tf-tone').value.trim();
  const out=document.getElementById('tf-out').value.trim();
  const aiPrompt=document.getElementById('tf-prompt').value.trim();
  if(!name){toast('⚠️ Vul een naam in');return;}
  if(!aiPrompt){toast('⚠️ Vul een AI-prompt in');return;}
  if(_editingTmplId){
    const t=S.templates.find(x=>x.id===_editingTmplId);
    if(t){t.ic=ic;t.l=name;t.goal=goal;t.aud=aud;t.tone=tone;t.out=out;t.aiPrompt=aiPrompt;}
  }else{
    S.templates.push({id:'tmpl'+Date.now(),ic,l:name,goal,aud,tone,out,aiPrompt});
  }
  saveTemplates();_editingTmplId=null;toast('✅ Sjabloon opgeslagen!');nav('settings');
}
function deleteTemplate(id){
  orbitConfirm('Sjabloon verwijderen?',()=>{
    S.templates=S.templates.filter(x=>x.id!==id);
    if(_ntSelTmplId===id)_ntSelTmplId=S.templates[0]?.id||'';
    saveTemplates();toast('🗑️ Verwijderd');nav('settings');
  },null,'Sjabloon verwijderen');
}
function resetTemplates(){
  orbitConfirm('Alle sjablonen terugzetten naar standaard? Jouw aanpassingen worden gewist.',()=>{
    S.templates=DFLT_TMPLS.map(t=>({...t}));
    _ntSelTmplId=S.templates[0]?.id||'';
    saveTemplates();toast('✅ Sjablonen hersteld!');nav('settings');
  },null,'Sjablonen resetten');
}
