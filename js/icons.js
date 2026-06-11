/* ══════════════════════════════════════════════════════════
   ICON SYSTEM
   ══════════════════════════════════════════════════════════ */
const ICON_STYLES=[
  {id:'emoji',   l:'Emoji',                  desc:'Kleurrijke symbolen'},
  {id:'lu',      l:'Lucide',                 desc:'Strakke lijnpictogrammen'},
  {id:'ma-out',  l:'Material Outlined',      desc:'Google — open omlijning'},
  {id:'ma-rnd',  l:'Material Rounded',       desc:'Google — afgeronde vormen'},
  {id:'ma-shp',  l:'Material Sharp',         desc:'Google — scherpe hoeken'},
  {id:'ph',      l:'Phosphor Regular',       desc:'Verfijnd & veelzijdig'},
  {id:'ph-thin', l:'Phosphor Thin',          desc:'Ultra licht & minimaal'},
  {id:'ph-bold', l:'Phosphor Bold',          desc:'Dik & goed leesbaar'},
  {id:'ph-fill', l:'Phosphor Filled',        desc:'Gevuld & krachtig'},
  {id:'ph-duo',  l:'Phosphor Duotone',       desc:'Twee-kleurige diepte'},
];

// emoji → {lucide name, material name, phosphor name}
const ICONS={
  home:      {em:'🏠', lu:'home',           ma:'home',            ph:'house'},
  dashboard: {em:'📊', lu:'layout-dashboard',ma:'dashboard',       ph:'squares-four'},
  edit:      {em:'✏️', lu:'pencil',          ma:'edit',            ph:'pencil-simple'},
  prompt:    {em:'⚡', lu:'zap',             ma:'bolt',            ph:'lightning'},
  upload:    {em:'📤', lu:'upload',          ma:'upload',          ph:'upload-simple'},
  checklist: {em:'📥', lu:'inbox',           ma:'move_to_inbox',   ph:'tray-arrow-down'},
  launcher:  {em:'🌐', lu:'globe',           ma:'language',        ph:'globe'},
  portfolio: {em:'🎯', lu:'target',          ma:'adjust',          ph:'target'},
  notes:     {em:'📓', lu:'notebook-pen',    ma:'menu_book',       ph:'notebook'},
  review:    {em:'📊', lu:'bar-chart-2',     ma:'bar_chart',       ph:'chart-bar'},
  settings:  {em:'⚙️', lu:'settings',        ma:'settings',        ph:'gear'},
  add:       {em:'➕', lu:'plus',            ma:'add',             ph:'plus'},
  delete:    {em:'🗑️', lu:'trash-2',         ma:'delete',          ph:'trash'},
  copy:      {em:'📋', lu:'clipboard',       ma:'content_copy',    ph:'clipboard'},
  download:  {em:'⬇️', lu:'download',        ma:'download',        ph:'download-simple'},
  save:      {em:'💾', lu:'save',            ma:'save',            ph:'floppy-disk'},
  archive:   {em:'📦', lu:'package',         ma:'inventory_2',     ph:'package'},
  search:    {em:'🔍', lu:'search',          ma:'search',          ph:'magnifying-glass'},
  check:     {em:'✅', lu:'check-circle-2',  ma:'check_circle',    ph:'check-circle'},
  warning:   {em:'⚠️', lu:'triangle-alert',  ma:'warning',         ph:'warning'},
  info:      {em:'💡', lu:'lightbulb',       ma:'lightbulb',       ph:'lightbulb'},
  ai:        {em:'🤖', lu:'bot',             ma:'smart_toy',       ph:'robot'},
  clock:     {em:'🕐', lu:'clock',           ma:'schedule',        ph:'clock'},
  book:      {em:'📖', lu:'book-open',       ma:'menu_book',       ph:'book-open'},
  flag:      {em:'🏁', lu:'flag',            ma:'flag',            ph:'flag-checkered'},
  target:    {em:'🎯', lu:'target',          ma:'ads_click',       ph:'target'},
  chart:     {em:'📈', lu:'trending-up',     ma:'trending_up',     ph:'trend-up'},
  radar:     {em:'🕸️', lu:'activity',        ma:'radar',           ph:'chart-polar'},
  palette:   {em:'🎨', lu:'palette',         ma:'palette',         ph:'paint-palette'},
  moon:      {em:'🌙', lu:'moon',            ma:'dark_mode',       ph:'moon'},
  sun:       {em:'☀️', lu:'sun',             ma:'light_mode',      ph:'sun'},
  pin:       {em:'📌', lu:'pin',             ma:'push_pin',        ph:'push-pin'},
  mail:      {em:'📧', lu:'mail',            ma:'mail',            ph:'envelope'},
  brain:     {em:'🧠', lu:'brain',           ma:'psychology',      ph:'brain'},
  layout:    {em:'📋', lu:'layout-template', ma:'table_chart',     ph:'layout'},
  tag:       {em:'🏷️', lu:'tag',             ma:'label',           ph:'tag'},
  link:      {em:'🔗', lu:'link',            ma:'link',            ph:'link'},
  star:      {em:'⭐', lu:'star',            ma:'star',            ph:'star'},
  refresh:   {em:'🔄', lu:'refresh-cw',      ma:'refresh',         ph:'arrows-clockwise'},
  close:     {em:'✕',  lu:'x',              ma:'close',           ph:'x'},
  undo:      {em:'↩️', lu:'undo-2',          ma:'undo',            ph:'arrow-counter-clockwise'},
  send:      {em:'🚀', lu:'send',            ma:'send',            ph:'paper-plane-tilt'},
  lock:      {em:'🔒', lu:'lock',            ma:'lock',            ph:'lock'},
  analyse:   {em:'🔬', lu:'microscope',      ma:'biotech',         ph:'magnifying-glass'},
  doc:       {em:'📄', lu:'file-text',       ma:'description',     ph:'file-text'},
  milestone: {em:'🏁', lu:'milestone',       ma:'flag',            ph:'flag-pennant'},
  sparkle:   {em:'✨', lu:'sparkles',        ma:'auto_awesome',    ph:'sparkle'},
  growth:    {em:'📈', lu:'trending-up',     ma:'show_chart',      ph:'trend-up'},
  project:   {em:'📁', lu:'folder',          ma:'folder',          ph:'folder'},
  logbook:   {em:'📖', lu:'book-marked',     ma:'auto_stories',    ph:'book-bookmark'},
  template:  {em:'⚡', lu:'layout-template', ma:'dashboard_customize',ph:'squares-four'},
  manage:    {em:'⚙️', lu:'sliders-horizontal',ma:'tune',          ph:'sliders-horizontal'},
  history:   {em:'🕐', lu:'history',         ma:'history',         ph:'clock-counter-clockwise'},
  orbit:     {em:'⭕', lu:'orbit',           ma:'workspaces',      ph:'circle-dashed'},
  cloud:     {em:'☁️', lu:'cloud',           ma:'cloud',           ph:'cloud'},
  cloudup:   {em:'⬆️', lu:'cloud-upload',    ma:'cloud_upload',    ph:'cloud-arrow-up'},
  clouddown: {em:'⬇️', lu:'cloud-download',  ma:'cloud_download',  ph:'cloud-arrow-down'},
  eye:       {em:'👁️', lu:'eye',             ma:'visibility',      ph:'eye'},
  question:  {em:'❓', lu:'circle-help',     ma:'help',            ph:'question'},
  bug:       {em:'🐛', lu:'bug',             ma:'bug_report',      ph:'bug'},
  sparkles:  {em:'✨', lu:'sparkles',        ma:'auto_awesome',    ph:'sparkle'},
  pencil:    {em:'✏️', lu:'pencil',          ma:'edit',            ph:'pencil-simple'},
  import:    {em:'📥', lu:'log-in',          ma:'login',           ph:'sign-in'},
  compass:   {em:'🧭', lu:'compass',         ma:'explore',         ph:'compass'},
  // ── Formulier-labels ──
  palette:   {em:'🎨', lu:'palette',         ma:'palette',         ph:'palette'},
  clipboard: {em:'📋', lu:'clipboard-list',  ma:'assignment',      ph:'clipboard-text'},
  caldate:   {em:'📅', lu:'calendar',        ma:'event',           ph:'calendar'},
  paperclip: {em:'📎', lu:'paperclip',       ma:'attach_file',     ph:'paperclip'},
  library:   {em:'📚', lu:'library',         ma:'local_library',   ph:'books'},
  users:     {em:'👥', lu:'users',           ma:'group',           ph:'users'},
  // ── Sjabloon-iconen ──
  note:      {em:'📝', lu:'file-pen-line',   ma:'edit_note',       ph:'note-pencil'},
  megaphone: {em:'📣', lu:'megaphone',       ma:'campaign',        ph:'megaphone'},
  email:     {em:'📧', lu:'mail',            ma:'mail',            ph:'envelope'},
  briefcase: {em:'💼', lu:'briefcase',       ma:'work',            ph:'briefcase'},
  mobile:    {em:'📱', lu:'smartphone',      ma:'smartphone',      ph:'device-mobile'},
  search:    {em:'🔍', lu:'search',          ma:'search',          ph:'magnifying-glass'},
  // ── Diversen ──
  wrench:    {em:'🔧', lu:'wrench',          ma:'build',           ph:'wrench'},
  warning:   {em:'⚠️', lu:'triangle-alert', ma:'warning',         ph:'warning'},
  calendar:  {em:'🗓️', lu:'calendar-days',  ma:'calendar_month',  ph:'calendar-dots'},
  key:       {em:'🔑', lu:'key-round',       ma:'key',             ph:'key'},
  thought:   {em:'💭', lu:'message-circle',  ma:'chat_bubble_outline',ph:'chat-circle-dots'},
  lab:       {em:'🧪', lu:'flask-conical',   ma:'science',         ph:'flask'},
  scale:     {em:'⚖️', lu:'scale',           ma:'balance',         ph:'scales'},
  folderopen:{em:'📂', lu:'folder-open',     ma:'folder_open',     ph:'folder-open'},
  lightbulb: {em:'💡', lu:'lightbulb',       ma:'lightbulb',       ph:'lightbulb'},
  chat:      {em:'💬', lu:'message-circle',  ma:'chat',            ph:'chat-circle'},
  fire:      {em:'🔥', lu:'flame',           ma:'local_fire_department',ph:'fire'},
  trash:     {em:'🗑️', lu:'trash-2',        ma:'delete',          ph:'trash'},
  award:     {em:'🏆', lu:'trophy',          ma:'emoji_events',    ph:'trophy'},
  pin:       {em:'📌', lu:'map-pin',         ma:'push_pin',        ph:'map-pin'},
  free:      {em:'🆓', lu:'badge-check',     ma:'verified',        ph:'seal-check'},
  external:  {em:'🔗', lu:'external-link',   ma:'open_in_new',     ph:'arrow-square-out'},
  copy:      {em:'📋', lu:'copy',            ma:'content_copy',    ph:'copy'},
  download:  {em:'⬇️', lu:'download',        ma:'download',        ph:'download-simple'},
  globe3:    {em:'🌍', lu:'globe-2',         ma:'public',          ph:'globe-hemisphere-west'},
  clock2:    {em:'⏰', lu:'alarm-clock',     ma:'alarm',           ph:'alarm'},
  robot:     {em:'🤖', lu:'bot',             ma:'smart_toy',       ph:'robot'},
  ruler:     {em:'📐', lu:'ruler',           ma:'straighten',      ph:'ruler'},
  package:   {em:'📦', lu:'package',         ma:'inventory_2',     ph:'package'},
  globe4:    {em:'🌐', lu:'globe',           ma:'language',        ph:'globe'},
  sparkles:  {em:'🌟', lu:'star',            ma:'star',            ph:'star'},
};

// Emoji → icon key reverse lookup (for post-render processing)
// Also maps stripped (no variation-selector) versions so ⚠️ and ⚠ both work
const EMOJI_TO_KEY={};
Object.entries(ICONS).forEach(([k,v])=>{
  if(!v.em)return;
  EMOJI_TO_KEY[v.em]=k;
  const base=v.em.replace(/[︎️]/g,'');
  if(base!==v.em) EMOJI_TO_KEY[base]=k;
});

// Helper: render a stored emoji (from template/preset data) in the current icon style
function icData(em,sz=15){
  if(!em)return'';
  // Direct ICONS key (e.g. 'bug', 'sparkles') — used in new preset data
  if(ICONS[em]){
    if(_iconStyle==='emoji')return ICONS[em].em;
    return`<span class="ic-wrap" style="display:inline-flex;align-items:center;vertical-align:middle">${ic(em,sz)}</span>`;
  }
  // Emoji string — used in legacy stored data
  if(_iconStyle==='emoji')return em;
  const base=em.replace(/[︎️]/g,'').trim();
  const key=EMOJI_TO_KEY[em]||EMOJI_TO_KEY[base];
  if(key)return`<span class="ic-wrap" style="display:inline-flex;align-items:center;vertical-align:middle">${ic(key,sz)}</span>`;
  return em;
}

/* ── FONTS ──────────────────────────────────────────────── */
const FONTS=[
  {id:'system',    l:'Systeem standaard',  preview:'Segoe UI',          stack:"'Segoe UI',system-ui,sans-serif",       google:null},
  {id:'inter',     l:'Inter',              preview:'Inter',             stack:"'Inter',sans-serif",                    google:'Inter:ital,opsz,wght@0,14,400..700'},
  {id:'poppins',   l:'Poppins',            preview:'Poppins',           stack:"'Poppins',sans-serif",                  google:'Poppins:wght@400;500;600;700'},
  {id:'roboto',    l:'Roboto',             preview:'Roboto',            stack:"'Roboto',sans-serif",                   google:'Roboto:wght@400;500;700'},
  {id:'nunito',    l:'Nunito',             preview:'Nunito',            stack:"'Nunito',sans-serif",                   google:'Nunito:wght@400;500;600;700'},
  {id:'dmsans',    l:'DM Sans',            preview:'DM Sans',           stack:"'DM Sans',sans-serif",                  google:'DM+Sans:opsz,wght@9..40,400..700'},
  {id:'lato',      l:'Lato',               preview:'Lato',              stack:"'Lato',sans-serif",                     google:'Lato:wght@400;700'},
  {id:'raleway',   l:'Raleway',            preview:'Raleway',           stack:"'Raleway',sans-serif",                  google:'Raleway:wght@400;500;600;700'},
  {id:'montserrat',l:'Montserrat',         preview:'Montserrat',        stack:"'Montserrat',sans-serif",               google:'Montserrat:wght@400;500;600;700'},
  {id:'outfit',    l:'Outfit',             preview:'Outfit',            stack:"'Outfit',sans-serif",                   google:'Outfit:wght@400;500;600;700'},
  {id:'sora',      l:'Sora',               preview:'Sora',              stack:"'Sora',sans-serif",                     google:'Sora:wght@400;500;600;700'},
  {id:'jakarta',   l:'Plus Jakarta Sans',  preview:'Plus Jakarta Sans', stack:"'Plus Jakarta Sans',sans-serif",        google:'Plus+Jakarta+Sans:wght@400;500;600;700'},
  {id:'figtree',   l:'Figtree',            preview:'Figtree',           stack:"'Figtree',sans-serif",                  google:'Figtree:wght@400;500;600;700'},
  {id:'spaceg',    l:'Space Grotesk',      preview:'Space Grotesk',     stack:"'Space Grotesk',sans-serif",            google:'Space+Grotesk:wght@400;500;600;700'},
  {id:'lexend',    l:'Lexend',             preview:'Lexend',            stack:"'Lexend',sans-serif",                   google:'Lexend:wght@400;500;600;700'},
];
let _curFont=localStorage.getItem('pb_font')||'system';
function applyFont(id){
  const f=FONTS.find(x=>x.id===id)||FONTS[0];
  _curFont=id; localStorage.setItem('pb_font',id);
  if(f.google){
    const lid='gf-'+id;
    if(!document.getElementById(lid)){
      const lnk=document.createElement('link');
      lnk.id=lid; lnk.rel='stylesheet';
      lnk.href=`https://fonts.googleapis.com/css2?family=${f.google}&display=swap`;
      document.head.appendChild(lnk);
    }
  }
  document.documentElement.style.setProperty('--font-family',f.stack);
}
function changeFont(id){
  applyFont(id);
  // refresh design accordion label without full re-render
  const lbl=document.getElementById('font-lbl');
  if(lbl)lbl.textContent=FONTS.find(x=>x.id===id)?.l||id;
  document.querySelectorAll('[data-fid]').forEach(el=>{
    const fid=el.dataset.fid;
    if(fid===id){el.classList.add('border-indigo-500','bg-indigo-50');el.classList.remove('border-gray-200');}
    else{el.classList.remove('border-indigo-500','bg-indigo-50');el.classList.add('border-gray-200');}
  });
  toast('✅ Lettertype: '+(FONTS.find(x=>x.id===id)?.l||id));
}
applyFont(_curFont);

let _iconStyle=localStorage.getItem('pb_icon_style')||'lu';
const saveIconStyle=()=>localStorage.setItem('pb_icon_style',_iconStyle);
function changeIconStyle(id){
  _iconStyle=id;saveIconStyle();
  // Re-render current view so DOM has fresh emoji HTML before icon replacement
  render();
  toast('✅ Icoonstijl: '+(ICON_STYLES.find(x=>x.id===id)?.l||id));
}

function ic(key,size=16){
  const def=ICONS[key];
  if(!def)return'';
  const s=_iconStyle;
  if(s==='emoji')return def.em;
  const sz=size+'px';
  if(s==='lu'){
    return`<i data-lucide="${def.lu}" style="width:${sz};height:${sz};display:inline-block;vertical-align:middle;stroke-width:1.75"></i>`;
  }
  if(s.startsWith('ma')){
    const cls=s==='ma-rnd'?'material-symbols-rounded':s==='ma-shp'?'material-symbols-sharp':'material-symbols-outlined';
    return`<span class="${cls}" style="font-size:${sz};vertical-align:middle;line-height:1">${def.ma}</span>`;
  }
  if(s.startsWith('ph')){
    const weight=s==='ph-thin'?'thin':s==='ph-bold'?'bold':s==='ph-fill'?'fill':s==='ph-duo'?'duotone':'';
    const cls=weight?`ph-${weight} ph-${def.ph}`:`ph ph-${def.ph}`;
    return`<i class="${cls}" style="font-size:${sz};vertical-align:middle"></i>`;
  }
  return def.em;
}

function applyIcons(){
  const isEmoji=(_iconStyle==='emoji');

  // ── 1. Sidebar nav items (data-ic based — always reliable) ──
  document.querySelectorAll('[data-ic]').forEach(el=>{
    const key=el.dataset.ic, lbl=el.dataset.label||'', sz=parseInt(el.dataset.icSize||'14');
    el.innerHTML=(isEmoji?(ICONS[key]?.em||''):ic(key,sz))+(lbl?' '+lbl:'');
  });

  if(isEmoji){
    // Activate lucide if needed (shouldn't be, but safety)
    return;
  }

  // ── 2. TreeWalker: replace all emoji text nodes inside #main ──
  const main=document.getElementById('main');
  if(!main)return;

  const SKIP_TAGS=new Set(['TEXTAREA','INPUT','SELECT','CODE','PRE','SCRIPT','STYLE']);
  const SKIP_CLASSES=['prose','inp','no-icon'];

  // Collect all eligible text nodes first (before any DOM mutation)
  const textNodes=[];
  const walker=document.createTreeWalker(main,NodeFilter.SHOW_TEXT,null,false);
  while(walker.nextNode()){
    const node=walker.currentNode;
    if(!node.textContent.trim())continue;
    // Check none of the ancestors should be skipped
    let ancestor=node.parentNode, skip=false;
    while(ancestor&&ancestor!==main){
      if(SKIP_TAGS.has(ancestor.tagName)){skip=true;break;}
      if(ancestor.classList){
        for(const cls of SKIP_CLASSES){if(ancestor.classList.contains(cls)){skip=true;break;}}
      }
      if(skip)break;
      ancestor=ancestor.parentNode;
    }
    if(!skip)textNodes.push(node);
  }

  // ── 3. Replace emojis in collected text nodes ──
  const emojiEntries=Object.entries(EMOJI_TO_KEY);
  textNodes.forEach(node=>{
    const text=node.textContent;
    // Normalize: strip variation selectors for matching
    const textN=text.replace(/[︎️]/g,'');
    // Quick check: does this node contain any known emoji?
    if(!emojiEntries.some(([em])=>text.includes(em)||textN.includes(em.replace(/[︎️]/g,''))))return;

    // Build ordered list of parts (text segments + icon replacements)
    const parts=[]; let remaining=text;
    while(remaining.length>0){
      let bestIdx=-1, bestEm=null, bestKey=null;
      for(const [em,key] of emojiEntries){
        const idx=remaining.indexOf(em);
        if(idx!==-1&&(bestIdx===-1||idx<bestIdx)){bestIdx=idx;bestEm=em;bestKey=key;}
      }
      if(bestIdx===-1){parts.push({t:'txt',v:remaining});break;}
      if(bestIdx>0)parts.push({t:'txt',v:remaining.slice(0,bestIdx)});
      // Determine icon size based on parent element font-size hints
      let sz=14;
      const par=node.parentElement;
      if(par){
        if(par.classList.contains('text-2xl')||par.classList.contains('text-3xl'))sz=22;
        else if(par.classList.contains('text-xl'))sz=18;
        else if(par.classList.contains('text-lg'))sz=16;
        else if(par.tagName==='H1')sz=20;
        else if(par.tagName==='H2'||par.tagName==='H3')sz=17;
      }
      parts.push({t:'ic',key:bestKey,sz});
      remaining=remaining.slice(bestIdx+[...bestEm].reduce((a,c)=>a+c.length,0));
    }

    // Only mutate DOM if there are actual icon replacements
    if(!parts.some(p=>p.t==='ic'))return;

    const frag=document.createDocumentFragment();
    parts.forEach(p=>{
      if(p.t==='txt'){
        if(p.v)frag.appendChild(document.createTextNode(p.v));
      } else {
        const sp=document.createElement('span');
        sp.className='ic-wrap';
        sp.innerHTML=ic(p.key,p.sz||14);
        frag.appendChild(sp);
      }
    });
    if(node.parentNode)node.parentNode.replaceChild(frag,node);
  });

  // ── 4. Activate Lucide icons (must run after DOM insertion) ──
  if(_iconStyle==='lu'&&typeof lucide!=='undefined'){
    setTimeout(()=>{try{lucide.createIcons();}catch(e){}},0);
  }
}
