/* ══════════════════════════════════════════════════════════
   ORBIT HELP SYSTEM — paneel · eerste-bezoek · cheatsheet
   ══════════════════════════════════════════════════════════ */

/* ── Helptekst per tool (één databron) ──────────────────── */
const HELP_CONTENT={
  home:{
    title:'Home', icon:'home',
    intro:'Je startpunt. Bekijk in één oogopslag je recente opdrachten, voortgang en snelkoppelingen naar de tools.',
    steps:[
      {icon:'edit',    text:'Klik op een recente opdracht om direct verder te gaan.'},
      {icon:'chart',   text:'De statistieken tonen hoeveel opdrachten je hebt afgerond.'},
      {icon:'prompt',  text:'Gebruik de snelkoppelingen onderaan om direct een tool te starten.'},
    ],
    tip:'Begin elke werkdag op Home — het geeft je overzicht zonder te navigeren.',
  },
  dashboard:{
    title:'Dashboard', icon:'dashboard',
    intro:'Volledig overzicht van al je opdrachten. Filter, zoek en beheer alles op één plek.',
    steps:[
      {icon:'search',  text:'Gebruik de zoekbalk om snel een opdracht terug te vinden.'},
      {icon:'tag',     text:'Filter op tags om gerelateerde opdrachten samen te zien.'},
      {icon:'archive', text:'Archiveer afgeronde opdrachten zodat je lijst overzichtelijk blijft.'},
    ],
    tip:'Voeg tags toe aan opdrachten zodat je ze later makkelijk terugvindt.',
  },
  'new-task':{
    title:'Nieuwe Opdracht', icon:'edit',
    intro:'Maak een nieuwe opdracht aan. Beschrijf je doel en laat de AI een gestructureerde aanpak genereren.',
    steps:[
      {icon:'pencil',  text:'Vul je doel in — hoe specifieker, hoe bruikbaarder het resultaat.'},
      {icon:'template',text:'Kies een sjabloon als startpunt, of begin blanco.'},
      {icon:'ai',      text:'De AI genereert een checklist met concrete, uitvoerbare stappen.'},
    ],
    tip:'Vermeld ook de context (vak, niveau, deadline) voor het best mogelijke resultaat.',
  },
  'prompt-gen':{
    title:'Prompt Genereren', icon:'prompt',
    intro:'Genereer een krachtige AI-prompt op basis van jouw doel. Kopieer hem direct naar ChatGPT, Claude of een andere AI.',
    steps:[
      {icon:'pencil',  text:'Beschrijf wat je wilt bereiken in het tekstveld.'},
      {icon:'manage',  text:'Kies toon, doelgroep en gewenst outputformaat.'},
      {icon:'copy',    text:'Kopieer de gegenereerde prompt met één klik.'},
    ],
    tip:'Sla veelgebruikte prompts op in de bibliotheek — zo hoef je ze niet opnieuw te schrijven.',
  },
  'file-to-ai':{
    title:'Bestand → AI', icon:'upload',
    intro:'Upload een document (PDF, Word, tekst) en laat de AI er direct mee aan de slag gaan.',
    steps:[
      {icon:'upload',  text:'Sleep een bestand naar het uploadgebied of klik om te bladeren.'},
      {icon:'manage',  text:'Kies een preset: samenvatting, checklist, analyse, risico\'s, etc.'},
      {icon:'ai',      text:'De AI verwerkt het document en geeft direct een bruikbaar resultaat.'},
    ],
    tip:'Je kunt meerdere presets na elkaar toepassen op hetzelfde bestand — geen herupladen nodig.',
  },
  'ai-checklist':{
    title:'AI → Checklist', icon:'checklist',
    intro:'Plak tekst of AI-output en zet het automatisch om naar een afvinkbare checklist.',
    steps:[
      {icon:'copy',    text:'Plak tekst, een takenlijst of AI-output in het invoerveld.'},
      {icon:'ai',      text:'De AI herkent taken en structureert ze als geordende checklist.'},
      {icon:'check',   text:'Vink taken af terwijl je werkt — voortgang wordt automatisch opgeslagen.'},
    ],
    tip:'Werkt ook met ongestructureerde tekst — de AI haalt er zelf de taken uit.',
  },
  launcher:{
    title:'AI Launcher', icon:'launcher',
    intro:'Open ChatGPT, Claude, Gemini en meer vanuit één plek — optioneel met een vooraf ingevulde prompt.',
    steps:[
      {icon:'prompt',  text:'Typ optioneel een prompt — die wordt meegestuurd naar de gekozen AI.'},
      {icon:'external',text:'Klik op een tool om hem direct te openen in een nieuw tabblad.'},
      {icon:'star',    text:'Gratis tools zijn gemarkeerd zodat je weet wat geen abonnement vereist.'},
    ],
    tip:'Typ eerst je prompt, klik dan op de AI — zo hoef je hem niet opnieuw in te typen.',
  },
  portfolio:{
    title:'Portfolio & Doelen', icon:'portfolio',
    intro:'Beheer je leer- en werkdoelen, volg je groei over tijd en documenteer je projecten.',
    steps:[
      {icon:'add',      text:'Voeg een doel toe met een beschrijving, categorie en startniveau (1–100).'},
      {icon:'compass',  text:'Gebruik "Nieuwe doelen ontdekken" — beantwoord ~20 AI-vragen en krijg automatisch passende leerdoelen voorgesteld.'},
      {icon:'analyse',  text:'Gebruik "Groei analyseren" om je werk/verslagen door AI te laten beoordelen volgens een strenge HBO-rubric (0–25 punten per leerdoel) — accepteer of weiger de voorgestelde groei per doel.'},
      {icon:'chart',    text:'Werk je niveau bij naarmate je vordert — de groeigeschiedenis per doel wordt bijgehouden (en is te annuleren via ↩).'},
      {icon:'briefcase',text:'Voeg bij elk doel "Mijn werk" toe: tekst, een link naar een site, of een verslag — links worden als nette kaarten weergegeven.'},
      {icon:'paperclip',text:'Voeg in "Bijlagen & links" algemene bestanden/links toe die niet aan één specifiek doel hangen.'},
      {icon:'download', text:'Exporteer een professionele PDF met voorpagina, statistieken, vaardighedenradar, groeidiagram, je werk/links als kaarten en je gekozen kleur & icoonstijl.'},
      {icon:'trash',    text:'Gebruik "Alle groei wissen" om alle niveaus terug te zetten naar je startniveau en de geschiedenis te legen.'},
    ],
    tip:'Koppel opdrachten aan doelen zodat je portfolio automatisch groeit.',
  },
  notes:{
    title:'Notities', icon:'notes',
    intro:'Een snelle, altijd beschikbare notitietool voor ideeën, aantekeningen en links.',
    steps:[
      {icon:'add',     text:'Maak een nieuwe notitie aan via de "+" knop rechtsboven.'},
      {icon:'note',    text:'Schrijf in Markdown — koppen, lijsten en vetgedrukt worden ondersteund.'},
      {icon:'tag',     text:'Voeg tags toe om notities te categoriseren en snel terug te vinden.'},
    ],
    tip:'Gebruik Ctrl+K om snel een notitie te zoeken via de globale zoekfunctie.',
  },
  review:{
    title:'Weekreview', icon:'review',
    intro:'Reflecteer wekelijks op wat goed ging, wat beter kan en wat je doelen zijn voor volgende week.',
    steps:[
      {icon:'edit',    text:'Vul de drie vragen in aan het einde van je week (duurt ±5 minuten).'},
      {icon:'ai',      text:'Laat de AI je review samenvatten en verbeterpunten suggereren.'},
      {icon:'history', text:'Bekijk eerdere reviews om patronen in je werkstijl te herkennen.'},
    ],
    tip:'5 minuten weekreview levert meer inzicht op dan een uur maandoverzicht.',
  },
  settings:{
    title:'Instellingen', icon:'settings',
    intro:'Pas Orbit volledig aan — thema, lettertype, icoonstijl — en beheer al je gegevens.',
    steps:[
      {icon:'palette', text:'Kies een kleurthema dat past bij jouw werkstijl onder "Design".'},
      {icon:'manage',  text:'Stel icoonstijl en lettertype in naar eigen voorkeur.'},
      {icon:'save',    text:'Maak handmatig een backup of herstel data via "Auto-backups".'},
    ],
    tip:'Al je instellingen worden lokaal opgeslagen en blijven bewaard na het sluiten van de app.',
  },
};

/* ── Gezien-tracker (localStorage) ─────────────────────── */
function _helpGetSeen(){return JSON.parse(localStorage.getItem('pb_help_seen')||'{}');}
function _helpMarkSeen(view){
  const s=_helpGetSeen(); s[view]=true;
  localStorage.setItem('pb_help_seen',JSON.stringify(s));
}

/* ── Eerste-bezoek auto-show (optie 3) ─────────────────── */
function helpCheckFirstVisit(view){
  if(!HELP_CONTENT[view])return;
  if(!_helpGetSeen()[view]){
    _helpMarkSeen(view);
    setTimeout(()=>helpShow(view),350);
  }
}

/* ── Toon hulppaneel (optie 2) ──────────────────────────── */
function helpShow(view){
  const c=HELP_CONTENT[view||S.view];
  if(!c)return;
  document.getElementById('help-panel-body').innerHTML=_helpPanelHTML(c);
  document.getElementById('help-panel').style.transform='translateX(0)';
  document.getElementById('help-backdrop').classList.remove('hidden');
  requestAnimationFrame(applyIcons);
}

/* ── Sluit paneel ───────────────────────────────────────── */
function helpClose(){
  document.getElementById('help-panel').style.transform='translateX(100%)';
  document.getElementById('help-backdrop').classList.add('hidden');
}

/* ── Paneel HTML ────────────────────────────────────────── */
function _helpPanelHTML(c){
  return`
    <div class="flex items-center gap-3 mb-5">
      <span style="color:var(--p);display:inline-flex;flex-shrink:0">${ic(c.icon,22)}</span>
      <div class="font-bold text-base" style="color:var(--txt)">${c.title}</div>
    </div>
    <p class="text-sm mb-5" style="color:var(--txt2);line-height:1.65">${c.intro}</p>
    <div class="space-y-3 mb-5">
      ${c.steps.map(s=>`
        <div class="flex items-start gap-3">
          <span class="flex-shrink-0 mt-0.5" style="color:var(--p);display:inline-flex">${ic(s.icon,14)}</span>
          <div class="text-sm" style="color:var(--txt);opacity:.85;line-height:1.55">${s.text}</div>
        </div>
      `).join('')}
    </div>
    ${c.tip?`
    <div class="rounded-xl p-3 text-xs flex items-start gap-2" style="background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.18);color:var(--p);line-height:1.55">
      <span style="flex-shrink:0;display:inline-flex;margin-top:1px">${ic('lightbulb',13)}</span>
      <span><strong>Tip:</strong> ${c.tip}</span>
    </div>`:''}
  `;
}

/* ── Reset gezien (knop in cheatsheet of instellingen) ──── */
function helpResetSeen(){
  localStorage.removeItem('pb_help_seen');
  toast('✅ Hulptips worden opnieuw getoond bij eerste bezoek');
}

/* ── Cheatsheet view (optie 4) ──────────────────────────── */
function vHelp(){
  const cards=Object.entries(HELP_CONTENT).map(([view,c])=>`
    <div class="card p-4 space-y-3" style="transition:box-shadow .15s">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span style="color:var(--p);display:inline-flex">${ic(c.icon,18)}</span>
          <div class="font-bold text-sm" style="color:var(--txt)">${c.title}</div>
        </div>
        <button onclick="helpShow('${view}')" class="btn bs text-xs py-1 px-2" title="Toon in paneel">${ic('question',12)}</button>
      </div>
      <p class="text-xs" style="color:var(--txt2);line-height:1.5">${c.intro}</p>
      <div class="space-y-1.5">
        ${c.steps.map(s=>`
          <div class="flex items-start gap-2">
            <span class="flex-shrink-0 mt-0.5" style="color:var(--p);opacity:.75;display:inline-flex">${ic(s.icon,12)}</span>
            <div class="text-xs" style="color:var(--txt);opacity:.8;line-height:1.4">${s.text}</div>
          </div>
        `).join('')}
      </div>
      ${c.tip?`
      <div class="rounded-lg px-3 py-2 text-xs flex items-start gap-1.5" style="background:rgba(99,102,241,.08);color:var(--p);line-height:1.4">
        <span style="flex-shrink:0;display:inline-flex;margin-top:1px">${ic('lightbulb',11)}</span>
        <span>${c.tip}</span>
      </div>`:''}
    </div>
  `).join('');

  return`
    <div class="space-y-6">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 class="text-2xl font-bold flex items-center gap-2" style="color:var(--txt)">
            <span style="color:var(--p);display:inline-flex">${ic('question',24)}</span> Hulp &amp; Uitleg
          </h1>
          <p class="text-sm mt-1" style="color:var(--txt2)">
            Klik op ${ic('question',13)} bij een tool voor de uitleg in een zijpaneel.
          </p>
        </div>
        <button onclick="helpResetSeen()" class="btn bs text-xs flex items-center gap-1.5">
          ${ic('refresh',13)} Uitleg opnieuw tonen
        </button>
      </div>
      <div class="grid gap-4" style="grid-template-columns:repeat(auto-fill,minmax(290px,1fr))">
        ${cards}
      </div>
    </div>
  `;
}
