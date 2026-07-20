/* ══════════════════════════════════════════════════════════
   🎯  PORTFOLIO & LEERDOELEN
   ══════════════════════════════════════════════════════════ */
const PRESET_GOALS=[
  {cat:'HBO Algemeen',  goals:['Kritisch denken & analyseren','Onderzoeksvaardigheden','Projectmanagement','Samenwerken in teams','Professionele communicatie','Ethisch redeneren','Zelfreflectie & persoonlijke ontwikkeling','Plannen & organiseren','Rapporteren & schrijven','Presenteren voor groepen','Probleemoplossend denken','Data verzamelen & interpreteren','Klantgericht werken','Integraal werken','Reflecteren op eigen handelen','Beroepshouding ontwikkelen','Multidisciplinair samenwerken','Adviesrapport schrijven']},
  {cat:'Bouwkunde & Civiele Techniek', goals:['AutoCAD tekenen','Revit & BIM','Constructieleer & sterkteleer','Bouwregelgeving (Bouwbesluit)','Calculatie & kostenraming','Bouwfysica (geluid, warmte, vocht)','Duurzaam bouwen & BENG','Technisch tekenen','Projectleiding bouwprojecten','Grondmechanica','Wegenbouw & infrastructuur','Waterbeheer & hydraulica','Gebouwbeheer & onderhoud','Omgevingswet & vergunningen','SketchUp / ArchiCAD','Bouwmateriaalkennis','Installatietechniek','Bouwlogistiek & planning']},
  {cat:'ICT & Software', goals:['Python programmeren','JavaScript & webdevelopment','HTML & CSS','React / Vue.js','TypeScript','SQL & databases','Git & versiebeheer','Netwerken & TCP/IP','Cybersecurity','Cloud computing (AWS/Azure/Google)','Docker & containerisatie','Agile & Scrum','Linux & systeembeheer','Software architectuur','REST API\'s ontwerpen','Testing & kwaliteitsborging','DevOps & CI/CD','Data engineering','Machine learning basis','Informatiebeveiliging']},
  {cat:'Bedrijfskunde & Management', goals:['Strategisch management','Financieel management & controlling','HRM & personeelsmanagement','Marketingstrategie','Operationeel management','Business Intelligence & rapportage','Verandermanagement','Ondernemerschap & businessmodel','Supply chain management','Organisatiekunde','Inkoop & contractmanagement','Procesoptimalisatie (Lean/Six Sigma)','Stakeholdermanagement','Risicomanagement','Bedrijfsrecht & compliance','Internationale handel','Duurzaam ondernemen','Kwaliteitsmanagement (ISO)']},
  {cat:'Communicatie & Media', goals:['Contentcreatie & copywriting','PR & woordvoering','Journalistiek schrijven','Social media management','Video & podcast productie','Grafisch ontwerp','Storytelling & narratief','Crisiscommunicatie','Interne communicatie','Onderzoek & fact-checking','Campagne-ontwerp','Redactioneel werken','Publieksgericht schrijven','Mediarecht & ethiek','Fotografie','Animatie & motion graphics','Community management','Eventcommunicatie']},
  {cat:'Zorg & Welzijn', goals:['Anatomie & fysiologie','Zorgplanning & dossiervoering','Communicatie met cliënten/patiënten','Evidence-based werken','Ethiek in de zorg','Farmacologie basiskennis','EHBO & eerste hulp','Samenwerken in zorgteams','Gezondheidsbevordering','Ouderenzorg','GGZ & psychiatrie basis','Wondverzorging & verpleegkundige handelingen','Wet- en regelgeving in de zorg','Palliatiefzorg','Mantelzorgondersteuning','Welzijnswerk & begeleiding','Gezins- en jeugdzorg','Ergonomisch werken']},
  {cat:'Pedagogiek & Onderwijs', goals:['Ontwikkelingspsychologie','Didactisch handelen','Klassenmanagement','Handelingsgericht werken','Gezinsondersteuning','Observeren & signaleren','Gesprekstechnieken (coaching)','Gedragsproblematiek herkennen','Inclusief onderwijs','Samenwerken met ouders','Leerlingbegeleiding','Curriculumontwikkeling','Formatief evalueren','Opvoedingsondersteuning','Speciale onderwijsbehoeften','Jeugdzorg & verwijzing','Interculturele communicatie','Spel & ontwikkeling peuters']},
  {cat:'Rechten & Juridisch', goals:['Burgerlijk recht','Strafrecht','Bestuursrecht','Arbeidsrecht','Contractenrecht','Ondernemingsrecht','Europees recht','Procesrecht & rechtspraak','Juridisch schrijven','Wet- en regelgeving lezen','Privacy & AVG','Belastingrecht basis','Internationaal recht','Rechtsfilosofie & ethiek','Notariaat basis','Intellectueel eigendomsrecht']},
  {cat:'Technisch',  goals:['Excel & Google Sheets','Power BI / Tableau','WordPress','Automatisering (Zapier/Make)','CAD tekenen']},
  {cat:'Marketing',  goals:['SEO & zoekmachineoptimalisatie','Google Ads','Meta Ads (Facebook/Instagram)','Email marketing','Contentmarketing','Google Analytics','Affiliate marketing','TikTok marketing','Conversion rate optimalisatie','Branding & positionering']},
  {cat:'Design',     goals:['Figma','Adobe Photoshop','Adobe Illustrator','Canva','Video editing (Premiere/DaVinci)','UX/UI Design','Branding & huisstijl','Motion graphics','3D design (Blender)','Accessibility design']},
  {cat:'AI & Tools', goals:['Prompt engineering','ChatGPT effectief gebruiken','Midjourney / AI beeldgeneratie','AI workflow automatisering','Claude & Gemini','AI voor business','No-code tools (Bubble/Webflow)','Automatisch rapporteren met AI']},
  {cat:'Persoonlijk',goals:['Timemanagement','Publiek spreken','Leiderschap','Netwerken','Mindset & productiviteit','Conflicthantering','Coaching & mentoring','Assertiviteit','Emotionele intelligentie','Stressmanagement']},
  {cat:'Taal',       goals:['Engels zakelijk schrijven','Duits','Frans','Spaans','Professioneel Nederlands schrijven','Presenteren in het Engels','Technisch schrijven','Academisch schrijven']},
];
const GOAL_CATS=PRESET_GOALS.map(x=>x.cat);

const PORTFOLIO_COLORS=[
  {id:'indigo', l:'Indigo',   hex:'#4f46e5'},
  {id:'emerald',l:'Groen',    hex:'#10b981'},
  {id:'blue',   l:'Blauw',    hex:'#3b82f6'},
  {id:'violet', l:'Paars',    hex:'#7c3aed'},
  {id:'rose',   l:'Rood',     hex:'#e11d48'},
  {id:'amber',  l:'Goud',     hex:'#d97706'},
  {id:'slate',  l:'Grijs',    hex:'#475569'},
  {id:'teal',   l:'Teal',     hex:'#0d9488'},
  {id:'orange', l:'Oranje',   hex:'#ea580c'},
  {id:'pink',   l:'Roze',     hex:'#db2777'},
  {id:'lime',   l:'Lime',     hex:'#65a30d'},
  {id:'sky',    l:'Hemelsblauw',hex:'#0284c7'},
  {id:'brown',  l:'Aarde',    hex:'#78350f'},
  {id:'dark',   l:'Nacht',    hex:'#1e293b'},
  {id:'fuchsia',l:'Fuchsia',  hex:'#a21caf'},
  {id:'cyan',   l:'Cyaan',    hex:'#0891b2'},
];

function mkGoal(name,cat='Overig'){
  const g={id:mkId(),name,desc:'',category:cat,level:1,
    ws:S.activeWs,    // werkruimte waar dit doel bij hoort
    milestones:[],notes:'',history:[],
    linkedTasks:[],   // array van task-ids
    werkItems:[],     // [{id,title,body,date}] — eigen werk-beschrijvingen
    createdAt:new Date().toISOString()};
  S.goals.unshift(g);saveGoals();return g;
}

/* ── Werkruimtes beheren ── */
function switchWs(id){ if(id===S.activeWs)return; setActiveWs(id); S._goalCat=''; _pgPickerOpen=false; render(); }
function addWorkspace(){
  orbitPrompt('Naam voor de nieuwe werkruimte (bijv. School, Werk, Stage):','',name=>{
    name=(name||'').trim(); if(!name)return;
    const id='ws'+Date.now()+Math.random().toString(36).slice(2,5);
    S.workspaces.push({id,name}); saveWorkspaces(); setActiveWs(id); S._goalCat=''; _pgPickerOpen=false; render();
    toast('✅ Werkruimte "'+name+'" aangemaakt');
  },'Nieuwe werkruimte');
}
function renameWorkspace(){
  const w=S.workspaces.find(x=>x.id===S.activeWs); if(!w)return;
  orbitPrompt('Nieuwe naam voor deze werkruimte:',w.name,name=>{
    name=(name||'').trim(); if(!name)return;
    w.name=name; saveWorkspaces(); render(); toast('✅ Naam aangepast');
  },'Werkruimte hernoemen');
}
function deleteWorkspace(){
  if(S.workspaces.length<=1){toast('⚠️ Je hebt minstens één werkruimte nodig');return;}
  const w=S.workspaces.find(x=>x.id===S.activeWs); if(!w)return;
  const n=wsGoals().length;
  orbitConfirm(`Werkruimte "${w.name}" verwijderen?${n?` De ${n} leerdoel${n===1?'':'en'} hierin worden ook verwijderd.`:''}`,()=>{
    S.goals=S.goals.filter(g=>(g.ws||'default')!==S.activeWs);
    S.workspaces=S.workspaces.filter(x=>x.id!==S.activeWs);
    saveGoals(); saveWorkspaces(); setActiveWs(S.workspaces[0].id); S._goalCat=''; render();
    toast('🗑️ Werkruimte verwijderd');
  },null,'Werkruimte verwijderen');
}
function goalPct(g){
  const m=g.milestones||[];return m.length?Math.round(m.filter(x=>x.done).length/m.length*100):0;
}
function lvlColor(n){
  if(n>=91)return'#047857';  // Dark green
  if(n>=81)return'#059669';  // Deep emerald
  if(n>=71)return'#10b981';  // Emerald
  if(n>=61)return'#22c55e';  // Green
  if(n>=51)return'#84cc16';  // Lime
  if(n>=41)return'#eab308';  // Yellow
  if(n>=31)return'#f59e0b';  // Amber
  if(n>=21)return'#f97316';  // Orange
  if(n>=11)return'#ef4444';  // Red
  return'#dc2626';           // Dark red
}
function lvlLabel(n){
  if(n>=80)return'Expert';if(n>=60)return'Gevorderd';if(n>=40)return'Gemiddeld';if(n>=20)return'Beginner';return'Starter';
}

/* ── Portfolio header dropdowns ── */
function togglePortfolioDD(id){
  const target=document.getElementById('pdd-'+id);
  const wasOpen=target&&!target.classList.contains('hidden');
  closePortfolioDDs();
  if(target&&!wasOpen){
    target.classList.remove('hidden');
    setTimeout(()=>document.addEventListener('click',_pddOutsideClick),0);
  }
}
function closePortfolioDDs(){
  document.querySelectorAll('[id^="pdd-"]').forEach(el=>el.classList.add('hidden'));
  document.removeEventListener('click',_pddOutsideClick);
}
function _pddOutsideClick(e){
  if(!e.target.closest('[id^="pdd-"]')&&!e.target.closest('button[onclick^="togglePortfolioDD"]'))closePortfolioDDs();
}

/* ── Portfolio state ── */
let _pgPickerCat='',_pgPickerSearch='',_pgPickerOpen=false;
let _analysisProposals=[];
let _newGoalProposals=[];
let _pdfColor=localStorage.getItem('pb_pdf_color')||'indigo';

function vPortfolio(){
  const catFilter=S._goalCat||'';
  const goals=wsGoals();
  const shown=catFilter?goals.filter(g=>g.category===catFilter):goals;
  const avgLevel=goals.length?Math.round(goals.reduce((a,g)=>a+(g.level||1),0)/goals.length):0;

  const cards=shown.map(g=>{
    const lc=lvlColor(g.level||1);
    const done=g.milestones.filter(x=>x.done).length,tot=g.milestones.length;
    const msPct=tot?Math.round(done/tot*100):0;
    const lastH=g.history&&g.history.length?g.history[g.history.length-1]:null;
    return `<div class="card p-4 hover:shadow-md transition-shadow cursor-pointer group" onclick="S.gid='${g.id}';nav('goal-detail')">
      <div class="flex items-start justify-between gap-2 mb-3">
        <div class="flex-1 min-w-0">
          <div class="font-bold text-sm truncate">${esc(g.name)}</div>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-xs px-2 py-0.5 rounded-full text-white font-semibold" style="background:${lc}">${lvlLabel(g.level||1)}</span>
            <span class="text-xs text-gray-400">${g.category}</span>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <div class="text-2xl font-bold" style="color:${lc}">${g.level||1}</div>
          <div class="text-xs text-gray-400">/ 100</div>
        </div>
      </div>
      <!-- Level bar -->
      <div class="pbar mb-1"><div class="pfill" style="width:${g.level||1}%;background:${lc}"></div></div>
      <div class="flex items-center justify-between text-xs mt-2">
        <span class="text-gray-400">${tot>0?`${done}/${tot} mijlpalen`:'Geen mijlpalen'}</span>
        ${lastH?`<span class="font-semibold" style="color:${lastH.delta>=0?'#10b981':'#ef4444'}">${lastH.delta>=0?'+':''}${lastH.delta} punt${Math.abs(lastH.delta)!==1?'en':''}</span>`:''}
      </div>
    </div>`;
  }).join('');

  /* ── Goal picker panel ── */
  const pickerHTML=_pgPickerOpen?`<div class="card border-2 border-indigo-300 p-5 space-y-4">
    <div class="flex items-center justify-between">
      <div class="font-bold text-sm text-indigo-800">➕ Doel toevoegen</div>
      <button onclick="_pgPickerOpen=false;render()" class="text-gray-400 hover:text-gray-600 font-bold">✕</button>
    </div>
    <input id="picker-search" class="inp text-sm" placeholder="Zoek een vaardigheid..."
      value="${_pgPickerSearch}" oninput="pgSearchInput(this.value)">
    <div>
      <!-- Category tabs -->
      <div class="flex flex-wrap gap-1.5 mb-3">
        <button onclick="_pgPickerCat='';render()" class="text-xs px-2.5 py-1 rounded-full border" style="${!_pgPickerCat?`background:var(--p);color:var(--icon-txt,#fff);border-color:var(--p)`:`background:var(--card);color:var(--txt2);border-color:var(--card-border)`}">Alle</button>
        ${PRESET_GOALS.map(pg=>`<button onclick="_pgPickerCat='${pg.cat}';render()" class="text-xs px-2.5 py-1 rounded-full border" style="${_pgPickerCat===pg.cat?`background:var(--p);color:var(--icon-txt,#fff);border-color:var(--p)`:`background:var(--card);color:var(--txt2);border-color:var(--card-border)`}">${pg.cat}</button>`).join('')}
      </div>
      <!-- Preset list -->
      <div id="picker-results" class="flex flex-wrap gap-2 max-h-48 overflow-y-auto pb-1">
        ${pgPickerResultsHTML()}
      </div>
    </div>
    <!-- Eigen doel -->
    <div class="border-t border-gray-100 pt-3 space-y-2">
      <div class="text-xs font-semibold text-gray-500">OF voeg een eigen doel toe:</div>
      <div class="flex gap-2">
        <input id="custom-goal-name" class="inp flex-1 text-sm" placeholder="Naam van je eigen doel...">
        <select id="custom-goal-cat" class="inp text-sm" style="width:140px">${GOAL_CATS.map(c=>`<option>${c}</option>`).join('')}</select>
        <button onclick="addCustomGoal()" class="btn bp text-sm">➕ Toevoegen</button>
      </div>
    </div>
  </div>`:'';

  /* ── Analysis proposals ── */
  const proposalsHTML=_analysisProposals.length?`<div class="card border-2 border-emerald-300 p-5 space-y-3">
    <div class="font-bold text-sm text-emerald-800">🔬 Groeivoorstellen — keur goed of verwijder</div>
    ${_analysisProposals.map((p,i)=>`<div class="flex items-center gap-3 p-3 rounded-lg border ${p.accepted===true?'border-emerald-300 bg-emerald-50':p.accepted===false?'border-red-100 bg-red-50 opacity-50':'border-gray-200 bg-white'}">
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-sm">${esc(p.goalName)}</div>
        <div class="text-xs text-gray-500 mt-0.5">${esc(p.reason)}</div>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-xs text-gray-400">${p.oldLevel} → ${p.newLevel}</span>
          <span class="text-xs font-bold px-2 py-0.5 rounded-full text-white" style="background:${p.delta>=0?'#10b981':'#ef4444'}">${p.delta>=0?'+':''}${p.delta}</span>
        </div>
      </div>
      ${p.accepted===null?`<div class="flex gap-2 flex-shrink-0">
        <button onclick="acceptProposal(${i})" class="btn bg text-xs py-1 px-3">✅ Accepteren</button>
        <button onclick="rejectProposal(${i})" class="btn br text-xs py-1 px-2">✕</button>
      </div>`:`<div class="text-xs font-semibold flex-shrink-0 ${p.accepted?'text-emerald-600':'text-red-400'}">${p.accepted?'✅ Geaccepteerd':'✕ Afgewezen'}</div>`}
    </div>`).join('')}
    <div class="flex gap-2 pt-1 border-t border-gray-100">
      <button onclick="acceptAllProposals()" class="btn bg text-xs">✅ Alles accepteren</button>
      <button onclick="_analysisProposals=[];render()" class="btn bs text-xs">Sluiten</button>
    </div>
  </div>`:'';

  /* ── Nieuwe doel-voorstellen ── */
  const newGoalProposalsHTML=_newGoalProposals.length?`<div class="card border-2 border-violet-300 p-5 space-y-3">
    <div class="font-bold text-sm text-violet-800">🧭 Voorgestelde nieuwe leerdoelen — keur goed of verwijder</div>
    ${_newGoalProposals.map((p,i)=>`<div class="flex items-center gap-3 p-3 rounded-lg border ${p.accepted===true?'border-emerald-300 bg-emerald-50':p.accepted===false?'border-red-100 bg-red-50 opacity-50':'border-gray-200 bg-white'}">
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-sm">${esc(p.name)}</div>
        <div class="text-xs text-gray-500 mt-0.5">${esc(p.reason)}</div>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">${esc(p.category)}</span>
          <span class="text-xs text-gray-400">Startniveau: ${p.level}/100 (${lvlLabel(p.level)})</span>
        </div>
      </div>
      ${p.accepted===null?`<div class="flex gap-2 flex-shrink-0">
        <button onclick="acceptNewGoalProposal(${i})" class="btn bg text-xs py-1 px-3">✅ Toevoegen</button>
        <button onclick="rejectNewGoalProposal(${i})" class="btn br text-xs py-1 px-2">✕</button>
      </div>`:`<div class="text-xs font-semibold flex-shrink-0 ${p.accepted?'text-emerald-600':'text-red-400'}">${p.accepted?'✅ Toegevoegd':'✕ Afgewezen'}</div>`}
    </div>`).join('')}
    <div class="flex gap-2 pt-1 border-t border-gray-100">
      <button onclick="acceptAllNewGoalProposals()" class="btn bg text-xs">✅ Alles toevoegen</button>
      <button onclick="_newGoalProposals=[];render()" class="btn bs text-xs">Sluiten</button>
    </div>
  </div>`:'';

  return `<div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-3">
      <div><h1 class="text-2xl font-bold">🎯 Portfolio & Leerdoelen</h1>
        <p class="text-gray-400 text-sm mt-0.5">Volg je groei per vaardigheid op een schaal van 1 tot 100</p></div>
      <div class="flex gap-2 flex-wrap items-center">
        <div class="relative">
          <button class="btn bs text-sm" onclick="togglePortfolioDD('acties')">⚙️ Acties ▾</button>
          <div id="pdd-acties" class="hidden absolute right-0 z-20" style="top:calc(100% + 4px);min-width:230px;background:var(--card);border:1px solid var(--card-border);border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.14);padding:6px">
            <button class="w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-gray-50" onclick="closePortfolioDDs();toggleAcc('portfolio-discover')">🧭 Nieuwe doelen ontdekken</button>
            <button class="w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-gray-50" onclick="closePortfolioDDs();toggleAcc('portfolio-analyse')">🔬 Groei analyseren</button>
            <button class="w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-gray-50" onclick="closePortfolioDDs();toggleAcc('portfolio-bijlagen')">📎 Bijlagen & links</button>
            <div class="border-t border-gray-100 my-1"></div>
            <button class="w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-red-50" style="color:#ef4444" onclick="closePortfolioDDs();clearAllGrowth()">🗑️ Alle groei wissen</button>
          </div>
        </div>
        <div class="relative">
          <button class="btn bs text-sm" onclick="togglePortfolioDD('export')">📤 Exporteren ▾</button>
          <div id="pdd-export" class="hidden absolute right-0 z-20" style="top:calc(100% + 4px);min-width:200px;background:var(--card);border:1px solid var(--card-border);border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.14);padding:6px">
            <button class="w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-gray-50" onclick="closePortfolioDDs();exportPortfolioPDF()">📄 Portfolio uitdraaien</button>
            <button class="w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-gray-50" onclick="closePortfolioDDs();exportPOP()">📋 POP maken</button>
          </div>
        </div>
        <button class="btn bp text-sm" onclick="_pgPickerOpen=!_pgPickerOpen;render()">➕ Nieuw doel</button>
      </div>
    </div>

    <!-- Werkruimte-switcher -->
    <div class="flex items-center gap-2 flex-wrap">
      <span class="text-xs font-semibold text-gray-500">Werkruimte:</span>
      ${S.workspaces.map(w=>`<button onclick="switchWs('${w.id}')" class="text-sm px-3 py-1 rounded-full border transition-all" style="${w.id===S.activeWs?'background:var(--p);color:var(--icon-txt,#fff);border-color:var(--p);font-weight:700':'background:var(--card);color:var(--txt2);border-color:var(--card-border)'}">${esc(w.name)}</button>`).join('')}
      <button onclick="addWorkspace()" class="text-sm px-3 py-1 rounded-full border border-dashed border-gray-300 text-gray-500 hover:border-indigo-400 hover:text-indigo-500">+ werkruimte</button>
      <button onclick="renameWorkspace()" title="Naam wijzigen" class="text-gray-400 hover:text-indigo-500 text-base px-1">✏️</button>
      ${S.workspaces.length>1?`<button onclick="deleteWorkspace()" title="Werkruimte verwijderen" class="text-gray-400 hover:text-red-500 text-base px-1">🗑️</button>`:''}
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-3">
${(()=>{
        const experts=goals.filter(g=>g.level>=80).length;
        const growth=goals.reduce((a,g)=>a+(g.history||[]).filter(h=>h.delta>0).length,0);
        const avgClr=avgLevel>=80?'#10b981':avgLevel>=50?'#f59e0b':avgLevel>=25?'#f97316':'#ef4444';
        const expertClr=experts===0?'#6b7280':experts>=3?'#a855f7':experts>=1?'#10b981':'#10b981';
        const expertLabel=experts===0?'🏆 Expert (80+)':experts>=5?'🔥 Expert (80+)':'⭐ Expert (80+)';
        return`
        <div class="card p-3 text-center"><div class="text-2xl font-bold" style="color:var(--p)">${goals.length}</div><div class="text-xs text-gray-400">Doelen</div></div>
        <div class="card p-3 text-center"><div class="text-2xl font-bold" style="color:${expertClr}">${experts}</div><div class="text-xs text-gray-400">${expertLabel}</div></div>
        <div class="card p-3 text-center"><div class="text-2xl font-bold" style="color:${avgClr}">${avgLevel}</div><div class="text-xs text-gray-400">Gemiddeld niveau</div></div>
        <div class="card p-3 text-center"><div class="text-2xl font-bold" style="color:${growth>20?'#a855f7':growth>5?'#f59e0b':'#6b7280'}">${growth}</div><div class="text-xs text-gray-400">Groeimomenten</div></div>`;
      })()}
    </div>

    ${pickerHTML}
    ${proposalsHTML}
    ${newGoalProposalsHTML}

    <!-- Nieuwe doelen ontdekken accordion -->
    <div class="card overflow-hidden">
      <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left" onclick="toggleAcc('portfolio-discover')">
        <div class="flex items-center gap-3"><span class="text-lg">🧭</span><div>
          <div class="font-bold text-sm">Nieuwe doelen ontdekken</div>
          <div class="text-xs text-gray-500">Laat AI o.b.v. je werk en 20 vragen passende leerdoelen voorstellen</div>
        </div></div>
        <span id="acc-ic-portfolio-discover" class="text-gray-400 text-xs">▼</span>
      </button>
      <div id="acc-body-portfolio-discover" class="hidden border-t border-gray-100 p-4 space-y-4">

        <!-- Stap 1: Ontdek-prompt genereren -->
        <div class="bg-violet-50 border border-violet-200 rounded-lg p-4 space-y-3">
          <div class="font-semibold text-sm text-violet-800">📋 Stap 1 — Genereer de ontdek-prompt</div>
          <div class="text-xs text-violet-700">De AI stelt jou ~20 vragen over je werk, interesses en ervaring, en stelt op basis daarvan nieuwe leerdoelen voor die nog niet in je portfolio staan.</div>
          <div class="space-y-2">
            <label class="lbl">Voeg je werk toe aan de prompt (optioneel):</label>
            <div class="flex flex-wrap gap-1.5 mb-1">
              ${S.tasks.filter(t=>!t.archived).slice(0,8).map(t=>`<button onclick="addWorkToPrompt('ng-work-context','${t.id}')" class="text-xs bg-white border border-violet-200 text-violet-600 px-2 py-1 rounded hover:bg-violet-100">${(t.name||t.input?.goal||'Opdracht').slice(0,28)}</button>`).join('')||'<span class="text-xs text-gray-400">Maak eerst opdrachten aan in de app</span>'}
            </div>
            <textarea id="ng-work-context" class="inp text-sm w-full" rows="3"
              placeholder="Of typ/plak hier een korte beschrijving van je werk, interesses of opleiding..."></textarea>
          </div>
          <button class="btn bp text-sm w-full" onclick="generateNewGoalsPrompt()">📋 Genereer & kopieer ontdek-prompt</button>
          <div id="new-goals-prompt-out" class="hidden space-y-2">
            <label class="lbl text-violet-700">✅ Prompt gegenereerd — kopieer naar ChatGPT/Claude:</label>
            <textarea id="new-goals-prompt-txt" class="inp text-xs w-full" rows="8" style="font-family:monospace;background:#f8f7ff" readonly></textarea>
            <div class="flex gap-2">
              ${SITES.map(s=>`<button onclick="sendNewGoalsToAI('${s.id}')" class="btn text-white text-xs py-1.5 px-3 rounded-lg font-bold" style="background:${s.c}">${s.l}</button>`).join('')}
            </div>
          </div>
        </div>

        <!-- Stap 2: Antwoord plakken -->
        <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-3">
          <div class="font-semibold text-sm text-emerald-800">✅ Stap 2 — Plak het AI-antwoord hier</div>
          <div class="text-xs text-emerald-700">Voer eerst het gesprek met de AI (beantwoord de 20 vragen). Plak hierna het uiteindelijke antwoord met de voorgestelde leerdoelen. De app leest de voorstellen automatisch uit.</div>
          <textarea id="new-goals-dump" class="inp text-sm w-full" rows="7"
            placeholder="Plak hier het uiteindelijke antwoord van de AI met de voorgestelde leerdoelen..."></textarea>
          <div class="flex gap-2">
            <button class="btn bg text-sm" onclick="processNewGoalsDump()">🧭 Verwerk antwoord</button>
            <button class="btn bs text-sm" onclick="document.getElementById('new-goals-dump').value=''">Wis</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bijlagen & links accordion -->
    <div class="card overflow-hidden">
      <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left" onclick="toggleAcc('portfolio-bijlagen')">
        <div class="flex items-center gap-3"><span class="text-lg">📎</span><div>
          <div class="font-bold text-sm">Bijlagen & links</div>
          <div class="text-xs text-gray-500">Algemene links en bestanden/verslagen die bij je portfolio horen</div>
        </div></div>
        <span id="acc-ic-portfolio-bijlagen" class="text-gray-400 text-xs">▼</span>
      </button>
      <div id="acc-body-portfolio-bijlagen" class="hidden border-t border-gray-100 p-4 space-y-3">
        <div class="flex gap-2 flex-wrap">
          <select id="att-type" class="inp text-sm" style="max-width:120px" onchange="toggleAttFields(this.value)">
            <option value="link">Link</option>
            <option value="doc">Verslag/bestand</option>
          </select>
          <input id="att-title" class="inp text-sm" style="max-width:220px" placeholder="Naam (bijv. LinkedIn profiel, Eindverslag)">
          <input id="att-url" class="inp text-sm flex-1" placeholder="https://...">
          <input id="att-body" class="inp text-sm flex-1 hidden" placeholder="Korte omschrijving / samenvatting...">
          <button class="btn bp text-sm flex-shrink-0" onclick="addAttachment()">➕ Toevoegen</button>
        </div>
        ${(S.attachments||[]).length?`<div class="space-y-1.5 mt-2">
          ${S.attachments.map((a,i)=>{
            const aic=a.type==='doc'?'📄':'🔗';
            return `<div class="flex items-start gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
            <span class="text-sm flex-shrink-0 mt-0.5">${aic}</span>
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-xs">${esc(a.title)}</div>
              ${a.url?`<a href="${esc(a.url)}" target="_blank" rel="noopener" class="text-xs text-indigo-600 hover:underline mt-0.5 block truncate">${esc(a.url)}</a>`:''}
              ${a.body?`<div class="text-xs text-gray-500 mt-0.5">${esc(a.body.slice(0,120))}${a.body.length>120?'...':''}</div>`:''}
            </div>
            <button onclick="removeAttachment(${i})" class="text-gray-300 hover:text-red-400 font-bold text-sm flex-shrink-0">✕</button>
          </div>`;}).join('')}
        </div>`:'<div class="text-sm text-gray-400 py-1">Nog geen bijlagen of links toegevoegd</div>'}
      </div>
    </div>

    <!-- Groei analyseren accordion -->
    <div class="card overflow-hidden">
      <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left" onclick="toggleAcc('portfolio-analyse')">
        <div class="flex items-center gap-3"><span class="text-lg">🔬</span><div>
          <div class="font-bold text-sm">Groei analyseren</div>
          <div class="text-xs text-gray-500">Stap 1: kopieer de analyse-prompt → Stap 2: plak AI-antwoord terug</div>
        </div></div>
        <span id="acc-ic-portfolio-analyse" class="text-gray-400 text-xs">▼</span>
      </button>
      <div id="acc-body-portfolio-analyse" class="hidden border-t border-gray-100 p-4 space-y-4">

        <!-- Stap 1: Analyse-prompt genereren -->
        <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4 space-y-3">
          <div class="font-semibold text-sm text-indigo-800">📋 Stap 1 — Genereer de analyse-prompt</div>
          <div class="text-xs text-indigo-700">De app maakt een kant-en-klare prompt met al jouw leerdoelen erin. Kopieer die prompt, voeg jouw werk toe en stuur het naar ChatGPT of Claude.</div>
          <div class="space-y-2">
            <label class="lbl">Voeg je werk toe aan de prompt (optioneel):</label>
            <div class="flex flex-wrap gap-1.5 mb-1">
              ${S.tasks.filter(t=>!t.archived).slice(0,8).map(t=>`<button onclick="addWorkToPrompt('work-context','${t.id}')" class="text-xs bg-white border border-indigo-200 text-indigo-600 px-2 py-1 rounded hover:bg-indigo-100">${(t.name||t.input?.goal||'Opdracht').slice(0,28)}</button>`).join('')||'<span class="text-xs text-gray-400">Maak eerst opdrachten aan in de app</span>'}
            </div>
            <textarea id="work-context" class="inp text-sm w-full" rows="3"
              placeholder="Of typ/plak hier een korte beschrijving van je werk of project..."></textarea>
          </div>
          <button class="btn bp text-sm w-full" onclick="generateAnalysePrompt()">📋 Genereer & kopieer analyse-prompt</button>
          <div id="analyse-prompt-out" class="hidden space-y-2">
            <label class="lbl text-indigo-700">✅ Prompt gegenereerd — kopieer naar ChatGPT/Claude:</label>
            <textarea id="analyse-prompt-txt" class="inp text-xs w-full" rows="8" style="font-family:monospace;background:#f8f7ff" readonly></textarea>
            <div class="flex gap-2">
              ${SITES.map(s=>`<button onclick="sendAnalyseToAI('${s.id}')" class="btn text-white text-xs py-1.5 px-3 rounded-lg font-bold" style="background:${s.c}">${s.l}</button>`).join('')}
            </div>
          </div>
        </div>

        <!-- Stap 2: Antwoord plakken -->
        <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-3">
          <div class="font-semibold text-sm text-emerald-800">✅ Stap 2 — Plak het AI-antwoord hier</div>
          <div class="text-xs text-emerald-700">Kopieer het antwoord van ChatGPT/Claude en plak het hieronder. De app leest de voorgestelde niveauwijzigingen automatisch uit.</div>
          <textarea id="analysis-dump" class="inp text-sm w-full" rows="7"
            placeholder="Plak hier het antwoord van de AI...&#10;&#10;De AI gebruikt het exacte formaat dat jij hebt meegegeven, zodat de app het correct kan uitlezen."></textarea>
          <div class="flex gap-2">
            <button class="btn bg text-sm" onclick="processAnalysisDump()">🔬 Verwerk antwoord</button>
            <button class="btn bs text-sm" onclick="document.getElementById('analysis-dump').value=''">Wis</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Radar/Spiderweb chart + Groeiverloop -->
    ${goals.length>=2?(()=>{const growthChart=buildGrowthChart(goals,560,240);return `<div class="card overflow-hidden">
      <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left" onclick="toggleAcc('radar-chart')">
        <div class="flex items-center gap-3"><span class="text-lg">🕸️</span><div>
          <div class="font-bold text-sm">Vaardigheidsradar &amp; groeiverloop</div>
          <div class="text-xs text-gray-500">Visueel overzicht van je niveaus${growthChart?' en je ontwikkeling over tijd':''}</div>
        </div></div>
        <span id="acc-ic-radar-chart" class="text-gray-400 text-xs">▼</span>
      </button>
      <div id="acc-body-radar-chart" class="hidden border-t border-gray-100 p-5">
        <div class="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2 text-center">Vaardigheidsradar</div>
        <div class="max-w-xs mx-auto">
          ${buildRadarChart(goals)}
        </div>
        ${goals.length>10?`<div class="text-xs text-gray-400 text-center mt-2">Toont de eerste 10 van ${goals.length} doelen</div>`:''}
        <div class="mt-4 flex flex-wrap gap-2 justify-center">
          ${goals.slice(0,10).map(g=>`<div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full flex-shrink-0" style="background:${lvlColor(g.level||1)}"></span><span class="text-xs text-gray-600">${esc(g.name.slice(0,20))}: <strong>${g.level||1}</strong></span></div>`).join('')}
        </div>
        ${growthChart?`<div class="mt-6 pt-5 border-t border-gray-100">
          <div class="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2 text-center">Groeiverloop per leerdoel</div>
          ${growthChart}
        </div>`:`<div class="mt-6 pt-5 border-t border-gray-100 text-xs text-gray-400 text-center">Pas je niveaus aan (met reden) om hier je groeiverloop over tijd te zien.</div>`}
      </div>
    </div>`;})():''}

    <!-- Filter -->
    ${goals.length>3?`<div class="flex flex-wrap gap-2 items-center">
      <span class="text-xs text-gray-500 font-semibold">Filter:</span>
      <button onclick="S._goalCat='';nav('portfolio')" class="text-xs px-3 py-1 rounded-full border" style="${!catFilter?`background:var(--p);color:var(--icon-txt,#fff);border-color:var(--p)`:`background:var(--card);color:var(--txt2);border-color:var(--card-border)`}">Alle</button>
      ${GOAL_CATS.filter(c=>goals.some(g=>g.category===c)).map(c=>`<button onclick="S._goalCat='${c}';nav('portfolio')" class="text-xs px-3 py-1 rounded-full border" style="${catFilter===c?`background:var(--p);color:var(--icon-txt,#fff);border-color:var(--p)`:`background:var(--card);color:var(--txt2);border-color:var(--card-border)`}">${c}</button>`).join('')}
    </div>`:''}

    <!-- Doelen grid -->
    ${shown.length?`<div class="grid grid-cols-2 gap-4">${cards}</div>`
    :`<div class="card p-12 text-center text-gray-400">
        <div class="text-5xl mb-3">🎯</div>
        <div class="font-semibold text-lg mb-1">Nog geen leerdoelen</div>
        <div class="text-sm mb-4">Klik op "Nieuw doel" en kies uit de lijst of maak een eigen doel</div>
        <button class="btn bp" onclick="_pgPickerOpen=true;render()">➕ Eerste doel toevoegen</button>
      </div>`}
  </div>`;
}

function pgPickerResultsHTML(){
  return PRESET_GOALS
    .filter(pg=>!_pgPickerCat||pg.cat===_pgPickerCat)
    .flatMap(pg=>pg.goals.map(gl=>({gl,cat:pg.cat})))
    .filter(({gl})=>!_pgPickerSearch||gl.toLowerCase().includes(_pgPickerSearch.toLowerCase()))
    .filter(({gl})=>!wsGoals().some(g=>g.name.toLowerCase()===gl.toLowerCase()))
    .map(({gl,cat})=>`<button onclick="quickAddGoal('${gl.replace(/'/g,"\\'")}','${cat}')"
      class="text-sm border border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors">${gl}</button>`)
    .join('')||'<span class="text-sm text-gray-400">Geen resultaten gevonden</span>';
}
function pgSearchInput(val){
  _pgPickerSearch=val;
  const el=document.getElementById('picker-results');
  if(el)el.innerHTML=pgPickerResultsHTML();
}
function quickAddGoal(name,cat){
  openStartLevel(name,cat);
  return;
}
function addCustomGoal(){
  const name=document.getElementById('custom-goal-name')?.value?.trim();
  const cat=document.getElementById('custom-goal-cat')?.value||'Overig';
  if(!name){toast('⚠️ Vul een naam in');return;}
  openStartLevel(name,cat);
}

/* ── Alle groei wissen ── */
function toggleAttFields(type){
  const urlEl=document.getElementById('att-url');
  const bodyEl=document.getElementById('att-body');
  if(!urlEl||!bodyEl)return;
  if(type==='doc'){urlEl.classList.add('hidden');bodyEl.classList.remove('hidden');}
  else{urlEl.classList.remove('hidden');bodyEl.classList.add('hidden');}
}
function addAttachment(){
  const type=document.getElementById('att-type')?.value||'link';
  const title=document.getElementById('att-title')?.value?.trim();
  const url=document.getElementById('att-url')?.value?.trim();
  const body=document.getElementById('att-body')?.value?.trim();
  if(type==='link'&&!url){toast('⚠️ Vul een link (URL) in');return;}
  if(!title&&!url&&!body){toast('⚠️ Vul minimaal een naam of link in');return;}
  S.attachments=S.attachments||[];
  S.attachments.push({id:mkId(),type,title:title||(type==='doc'?'Verslag':'Link'),url:url||'',body:body||'',date:new Date().toISOString().slice(0,10)});
  saveAttachments();
  document.getElementById('att-title').value='';
  document.getElementById('att-url').value='';
  document.getElementById('att-body').value='';
  render();toast('📎 Toegevoegd!');
}
function removeAttachment(i){
  S.attachments.splice(i,1);saveAttachments();render();
}
function clearAllGrowth(){
  if(!wsGoals().some(g=>(g.history||[]).length)){toast('ℹ️ Er is nog geen groeigeschiedenis om te wissen');return;}
  orbitConfirm('Weet je zeker dat je ALLE groeigeschiedenis in deze werkruimte wilt wissen? Elk leerdoel wordt teruggezet naar het startniveau (of 1 als er geen geschiedenis is). Dit kan niet ongedaan worden gemaakt.',()=>{
    wsGoals().forEach(g=>{
      const hist=g.history||[];
      g.level=hist.length?hist[0].oldLevel:1;
      g.history=[];
    });
    saveGoals();render();toast('🗑️ Alle groeigeschiedenis gewist');
  },null,'Alle groei wissen');
}

/* ── PDF kleurkeuze (export-modal) ── */
function renderPdfColorPicker(){
  const el=document.getElementById('pdf-color-picker');if(!el)return;
  el.innerHTML=PORTFOLIO_COLORS.map(c=>`<button data-cid="${c.id}" onclick="setPdfColor('${c.id}')"
    class="pdf-pc-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 text-xs font-semibold transition-all"
    style="background:${c.hex}20;color:${c.hex};border-color:${_pdfColor===c.id?c.hex:'#e5e7eb'};${_pdfColor===c.id?'outline:2px solid '+c.hex:''}">
    <span class="w-3 h-3 rounded-full flex-shrink-0" style="background:${c.hex}"></span>${c.l}
  </button>`).join('');
}
function setPdfColor(id){
  _pdfColor=id;localStorage.setItem('pb_pdf_color',id);
  document.querySelectorAll('.pdf-pc-btn').forEach(el=>{
    const cid=el.dataset.cid;
    const c=PORTFOLIO_COLORS.find(x=>x.id===cid);if(!c)return;
    if(cid===id){el.style.borderColor=c.hex;el.style.outline='2px solid '+c.hex;}
    else{el.style.borderColor='#e5e7eb';el.style.outline='';}
  });
}

/* ══════════════════════════════════════════════════════════
   MODALS: Handmatig niveau instellen + Startniveau bij aanmaken
   ══════════════════════════════════════════════════════════ */
let _manualLevelGid=null,_pendingGoalName=null,_pendingGoalCat=null;

function openManualLevel(gid){
  _manualLevelGid=gid;
  const g=S.goals.find(x=>x.id===gid);if(!g)return;
  const lc=lvlColor(g.level||1);
  document.getElementById('ml-slider').value=g.level||1;
  document.getElementById('ml-val').textContent=(g.level||1)+' / 100';
  document.getElementById('ml-val').style.color=lc;
  document.getElementById('ml-slider').style.accentColor=lc;
  document.getElementById('ml-reason').value='';
  document.getElementById('ml-date').value=new Date().toISOString().slice(0,10);
  document.getElementById('manual-modal').classList.remove('hidden');
}
function mlSliderInput(v){
  const lc=lvlColor(+v);
  document.getElementById('ml-val').textContent=v+' / 100';
  document.getElementById('ml-val').style.color=lc;
  document.getElementById('ml-slider').style.accentColor=lc;
}
function saveManualLevel(){
  const g=S.goals.find(x=>x.id===_manualLevelGid);if(!g)return;
  const val=+document.getElementById('ml-slider').value;
  const reason=document.getElementById('ml-reason').value.trim()||'Handmatig bijgewerkt';
  const date=document.getElementById('ml-date').value||new Date().toISOString().slice(0,10);
  const old=g.level||1;
  g.level=val;
  g.history=g.history||[];
  g.history.push({date,oldLevel:old,newLevel:val,delta:val-old,reason});
  g.history.sort((a,b)=>a.date<b.date?-1:a.date>b.date?1:0);
  saveGoals();
  document.getElementById('manual-modal').classList.add('hidden');
  S.gid=_manualLevelGid;render();toast('✅ Niveau bijgewerkt naar '+val+'!');
}

function openStartLevel(name,cat){
  _pendingGoalName=name;_pendingGoalCat=cat;
  document.getElementById('sl-slider').value=1;
  document.getElementById('sl-val').textContent='1 / 100';
  document.getElementById('sl-val').style.color='#dc2626';
  document.getElementById('sl-slider').style.accentColor='#dc2626';
  document.getElementById('sl-goal-name').textContent=name;
  document.getElementById('start-level-modal').classList.remove('hidden');
}
function slSliderInput(v){
  const lc=lvlColor(+v);
  document.getElementById('sl-val').textContent=v+' / 100';
  document.getElementById('sl-val').style.color=lc;
  document.getElementById('sl-slider').style.accentColor=lc;
  document.getElementById('sl-label').textContent=lvlLabel(+v);
  document.getElementById('sl-label').style.color=lc;
}
function confirmStartLevel(){
  const level=+document.getElementById('sl-slider').value;
  const g=mkGoal(_pendingGoalName,_pendingGoalCat);
  g.level=level;saveGoals();
  document.getElementById('start-level-modal').classList.add('hidden');
  _pgPickerOpen=false;S.gid=g.id;nav('goal-detail');
  toast('🎯 "'+_pendingGoalName+'" toegevoegd op niveau '+level+'!');
}
