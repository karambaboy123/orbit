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

const PORTFOLIO_STYLES=[
  {id:'linkedin',    l:'LinkedIn profiel',      desc:'Sterk profiel met skills en resultaten'},
  {id:'cv',          l:'Professioneel CV',      desc:'Klassiek CV met competenties en projecten'},
  {id:'creatief',    l:'Creatief portfolio',    desc:'Verhalend en persoonlijk, voor creatieven'},
  {id:'pitch',       l:'Elevator pitch',        desc:'Korte krachtige samenvatting'},
  {id:'academisch',  l:'Academisch verslag',    desc:'Formeel, met leerdoelen en onderbouwing'},
  {id:'stage',       l:'Stageverslag',          desc:'Reflectief, gericht op leeruitkomsten'},
  {id:'competentie', l:'Competentieprofiel',    desc:'Per competentie uitgewerkt met bewijzen'},
  {id:'sollicitatie',l:'Sollicitatiebrief',     desc:'Overtuigend, gericht op één functie'},
  {id:'leerportfolio',l:'Leerportfolio',        desc:'Groei en leertraject per vaardigheid'},
  {id:'reflectie',   l:'Reflectieverslag',      desc:'Diepgaande zelfreflectie op leerproces'},
  {id:'bewijs',      l:'Bewijsdossier',         desc:'Concrete bewijzen per competentie'},
  {id:'persoonlijk', l:'Persoonlijk verslag',   desc:'Informeel, authentiek en verhaalvorm'},
  {id:'presentatie', l:'Presentatiescript',     desc:'Script voor een korte persoonlijke pitch'},
  {id:'hbo',         l:'HBO Reflectieverslag',  desc:'Specifiek voor HBO-studenten, STAR-methode'},
  {id:'blog',        l:'Blog / artikel',        desc:'Toegankelijk en enthousiasmerend voor lezers'},
  {id:'mentor',      l:'Voor een mentor/coach', desc:'Eerlijk, gericht op groei en feedback'},
];
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
    milestones:[],notes:'',history:[],
    linkedTasks:[],   // array van task-ids
    werkItems:[],     // [{id,title,body,date}] — eigen werk-beschrijvingen
    createdAt:new Date().toISOString()};
  S.goals.unshift(g);saveGoals();return g;
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

/* ── Portfolio state ── */
let _pgPickerCat='',_pgPickerSearch='',_pgPickerOpen=false;
let _analysisProposals=[];
let _newGoalProposals=[];
let _portfolioStyle='linkedin';
let _portfolioColor='indigo';
let _portfolioCustomPrompt='';
let _portfolioSections={goals:true,projects:true,milestones:true,reflection:true,radar:false};
let _pdfColor=localStorage.getItem('pb_pdf_color')||'indigo';

function vPortfolio(){
  const catFilter=S._goalCat||'';
  const shown=catFilter?S.goals.filter(g=>g.category===catFilter):S.goals;
  const avgLevel=S.goals.length?Math.round(S.goals.reduce((a,g)=>a+(g.level||1),0)/S.goals.length):0;

  const cards=shown.map(g=>{
    const lc=lvlColor(g.level||1);
    const done=g.milestones.filter(x=>x.done).length,tot=g.milestones.length;
    const msPct=tot?Math.round(done/tot*100):0;
    const lastH=g.history&&g.history.length?g.history[g.history.length-1]:null;
    return `<div class="card p-4 hover:shadow-md transition-shadow cursor-pointer group" onclick="S.gid='${g.id}';nav('goal-detail')">
      <div class="flex items-start justify-between gap-2 mb-3">
        <div class="flex-1 min-w-0">
          <div class="font-bold text-sm truncate">${g.name}</div>
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
        <div class="font-semibold text-sm">${p.goalName}</div>
        <div class="text-xs text-gray-500 mt-0.5">${p.reason}</div>
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
        <div class="font-semibold text-sm">${p.name}</div>
        <div class="text-xs text-gray-500 mt-0.5">${p.reason}</div>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">${p.category}</span>
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
      <div class="flex gap-2 flex-wrap">
        <button class="btn bs text-sm" onclick="toggleAcc('portfolio-discover')">🧭 Nieuwe doelen ontdekken</button>
        <button class="btn bs text-sm" onclick="toggleAcc('portfolio-analyse')">🔬 Groei analyseren</button>
        <button class="btn bs text-sm" onclick="toggleAcc('portfolio-bijlagen')">📎 Bijlagen & links</button>
        <button class="btn bs text-sm" onclick="toggleAcc('portfolio-maker')">📄 Portfolio maken</button>
        <button class="btn bs text-sm" onclick="exportPortfolioPDF()">📄 PDF exporteren</button>
        <button class="btn bs text-sm" style="color:#ef4444" onclick="clearAllGrowth()">🗑️ Alle groei wissen</button>
        <button class="btn bp text-sm" onclick="_pgPickerOpen=!_pgPickerOpen;render()">➕ Nieuw doel</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-3">
${(()=>{
        const experts=S.goals.filter(g=>g.level>=80).length;
        const growth=S.goals.reduce((a,g)=>a+(g.history||[]).filter(h=>h.delta>0).length,0);
        const avgClr=avgLevel>=80?'#10b981':avgLevel>=50?'#f59e0b':avgLevel>=25?'#f97316':'#ef4444';
        const expertClr=experts===0?'#6b7280':experts>=3?'#a855f7':experts>=1?'#10b981':'#10b981';
        const expertLabel=experts===0?'🏆 Expert (80+)':experts>=5?'🔥 Expert (80+)':'⭐ Expert (80+)';
        return`
        <div class="card p-3 text-center"><div class="text-2xl font-bold" style="color:var(--p)">${S.goals.length}</div><div class="text-xs text-gray-400">Doelen</div></div>
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
              <div class="font-semibold text-xs">${a.title}</div>
              ${a.url?`<a href="${a.url.replace(/"/g,'&quot;')}" target="_blank" rel="noopener" class="text-xs text-indigo-600 hover:underline mt-0.5 block truncate">${a.url}</a>`:''}
              ${a.body?`<div class="text-xs text-gray-500 mt-0.5">${a.body.slice(0,120)}${a.body.length>120?'...':''}</div>`:''}
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

    <!-- Portfolio maker accordion -->
    <div class="card overflow-hidden">
      <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left" onclick="toggleAcc('portfolio-maker')">
        <div class="flex items-center gap-3"><span class="text-lg">📄</span><div>
          <div class="font-bold text-sm">Portfolio maken</div>
          <div class="text-xs text-gray-500">Kies stijl, kleur & inhoud → genereer prompt → stuur naar AI</div>
        </div></div>
        <span id="acc-ic-portfolio-maker" class="text-gray-400 text-xs">▼</span>
      </button>
      <div id="acc-body-portfolio-maker" class="hidden border-t border-gray-100 p-5 space-y-5">

        <!-- Stijl -->
        <div>
          <label class="lbl">📐 Stijl</label>
          <div class="grid grid-cols-4 gap-2 mt-1">
            ${PORTFOLIO_STYLES.map(s=>`<div data-sid="${s.id}" onclick="setPortfolioStyle('${s.id}')"
              class="ps-card border-2 rounded-lg p-2 cursor-pointer transition-all text-center hover:border-indigo-300 ${_portfolioStyle===s.id?'border-indigo-500 bg-indigo-50':'border-gray-200'}">
              <div class="font-semibold text-xs">${s.l}</div>
              <div class="text-xs text-gray-400 mt-0.5 leading-tight">${s.desc}</div>
            </div>`).join('')}
          </div>
        </div>

        <!-- Kleur -->
        <div>
          <label class="lbl">🎨 Kleurschema voor het portfolio</label>
          <div class="flex flex-wrap gap-2 mt-1">
            ${PORTFOLIO_COLORS.map(c=>`<button data-cid="${c.id}" onclick="setPortfolioColor('${c.id}')"
              class="pc-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 text-xs font-semibold transition-all"
              style="background:${c.hex}20;color:${c.hex};border-color:${_portfolioColor===c.id?c.hex:'#e5e7eb'};${_portfolioColor===c.id?'outline:2px solid '+c.hex:''}">
              <span class="w-3 h-3 rounded-full flex-shrink-0" style="background:${c.hex}"></span>${c.l}
            </button>`).join('')}
          </div>
        </div>

        <!-- Inhoud -->
        <div>
          <label class="lbl">📦 Wat moet erin?</label>
          <div class="flex flex-wrap gap-4 mt-1">
            ${[['goals','🎯 Leerdoelen & niveaus'],['projects','📋 Gemaakte projecten'],['milestones','🏁 Behaalde mijlpalen'],['reflection','💭 Reflectie per doel'],['radar','🕸️ Spiderweb/radar beschrijving']].map(([k,l])=>`<label class="flex items-center gap-2 cursor-pointer text-sm">
              <input type="checkbox" ${_portfolioSections[k]?'checked':''} onchange="_portfolioSections['${k}']=this.checked" style="accent-color:#4f46e5">
              ${l}</label>`).join('')}
          </div>
        </div>

        <!-- Eigen prompt toevoegen -->
        <div>
          <label class="lbl">✏️ Extra instructies / eigen prompt (optioneel)</label>
          <textarea class="inp text-sm w-full" rows="3"
            placeholder="Bijv: schrijf het in de jij-vorm, voeg concrete voorbeelden toe, maak het max 500 woorden, focus op stage-geschiktheid..."
            oninput="_portfolioCustomPrompt=this.value">${_portfolioCustomPrompt||''}</textarea>
          <div class="text-xs text-gray-400 mt-1">💡 In Instellingen kun je standaard portfolio-prompts opslaan die je altijd kunt terugladen</div>
        </div>

        <button class="btn bp text-sm" onclick="generatePortfolioPrompt()">⚡ Genereer portfolio-prompt</button>

        <div id="portfolio-prompt-out" class="hidden space-y-3">
          <div class="flex items-center justify-between">
            <label class="lbl mb-0">📄 Portfolio-prompt — kopieer naar jouw AI</label>
            <button onclick="document.getElementById('portfolio-prompt-txt').select();document.execCommand('copy');toast('✅ Gekopieerd!')" class="btn bs text-xs">📋 Alles kopiëren</button>
          </div>
          <textarea id="portfolio-prompt-txt" class="inp text-sm w-full" rows="12" style="font-family:monospace"></textarea>
          <div class="flex gap-2 flex-wrap">
            ${SITES.map(s=>`<button onclick="sendPortfolioToAI('${s.id}')" class="btn text-white text-xs py-2 px-3 rounded-lg font-bold hover:opacity-90" style="background:${s.c}">${s.l} 🚀</button>`).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Radar/Spiderweb chart -->
    ${S.goals.length>=2?`<div class="card overflow-hidden">
      <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left" onclick="toggleAcc('radar-chart')">
        <div class="flex items-center gap-3"><span class="text-lg">🕸️</span><div>
          <div class="font-bold text-sm">Vaardigheidsradar</div>
          <div class="text-xs text-gray-500">Spiderweb — visueel overzicht van al je niveaus</div>
        </div></div>
        <span id="acc-ic-radar-chart" class="text-gray-400 text-xs">▼</span>
      </button>
      <div id="acc-body-radar-chart" class="hidden border-t border-gray-100 p-5">
        <div class="max-w-xs mx-auto">
          ${buildRadarChart(S.goals)}
        </div>
        ${S.goals.length>10?`<div class="text-xs text-gray-400 text-center mt-2">Toont de eerste 10 van ${S.goals.length} doelen</div>`:''}
        <div class="mt-4 flex flex-wrap gap-2 justify-center">
          ${S.goals.slice(0,10).map(g=>`<div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full flex-shrink-0" style="background:${lvlColor(g.level||1)}"></span><span class="text-xs text-gray-600">${g.name.slice(0,20)}: <strong>${g.level||1}</strong></span></div>`).join('')}
        </div>
      </div>
    </div>`:''}

    <!-- Filter -->
    ${S.goals.length>3?`<div class="flex flex-wrap gap-2 items-center">
      <span class="text-xs text-gray-500 font-semibold">Filter:</span>
      <button onclick="S._goalCat='';nav('portfolio')" class="text-xs px-3 py-1 rounded-full border" style="${!catFilter?`background:var(--p);color:var(--icon-txt,#fff);border-color:var(--p)`:`background:var(--card);color:var(--txt2);border-color:var(--card-border)`}">Alle</button>
      ${GOAL_CATS.filter(c=>S.goals.some(g=>g.category===c)).map(c=>`<button onclick="S._goalCat='${c}';nav('portfolio')" class="text-xs px-3 py-1 rounded-full border" style="${catFilter===c?`background:var(--p);color:var(--icon-txt,#fff);border-color:var(--p)`:`background:var(--card);color:var(--txt2);border-color:var(--card-border)`}">${c}</button>`).join('')}
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
    .filter(({gl})=>!S.goals.some(g=>g.name.toLowerCase()===gl.toLowerCase()))
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

/* ── Analyse dump verwerking ── */
/* ── Analyse-prompt genereren (Stap 1) ── */
function addWorkToPrompt(targetId,tid){
  const t=S.tasks.find(x=>x.id===tid);if(!t)return;
  const ctx=document.getElementById(targetId);
  if(!ctx)return;
  const extra=t.analysis||t.input?.goal||'';
  ctx.value=(ctx.value?ctx.value+'\n\n---\n\n':'')+`Opdracht: ${t.name||t.input?.goal||'Opdracht'}\n${extra.slice(0,800)}`;
  toast('✅ Werk toegevoegd aan context');
}

function generateAnalysePrompt(){
  if(!S.goals.length){toast('⚠️ Voeg eerst leerdoelen toe');return;}
  const work=document.getElementById('work-context')?.value?.trim()||'';
  const goalLines=S.goals.map(g=>`LEERDOEL: ${g.name}\nHuidig niveau: ${g.level||1}/100`).join('\n\n');

  const customTpl=localStorage.getItem('pb_analyse_prompt_tpl')||'';

  const prompt=customTpl||`Jij bent een kritische maar behulpzame leercoach die mijn voortgang op mijn leerdoelen beoordeelt aan de hand van mijn opgeleverde werk/verslagen.

Werk in TWEE stappen:

STAP 1 — VRAGEN STELLEN (verplicht, doe dit eerst):
Voordat je een score geeft, wil ik dat je eerst kritisch bent. Ga per leerdoel hieronder na of het opgeleverde werk genoeg bewijs geeft om een eerlijke inschatting te maken. Stel mij een checklist met kritische vragen (gerust 10-20 vragen) over:
- Wat ik precies gedaan heb voor elk leerdoel en welk bewijs daarvoor in mijn werk te vinden is
- Welke keuzes ik heb gemaakt en waarom
- Wat er moeilijk was, wat er fout ging en hoe ik dat heb opgelost
- Wat ik ervan geleerd heb en wat ik de volgende keer anders zou doen
- Voor leerdoelen waar je in het werk weinig of geen bewijs van groei ziet: vraag daar expliciet naar

Wacht NIET op antwoord — stel de vragen, maar geef ook alvast een voorlopige inschatting. Geef daarna duidelijk aan: "Beantwoord deze vragen zo concreet mogelijk en stuur ze terug, dan geef ik een definitieve, scherpere beoordeling."

STAP 2 — DEFINITIEVE BEOORDELING (pas geven nadat ik de vragen beantwoord heb, of als voorlopige inschatting als ik dat aangeef):
Geef voor ELK leerdoel hieronder aan hoeveel ik gegroeid ben, gebaseerd op concreet bewijs uit mijn werk en mijn antwoorden. Beoordeel volgens een STRENG HBO-niveau (hoger beroepsonderwijs) — vergelijkbaar met een toetsende docent die een portfolio nakijkt. Ken alleen groei toe als er echt bewijs voor is, en wees streng: een hoge score moet verdiend zijn.

HANTEER DEZE HBO-BEOORDELINGSCRITERIA om de DELTA (groei in punten) per leerdoel te bepalen:
- 0 punten — Geen aantoonbaar bewijs van groei, of het werk is puur beschrijvend zonder reflectie of eigen inbreng.
- 1-3 punten — Beginnend niveau: er is werk geleverd, maar het blijft oppervlakkig, weinig onderbouwd of nauwelijks gekoppeld aan het leerdoel. Reflectie ontbreekt of is zeer beperkt.
- 4-7 punten — Basisniveau: het werk toont begrip en correcte toepassing van basisvaardigheden/kennis, met enige reflectie op eigen handelen, maar mist diepgang, kritische analyse of onderbouwde keuzes.
- 8-12 punten — Gevorderd niveau: het werk toont zelfstandige, onderbouwde toepassing met duidelijke keuzes en argumentatie, kritische reflectie op het eigen leerproces (wat ging goed/fout, waarom, en wat zou je anders doen), en concrete koppeling tussen werk en leerdoel.
- 13-18 punten — HBO-eindniveau: het werk toont een complexe, zelfstandige aanpak met expliciete afweging van alternatieven, diepgaande kritische reflectie, transfer naar andere situaties/contexten, en aantoonbare ontwikkeling ten opzichte van eerdere niveaus.
- 19-25 punten — Uitzonderlijk: alleen toekennen bij overtuigend bewijs van een sprong in zelfstandigheid, kwaliteit én reflectie, met expliciete onderbouwing waarom dit een grote groei rechtvaardigt. Dit is uitzondering, geen regel.

Belangrijke richtlijnen bij het toepassen van deze criteria:
- Ken NOOIT meer dan 25 punten per keer toe, ook niet bij uitzonderlijk werk.
- Bij twijfel tussen twee niveaus: kies ALTIJD het lagere niveau (streng beoordelen).
- Een DELTA kan ook negatief zijn (bijv. als blijkt dat een eerder toegekend niveau niet houdbaar is op basis van het werk) of 0 (geen aantoonbare groei).
- Onderbouw in REDEN expliciet op welk criterium-niveau (uit de lijst hierboven) je de score baseert en waarom, met verwijzing naar concreet bewijs uit het werk.

BELANGRIJK — gebruik EXACT dit formaat voor elk leerdoel dat veranderd is (kopieer de namen exact):
===
LEERDOEL: [exact de naam van het leerdoel]
DELTA: [getal, bijv. +10 of -5 of 0]
REDEN: [1-2 zinnen waarom, in het Nederlands, met verwijzing naar concreet bewijs]
===

MIJN LEERDOELEN:
${goalLines}

${work?`MIJN WERK / OPDRACHT / VERSLAG:\n${work}`:'[VOEG HIER JE WERK, OPDRACHT, VERSLAG OF BESCHRIJVING TOE]'}

Begin met STAP 1 (kritische vragen + voorlopige inschatting). Gebruik 0 als er geen verandering is. Wees eerlijk, kritisch en specifiek.`;

  const out=document.getElementById('analyse-prompt-out');
  const ta=document.getElementById('analyse-prompt-txt');
  if(ta)ta.value=prompt;
  if(out)out.classList.remove('hidden');
  navigator.clipboard?.writeText(prompt).then(()=>toast('✅ Analyse-prompt gekopieerd!')).catch(()=>fbCopy(prompt,'Analyse-prompt gekopieerd!'));
}

function sendAnalyseToAI(siteId){
  const s=SITES.find(x=>x.id===siteId);if(!s)return;
  const txt=document.getElementById('analyse-prompt-txt')?.value||'';
  window.open(s.url,'_blank','noopener');
  navigator.clipboard?.writeText(txt).catch(()=>fbCopy(txt,''));
  toast('✅ '+s.l+' geopend & prompt gekopieerd!',3000);
}

/* ── Nieuwe doelen ontdekken: prompt genereren (Stap 1) ── */
function generateNewGoalsPrompt(){
  const work=document.getElementById('ng-work-context')?.value?.trim()||'';
  const existing=S.goals.length?S.goals.map(g=>`- ${g.name} (${g.category})`).join('\n'):'(nog geen leerdoelen)';
  const catList=GOAL_CATS.join(', ');

  const customTpl=localStorage.getItem('pb_new_goals_prompt_tpl')||'';

  const prompt=customTpl||`Jij bent een loopbaan- en leercoach die mij helpt nieuwe, passende leerdoelen te ontdekken.

Werk in TWEE stappen:

STAP 1 — VRAGEN STELLEN (verplicht, doe dit eerst):
Stel mij ongeveer 20 gerichte vragen om mijn werk, ervaring, interesses, ambities en ontwikkelpunten goed in kaart te brengen. Denk aan vragen over:
- Wat voor werk/opdrachten/projecten ik recent heb gedaan (zie context hieronder)
- Welke taken ik leuk vind en welke niet, en waarom
- Waar ik moeite mee heb of onzeker over ben
- Welke richting/branche/functie ik op termijn ambieer
- Welke vaardigheden collega's of docenten bij mij herkennen
- Wat ik in de afgelopen periode geleerd heb en wat ik daarna zou willen leren
- Hoe ik het liefst leer (zelfstandig, met begeleiding, praktijk vs theorie)

Wacht NIET op antwoord — stel direct de ~20 vragen genummerd onder elkaar.

STAP 2 — LEERDOELEN VOORSTELLEN (pas geven nadat ik de vragen beantwoord heb):
Stel op basis van mijn antwoorden en de context 4 tot 8 nieuwe, concrete leerdoelen voor die nog NIET in onderstaande lijst staan. Kies voor elk leerdoel een passende categorie uit deze lijst: ${catList}. Schat ook een realistisch startniveau in (1-100) op basis van wat ik al kan.

BELANGRIJK — gebruik EXACT dit formaat voor elk voorgesteld leerdoel:
===
NIEUW LEERDOEL: [naam van het leerdoel]
CATEGORIE: [exact een categorie uit de lijst hierboven]
STARTNIVEAU: [getal 1-100]
REDEN: [1-2 zinnen waarom dit een passend leerdoel voor mij is]
===

MIJN HUIDIGE LEERDOELEN (stel deze niet opnieuw voor):
${existing}

${work?`MIJN WERK / CONTEXT:\n${work}`:'[VOEG HIER JE WERK, OPDRACHT OF BESCHRIJVING TOE]'}

Begin met STAP 1 (de ~20 vragen).`;

  const out=document.getElementById('new-goals-prompt-out');
  const ta=document.getElementById('new-goals-prompt-txt');
  if(ta)ta.value=prompt;
  if(out)out.classList.remove('hidden');
  navigator.clipboard?.writeText(prompt).then(()=>toast('✅ Ontdek-prompt gekopieerd!')).catch(()=>fbCopy(prompt,'Ontdek-prompt gekopieerd!'));
}
function sendNewGoalsToAI(siteId){
  const s=SITES.find(x=>x.id===siteId);if(!s)return;
  const txt=document.getElementById('new-goals-prompt-txt')?.value||'';
  window.open(s.url,'_blank','noopener');
  navigator.clipboard?.writeText(txt).catch(()=>fbCopy(txt,''));
  toast('✅ '+s.l+' geopend & prompt gekopieerd!',3000);
}

/* ── Nieuwe doelen ontdekken: antwoord verwerken (Stap 2) ── */
function processNewGoalsDump(){
  const txt=document.getElementById('new-goals-dump')?.value?.trim();
  if(!txt){toast('⚠️ Plak eerst het AI-antwoord');return;}

  const proposals=[];
  const blocks=txt.split(/={3,}/g).map(b=>b.trim()).filter(Boolean);
  blocks.forEach(block=>{
    const nameMatch=block.match(/NIEUW LEERDOEL:\s*(.+)/i);
    const catMatch=block.match(/CATEGORIE:\s*(.+)/i);
    const lvlMatch=block.match(/STARTNIVEAU:\s*(\d+)/i);
    const reasonMatch=block.match(/REDEN:\s*(.+)/is);
    if(!nameMatch)return;
    const name=nameMatch[1].trim();
    if(S.goals.some(g=>g.name.toLowerCase()===name.toLowerCase()))return;
    const rawCat=catMatch?catMatch[1].trim():'Overig';
    const category=GOAL_CATS.find(c=>c.toLowerCase()===rawCat.toLowerCase())||'Overig';
    const level=lvlMatch?Math.max(1,Math.min(100,parseInt(lvlMatch[1],10))):1;
    const reason=(reasonMatch?reasonMatch[1].trim():'Voorgesteld door AI-analyse').replace(/\n/g,' ').slice(0,200);
    proposals.push({name,category,level,reason,accepted:null});
  });

  if(!proposals.length){
    toast('⚠️ Geen nieuwe leerdoelen gevonden — zorg dat het AI-antwoord het NIEUW LEERDOEL/CATEGORIE/STARTNIVEAU/REDEN formaat volgt',5000);
    return;
  }
  const seen=new Set();
  _newGoalProposals=proposals.filter(p=>{const k=p.name.toLowerCase();if(seen.has(k))return false;seen.add(k);return true;});
  render();
  toast(`✅ ${_newGoalProposals.length} nieuw${_newGoalProposals.length!==1?'e voorstellen':' voorstel'} gevonden!`);
}
function acceptNewGoalProposal(i){
  const p=_newGoalProposals[i];if(!p)return;
  const g=mkGoal(p.name,p.category);
  g.level=p.level;
  g.history=[{date:new Date().toISOString().slice(0,10),oldLevel:1,newLevel:p.level,delta:p.level-1,reason:p.reason}];
  saveGoals();p.accepted=true;render();toast('✅ Leerdoel toegevoegd: '+g.name);
}
function rejectNewGoalProposal(i){_newGoalProposals[i].accepted=false;render();}
function acceptAllNewGoalProposals(){
  _newGoalProposals.forEach((_,i)=>{if(_newGoalProposals[i].accepted===null)acceptNewGoalProposal(i);});
}

/* ── Antwoord verwerken (Stap 2) ── */
function processAnalysisDump(){
  const txt=document.getElementById('analysis-dump')?.value?.trim();
  if(!txt){toast('⚠️ Plak eerst het AI-antwoord');return;}
  if(!S.goals.length){toast('⚠️ Voeg eerst leerdoelen toe');return;}

  const proposals=[];
  const blocks=txt.split(/={3,}/g).map(b=>b.trim()).filter(Boolean);
  blocks.forEach(block=>{
    const nameMatch=block.match(/LEERDOEL:\s*(.+)/i);
    const deltaMatch=block.match(/DELTA:\s*([+-]?\d+)/i);
    const reasonMatch=block.match(/REDEN:\s*(.+)/is);
    if(!nameMatch||!deltaMatch)return;
    const rawName=nameMatch[1].trim();
    const delta=parseInt(deltaMatch[1],10);
    const reason=(reasonMatch?reasonMatch[1].trim():'Geen reden opgegeven').replace(/\n/g,' ').slice(0,200);
    const g=S.goals.find(x=>x.name.toLowerCase()===rawName.toLowerCase())
      ||S.goals.find(x=>x.name.toLowerCase().includes(rawName.toLowerCase()))
      ||S.goals.find(x=>rawName.toLowerCase().includes(x.name.toLowerCase()));
    if(!g||delta===0)return;
    const oldLevel=g.level||1;
    const newLevel=Math.max(1,Math.min(100,oldLevel+delta));
    proposals.push({goalId:g.id,goalName:g.name,oldLevel,newLevel,delta,reason,accepted:null});
  });

  if(!proposals.length){
    const lines=txt.split('\n');
    let cur={};
    lines.forEach(line=>{
      const nm=line.match(/^LEERDOEL:\s*(.+)/i);
      const dm=line.match(/^DELTA:\s*([+-]?\d+)/i);
      const rm=line.match(/^REDEN:\s*(.+)/i);
      if(nm){cur={name:nm[1].trim()};}
      if(dm&&cur.name){cur.delta=parseInt(dm[1],10);}
      if(rm&&cur.name){
        cur.reason=rm[1].trim();
        if(cur.delta!==undefined&&cur.delta!==0){
          const g=S.goals.find(x=>x.name.toLowerCase()===cur.name.toLowerCase())
            ||S.goals.find(x=>x.name.toLowerCase().includes(cur.name.toLowerCase()))
            ||S.goals.find(x=>cur.name.toLowerCase().includes(x.name.toLowerCase()));
          if(g){
            const old=g.level||1;
            const nw=Math.max(1,Math.min(100,old+cur.delta));
            proposals.push({goalId:g.id,goalName:g.name,oldLevel:old,newLevel:nw,delta:cur.delta,reason:cur.reason,accepted:null});
          }
        }
        cur={};
      }
    });
  }

  if(!proposals.length){
    toast('⚠️ Geen groei gevonden — zorg dat het AI-antwoord het LEERDOEL/DELTA/REDEN formaat volgt',5000);
    return;
  }
  const seen=new Set();
  _analysisProposals=proposals.filter(p=>{if(seen.has(p.goalId))return false;seen.add(p.goalId);return true;});
  render();
  toast(`✅ ${_analysisProposals.length} voorstel${_analysisProposals.length!==1?'len':''} gevonden!`);
}
function acceptProposal(i){
  const p=_analysisProposals[i];if(!p)return;
  const g=S.goals.find(x=>x.id===p.goalId);if(!g)return;
  g.level=p.newLevel;
  g.history=g.history||[];
  g.history.push({date:new Date().toISOString().slice(0,10),oldLevel:p.oldLevel,newLevel:p.newLevel,delta:p.delta,reason:p.reason});
  saveGoals();p.accepted=true;render();toast('✅ Niveau bijgewerkt: '+g.name+' → '+p.newLevel);
}
function rejectProposal(i){_analysisProposals[i].accepted=false;render();}
function acceptAllProposals(){
  _analysisProposals.forEach((_,i)=>{if(_analysisProposals[i].accepted===null)acceptProposal(i);});
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
  if(!S.goals.some(g=>(g.history||[]).length)){toast('ℹ️ Er is nog geen groeigeschiedenis om te wissen');return;}
  orbitConfirm('Weet je zeker dat je ALLE groeigeschiedenis wilt wissen? Elk leerdoel wordt teruggezet naar het startniveau (of 1 als er geen geschiedenis is). Dit kan niet ongedaan worden gemaakt.',()=>{
    S.goals.forEach(g=>{
      const hist=g.history||[];
      g.level=hist.length?hist[0].oldLevel:1;
      g.history=[];
    });
    saveGoals();render();toast('🗑️ Alle groeigeschiedenis gewist');
  },null,'Alle groei wissen');
}

/* ── Portfolio prompt genereren ── */
function generatePortfolioPrompt(){
  if(!S.goals.length){toast('⚠️ Voeg eerst leerdoelen toe');return;}
  const style=PORTFOLIO_STYLES.find(s=>s.id===_portfolioStyle)||PORTFOLIO_STYLES[0];
  const color=PORTFOLIO_COLORS.find(c=>c.id===_portfolioColor)||PORTFOLIO_COLORS[0];
  const sec=_portfolioSections;
  const customBase=localStorage.getItem('pb_portfolio_prompt_tpl')||'';
  let prompt=customBase||`Maak een ${style.l} voor mij op basis van de onderstaande informatie. Schrijf het volledig uit in het Nederlands, professioneel en overtuigend.\n\n`;
  prompt+=`**Stijl:** ${style.l} — ${style.desc}\n`;
  prompt+=`**Kleurschema:** ${color.l} (${color.hex}) — gebruik dit als accent door de hele opmaak\n\n`;
  prompt+=`**Belangrijkste opdracht:** beschrijf niet alleen WAT ik gedaan heb, maar vooral HOE ik gegroeid ben, WAAROM die groei heeft plaatsgevonden en welke ontwikkeling daarin zichtbaar is. Leg per leerdoel een duidelijke lijn van mijn leerproces: waar ik begon, welke acties/ervaringen tot groei hebben geleid, wat ik daarvan geleerd heb en hoe ik dit in de toekomst ga toepassen. Reflectie en persoonlijke ontwikkeling staan centraal — gebruik concrete voorbeelden uit mijn groeigeschiedenis en werk hieronder.\n\n`;
  if(sec.goals){
    prompt+=`## Mijn leerdoelen & vaardigheidsniveaus (schaal 1-100)\n\n`;
    S.goals.forEach(g=>{
      prompt+=`- **${g.name}** — niveau ${g.level||1}/100 (${lvlLabel(g.level||1)})`;
      if(g.desc)prompt+=`\n  *${g.desc}*`;
      prompt+='\n';
    });
    prompt+='\n';
  }
  if(sec.projects){
    const projs=S.tasks.filter(t=>t.analysis&&!t.archived).slice(0,8);
    if(projs.length){
      prompt+=`## Gemaakte projecten & opdrachten\n\n`;
      projs.forEach(t=>{
        const name=t.name||t.input?.goal||'Project';
        const pct=taskPct(t);
        prompt+=`- **${name}** — ${pct}% afgerond\n`;
      });
      prompt+='\n';
    }
  }
  if(sec.milestones){
    const allMs=S.goals.flatMap(g=>(g.milestones||[]).filter(m=>m.done).map(m=>({goal:g.name,label:m.label})));
    if(allMs.length){
      prompt+=`## Behaalde mijlpalen\n\n`;
      allMs.slice(0,15).forEach(m=>prompt+=`- ${m.label} *(${m.goal})*\n`);
      prompt+='\n';
    }
  }
  if(sec.reflection){
    const goalsWithNotes=S.goals.filter(g=>g.notes||(g.history&&g.history.length));
    if(goalsWithNotes.length){
      prompt+=`## Reflectie & groeitraject per leerdoel\n\n`;
      prompt+=`Voor elk leerdoel hieronder staat het startniveau, het huidige niveau, mijn eigen aantekeningen en de stappen waarin ik gegroeid ben (met reden). Gebruik dit om per leerdoel te beschrijven: waar ik begon, welke ontwikkeling ik heb doorgemaakt, waarom die groei heeft plaatsgevonden, wat ik ervan geleerd heb en wat dit zegt over mijn persoonlijke ontwikkeling.\n\n`;
      goalsWithNotes.forEach(g=>{
        const hist=g.history||[];
        const startLevel=hist.length?hist[0].oldLevel:(g.level||1);
        prompt+=`### ${g.name}\n`;
        prompt+=`Startniveau: ${startLevel}/100 → Huidig niveau: ${g.level||1}/100 (${lvlLabel(g.level||1)})\n`;
        if(g.notes)prompt+=`Eigen aantekeningen/reflectie: ${g.notes}\n`;
        if(hist.length){
          prompt+=`Groeistappen (van begin tot nu):\n`;
          hist.forEach(h=>{
            prompt+=`- ${h.oldLevel} → ${h.newLevel} (${h.delta>=0?'+':''}${h.delta}): ${h.reason} *(${h.date})*\n`;
          });
        }
        prompt+='\n';
      });
    }
  }
  const werkGoals=S.goals.filter(g=>(g.werkItems&&g.werkItems.length)||(g.linkedTasks&&g.linkedTasks.length));
  if(werkGoals.length){
    prompt+=`## Gekoppeld werk per leerdoel\n\n`;
    werkGoals.forEach(g=>{
      prompt+=`### ${g.name}\n`;
      (g.werkItems||[]).forEach(w=>prompt+=`- **${w.title}**: ${w.body.slice(0,150)}${w.body.length>150?'...':''}\n`);
      (g.linkedTasks||[]).forEach(tid=>{
        const t=S.tasks.find(x=>x.id===tid);
        if(t)prompt+=`- Opdracht: **${t.name||t.input?.goal||'Opdracht'}** (${taskPct(t)}% afgerond)\n`;
      });
      prompt+='\n';
    });
  }
  if(sec.radar&&S.goals.length>=2){
    prompt+=`## Vaardigheidsradar — beschrijving voor portfolio\n\n`;
    prompt+=`De onderstaande gegevens vertegenwoordigen een spiderweb/radardiagram van mijn vaardigheidsniveaus. Beschrijf dit visueel in het portfolio (stel dat de lezer het diagram ziet):\n\n`;
    S.goals.slice(0,10).forEach(g=>{
      const pct=g.level||1;
      const bar='█'.repeat(Math.round(pct/10))+'░'.repeat(10-Math.round(pct/10));
      prompt+=`- **${g.name}**: ${bar} ${pct}/100 (${lvlLabel(pct)})\n`;
    });
    prompt+=`\nGeef een korte narratieve beschrijving van dit diagram: wat valt op, waar zijn sterke punten, waar is nog ruimte voor groei?\n\n`;
  }
  if(_portfolioCustomPrompt){prompt+=`\n## Extra instructies\n${_portfolioCustomPrompt}\n`;}
  prompt+=`\n---\n\nMaak op basis van bovenstaande informatie een volledig uitgewerkt ${style.l}. Maak het sterk, concreet en authentiek. Schrijf in het Nederlands. Zorg dat het direct bruikbaar is.\n\n`;
  prompt+=`Let hierbij specifiek op:\n`;
  prompt+=`- Beschrijf per leerdoel/onderdeel niet alleen het resultaat, maar ook de groei: waar begon ik, wat is er veranderd en hoe is dat te zien?\n`;
  prompt+=`- Leg uit WAAROM die groei heeft plaatsgevonden — welke acties, ervaringen, projecten of inzichten hebben hieraan bijgedragen?\n`;
  prompt+=`- Maak het leerproces zichtbaar: wat heb ik geleerd, welke inzichten heb ik opgedaan en hoe pas ik dat in de toekomst toe?\n`;
  prompt+=`- Zorg voor een persoonlijke, reflectieve toon (ik-vorm) die laat zien dat ik bewust nadenk over mijn eigen ontwikkeling, naast een professionele presentatie van mijn vaardigheden.`;
  document.getElementById('portfolio-prompt-txt').value=prompt;
  document.getElementById('portfolio-prompt-out').classList.remove('hidden');
  toast('✅ Portfolio-prompt gegenereerd!');
}
function sendPortfolioToAI(siteId){
  const s=SITES.find(x=>x.id===siteId);if(!s)return;
  const txt=document.getElementById('portfolio-prompt-txt')?.value||'';
  window.open(s.url,'_blank','noopener');
  navigator.clipboard?.writeText(txt).catch(()=>fbCopy(txt,''));
  toast('✅ '+s.l+' geopend & prompt gekopieerd!',3000);
}

/* ══════════════════════════════════════════════════════════
   SPIDERWEB / RADAR CHART (SVG, geen externe library)
   ══════════════════════════════════════════════════════════ */
function buildRadarChart(goals,size=260){
  if(!goals||!goals.length)return'<div class="text-sm text-gray-400 py-4 text-center">Voeg leerdoelen toe om de radar te zien</div>';
  const pts=goals.slice(0,10);
  const n=pts.length;
  if(n<2)return'<div class="text-sm text-gray-400 py-4 text-center">Voeg minimaal 2 leerdoelen toe voor de radar</div>';
  const cx=size/2,cy=size/2,r=(size/2)-30;
  const angle=i=>((2*Math.PI*i)/n)-(Math.PI/2);
  const coord=(i,frac)=>({x:cx+r*frac*Math.cos(angle(i)),y:cy+r*frac*Math.sin(angle(i))});
  let rings='';
  [0.25,0.5,0.75,1.0].forEach(f=>{
    const ps=pts.map((_,i)=>coord(i,f));
    rings+=`<polygon points="${ps.map(p=>p.x.toFixed(1)+','+p.y.toFixed(1)).join(' ')}" fill="none" stroke="#e5e7eb" stroke-width="1"/>`;
  });
  let axes='';
  pts.forEach((_,i)=>{
    const e=coord(i,1);
    axes+=`<line x1="${cx}" y1="${cy}" x2="${e.x.toFixed(1)}" y2="${e.y.toFixed(1)}" stroke="#e5e7eb" stroke-width="1"/>`;
  });
  const dps=pts.map((g,i)=>coord(i,(g.level||1)/100));
  const poly=dps.map(p=>p.x.toFixed(1)+','+p.y.toFixed(1)).join(' ');
  const fill=pts[0]?lvlColor(Math.round(pts.reduce((a,g)=>a+(g.level||1),0)/pts.length)):'#4f46e5';
  let data=`<polygon points="${poly}" fill="${fill}22" stroke="${fill}" stroke-width="2" stroke-linejoin="round"/>`;
  pts.forEach((g,i)=>{const p=coord(i,(g.level||1)/100);data+=`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="${lvlColor(g.level||1)}" stroke="#fff" stroke-width="1.5"/>`;});
  let labels='';
  pts.forEach((g,i)=>{
    const lp=coord(i,1.18);
    const name=g.name.length>14?g.name.slice(0,13)+'…':g.name;
    labels+=`<text x="${lp.x.toFixed(1)}" y="${lp.y.toFixed(1)}" text-anchor="${lp.x<cx-5?'end':lp.x>cx+5?'start':'middle'}" dominant-baseline="middle" font-size="9" fill="#6b7280" font-family="system-ui,sans-serif">${name}</text>`;
    const dp=coord(i,(g.level||1)/100);
    labels+=`<text x="${dp.x.toFixed(1)}" y="${(dp.y-8).toFixed(1)}" text-anchor="middle" font-size="8" fill="${lvlColor(g.level||1)}" font-weight="700" font-family="system-ui,sans-serif">${g.level||1}</text>`;
  });
  let ringLabels='';
  [25,50,75,100].forEach(v=>{
    const lp=coord(0,v/100);
    ringLabels+=`<text x="${(lp.x+4).toFixed(1)}" y="${lp.y.toFixed(1)}" font-size="7" fill="#9ca3af" font-family="system-ui,sans-serif">${v}</text>`;
  });
  return `<svg viewBox="0 0 ${size} ${size}" style="width:100%;max-width:${size}px;display:block;margin:0 auto">${rings}${axes}${data}${labels}${ringLabels}</svg>`;
}

/* ── Groeidiagram: niveauverloop per leerdoel over tijd (lijngrafiek) ── */
function buildGrowthChart(goals,width=560,height=240){
  const withHist=(goals||[]).filter(g=>(g.history||[]).length);
  if(withHist.length<1)return'';
  const dateSet=new Set();
  withHist.forEach(g=>g.history.forEach(h=>dateSet.add(h.date)));
  const histDates=[...dateSet].sort();
  if(!histDates.length)return'';
  // Eerste kolom = startpunt (vóór de eerste meting), daarna 1 kolom per meetmoment
  const cols=['start',...histDates];
  const pad={l:32,r:14,t:14,b:24};
  const w=width-pad.l-pad.r, h=height-pad.t-pad.b;
  const xFor=i=>pad.l+(cols.length>1?(i/(cols.length-1))*w:w/2);
  const yFor=lv=>pad.t+h-(lv/100*h);
  let grid='';
  [0,25,50,75,100].forEach(v=>{
    const y=yFor(v);
    grid+=`<line x1="${pad.l}" y1="${y.toFixed(1)}" x2="${pad.l+w}" y2="${y.toFixed(1)}" stroke="#eef0f4" stroke-width="1"/>`;
    grid+=`<text x="${pad.l-6}" y="${(y+3).toFixed(1)}" text-anchor="end" font-size="8" fill="#9ca3af" font-family="system-ui,sans-serif">${v}</text>`;
  });
  let xlabels='';
  cols.forEach((d,i)=>{
    if(i===0||i===cols.length-1||(cols.length<=5)){
      const lbl=d==='start'?'Start':d.slice(5);
      xlabels+=`<text x="${xFor(i).toFixed(1)}" y="${height-6}" text-anchor="middle" font-size="8" fill="#9ca3af" font-family="system-ui,sans-serif">${lbl}</text>`;
    }
  });
  let lines='', legend='';
  withHist.forEach(g=>{
    const lc=lvlColor(g.level||1);
    const dateLevel={};
    g.history.forEach(hh=>{dateLevel[hh.date]=hh.newLevel;});
    let curLvl=g.history[0].oldLevel;
    const series=cols.map((d,i)=>{
      if(d!=='start'&&dateLevel[d]!==undefined)curLvl=dateLevel[d];
      return{x:xFor(i),y:yFor(curLvl)};
    });
    const path=series.map((p,i)=>(i===0?'M':'L')+p.x.toFixed(1)+','+p.y.toFixed(1)).join(' ');
    lines+=`<path d="${path}" fill="none" stroke="${lc}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    series.forEach(p=>{lines+=`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="2.5" fill="${lc}" stroke="#fff" stroke-width="1"/>`;});
    const name=g.name.length>18?g.name.slice(0,17)+'…':g.name;
    legend+=`<div style="display:flex;align-items:center;gap:5px"><span style="width:14px;height:2.5px;border-radius:2px;background:${lc};display:inline-block;flex-shrink:0"></span><span style="font-size:10px;color:#374151">${name.replace(/</g,'&lt;')}</span></div>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" style="width:100%;max-width:${width}px;display:block;margin:0 auto">${grid}${lines}${xlabels}</svg>
  <div style="display:flex;flex-wrap:wrap;gap:8px 16px;justify-content:center;margin-top:10px">${legend}</div>`;
}

/* ══════════════════════════════════════════════════════════
   PORTFOLIO: setPortfolioStyle / setPortfolioColor (no re-render)
   ══════════════════════════════════════════════════════════ */
function setPortfolioStyle(id){
  _portfolioStyle=id;
  document.querySelectorAll('.ps-card').forEach(el=>{
    const sid=el.dataset.sid;
    if(sid===id){el.classList.add('border-indigo-500','bg-indigo-50');el.classList.remove('border-gray-200');}
    else{el.classList.remove('border-indigo-500','bg-indigo-50');el.classList.add('border-gray-200');}
  });
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
function setPortfolioColor(id){
  _portfolioColor=id;
  document.querySelectorAll('.pc-btn').forEach(el=>{
    const cid=el.dataset.cid;
    const c=PORTFOLIO_COLORS.find(x=>x.id===cid);if(!c)return;
    if(cid===id){el.style.borderColor=c.hex;el.classList.add('ring-2');el.style.outline='2px solid '+c.hex;}
    else{el.style.borderColor='';el.classList.remove('ring-2');el.style.outline='';}
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
  const old=g.level||1;
  g.level=val;
  g.history=g.history||[];
  g.history.push({date:new Date().toISOString().slice(0,10),oldLevel:old,newLevel:val,delta:val-old,reason});
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
