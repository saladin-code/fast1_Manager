export function NavIcon({name}: {name: 'team' | 'entwicklung' | 'rennen' | 'menu'}) {
  const paths = {
    menu: 'M10 4H4v16h6 M9 12h12 M16 7l5 5-5 5',
    team: 'M2 11 12 3l10 8 M5 10v11h5v-7h4v7h5V10',
    entwicklung: 'm4 21 9-9 M14 3a6 6 0 0 0-6 8l-6 6a3 3 0 0 0 4 4l7-7a6 6 0 0 0 8-8l-4 4-3-3 3-4Z',
    rennen: 'M3 22 7 3 M7 4c5-4 9 4 15 0l-2 10c-5 4-10-4-15 0 M11 4l-2 9 M17 6l-2 8 M6 8c5-3 9 4 15 0',
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} />{name === 'rennen' && <path fill="currentColor" stroke="none" d="m8 4 3.5.3-.8 4-3.5-.4zm6.4 5.6 4 .1-.8 4-4-.2zm1.6-4.8 4 .1-.8 4-4-.2z"/>}</svg>
}

export function DevelopmentPlot() {
  return <figure className="plot">
    <figcaption>Abtrieb [kN] <span>━ Simulation</span><b>┄ Streckentest</b></figcaption>
    <svg viewBox="0 0 620 157" role="img" aria-label="Beispielmessung bei 10 bis 45 Millimetern Bodenfreiheit. Der Unterschied zwischen Simulation und Streckentest ist bei 10 Millimetern am größten.">
      {[0,1,2,3,4].map(i => <g key={i}><path d={`M48 ${12+i*27}H602`} stroke="#35434b"/><text x="39" y={16+i*27} textAnchor="end">{24-i*2}</text></g>)}
      {[10,15,20,25,30,35,40,45].map((n,i) => <g key={n}><path d={`M${48+i*79} 12v108`} stroke="#29373f"/><text x={48+i*79} y="145" textAnchor="middle">{n}</text></g>)}
      <path d="M48 14 Q155 59 284 76 T601 99" stroke="#00e8df" fill="none" strokeWidth="3"/>
      <path d="M48 39 C70 78 88 69 128 72 S303 88 364 92 S510 98 601 99" stroke="#ffb52e" fill="none" strokeWidth="3" strokeDasharray="9 5"/>
    </svg><small>Bodenfreiheit [mm]</small>
  </figure>
}



