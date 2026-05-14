/* ══════════════════════════════════════════════════════════
   📓  NOTITIES / BRAIN DUMP
   ══════════════════════════════════════════════════════════ */
let _noteSearch='', _noteTag='';

function mkNote(title=''){
  const n={id:mkId(),title:title||'Nieuwe notitie',body:'',tags:[],pinned:false,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
  S.notes.unshift(n);saveNotes();return n;
}
function getAllTags(){
  const t=new Set();S.notes.forEach(n=>n.tags.forEach(tg=>t.add(tg)));return[...t].sort();
}
function filteredNotes(){
  let ns=S.notes;
  if(_noteTag)ns=ns.filter(n=>n.tags.includes(_noteTag));
  if(_noteSearch){const q=_noteSearch.toLowerCase();ns=ns.filter(n=>(n.title+n.body).toLowerCase().includes(q));}
  return[...ns.filter(n=>n.pinned),...ns.filter(n=>!n.pinned)];
}

function vNotes(){
  const notes=filteredNotes();
  const tags=getAllTags();
  const cur=S.nid?S.notes.find(x=>x.id===S.nid):null;

  const noteList=notes.map(n=>{
    const preview=n.body.slice(0,80).replace(/\n/g,' ');
    const rel=relTime(n.updatedAt);
    return `<div class="p-3 rounded-lg cursor-pointer border transition-all ${n.id===S.nid?'bg-indigo-50 border-indigo-300':'bg-white border-gray-200 hover:border-indigo-200'}"
      onclick="S.nid='${n.id}';render()">
      <div class="flex items-center gap-1.5 mb-1">
        ${n.pinned?'<span class="text-yellow-400 text-xs">📌</span>':''}
        <div class="font-semibold text-sm truncate flex-1">${n.title||'Naamloos'}</div>
      </div>
      ${preview?`<div class="text-xs text-gray-400 truncate">${preview}</div>`:''}
      <div class="flex items-center justify-between mt-1">
        <div class="text-xs text-gray-300">${rel}</div>
        ${n.tags.length?`<div class="flex gap-1">${n.tags.slice(0,2).map(t=>`<span class="text-xs bg-indigo-50 text-indigo-500 px-1.5 py-0.5 rounded">${t}</span>`).join('')}</div>`:''}
      </div>
    </div>`;
  }).join('');

  const editorArea=cur?`
    <div class="flex-1 flex flex-col gap-3 min-h-0">
      <!-- Note toolbar -->
      <div class="flex items-center gap-2 flex-wrap">
        <input class="inp text-sm font-bold flex-1" style="min-width:150px" value="${(cur.title||'').replace(/"/g,'&quot;')}"
          onchange="updateNote('${cur.id}','title',this.value)" placeholder="Titel...">
        <button onclick="toggleNotePin('${cur.id}')" class="btn bs text-xs" title="${cur.pinned?'Losmaken':'Vastzetten'}">
          ${cur.pinned?'📌 Losgemaakt':'📌 Vastzetten'}</button>
        <button onclick="copyText(document.getElementById('note-body')?.value||(document.querySelector('.note-preview')?.innerText||''),'Notitie gekopieerd!')" class="btn bs text-xs">📋</button>
        <button onclick="exportNoteMd('${cur.id}')" class="btn bs text-xs">⬇️ .md</button>
        <button onclick="exportNotePDF('${cur.id}')" class="btn bs text-xs">📄 PDF</button>
        <button onclick="deleteNote('${cur.id}')" class="btn bs text-xs" style="color:#ef4444">🗑️</button>
      </div>
      <!-- Tags -->
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-xs text-gray-400 font-semibold">Tags:</span>
        ${cur.tags.map(tg=>`<span class="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full flex items-center gap-1">${tg}
          <button onclick="removeNoteTag('${cur.id}','${tg}')" class="text-indigo-300 hover:text-red-400 font-bold leading-none">×</button></span>`).join('')}
        <input id="tag-inp" class="inp text-xs py-1" style="width:120px" placeholder="+ tag, Enter"
          onkeydown="if(event.key==='Enter'){addNoteTag('${cur.id}',this.value);this.value='';}">
      </div>
      <!-- Markdown toolbar: mode tabs + format buttons -->
      <div class="flex items-center gap-1 flex-wrap border-b border-gray-100 pb-2">
        <button onclick="toggleNoteMdMode('edit')" class="btn text-xs py-0.5 px-2 ${_noteMdMode==='edit'?'bp':'bs'}">✏️ Bewerken</button>
        <button onclick="toggleNoteMdMode('preview')" class="btn text-xs py-0.5 px-2 ${_noteMdMode==='preview'?'bp':'bs'}">👁️ Voorbeeld</button>
        <div class="flex-1"></div>
        ${_noteMdMode==='edit'?`
        <button onclick="mdInsert('**','**')" class="btn bs text-xs py-0.5 px-2 font-bold" title="Vet">B</button>
        <button onclick="mdInsert('*','*')" class="btn bs text-xs py-0.5 px-2 italic" title="Cursief">I</button>
        <button onclick="mdInsert('## ')" class="btn bs text-xs py-0.5 px-2" title="Kop">H2</button>
        <button onclick="mdInsert('- ')" class="btn bs text-xs py-0.5 px-2" title="Lijst">−</button>
        <button onclick="mdInsert('- [ ] ')" class="btn bs text-xs py-0.5 px-2" title="Checkbox">☑</button>
        <button onclick="mdInsert('\`','\`')" class="btn bs text-xs py-0.5 px-2 font-mono" title="Code">&lt;/&gt;</button>`:''}
      </div>
      <!-- Body: edit or preview -->
      ${_noteMdMode==='edit'
        ?`<textarea id="note-body" class="inp flex-1 text-sm resize-none" style="min-height:300px;font-family:inherit;line-height:1.7"
          placeholder="Schrijf hier je notitie, idee, brain dump of aantekening..."
          oninput="updateNote('${cur.id}','body',this.value)">${(cur.body||'').replace(/</g,'&lt;')}</textarea>`
        :`<div class="note-preview prose flex-1 overflow-y-auto text-sm" style="min-height:300px;line-height:1.7;padding:8px 4px">${DOMPurify.sanitize(marked.parse(cur.body||'*Geen inhoud om te tonen.*'))}</div>`
      }
      <div class="text-xs text-gray-300 text-right">${cur.body?.length||0} tekens · ${relTime(cur.updatedAt)}</div>
    </div>`
  :`<div class="flex-1 flex items-center justify-center text-center text-gray-400">
      <div><div class="text-5xl mb-3">📓</div>
      <div class="font-semibold mb-1">Selecteer een notitie</div>
      <div class="text-sm">of maak een nieuwe aan</div></div>
    </div>`;

  return `<div class="space-y-4">
    <div class="flex items-center justify-between">
      <div><h1 class="text-2xl font-bold">📓 Notities</h1>
        <p class="text-gray-400 text-sm mt-0.5">Brain dump, ideeën, aantekeningen — alles op één plek</p></div>
      <button class="btn bp" onclick="createNote()">➕ Nieuwe notitie</button>
    </div>
    <div class="flex gap-4" style="min-height:580px">
      <!-- Linker paneel: lijst -->
      <div style="width:260px;flex-shrink:0" class="flex flex-col gap-2">
        <input class="inp text-sm" placeholder="🔍 Zoeken..." value="${_noteSearch}"
          oninput="_noteSearch=this.value;render()">
        ${tags.length?`<div class="flex flex-wrap gap-1">
          <button onclick="_noteTag='';render()" class="text-xs px-2 py-0.5 rounded-full border ${!_noteTag?'bg-indigo-600 text-white border-indigo-600':'bg-white text-gray-500 border-gray-200'}">Alle</button>
          ${tags.map(t=>`<button onclick="_noteTag='${t}';render()" class="text-xs px-2 py-0.5 rounded-full border ${_noteTag===t?'bg-indigo-600 text-white border-indigo-600':'bg-white text-gray-500 border-gray-200'}">${t}</button>`).join('')}
        </div>`:''}
        <div class="space-y-1.5 overflow-y-auto flex-1" style="max-height:500px">
          ${noteList||'<div class="text-xs text-gray-400 text-center py-4">Geen notities gevonden</div>'}
        </div>
      </div>
      <!-- Rechter paneel: editor -->
      <div class="flex-1 card p-4 flex flex-col gap-3">
        ${editorArea}
      </div>
    </div>
  </div>`;
}

function createNote(){
  const n=mkNote();S.nid=n.id;render();
  setTimeout(()=>document.querySelector('#note-body')?.focus(),50);
  toast('📓 Notitie aangemaakt');
}
function updateNote(id,field,val){
  const n=S.notes.find(x=>x.id===id);if(!n)return;
  n[field]=val;n.updatedAt=new Date().toISOString();saveNotes();
}
function toggleNotePin(id){
  const n=S.notes.find(x=>x.id===id);if(!n)return;
  n.pinned=!n.pinned;saveNotes();render();
}
function deleteNote(id){
  if(!confirm('Notitie verwijderen?'))return;
  S.notes=S.notes.filter(x=>x.id!==id);
  if(S.nid===id)S.nid=S.notes[0]?.id||null;
  saveNotes();render();
}
function addNoteTag(id,tag){
  const t=tag.trim().toLowerCase();if(!t)return;
  const n=S.notes.find(x=>x.id===id);if(!n||n.tags.includes(t))return;
  n.tags.push(t);saveNotes();render();
}
function removeNoteTag(id,tag){
  const n=S.notes.find(x=>x.id===id);if(!n)return;
  n.tags=n.tags.filter(t=>t!==tag);saveNotes();render();
}
function exportNoteMd(id){
  const n=S.notes.find(x=>x.id===id);if(!n)return;
  const md=`# ${n.title||'Notitie'}\n\n*${new Date(n.createdAt).toLocaleDateString('nl-NL')}*${n.tags.length?' · Tags: '+n.tags.join(', '):''}\n\n${n.body}`;
  dlMd(md,n.title||'notitie');
}
function bindNoteEditor(){
  // Zorg dat textarea altijd actuele waarde heeft (na render)
  const cur=S.nid?S.notes.find(x=>x.id===S.nid):null;
  const ta=document.getElementById('note-body');
  if(ta&&cur)ta.value=cur.body||'';
}
function toggleNoteMdMode(mode){
  _noteMdMode=mode;
  localStorage.setItem('pb_note_md_mode',mode);
  render();
}
function mdInsert(before,after=''){
  const ta=document.getElementById('note-body');if(!ta)return;
  const start=ta.selectionStart,end=ta.selectionEnd;
  const sel=ta.value.slice(start,end);
  const ins=before+sel+after;
  ta.setRangeText(ins,start,end,'select');
  ta.focus();
  // Trigger update
  const cur=S.nid?S.notes.find(x=>x.id===S.nid):null;
  if(cur){cur.body=ta.value;cur.updatedAt=new Date().toISOString();saveNotes();}
}
function relTime(iso){
  if(!iso)return'';
  const diff=Date.now()-new Date(iso).getTime();
  const min=Math.floor(diff/60000),hr=Math.floor(min/60),day=Math.floor(hr/24);
  if(min<1)return'zojuist';if(min<60)return min+'m geleden';
  if(hr<24)return hr+'u geleden';if(day<7)return day+'d geleden';
  return new Date(iso).toLocaleDateString('nl-NL',{day:'2-digit',month:'short'});
}
