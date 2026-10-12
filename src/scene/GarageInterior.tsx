export function GarageInterior() {
  return (
    <g clipPath="url(#scene-garage-opening)">
      <rect x="76" y="710.3" width="92" height="49.7" fill="#5c4632" />
      <circle cx="122" cy="744.4" r="55.2" fill="url(#scene-halo)" />
      <rect x="76" y="757.2" width="92" height="2.8" fill="#3e3024" />

      <rect x="85.2" y="727.8" width="21.2" height="30.4" rx="1.8" fill="var(--color-border)" />
      <path d="M85.2 738.8H106.4" stroke="#a9a194" strokeWidth="0.5" />
      <g fill="#6b6252">
        <rect x="102.7" y="730.6" width="1.2" height="5.5" />
        <rect x="102.7" y="741.6" width="1.2" height="7.4" />
      </g>
      <rect x="88.9" y="744.4" width="5.5" height="4.1" fill="var(--color-lamp)" />
      <rect x="96.2" y="731.5" width="4.1" height="5.1" fill="#8fb0b8" />

      <g fill="#2e2620">
        <rect x="127.5" y="745.3" width="35.9" height="2.3" />
        <rect x="129.4" y="747.6" width="1.8" height="10.6" />
        <rect x="159.7" y="747.6" width="1.8" height="10.6" />
        <rect x="132.1" y="731.5" width="13.8" height="13.8" rx="0.9" />
      </g>
      <rect
        x="134.9"
        y="734.2"
        width="8.3"
        height="2.8"
        fill="var(--color-lamp)"
        fillOpacity="0.8"
      />

      <path d="M150.5 739.8H156V744.4Q153.3 746.2 150.5 744.4Z" fill="var(--color-text-on-dark)" />
      <path
        d="M152.4 737.9Q151 736.1 152.4 734.2Q153.7 732.4 152.4 730.6M154.7 737.9Q153.3 736.1 154.7 734.2"
        fill="none"
        stroke="var(--color-text-on-dark)"
        strokeOpacity="0.6"
        strokeWidth="0.6"
      />

      <path d="M122 731.5V737" stroke="#2e2620" strokeWidth="0.7" />
      <path d="M117.9 740.2L119.7 737H124.3L126.1 740.2Z" fill="#2e2620" />
      <circle cx="122" cy="741.1" r="1.4" fill="var(--color-lamp-bright)" />
    </g>
  );
}
