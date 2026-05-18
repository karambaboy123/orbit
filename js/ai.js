/* ── GEMINI API ─────────────────────────────────────────── */
async function callGemini(sys,msg){
  const url=`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${S.geminiKey}`;
  const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({systemInstruction:{parts:[{text:sys}]},contents:[{role:'user',parts:[{text:msg}]}],generationConfig:{maxOutputTokens:4096,temperature:.7}})});
  if(!r.ok){const e=await r.json().catch(()=>({}));throw new Error(e.error?.message||`Gemini fout (${r.status})`);}
  return (await r.json()).candidates[0].content.parts[0].text;
}

/* ── LOCAL GENERATOR ────────────────────────────────────── */
const CATS={marketing:['marketing','reclame','advertentie','campagne','social media','brand','merk','verkoop','promotie'],schrijven:['schrijf','schrijven','tekst','brief','email','e-mail','artikel','blog','verslag','rapport','document'],plan:['plan','plannen','project','stappenplan','roadmap','strategie','aanpak','begroting'],analyse:['analyseer','analyse','onderzoek','evalueer','beoordeel','vergelijk','data'],technisch:['website','app','applicatie','code','software','programmeer','ontwikkel','bouw','design'],presentatie:['presentatie','pitch','slides','deck','spreken'],hr:['sollicitatie','cv','vacature','medewerker','team','hr','personeel','training']};
const SUBS={marketing:['Definieer de doelgroep en buyer persona','Bepaal het marketingkanaal en de kernboodschap','Maak een content- en publicatieplanning','Stel KPI\'s en een budget op','Produceer de marketingmaterialen','Meet en optimaliseer de resultaten'],schrijven:['Bepaal het doel en de kernboodschap','Maak een structuur (outline)','Schrijf de eerste ruwe versie','Verbeter inhoud en structuur','Controleer taal, stijl en toon','Haal feedback op en doe de laatste revisie'],plan:['Definieer het einddoel en de scope','Verdeel het project in fases','Maak een tijdlijn met deadlines','Bepaal benodigde middelen en budgetten','Identificeer risico\'s','Stel een voortgangsrapportage op'],analyse:['Definieer de onderzoeksvraag','Verzamel relevante data en bronnen','Analyseer de data en zoek patronen','Trek conclusies','Formuleer aanbevelingen','Presenteer de bevindingen'],technisch:['Definieer requirements en functionaliteiten','Ontwerp architectuur en gebruikersflow','Kies de technische stack','Bouw de kernfunctionaliteiten','Test grondig','Deploy en documenteer'],presentatie:['Bepaal het doel en de centrale boodschap','Maak een logische structuur','Schrijf de kernpunten per slide','Voeg visuele elementen toe','Oefen hardop','Verwerk feedback'],hr:['Analyseer de functie-eisen','Schrijf een kernachtige samenvatting','Beschrijf ervaringen concreet met resultaten','Pas het document aan op de situatie','Controleer spelling en opmaak'],default:['Analyseer de situatie en definieer het einddoel','Verzamel benodigde informatie','Maak een concrete aanpak','Voer de hoofdtaken stap voor stap uit','Controleer het resultaat','Lever het eindresultaat op']};
const CHKS={marketing:{p:['Beschrijf de doelgroep gedetailleerd','Definieer het unieke verkoopargument (USP)','Analyseer de concurrentie','Stel een duidelijk doel en budget vast'],e:['Maak de content aan','Pas de boodschap aan per kanaal','Stel de publicatieplanning op','Test met een pilotgroep'],r:['Controleer alle teksten op fouten','Vraag feedback van buiten','Meet de eerste resultaten','Optimaliseer op basis van data']},schrijven:{p:['Definieer het doel van de tekst','Bepaal de doelgroep en toon','Verzamel alle benodigde informatie','Maak een globale structuur'],e:['Schrijf een ruwe eerste versie','Werk alle onderdelen uit','Pas toon en stijl aan','Zorg voor sterke opening en afronding'],r:['Lees hardop voor','Controleer spelling en grammatica','Controleer of de boodschap duidelijk is','Laat iemand anders meelezen']},default:{p:['Definieer het einddoel concreet','Verzamel alle benodigde informatie','Bepaal de aanpak en planning','Stem verwachtingen af'],e:['Voer de hoofdtaken stap voor stap uit','Documenteer keuzes en resultaten','Vraag tussentijds feedback','Bijsturen waar nodig'],r:['Controleer eindresultaat','Laat reviewen','Verwerk verbeterpunten','Lever op en evalueer']}};
function detCat(t){const s=(t||'').toLowerCase();for(const[c,ks]of Object.entries(CATS))if(ks.some(k=>s.includes(k)))return c;return 'default';}
function buildPrompt({goal='',audience='',tone='',outputFormat='',context=''}){let p=`Jij bent een expert. Help mij met:\n${goal}`;if(audience)p+=`\n\nDoelgroep: ${audience}`;if(tone)p+=`\nToon: ${tone}`;if(outputFormat)p+=`\nOutput: ${outputFormat}`;if(context)p+=`\n\nContext:\n${context}`;p+=`\n\nAanpak:\n1. Begin met een korte situatieschets\n2. Werk gestructureerd en volledig uit\n3. Sluit af met concrete aanbevelingen\n\nLever de output in het Nederlands.`;return p;}
function genTask(inp){
  const cat=detCat(inp.goal),subs=SUBS[cat]||SUBS.default,chk=CHKS[cat]||CHKS.default;
  const miss=[];if(!inp.audience)miss.push('Wie is de exacte doelgroep?');if(!inp.tone)miss.push('Welke toon is gewenst?');if(!inp.outputFormat)miss.push('Wat is de gewenste outputvorm?');
  const adv={marketing:'Hoe specifieker je de doelgroep kent, hoe effectiever de aanpak.',schrijven:'Schrijf eerst snel een ruwe versie zonder te corrigeren.',plan:'Begin met het einddoel en werk achteruit naar de benodigde stappen.',analyse:'Stel de onderzoeksvraag zo concreet mogelijk op.',technisch:'Bouw eerst een werkend prototype met alleen de kernfunctionaliteit.',default:'Verdeel grote taken in stappen van max 2 uur.'}[cat]||'Werk stap voor stap en vraag tussentijds feedback.';
  return `# Opdrachtanalyse\n\n## 1. Samenvatting\nJe wilt: **${inp.goal}**${inp.audience?' voor '+inp.audience:''}${inp.outputFormat?', output: '+inp.outputFormat:''}.\n\n## 2. Ontbrekende informatie\n${miss.length?miss.map(m=>`- ${m}`).join('\n'):'- Alle basisinformatie is ingevuld.'}\n\n## 3. Subopdrachten\n${subs.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\n## 4. Checklist\n\n### Fase 1: Voorbereiden\n${chk.p.map(t=>`- [ ] ${t}`).join('\n')}\n\n### Fase 2: Uitwerken\n${chk.e.map(t=>`- [ ] ${t}`).join('\n')}\n\n### Fase 3: Controleren\n${(chk.r||chk.e).map(t=>`- [ ] ${t}`).join('\n')}\n\n## 5. Verbeterde prompt\n\`\`\`\n${buildPrompt(inp)}\n\`\`\`\n\n## 6. Advies\n${adv}`;
}
function genPrompt({promptGoal='',tool='',complexity='',keywords=''}){
  const cat=detCat(promptGoal);
  const roles={marketing:'expert marketeer',schrijven:'professioneel schrijver',plan:'senior projectmanager',analyse:'data-analist',technisch:'senior software engineer',default:'expert assistent'};
  const role=roles[cat]||roles.default;
  const main=`Jij bent een ${role}. ${promptGoal?'Help mij met: '+promptGoal:'Help mij.'}\n\n${keywords?'Vereisten: '+keywords+'\n\n':''}Aanpak:\n1. Analyseer de situatie grondig\n2. Geef een gestructureerde uitwerking\n3. Sluit af met concrete aanbevelingen\n\nIn het Nederlands${tool&&tool!=='Algemeen'?', geoptimaliseerd voor '+tool:''}.`;
  const v1=`Geef een stap-voor-stap plan voor: ${promptGoal}\n\nFormaat: genummerde lijst met per stap: wat, waarom, hoelang.`;
  const v2=`Analyseer voor- en nadelen van de aanpak voor: ${promptGoal}\n\nGeef: 3 sterke punten, 3 verbeterpunten, jouw aanbeveling.`;
  const v3=`Stel de 5 meest relevante vragen die ik mezelf moet stellen bij: ${promptGoal}\n\nGeef per vraag: belang + voorbeeldantwoord.`;
  return `# Prompt Generator\n\n## Hoofdprompt\n\`\`\`\n${main}\n\`\`\`\n\n## Waarom effectief\nDeze prompt geeft de AI een duidelijke **rol** (${role}), een concrete **opdracht** en vraagt om een **gestructureerde aanpak**.\n\n## Variatie 1: Stappenplan\n\`\`\`\n${v1}\n\`\`\`\n\n## Variatie 2: Voor- en nadelen\n\`\`\`\n${v2}\n\`\`\`\n\n## Variatie 3: Verdiepende vragen\n\`\`\`\n${v3}\n\`\`\`\n\n## Checklist voor gebruik\n\n### Voorbereiding\n- [ ] Controleer of de context klopt\n- [ ] Vul eigen informatie in waar nodig\n- [ ] Kies de juiste variatie\n\n### Gebruik\n- [ ] Plak de prompt in de AI-tool\n- [ ] Controleer de output op volledigheid\n- [ ] Stel vervolgvragen als iets ontbreekt\n\n### Verfijning\n- [ ] Pas de prompt aan op de eerste output\n- [ ] Sla de beste versie op`;
}
function extractPrompt(md){const m=md?.match(/##\s*(?:\d+\.\s*)?(?:Verbeterde prompt|Hoofdprompt)[^`]*```(?:\w*\n)?([\s\S]*?)```/i);return m?m[1].trim():null;}

/* ── RUN ANALYSIS ───────────────────────────────────────── */
async function runAnalysis(task,sys,msg,btnId){
  const btn=document.getElementById(btnId);
  if(btn){btn.disabled=true;btn.innerHTML='<span class="spin"></span> Bezig...';}
  let analysis,mode='local';
  if(S.geminiKey){try{analysis=await callGemini(sys,msg);mode='ai';}catch(e){toast('⚠️ Gemini: '+e.message+' — lokaal gebruikt',4000);}}
  if(!analysis){
    if(task.type==='task')analysis=genTask(task.input);
    else if(task.type==='prompt')analysis=genPrompt(task.input);
    else analysis='# Analyse\n\nGeen analyse beschikbaar.';
    mode='local';
  }
  task.analysis=analysis; task.mode=mode;
  if(!task.name){
    const lbl=task.input.goal||task.input.promptGoal||'Opdracht';
    task.name=lbl.slice(0,40);
  }
  saveT(); S.tid=task.id; nav('analysis',task.id);
}

/* ── SP PROMPTS (Gemini) ────────────────────────────────── */
const SP_TASK=`Je bent een senior prompt engineer. Analyseer de opdracht en lever EXACT dit Markdown format:\n\n# Opdrachtanalyse\n\n## 1. Samenvatting\n[uitleg]\n\n## 2. Ontbrekende informatie\n- [punt]\n\n## 3. Subopdrachten\n1. [subopdracht]\n\n## 4. Checklist\n\n### Fase 1: Voorbereiden\n- [ ] [taak]\n\n### Fase 2: Uitwerken\n- [ ] [taak]\n\n### Fase 3: Controleren\n- [ ] [taak]\n\n## 5. Verbeterde prompt\n\`\`\`\n[complete prompt]\n\`\`\`\n\n## 6. Advies\n[tip]`;
const SP_PROMPT=`Je bent een expert prompt engineer. Lever EXACT dit Markdown format:\n\n# Prompt Generator\n\n## Hoofdprompt\n\`\`\`\n[complete geoptimaliseerde prompt]\n\`\`\`\n\n## Waarom effectief\n[uitleg]\n\n## Variatie 1: [naam]\n\`\`\`\n[tekst]\n\`\`\`\n\n## Variatie 2: [naam]\n\`\`\`\n[tekst]\n\`\`\`\n\n## Variatie 3: [naam]\n\`\`\`\n[tekst]\n\`\`\`\n\n## Checklist voor gebruik\n\n### Voorbereiding\n- [ ] [actie]\n\n### Gebruik\n- [ ] [actie]\n\n### Verfijning\n- [ ] [actie]`;

/* ── SETTINGS AI functions ──────────────────────────────── */
function saveAnalyseTpl(){const v=document.getElementById('set-analyse-tpl')?.value||'';localStorage.setItem('pb_analyse_prompt_tpl',v);toast('✅ Analyse-prompt opgeslagen!');}
function savePortfolioTpl(){const v=document.getElementById('set-portfolio-tpl')?.value||'';localStorage.setItem('pb_portfolio_prompt_tpl',v);toast('✅ Portfolio-prompt opgeslagen!');}
function saveGem(){const k=document.getElementById('gkey').value.trim();S.geminiKey=k;localStorage.setItem('pb_gemini',k);toast(k?'✅ Opgeslagen!':'✅ Sleutel gewist');render();}
async function testGem(){
  const k=document.getElementById('gkey').value.trim();if(!k){toast('⚠️ Vul een sleutel in');return;}
  const orig=S.geminiKey;S.geminiKey=k;
  try{const r=await callGemini('Reply with exactly: OK','test');toast('✅ Werkt! Antwoord: '+r.trim().slice(0,20));localStorage.setItem('pb_gemini',k);}
  catch(e){S.geminiKey=orig;toast('❌ '+e.message,5000);}
}
/* ── BACKUP & SYNC ───────────────────────────────────────── */
const GH_BACKUP_REPO='karambaboy123/orbit-data';
const GH_BACKUP_FILE='orbit-backup.json';

function getFullExportData(){
  return {
    version:3, exported:new Date().toISOString(),
    tasks:S.tasks, goals:S.goals, notes:S.notes, reviews:S.reviews,
    promptLib:S.promptLib, templates:S.templates, presets:S.presets,
    theme:_baseMode, font:_curFont, iconStyle:_iconStyle,
    customColors:_customColors||undefined,
    colorPresets:JSON.parse(localStorage.getItem('pb_color_presets')||'[]'),
  };
}
function exportAll(){
  const data=getFullExportData();
  const b=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(b);
  a.download=`orbit-backup-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  toast('✅ Backup gedownload!');
}
function importFromFile(){document.getElementById('orbit-import-file')?.click();}
function handleImport(input){
  const file=input.files[0]; if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    try{
      const data=JSON.parse(e.target.result);
      const info=`• ${data.tasks?.length||0} opdrachten\n• ${data.notes?.length||0} notities\n• ${data.goals?.length||0} doelen\n• ${data.reviews?.length||0} weekreviews\n• ${data.templates?.length||0} sjablonen\n• ${data.presets?.length||0} presets\n• ${data.colorPresets?.length||0} kleurschema's`;
      orbitConfirm(`Importeren overschrijft je huidige data:\n\n${info}\n\nDoorgaan?`,()=>{
        if(data.tasks)    {S.tasks=data.tasks;saveT();}
        if(data.goals)    {S.goals=data.goals;localStorage.setItem('pb_goals',JSON.stringify(S.goals));}
        if(data.notes)    {S.notes=data.notes;localStorage.setItem('pb_notes',JSON.stringify(S.notes));}
        if(data.reviews)  {S.reviews=data.reviews;localStorage.setItem('pb_reviews',JSON.stringify(S.reviews));}
        if(data.promptLib){S.promptLib=data.promptLib;saveL();}
        if(data.templates){S.templates=data.templates;saveTemplates();}
        if(data.presets)  {S.presets=data.presets;savePresets();}
        if(data.colorPresets){localStorage.setItem('pb_color_presets',JSON.stringify(data.colorPresets));}
        if(data.customColors!==undefined){_customColors=data.customColors;localStorage.setItem('pb_custom_colors',JSON.stringify(_customColors));}
        if(data.theme)    applyTheme(data.theme);
        if(data.font)     applyFont(data.font);
        if(data.iconStyle){_iconStyle=data.iconStyle;saveIconStyle();}
        render(); toast('✅ Import geslaagd!');
      },null,'Import bevestigen');
    }catch(err){toast('❌ Ongeldig bestand: '+err.message,6000);}
  };
  reader.readAsText(file); input.value='';
}
function saveGhToken(){
  const t=document.getElementById('gh-token')?.value?.trim()||'';
  localStorage.setItem('pb_gh_token',t);
  toast(t?'✅ Token opgeslagen!':'✅ Token gewist');
}
function toggleGhTokenVis(){
  const el=document.getElementById('gh-token');if(el)el.type=el.type==='password'?'text':'password';
}
async function syncToGitHub(){
  const token=localStorage.getItem('pb_gh_token');
  if(!token){toast('⚠️ Sla eerst een GitHub token op');toggleAcc('backup');return;}
  const btn=document.getElementById('gh-sync-btn');
  if(btn){btn.disabled=true;btn.innerHTML=ic('cloud',13)+' Bezig...';}
  try{
    const content=btoa(unescape(encodeURIComponent(JSON.stringify(getFullExportData(),null,2))));
    const headers={Authorization:`token ${token}`,Accept:'application/vnd.github.v3+json','Content-Type':'application/json'};
    const url=`https://api.github.com/repos/${GH_BACKUP_REPO}/contents/${GH_BACKUP_FILE}`;
    let sha=null;
    const getRes=await fetch(url,{headers});
    if(getRes.ok){sha=(await getRes.json()).sha;}
    const putRes=await fetch(url,{method:'PUT',headers,
      body:JSON.stringify({message:`Orbit backup — ${new Date().toLocaleString('nl-NL')}`,content,...(sha?{sha}:{})})});
    if(!putRes.ok){const e=await putRes.json();throw new Error(e.message);}
    const now=new Date().toLocaleString('nl-NL');
    localStorage.setItem('pb_last_sync',now);
    const lbl=document.getElementById('gh-last-sync');if(lbl)lbl.textContent=now;
    toast('✅ Backup opgeslagen in orbit-data repo!');
  }catch(e){toast('❌ GitHub backup mislukt: '+e.message,7000);}
  finally{if(btn){btn.disabled=false;btn.innerHTML=ic('cloudup',13)+' Backup naar GitHub';}}
}
async function _doRestoreFromGitHub(){
  const token=localStorage.getItem('pb_gh_token');
  const btn=document.getElementById('gh-restore-btn');
  if(btn){btn.disabled=true;btn.innerHTML=ic('cloud',13)+' Bezig...';}
  try{
    const headers={Authorization:`token ${token}`,Accept:'application/vnd.github.v3+json'};
    const res=await fetch(`https://api.github.com/repos/${GH_BACKUP_REPO}/contents/${GH_BACKUP_FILE}`,{headers});
    if(!res.ok)throw new Error('Geen backup gevonden in orbit-data repo');
    const file=await res.json();
    const raw=decodeURIComponent(escape(atob(file.content.replace(/\n/g,''))));
    const data=JSON.parse(raw);
    if(data.tasks)    {S.tasks=data.tasks;saveT();}
    if(data.goals)    {S.goals=data.goals;localStorage.setItem('pb_goals',JSON.stringify(S.goals));}
    if(data.notes)    {S.notes=data.notes;localStorage.setItem('pb_notes',JSON.stringify(S.notes));}
    if(data.reviews)  {S.reviews=data.reviews;localStorage.setItem('pb_reviews',JSON.stringify(S.reviews));}
    if(data.promptLib){S.promptLib=data.promptLib;saveL();}
    if(data.templates){S.templates=data.templates;saveTemplates();}
    if(data.presets)  {S.presets=data.presets;savePresets();}
    if(data.colorPresets){localStorage.setItem('pb_color_presets',JSON.stringify(data.colorPresets));}
    if(data.customColors!==undefined){_customColors=data.customColors;localStorage.setItem('pb_custom_colors',JSON.stringify(_customColors));}
    if(data.theme)    applyTheme(data.theme);
    if(data.font)     applyFont(data.font);
    if(data.iconStyle){_iconStyle=data.iconStyle;saveIconStyle();}
    render(); toast('✅ Data hersteld van GitHub!');
  }catch(e){toast('❌ Herstel mislukt: '+e.message,7000);}
  finally{if(btn){btn.disabled=false;btn.innerHTML=ic('clouddown',13)+' Herstel van GitHub';}}
}
function restoreFromGitHub(){
  const token=localStorage.getItem('pb_gh_token');
  if(!token){toast('⚠️ Sla eerst een GitHub token op');return;}
  orbitConfirm('Dit vervangt al je huidige data met de GitHub backup. Doorgaan?',_doRestoreFromGitHub,null,'Herstel van GitHub');
}

/* ── WEEK PLANNING (review view) ────────────────────────── */
async function generateWeekPlanning(revId){
  const r=S.reviews.find(x=>x.id===revId);if(!r)return;
  const nextWeek=getWeekBounds((S._reviewOffset||0)+1);
  const today=new Date().toISOString().slice(0,10);
  const upcoming=S.tasks.filter(t=>t.deadline&&t.deadline>=today&&t.deadline<=nextWeek.sunStr&&!t.archived);
  const open=S.tasks.filter(t=>!t.archived&&taskPct(t)<100).slice(0,8);
  const goals=S.goals.filter(g=>(g.level||1)<80).slice(0,4);
  const btn=document.getElementById('gen-planning-btn');
  if(btn){btn.disabled=true;btn.textContent='⏳ Bezig...';}
  try{
    const context=`Mijn reflectie: ${r.reflection||'—'}\nDoelen volgende week: ${r.nextGoals||'—'}\nOpen opdrachten:\n${open.map(t=>`- ${t.name||t.input?.goal||'Opdracht'} (${taskPct(t)}% af${t.deadline?', deadline '+t.deadline:''})`).join('\n')||'—'}\nDeadlines komende week:\n${upcoming.map(t=>`- ${t.name||t.input?.goal} → ${t.deadline}`).join('\n')||'Geen'}\nActieve leerdoelen:\n${goals.map(g=>`- ${g.name} (niveau ${g.level||1}/100)`).join('\n')||'Geen'}`;
    const prompt=`Maak een concrete dag-voor-dag weekplanning voor de week van ${nextWeek.label} op basis van:\n\n${context}\n\nGeef voor maandag t/m vrijdag 2-4 concrete, uitvoerbare taken per dag. Gebruik checkboxformat (- [ ]). Houd rekening met de deadlines. Sluit af met een sectie "## Tips voor de week" met 2-3 praktische tips.\n\nFormat:\n## Weekplanning: ${nextWeek.label}\n\n### Maandag\n- [ ] ...\n\n### Dinsdag\n- [ ] ...\n\n(etc.)\n\n## Tips voor de week\n- ...`;
    let result;
    if(S.geminiKey){result=await callGemini(prompt,'weekplanning');}
    else{
      // Lokale fallback
      const days=['Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag'];
      const all=[...upcoming,...open.filter(t=>!upcoming.includes(t))];
      let md=`## Weekplanning: ${nextWeek.label}\n\n`;
      days.forEach((d,i)=>{
        md+=`### ${d}\n`;
        const dt=all.filter((_,idx)=>idx%5===i).slice(0,3);
        if(dt.length)dt.forEach(t=>{md+=`- [ ] ${t.name||t.input?.goal||'Taak'}${t.deadline&&t.deadline<=nextWeek.sunStr?' ⚠️ deadline!':''}\n`;});
        else md+=`- [ ] Voortgang boeken op openstaande taken\n`;
        md+='\n';
      });
      md+=`## Tips voor de week\n- Plan je zwaarste taken vroeg in de week\n- Neem elke dag een korte pauze van 15 minuten\n- Controleer dagelijks je prioriteiten`;
      result=md;
    }
    r.planning=result;r.planningGeneratedAt=new Date().toISOString();
    saveReviews();render();toast('✅ Weekplanning gegenereerd!');
  }catch(e){toast('❌ '+e.message,5000);}
  finally{if(btn){btn.disabled=false;btn.innerHTML=ic('calendar',13)+' Genereer weekplanning';}}
}
