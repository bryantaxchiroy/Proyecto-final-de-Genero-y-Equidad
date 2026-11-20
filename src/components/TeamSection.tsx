import josePhoto from '../assets/team/jose-corzo.webp'
import juanPhoto from '../assets/team/juan-mogollon.webp'
import javierPhoto from '../assets/team/javier-mendez.webp'
import bryanPhoto from '../assets/team/bryan-tax.webp'
import './team-section.css'

const members = [
  { name: 'José Angel Corzo Tobías', studentId: '25030', photo: josePhoto },
  { name: 'Juan Luis Marcos Mogollón Escobedo', studentId: '25423', photo: juanPhoto },
  { name: 'Javier Arturo Méndez de León', studentId: '25934', photo: javierPhoto },
  { name: 'Bryan Adolfo Estuardo Tax Chiroy', studentId: '25115', photo: bryanPhoto },
]

export function TeamSection() {
  return <section className="team-section" aria-labelledby="team-section-title">
    <p className="kicker">QUIENES HICIERON POSIBLE ESTE RECORRIDO</p>
    <h2 id="team-section-title">Nuestro equipo</h2>
    <div className="team-section__grid">
      {members.map(({ name, studentId, photo }) => <article className="team-section__card" key={studentId}>
        <img src={photo} alt={`Retrato de ${name}`} loading="lazy" decoding="async" width="400" height="500" />
        <div className="team-section__details">
          <p className="team-section__role">Integrante del equipo</p>
          <h3>{name}</h3>
          <p className="team-section__id">Carné {studentId}</p>
        </div>
      </article>)}
    </div>
  </section>
}
