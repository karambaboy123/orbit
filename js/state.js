/* ── STATE ─────────────────────────────────────────────── */
const DFLT_PRESETS=[
  {id:'summary',   ic:'📝', l:'Samenvatting',    p:'Maak een heldere, beknopte samenvatting van dit document in maximaal 5 kernpunten.'},
  {id:'checklist', ic:'✅', l:'Checklist',        p:'Haal alle taken en acties uit dit document. Presenteer ze als afvinkbare checklist met - [ ] items. Begin elke taak met een actief werkwoord.'},
  {id:'both',      ic:'📋', l:'Hoofd+Sub',        p:'Maak een volledige taakstructuur:\n\n## Hoofdopdrachten\n- [ ] [grote taak]\n\n## Subopdrachten per hoofdopdracht\n\n### ✦ [Hoofdopdracht 1]\n- [ ] [concrete subtaak]\n\nGebruik - [ ] voor alle items.'},
  {id:'main',      ic:'🎯', l:'Hoofdtaken',       p:'Identificeer de hoofdopdrachten (grote overkoepelende taken/doelen) uit dit document.\n\nFormat:\n## Hoofdopdrachten\n- [ ] [hoofdtaak]\n\nAlleen de grote taken, geen details.'},
  {id:'sub',       ic:'🔧', l:'Subtaken',         p:'Splits alle opdrachten in dit document op in kleine, concrete, uitvoerbare subtaken.\n\nFormat:\n## Subtaken\n- [ ] [concrete actie]\n\nElke taak begint met een actief werkwoord.'},
  {id:'risks',     ic:'⚠️', l:"Risico's",         p:"Analyseer dit document op risico's, valkuilen, onduidelijkheden en aandachtspunten. Geef een duidelijk overzicht met uitleg per punt."},
  {id:'keypoints', ic:'💡', l:'Kernpunten',       p:"Identificeer de 5-10 belangrijkste punten, inzichten en conclusies uit dit document. Wees concreet en specifiek."},
  {id:'improve',   ic:'sparkles', l:'Verbeterpunten',   p:'Geef concrete verbeterpunten voor dit document. Wat ontbreekt? Wat kan duidelijker? Wat moet anders? Geef prioriteit aan de verbeterpunten.'},
  {id:'questions', ic:'question', l:'Vragen',           p:'Stel 5-10 kritische vragen over dit document. Wat ontbreekt? Wat is onduidelijk? Wat moet verder worden uitgewerkt? Geef bij elke vraag aan waarom hij belangrijk is.'},
  {id:'planning',  ic:'🗓️', l:'Planning',         p:'Maak een concrete tijdsplanning van alle taken en actiepunten in dit document. Geef per taak een geschatte tijdsduur en een logische volgorde.'},
  {id:'custom',    ic:'pencil', l:'Eigen',            p:''},
];
const DFLT_TMPLS=[
  {id:'blank',    ic:'📝', l:'Blanco',
   goal:'', aud:'', tone:'', out:'',
   aiPrompt:'Jij bent een expert assistent. Help mij met de volgende opdracht:\n\n{{doel}}\n\nDoelgroep: {{doelgroep}}\nToon: {{toon}}\nGewenste output: {{output}}\n\n{{context}}\n\nWerk gestructureerd en volledig uit in het Nederlands.'},
  {id:'marketing',ic:'📣', l:'Marketingplan',
   goal:'Maak een marketingplan voor ', aud:'Potentiële klanten', tone:'Professioneel en enthousiast', out:'Document / rapport',
   aiPrompt:'Maak een uitgebreid marketingplan voor:\n{{doel}}\n\nDoelgroep: {{doelgroep}}\nToon: {{toon}}\n{{context}}\n\nHet plan bevat:\n1. Situatieanalyse & concurrentieoverzicht\n2. Doelgroepanalyse & buyer personas\n3. Marketingdoelstellingen (SMART)\n4. Kanaalstrategie (social, SEO, email, ads)\n5. Content- en publicatieplanning\n6. Budget en KPI\'s\n\nIn het Nederlands, professioneel en direct toepasbaar.'},
  {id:'project',  ic:'📊', l:'Projectplan',
   goal:'Maak een projectplan voor ', aud:'Projectteam en stakeholders', tone:'Zakelijk en bondig', out:'Plan / stappenplan',
   aiPrompt:'Maak een compleet projectplan voor:\n{{doel}}\n\nDoelgroep: {{doelgroep}}\nToon: {{toon}}\n{{context}}\n\nHet plan bevat:\n1. Projectdoel en scope\n2. Deliverables en succescriteria\n3. Projectfasen met tijdlijn\n4. Taken en verantwoordelijkheden\n5. Risico\'s en mitigatie\n6. Budget en benodigde middelen\n\nIn het Nederlands, zakelijk en uitvoerbaar.'},
  {id:'email',    ic:'📧', l:'E-mail / Brief',
   goal:'Schrijf een professionele e-mail over ', aud:'', tone:'Professioneel en vriendelijk', out:'E-mail of brief',
   aiPrompt:'Schrijf een professionele e-mail of brief over:\n{{doel}}\n\nOntvanger: {{doelgroep}}\nToon: {{toon}}\n{{context}}\n\nDe e-mail is duidelijk en bondig. Gebruik een passende aanhef en afsluiting. Geef ook 1 kortere variant. In het Nederlands.'},
  {id:'rapport',  ic:'📄', l:'Rapport',
   goal:'Schrijf een rapport over ', aud:'Management en beslissers', tone:'Professioneel en formeel', out:'Document / rapport',
   aiPrompt:'Schrijf een professioneel rapport over:\n{{doel}}\n\nDoelgroep: {{doelgroep}}\nToon: {{toon}}\n{{context}}\n\nHet rapport bevat:\n1. Executive summary\n2. Inleiding en context\n3. Bevindingen en analyse\n4. Conclusies\n5. Aanbevelingen met prioritering\n\nIn het Nederlands, formeel en onderbouwd.'},
  {id:'sollicit', ic:'💼', l:'Sollicitatie',
   goal:'Schrijf een sollicitatiebrief voor de functie van ', aud:'HR-afdeling en hiring manager', tone:'Professioneel en zelfverzekerd', out:'E-mail of brief',
   aiPrompt:'Schrijf een overtuigende sollicitatiebrief voor:\n{{doel}}\n\nToon: {{toon}}\n{{context}}\n\nDe brief:\n- Begint sterk met een pakkende opening\n- Legt overtuigend uit waarom ik de ideale kandidaat ben\n- Koppelt concrete ervaringen aan de functie-eisen\n- Sluit af met een duidelijke call-to-action\n\nIn het Nederlands, zelfverzekerd maar authentiek. Max. 400 woorden.'},
  {id:'social',   ic:'📱', l:'Social Media',
   goal:'Maak social media content voor ', aud:'Volgers op social media', tone:'Creatief en inspirerend', out:'Social media content',
   aiPrompt:'Maak effectieve social media content voor:\n{{doel}}\n\nDoelgroep: {{doelgroep}}\nToon: {{toon}}\n{{context}}\n\nLever:\n1. 3 LinkedIn-posts (variaties in lengte)\n2. 3 Instagram-captions met hashtags\n3. 2 varianten voor X/Twitter (max 280 tekens)\n4. 1 script voor Reels/TikTok (± 30 sec)\n\nIn het Nederlands, pakkend en deelbaar.'},
  {id:'analyse',  ic:'🔍', l:'Analyse',
   goal:'Analyseer ', aud:'Management', tone:'Zakelijk en feitelijk', out:'Rapport / analyse',
   aiPrompt:'Voer een grondige analyse uit van:\n{{doel}}\n\nDoelgroep: {{doelgroep}}\nToon: {{toon}}\n{{context}}\n\nDe analyse bevat:\n1. Situatieschets en context\n2. Sterke punten\n3. Zwakke punten en risico\'s\n4. Kansen\n5. Bedreigingen\n6. Conclusies en prioriteitsaanbevelingen\n\nIn het Nederlands, objectief en onderbouwd.'},
];

/* ── Safe localStorage helpers ──────────────────────────── */
function _safeJSON(key, fallback){
  try{
    const v=localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch(e){
    console.warn('[Orbit] Corrupte data in "'+key+'" — reset naar standaard');
    try{localStorage.removeItem(key);}catch(_){}
    return fallback;
  }
}
function _safeSave(key, value){
  try{
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch(e){
    if(e.name==='QuotaExceededError'||e.name==='NS_ERROR_DOM_QUOTA_REACHED'){
      if(typeof toast==='function')
        toast('⚠️ Browseropslag bijna vol — exporteer een backup via Instellingen', 6000);
    } else { console.warn('[Orbit] Opslaan mislukt voor "'+key+'":', e); }
    return false;
  }
}

const S = {
  view: 'dashboard',
  tasks:     _safeJSON('pb_tasks',    []),
  promptLib: _safeJSON('pb_prompts',  []),
  presets:   _safeJSON('pb_presets',  null),
  templates: _safeJSON('pb_templates',null),
  goals:     _safeJSON('pb_goals',    []),
  notes:     _safeJSON('pb_notes',    []),
  reviews:   _safeJSON('pb_reviews',  []),
  attachments: _safeJSON('pb_attachments', []),
  tid: null, gid: null, nid: null,
  geminiKey: localStorage.getItem('pb_gemini')||'',
};
if(!S.presets){S.presets=DFLT_PRESETS.map(p=>({...p}));localStorage.setItem('pb_presets',JSON.stringify(S.presets));}
if(!S.templates){S.templates=DFLT_TMPLS.map(t=>({...t}));localStorage.setItem('pb_templates',JSON.stringify(S.templates));}
let _ftaSelId=S.presets[0]?.id||'summary';
let _ntSelTmplId=S.templates[0]?.id||'blank';
let _editingPresetId=null;
let _editingTmplId=null;
let _searchOpen=false;
let _dashTag='';
let _noteMdMode=localStorage.getItem('pb_note_md_mode')||'edit';

const saveT       = () => { _safeSave('pb_tasks',    S.tasks);     if(typeof backupBumpCounter==='function')backupBumpCounter(); };
const saveL       = () => { _safeSave('pb_prompts',  S.promptLib); if(typeof backupBumpCounter==='function')backupBumpCounter(); };
const savePresets = () => { _safeSave('pb_presets',  S.presets);   if(typeof backupBumpCounter==='function')backupBumpCounter(); };
const saveTemplates=() => { _safeSave('pb_templates',S.templates); if(typeof backupBumpCounter==='function')backupBumpCounter(); };
const saveGoals   = () => { _safeSave('pb_goals',    S.goals);     if(typeof backupBumpCounter==='function')backupBumpCounter(); };
const saveNotes   = () => { _safeSave('pb_notes',    S.notes);     if(typeof backupBumpCounter==='function')backupBumpCounter(); };
const saveReviews = () => { _safeSave('pb_reviews',  S.reviews);   if(typeof backupBumpCounter==='function')backupBumpCounter(); };
const saveAttachments=()=> { _safeSave('pb_attachments',S.attachments); if(typeof backupBumpCounter==='function')backupBumpCounter(); };
const getTask = () => S.tasks.find(t=>t.id===S.tid)||null;
const mkId = () => 't'+Date.now()+Math.random().toString(36).slice(2,5);

/* ── TASK HELPERS ───────────────────────────────────────── */
function mkTask(type,input,name=''){
  const t={id:mkId(),name:name||'',type,input,analysis:null,checks:{},checkLabels:{},checkDates:{},deadline:'',createdAt:new Date().toISOString(),mode:'local',tags:[]};
  S.tasks.unshift(t); saveT(); return t;
}
function taskPct(t){
  const v=Object.values(t.checks||{}); return v.length?Math.round(v.filter(Boolean).length/v.length*100):0;
}
function taskDoneCount(t){return Object.values(t.checks||{}).filter(Boolean).length;}
function taskTotalCount(t){return Object.values(t.checks||{}).length;}
