import type { CSSProperties } from 'react';

import {
  GROUND_Y,
  SCENE_BOTTOM,
  SCENE_WIDE_LEFT,
  SCENE_WIDE_RIGHT,
  SCENE_WIDE_VIEW_BOX,
  SCENE_WIDE_WIDTH,
} from './layout';
import styles from './scene.module.css';
import { box, size } from './units';

const TOPSOIL = 4;

const SOIL_MID =
  'M-653.333 805.333C-573.333 810.667 -493.333 802.667 -413.333 807.333' +
  'C-333.333 811.333 -253.333 803.333 -173.333 808' +
  'C-93.333 804 -13.333 813.333 66.667 809.333' +
  'C173.333 804 253.333 812 360 808' +
  'C480 802.667 600 813.333 786.667 806.667' +
  'C866.667 812 946.667 803.333 1026.667 808' +
  'C1106.667 812.667 1186.667 804 1266.667 808V880H-653.333Z';

const SOIL_DEEP =
  'M-653.333 850.667C-546.667 855.333 -440 847.333 -333.333 852' +
  'C-280 854 -226.667 849.333 -173.333 852' +
  'C-66.667 848 40 856 173.333 852' +
  'C293.333 848 426.667 857.333 560 852' +
  'C653.333 848 720 854.667 786.667 850.667' +
  'C880 847.333 973.333 856 1066.667 851.333' +
  'C1133.333 848 1200 854.667 1266.667 851.333V880H-653.333Z';

const GRASS_BASE = 760.667;
const GRASS_STEP = 44 / 3;

const GRASS_ROWS = [
  {
    anchor: -168,
    reach: 'start',
    heights: [
      3.333, 4.667, 6, 3.333, 3.333, 4, 6, 5.333, 4, 4.667, 4.667, 6, 4.667, 5.333, 3.333, 3.333,
      5.333, 5.333, 5.333, 5.333, 4.667, 3.333, 4, 3.333, 4.667,
    ],
  },
  {
    anchor: 568,
    reach: 'end',
    heights: [4.667, 5.333, 4, 6, 3.333, 4, 6, 4.667, 4, 6, 3.333, 6, 4.667, 3.333, 4.667],
  },
] as const;

const PEBBLES: [number, number, number, number][] = [
  [-68, 861.333, 1.333, 1],
  [332, 869.333, 1.333, 1],
  [-116, 784.667, 2.667, 1.867],
  [161.333, 785.333, 3.333, 2.333],
  [605.333, 790.667, 2, 1.4],
  [694, 876.667, 3.333, 2.333],
  [-82.667, 868, 3.333, 2.333],
  [134.667, 777.333, 3.333, 2.333],
  [14.667, 819.333, 2.667, 1.867],
  [30, 862, 1.333, 1],
  [612.667, 822, 3.333, 2.333],
  [612.667, 802, 2, 1.4],
  [-34, 863.333, 1.333, 1],
  [603.333, 780, 3.333, 2.333],
  [114, 854.667, 3.333, 2.333],
  [468.667, 869.333, 2.667, 1.867],
  [172, 800.667, 2, 1.4],
  [-55.333, 868, 2, 1.4],
  [226, 873.333, 1.333, 1],
  [-6, 857.333, 2.667, 1.867],
  [58, 828, 2, 1.4],
  [-113.333, 782.667, 3.333, 2.333],
  [615.333, 823.333, 2, 1.4],
  [311.333, 871.333, 2.667, 1.867],
  [624.667, 847.333, 1.333, 1],
  [-39.333, 816, 2.667, 1.867],
  [256, 868, 2.667, 1.867],
  [62.667, 874, 1.333, 1],
  [130.667, 818.667, 2, 1.4],
  [171.333, 837.333, 2.667, 1.867],
  [60, 846, 2.667, 1.867],
  [583.333, 817.333, 2, 1.4],
  [420.667, 863.333, 2, 1.4],
  [765.333, 834.667, 2, 1.4],
  [-54, 800, 2, 1.4],
  [150, 809.333, 1.333, 1],
  [495.333, 870, 2, 1.4],
  [-161.333, 794.667, 2.667, 1.867],
  [665.333, 866, 2, 1.4],
  [4.667, 857.333, 3.333, 2.333],
  [-25.333, 852, 2.667, 1.867],
  [-82, 802, 1.333, 1],
  [118, 844.667, 2, 1.4],
  [-16.667, 828, 3.333, 2.333],
  [-95.333, 787.333, 1.333, 1],
  [606.667, 795.333, 3.333, 2.333],
  [-625.9, 830.1, 2.667, 1.867],
  [-593.1, 780.1, 3.333, 2.333],
  [-592.8, 850.3, 2, 1.4],
  [-586.6, 834.9, 3.333, 2.333],
  [-547.9, 781.9, 3.333, 2.333],
  [-540, 831.3, 2.667, 1.867],
  [-537.2, 842.6, 2.667, 1.867],
  [-507.3, 839.9, 2.667, 1.867],
  [-459.1, 855.7, 2, 1.4],
  [-429.9, 779.7, 2, 1.4],
  [-400.3, 812.2, 3.333, 2.333],
  [-397.3, 796.7, 2.667, 1.867],
  [-381.4, 775.6, 2.667, 1.867],
  [-330.2, 780.5, 2.667, 1.867],
  [-320.2, 847.4, 1.333, 1],
  [-318.5, 836.2, 2.667, 1.867],
  [-308.1, 873.7, 1.333, 1],
  [-293.5, 839.6, 2, 1.4],
  [-291, 774.5, 1.333, 1],
  [-285.5, 867.3, 2.667, 1.867],
  [-278.2, 794.5, 3.333, 2.333],
  [-267.6, 870.4, 1.333, 1],
  [-265.9, 807.1, 2, 1.4],
  [-261.6, 853.7, 3.333, 2.333],
  [-257.3, 803.1, 2, 1.4],
  [-249.7, 789.6, 3.333, 2.333],
  [-234.2, 774, 2.667, 1.867],
  [-232.1, 811.7, 3.333, 2.333],
  [-209.5, 772.9, 2.667, 1.867],
  [-200.4, 844.8, 2.667, 1.867],
  [-188.8, 812.4, 3.333, 2.333],
  [826.2, 783, 3.333, 2.333],
  [830.7, 771.2, 3.333, 2.333],
  [862.9, 817.1, 2, 1.4],
  [872.5, 771.3, 2.667, 1.867],
  [873.9, 798.1, 3.333, 2.333],
  [881.2, 802.9, 2, 1.4],
  [891.3, 869.2, 2.667, 1.867],
  [903.2, 822.3, 2, 1.4],
  [905.3, 861.5, 3.333, 2.333],
  [918.8, 772, 1.333, 1],
  [939.4, 851.1, 2.667, 1.867],
  [940.6, 800.7, 2, 1.4],
  [978.1, 870.8, 2, 1.4],
  [998.2, 863.3, 2, 1.4],
  [1003.5, 851.3, 1.333, 1],
  [1006.2, 872.9, 2, 1.4],
  [1011.5, 846.4, 2.667, 1.867],
  [1020.3, 875.2, 2, 1.4],
  [1034.7, 811.6, 1.333, 1],
  [1044.2, 846.3, 1.333, 1],
  [1078.2, 767, 2.667, 1.867],
  [1098.4, 876.7, 1.333, 1],
  [1149, 837.7, 1.333, 1],
  [1159.4, 795.5, 2, 1.4],
  [1161, 801.2, 2, 1.4],
  [1184.4, 845.3, 3.333, 2.333],
  [1192.3, 823.4, 1.333, 1],
  [1208.2, 871.9, 2.667, 1.867],
  [1217.4, 812.9, 3.333, 2.333],
  [1244.7, 845.4, 3.333, 2.333],
  [1260.5, 858.4, 1.333, 1],
];

const GARAGE_ROOTS = [
  'M-46.667 762.667C-45.333 776 -52 786.667 -49.333 801.333C-48 810.667 -54.667 817.333 -58.667 825.333',
  'M-48 778.667C-40 784 -30.667 782.667 -25.333 790.667',
  'M-49.333 796C-57.333 801.333 -62.667 800 -69.333 806.667',
  'M-13.333 762.667C-14.667 774.667 -8 784 -10.667 794.667',
  'M-12 780C-4 782.667 0 789.333 6.667 790.667',
];

const CURB_ROOTS: [string, number][] = [
  [
    'M754.667 761.333C756 778.667 749.333 793.333 752 810.667C754 825.333 746.667 838.667 740 854.667',
    2,
  ],
  [
    'M752.667 786.667C741.333 792 733.333 790.667 724 800C717.333 806.667 710.667 808 702.667 817.333',
    1.333,
  ],
  [
    'M752 810.667C762.667 817.333 770.667 816 777.333 825.333C781.333 830.667 784 840 786.667 844',
    1.333,
  ],
  ['M746.667 840C737.333 848 728 848 720 857.333', 1.067],
  ['M724 800C722.667 809.333 726.667 817.333 722.667 826.667', 0.933],
  ['M770.667 817.333C773.333 805.333 780 800 785.333 793.333', 0.933],
  ['M741.333 854.667C744 862.667 741.333 869.333 745.333 876', 0.933],
  [
    'M733.333 762.667C732 773.333 736 781.333 733.333 789.333M776 762.667C777.333 772 773.333 778.667 776 786.667',
    1.067,
  ],
];

const PIPE_Y = 794.667;
const PIPE_END = 200;
const JOINT_PITCH = 120;

const CABLE_Y = 817.333;
const CABLE_END = 192;

const PACKET_RADIUS = 1.667;
const PACKET_SPEED = 80;
const PACKET_GAP = 1.5;
const PACKET_END = 186.667;
const PACKET_RUN = PACKET_END - SCENE_WIDE_LEFT;
const PACKET_CYCLE = PACKET_RUN / PACKET_SPEED;
const PACKET_COUNT = Math.round(PACKET_CYCLE / PACKET_GAP);

const DRAINS = [170.667, 568];

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function tuft(x: number, height: number): string {
  const base = GRASS_BASE;

  return (
    `M${x} ${base}L${round(x - 1.333)} ${round(base - height)}` +
    `M${round(x + 2)} ${base}L${round(x + 2.667)} ${round(base - 1.333 - height)}` +
    `M${round(x + 4)} ${base}L${round(x + 6)} ${round(base + 2 - height)}`
  );
}

function tufts(anchor: number, reach: 'start' | 'end', heights: readonly number[]): string[] {
  const first = reach === 'start' ? Math.ceil((SCENE_WIDE_LEFT - anchor) / GRASS_STEP) : 0;
  const last =
    reach === 'end' ? Math.floor((SCENE_WIDE_RIGHT - anchor) / GRASS_STEP) : heights.length - 1;
  const paths: string[] = [];

  for (let index = first; index <= last; index += 1) {
    const height = heights[((index % heights.length) + heights.length) % heights.length] ?? 0;
    paths.push(tuft(round(anchor + index * GRASS_STEP), height));
  }

  return paths;
}

function pipeJoints(): number[] {
  const list = [140, 26.667];

  for (let x = -93.333; x >= SCENE_WIDE_LEFT; x -= JOINT_PITCH) list.push(round(x));

  return list;
}

const JOINTS = pipeJoints();

export function UndergroundLayer() {
  return (
    <div className={styles.layer}>
      <svg
        className={`${styles.layer} ${styles.wide}`}
        viewBox={SCENE_WIDE_VIEW_BOX}
        aria-hidden="true"
      >
        <rect
          x={SCENE_WIDE_LEFT}
          y={GROUND_Y}
          width={SCENE_WIDE_WIDTH}
          height={SCENE_BOTTOM - GROUND_Y}
          fill="#262b38"
        />
        <path d={SOIL_MID} fill="#232733" />
        <path d={SOIL_DEEP} fill="var(--soil-deep)" />
        <rect
          x={SCENE_WIDE_LEFT}
          y={GROUND_Y}
          width={SCENE_WIDE_WIDTH}
          height={TOPSOIL}
          fill="#2f3544"
        />

        <g fill="var(--color-basement)">
          {PEBBLES.map(([x, y, rx, ry]) => (
            <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={rx} ry={ry} />
          ))}
        </g>

        <g stroke="#4a5a4e" strokeWidth="1.067" strokeLinecap="round" fill="none">
          {GRASS_ROWS.flatMap((row) => tufts(row.anchor, row.reach, row.heights)).map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        <g stroke="#3a3330" strokeWidth="1.333" strokeLinecap="round" fill="none">
          {GARAGE_ROOTS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        <rect x="189.333" y="846" width="381.333" height="10.667" fill="#3a3f4d" />
        <rect x="189.333" y="846" width="381.333" height="2" fill="#454b5b" />
        {DRAINS.map((x) => (
          <g key={x}>
            <rect x={x} y="844" width="21.333" height="16" rx="2" fill="#2c3140" />
            <circle
              cx={x + 10.667}
              cy="852"
              r="4.667"
              fill="var(--soil-deep)"
              stroke="#5a6075"
              strokeWidth="1.333"
            />
          </g>
        ))}

        <path
          d={`M${SCENE_WIDE_LEFT} ${PIPE_Y}H${PIPE_END}`}
          stroke="var(--color-border-on-dark)"
          strokeWidth="4.667"
        />
        <g fill="#5a6075">
          {JOINTS.map((x) => (
            <rect key={x} x={x} y={PIPE_Y - 3.333} width="2.667" height="6.667" />
          ))}
        </g>

        <path
          d={`M${SCENE_WIDE_LEFT} ${CABLE_Y}H${CABLE_END}`}
          stroke="var(--color-dusk)"
          strokeWidth="2.667"
        />
        <rect
          x="190.667"
          y={CABLE_Y - 5.333}
          width="10.667"
          height="10.667"
          rx="1.333"
          fill="#3a4052"
          stroke="#5a6075"
          strokeWidth="0.667"
        />
        <circle cx="196" cy={CABLE_Y} r="1.333" fill="var(--color-online)" />

        <g stroke="#3a3330" strokeLinecap="round" fill="none">
          {CURB_ROOTS.map(([d, width]) => (
            <path key={d} d={d} strokeWidth={width} />
          ))}
        </g>
      </svg>

      <div
        data-cycle=""
        className={styles.packets}
        style={
          {
            ...box(
              SCENE_WIDE_LEFT - PACKET_RADIUS,
              CABLE_Y - PACKET_RADIUS,
              PACKET_RUN + PACKET_RADIUS * 2,
              PACKET_RADIUS * 2,
            ),
            '--packet-run': size(PACKET_RUN),
            '--packet-cycle': `${PACKET_CYCLE}s`,
          } as CSSProperties
        }
      >
        {Array.from({ length: PACKET_COUNT }, (_, index) => (
          <div
            key={index}
            className={styles.packet}
            style={
              {
                width: size(PACKET_RADIUS * 2),
                height: size(PACKET_RADIUS * 2),
                '--packet-delay': `${index * PACKET_GAP}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
