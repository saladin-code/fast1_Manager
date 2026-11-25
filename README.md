# fast1 Manager

Ein Formel-Rennmanager für den Browser, in dem du die Wirkung deiner Entwicklungsentscheidungen auf der Strecke sehen kannst.

Du übernimmst ein Team, verpflichtest Fahrer und finanzierst die Entwicklung deines Autos. Während des Rennens beobachtest du das Feld aus einer erhöhten 3D-Perspektive und gibst deinen Fahrern Anweisungen. Über mehrere Saisons entscheidet sich, ob deine technischen Ideen auch unter einem neuen Reglement Bestand haben.

**Projektstatus:** Konzeptphase. Diese README beschreibt das geplante Spiel, den vorgesehenen Tech-Stack und die Ziele für den ersten Prototyp.

## Eine Saison als Teamchef

| Zeitpunkt | Deine Entscheidungen |
| --- | --- |
| Vor der Saison | Fahrer verpflichten, das Reglement auswerten und das Entwicklungsbudget auf technische Konzepte verteilen. |
| Zwischen den Rennen | Messdaten analysieren, Prototypen testen und entscheiden, welche Teile ans Auto kommen. |
| Am Kommandostand | Beide Fahrer im Live-Timing verfolgen, Tempo vorgeben, Reifen schonen und Boxenstopps planen. |
| Vor dem Saisonwechsel | Abwägen, ob ein letztes Upgrade noch Punkte bringt oder Personal und Budget bereits in das nächstjährige Auto fließen. |

Die Konkurrenz entwickelt ebenfalls weiter. Ein schnelleres Auto kann im Feld zurückfallen, wenn andere Teams größere Fortschritte machen.

## Forschung, Risiko und Reglement

Ein Unterbodenprojekt verspricht mehr Abtrieb in schnellen Kurven. Die Ingenieure schätzen den möglichen Zeitgewinn als Bandbreite. Du kannst einen weiteren Test bezahlen, das Teil direkt fertigen lassen oder das Projekt beenden. Im Rennen zeigt sich möglicherweise, dass der Unterboden auf glattem Asphalt funktioniert, bei Bodenwellen aber empfindlich auf die Fahrzeughöhe reagiert.

Dafür unterscheidet das Spiel zwischen der tatsächlichen Eigenschaft eines Konzepts und dem Wissen des Teams darüber. Ein Konzept erhält bei seiner Entstehung eine unsichere Ausprägung. Tests liefern Messwerte und verbessern die Schätzung. So kann ein teures Projekt enttäuschen und ein früher Fund mehrere Saisons prägen.

Jede Saison erhält ein eigenes Regelwerk, etwa mit Grenzen für Bauteilabmessungen und Testzeit. Ein Regelwechsel kann den Einsatz eines vorhandenen Teils verhindern. Die gewonnenen Erkenntnisse stehen dem Team bei der Konstruktion seines Nachfolgers weiterhin zur Verfügung.

## Rennsimulation und Ansicht

Die Simulation berechnet den Rennverlauf in festen Zeitschritten. Fahrzeugmerkmale, Fahrer, Reifen und Verkehr bestimmen, wie schnell ein Auto einen Streckenabschnitt durchfährt. Mehr Abtrieb kann in einer schnellen Kurve helfen. Zusätzlicher Luftwiderstand kann den Vorteil auf der folgenden Geraden wieder kosten.

Die 3D-Ansicht zeigt einfache Formelautos, erkennbare Teamfarben und erhöhte Streckenkameras. Positionsliste, Minimap und Sektorzeiten beziehen ihre Daten aus demselben Rennzustand. Beim Zeitraffer durchläuft die Simulation mehr Schritte pro Sekunde. Mit identischem Startzustand, Zufallsstartwert und denselben Befehlen zum selben Simulationszeitpunkt bleibt das Ergebnis reproduzierbar.

## Geplanter Tech-Stack

| Bereich | Technologie | Aufgabe |
| --- | --- | --- |
| Browser-App | React, TypeScript, Vite | Teamverwaltung, Entwicklungsansicht, Live-Timing und Bedienung am Kommandostand |
| 3D-Darstellung | Three.js, React Three Fiber | Streckengeometrie, Fahrzeugmodelle, Kameras und flüssige Bewegung zwischen Simulationsschritten |
| Spielkern | Eigenständige TypeScript-Module | Rennen, Bauteile, Forschung, Finanzen und saisonale Regeln berechnen |
| Spielstände | IndexedDB | Karriere, Entwicklungsprojekte und Zufallszustand lokal im Browser speichern |
| Tests | Vitest, Playwright | Spielregeln und reproduzierbare Rennläufe prüfen sowie zentrale Spielabläufe im Browser testen |

Für den ersten Prototyp ist ein lokales Einzelspiel vorgesehen. Der Spielkern läuft auch ohne Browseroberfläche. Dadurch lassen sich ganze Rennen automatisiert durchspielen und zwei Fahrzeugkonzepte unter identischen Bedingungen vergleichen.

## Erster spielbarer Meilenstein

Eine fiktive Strecke, acht Autos, fünf Runden und zwei Unterbodenvarianten. Der Spieler wählt vor dem Start eine Variante für sein Team und verfolgt das Rennen aus der erhöhten Kamera.

Der Meilenstein ist erreicht, wenn:

- beide Varianten unter gleichen Bedingungen messbar unterschiedliche Sektorzeiten erzielen,
- Positionen und Abstände auf Strecke, Minimap und im Live-Timing übereinstimmen,
- ein Lauf bei 1× und 4× mit denselben Eingaben dieselben Rundenzeiten und dieselbe Zielreihenfolge liefert.

## Weitere Entwicklung

1. Rennstrategie: Überholen, Reifenverschleiß, Boxengasse und getrennte Anweisungen für beide Fahrer.
2. Konstrukteursbetrieb: Budget, Entwicklungsdauer, Prognosen und Tests. KI-Teams investieren unter denselben Regeln.
3. Karriere: Fahrermarkt, Verträge, Meisterschaft und persistente Spielstände.
4. Saisonwechsel: Neues Reglement ankündigen, parallel am Folgeauto arbeiten und Forschungserkenntnisse übernehmen.

## Entwicklung mit Specs

Jedes größere Feature bekommt eine Spezifikation mit Spielregeln, technischer Umsetzung und prüfbaren Akzeptanzkriterien. Kiro und Codex können im selben Repository mit diesen Markdown-Dateien arbeiten. Für die Rennsimulation dient der reproduzierbare Vergleich zweier Läufe als erster Akzeptanztest.
