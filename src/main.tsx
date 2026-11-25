import { createRoot } from 'react-dom/client'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import logo from '../docs/assets/fast1-manager-banner.png'
import raceArt from './assets/rennen.jpg'
import workshopArt from './assets/unterboden.jpg'
import onboard from './assets/onboard.jpg'
import world from './assets/weltbild.jpg'
import { DevelopmentPlot, NavIcon } from './instruments'
import { Timing, DriverConsole } from './race-console'
import './styles.css'
import './navigation.css'

const teams = [
  { name: 'Apex Racing', color: '#21eee0', profile: 'Präzision in schnellen Kurven.', drivers: ['Ben Keller', 'Leo Costa'], numbers: [17, 22] },
  { name: 'Vanta Motorsport', color: '#ff9a50', profile: 'Konsequent auf Topspeed ausgelegt.', drivers: ['Inés Navarro', 'Mika Berger'], numbers: [7, 31] },
  { name: 'Vertex GP', color: '#a3a8ff', profile: 'Ausgewogen auf jeder Strecke.', drivers: ['Hana Okada', 'Émile Moreau'], numbers: [12, 44] },
]

const floors = [
  { name: 'Unterboden A', profile: 'Kurvenpaket', downforce: 'Höher', drag: 'Höher', usage: 'Für schnelle Kurven.' },
  { name: 'Unterboden B', profile: 'Geradenpaket', downforce: 'Geringer', drag: 'Geringer', usage: 'Für lange Geraden.' },
]

const event = { name: 'Hafen-Grand-Prix', track: 'Marina Circuit', date: '21. März 2027' }
const navigation = [
  { page: 'team', title: 'Team' },
  { page: 'rennen', title: 'Rennwochenende' },
  { page: 'entwicklung', title: 'Entwicklung' },
] as const

type Page = 'menu' | 'auswahl' | typeof navigation[number]['page']

function currentPage(): Page {
  const hash = window.location.hash.slice(1)
  switch (hash) {
    case 'auswahl':
    case 'team':
    case 'entwicklung':
    case 'rennen':
      return hash
    default:
      return 'menu'
  }
}

function App() {
  const [route, setRoute] = useState(currentPage)
  const [team, setTeam] = useState<(typeof teams)[number]>()
  const [candidate, setCandidate] = useState<(typeof teams)[number]>()
  const [floor, setFloor] = useState<(typeof floors)[number]>()
  const [draft, setDraft] = useState<(typeof floors)[number]>()
  const [camera, setCamera] = useState<'Strecke' | 'Onboard'>('Strecke')
  const main = useRef<HTMLElement>(null)
  const inGame = route === 'team' || route === 'entwicklung' || route === 'rennen'
  const page = inGame && !team ? 'auswahl' : route
  const artStyle = (source: string) => ({ '--art': `url("${source}")` }) as CSSProperties
  const teamStyle = (color: string) => ({ '--team': color }) as CSSProperties

  useEffect(() => {
    const update = () => setRoute(currentPage())
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  useEffect(() => {
    main.current?.focus()
  }, [page])

  function takeTeam(event: React.FormEvent) {
    event.preventDefault()
    if (!candidate) return
    if (team !== candidate) {
      setFloor(undefined)
      setDraft(undefined)
    }
    setTeam(candidate)
    window.location.hash = 'team'
  }

  const isDashboard = page === 'team' || page === 'entwicklung' || page === 'rennen'

  return (
    <>
      <header className="topbar">
        <a href="#menu" aria-label="Zum Hauptmenü"><img src={logo} className="brand" alt="fast1 Manager" /></a>
        {page === 'rennen' && <div className="session-strip"><b>⌖　{event.track}</b><span>Runde <strong>38 / 55</strong></span></div>}
        {page !== 'menu' && <div className="top-meta">
          {team && isDashboard && page !== 'rennen' && <span className="team-mark" style={teamStyle(team.color)}>{team.name}</span>}
          <span>Saison <strong>2027</strong></span>
          {isDashboard && <span>Budget <strong>8,4 Mio. €</strong></span>}
        </div>}
      </header>

      <div className={isDashboard ? 'shell' : undefined}>
        {isDashboard && <nav aria-label="Spielnavigation" className="pit-nav">
          {navigation.map(({ page: destination, title }) => <a key={destination} href={`#${destination}`} aria-current={page === destination ? 'page' : undefined}><NavIcon name={destination}/><span>{title}</span></a>)}
          <a className="pit-exit" href="#menu"><NavIcon name="menu"/><span>Hauptmenü</span></a>
        </nav>}

        <main ref={main} tabIndex={-1} className={page === 'menu' ? 'hero' : isDashboard ? 'workspace' : 'selection'} style={page === 'menu' ? artStyle(raceArt) : undefined}>
          {page === 'menu' && <div className="hero-content">
            <h1><img className="hero-logo" src={logo} alt="fast1 Manager" /></h1>
            <p className="hero-tagline">Dein Team. Deine Rennstrategie.</p>
            <p>Übernimm einen Rennstall und bereite dein Auto auf den ersten Grand Prix vor.</p>
            <a className="button primary" href="#auswahl">Demo starten</a>
          </div>}

          {page === 'auswahl' && <>
            <a className="back" href="#menu">Zum Hauptmenü</a>
            <h1>Teamauswahl</h1>
            <p>Wähle deinen Rennstall für die Saison 2027.</p>
            <form onSubmit={takeTeam}>
              <fieldset className="team-grid">
                <legend className="sr-only">Rennstall auswählen</legend>
                {teams.map(option => <label key={option.name} className="panel option team-option" style={teamStyle(option.color)}>
                  <input type="radio" name="team" checked={candidate === option} onChange={() => setCandidate(option)} />
                  <span className="option-title">{option.name}</span>
                  <span className="muted">{option.profile}</span>
                  <span className="lineup">{option.drivers.map((driver, index) => <span key={driver}><b>#{option.numbers[index]}</b> {driver}</span>)}</span>
                  {candidate === option && <span className="selection-state">Ausgewählt</span>}
                </label>)}
              </fieldset>
              <button className="button primary" disabled={!candidate}>Team übernehmen</button>
            </form>
          </>}

          {page === 'team' && team && <>
            <h1>Teamzentrale</h1>
            <section className="team-hero panel art" style={artStyle(raceArt)}>
              <div>
                <h2 className="team-mark" style={teamStyle(team.color)}>{team.name}</h2>
                <a className="button primary" href="#entwicklung">Fahrzeugentwicklung</a>
              </div>
            </section>
            <div className="dashboard-grid">
              <section className="panel content">
                <h2>Fahreraufstellung</h2>
                {team.drivers.map((driver, index) => <div className="driver" key={driver} style={teamStyle(team.color)}><b>#{team.numbers[index]}</b><strong>{driver}</strong></div>)}
              </section>
              <section className="panel content">
                <h2>Nächstes Rennen</h2>
                <p className="event-name">{event.name}</p>
                <p>{event.track} · {event.date}</p>
                <a className="button secondary" href="#rennen">Zum Rennstand</a>
              </section>
            </div>
          </>}

          {page === 'entwicklung' && <>
            <div className="development-grid">
              <figure className="panel visual workshop">
                <h1>Entwicklungszentrum</h1>
                <img src={workshopArt} alt="Formelauto mit hervorgehobenem Unterboden in der Werkstatt" />
                <figcaption>Unterboden · {draft?.profile ?? 'Prototypenvergleich'}</figcaption>
              </figure>
              <section className="panel content">
                <h2>Unterboden auswählen</h2>
                <fieldset className="floor-grid">
                  <legend className="sr-only">Unterbodenvarianten</legend>
                  {floors.map(option => <label key={option.name} className="option floor-option">
                    <input type="radio" name="floor" checked={draft === option} onChange={() => setDraft(option)} />
                    <span className="option-title">{option.name} · {option.profile}</span>
                    <span className="muted">{option.usage}</span>
                    <span>Abtrieb <b>{option.downforce}</b> · Luftwiderstand <b>{option.drag}</b></span>
                    {floor === option && <span className="selection-state">Für das Rennen übernommen</span>}
                  </label>)}
                </fieldset>
                <button className="button primary" disabled={!draft || draft === floor} onClick={() => setFloor(draft)}>Für das nächste Rennen übernehmen</button>
                <p className="setup-status" role="status">{floor ? `${floor.name} ist für das nächste Rennen gesetzt.` : 'Aktuell ist kein Unterboden gewählt.'}</p>
              </section>
            </div>
            <section className="panel content analysis">
              <h2>Erkenntnisse aus dem Streckentest</h2>
              <div><DevelopmentPlot/><aside><h3>Abtriebsverlust auf Bodenwellen</h3><p>Bei geringer Bodenfreiheit liegt der gemessene Abtrieb unter der Prognose. Mit mehr Abstand zur Fahrbahn nähern sich die Kurven an.</p><small>Beispieldaten · Unterbodenversuch</small></aside></div>
            </section>
          </>}

          {page === 'rennen' && team && <>
            <h1 className="sr-only">Rennstand</h1>
            
            <div className="race-grid">
              <div className="feeds">
                <figure className="panel"><figcaption>Onboard · {team.drivers[0].split(' ').at(-1)}</figcaption><img src={onboard} alt="Blick aus dem Cockpit"/></figure>
                <figure className="panel"><figcaption>Weltbild</figcaption><img src={world} alt="Formelwagen am Ausgang der Hafenkurve"/></figure>
              </div>
              <figure className="panel visual">
                <figcaption>Streckenregie · {event.track}</figcaption>
                <img src={camera === 'Strecke' ? raceArt : onboard} alt={camera === 'Strecke' ? 'Rennfeld in der Hafenkurve' : 'Kamera im Cockpit'} />
                <div className="camera-switch" aria-label="Kamerawahl">{(['Strecke','Onboard'] as const).map(mode => <button key={mode} aria-pressed={camera === mode} onClick={() => setCamera(mode)}>{mode}</button>)}</div>
              </figure>
              <Timing drivers={team.drivers}/>
            </div>
            <div className="driver-deck">{team.drivers.map((name,index) => <DriverConsole key={name} name={name} index={index} number={team.numbers[index]} team={team.name}/>)}</div>
            <section className="panel content race-setup">
              <h2 className="team-mark" style={teamStyle(team.color)}>{team.name}</h2>
              {floor ? <p>Setup fürs Rennen · <strong>{floor.name} – {floor.profile}</strong></p> : <p>Aktuell ist kein Unterboden gewählt.</p>}
              <a className="button secondary" href="#entwicklung">{floor ? 'Unterboden ändern' : 'Unterboden auswählen'}</a>
            </section>
          </>}
        </main>
      </div>
    </>
  )
}

createRoot(document.getElementById('root')!).render(<App />)



