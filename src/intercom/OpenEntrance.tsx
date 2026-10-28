import styles from './intercom.module.css';

export function OpenEntrance({ label }: { label: string }) {
  return (
    <svg
      className={styles.entrance}
      width="336"
      height="291"
      viewBox="0 0 600 520"
      role="img"
      aria-label={label}
    >
      <defs>
        <radialGradient id="eo-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--color-lamp-text)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--color-lamp-text)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="eo-in" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-lamp-bright)" />
          <stop offset="1" stopColor="#efa94e" />
        </linearGradient>
      </defs>
      <rect width="600" height="440" fill="var(--color-lobby)" />
      <path
        d="M0 0H600 M0 0V28 M90 0V28 M180 0V28 M270 0V28 M360 0V28 M450 0V28 M540 0V28 M0 28H600 M45 28V56 M135 28V56 M225 28V56 M315 28V56 M405 28V56 M495 28V56 M585 28V56 M0 56H600 M0 56V84 M90 56V84 M180 56V84 M270 56V84 M360 56V84 M450 56V84 M540 56V84 M0 84H600 M45 84V112 M135 84V112 M225 84V112 M315 84V112 M405 84V112 M495 84V112 M585 84V112 M0 112H600 M0 112V140 M90 112V140 M180 112V140 M450 112V140 M540 112V140 M0 140H600 M45 140V168 M135 140V168 M495 140V168 M585 140V168 M0 168H600 M0 168V196 M90 168V196 M180 168V196 M450 168V196 M540 168V196 M0 196H600 M45 196V224 M135 196V224 M495 196V224 M585 196V224 M0 224H600 M0 224V252 M90 224V252 M180 224V252 M450 224V252 M540 224V252 M0 252H600 M45 252V280 M135 252V280 M495 252V280 M585 252V280 M0 280H600 M0 280V308 M90 280V308 M180 280V308 M450 280V308 M540 280V308 M0 308H600 M45 308V336 M135 308V336 M495 308V336 M585 308V336 M0 336H600 M0 336V364 M90 336V364 M180 336V364 M450 336V364 M540 336V364 M0 364H600 M45 364V392 M135 364V392 M495 364V392 M585 364V392 M0 392H600 M0 392V420 M90 392V420 M180 392V420 M450 392V420 M540 392V420 M0 420H600 M45 420V440 M135 420V440 M495 420V440 M585 420V440"
        stroke="#afa696"
        strokeWidth="1.5"
        fill="none"
      />
      <rect x="24" y="150" width="80" height="176" fill="#3e3024" />
      <rect x="30" y="156" width="68" height="164" fill="var(--color-lobby-glass)" />
      <path d="M64 156V320M30 238H98" stroke="#3e3024" strokeWidth="3" />
      <rect x="20" y="326" width="88" height="8" fill="var(--color-facade)" />
      <rect x="496" y="150" width="80" height="176" fill="#3e3024" />
      <rect x="502" y="156" width="68" height="164" fill="var(--color-lobby-glass)" />
      <path d="M536 156V320M502 238H570" stroke="#3e3024" strokeWidth="3" />
      <rect x="492" y="326" width="88" height="8" fill="var(--color-facade)" />
      <path d="M40 320V300H52V320Z" fill="#3b3730" />
      <path
        d="M46 300C42 290 37 288 33 287C39 286 43 290 45 294C45 287 49 283 56 282C51 286 48 292 47 300Z"
        fill="#3b3730"
      />
      <g fill="var(--color-window-glass)">
        <rect x="508" y="268" width="14" height="10" />
        <rect x="526" y="268" width="14" height="10" />
        <rect x="544" y="268" width="14" height="10" />
        <rect x="508" y="282" width="14" height="10" />
        <rect x="526" y="282" width="14" height="10" />
        <rect x="544" y="282" width="14" height="10" />
      </g>
      <ellipse className={styles.spill} cx="300" cy="300" rx="230" ry="220" fill="url(#eo-glow)" />
      <path d="M184 52L204 96M416 52L396 96" stroke="var(--color-dusk)" strokeWidth="3" />
      <rect x="180" y="48" width="8" height="8" fill="var(--color-dusk)" />
      <rect x="412" y="48" width="8" height="8" fill="var(--color-dusk)" />
      <rect x="168" y="92" width="264" height="8" fill="var(--color-dusk)" />
      <rect x="172" y="100" width="256" height="3" fill="var(--color-lobby-glass)" />
      <rect x="186" y="104" width="228" height="20" fill="var(--color-facade)" />
      <rect x="186" y="104" width="228" height="4" fill="var(--color-border)" />
      <rect x="196" y="124" width="26" height="280" fill="var(--color-facade)" />
      <rect x="193" y="124" width="32" height="8" fill="var(--color-border)" />
      <rect x="193" y="396" width="32" height="8" fill="var(--color-border)" />
      <path d="M204 136V392M214 136V392" stroke="var(--color-lobby)" strokeWidth="1.5" />
      <rect x="378" y="124" width="26" height="280" fill="var(--color-facade)" />
      <rect x="375" y="124" width="32" height="8" fill="var(--color-border)" />
      <rect x="375" y="396" width="32" height="8" fill="var(--color-border)" />
      <path d="M386 136V392M396 136V392" stroke="var(--color-lobby)" strokeWidth="1.5" />
      <rect x="222" y="124" width="156" height="40" fill="#3e3024" />
      <rect
        x="228"
        y="130"
        width="144"
        height="28"
        fill="var(--color-lamp-bright)"
        fillOpacity="1"
      />
      <path d="M276 130V158M324 130V158" stroke="#3e3024" strokeWidth="3" />
      <circle cx="300" cy="144" r="10" fill="var(--color-dusk)" />
      <text
        x="300"
        y="149"
        textAnchor="middle"
        fontFamily="Golos Text, sans-serif"
        fontSize="13"
        fontWeight="600"
        fill="var(--color-text-on-dark)"
      >
        1
      </text>
      <rect x="222" y="164" width="156" height="240" fill="#3e3024" />
      <rect x="228" y="170" width="144" height="234" fill="url(#eo-in)" />
      <rect x="228" y="318" width="144" height="22" fill="#e3a85a" />
      <rect x="228" y="316" width="144" height="3" fill="#f6cf8c" />
      <path d="M228 340H372V404H228Z" fill="#c98a45" />
      <path d="M228 352H372M228 368H372M228 386H372" stroke="#b57a3a" strokeWidth="1.5" />
      <path
        d="M262 340L248 404M290 340L284 404M318 340L322 404M346 340L360 404"
        stroke="#b57a3a"
        strokeWidth="1.5"
      />
      <path d="M278 340H322L334 404H266Z" fill="#8c4a2e" fillOpacity="0.85" />
      <path
        d="M282 340H318L329 404H271Z"
        fill="none"
        stroke="var(--color-curtain)"
        strokeWidth="1.5"
      />
      <path d="M228 340H372" stroke="#a86f35" strokeWidth="2" />
      <rect x="270" y="322" width="102" height="18" fill="#d69b52" />
      <rect x="270" y="322" width="102" height="4" fill="#f6cf8c" />
      <rect x="280" y="304" width="92" height="18" fill="#d69b52" />
      <rect x="280" y="304" width="92" height="4" fill="#f6cf8c" />
      <rect x="290" y="286" width="82" height="18" fill="#d69b52" />
      <rect x="290" y="286" width="82" height="4" fill="#f6cf8c" />
      <rect x="300" y="268" width="72" height="18" fill="#d69b52" />
      <rect x="300" y="268" width="72" height="4" fill="#f6cf8c" />
      <rect x="310" y="250" width="62" height="18" fill="#d69b52" />
      <rect x="310" y="250" width="62" height="4" fill="#f6cf8c" />
      <rect x="320" y="232" width="52" height="18" fill="#d69b52" />
      <rect x="320" y="232" width="52" height="4" fill="#f6cf8c" />
      <rect x="330" y="214" width="42" height="18" fill="#d69b52" />
      <rect x="330" y="214" width="42" height="4" fill="#f6cf8c" />
      <path
        d="M270 340V322H280V304H290V286H300V268H310V250H320V232H330V214H340"
        fill="none"
        stroke="#b57a3a"
        strokeWidth="1.5"
      />
      <path
        d="M264 300L338 168"
        stroke="var(--color-frame-wood)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M274 322V284M284 304V266M294 286V248M304 268V230M314 250V212M324 232V194"
        stroke="var(--color-frame-wood)"
        strokeWidth="1.5"
      />
      <rect x="262" y="300" width="5" height="40" fill="var(--color-frame-wood)" />
      <line x1="300" y1="170" x2="300" y2="196" stroke="var(--color-silhouette)" strokeWidth="2" />
      <path d="M288 208L292 196H308L312 208Z" fill="var(--color-silhouette)" />
      <ellipse cx="300" cy="209" rx="8" ry="3" fill="#fff4d6" />
      <ellipse
        className={styles.spill}
        cx="300"
        cy="372"
        rx="36"
        ry="6"
        fill="#fff4d6"
        fillOpacity="0.35"
      />
      <rect className={styles.shut} x="228" y="170" width="144" height="234" fill="#5e4a38" />
      <g className={`${styles.leaf} ${styles['leaf-left']}`}>
        <path d="M228 170L262 182V392L228 404Z" fill="#6b5440" />
        <path d="M228 170L262 182V392L228 404Z" fill="#000000" fillOpacity="0.12" />
        <path d="M234 184L256 193V280L234 286Z" fill="var(--color-lamp)" fillOpacity="0.55" />
        <path
          d="M234 184L256 193V280L234 286Z"
          fill="none"
          stroke="var(--color-frame-wood)"
          strokeWidth="2.5"
        />
        <path
          d="M245.0 188.5V283M234 235L256 236.5"
          stroke="var(--color-frame-wood)"
          strokeWidth="2"
        />
        <path
          d="M234 302L256 304V380L234 386Z"
          fill="none"
          stroke="var(--color-frame-wood)"
          strokeWidth="2.5"
        />
        <path d="M262 182L266 183V391L262 392Z" fill="#3e3024" />
        <rect x="253.5" y="282" width="3" height="36" rx="1.5" fill="#c9a060" />
      </g>
      <g className={`${styles.leaf} ${styles['leaf-right']}`}>
        <path d="M372 170L338 182V392L372 404Z" fill="#6b5440" />
        <path d="M372 170L338 182V392L372 404Z" fill="#000000" fillOpacity="0.12" />
        <path d="M366 184L344 193V280L366 286Z" fill="var(--color-lamp)" fillOpacity="0.55" />
        <path
          d="M366 184L344 193V280L366 286Z"
          fill="none"
          stroke="var(--color-frame-wood)"
          strokeWidth="2.5"
        />
        <path
          d="M355.0 188.5V283M366 235L344 236.5"
          stroke="var(--color-frame-wood)"
          strokeWidth="2"
        />
        <path
          d="M366 302L344 304V380L366 386Z"
          fill="none"
          stroke="var(--color-frame-wood)"
          strokeWidth="2.5"
        />
        <path d="M338 182L334 183V391L338 392Z" fill="#3e3024" />
        <rect x="340.5" y="282" width="3" height="36" rx="1.5" fill="#c9a060" />
      </g>
      <rect x="206" y="404" width="188" height="16" fill="var(--color-slab)" />
      <rect x="206" y="404" width="188" height="3" fill="#e8cc90" />
      <rect x="186" y="420" width="228" height="20" fill="#a89f90" />
      <rect x="186" y="420" width="228" height="3" fill="#e8cc90" />
      <rect x="262" y="398" width="76" height="6" rx="1" fill="#6e5a48" />
      <rect y="440" width="600" height="80" fill="var(--color-ground)" />
      <rect y="440" width="600" height="10" fill="#3a3f4d" />
      <path
        className={styles.spill}
        d="M240.0 440H360.0L470 520H130Z"
        fill="var(--color-lamp-text)"
        fillOpacity="0.3"
      />
      <ellipse cx="148" cy="440" rx="34" ry="4" fill="#000000" fillOpacity="0.25" />
      <path d="M120 400H176L170 440H126Z" fill="#6b5440" />
      <rect x="118" y="396" width="60" height="6" fill="#5c4632" />
      <ellipse cx="148" cy="372" rx="30" ry="28" fill="#4e6b4e" />
      <ellipse cx="138" cy="362" rx="14" ry="14" fill="#5e7d5e" />
      <rect x="146" y="388" width="4" height="10" fill="#3b3730" />
      <ellipse cx="452" cy="440" rx="34" ry="4" fill="#000000" fillOpacity="0.25" />
      <path d="M424 400H480L474 440H430Z" fill="#6b5440" />
      <rect x="422" y="396" width="60" height="6" fill="#5c4632" />
      <ellipse cx="452" cy="372" rx="30" ry="28" fill="#4e6b4e" />
      <ellipse cx="442" cy="362" rx="14" ry="14" fill="#5e7d5e" />
      <rect x="450" y="388" width="4" height="10" fill="#3b3730" />
      <circle cx="160" cy="206" r="46" fill="url(#eo-glow)" />
      <path d="M160 176V184" stroke="var(--color-dusk)" strokeWidth="3" />
      <rect x="152" y="172" width="8" height="4" fill="var(--color-dusk)" />
      <path d="M149 186H171L168 226H152Z" fill="var(--color-dusk)" />
      <path d="M153 191H167L165 221H155Z" fill="var(--color-lamp-bright)" />
      <rect x="148" y="226" width="24" height="4" fill="var(--color-dusk)" />
      <path d="M154 186L160 178L166 186Z" fill="var(--color-dusk)" />
      <circle cx="440" cy="206" r="46" fill="url(#eo-glow)" />
      <path d="M440 176V184" stroke="var(--color-dusk)" strokeWidth="3" />
      <rect x="440" y="172" width="8" height="4" fill="var(--color-dusk)" />
      <path d="M429 186H451L448 226H432Z" fill="var(--color-dusk)" />
      <path d="M433 191H447L445 221H435Z" fill="var(--color-lamp-bright)" />
      <rect x="428" y="226" width="24" height="4" fill="var(--color-dusk)" />
      <path d="M434 186L440 178L446 186Z" fill="var(--color-dusk)" />
      <rect x="418" y="250" width="30" height="56" rx="4" fill="var(--color-dusk)" />
      <rect x="423" y="256" width="20" height="8" rx="1" fill="var(--color-online)" />
      <g fill="#5a6075">
        <circle cx="427" cy="272" r="1.3" />
        <circle cx="433" cy="272" r="1.3" />
        <circle cx="439" cy="272" r="1.3" />
        <circle cx="427" cy="277" r="1.3" />
        <circle cx="433" cy="277" r="1.3" />
        <circle cx="439" cy="277" r="1.3" />
      </g>
      <circle cx="433" cy="292" r="5" fill="var(--color-lamp-bright)" />
    </svg>
  );
}
