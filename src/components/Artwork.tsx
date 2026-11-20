import type { CSSProperties } from 'react'

export function LandscapeArtwork() {
  return (
    <svg className="landscape" viewBox="0 0 800 640" role="img" aria-label="Ilustración simbólica de montañas guatemaltecas bajo un cielo nocturno y cinco portales iluminados" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2=".6" y2="1"><stop stopColor="#192a35"/><stop offset=".55" stopColor="#23343a"/><stop offset="1" stopColor="#11191e"/></linearGradient>
        <linearGradient id="mountain" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#516d69"/><stop offset="1" stopColor="#182b2c"/></linearGradient>
        <linearGradient id="path" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#eac88d" stopOpacity=".38"/><stop offset="1" stopColor="#b58252" stopOpacity="0"/></linearGradient>
        <radialGradient id="glow"><stop stopColor="#e8bc7e" stopOpacity=".58"/><stop offset="1" stopColor="#e8bc7e" stopOpacity="0"/></radialGradient>
        <filter id="blur"><feGaussianBlur stdDeviation="22"/></filter>
      </defs>
      <path fill="url(#sky)" d="M0 0h800v640H0z"/>
      <circle cx="594" cy="109" r="118" fill="url(#glow)" filter="url(#blur)"/>
      <circle cx="591" cy="105" r="34" fill="#f4ddb5" opacity=".9"/>
      <g fill="#f9e5c5" opacity=".65"><circle cx="118" cy="88" r="1.5"/><circle cx="210" cy="153" r="1"/><circle cx="328" cy="61" r="1.5"/><circle cx="446" cy="137" r="1"/><circle cx="710" cy="187" r="1.5"/><circle cx="744" cy="62" r="1"/></g>
      <path d="M0 307 109 235l62 36 106-117 91 121 75-69 95 80 110-112 152 139v327H0Z" fill="#334c4b"/>
      <path d="m0 393 105-82 92 45 137-109 116 114 118-100 92 92 140-43v330H0Z" fill="url(#mountain)"/>
      <path d="m0 455 118-55 85 42 144-82 126 92 116-59 107 31 104-33v249H0Z" fill="#203a39"/>
      <path d="M0 514q150-80 286-24t257-25q144-49 257 9v166H0Z" fill="#152927"/>
      <path d="M371 640q33-113 84-145l49-21q-73 52-90 166Z" fill="url(#path)"/>
      <path d="M0 593q171-38 343-10t457-47v104H0Z" fill="#112322"/>
      <g fill="#213a37" stroke="#a3aa8a" strokeWidth="2"><path d="M72 431v-51a29 29 0 0 1 58 0v51z"/><path d="M171 409v-72a37 37 0 0 1 74 0v72z"/><path d="M342 432v-97a47 47 0 0 1 94 0v97z"/><path d="M545 412v-72a37 37 0 0 1 74 0v72z"/><path d="M669 433v-51a29 29 0 0 1 58 0v51z"/></g>
      <g fill="#d6b47f" opacity=".72"><path d="M81 429v-48a20 20 0 0 1 40 0v48z"/><path d="M183 407v-68a25 25 0 0 1 50 0v68z"/><path d="M357 430v-92a32 32 0 0 1 64 0v92z"/><path d="M557 410v-69a25 25 0 0 1 50 0v69z"/><path d="M678 431v-48a20 20 0 0 1 40 0v48z"/></g>
      <g fill="#254b47"><path d="M83 429v-46a18 18 0 0 1 36 0v46z"/><path d="M185 407v-66a23 23 0 0 1 46 0v66z"/><path d="M359 430v-90a30 30 0 0 1 60 0v90z"/><path d="M559 410v-67a23 23 0 0 1 46 0v67z"/><path d="M680 431v-46a18 18 0 0 1 36 0v46z"/></g>
      <g stroke="#e8c896" strokeWidth="1.5" opacity=".85"><path d="M101 394v25m-11-13h22"/><path d="M208 359v33m-15-17h30"/><path d="M389 354v54m-24-27h48"/><path d="M582 359v33m-15-17h30"/><path d="M698 394v25m-11-13h22"/></g>
      <path d="M0 584q143-57 291-24t509-63" fill="none" stroke="#c6a777" strokeOpacity=".25" strokeWidth="2"/>
    </svg>
  )
}

type MotifProps = { theme: string; large?: boolean }

export function StationMotif({ theme, large = false }: MotifProps) {
  return (
    <div className={`motif motif--${theme}${large ? ' motif--large' : ''}`} aria-hidden="true" style={{ '--motif-rotation': theme === 'purple' ? '20deg' : '0deg' } as CSSProperties}>
      <div className="motif__halo" />
      {theme === 'teal' && <div className="motif__object motif__object--teal"><span /><span /><span /></div>}
      {theme === 'purple' && <div className="motif__object motif__object--purple"><span /><span /></div>}
      {theme === 'gold' && <div className="motif__object motif__object--gold"><span /><span /><span /></div>}
      {theme === 'clay' && <div className="motif__object motif__object--clay"><span /><span /><span /></div>}
      {theme === 'sky' && <div className="motif__object motif__object--sky"><span /><span /></div>}
      <div className="motif__base" />
    </div>
  )
}
