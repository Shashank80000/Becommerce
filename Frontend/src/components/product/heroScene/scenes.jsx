import {
  At, BLUE, BagRoll, Bucket, Cloth, CREAM, DetergentBox, DishBottle, Drum,
  Flask, FloorShine, Gear, Germ, GarbageBag, IbcTote, INK, Item, Jerrycan,
  LIME, Mop, OilDrop, ORANGE, Plate, PumpBottle, ScrubBrush, Shield, Sponge,
  SprayBottle, Squeegee, Table, TEAL, ToiletBottle, ToiletBrush, TShirt,
  WashingMachine, WindowPane,
} from "./parts";

// Viewbox for every scene: 640 x 520. Objects stand on y ~ 430.

const SPARKLE =
  "M0 -12 C1.5 -2 2 -1.5 12 0 C2 1.5 1.5 2 0 12 C-1.5 2 -2 1.5 -12 0 C-2 -1.5 -1.5 -2 0 -12Z";

const defaultBubbles = [
  [150, 470, 9, 0, 7], [262, 480, 6, 1.6, 6], [330, 470, 12, 3.1, 8],
  [410, 480, 7, 0.8, 6.5], [500, 470, 10, 2.4, 7.5], [560, 460, 5, 4.2, 6],
  [205, 480, 5, 5, 7], [455, 470, 14, 5.6, 9],
];
const defaultSparkles = [
  [120, 150, 1, 0], [560, 120, 0.8, 1.3], [610, 330, 0.6, 2.2], [330, 95, 0.7, 3],
];

export function Backdrop({ glow = LIME, blob = BLUE }) {
  return (
    <g className="hs-layer hs-layer-far">
      <defs>
        <radialGradient id="hs-glow-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glow} stopOpacity="0.85" />
          <stop offset="70%" stopColor={glow} stopOpacity="0.35" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="360" cy="270" r="230" fill="url(#hs-glow-grad)" />
      <path
        className="hs-blob"
        d="M470 90 C560 110 620 190 600 280 C585 360 520 420 430 410 C350 400 360 330 330 270 C300 205 380 70 470 90Z"
        fill={blob}
        opacity="0.55"
      />
      <g className="hs-orbit">
        <ellipse cx="360" cy="280" rx="250" ry="200" fill="none" stroke={INK} strokeOpacity="0.14" strokeDasharray="3 12" />
        <circle cx="610" cy="280" r="5" fill={ORANGE} />
        <circle cx="110" cy="280" r="4" fill={INK} opacity="0.5" />
      </g>
    </g>
  );
}

export function Effects({ bubbles = defaultBubbles, sparkles = defaultSparkles, sparkleColor = INK }) {
  return (
    <g className="hs-layer hs-layer-front">
      {bubbles.map(([x, y, r, delay, duration], index) => (
        <circle
          key={`b${index}`}
          className="hs-bubble"
          cx={x}
          cy={y}
          r={r}
          style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
        />
      ))}
      {sparkles.map(([x, y, s, delay], index) => (
        <g key={`s${index}`} transform={`translate(${x} ${y}) scale(${s})`}>
          <path className="hs-sparkle" d={SPARKLE} fill={sparkleColor} style={{ animationDelay: `${delay}s` }} />
        </g>
      ))}
    </g>
  );
}

const Layer = ({ depth, children }) => (
  <g className={`hs-layer hs-layer-${depth}`}>{children}</g>
);

const manyBubbles = [
  ...defaultBubbles,
  [180, 420, 8, 0.4, 5.5], [380, 430, 11, 2, 6.5], [600, 440, 9, 3.6, 7],
  [280, 430, 6, 4.8, 6], [520, 440, 7, 1.1, 5.8],
];

// One entry per catalogue category (keyed by slug), plus "all".
export const scenes = {
  all: {
    glow: LIME,
    blob: BLUE,
    content: (
      <>
        <Layer depth="mid">
          <Item x={500} y={448} float="slow" shadow={74}><Drum /></Item>
          <Item x={131} y={412} float="b" shadow={46}><ToiletBottle /></Item>
        </Layer>
        <Layer depth="near">
          <Item x={420} y={366} float="c" shadow={62}><Jerrycan /></Item>
        </Layer>
        <Layer depth="front">
          <Item x={248} y={430} float="a" shadow={58}><SprayBottle /></Item>
        </Layer>
      </>
    ),
  },

  "floor-cleaner": {
    glow: LIME,
    blob: "#cfe3c4",
    content: (
      <>
        <Layer depth="mid">
          <At x={340} y={440}><FloorShine width={520} /></At>
          <Item x={510} y={436} float="slow" shadow={70}>
            <Drum body="#a8c8a0" top="#bfdab7" title="20L" sub="FLOOR" />
          </Item>
        </Layer>
        <Layer depth="near">
          <Item x={380} y={420} float="c" shadow={62}>
            <Jerrycan body={ORANGE} title="5L" sub="FLOOR" />
          </Item>
        </Layer>
        <Layer depth="front">
          <At x={200} y={446}>
            <g className="hs-slide"><Mop head={TEAL} /></g>
          </At>
        </Layer>
      </>
    ),
    bubbles: defaultBubbles.slice(0, 5),
  },

  "toilet-cleaner": {
    glow: BLUE,
    blob: "#c7d9f0",
    content: (
      <>
        <Layer depth="mid">
          <Item x={470} y={420} s={0.8} float="slow" shadow={40}>
            <ToiletBottle body={LIME} cap={INK} title="WC" sub="GEL" />
          </Item>
          <Item x={560} y={430} float="b" shadow={34}><ToiletBrush /></Item>
        </Layer>
        <Layer depth="front">
          <Item x={260} y={430} s={1.25} float="a" shadow={56}>
            <ToiletBottle squirt title="WC" sub="TOILET" />
          </Item>
        </Layer>
      </>
    ),
    bubbles: manyBubbles,
  },

  "glass-cleaner": {
    glow: "#cfe7ec",
    blob: BLUE,
    content: (
      <>
        <Layer depth="mid">
          <At x={430} y={400}>
            <WindowPane />
            <At x={0} y={-60}>
              <g className="hs-sweep"><Squeegee /></g>
            </At>
          </At>
        </Layer>
        <Layer depth="front">
          <Item x={200} y={432} float="a" shadow={58}>
            <SprayBottle body={CREAM} liquid="#7fb6e6" liquid2="#b8d6f2" labelBg={BLUE} title="GL" sub="GLASS" mist="#cfe7ec" />
          </Item>
        </Layer>
      </>
    ),
    bubbles: [],
    sparkles: [[330, 120, 1, 0], [560, 150, 0.9, 1], [470, 300, 0.7, 2], [600, 260, 0.6, 3]],
  },

  disinfectant: {
    glow: LIME,
    blob: "#d8ecc4",
    content: (
      <>
        <Layer depth="far">
          <At x={430} y={330}><Shield /></At>
        </Layer>
        <Layer depth="near">
          <Item x={510} y={430} float="c" shadow={60}>
            <Jerrycan body="#6fae6a" title="5L" sub="DISINFECT" />
          </Item>
        </Layer>
        <Layer depth="front">
          <Item x={240} y={432} float="a" shadow={58}>
            <SprayBottle liquid="#8bc79a" liquid2="#c4e3c9" labelBg={LIME} title="99.9%" sub="GERMS" mist="#d8ecc4" />
          </Item>
          <Germ x={120} y={170} r={16} delay={0} />
          <Germ x={150} y={300} r={11} delay={1.2} />
          <Germ x={600} y={170} r={14} delay={2.1} />
          <Germ x={330} y={110} r={10} delay={0.6} />
          <Germ x={610} y={330} r={12} delay={3} />
        </Layer>
      </>
    ),
    bubbles: [],
  },

  degreaser: {
    glow: "#f6d9a8",
    blob: "#f3c9a8",
    content: (
      <>
        <Layer depth="far">
          <At x={560} y={150}><Gear r={62} /></At>
          <At x={480} y={95}><Gear r={34} teeth={8} reverse opacity={0.55} /></At>
        </Layer>
        <Layer depth="mid">
          <Item x={470} y={448} float="slow" shadow={74}><Drum /></Item>
        </Layer>
        <Layer depth="front">
          <Item x={230} y={430} float="a" shadow={62}>
            <Jerrycan body={ORANGE} title="DG" sub="DEGREASER" />
          </Item>
          <OilDrop x={340} y={140} delay={0} />
          <OilDrop x={130} y={120} delay={1.3} />
          <OilDrop x={390} y={210} delay={2.4} />
        </Layer>
      </>
    ),
  },

  "surface-cleaner": {
    glow: LIME,
    blob: "#e8dcc6",
    content: (
      <>
        <Layer depth="mid">
          <At x={360} y={420}><Table width={460} /></At>
        </Layer>
        <Layer depth="near">
          <At x={430} y={420}><Cloth color={TEAL} /></At>
        </Layer>
        <Layer depth="front">
          <Item x={230} y={420} float="a" shadow={0}><SprayBottle /></Item>
        </Layer>
      </>
    ),
    bubbles: [],
    sparkles: [[380, 380, 0.9, 0], [500, 370, 0.7, 1.2], [560, 390, 0.6, 2.3], [330, 120, 0.7, 3]],
  },

  laundry: {
    glow: BLUE,
    blob: "#d7d0ef",
    content: (
      <>
        <Layer depth="mid">
          <Item x={420} y={440} float={null} shadow={100}><WashingMachine /></Item>
        </Layer>
        <Layer depth="near">
          <At x={515} y={140} r={12} s={0.85}>
            <g className="hs-float hs-float-b"><TShirt color={LIME} /></g>
          </At>
        </Layer>
        <Layer depth="front">
          <Item x={200} y={436} float="a" shadow={60}>
            <Jerrycan body="#7fa7d8" title="3L" sub="LAUNDRY" />
          </Item>
          <At x={120} y={150} r={-14} s={0.8}>
            <g className="hs-float hs-float-c"><TShirt color={ORANGE} /></g>
          </At>
        </Layer>
      </>
    ),
    bubbles: manyBubbles,
  },

  kitchen: {
    glow: LIME,
    blob: "#f2e2b8",
    content: (
      <>
        <Layer depth="mid">
          <Item x={470} y={430} float={null} shadow={70}><Plate /></Item>
        </Layer>
        <Layer depth="near">
          <Item x={370} y={444} float="c" shadow={50}><Sponge /></Item>
        </Layer>
        <Layer depth="front">
          <Item x={260} y={436} s={1.1} float="a" shadow={40}><DishBottle /></Item>
        </Layer>
      </>
    ),
    bubbles: manyBubbles,
  },

  hygiene: {
    glow: "#d7efe0",
    blob: BLUE,
    content: (
      <>
        <Layer depth="mid">
          <Item x={480} y={430} s={0.85} float="slow" shadow={40}>
            <DishBottle body={BLUE} cap={INK} title="SAN" sub="ITIZER" />
          </Item>
        </Layer>
        <Layer depth="front">
          <Item x={280} y={436} s={1.25} float={null} shadow={50}><PumpBottle /></Item>
        </Layer>
      </>
    ),
    bubbles: manyBubbles,
  },

  "cleaning-tools": {
    glow: "#f6d9a8",
    blob: BLUE,
    content: (
      <>
        <Layer depth="mid">
          <At x={530} y={446} r={8}><Mop head={LIME} /></At>
          <Item x={420} y={440} float="slow" shadow={66}><Bucket /></Item>
        </Layer>
        <Layer depth="front">
          <At x={220} y={446}><ScrubBrush /></At>
          <At x={180} y={250}>
            <g className="hs-float hs-float-b"><Cloth color={ORANGE} /></g>
          </At>
        </Layer>
      </>
    ),
    bubbles: defaultBubbles.slice(2, 7),
  },

  "garbage-bags": {
    glow: LIME,
    blob: "#d5dbd2",
    content: (
      <>
        <Layer depth="mid">
          <Item x={480} y={440} float={null} shadow={74}>
            <GarbageBag color="#3f6b5a" tie={LIME} />
          </Item>
        </Layer>
        <Layer depth="near">
          <Item x={350} y={446} s={0.8} float={null} shadow={60}>
            <GarbageBag color={INK} tie={ORANGE} />
          </Item>
        </Layer>
        <Layer depth="front">
          <Item x={170} y={446} float="a" shadow={80}><BagRoll /></Item>
        </Layer>
      </>
    ),
    bubbles: [],
  },

  "industrial-chemicals": {
    glow: "#f6d9a8",
    blob: "#d5dbd2",
    content: (
      <>
        <Layer depth="mid">
          <Item x={470} y={436} s={0.95} float={null} shadow={100}><IbcTote /></Item>
        </Layer>
        <Layer depth="near">
          <Item x={300} y={448} float="slow" shadow={70}><Drum body="#e2a15e" top="#eebb83" hazard /></Item>
        </Layer>
        <Layer depth="front">
          <Item x={150} y={440} float="a" shadow={60}><Flask /></Item>
          <Item x={400} y={456} s={0.6} float="b" shadow={44}>
            <Drum body="#7fa7d8" top="#a5c3e6" hazard />
          </Item>
        </Layer>
      </>
    ),
    bubbles: defaultBubbles.slice(0, 4),
  },
};
