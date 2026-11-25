import { useState } from 'react'
import keller from './assets/keller.jpg'
import costa from './assets/costa.jpg'

const field = [
  ['Mika Berger','#ff4145','—'], ['Inés Navarro','#ffb325','+0,612 s'],
  ['Émile Moreau','#258bff','+1,084 s'], ['Dev Singh','#f5d336','+1,276 s'],
  ['Clara Hartmann','#e6e9ed','+2,031 s'], ['Ben Keller','#00efdd','+2,389 s'],
  ['Hana Okada','#3188ff','+3,027 s'], ['Leon Weber','#dce4ec','+3,415 s'],
  ['Leo Costa','#8de72e','+3,892 s'], ['Alex Petrov','#70acde','+4,610 s'],
  ['Sofía Vélez','#b5c4d4','+5,071 s'], ['Noah Brandt','#abb8c3','+5,678 s'],
]

export function Timing({drivers}: {drivers:string[]}) {
  return <section className="panel timing tower"><h2>Live-Timing</h2>
    <table><caption>Beispiel-Timing</caption><thead><tr><th>#</th><th>Fahrer</th><th>Abstand</th></tr></thead>
    <tbody>{field.map(([name,color,gap], i) => {
      const own = drivers.includes(name)
      const [first,last] = name.split(' ')
      return <tr key={name} className={own ? 'selected-row' : ''}><td>{i+1}</td>
        <td><i style={{background:color}}/>{own ? name : first[0]+'. '+last}{own && <span className="sr-only"> · Dein Team</span>}</td><td>{gap}</td></tr>
    })}</tbody></table></section>
}

export function DriverConsole({name,number,team,index}: {name:string;number:number;team:string;index:number}) {
  const [pit,setPit] = useState(false)
  const [pace,setPace] = useState(index ? 2 : 1)
  const modes = ['Reifenschonend','Ausgewogen','Aggressiv']
  const position = field.findIndex(row => row[0] === name)
  const portrait = name === 'Ben Keller' ? keller : name === 'Leo Costa' ? costa : undefined
  const values = index ? ['−0,063 s','+0,118 s','−0,091 s'] : ['−0,146 s','+0,021 s','−0,107 s']
  return <section aria-label={'Kommandostand '+name} className="panel driver-console">
    {portrait ? <img className="portrait" src={portrait} alt=""/> : <b className="race-number">{number}</b>}
    <div className="driver-head"><h2><em>P{position+1}</em> {name}</h2><small>#{number}　{team}</small></div>
    <div className="tyre"><b>M</b><small>Medium (M)<br/>Alter: {index ? 15 : 18} Runden</small></div>
    <dl>{[field[position][2],...values].map((v,i) => <div key={i}><dt>{i ? 'Sektor '+i : 'Abstand'}</dt><dd className={v.startsWith('−') ? 'gain' : ''}>{v}</dd></div>)}</dl>
    <div className="driver-controls"><button aria-pressed={pit} onClick={() => setPit(!pit)}>{pit ? '✓ Stopp geplant' : 'Boxenstopp'}</button>
      <div className="pace"><span>Tempo</span><button aria-label={'Tempo reduzieren für '+name} disabled={pace===0} onClick={()=>setPace(pace-1)}>‹</button><strong aria-live="polite">{modes[pace]}</strong><button aria-label={'Tempo erhöhen für '+name} disabled={pace===2} onClick={()=>setPace(pace+1)}>›</button></div>
    </div>
  </section>
}
