/* ── HOME PAGE ───────────────────────────────────────────── */
function vHome(){
  const isDark=document.body.classList.contains('theme-dark');

  const features=[
    {ic:'edit',      title:'Nieuwe Opdracht',      desc:'Analyseer opdrachten en splits ze automatisch op in subopdrachten, checklists en uitvoerbare taken.',         view:'new-task'},
    {ic:'prompt',    title:'Prompt Genereren',      desc:'Bouw krachtige AI-prompts van een simpele beschrijving. Compleet met outputformat en kwaliteitscriteria.',    view:'prompt-gen'},
    {ic:'upload',    title:'Bestand → AI',          desc:'Upload of plak tekst, briefings of Markdown. Orbit controleert structuur, duidelijkheid en uitvoerbaarheid.',  view:'file-to-ai'},
    {ic:'checklist', title:'AI → Checklist',        desc:'Plak een AI-antwoord en zet het om naar een interactieve afvinkbare checklist die je kunt bewaren.',           view:'ai-checklist'},
    {ic:'launcher',  title:'AI Launcher',           desc:'Start direct bij ChatGPT, Gemini, Claude of Copilot. Kopieer je prompt met één klik en open de AI-tool.',     view:'launcher'},
    {ic:'portfolio', title:'Portfolio & Doelen',    desc:'Stel persoonlijke doelen, volg mijlpalen en beheer je projecten overzichtelijk op één plek.',                  view:'portfolio'},
    {ic:'notes',     title:'Notities',              desc:'Bewaar ideeën, aantekeningen en AI-antwoorden in je persoonlijk logboek. Altijd binnen handbereik.',           view:'notes'},
    {ic:'review',    title:'Weekreview',            desc:'Kijk terug op je week: wat ging goed, wat kan beter? Maak gestructureerde reflecties en plan je volgende stap.',view:'review'},
  ];

  return `<div class="space-y-10">

    <!-- ── Hero ── -->
    <div class="text-center pt-10 pb-6">
      <div class="flex justify-center mb-5">
        <svg viewBox="0 0 100 100" width="108" height="108" xmlns="http://www.w3.org/2000/svg"
             style="color:var(--home-logo-color,#1e1b4b);filter:${isDark?'drop-shadow(0 0 18px rgba(129,140,248,.35))':'none'}">
          <path d="M 88 23 A 47 13 -35 0 0 12 77" fill="none" stroke="currentColor" stroke-width="3.8" stroke-linecap="round"/>
          <circle cx="50" cy="50" r="31" fill="none" stroke="currentColor" stroke-width="10.5"/>
          <path d="M 88 23 A 47 13 -35 0 1 12 77" fill="none" stroke="currentColor" stroke-width="3.8" stroke-linecap="round"/>
          <circle cx="12" cy="77" r="8" fill="currentColor"/>
          <circle cx="88" cy="23" r="5" fill="currentColor"/>
        </svg>
      </div>

      <h1 class="text-5xl font-bold tracking-tight mb-2" style="color:var(--heading-color)">Orbit</h1>
      <p class="text-xs font-semibold tracking-widest mb-5" style="color:var(--txt2);letter-spacing:.22em">AI WORKFLOW TOOL</p>

      <p class="text-base max-w-lg mx-auto leading-relaxed" style="color:var(--txt2)">
        Minder nadenken. Meer bouwen.<br>
        Maak van elk idee direct een uitvoerbare AI-workflow.
      </p>

      <div class="flex flex-wrap gap-3 justify-center mt-7 items-center">
        <button class="btn bp px-7 py-2.5 font-semibold text-sm" onclick="nav('portfolio')">
          ${ic('portfolio',15)} Portfolio &amp; Doelen
        </button>
        <button class="btn bs px-7 py-2.5 font-semibold text-sm" onclick="nav('new-task')">
          ${ic('edit',15)} Nieuwe opdracht
        </button>
        <button class="btn bp px-9 py-3.5 font-bold text-base" style="box-shadow:0 6px 22px color-mix(in srgb,var(--p) 45%,transparent)" onclick="openIntroVideo()">
          ${ic('play',18)} Bekijk de intro
        </button>
      </div>
    </div>

    <!-- ── Feature kaarten ── -->
    <div>
      <h2 class="text-xl font-bold mb-1" style="color:var(--heading-color)">Alles wat Orbit kan</h2>
      <p class="text-sm mb-5" style="color:var(--txt2)">Klik op een kaart om direct te starten</p>

      <div class="grid grid-cols-2 gap-4">
        ${features.map(f=>`
          <div onclick="nav('${f.view}')"
               class="card cursor-pointer hover:shadow-md transition-all group border border-transparent hover:border-[var(--p)] rounded-xl p-5 flex gap-4 items-start">
            <div class="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-bold"
                 style="background:var(--p);color:var(--icon-txt,#fff);box-shadow:0 2px 8px color-mix(in srgb,var(--p) 40%,transparent)">
              ${ic(f.ic,18)}
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-sm mb-1 group-hover:text-[var(--p)] transition-colors" style="color:var(--txt)">${f.title}</div>
              <div class="text-xs leading-relaxed" style="color:var(--txt2)">${f.desc}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <!-- ── Footer ── -->
    <div class="text-center text-xs pb-4" style="color:var(--txt2);opacity:.6;font-family:var(--font-family)">
      ✦ Orbit — Gemaakt door Karam &amp; Claude Code ✦
    </div>
  </div>`;
}

/* ── Intro-video overlay ─────────────────────────────────── */
function openIntroVideo(){
  if(document.getElementById('intro-overlay'))return;
  const ov=document.createElement('div');
  ov.id='intro-overlay';
  ov.style.cssText='position:fixed;inset:0;z-index:9999;background:#0c0a1d;display:flex;flex-direction:column';
  ov.innerHTML=`
    <button onclick="closeIntroVideo()" title="Sluiten"
      style="position:absolute;top:14px;right:16px;z-index:10;width:40px;height:40px;border-radius:50%;
      background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);color:#fff;font-size:18px;
      cursor:pointer;display:flex;align-items:center;justify-content:center">✕</button>
    <iframe src="orbit-intro.html" style="flex:1;width:100%;border:none" title="Orbit introductie"></iframe>`;
  document.body.appendChild(ov);
  document.addEventListener('keydown',_introEscClose);
}
function closeIntroVideo(){
  document.getElementById('intro-overlay')?.remove();
  document.removeEventListener('keydown',_introEscClose);
}
function _introEscClose(e){if(e.key==='Escape')closeIntroVideo();}
