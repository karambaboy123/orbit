/* ══════════════════════════════════════════════════════════
   SPIDERWEB / RADAR CHART (SVG, geen externe library)
   ══════════════════════════════════════════════════════════ */
function buildRadarChart(goals,size=260){
  if(!goals||!goals.length)return'<div class="text-sm text-gray-400 py-4 text-center">Voeg leerdoelen toe om de radar te zien</div>';
  const pts=goals.slice(0,10);
  const n=pts.length;
  if(n<2)return'<div class="text-sm text-gray-400 py-4 text-center">Voeg minimaal 2 leerdoelen toe voor de radar</div>';
  const cx=size/2,cy=size/2,r=(size/2)-30;
  const angle=i=>((2*Math.PI*i)/n)-(Math.PI/2);
  const coord=(i,frac)=>({x:cx+r*frac*Math.cos(angle(i)),y:cy+r*frac*Math.sin(angle(i))});
  let rings='';
  [0.25,0.5,0.75,1.0].forEach(f=>{
    const ps=pts.map((_,i)=>coord(i,f));
    rings+=`<polygon points="${ps.map(p=>p.x.toFixed(1)+','+p.y.toFixed(1)).join(' ')}" fill="none" stroke="#e5e7eb" stroke-width="1"/>`;
  });
  let axes='';
  pts.forEach((_,i)=>{
    const e=coord(i,1);
    axes+=`<line x1="${cx}" y1="${cy}" x2="${e.x.toFixed(1)}" y2="${e.y.toFixed(1)}" stroke="#e5e7eb" stroke-width="1"/>`;
  });
  const dps=pts.map((g,i)=>coord(i,(g.level||1)/100));
  const poly=dps.map(p=>p.x.toFixed(1)+','+p.y.toFixed(1)).join(' ');
  const fill=pts[0]?lvlColor(Math.round(pts.reduce((a,g)=>a+(g.level||1),0)/pts.length)):'#4f46e5';
  let data=`<polygon points="${poly}" fill="${fill}22" stroke="${fill}" stroke-width="2" stroke-linejoin="round"/>`;
  pts.forEach((g,i)=>{const p=coord(i,(g.level||1)/100);data+=`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="${lvlColor(g.level||1)}" stroke="#fff" stroke-width="1.5"/>`;});
  let labels='';
  pts.forEach((g,i)=>{
    const lp=coord(i,1.18);
    const name=g.name.length>14?g.name.slice(0,13)+'…':g.name;
    labels+=`<text x="${lp.x.toFixed(1)}" y="${lp.y.toFixed(1)}" text-anchor="${lp.x<cx-5?'end':lp.x>cx+5?'start':'middle'}" dominant-baseline="middle" font-size="9" fill="#6b7280" font-family="system-ui,sans-serif">${name}</text>`;
    const dp=coord(i,(g.level||1)/100);
    labels+=`<text x="${dp.x.toFixed(1)}" y="${(dp.y-8).toFixed(1)}" text-anchor="middle" font-size="8" fill="${lvlColor(g.level||1)}" font-weight="700" font-family="system-ui,sans-serif">${g.level||1}</text>`;
  });
  let ringLabels='';
  [25,50,75,100].forEach(v=>{
    const lp=coord(0,v/100);
    ringLabels+=`<text x="${(lp.x+4).toFixed(1)}" y="${lp.y.toFixed(1)}" font-size="7" fill="#9ca3af" font-family="system-ui,sans-serif">${v}</text>`;
  });
  return `<svg viewBox="0 0 ${size} ${size}" style="width:100%;max-width:${size}px;display:block;margin:0 auto">${rings}${axes}${data}${labels}${ringLabels}</svg>`;
}

/* ── Groeidiagram: niveauverloop per leerdoel over tijd (lijngrafiek) ── */
function buildGrowthChart(goals,width=560,height=240){
  const withHist=(goals||[]).filter(g=>(g.history||[]).length);
  if(withHist.length<1)return'';
  const dateSet=new Set();
  withHist.forEach(g=>g.history.forEach(h=>dateSet.add(h.date)));
  const histDates=[...dateSet].sort();
  if(!histDates.length)return'';
  // Eerste kolom = startpunt (vóór de eerste meting), daarna 1 kolom per meetmoment
  const cols=['start',...histDates];
  const pad={l:32,r:14,t:14,b:24};
  const w=width-pad.l-pad.r, h=height-pad.t-pad.b;
  const xFor=i=>pad.l+(cols.length>1?(i/(cols.length-1))*w:w/2);
  const yFor=lv=>pad.t+h-(lv/100*h);
  let grid='';
  [0,25,50,75,100].forEach(v=>{
    const y=yFor(v);
    grid+=`<line x1="${pad.l}" y1="${y.toFixed(1)}" x2="${pad.l+w}" y2="${y.toFixed(1)}" stroke="#eef0f4" stroke-width="1"/>`;
    grid+=`<text x="${pad.l-6}" y="${(y+3).toFixed(1)}" text-anchor="end" font-size="8" fill="#9ca3af" font-family="system-ui,sans-serif">${v}</text>`;
  });
  let xlabels='';
  cols.forEach((d,i)=>{
    if(i===0||i===cols.length-1||(cols.length<=5)){
      const lbl=d==='start'?'Start':d.slice(5);
      xlabels+=`<text x="${xFor(i).toFixed(1)}" y="${height-6}" text-anchor="middle" font-size="8" fill="#9ca3af" font-family="system-ui,sans-serif">${lbl}</text>`;
    }
  });
  let lines='', legend='';
  withHist.forEach(g=>{
    const lc=lvlColor(g.level||1);
    const dateLevel={};
    g.history.forEach(hh=>{dateLevel[hh.date]=hh.newLevel;});
    let curLvl=g.history[0].oldLevel;
    const series=cols.map((d,i)=>{
      if(d!=='start'&&dateLevel[d]!==undefined)curLvl=dateLevel[d];
      return{x:xFor(i),y:yFor(curLvl)};
    });
    const path=series.map((p,i)=>(i===0?'M':'L')+p.x.toFixed(1)+','+p.y.toFixed(1)).join(' ');
    lines+=`<path d="${path}" fill="none" stroke="${lc}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    series.forEach(p=>{lines+=`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="2.5" fill="${lc}" stroke="#fff" stroke-width="1"/>`;});
    const name=g.name.length>18?g.name.slice(0,17)+'…':g.name;
    legend+=`<div style="display:flex;align-items:center;gap:5px"><span style="width:14px;height:2.5px;border-radius:2px;background:${lc};display:inline-block;flex-shrink:0"></span><span style="font-size:10px;color:#374151">${name.replace(/</g,'&lt;')}</span></div>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" style="width:100%;max-width:${width}px;display:block;margin:0 auto">${grid}${lines}${xlabels}</svg>
  <div style="display:flex;flex-wrap:wrap;gap:8px 16px;justify-content:center;margin-top:10px">${legend}</div>`;
}
