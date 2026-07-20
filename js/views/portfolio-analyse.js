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
  if(!wsGoals().length){toast('⚠️ Voeg eerst leerdoelen toe in deze werkruimte');return;}
  const work=document.getElementById('work-context')?.value?.trim()||'';
  const goalLines=wsGoals().map(g=>`LEERDOEL: ${g.name}\nHuidig niveau: ${g.level||1}/100`).join('\n\n');

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

BETEKENIS VAN DE NIVEAUS (1-100): 1-20 = starter (nog geen zelfstandige toepassing), 21-40 = beginner (basiskennis, werkt met veel begeleiding), 41-60 = gemiddeld (past zelfstandig toe in bekende situaties), 61-80 = gevorderd (zelfstandig, onderbouwd, ook in nieuwe situaties), 81-100 = expert (HBO-eindniveau overstijgend, kan anderen begeleiden). Houd hier rekening mee: iemand op niveau 70 laten groeien vergt veel sterker bewijs dan iemand op niveau 25.

HANTEER DEZE HBO-BEOORDELINGSCRITERIA om de DELTA (groei in punten) per leerdoel te bepalen:
- 0 punten — Geen aantoonbaar bewijs van groei, of het werk is puur beschrijvend zonder reflectie of eigen inbreng.
- 1-3 punten — Beginnend niveau: er is werk geleverd, maar het blijft oppervlakkig, weinig onderbouwd of nauwelijks gekoppeld aan het leerdoel. Reflectie ontbreekt of is zeer beperkt.
- 4-7 punten — Basisniveau: het werk toont begrip en correcte toepassing van basisvaardigheden/kennis, met enige reflectie op eigen handelen, maar mist diepgang, kritische analyse of onderbouwde keuzes.
- 8-12 punten — Gevorderd niveau: het werk toont zelfstandige, onderbouwde toepassing met duidelijke keuzes en argumentatie, kritische reflectie op het eigen leerproces (wat ging goed/fout, waarom, en wat zou je anders doen), en concrete koppeling tussen werk en leerdoel.
- 13-18 punten — HBO-eindniveau: het werk toont een complexe, zelfstandige aanpak met expliciete afweging van alternatieven, diepgaande kritische reflectie, transfer naar andere situaties/contexten, en aantoonbare ontwikkeling ten opzichte van eerdere niveaus.
- 19-35 punten — Uitzonderlijk: alleen toekennen bij overtuigend bewijs van een sprong in zelfstandigheid, kwaliteit én reflectie, met expliciete onderbouwing waarom dit een grote groei rechtvaardigt. Dit is uitzondering, geen regel.

Belangrijke richtlijnen bij het toepassen van deze criteria:
- Ken NOOIT meer dan 35 punten per keer toe, ook niet bij uitzonderlijk werk.
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
  const existing=wsGoals().length?wsGoals().map(g=>`- ${g.name} (${g.category})`).join('\n'):'(nog geen leerdoelen)';
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
    if(wsGoals().some(g=>g.name.toLowerCase()===name.toLowerCase()))return;
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
  const goals=wsGoals();
  if(!goals.length){toast('⚠️ Voeg eerst leerdoelen toe in deze werkruimte');return;}

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
    const g=goals.find(x=>x.name.toLowerCase()===rawName.toLowerCase())
      ||goals.find(x=>x.name.toLowerCase().includes(rawName.toLowerCase()))
      ||goals.find(x=>rawName.toLowerCase().includes(x.name.toLowerCase()));
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
          const g=goals.find(x=>x.name.toLowerCase()===cur.name.toLowerCase())
            ||goals.find(x=>x.name.toLowerCase().includes(cur.name.toLowerCase()))
            ||goals.find(x=>cur.name.toLowerCase().includes(x.name.toLowerCase()));
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
