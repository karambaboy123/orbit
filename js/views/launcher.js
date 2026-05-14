/* ══════════════════════════════════════════════════════════
   AI LAUNCHER — Prompt history, templates, result log
   ══════════════════════════════════════════════════════════ */
const DFLT_LAUNCH_TMPLS=[
  {id:'summarize', ic:'note',     l:'Samenvatten',      p:'Maak een heldere samenvatting van de volgende tekst in maximaal 5 kernpunten:\n\n[PLAK TEKST HIER]'},
  {id:'debug',     ic:'bug',      l:'Code debuggen',    p:'Ik heb een bug in mijn code. Analyseer de volgende code en leg uit wat er mis is en hoe ik het kan oplossen:\n\n```\n[PLAK CODE HIER]\n```'},
  {id:'email',     ic:'email',    l:'E-mail schrijven', p:'Schrijf een professionele e-mail over het volgende onderwerp. Maak de toon vriendelijk maar zakelijk:\n\nOnderwerp: [ONDERWERP]\nOntvanger: [NAAM/ROL]\nKernboodschap: [WAT WIL JE ZEGGEN]'},
  {id:'explain',   ic:'lightbulb',l:'Uitleggen',        p:'Leg het volgende concept uit op een begrijpelijke manier, alsof je het uitlegt aan een student die er nog niet bekend mee is:\n\nConcept: [CONCEPT]'},
  {id:'improve',   ic:'sparkles', l:'Tekst verbeteren', p:'Verbeter de volgende tekst. Maak hem duidelijker, professioneler en aantrekkelijker voor de lezer. Behoud de kern van de boodschap:\n\n[PLAK TEKST HIER]'},
  {id:'plan',      ic:'clipboard',l:'Stappenplan',      p:'Maak een concreet stappenplan voor het volgende doel. Verdeel het in kleine, uitvoerbare acties met een logische volgorde:\n\nDoel: [DOEL]'},
  {id:'brainstorm',ic:'chat',     l:'Brainstormen',     p:'Help mij brainstormen over het volgende onderwerp. Geef 10 creatieve, concrete ideeën:\n\nOnderwerp: [ONDERWERP]'},
  {id:'review',    ic:'search',   l:'Review / feedback',p:'Geef gedetailleerde, constructieve feedback op het volgende werk. Benoem sterke punten en concrete verbeterpunten:\n\n[PLAK WERK HIER]'},
];
let LAUNCH_TMPLS=JSON.parse(localStorage.getItem('pb_launch_tmpls')||'null')||DFLT_LAUNCH_TMPLS.map(t=>({...t}));

/* ══════════════════════════════════════════════════════════
   QUICK START TAAK-TEMPLATES
   ══════════════════════════════════════════════════════════ */
const QUICK_TASK_TMPLS=[
  {id:'hbo',         ic:'library',   name:'HBO-opdracht',   desc:'Schoolopdracht stap voor stap',    tags:['school','hbo'],
   analysis:`## Samenvatting\nGestructureerde aanpak voor een HBO-schoolopdracht.\n\n## Subopdrachten\n1. Opdracht lezen en begrijpen\n2. Planning maken\n3. Uitwerken\n4. Controleren en inleveren\n\n## Checklist\n\n### Fase 1: Voorbereiding\n- [ ] Opdracht volledig doorlezen\n- [ ] Beoordelingscriteria bekijken\n- [ ] Vragen stellen aan docent\n- [ ] Deadline noteren\n\n### Fase 2: Planning\n- [ ] Studieplanning opstellen\n- [ ] Bronnen inventariseren\n- [ ] Taakverdeling bepalen (groepswerk)\n\n### Fase 3: Uitwerking\n- [ ] Bronnen zoeken en beoordelen\n- [ ] Eerste versie schrijven\n- [ ] Feedback vragen\n- [ ] Verwerken feedback\n\n### Fase 4: Afronding\n- [ ] Spelfouten controleren\n- [ ] Bronnenlijst opmaken (APA)\n- [ ] Lay-out controleren\n- [ ] Inleveren voor deadline\n\n## Verbeterde prompt\nAnalyseer de volgende opdracht volledig, maak een planning en geef concrete verbeterpunten.`},
  {id:'project',     ic:'briefcase', name:'Projectplan',    desc:'Van start tot oplevering',          tags:['project'],
   analysis:`## Samenvatting\nGestructureerd projectplan van initiatie tot oplevering.\n\n## Checklist\n\n### Fase 1: Initiatie\n- [ ] Projectdoel definiëren\n- [ ] Stakeholders in kaart brengen\n- [ ] Budget en middelen bepalen\n- [ ] Projectteam samenstellen\n\n### Fase 2: Planning\n- [ ] Scope en deliverables vastleggen\n- [ ] Tijdlijn en mijlpalen opstellen\n- [ ] Risico's identificeren\n- [ ] Communicatieplan opstellen\n\n### Fase 3: Uitvoering\n- [ ] Kickoff meeting houden\n- [ ] Taken verdelen\n- [ ] Voortgang bijhouden\n- [ ] Stakeholders informeren\n\n### Fase 4: Monitoring\n- [ ] Wekelijks voortgangsoverleg\n- [ ] Risico's bewaken\n- [ ] Kwaliteitscontrole\n\n### Fase 5: Afsluiting\n- [ ] Eindproduct opleveren\n- [ ] Evaluatie uitvoeren\n- [ ] Lessons learned documenteren`},
  {id:'presentatie', ic:'megaphone', name:'Presentatie',    desc:'Van idee tot podium',               tags:['presentatie'],
   analysis:`## Samenvatting\nVoorbereiding en uitvoering van een sterke presentatie.\n\n## Checklist\n\n### Fase 1: Voorbereiding\n- [ ] Doel en doelgroep bepalen\n- [ ] Kernboodschap formuleren\n- [ ] Structuur bepalen (intro-kern-conclusie)\n- [ ] Tijdsduur bewaken\n\n### Fase 2: Inhoud\n- [ ] Slides maken (1 idee per slide)\n- [ ] Visuals en grafieken toevoegen\n- [ ] Sprekersnotities schrijven\n- [ ] Bronnen verwerken\n\n### Fase 3: Oefenen\n- [ ] Hardop oefenen\n- [ ] Timen en bijstellen\n- [ ] Feedback vragen\n- [ ] Mogelijke vragen voorbereiden\n\n### Fase 4: Op de dag zelf\n- [ ] Techniek testen\n- [ ] Op tijd aanwezig\n- [ ] Rustig beginnen, oogcontact`},
  {id:'sollicitatie',ic:'briefcase', name:'Sollicitatie',   desc:'Van cv tot aanname',                tags:['werk'],
   analysis:`## Samenvatting\nVolledig sollicitatieproces van voorbereiding tot aanname.\n\n## Checklist\n\n### Fase 1: Voorbereiding\n- [ ] Vacature goed doorlezen\n- [ ] Bedrijf onderzoeken\n- [ ] CV bijwerken\n- [ ] LinkedIn profiel bijwerken\n\n### Fase 2: Sollicitatiebrief\n- [ ] Sterke openingszin schrijven\n- [ ] Motivatie koppelen aan functie-eisen\n- [ ] Concrete voorbeelden\n- [ ] Professionele afsluiting\n\n### Fase 3: Versturen\n- [ ] Brief en CV controleren\n- [ ] Versturen\n- [ ] Datum en contactpersoon noteren\n\n### Fase 4: Voorbereiding gesprek\n- [ ] Veelgestelde vragen voorbereiden\n- [ ] Eigen vragen opstellen\n- [ ] Kleding klaarleggen\n- [ ] Route plannen\n\n### Fase 5: Na het gesprek\n- [ ] Bedankmail sturen\n- [ ] Reflecteren\n- [ ] Follow-up plannen`},
  {id:'onderzoek',   ic:'search',    name:'Onderzoek',      desc:'Structureel onderzoek doen',        tags:['onderzoek','school'],
   analysis:`## Samenvatting\nGestructureerd onderzoeksproces van vraagstelling tot rapport.\n\n## Checklist\n\n### Fase 1: Vraagstelling\n- [ ] Hoofdvraag formuleren\n- [ ] Deelvragen opstellen\n- [ ] Afbakening bepalen\n\n### Fase 2: Methode\n- [ ] Onderzoeksmethode kiezen\n- [ ] Bronnen selecteren\n- [ ] Planning opstellen\n\n### Fase 3: Dataverzameling\n- [ ] Literatuuronderzoek\n- [ ] Primair onderzoek (indien van toepassing)\n- [ ] Data ordenen\n\n### Fase 4: Analyse\n- [ ] Data analyseren\n- [ ] Verbanden identificeren\n- [ ] Conclusies trekken\n\n### Fase 5: Rapportage\n- [ ] Inleiding schrijven\n- [ ] Resultaten presenteren\n- [ ] Conclusie en aanbevelingen\n- [ ] Bronnenlijst maken`},
  {id:'examen',      ic:'clipboard', name:'Examen',         desc:'Gestructureerd studeren',           tags:['school','studie'],
   analysis:`## Samenvatting\nGestructureerde examenvoorbereiding.\n\n## Checklist\n\n### Fase 1: Inventarisatie\n- [ ] Alle examenstof inventariseren\n- [ ] Leerstof verzamelen\n- [ ] Examendatum noteren\n- [ ] Beschikbare studietijd berekenen\n\n### Fase 2: Planning\n- [ ] Studieplanning per dag maken\n- [ ] Moeilijkste onderwerpen eerst\n- [ ] Herhaalblokken inplannen\n\n### Fase 3: Studeren\n- [ ] Samenvatting per hoofdstuk\n- [ ] Flashcards of mindmaps\n- [ ] Oefenvragen maken\n- [ ] Stof herhalen\n\n### Fase 4: Vlak voor examen\n- [ ] Alles doornemen\n- [ ] Goed slapen\n- [ ] Materiaal klaarleggen\n- [ ] Op tijd aanwezig`},
];
function quickStartTask(id){
  const tmpl=QUICK_TASK_TMPLS.find(t=>t.id===id);if(!tmpl)return;
  orbitPrompt(`Naam voor deze ${tmpl.name}:`,tmpl.name+' — '+new Date().toLocaleDateString('nl-NL'),name=>{
    if(!name)return;
    const t=mkTask('task',{goal:name,aud:'',tone:'',out:''},name);
    t.analysis=tmpl.analysis;
    t.tags=[...(tmpl.tags||[])];
    saveT();S.tid=t.id;
    toast('✅ Taak aangemaakt van sjabloon!');
    nav('analysis');
  },'Naam invoeren');
}
const saveLaunchTmpls=()=>localStorage.setItem('pb_launch_tmpls',JSON.stringify(LAUNCH_TMPLS));

// Beheer state
let _ltEditingIdx=null, _ltShowForm=false;

const AI_TIPS={
  chatgpt: {name:'ChatGPT',tip:'💬 ChatGPT werkt goed met duidelijke context en rolbeschrijving. Begin met "Jij bent een expert in..." en geef concrete verwachte output.'},
  claude:  {name:'Claude.ai',tip:'🧠 Claude is sterk in nuance en lange teksten. Geef veel context en stel vervolgvragen per onderdeel. Claude houdt van uitgeschreven instructies.'},
  gemini:  {name:'Gemini',tip:'🔵 Gemini integreert met Google-diensten. Geef korte, duidelijke prompts. Werkt goed voor research en informatieopzoeking.'},
  copilot: {name:'Copilot',tip:'🪟 Copilot (Microsoft) werkt goed voor code en Office-taken. Geef technische context mee en specificeer het gewenste format.'},
  perplexity:{name:'Perplexity',tip:'🔎 Perplexity is een zoekmachine met AI. Gebruik het voor actuele informatie en research. Korte, gerichte vragen werken het best.'},
  deepseek:{name:'DeepSeek',tip:'🌊 DeepSeek is sterk in code en analyse. Geef code met foutmelding of specificeer het gewenste technische format.'},
};

let _launchTab='prompt'; // 'prompt'|'history'|'templates'|'logbook'
let _launchHistory=JSON.parse(localStorage.getItem('pb_launch_history')||'[]');
let _selectedAITip='';
const saveLaunchHistory=()=>localStorage.setItem('pb_launch_history',JSON.stringify(_launchHistory.slice(0,50)));

function addToLaunchHistory(siteId,promptText){
  _launchHistory.unshift({id:mkId(),siteId,siteName:SITES.find(x=>x.id===siteId)?.l||siteId,promptSnippet:promptText.slice(0,120),date:new Date().toISOString(),prompt:promptText.slice(0,2000)});
  saveLaunchHistory();
}

function vLauncher(){
  const pgPrompt=S.lastLaunchPrompt||'';
  S.lastLaunchPrompt=null;
  const last=S.tasks.find(t=>t.analysis&&t.type!=='ai-checklist');
  const lastP=pgPrompt||(last?extractPrompt(last.analysis)||'':'');
  const lastL=pgPrompt?'↳ Prompt Genereren':(last?last.name||last.input?.goal||'':'');

  const tabs=[['prompt','📝 Prompt'],['templates','⚡ Templates'],['manage','⚙️ Beheer'],['history','🕐 Geschiedenis'],['logbook','📖 Logboek']];
  const tabsHTML=tabs.map(([id,l])=>`<button onclick="_launchTab='${id}';render()" class="px-4 py-2 text-sm font-semibold rounded-lg transition-all ${_launchTab===id?'bg-indigo-600 text-white':'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}">${l}</button>`).join('');

  /* ─── TAB: Prompt ─── */
  const tipBar=_selectedAITip?`<div class="card p-3 bg-indigo-50 border-indigo-200 text-xs text-indigo-800"><strong>${AI_TIPS[_selectedAITip]?.name||''}:</strong> ${AI_TIPS[_selectedAITip]?.tip||''}</div>`:'';
  const others=S.tasks.filter(t=>t.analysis&&t.type!=='ai-checklist'&&t!==last).slice(0,6);
  const cards=SITES.map(s=>`<div class="card p-4 hover:shadow-md transition-shadow">
    <div class="flex items-center gap-3 mb-3">
      <div class="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm" style="background:${s.c}">${s.l.slice(0,2)}</div>
      <div><div class="font-bold text-sm">${s.l}${s.free?' <span style="font-size:10px;background:#d1fae5;color:#065f46;padding:1px 5px;border-radius:3px">GRATIS</span>':''}</div><div class="text-xs text-gray-400">${s.s}</div></div>
    </div>
    <div class="space-y-1.5">
      <button onclick="_selectedAITip='${s.id}';launchSite('${s.id}')" class="btn w-full justify-center text-white text-sm" style="background:${s.c}">📋 Kopieer & Open</button>
      <button onclick="_selectedAITip='${s.id}';document.querySelectorAll('.ai-tip-bar').forEach(e=>e.classList.add('hidden'));document.getElementById('tip-${s.id}')?.classList.remove('hidden')" class="btn bs w-full justify-center text-xs">💡 Tips voor ${s.l}</button>
    </div>
  </div>`).join('');

  const promptTab=`<div id="launch-ok" class="hidden card p-4 bg-emerald-50 border-emerald-300 flex items-center gap-3">
    <span class="text-2xl">✅</span><div class="flex-1"><div class="font-bold text-emerald-900" id="launch-msg">Klaar!</div><div class="text-sm text-emerald-700">Log in en plak met <kbd class="bg-emerald-100 border border-emerald-300 rounded px-1 font-mono text-xs">Ctrl+V</kbd></div></div>
    <button onclick="this.parentElement.classList.add('hidden')" class="text-emerald-600 font-bold text-xl">×</button>
  </div>
  ${tipBar}
  ${SITES.map(s=>`<div id="tip-${s.id}" class="ai-tip-bar hidden card p-3 bg-amber-50 border-amber-200 text-xs text-amber-800"><strong>${AI_TIPS[s.id]?.name||s.l}:</strong> ${AI_TIPS[s.id]?.tip||'Geen specifieke tips beschikbaar.'}</div>`).join('')}
  <div class="flex gap-5">
    <div style="width:300px;flex-shrink:0" class="space-y-3">
      <div class="card p-4 space-y-3">
        <div class="flex items-center justify-between"><div class="font-bold text-sm">📋 Prompt</div>${lastL?`<div class="text-xs text-indigo-400 truncate max-w-36" title="${lastL}">↳ ${lastL}</div>`:''}</div>
        <textarea id="lp-txt" class="inp text-sm resize-none" rows="10" placeholder="Genereer eerst een prompt...">${lastP}</textarea>
        <button class="btn bs w-full justify-center text-sm" onclick="copyPrompt(document.getElementById('lp-txt').value)">📋 Alleen kopiëren</button>
      </div>
      ${others.length?`<div class="card p-3"><div class="text-xs font-semibold text-gray-500 uppercase mb-2">Andere prompts</div>${others.map(t=>`<div class="text-xs text-indigo-600 hover:underline cursor-pointer mb-1.5 truncate" onclick="loadLP('${t.id}')">${(t.name||t.input?.goal||'Prompt').slice(0,35)}</div>`).join('')}</div>`:''}
      <div class="card p-3 bg-indigo-50 border-indigo-200"><div class="text-xs font-semibold text-indigo-600 uppercase mb-1.5">Hoe het werkt</div><ol class="text-xs text-indigo-700 space-y-1"><li>1. Klik "Kopieer & Open [tool]"</li><li>2. Prompt gekopieerd + site opent</li><li>3. Log in op de site</li><li>4. Plak met Ctrl+V</li></ol></div>
    </div>
    <div class="flex-1"><div class="grid grid-cols-2 gap-3">${cards}</div></div>
  </div>`;

  /* ─── TAB: Templates ─── */
  const templatesTab=`<div class="space-y-4">
    <div class="text-sm text-gray-500">Kies een snelle prompt-template. Klik op "Gebruik" om hem in het promptveld te laden, dan stuur je hem naar een AI.</div>
    <div class="grid grid-cols-2 gap-3">
      ${LAUNCH_TMPLS.map((t,idx)=>`<div class="card p-4 space-y-2 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-2"><span class="text-xl">${icData(t.ic,18)}</span><div class="font-bold text-sm">${t.l}</div></div>
        <div class="text-xs text-gray-500 line-clamp-2">${t.p.slice(0,80)}...</div>
        <div class="flex gap-2">
          <button onclick="loadLaunchTemplate(${idx})" class="btn bp text-xs py-1 flex-1">Gebruik</button>
          <button onclick="copyText(LAUNCH_TMPLS[${idx}].p,'Template gekopieerd!')" class="btn bs text-xs py-1">📋</button>
        </div>
      </div>`).join('')}
    </div>
  </div>`;

  /* ─── TAB: Geschiedenis ─── */
  const histTab=_launchHistory.length?`<div class="space-y-3">
    <div class="flex items-center justify-between">
      <div class="text-sm text-gray-500">Jouw recente AI-sessies (laatste 50)</div>
      <button onclick="orbitConfirm('Geschiedenis wissen?',()=>{_launchHistory=[];saveLaunchHistory();render()},null,'Wissen')" class="btn bs text-xs">🗑️ Wis alles</button>
    </div>
    ${_launchHistory.map((h,i)=>{const s=SITES.find(x=>x.id===h.siteId)||{l:h.siteName,c:'#6b7280'};return`<div class="card p-3 flex items-start gap-3">
      <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style="background:${s.c}">${s.l.slice(0,2)}</div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-0.5">
          <span class="font-semibold text-sm">${s.l}</span>
          <span class="text-xs text-gray-400">${new Date(h.date).toLocaleDateString('nl-NL',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}</span>
        </div>
        <div class="text-xs text-gray-500 truncate">${h.promptSnippet}${h.promptSnippet.length>=120?'...':''}</div>
      </div>
      <div class="flex gap-1 flex-shrink-0">
        <button onclick="loadHistoryPrompt(${i})" class="btn bp text-xs py-1 px-2" title="Laad in promptveld">↗️</button>
        <button onclick="copyText(_launchHistory[${i}].prompt,'Prompt gekopieerd!')" class="btn bs text-xs py-1 px-2" title="Kopieer prompt">📋</button>
        <button onclick="_launchHistory.splice(${i},1);saveLaunchHistory();render()" class="btn bs text-xs py-1 px-2" title="Verwijder">🗑️</button>
      </div>
    </div>`;}).join('')}
  </div>`:`<div class="card p-12 text-center text-gray-400"><div class="text-4xl mb-3">🕐</div><div class="font-semibold">Geen geschiedenis</div><div class="text-sm mt-1">Elke keer dat je een prompt naar een AI stuurt, verschijnt die hier</div></div>`;

  /* ─── TAB: Logboek ─── */
  const logEntries=JSON.parse(localStorage.getItem('pb_log_entries')||'[]');
  const logbookTab=`<div class="space-y-4">
    <div class="card p-4 space-y-3">
      <div class="font-bold text-sm">📖 AI-antwoord opslaan in logboek</div>
      <div class="text-xs text-gray-500">Plak het antwoord van de AI hier. Het wordt opgeslagen als logboekitem zodat je het later kunt teruglezen.</div>
      <input id="log-title" class="inp text-sm" placeholder="Titel (bijv. 'ChatGPT antwoord over marketingplan')">
      <textarea id="log-body" class="inp text-sm w-full" rows="6" placeholder="Plak hier het antwoord van de AI..."></textarea>
      <div class="flex gap-2">
        <button onclick="saveLogEntry()" class="btn bp text-sm">💾 Opslaan in logboek</button>
        <button onclick="document.getElementById('log-title').value='';document.getElementById('log-body').value=''" class="btn bs text-sm">Wis</button>
      </div>
    </div>
    ${logEntries.length?`<div class="space-y-3">
      <div class="flex items-center justify-between"><div class="font-semibold text-sm">${logEntries.length} opgeslagen ${logEntries.length===1?'item':'items'}</div>
        <button onclick="orbitConfirm('Alle logboek-items verwijderen?',()=>{localStorage.removeItem('pb_log_entries');render()},null,'Logboek wissen')" class="btn bs text-xs">🗑️ Wis logboek</button></div>
      ${logEntries.map((e,i)=>`<div class="card p-4 space-y-2">
        <div class="flex items-center justify-between">
          <div class="font-semibold text-sm">${e.title||'Naamloos'}</div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-400">${new Date(e.date).toLocaleDateString('nl-NL',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}</span>
            <button onclick="copyText(${JSON.stringify(e.body)},'Gekopieerd!')" class="btn bs text-xs py-1 px-2">📋</button>
            <button onclick="delLogEntry(${i})" class="btn bs text-xs py-1 px-2" style="color:#ef4444">🗑️</button>
          </div>
        </div>
        <div class="text-xs text-gray-600 bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto whitespace-pre-wrap">${e.body.slice(0,500)}${e.body.length>500?'\n...(afgekapt)':''}</div>
      </div>`).join('')}
    </div>`:`<div class="text-sm text-gray-400 text-center py-4">Nog geen logboek-items opgeslagen</div>`}
  </div>`;

  /* ─── TAB: Beheer (template management) ─── */
  const editingTmpl=_ltEditingIdx!==null?LAUNCH_TMPLS[_ltEditingIdx]:null;
  const manageTab=`<div class="space-y-4">
    <div class="flex items-center justify-between flex-wrap gap-2">
      <div class="text-sm text-gray-500">Beheer je templates — bewerk, voeg toe, verwijder of reset naar standaard.</div>
      <div class="flex gap-2">
        <button onclick="ltNewForm()" class="btn bp text-sm">➕ Nieuw template</button>
        <button onclick="orbitConfirm('Alle templates resetten naar standaard?',()=>{LAUNCH_TMPLS=DFLT_LAUNCH_TMPLS.map(t=>({...t}));saveLaunchTmpls();_ltEditingIdx=null;_ltShowForm=false;render()},null,'Reset')" class="btn bs text-sm">↩️ Reset</button>
      </div>
    </div>

    ${_ltShowForm?`<div class="card p-5 border-2 border-indigo-300 space-y-3">
      <div class="font-bold text-sm text-indigo-800">${editingTmpl?'✏️ Template bewerken':'➕ Nieuw template'}</div>
      <div class="grid grid-cols-3 gap-3">
        <div><label class="lbl">Icoon</label><input id="lt-ic" class="inp text-sm" value="${editingTmpl?editingTmpl.ic:'📝'}" placeholder="📝" style="max-width:80px"></div>
        <div class="col-span-2"><label class="lbl">Naam</label><input id="lt-name" class="inp text-sm" value="${editingTmpl?editingTmpl.l.replace(/"/g,'&quot;'):''}" placeholder="Naam van het template"></div>
      </div>
      <div><label class="lbl">Prompt-inhoud</label>
        <textarea id="lt-body" class="inp text-sm w-full" rows="8" placeholder="Schrijf hier je prompt... Gebruik [HAAKJES] voor velden die de gebruiker moet invullen.">${editingTmpl?editingTmpl.p.replace(/</g,'&lt;'):''}</textarea>
      </div>
      <div class="flex gap-2">
        <button onclick="ltSaveForm()" class="btn bp text-sm">💾 Opslaan</button>
        <button onclick="_ltShowForm=false;_ltEditingIdx=null;render()" class="btn bs text-sm">Annuleer</button>
      </div>
    </div>`:''}

    <div class="space-y-2">
      ${LAUNCH_TMPLS.map((t,i)=>`<div class="card p-4 flex items-start gap-3 group hover:shadow-sm transition-shadow">
        <span class="text-2xl flex-shrink-0 mt-0.5">${icData(t.ic||'📝',20)}</span>
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-sm">${t.l}</div>
          <div class="text-xs text-gray-400 mt-0.5 line-clamp-2 whitespace-pre-line">${t.p.slice(0,100)}${t.p.length>100?'...':''}</div>
        </div>
        <div class="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onclick="ltEdit(${i})" class="btn bs text-xs py-1 px-2" title="Bewerk">✏️</button>
          <button onclick="loadLaunchTemplate(${i})" class="btn bp text-xs py-1 px-2" title="Gebruik nu">▶</button>
          <button onclick="ltDelete(${i})" class="btn bs text-xs py-1 px-2" style="color:#ef4444" title="Verwijder">🗑️</button>
        </div>
      </div>`).join('')}
    </div>
  </div>`;

  return `<div class="space-y-5">
    <div><h1 class="text-2xl font-bold">🌐 AI Launcher</h1><p class="text-gray-400 text-sm mt-1">Kopieer je prompt, open AI naar keuze, bewaar antwoorden</p></div>
    <div class="flex gap-2 flex-wrap">${tabsHTML}</div>
    ${_launchTab==='prompt'?promptTab:_launchTab==='templates'?templatesTab:_launchTab==='manage'?manageTab:_launchTab==='history'?histTab:logbookTab}
  </div>`;
}

/* ── Launch Template CRUD ──────────────────────────────── */
function ltNewForm(){_ltEditingIdx=null;_ltShowForm=true;render();}
function ltEdit(i){_ltEditingIdx=i;_ltShowForm=true;render();}
function ltDelete(i){
  orbitConfirm('Template "'+LAUNCH_TMPLS[i].l+'" verwijderen?',()=>{
    LAUNCH_TMPLS.splice(i,1);saveLaunchTmpls();render();toast('🗑️ Verwijderd');
  },null,'Template verwijderen');
}
function ltSaveForm(){
  const ic=document.getElementById('lt-ic')?.value?.trim()||'📝';
  const name=document.getElementById('lt-name')?.value?.trim();
  const body=document.getElementById('lt-body')?.value?.trim();
  if(!name){toast('⚠️ Vul een naam in');return;}
  if(!body){toast('⚠️ Vul de prompt-inhoud in');return;}
  const id=_ltEditingIdx!==null?LAUNCH_TMPLS[_ltEditingIdx].id:'lt'+Date.now();
  const obj={id,ic,l:name,p:body};
  if(_ltEditingIdx!==null){LAUNCH_TMPLS[_ltEditingIdx]=obj;toast('✅ Template bijgewerkt!');}
  else{LAUNCH_TMPLS.push(obj);toast('✅ Nieuw template toegevoegd!');}
  saveLaunchTmpls();_ltShowForm=false;_ltEditingIdx=null;render();
}

function loadHistoryPrompt(idx){
  const h=_launchHistory[idx];if(!h)return;
  _launchTab='prompt';render();
  setTimeout(()=>{const el=document.getElementById('lp-txt');if(el)el.value=h.prompt;},60);
  toast('✅ Prompt uit geschiedenis geladen!');
}
function loadLaunchTemplate(idx){
  const t=LAUNCH_TMPLS[idx];if(!t)return;
  _launchTab='prompt';render();
  setTimeout(()=>{const el=document.getElementById('lp-txt');if(el)el.value=t.p;},60);
  toast('✅ Template geladen! Stuur naar je AI van keuze.');
}

function saveLogEntry(){
  const title=document.getElementById('log-title')?.value?.trim()||'Naamloos';
  const body=document.getElementById('log-body')?.value?.trim();
  if(!body){toast('⚠️ Plak eerst een antwoord');return;}
  const entries=JSON.parse(localStorage.getItem('pb_log_entries')||'[]');
  entries.unshift({id:mkId(),title,body,date:new Date().toISOString()});
  localStorage.setItem('pb_log_entries',JSON.stringify(entries.slice(0,100)));
  toast('✅ Opgeslagen in logboek!');
  document.getElementById('log-title').value='';
  document.getElementById('log-body').value='';
  render();
}
function delLogEntry(i){
  const entries=JSON.parse(localStorage.getItem('pb_log_entries')||'[]');
  entries.splice(i,1);localStorage.setItem('pb_log_entries',JSON.stringify(entries));render();
}

function launchSite(siteId){
  const s=SITES.find(x=>x.id===siteId);if(!s)return;
  const txt=(document.getElementById('lp-txt')?.value||'').trim();
  window.open(s.url,'_blank','noopener');
  if(txt){
    const full=getPromptForUse(txt);
    navigator.clipboard?.writeText(full).catch(()=>fbCopy(full,''));
    addToLaunchHistory(siteId,txt);
  }
  const ok=document.getElementById('launch-ok');
  if(ok){document.getElementById('launch-msg').textContent=s.l+(txt?' geopend & prompt gekopieerd!':' geopend — geen prompt ingevuld');ok.classList.remove('hidden');ok.scrollIntoView({behavior:'smooth',block:'start'});}
}
function loadLP(tid){const t=S.tasks.find(x=>x.id===tid);if(!t)return;const p=extractPrompt(t.analysis||'')||'';const el=document.getElementById('lp-txt');if(el){el.value=p;toast('✅ Prompt geladen!');}}
