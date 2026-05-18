/* ── AI LAUNCHER SITES ──────────────────────────────────── */
const SITES=[
  {id:'chatgpt',  l:'ChatGPT',   s:'OpenAI',          url:'https://chat.openai.com',       c:'#10a37f',free:false},
  {id:'claude',   l:'Claude.ai', s:'Anthropic',        url:'https://claude.ai/new',         c:'#cc785c',free:false},
  {id:'gemini',   l:'Gemini',    s:'Google · GRATIS',  url:'https://gemini.google.com',     c:'#4285f4',free:true},
  {id:'copilot',  l:'Copilot',   s:'Microsoft·GRATIS', url:'https://copilot.microsoft.com', c:'#0078d4',free:true},
  {id:'perplexity',l:'Perplexity',s:'AI · GRATIS',     url:'https://www.perplexity.ai',     c:'#6d28d9',free:true},
  {id:'deepseek', l:'DeepSeek',  s:'GRATIS',           url:'https://chat.deepseek.com',     c:'#1e293b',free:true},
];

/* ── SETTINGS ───────────────────────────────────────────── */
function vSettings(){
  const tmplListHTML=S.templates.map(t=>`
    <div class="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 group transition-colors">
      <div class="text-xl flex-shrink-0 mt-0.5">${icData(t.ic||'📝',18)}</div>
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-sm">${t.l}</div>
        <div class="text-xs text-gray-400 mt-0.5">${t.goal?'Doel: '+t.goal.slice(0,45)+(t.goal.length>45?'...':''):'Blanco sjabloon'}</div>
        <div class="text-xs text-indigo-400 mt-0.5 truncate">${(t.aiPrompt||'').slice(0,65)}${(t.aiPrompt||'').length>65?'...':''}</div>
      </div>
      <div class="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button class="btn bs text-xs py-1 px-2" onclick="editTemplate('${t.id}')">✏️</button>
        <button class="btn bs text-xs py-1 px-2" style="color:#ef4444" onclick="deleteTemplate('${t.id}')">🗑️</button>
      </div>
    </div>`).join('');

  const presetListHTML=S.presets.map(p=>`
    <div class="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 group transition-colors">
      <div class="text-xl flex-shrink-0 mt-0.5">${icData(p.ic,18)}</div>
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-sm">${p.l}</div>
        <div class="text-xs text-gray-400 mt-0.5 truncate">${(p.p||'').slice(0,80)}${(p.p||'').length>80?'...':''}</div>
      </div>
      <div class="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button class="btn bs text-xs py-1 px-2" onclick="editPreset('${p.id}')">✏️</button>
        <button class="btn bs text-xs py-1 px-2" style="color:#ef4444" onclick="deletePreset('${p.id}')">🗑️</button>
      </div>
    </div>`).join('');

  const _ac=_getActiveColors();

  return `<div class="space-y-3">
    <div class="mb-2"><h1 class="text-2xl font-bold">${ic('wrench',20)} Instellingen</h1><p class="text-gray-400 text-sm mt-0.5">Klik op een sectie om hem te openen of sluiten</p></div>

    <!-- Accordion 0: Design / Thema -->
    <div class="card overflow-hidden">
      <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left" onclick="toggleAcc('design')">
        <div class="flex items-center gap-3">
          <span class="text-xl">${ic('palette',18)}</span>
          <div>
            <div class="font-bold text-sm">Design & Kleuren</div>
            <div class="text-xs text-gray-500">Modus: <strong>${{light:'☀️ Indigo Licht',dark:'🌙 Indigo Donker','mono-light':'⬜ Mono Licht','mono-dark':'⬛ Mono Donker'}[_baseMode]||_baseMode}</strong>${_customColors?'  · <span style="color:var(--p)">●</span> Aangepaste kleuren actief':''}</div>
          </div>
        </div>
        <span id="acc-ic-design" class="text-gray-400 text-xs ml-4">▼</span>
      </button>
      <div id="acc-body-design" class="hidden border-t border-gray-100 p-5 space-y-5">

        <!-- Schema dropdown -->
        <div>
          <div class="font-semibold text-sm mb-2">Kleurschema</div>
          <div class="flex gap-2">
            <select class="inp flex-1" onchange="loadColorPreset(this.value)">
              <option value="light"       ${_baseMode==='light'      &&!_customColors?'selected':''}>☀️ Indigo Licht — blauw/paars</option>
              <option value="dark"        ${_baseMode==='dark'       &&!_customColors?'selected':''}>🌙 Indigo Donker — blauw/paars</option>
              <option value="mono-light"  ${_baseMode==='mono-light' &&!_customColors?'selected':''}>Mono Licht — zwart, wit &amp; grijs</option>
              <option value="mono-dark"   ${_baseMode==='mono-dark'  &&!_customColors?'selected':''}>Mono Donker — zwart, wit &amp; grijs</option>
              ${_colorPresets.length?`<option disabled value="--">──── Opgeslagen ────</option>`:''}
              ${_colorPresets.map(p=>`<option value="${p.id}" ${JSON.stringify(_customColors)===JSON.stringify(p.colors)&&_baseMode===p.mode?'selected':''}>${p.name}</option>`).join('')}
              <option disabled value="--">──────────────────</option>
              <option value="__save">+ Huidige kleuren opslaan als...</option>
            </select>
          </div>
          ${_colorPresets.length?`<div class="flex flex-wrap gap-1 mt-2">${_colorPresets.map(p=>`<span class="inline-flex items-center gap-1 text-xs rounded-full px-2 py-0.5" style="background:var(--btn-s-bg);color:var(--txt)">${p.name}<button onclick="deleteColorPreset('${p.id}')" class="ml-1 opacity-50 hover:opacity-100 hover:text-red-500">×</button></span>`).join('')}</div>`:''}
        </div>

        <!-- Color customizer -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="font-semibold text-sm">Kleuren aanpassen</div>
            ${_customColors?`<button onclick="resetCustomColors()" class="text-xs text-red-500 hover:text-red-700 font-medium">${ic('trash',11)} Resetten</button>`:''}
          </div>
          <div class="space-y-3">
            ${[
              {key:'p',         label:'Accentkleur',       hint:'Knoppen, actieve nav, badges'},
              {key:'sb',        label:'Zijbalk',           hint:'Achtergrond van de sidebar'},
              {key:'navTxt',    label:'Nav tekst',         hint:'Tekst & iconen in de sidebar'},
              {key:'heading',   label:'Koptekst',          hint:'H1/H2 titels in de app'},
              {key:'bg',        label:'Achtergrond',       hint:'Hoofdachtergrond van de pagina'},
              {key:'card',      label:'Kaarten',           hint:'Achtergrond van kaart-blokken'},
              {key:'txt',       label:'Tekst',             hint:'Hoofdtekstkleur van de app'},
              {key:'logoColor',     label:'Logo — Sidebar',    hint:'Kleur van het Orbit logo in de zijbalk'},
              {key:'homeLogoColor', label:'Logo — Home',       hint:'Kleur van het grote logo op de Home pagina'},
            ].map(({key,label,hint})=>{
              const raw=_ac[key]||'#888888';
              // logoColor can be rgba — for color input we need a hex fallback
              const isRgba=raw.startsWith('rgba')||raw.startsWith('rgb(');
              const hexVal=isRgba?'#ffffff':raw;
              return `<div class="flex items-center gap-3">
                <div style="width:34px;height:34px;border-radius:9px;background:${raw};border:2px solid rgba(128,128,128,.2);flex-shrink:0;position:relative;overflow:hidden;cursor:pointer">
                  <input type="color" value="${hexVal}" oninput="setCustomColor('${key}',this.value)"
                    style="position:absolute;inset:-6px;width:calc(100%+12px);height:calc(100%+12px);border:none;cursor:pointer;opacity:0.01;z-index:2">
                  <div style="position:absolute;inset:0;background:${raw};border-radius:7px"></div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium">${label}</div>
                  <div class="text-xs text-gray-400">${hint}</div>
                </div>
                <div class="flex items-center gap-1.5 flex-shrink-0">
                  <span id="clr-lbl-${key}" class="text-xs font-mono" style="color:var(--txt2)">${isRgba?raw:raw.toUpperCase()}</span>
                  <input type="color" value="${hexVal}" oninput="setCustomColor('${key}',this.value)"
                    style="width:20px;height:20px;border:none;border-radius:5px;cursor:pointer;padding:1px;background:transparent">
                </div>
              </div>`;
            }).join('')}
          </div>
          <p class="text-xs mt-3" style="color:var(--txt2)">Klik het gekleurde vlak of het kleine pijltje rechts om een kleur te kiezen.</p>
        </div>

        <!-- ── Icoonstijl dropdown ── -->
        <div class="border-t border-gray-100 pt-4 space-y-2">
          <div class="font-bold text-sm">Icoonstijl</div>
          <select class="inp" onchange="changeIconStyle(this.value)">
            ${ICON_STYLES.map(s=>`<option value="${s.id}" ${_iconStyle===s.id?'selected':''}>${s.l} — ${s.desc}</option>`).join('')}
          </select>
          <p class="text-xs" style="color:var(--txt2)">Phosphor en Material Symbols worden via internet geladen. Emoji werkt altijd offline.</p>
        </div>

        <!-- ── Lettertype dropdown ── -->
        <div class="border-t border-gray-100 pt-4 space-y-2">
          <div class="font-bold text-sm">Lettertype</div>
          <select class="inp" onchange="changeFont(this.value)">
            ${FONTS.map(f=>`<option value="${f.id}" ${_curFont===f.id?'selected':''}>${f.l}</option>`).join('')}
          </select>
          <div class="text-sm font-medium mt-1" style="font-family:${FONTS.find(x=>x.id===_curFont)?.stack||'inherit'}">
            Voorbeeld: Orbit helpt je bouwen — The quick brown fox
          </div>
          <p class="text-xs" style="color:var(--txt2)">Lettertypen worden geladen via Google Fonts. Systeem standaard werkt altijd offline.</p>
        </div>

        <div class="text-center text-xs text-gray-400 pt-1">✦ Orbit — Gemaakt door Karam &amp; Claude Code ✦</div>
      </div>
    </div>

    <!-- Accordion 1: Lokale generator -->
    <div class="card overflow-hidden">
      <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left" onclick="toggleAcc('local')">
        <div class="flex items-center gap-3"><span class="text-xl">${ic('prompt',18)}</span><div><div class="font-bold text-sm">Lokale generator</div><div class="text-xs text-gray-500">Altijd actief — werkt zonder API of internet</div></div><span class="ma ml-2">Actief</span></div>
        <span id="acc-ic-local" class="text-gray-400 text-xs ml-4">▼</span>
      </button>
      <div id="acc-body-local" class="hidden border-t border-gray-100 p-4">
        <p class="text-sm text-gray-600">Genereert gestructureerde analyses, checklists en prompts zonder internet of API sleutel. Altijd beschikbaar als fallback wanneer Gemini niet actief is.</p>
      </div>
    </div>

    <!-- Accordion 2: Gemini AI -->
    <div class="card overflow-hidden">
      <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left" onclick="toggleAcc('gemini')">
        <div class="flex items-center gap-3"><span class="text-xl" style="color:#4285f4">${ic('ai',20)}</span><div><div class="font-bold text-sm">Gemini AI (Google)</div><div class="text-xs text-gray-500">Optioneel gratis · voor betere analyses${S.geminiKey?' · <span style="color:#10b981;font-weight:700">Actief</span>':''}</div></div></div>
        <span id="acc-ic-gemini" class="text-gray-400 text-xs ml-4">▼</span>
      </button>
      <div id="acc-body-gemini" class="hidden border-t border-gray-100 p-5 space-y-4">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          <div class="font-semibold text-blue-900 mb-2">${ic('key',14)} Gratis sleutel ophalen:</div>
          <ol class="list-decimal list-inside text-blue-800 space-y-1 text-xs">
            <li>Ga naar <a href="https://aistudio.google.com/app/apikey" target="_blank" class="underline font-medium">aistudio.google.com/app/apikey</a></li>
            <li>Log in met Google-account</li>
            <li>Klik <strong>"Create API key"</strong> en kopieer de sleutel (<code>AIza...</code>)</li>
          </ol>
          <div class="mt-2 text-xs text-blue-600 font-semibold">${ic('check',13)} Volledig gratis — geen betaalkaart nodig</div>
        </div>
        <div><label class="lbl">Gemini API Sleutel</label>
          <div class="flex gap-2"><input id="gkey" type="password" class="inp flex-1" placeholder="AIza..." value="${S.geminiKey}">
          <button class="btn bs" onclick="const e=document.getElementById('gkey');e.type=e.type==='password'?'text':'password'">${ic('eye',14)}</button></div></div>
        <div class="flex gap-3">
          <button class="btn bp" onclick="saveGem()">${ic('save',14)} Opslaan</button>
          <button class="btn bs" onclick="testGem()">${ic('lab',14)} Test verbinding</button>
          ${S.geminiKey?`<button class="btn bs" style="color:#ef4444" onclick="S.geminiKey='';localStorage.removeItem('pb_gemini');render();toast('Sleutel verwijderd')">${ic('delete',14)} Verwijder</button>`:''}
        </div>
      </div>
    </div>

    <!-- Accordion 3: Sjablonen -->
    <div class="card overflow-hidden">
      <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left" onclick="toggleAcc('tmpls')">
        <div class="flex items-center gap-3"><span class="text-xl">${ic('edit',18)}</span><div><div class="font-bold text-sm">Sjablonen — Nieuwe Opdracht</div><div class="text-xs text-gray-500">${S.templates.length} sjablonen · elk met eigen AI-prompt en variabelen</div></div></div>
        <span id="acc-ic-tmpls" class="text-gray-400 text-xs ml-4">▼</span>
      </button>
      <div id="acc-body-tmpls" class="hidden border-t border-gray-100 p-5 space-y-4">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <p class="text-sm text-gray-600">Beheer de sjablonen in <strong>Nieuwe Opdracht</strong>. Elk sjabloon vult het formulier voor en heeft een eigen AI-prompt met variabelen zoals <code class="bg-gray-100 px-1 rounded text-xs">{{doel}}</code>.</p>
          <div class="flex gap-2 flex-shrink-0">
            <button class="btn bp text-xs" onclick="startAddTemplate()">+ Nieuw sjabloon</button>
            <button class="btn bs text-xs" onclick="resetTemplates()">↺ Standaard</button>
          </div>
        </div>

        <!-- Sjabloon form -->
        <div id="tmpl-form" class="hidden border border-indigo-200 rounded-lg p-4 bg-indigo-50 space-y-3">
          <div class="font-semibold text-indigo-900 text-sm" id="tmpl-form-title">Nieuw sjabloon toevoegen</div>
          <div class="grid grid-cols-4 gap-3">
            <div><label class="lbl">Icoon</label><input id="tf-ic" class="inp text-center text-lg" value="📝" maxlength="4"></div>
            <div class="col-span-3"><label class="lbl">Naam <span class="text-red-400">*</span></label><input id="tf-name" class="inp" placeholder="Bijv: Offerte, Notulen, Presentatie..."></div>
          </div>
          <div class="bg-white rounded-lg border border-indigo-100 p-3 space-y-2">
            <div class="text-xs font-semibold text-gray-500 uppercase">Invulvelden (wat vooringevuld wordt in het formulier)</div>
            <div class="grid grid-cols-2 gap-2">
              <div><label class="lbl">Doel (startwaarde)</label><input id="tf-goal" class="inp" placeholder="Bijv: Schrijf een offerte voor "></div>
              <div><label class="lbl">Doelgroep</label><input id="tf-aud" class="inp" placeholder="Bijv: Klanten"></div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div><label class="lbl">Toon</label><input id="tf-tone" class="inp" placeholder="Bijv: Professioneel en vriendelijk"></div>
              <div><label class="lbl">Output</label><input id="tf-out" class="inp" placeholder="Bijv: Document / rapport"></div>
            </div>
          </div>
          <div>
            <label class="lbl">AI-prompt <span class="text-red-400">*</span></label>
            <div class="flex flex-wrap gap-1 mb-1">
              ${['{{doel}}','{{doelgroep}}','{{toon}}','{{output}}','{{context}}'].map(v=>`<button onclick="const ta=document.getElementById('tf-prompt');ta.value+=this.textContent;ta.focus()" class="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded hover:bg-indigo-200 font-mono">${v}</button>`).join('')}
            </div>
            <textarea id="tf-prompt" class="inp text-sm" rows="7" placeholder="Schrijf hier de AI-prompt. Klik op een variabele hierboven om hem in te voegen.&#10;&#10;Bijv:&#10;Maak een offerte voor: {{doel}}&#10;Doelgroep: {{doelgroep}}&#10;Toon: {{toon}}&#10;{{context}}"></textarea>
          </div>
          <div class="flex gap-2">
            <button class="btn bp text-sm" onclick="saveTmplForm()">💾 Opslaan</button>
            <button class="btn bs text-sm" onclick="cancelTmplForm()">Annuleer</button>
          </div>
        </div>

        <div class="space-y-2">${tmplListHTML||'<div class="text-sm text-gray-400 py-2 text-center">Geen sjablonen.</div>'}</div>
        <div class="text-xs text-gray-400">${S.templates.length} sjablonen · hover om te bewerken of verwijderen</div>
      </div>
    </div>

    <!-- Accordion 4: Presets -->
    <div class="card overflow-hidden">
      <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left" onclick="toggleAcc('presets')">
        <div class="flex items-center gap-3"><span class="text-xl">${ic('upload',18)}</span><div><div class="font-bold text-sm">Presets — Bestand → AI</div><div class="text-xs text-gray-500">${S.presets.length} presets · instructies voor AI-analyse van documenten</div></div></div>
        <span id="acc-ic-presets" class="text-gray-400 text-xs ml-4">▼</span>
      </button>
      <div id="acc-body-presets" class="hidden border-t border-gray-100 p-5 space-y-4">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <p class="text-sm text-gray-600">Beheer de instructies zichtbaar in <strong>Bestand → AI</strong>.</p>
          <div class="flex gap-2 flex-shrink-0">
            <button class="btn bp text-xs" onclick="startAddPreset()">+ Nieuwe preset</button>
            <button class="btn bs text-xs" onclick="resetPresets()">↺ Standaard</button>
          </div>
        </div>

        <!-- Preset form -->
        <div id="preset-form" class="hidden border border-indigo-200 rounded-lg p-4 bg-indigo-50 space-y-3">
          <div class="font-semibold text-indigo-900 text-sm" id="preset-form-title">Nieuwe preset toevoegen</div>
          <div class="grid grid-cols-4 gap-3">
            <div><label class="lbl">Icoon</label><input id="pf-ic" class="inp text-center text-lg" value="💬" maxlength="4"></div>
            <div class="col-span-3"><label class="lbl">Naam <span class="text-red-400">*</span></label><input id="pf-name" class="inp" placeholder="Bijv: Actiepunten, Planning..."></div>
          </div>
          <div>
            <label class="lbl">Instructie aan de AI <span class="text-red-400">*</span></label>
            <textarea id="pf-prompt" class="inp text-sm" rows="5" placeholder="Schrijf hier de volledige instructie die aan de AI gegeven wordt..."></textarea>
            <div class="text-xs text-gray-400 mt-1">Tip: zeg wat het format moet zijn (bijv. - [ ] items) en wat je wilt zien.</div>
          </div>
          <div class="flex gap-2">
            <button class="btn bp text-sm" onclick="savePresetForm()">💾 Opslaan</button>
            <button class="btn bs text-sm" onclick="cancelPresetForm()">Annuleer</button>
          </div>
        </div>

        <div class="space-y-2">${presetListHTML||'<div class="text-sm text-gray-400 py-2 text-center">Geen presets.</div>'}</div>
        <div class="text-xs text-gray-400">${S.presets.length} presets · hover om te bewerken of verwijderen</div>
      </div>
    </div>

    <!-- Accordion 5: Portfolio prompts -->
    <div class="card overflow-hidden">
      <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left" onclick="toggleAcc('portf-prompts')">
        <div class="flex items-center gap-3"><span class="text-xl">${ic('portfolio',18)}</span><div><div class="font-bold text-sm">Portfolio & Analyse prompts</div><div class="text-xs text-gray-500">Pas de standaard prompts aan die de app gebruikt</div></div></div>
        <span id="acc-ic-portf-prompts" class="text-gray-400 text-xs ml-4">▼</span>
      </button>
      <div id="acc-body-portf-prompts" class="hidden border-t border-gray-100 p-5 space-y-5">
        <!-- Analyse prompt template -->
        <div class="space-y-2">
          <div class="font-semibold text-sm">${ic('analyse',14)} Analyse-prompt template</div>
          <div class="text-xs text-gray-500">Gebruik <code class="bg-gray-100 px-1 rounded">{{DOELEN}}</code> voor de leerdoelenlijst en <code class="bg-gray-100 px-1 rounded">{{WERK}}</code> voor het ingevoerde werk. Laat leeg voor de standaard-prompt.</div>
          <textarea id="set-analyse-tpl" class="inp text-sm w-full" rows="8"
            placeholder="Laat leeg voor standaard-prompt. Gebruik {{DOELEN}} en {{WERK}} als plaatshouders."
            >${localStorage.getItem('pb_analyse_prompt_tpl')||''}</textarea>
          <div class="flex gap-2">
            <button class="btn bp text-sm" onclick="saveAnalyseTpl()">💾 Opslaan</button>
            <button class="btn bs text-sm" onclick="localStorage.removeItem('pb_analyse_prompt_tpl');document.getElementById('set-analyse-tpl').value='';toast('✅ Gereset naar standaard')">↺ Reset</button>
          </div>
        </div>
        <!-- Portfolio prompt template -->
        <div class="space-y-2 border-t border-gray-100 pt-4">
          <div class="font-semibold text-sm">${ic('doc',14)} Portfolio-prompt basistemplate</div>
          <div class="text-xs text-gray-500">Dit is de opening van de portfolio-prompt. De app voegt daarna automatisch je doelen, projecten en reflecties toe. Laat leeg voor de standaard.</div>
          <textarea id="set-portfolio-tpl" class="inp text-sm w-full" rows="5"
            placeholder="Laat leeg voor standaard. Bijv: Jij bent een professionele schrijver. Maak een stageverslag voor mij op basis van..."
            >${localStorage.getItem('pb_portfolio_prompt_tpl')||''}</textarea>
          <div class="flex gap-2">
            <button class="btn bp text-sm" onclick="savePortfolioTpl()">💾 Opslaan</button>
            <button class="btn bs text-sm" onclick="localStorage.removeItem('pb_portfolio_prompt_tpl');document.getElementById('set-portfolio-tpl').value='';toast('✅ Gereset naar standaard')">↺ Reset</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Accordion 6: Auto-backups -->
    <div class="card overflow-hidden">
      <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left" onclick="toggleAcc('backups');if(!document.getElementById('acc-body-backups').classList.contains('hidden'))renderBackupSection()">
        <div class="flex items-center gap-3">
          <span class="text-xl">${ic('save',18)}</span>
          <div>
            <div class="font-bold text-sm">Auto-backups</div>
            <div class="text-xs text-gray-500">Automatisch opgeslagen snapshots in IndexedDB — herstel bij dataverlies</div>
          </div>
        </div>
        <span id="acc-ic-backups" class="text-gray-400 text-xs ml-4">▼</span>
      </button>
      <div id="acc-body-backups" class="hidden border-t border-gray-100 p-5 space-y-3">
        <div id="backup-list-content"><div class="text-sm text-gray-400 py-4 text-center">Laden...</div></div>
      </div>
    </div>

    <!-- Accordion 7: Gegevens -->
    <div class="card overflow-hidden">
      <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left" onclick="toggleAcc('data')">
        <div class="flex items-center gap-3"><span class="text-xl">${ic('doc',18)}</span><div><div class="font-bold text-sm">Gegevens & Export</div><div class="text-xs text-gray-500">${S.tasks.length} opdrachten · alles opgeslagen in je browser</div></div></div>
        <span id="acc-ic-data" class="text-gray-400 text-xs ml-4">▼</span>
      </button>
      <div id="acc-body-data" class="hidden border-t border-gray-100 p-5 space-y-5">
        <input type="file" id="orbit-import-file" class="hidden" accept=".json" onchange="handleImport(this)">

        <!-- Local Backup -->
        <div class="rounded-xl border border-gray-200 p-4 space-y-3">
          <div class="flex items-center gap-2 font-semibold text-sm text-gray-700">${ic('doc',15)} Lokale back-up</div>
          <p class="text-xs text-gray-500">Vink aan wat je wilt exporteren. Bij import worden alleen de aangevinkte categorieën overschreven — de rest blijft ongewijzigd.</p>
          <div class="space-y-1 text-xs rounded-lg p-2.5" style="background:var(--bg);border:1px solid var(--card-border)">
            ${[
              {id:'exp-tasks',    label:'Opdrachten',      icKey:'edit',      count:S.tasks.length},
              {id:'exp-notes',    label:'Notities',        icKey:'notes',     count:S.notes.length},
              {id:'exp-goals',    label:'Leerdoelen',      icKey:'portfolio', count:S.goals.length},
              {id:'exp-reviews',  label:'Weekreviews',     icKey:'review',    count:S.reviews.length},
              {id:'exp-prompts',  label:'Promptbibliotheek',icKey:'prompt',   count:S.promptLib.length},
              {id:'exp-templates',label:'Sjablonen',       icKey:'doc',       count:S.templates.length},
              {id:'exp-presets',  label:'Presets',         icKey:'settings',  count:S.presets.length},
              {id:'exp-colors',   label:"Kleurschema's",   icKey:'theme',     count:JSON.parse(localStorage.getItem('pb_color_presets')||'[]').length},
            ].map(r=>`<label class="flex items-center gap-2 cursor-pointer rounded px-1 py-1 hover:bg-gray-100 select-none">
              <input type="checkbox" id="${r.id}" checked class="w-3.5 h-3.5 accent-indigo-600">
              <span class="flex items-center gap-1.5 flex-1" style="color:var(--txt2)">${ic(r.icKey,13)} ${r.label}</span>
              <span class="font-semibold" style="color:var(--txt)">${r.count}</span>
            </label>`).join('')}
          </div>
          <div class="flex gap-2 flex-wrap">
            <button class="btn bs" onclick="exportAll()">${ic('cloudup',13)} Exporteer selectie (JSON)</button>
            <button class="btn bs" onclick="importFromFile()">${ic('clouddown',13)} Importeer JSON</button>
          </div>
        </div>

        <!-- GitHub Sync -->
        <div class="rounded-xl border border-indigo-200 bg-indigo-50 p-4 space-y-3">
          <div class="flex items-center gap-2 font-semibold text-sm text-indigo-700">${ic('cloud',15)} GitHub Sync</div>
          <p class="text-xs text-gray-600">Sla je backup automatisch op in je privé GitHub-repo <code class="bg-white px-1 rounded text-indigo-600">orbit-data</code>. Zo ben je nooit je data kwijt.</p>

          <!-- Token input -->
          <div class="space-y-1">
            <label class="text-xs font-medium text-gray-600">GitHub Personal Access Token (PAT)</label>
            <div class="flex gap-1">
              <input id="gh-token" type="password" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                class="inp flex-1 text-xs font-mono" style="height:34px;padding:0 10px"
                value="${localStorage.getItem('pb_gh_token')||''}">
              <button class="btn bs px-3" style="height:34px" onclick="toggleGhTokenVis()" title="Toon/verberg">${ic('eye',13)}</button>
              <button class="btn" style="height:34px;background:var(--p);color:#fff;border-radius:8px;padding:0 12px;font-size:12px" onclick="saveGhToken()">Opslaan</button>
            </div>
            <p class="text-xs text-gray-400">
              Maak een token via <a href="https://github.com/settings/tokens/new?scopes=repo&description=Orbit+Backup" target="_blank" class="underline text-indigo-500">GitHub → Settings → Tokens</a> · Kies scope: <strong>repo</strong>
            </p>
          </div>

          <!-- Sync buttons -->
          <div class="flex gap-2 flex-wrap items-center">
            <button id="gh-sync-btn" class="btn" style="background:var(--p);color:#fff;border-radius:8px;padding:6px 14px;font-size:12px;display:flex;align-items:center;gap:6px" onclick="syncToGitHub()">${ic('cloudup',13)} Backup naar GitHub</button>
            <button id="gh-restore-btn" class="btn bs" style="display:flex;align-items:center;gap:6px;font-size:12px" onclick="restoreFromGitHub()">${ic('clouddown',13)} Herstel van GitHub</button>
          </div>
          <div class="text-xs text-gray-400">Laatste sync: <span id="gh-last-sync">${localStorage.getItem('pb_last_sync')||'nog nooit'}</span></div>
        </div>

        <!-- Danger zone -->
        <div class="pt-1">
          <button class="btn bs text-xs" style="color:#ef4444" onclick="orbitConfirm('Alle opdrachten permanent wissen?',()=>{S.tasks=[];saveT();nav('dashboard')},null,'Wis opdrachten')">${ic('trash',13)} Wis alle opdrachten</button>
        </div>
        <div class="text-xs text-gray-400">Alles wordt lokaal opgeslagen in je browser (localStorage). Gebruik export of GitHub Sync als back-up.</div>
      </div>
    </div>
  </div>`;
}
