/* ── THEME SYSTEM (Light / Dark + kleur-aanpassing) ─────── */
const MODE_DEFAULTS={
  light:      {p:'#4f46e5',pd:'#3730a3',sb:'#1e1b4b',navTxt:'#a5b4fc',navHover:'#e0e7ff',heading:'#1e1b4b',bg:'#f9fafb',card:'#ffffff',cardBorder:'#e5e7eb',txt:'#111827',txt2:'#6b7280',logoColor:'rgba(255,255,255,0.95)',homeLogoColor:'#1e1b4b',iconTxt:'#ffffff'},
  dark:       {p:'#818cf8',pd:'#6366f1',sb:'#0f172a',navTxt:'#94a3b8',navHover:'#e2e8f0',heading:'#818cf8',bg:'#0f172a', card:'#1e293b',cardBorder:'#334155',txt:'#f1f5f9',txt2:'#94a3b8',logoColor:'rgba(255,255,255,0.95)',homeLogoColor:'#818cf8',iconTxt:'#ffffff'},
  'mono-light':{p:'#374151',pd:'#1f2937',sb:'#111827',navTxt:'#9ca3af',navHover:'#e5e7eb',heading:'#111827',bg:'#f9fafb',card:'#ffffff',cardBorder:'#d1d5db',txt:'#111827',txt2:'#6b7280',logoColor:'rgba(255,255,255,0.95)',homeLogoColor:'#111827',iconTxt:'#ffffff'},
  'mono-dark': {p:'#ffffff',pd:'#e4e4e7',sb:'#111111',navTxt:'#a1a1aa',navHover:'#ffffff',heading:'#ffffff',bg:'#0d0d0d', card:'#1c1c1c',cardBorder:'#2e2e2e',txt:'#f4f4f5',txt2:'#a1a1aa',logoColor:'rgba(255,255,255,0.95)',homeLogoColor:'#ffffff',iconTxt:'#111111'},
};
// Migrate from old pb_theme if needed
let _baseMode=(()=>{
  const s=localStorage.getItem('pb_base_mode');
  if(s)return s;
  const old=localStorage.getItem('pb_theme')||'';
  return['dark','midnight','neon'].includes(old)?'dark':'light';
})();
let _curTheme=_baseMode; // backward-compat alias
let _customColors=JSON.parse(localStorage.getItem('pb_custom_colors')||'null');

function _getActiveColors(){
  return Object.assign({},MODE_DEFAULTS[_baseMode]||MODE_DEFAULTS.light,_customColors||{});
}
function applyTheme(mode){
  if(mode)_baseMode=mode;
  _curTheme=_baseMode;
  localStorage.setItem('pb_base_mode',_baseMode);
  const c=_getActiveColors();
  const r=document.documentElement;
  r.style.setProperty('--p',c.p);
  r.style.setProperty('--pd',c.pd);
  r.style.setProperty('--sb',c.sb);
  r.style.setProperty('--nav-txt',c.navTxt);
  r.style.setProperty('--nav-hover',c.navHover);
  r.style.setProperty('--heading-color',c.heading);
  r.style.setProperty('--bg',c.bg);
  r.style.setProperty('--card',c.card);
  r.style.setProperty('--txt',c.txt);
  r.style.setProperty('--logo-color',c.logoColor||'rgba(255,255,255,0.95)');
  r.style.setProperty('--home-logo-color',c.homeLogoColor||'#1e1b4b');
  r.style.setProperty('--txt2',c.txt2||'#6b7280');
  r.style.setProperty('--card-border',c.cardBorder||'#e5e7eb');
  r.style.setProperty('--icon-txt',c.iconTxt||'#ffffff');
  document.body.classList.remove('theme-dark','theme-mono-dark');
  if(_baseMode==='dark')document.body.classList.add('theme-dark');
  else if(_baseMode==='mono-dark')document.body.classList.add('theme-mono-dark');
  document.querySelectorAll('#sidebar .border-indigo-800').forEach(el=>{el.style.borderColor=c.navTxt+'33';});
  document.querySelectorAll('#sidebar .text-indigo-500').forEach(el=>{el.style.color=c.navTxt+'aa';});
  document.querySelectorAll('.nav-section-lbl').forEach(el=>{el.style.color=c.navTxt;el.style.opacity='0.5';});
  const tb=document.getElementById('sb-toggle');
  if(tb){tb.style.background=c.sb;tb.style.color=c.navHover;}
  requestAnimationFrame(applyIcons);
}
function setBaseMode(mode){
  _baseMode=mode;_customColors=null;
  localStorage.setItem('pb_base_mode',mode);
  localStorage.removeItem('pb_custom_colors');
  applyTheme();render();
}
function setCustomColor(key,val){
  _customColors=_customColors||{};
  _customColors[key]=val;
  if(key==='p'){
    const h=val.replace('#','');
    const dr=n=>Math.min(255,Math.max(0,Math.round(parseInt(h.slice(n,n+2),16)*0.82))).toString(16).padStart(2,'0');
    _customColors.pd='#'+dr(0)+dr(2)+dr(4);
  }
  if(key==='sb'){
    // auto-derive navTxt as light tint of sidebar
    const h=val.replace('#','');
    const lr=n=>Math.min(255,Math.round(parseInt(h.slice(n,n+2),16)*1.0+120)).toString(16).padStart(2,'0');
    _customColors.navHover='#'+lr(0)+lr(2)+lr(4);
  }
  localStorage.setItem('pb_custom_colors',JSON.stringify(_customColors));
  applyTheme();
  const lbl=document.getElementById('clr-lbl-'+key);
  if(lbl)lbl.textContent=val.toUpperCase();
}
function resetCustomColors(){
  _customColors=null;
  localStorage.removeItem('pb_custom_colors');
  applyTheme();render();
  toast('✅ Kleuren gereset naar standaard');
}
/* ── Kleurpresets (opgeslagen schema's) ─── */
let _colorPresets=JSON.parse(localStorage.getItem('pb_color_presets')||'[]');
function saveColorPreset(){
  const name=prompt('Naam voor dit kleurschema:','Mijn schema');
  if(!name||!name.trim())return;
  const preset={id:'cp'+Date.now(),name:name.trim(),mode:_baseMode,colors:_customColors?{..._customColors}:null};
  _colorPresets.push(preset);
  localStorage.setItem('pb_color_presets',JSON.stringify(_colorPresets));
  toast('✅ Schema opgeslagen: '+name.trim());
  render();
}
function loadColorPreset(id){
  if(!id||id==='--')return;
  if(id==='__save'){saveColorPreset();return;}
  if(id==='light'){setBaseMode('light');return;}
  if(id==='dark'){setBaseMode('dark');return;}
  if(id==='mono-light'){setBaseMode('mono-light');return;}
  if(id==='mono-dark'){setBaseMode('mono-dark');return;}
  const preset=_colorPresets.find(p=>p.id===id);
  if(!preset)return;
  _baseMode=preset.mode||'light';
  _customColors=preset.colors?{...preset.colors}:null;
  localStorage.setItem('pb_base_mode',_baseMode);
  if(_customColors)localStorage.setItem('pb_custom_colors',JSON.stringify(_customColors));
  else localStorage.removeItem('pb_custom_colors');
  applyTheme();render();
}
function deleteColorPreset(id){
  if(!confirm('Kleurschema verwijderen?'))return;
  _colorPresets=_colorPresets.filter(p=>p.id!==id);
  localStorage.setItem('pb_color_presets',JSON.stringify(_colorPresets));
  render();toast('✅ Verwijderd');
}
applyTheme();
