import { GlowLayer } from './GlowLayer';
import { GarageInterior } from './GarageInterior';
import { HOUSE, SCENE_VIEW_BOX } from './layout';
import styles from './scene.module.css';
import { box, left, size, top } from './units';

const SMOKE = [
  { x: 549, y: 88, r: 6 },
  { x: 556, y: 72, r: 8 },
  { x: 566, y: 52, r: 10 },
];

const SMOKE_BOX = { x: 539, y: -4, width: 52, height: 106 };

const WINDOW_SYMBOL = {
  cold: '#scene-window-cold',
  blinds: '#scene-window-blinds',
  project: '#scene-window-project',
} as const;

function Basement() {
  const { rect } = HOUSE.basement;

  return (
    <g>
      <rect {...rect} fill="var(--color-basement)" />
      <rect x={rect.x} y={rect.y} width={rect.width} height="3" fill="#1c202b" />
      <path d="M200 768H560" stroke="#4a5166" strokeWidth="2" />

      <rect x="222" y="776" width="40" height="64" fill="#2a2f3d" />
      <path d="M222 792H262M222 808H262M222 824H262" stroke="#4a5166" />
      <g fill="#5e5a66">
        <rect x="226" y="780" width="5" height="12" />
        <rect x="232" y="782" width="4" height="10" />
        <rect x="240" y="796" width="6" height="12" />
        <rect x="228" y="812" width="5" height="12" />
      </g>

      <ellipse cx="380" cy="845" rx="64" ry="3" fill="#4a3e4a" />

      <rect x="288" y="780" width="32" height="22" fill="#6e5a48" />
      <g>
        <rect x="291" y="783" width="9" height="7" fill="#c9c1b3" />
        <rect x="303" y="784" width="8" height="6" fill="#b8954e" />
        <rect x="293" y="792" width="7" height="7" fill="#7a97a0" />
        <rect x="304" y="792" width="12" height="7" fill="#c9c1b3" />
      </g>

      <rect x="266" y="836" width="22" height="4" fill="#5e4a3e" />
      <rect x="268" y="832" width="18" height="4" fill="#4e5a6e" />
      <rect x="267" y="828" width="20" height="4" fill="#6e5e4a" />

      <rect x="318" y="800" width="3" height="44" fill="#2a2f3d" />
      <rect x="318" y="822" width="20" height="3" fill="#2a2f3d" />
      <rect x="335" y="825" width="2.5" height="19" fill="#2a2f3d" />
      <rect x="330" y="816" width="100" height="4" fill="#2a2f3d" />
      <rect x="336" y="820" width="3" height="24" fill="#2a2f3d" />
      <rect x="421" y="820" width="3" height="24" fill="#2a2f3d" />

      <circle cx="468" cy="788" r="7" fill="#8a8f9e" stroke="#2a2f3d" strokeWidth="1.2" />
      <path d="M468 784V788L471 790" stroke="#2a2f3d" strokeWidth="1" />

      <rect x="488" y="808" width="44" height="2" fill="#2a2f3d" />
      <rect x="492" y="797" width="32" height="11" rx="1.5" fill="#5c4632" />
      <circle cx="517" cy="802.5" r="3" fill="#c9a060" />
      <path d="M496 800H508M496 804H508" stroke="#3e3024" />
      <path d="M494 797L486 786" stroke="#2a2f3d" />

      <rect x="444" y="828" width="16" height="16" rx="4" fill="#4e5a6e" />
      <rect x="447" y="834" width="10" height="6" rx="1" fill="#3e4858" />

      <line x1="546" y1="768" x2="546" y2="846" stroke="#4a5166" strokeWidth="3" />
      <circle cx="546" cy="806" r="4.5" fill="#8a8f9e" stroke="#2a2f3d" />

      <rect x="370" y="794" width="20" height="22" rx="1" fill="#2e4a6e" />
      <circle cx="380" cy="802" r="3" fill="none" stroke="#9c8458" />
      <path d="M418 816V804L412 800" stroke="#2a2f3d" strokeWidth="1.5" fill="none" />
      <path d="M404 796H414L413 802H406Z" fill="#c9a060" />
    </g>
  );
}

function Facade() {
  const slabs = [HOUSE.entrance.slab, ...HOUSE.floors.map((floor) => floor.slab)];

  return (
    <g>
      <rect {...HOUSE.facade} fill="var(--color-facade)" />
      <rect {...HOUSE.shade} fill="#000000" fillOpacity="0.08" />
      <g fill="var(--color-slab)">
        {slabs.map((slab) => (slab === null ? null : <rect key={slab.y} {...slab} />))}
      </g>
    </g>
  );
}

function Windows() {
  return (
    <g>
      {HOUSE.floors.flatMap((floor) =>
        floor.windows.map((slot) => (
          <use
            key={`${floor.floor}-${slot.column}`}
            href={WINDOW_SYMBOL[slot.kind]}
            x={slot.rect.x}
            y={slot.rect.y}
            width={slot.rect.width}
            height={slot.rect.height}
          />
        )),
      )}
    </g>
  );
}

function WallLantern({ x, y, radius }: { x: number; y: number; radius: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={radius} fill="url(#scene-halo)" />
      <rect x={x - 2} y={y - 14.5} width="4" height="1.5" fill="var(--color-dusk)" />
      <path d={`M${x} ${y - 13}V${y - 9.5}`} stroke="var(--color-dusk)" strokeWidth="1.1" />
      <path
        d={`M${x - 2.6} ${y - 8}L${x} ${y - 11.5}L${x + 2.6} ${y - 8}Z`}
        fill="var(--color-dusk)"
      />
      <path
        d={`M${x - 4.6} ${y - 8}H${x + 4.6}L${x + 3.3} ${y + 8}H${x - 3.3}Z`}
        fill="var(--color-dusk)"
      />
      <path
        d={`M${x - 2.9} ${y - 6}H${x + 2.9}L${x + 2.1} ${y + 6}H${x - 2.1}Z`}
        fill="var(--color-lamp-text)"
      />
      <rect x={x - 5} y={y + 8} width="10" height="1.7" fill="var(--color-dusk)" />
    </g>
  );
}

function Pilaster({ x }: { x: number }) {
  return (
    <g>
      <rect x={x} y="692" width="12" height="62" fill="var(--color-facade)" />
      <path
        d={`M${x + 4} 696V750M${x + 8} 696V750`}
        stroke="var(--color-lobby)"
        strokeWidth="0.8"
      />
      <rect x={x - 2} y="689" width="16" height="3" fill="var(--color-border)" />
      <rect x={x - 2} y="754" width="16" height="3" fill="var(--color-border)" />
    </g>
  );
}

function Planter({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x - 8.5} 750H${x + 8.5}L${x + 7} 760H${x - 7}Z`} fill="#6b5440" />
      <rect x={x - 9} y="748.2" width="18" height="1.8" fill="#5c4632" />
      <ellipse cx={x} cy="741" rx="9.5" ry="8.5" fill="#4e6b4e" />
      <ellipse cx={x - 3} cy="738" rx="4.2" ry="4.2" fill="#5e7d5e" />
    </g>
  );
}

function DoorLeaf({ x, handle }: { x: number; handle: number }) {
  return (
    <g>
      <rect
        x={x + 4.5}
        y="704.3"
        width="25"
        height="21.8"
        fill="var(--color-lamp)"
        fillOpacity="0.45"
      />
      <rect
        x={x + 4.5}
        y="704.3"
        width="25"
        height="21.8"
        fill="none"
        stroke="var(--color-frame-wood)"
        strokeWidth="1.4"
      />
      <path
        d={`M${x + 17} 704.3V726.1M${x + 4.5} 715.2H${x + 29.5}`}
        stroke="var(--color-frame-wood)"
        strokeWidth="1.4"
      />
      <rect
        x={x + 4.5}
        y="729.6"
        width="25"
        height="21.8"
        fill="none"
        stroke="var(--color-frame-wood)"
        strokeWidth="1.4"
      />
      <rect
        x={x + 7.4}
        y="732.5"
        width="19.2"
        height="16"
        fill="none"
        stroke="#6b5440"
        strokeWidth="0.8"
      />
      <rect x={handle} y="724.2" width="2" height="12.7" rx="1" fill="#c9a060" />
    </g>
  );
}

function Entrance() {
  const { rect, door, canopy, porch, houseNumber, lamps, intercom, windows } = HOUSE.entrance;

  return (
    <g>
      <rect {...rect} fill="var(--color-lobby)" />
      <path
        d="M200 676H560M200 690H560M200 704H560M200 718H560M200 732H560M200 746H560"
        stroke="#b0a797"
        strokeWidth="1"
      />

      <rect {...windows[0]} fill="#3e3024" />
      <rect x="232" y="686" width="76" height="52" fill="var(--color-lobby-glass)" />
      <path d="M270 686V738M232 712H308" stroke="#3e3024" strokeWidth="2" />
      <path d="M248 738V726H258V738Z" fill="#3b3730" />
      <path
        d="M253 726C249 718 244 716 240 715C246 714 250 718 252 722C252 716 256 712 262 711C258 715 255 720 254 726Z"
        fill="#3b3730"
      />
      <line x1="289" y1="686" x2="289" y2="696" stroke="#3b3730" />
      <circle cx="289" cy="698" r="3" fill="#d9cdb0" />
      <rect x="224" y="742" width="92" height="4" fill="var(--color-facade)" />

      <rect {...windows[1]} fill="#3e3024" />
      <rect x="452" y="686" width="76" height="52" fill="var(--color-lobby-glass)" />
      <path d="M490 686V738M452 712H528" stroke="#3e3024" strokeWidth="2" />
      <g fill="var(--color-window-glass)">
        <rect x="458" y="718" width="8" height="6" />
        <rect x="468" y="718" width="8" height="6" />
        <rect x="478" y="718" width="8" height="6" />
        <rect x="458" y="726" width="8" height="6" />
        <rect x="468" y="726" width="8" height="6" />
        <rect x="478" y="726" width="8" height="6" />
      </g>
      <rect x="444" y="742" width="92" height="4" fill="var(--color-facade)" />

      <path d="M344 666L330 677M416 666L430 677" stroke="var(--color-dusk)" strokeWidth="1.6" />
      <rect x="342" y="664" width="4" height="3" fill="var(--color-dusk)" />
      <rect x="414" y="664" width="4" height="3" fill="var(--color-dusk)" />
      <rect {...canopy} fill="var(--color-dusk)" />
      <rect x="331" y="682" width="98" height="1.2" fill="var(--color-lobby-glass)" />

      <Pilaster x={328} />
      <Pilaster x={420} />

      <rect {...door} fill="#3e3024" />
      <rect x="330" y="683" width="100" height="6" fill="var(--color-facade)" />
      <rect x="330" y="683" width="100" height="1.5" fill="var(--color-border)" />

      <rect x="346" y="690" width="68" height="10" fill="var(--color-lamp)" fillOpacity="0.75" />
      <path d="M369 690V700M391 690V700" stroke="#3e3024" strokeWidth="1.5" />

      <rect x="346" y="702" width="68" height="58" fill="#5a4636" />
      <DoorLeaf x={346} handle={377} />
      <DoorLeaf x={380} handle={381} />
      <line x1="380" y1="702" x2="380" y2="760" stroke="#3e3024" strokeWidth="2" />

      <circle
        cx={houseNumber.center.x}
        cy={houseNumber.center.y}
        r={houseNumber.radius}
        fill="var(--color-dusk)"
      />
      <text
        x={houseNumber.center.x}
        y={houseNumber.center.y + 3}
        textAnchor="middle"
        fontFamily="var(--font-ui)"
        fontSize="8"
        fill="var(--color-text-on-dark)"
      >
        1
      </text>

      {lamps.map((lamp) => (
        <WallLantern key={lamp.center.x} x={lamp.center.x} y={lamp.center.y} radius={lamp.radius} />
      ))}

      <rect {...intercom.panel} rx="1.5" fill="var(--color-dusk)" />
      <rect x="435.5" y="717" width="7" height="2.2" rx="0.4" fill="var(--color-lobby-glass)" />
      <g fill="#5a6075">
        <circle cx="436.4" cy="727.5" r="0.55" />
        <circle cx="439" cy="727.5" r="0.55" />
        <circle cx="441.6" cy="727.5" r="0.55" />
        <circle cx="436.4" cy="730" r="0.55" />
        <circle cx="439" cy="730" r="0.55" />
        <circle cx="441.6" cy="730" r="0.55" />
      </g>

      <rect x="326" y="755" width="108" height="5" fill="#a89f90" />
      <rect x="326" y="755" width="108" height="1" fill="#c9c1b3" />
      <rect {...porch} fill="var(--color-slab)" />
      <rect x={porch.x} y={porch.y} width={porch.width} height="0.8" fill="#c9c1b3" />
      <rect x="360" y="757.8" width="40" height="2.2" rx="0.5" fill="#6e5a48" />

      <Planter x={320} />
      <Planter x={441} />
    </g>
  );
}

function Garage() {
  const { lintel, body, gate } = HOUSE.garage;

  return (
    <g>
      <rect {...lintel} fill="var(--color-slab)" />
      <rect {...body} fill="#c4bcae" />
      <rect {...gate} fill="var(--color-frame-wood)" />
      <GarageInterior />
    </g>
  );
}

function Lantern() {
  return (
    <g>
      <line x1="580" y1="760" x2="580" y2="702" stroke="#1c202b" strokeWidth="2" />
      <circle cx="580" cy="698" r="24" fill="url(#scene-halo)" />
      <path d="M573 702H587L584 694H576Z" fill="var(--color-lamp-text)" />
    </g>
  );
}

function Roof() {
  const { parapet, stairHut, stairHutCap, stairHutDoor, stairHutWindow, masts, sign } = HOUSE.roof;

  return (
    <g>
      <rect {...parapet} fill="#c9c1b3" />
      <rect
        x={parapet.x}
        y={parapet.y}
        width={parapet.width}
        height="2"
        fill="var(--color-border)"
      />

      <rect {...stairHut} fill="var(--color-border)" />
      <rect {...stairHutCap} fill="var(--color-slab)" />
      <rect {...stairHutDoor} fill="var(--color-lamp)" />
      <rect {...stairHutWindow} fill="#7c8aa0" />

      <path d="M290 100Q325 114 360 96" fill="none" stroke="#5a5f70" strokeWidth="0.6" />
      <g fill="var(--color-lamp-text)">
        <circle cx="300" cy="104" r="1.6" />
        <circle cx="312" cy="107.5" r="1.6" />
        <circle cx="324" cy="108.5" r="1.6" />
        <circle cx="336" cy="106" r="1.6" />
        <circle cx="348" cy="102" r="1.6" />
      </g>

      <g fill="var(--color-dusk)">
        {masts.map((mast) => (
          <rect key={mast.x} {...mast} />
        ))}
      </g>
      <rect {...sign} rx="3" fill="var(--color-dusk)" />
      <rect {...sign} rx="3" fill="url(#scene-halo)" fillOpacity="0.35" />

      <g stroke="#3a3f4d" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path d="M334 131L326.5 148M334 131L341.5 148M334 131L335.5 147" />
        <path d="M329 140.5H340" strokeWidth="1.1" />
      </g>
      <rect x="330.5" y="126" width="7" height="6" rx="1.5" fill="#2e3548" />
      <g transform="rotate(-34 334 123)">
        <rect x="323" y="119.5" width="22" height="7" rx="3.5" fill="#4a5265" />
        <rect x="343" y="118.5" width="5" height="9" rx="2" fill="#2e3548" />
        <rect x="319.5" y="121" width="4" height="4" rx="1.3" fill="#2e3548" />
        <rect x="327" y="116.5" width="9" height="3.5" rx="1.75" fill="#3a3f4d" />
      </g>

      <path d="M300 148L302 136H316L318 148Z" fill="var(--color-slab)" />
      <path
        d="M309 136C305 126 300 124 296 122C302 122 306 126 308 130C308 124 312 118 320 116C314 122 311 128 310 136Z"
        fill="#5e7d5e"
      />
      <g fill="#5a4636">
        <rect x="396" y="138" width="4" height="10" />
        <rect x="454" y="138" width="4" height="10" />
        <rect x="396" y="127" width="4" height="9" />
        <rect x="454" y="127" width="4" height="9" />
      </g>
      <g fill="#7a6048">
        <rect x="392" y="127" width="70" height="3" rx="1" />
        <rect x="392" y="131.5" width="70" height="2.5" rx="1" />
        <rect x="390" y="134.5" width="74" height="4" rx="1" />
      </g>

      <rect x="540" y="100" width="18" height="48" fill="#c9c1b3" />
      <path d="M530 148V76M522 86H538M524 96H536" stroke="#5a5f70" strokeWidth="1.2" />
    </g>
  );
}

export function HouseLayer() {
  return (
    <div className={styles.layer}>
      <div className={`${styles.layer} ${styles.wide} ${styles.ground}`} />

      <svg className={styles.layer} viewBox={SCENE_VIEW_BOX} aria-hidden="true">
        <Basement />
        <Facade />
      </svg>

      <GlowLayer />

      <svg className={styles.layer} viewBox={SCENE_VIEW_BOX} aria-hidden="true">
        <Windows />
        <Entrance />
        <Roof />
        <Garage />
        <Lantern />
      </svg>

      <div
        className={styles['gate-clip']}
        style={{
          left: left(76),
          top: top(702),
          width: size(92),
          height: size(46),
        }}
      >
        <div className={styles.gate} />
      </div>

      <div
        className={styles['garage-slit']}
        style={{
          left: left(HOUSE.garage.lightStrip.x),
          top: top(HOUSE.garage.lightStrip.y),
          width: size(HOUSE.garage.lightStrip.width),
          height: size(HOUSE.garage.lightStrip.height),
        }}
      />

      <div
        className={styles['garage-light']}
        style={{
          left: left(62),
          top: top(738),
          width: size(120),
          height: size(44),
        }}
      />

      <div
        data-cycle=""
        className={styles.smoke}
        style={box(SMOKE_BOX.x, SMOKE_BOX.y, SMOKE_BOX.width, SMOKE_BOX.height)}
      >
        {SMOKE.map((puff) => (
          <div
            key={puff.y}
            className={styles.puff}
            style={{
              left: size(puff.x - puff.r - SMOKE_BOX.x),
              top: size(puff.y - puff.r - SMOKE_BOX.y),
              width: size(puff.r * 2),
              height: size(puff.r * 2),
            }}
          />
        ))}
      </div>
    </div>
  );
}
