/* ── PROMPT GENEREREN ───────────────────────────────────── */
// Sla laatste gegenereerde prompts op (in-memory, niet persisted)
let _pgResult=null; // { goal, variants:[{name,text}] }

function vPromptGen(){
  const lib=S.promptLib;
  const libHTML=lib.length?lib.map((p,i)=>`<div class="flex items-start gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 group">
    <div class="flex-1 min-w-0"><div class="font-semibold text-xs truncate">${p.name}</div><div class="text-xs text-gray-400 mt-0.5 line-clamp-2">${p.text.slice(0,80)}</div></div>
    <div class="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
      <button class="btn bp text-xs py-1 px-2" onclick="copyPrompt(S.promptLib[${i}].text)" title="Kopieer">📋</button>
      <button class="btn bs text-xs py-1 px-2" onclick="loadPromptIntoImprover(${i})" title="Verbeter">✨</button>
      <button class="btn bs text-xs py-1 px-2" onclick="deletePrompt(${i})" title="Verwijder">🗑️</button>
    </div>
  </div>`).join(''):'<div class="text-sm text-gray-400 py-4 text-center">Nog geen opgeslagen prompts</div>';

  // Resultaten HTML als er gegenereerde prompts zijn
  const resultHTML=_pgResult?`<div class="space-y-3" id="pg-results">
    <div class="flex items-center justify-between">
      <div class="font-semibold text-gray-800">✅ Prompts voor: <em class="text-indigo-600">${_pgResult.goal}</em></div>
      <button class="btn bs text-xs" onclick="_pgResult=null;render()">↩ Nieuw</button>
    </div>
    ${_pgResult.variants.map((v,i)=>`<div class="card p-4 space-y-2">
      <div class="flex items-center justify-between">
        <div class="font-semibold text-sm text-indigo-700">${v.name}</div>
        <div class="flex gap-2">
          <button class="btn bs text-xs py-1" onclick="copyText(document.getElementById('pgv-${i}').value,'Prompt gekopieerd!')">📋 Kopieer</button>
          <button class="btn bp text-xs py-1" onclick="saveToLib('${v.name.replace(/'/g,"\\'")}',document.getElementById('pgv-${i}').value)">💾 Opslaan</button>
          <button class="btn bg text-xs py-1" onclick="loadPGIntoLauncher(${i})">🚀 Stuur naar AI</button>
        </div>
      </div>
      <textarea id="pgv-${i}" class="inp text-sm" rows="5" style="font-family:monospace">${v.text.replace(/</g,'&lt;')}</textarea>
    </div>`).join('')}
  </div>`:'';

  return `<div class="space-y-5">
    <div><h1 class="text-2xl font-bold">⚡ Prompt Generator</h1><p class="text-gray-400 text-sm mt-0.5">Maak krachtige prompts of verbeter bestaande — sla ze op in je bibliotheek</p></div>

    <div class="flex gap-5">
      <!-- Links: genereer + verbeter + resultaten -->
      <div class="flex-1 space-y-4">

        <!-- Verbeter bestaande prompt -->
        <div class="card overflow-hidden">
          <button class="w-full flex items-center justify-between p-4 hover:bg-indigo-50 transition-colors text-left" onclick="toggleAcc('pg-improve')">
            <div class="flex items-center gap-3"><span class="text-lg">✨</span><div><div class="font-bold text-sm">Verbeter een bestaande prompt</div><div class="text-xs text-gray-500">Plak een prompt die je hebt → krijg een verbeterde versie</div></div></div>
            <span id="acc-ic-pg-improve" class="text-gray-400 text-xs">▼</span>
          </button>
          <div id="acc-body-pg-improve" class="hidden border-t border-gray-100 p-4 space-y-3">
            <textarea id="pg-improve-input" class="inp text-sm" rows="5" placeholder="Plak hier een bestaande prompt die je wilt verbeteren...&#10;&#10;Bijv: 'Schrijf een e-mail over onze aanbieding' → wordt verbeterd tot een complete, professionele prompt."></textarea>
            <div class="flex gap-2">
              <button class="btn bp text-sm" id="btn-improve" onclick="improvePrompt()">✨ Verbeter prompt</button>
              <button class="btn bs text-sm" onclick="document.getElementById('pg-improve-input').value=''">Wis</button>
            </div>
            <div id="pg-improved-result" class="hidden space-y-2">
              <label class="lbl">Verbeterde prompt</label>
              <textarea id="pg-improved-out" class="inp text-sm" rows="6" style="font-family:monospace"></textarea>
              <div class="flex gap-2">
                <button class="btn bp text-xs" onclick="copyText(document.getElementById('pg-improved-out').value,'Verbeterde prompt gekopieerd!')">📋 Kopieer</button>
                <button class="btn bs text-xs" onclick="saveToLib('Verbeterde prompt',document.getElementById('pg-improved-out').value)">💾 Opslaan</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Genereer nieuwe prompt -->
        <div class="card p-5 space-y-4">
          <div class="font-bold text-sm">⚡ Nieuwe prompt genereren</div>
          <div><label class="lbl">🎯 Waarvoor wil je een prompt?</label>
            <textarea id="pg-goal" class="inp" rows="2" placeholder="Bijv: professionele e-mails schrijven, code reviewen, klantreviews analyseren..."></textarea></div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="lbl">🤖 Voor welke AI?</label>
              <select id="pg-tool" class="inp"><option>ChatGPT</option><option>Gemini</option><option>Claude</option><option>Copilot</option><option>Algemeen</option></select></div>
            <div><label class="lbl">🔑 Extra vereisten</label>
              <input id="pg-kw" class="inp" placeholder="In het Nederlands, bullet points..."></div>
          </div>
          <div class="flex gap-3 flex-wrap">
            <button id="btn-pg" class="btn bp" onclick="submitPromptGen()">⚡ Genereer 3 varianten</button>
            <button class="btn bs text-sm" onclick="document.getElementById('pg-goal').value=''">Wis</button>
          </div>
          <div>
            <div class="text-xs text-gray-400 mb-1.5">Snel invullen:</div>
            <div class="flex flex-wrap gap-1.5">
              ${['Professionele e-mails schrijven','Code reviews uitvoeren','Klantreviews analyseren','Documenten samenvatten','Social media posts maken','Ideeën brainstormen'].map(ex=>`<button class="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded hover:bg-indigo-100 transition-colors" onclick="document.getElementById('pg-goal').value='${ex}'">${ex}</button>`).join('')}
            </div>
          </div>
        </div>

        <!-- Resultaten (inline) -->
        ${resultHTML}
      </div>

      <!-- Rechts: bibliotheek -->
      <div style="width:280px;flex-shrink:0">
        <div class="card p-4 space-y-2">
          <div class="font-semibold text-sm">${ic('library',14)} Bibliotheek (${lib.length})</div>
          <div class="text-xs text-gray-400">Hover → kopieer, verbeter of verwijder</div>
          <div class="space-y-2 max-h-screen overflow-y-auto">${libHTML}</div>
          ${lib.length?`<button class="btn bs text-xs w-full" onclick="orbitConfirm('Bibliotheek leegmaken?',()=>{S.promptLib=[];saveL();render()},null,'Leegmaken')">🗑️ Leegmaken</button>`:''}
        </div>
      </div>
    </div>
  </div>`;
}

async function submitPromptGen(){
  const goal=document.getElementById('pg-goal')?.value?.trim();
  if(!goal){toast('⚠️ Beschrijf waarvoor je een prompt wilt');return;}
  const tool=document.getElementById('pg-tool')?.value||'Algemeen';
  const kw=document.getElementById('pg-kw')?.value?.trim()||'';
  const btn=document.getElementById('btn-pg');
  if(btn){btn.disabled=true;btn.innerHTML='<span class="spin"></span> Genereren...';}
  // Genereer lokaal (of via Gemini)
  let variants=genPromptVariants(goal,tool,kw);
  if(S.geminiKey){
    try{
      const sys=SP_PROMPT;
      const msg=`Prompt voor: ${goal}\nTool: ${tool}${kw?'\nVereisten: '+kw:''}`;
      const raw=await callGemini(sys,msg);
      variants=parseGeminiPrompts(raw,goal)||variants;
    }catch(e){toast('⚠️ Gemini: '+e.message+' — lokaal gebruikt',4000);}
  }
  _pgResult={goal,variants};
  if(btn){btn.disabled=false;btn.innerHTML='⚡ Genereer 3 varianten';}
  nav('prompt-gen');
}

function genPromptVariants(goal,tool,kw){
  const cat=detCat(goal);
  const roles={marketing:'expert marketeer',schrijven:'professioneel schrijver',plan:'senior projectmanager',analyse:'data-analist',technisch:'senior software engineer',default:'expert assistent'};
  const role=roles[cat]||roles.default;
  const suffix=tool&&tool!=='Algemeen'?`, geoptimaliseerd voor ${tool}`:'';
  const reqs=kw?`\n\nVereisten: ${kw}`:'';
  const v1=`Jij bent een ${role}. Help mij met: ${goal}\n\nAanpak:\n1. Analyseer de situatie grondig\n2. Geef een gestructureerde uitwerking\n3. Sluit af met concrete aanbevelingen\n\nIn het Nederlands${suffix}.${reqs}`;
  const v2=`Geef een stap-voor-stap aanpak voor: ${goal}\n\nFormaat:\n- Stap 1: [wat te doen + waarom + hoelang]\n- Stap 2: ...\n\nPraktisch, concreet en direct uitvoerbaar.${reqs}`;
  const v3=`Analyseer voor- en nadelen en geef een aanbeveling voor: ${goal}\n\n✅ Sterke punten (min. 3)\n⚠️ Aandachtspunten (min. 3)\n💡 Mijn aanbeveling: [concrete conclusie]\n\nIn het Nederlands, objectief en gefundeerd.${reqs}`;
  return[{name:'🎯 Hoofdprompt (rol + structuur)',text:v1},{name:'📋 Stap-voor-stap aanpak',text:v2},{name:'⚖️ Analyse + aanbeveling',text:v3}];
}

function parseGeminiPrompts(raw,goal){
  // Probeer varianten uit Gemini markdown te halen
  const blocks=raw.match(/```[\s\S]*?```/g)||[];
  if(blocks.length>=2){
    const names=['🎯 Hoofdprompt','📋 Variatie 2','⚖️ Variatie 3'];
    return blocks.slice(0,3).map((b,i)=>({name:names[i]||'Variant '+(i+1),text:b.replace(/```\w*\n?/g,'').trim()}));
  }
  return null;
}

async function improvePrompt(){
  const inp=document.getElementById('pg-improve-input')?.value?.trim();
  if(!inp){toast('⚠️ Voer een prompt in om te verbeteren');return;}
  const btn=document.getElementById('btn-improve');
  if(btn){btn.disabled=true;btn.innerHTML='<span class="spin"></span> Verbeteren...';}
  let improved='';
  if(S.geminiKey){
    try{
      improved=await callGemini(
        'Jij bent een expert prompt engineer. Verbeter de gegeven prompt: maak hem duidelijker, specifieker, effectiever en completer. Geef ALLEEN de verbeterde prompt terug, zonder uitleg.',
        inp
      );
    }catch(e){toast('⚠️ Gemini: '+e.message,4000);}
  }
  if(!improved){
    // Lokale verbetering
    improved=`Jij bent een expert op dit gebied. ${inp.replace(/^(schrijf|maak|geef|doe)/i,'')}\n\nBelangrijke vereisten:\n- Wees concreet en specifiek\n- Gebruik een gestructureerde aanpak\n- Lever de output in het Nederlands\n- Sluit af met concrete aanbevelingen\n\nZorg dat de output direct bruikbaar is.`;
  }
  const res=document.getElementById('pg-improved-result');
  const out=document.getElementById('pg-improved-out');
  if(out)out.value=improved;
  if(res)res.classList.remove('hidden');
  if(btn){btn.disabled=false;btn.innerHTML='✨ Verbeter prompt';}
}

function loadPromptIntoImprover(i){
  const p=S.promptLib[i];if(!p)return;
  document.getElementById('acc-body-pg-improve')?.classList.remove('hidden');
  const ic=document.getElementById('acc-ic-pg-improve');if(ic)ic.textContent='▲';
  const el=document.getElementById('pg-improve-input');if(el){el.value=p.text;el.scrollIntoView({behavior:'smooth'});}
  toast('✅ Prompt geladen in verbeteraar!');
}

function loadPGIntoLauncher(i){
  if(!_pgResult)return;
  const v=_pgResult.variants[i];if(!v)return;
  S.lastLaunchPrompt=v.text;
  nav('launcher');
}

function deletePrompt(i){S.promptLib.splice(i,1);saveL();nav('prompt-gen');}
function saveToLib(name,text){if(!text?.trim())return;S.promptLib.unshift({name:name||'Prompt '+Date.now(),text,savedAt:new Date().toISOString()});if(S.promptLib.length>50)S.promptLib=S.promptLib.slice(0,50);saveL();toast('✅ Opgeslagen in bibliotheek!');render();}
