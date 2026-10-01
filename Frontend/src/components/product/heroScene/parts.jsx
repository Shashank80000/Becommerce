import { useId } from "react";

// Reusable SVG drawings for the catalogue hero scenes. Each part is drawn with
// its origin at the bottom-centre of the object, so <Item x y> places it by
// the point where it touches the ground. Animated elements never carry a
// transform attribute themselves: CSS animations would overwrite it.

export const INK = "#17201d";
export const PAPER = "#f4f1e9";
export const CREAM = "#fbfaf5";
export const LIME = "#d4ed75";
export const BLUE = "#b9dbe1";
export const TEAL = "#7fc6cf";
export const ORANGE = "#ed8253";

const svgId = (id) => id.replace(/[^a-zA-Z0-9_-]/g, "");

export function Item({ x, y, s = 1, float = "a", shadow = 60, children }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {shadow > 0 && (
        <ellipse cx="0" cy="6" rx={shadow} ry="8" fill={INK} opacity="0.1" />
      )}
      <g className={float ? `hs-float hs-float-${float}` : undefined}>{children}</g>
    </g>
  );
}

// Positions a group without touching the animated element inside it.
export const At = ({ x = 0, y = 0, s = 1, r = 0, children }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>{children}</g>
);

export function Label({ x = 0, y, w, h, bg = PAPER, title, sub }) {
  return (
    <g>
      <rect x={x - w / 2} y={y} width={w} height={h} rx="4" fill={bg} />
      <text x={x} y={y + h / 2 + (sub ? 1 : 6)} textAnchor="middle" className="hs-label-big">
        {title}
      </text>
      {sub && (
        <text x={x} y={y + h / 2 + 17} textAnchor="middle" className="hs-label">
          {sub}
        </text>
      )}
    </g>
  );
}

/* ---------- Containers ---------- */

export function SprayBottle({
  body = CREAM,
  liquid = TEAL,
  liquid2 = BLUE,
  head = INK,
  trigger = ORANGE,
  labelBg = LIME,
  title = "AB",
  sub = "SURFACE",
  mist = BLUE,
}) {
  const clip = `spray-${svgId(useId())}`;
  const shape =
    "M206 250 Q206 232 224 230 L272 230 Q290 232 290 250 L294 405 Q294 428 270 428 L228 428 Q202 428 202 405 Z";
  return (
    <g transform="translate(-248 -428)">
      <defs>
        <clipPath id={clip}>
          <path d={shape} />
        </clipPath>
      </defs>
      <path d={shape} fill={body} />
      <g clipPath={`url(#${clip})`}>
        <g className="hs-liquid">
          <path d="M80 318 Q110 306 140 318 T200 318 T260 318 T320 318 T380 318 T440 318 V440 H80 Z" fill={liquid} />
        </g>
        <g className="hs-liquid hs-liquid-back">
          <path d="M80 324 Q110 314 140 324 T200 324 T260 324 T320 324 T380 324 T440 324 V440 H80 Z" fill={liquid2} opacity="0.7" />
        </g>
      </g>
      <path d="M214 256 Q214 242 226 240 L230 240 L230 410 L224 410 Q214 410 214 398 Z" fill="#fff" opacity="0.7" />
      <rect x="226" y="208" width="44" height="26" rx="4" fill={head} />
      <path d="M212 174 Q212 162 226 162 L278 162 Q292 162 292 178 L292 196 Q292 210 278 210 L226 210 Q212 210 212 196 Z" fill={head} />
      <rect x="178" y="174" width="40" height="14" rx="4" fill={head} />
      <circle cx="179" cy="181" r="3" fill={LIME} />
      <path className="hs-trigger" d="M236 208 Q232 236 246 252 L252 248 Q246 232 250 208 Z" fill={trigger} />
      <Label x={249} y={318} w={40} h={58} bg={labelBg} title={title} sub={sub} />
      {mist && <Mist x={170} y={181} color={mist} />}
    </g>
  );
}

export function Mist({ x, y, color = BLUE }) {
  const dots = [
    [0, 0, 7, 0],
    [6, -9, 5, 0.08],
    [4, 9, 6, 0.14],
    [12, -2, 4, 0.2],
    [10, 6, 3, 0.26],
  ];
  return (
    <g transform={`translate(${x} ${y})`}>
      {dots.map(([dx, dy, r, delay], index) => (
        <circle
          key={index}
          className="hs-mist"
          cx={-dx}
          cy={dy}
          r={r}
          fill={color}
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </g>
  );
}

export function Jerrycan({ body = ORANGE, cap = INK, title = "5L", sub = "FLOOR" }) {
  return (
    <g transform="translate(-420 -366)">
      <path d="M356 196 Q356 176 376 176 L446 176 Q484 176 484 212 L484 346 Q484 366 464 366 L376 366 Q356 366 356 346 Z" fill={body} />
      <path d="M420 184 L462 184 Q474 184 474 198 L474 214 L452 214 L452 204 L420 204 Z" fill={PAPER} opacity="0.9" />
      <rect x="368" y="160" width="30" height="20" rx="4" fill={cap} />
      <path d="M366 214 Q366 196 380 194 L388 194 L388 352 L378 352 Q366 352 366 340 Z" fill="#fff" opacity="0.25" />
      <Label x={424} y={244} w={72} h={72} title={title} sub={sub} />
    </g>
  );
}

export function Drum({ body = "#8fbcc5", top = "#a9d0d8", title = "50L", sub = "DEGREASER", hazard = false }) {
  return (
    <g transform="translate(-500 -448)">
      <rect x="430" y="262" width="140" height="186" rx="16" fill={body} />
      <rect x="430" y="262" width="34" height="186" rx="16" fill="#fff" opacity="0.18" />
      <ellipse cx="500" cy="264" rx="70" ry="12" fill={top} />
      <ellipse cx="500" cy="264" rx="52" ry="7" fill={INK} opacity="0.12" />
      <rect x="476" y="250" width="22" height="10" rx="3" fill={INK} />
      <path d="M432 318 H568 M432 396 H568" stroke={INK} strokeOpacity="0.22" strokeWidth="5" />
      {hazard ? (
        <g transform="translate(500 357)">
          <Hazard />
        </g>
      ) : (
        <Label x={500} y={332} w={84} h={50} title={title} sub={sub} />
      )}
    </g>
  );
}

export const Hazard = ({ size = 30 }) => (
  <g>
    <path d={`M0 ${-size} L${size} 0 L0 ${size} L${-size} 0 Z`} fill={ORANGE} stroke={INK} strokeWidth="3" />
    <text x="0" y="9" textAnchor="middle" className="hs-label-big" style={{ fontSize: size * 0.9 }}>
      !
    </text>
  </g>
);

export function ToiletBottle({ body = BLUE, cap = ORANGE, title = "WC", sub = "TOILET", squirt = false }) {
  return (
    <g transform="translate(-131 -412)">
      <path d="M92 250 Q92 228 112 226 L138 226 L150 196 Q156 182 172 186 L176 188 Q184 192 180 204 L164 236 Q170 244 170 256 L170 392 Q170 412 150 412 L110 412 Q92 412 92 392 Z" fill={body} />
      <path d="M100 262 Q100 246 112 244 L118 244 L118 396 L110 396 Q100 396 100 386 Z" fill="#fff" opacity="0.45" />
      <rect x="166" y="172" width="24" height="18" rx="5" transform="rotate(24 178 181)" fill={cap} />
      <Label x={131} y={296} w={54} h={64} title={title} sub={sub} />
      {squirt && (
        <path
          className="hs-squirt"
          d="M190 172 Q236 132 282 196"
          fill="none"
          stroke={TEAL}
          strokeWidth="7"
          strokeLinecap="round"
        />
      )}
    </g>
  );
}

export function PumpBottle({ body = LIME, title = "HAND", sub = "WASH", foam = true }) {
  return (
    <g>
      <path d="M-40 -150 Q-40 -172 -20 -172 L20 -172 Q40 -172 40 -150 L42 -14 Q42 0 28 0 L-28 0 Q-42 0 -42 -14 Z" fill={body} />
      <rect x="-32" y="-150" width="12" height="132" rx="6" fill="#fff" opacity="0.4" />
      <rect x="-16" y="-190" width="32" height="20" rx="4" fill={INK} />
      <g className="hs-pump">
        <rect x="-5" y="-214" width="10" height="26" fill={INK} />
        <rect x="-24" y="-230" width="48" height="18" rx="6" fill={INK} />
        <rect x="18" y="-228" width="36" height="9" rx="4" fill={INK} />
      </g>
      <Label y={-120} w={56} h={58} title={title} sub={sub} />
      {foam && (
        <g className="hs-foam">
          <circle cx="52" cy="-206" r="9" fill="#fff" />
          <circle cx="44" cy="-200" r="7" fill="#fff" />
          <circle cx="60" cy="-199" r="6" fill="#fff" />
        </g>
      )}
    </g>
  );
}

export function DishBottle({ body = LIME, cap = ORANGE, title = "DISH", sub = "LIQUID" }) {
  return (
    <g className="hs-squeeze-body">
      <path d="M-30 -180 Q-30 -198 -14 -198 L14 -198 Q30 -198 30 -180 L34 -16 Q34 0 20 0 L-20 0 Q-34 0 -34 -16 Z" fill={body} />
      <rect x="-24" y="-176" width="10" height="156" rx="5" fill="#fff" opacity="0.4" />
      <rect x="-13" y="-222" width="26" height="26" rx="4" fill={cap} />
      <rect x="-4" y="-238" width="8" height="18" rx="3" fill={cap} />
      <Label y={-130} w={50} h={58} title={title} sub={sub} />
    </g>
  );
}

export function DetergentBox({ body = ORANGE, title = "WASH", sub = "POWDER" }) {
  return (
    <g>
      <path d="M-56 -150 L56 -150 L56 0 L-56 0 Z" fill={body} />
      <path d="M-56 -150 L-38 -168 L74 -168 L56 -150 Z" fill="#f19b76" />
      <path d="M56 -150 L74 -168 L74 -18 L56 0 Z" fill="#c9663d" />
      <rect x="-20" y="-178" width="56" height="12" rx="6" fill={INK} opacity="0.75" />
      <Label y={-120} w={84} h={64} title={title} sub={sub} />
    </g>
  );
}

/* ---------- Tools ---------- */

export function Mop({ head = BLUE, handle = INK }) {
  const strands = Array.from({ length: 12 }, (_, index) => -55 + index * 10);
  return (
    <g>
      <path d="M0 -24 L64 -270" stroke={handle} strokeWidth="9" strokeLinecap="round" />
      <rect x="-14" y="-40" width="28" height="22" rx="6" fill={ORANGE} />
      <rect x="-62" y="-26" width="124" height="16" rx="7" fill={head} />
      <path
        d={strands.map((x) => `M${x} -12 v${12 + (x % 20 === 0 ? 4 : 0)}`).join(" ")}
        stroke={head}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </g>
  );
}

export function ToiletBrush({ handle = INK, bristles = ORANGE }) {
  return (
    <g>
      <rect x="-26" y="-60" width="52" height="60" rx="12" fill={CREAM} />
      <rect x="-26" y="-60" width="52" height="12" rx="6" fill={BLUE} />
      <path d="M0 -50 L18 -250" stroke={handle} strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="2" cy="-66" rx="22" ry="16" fill={bristles} />
    </g>
  );
}

export function Squeegee() {
  return (
    <g>
      <rect x="-6" y="-80" width="12" height="62" rx="5" fill={INK} />
      <rect x="-42" y="-22" width="84" height="14" rx="5" fill={ORANGE} />
      <rect x="-50" y="-8" width="100" height="9" rx="3" fill={INK} />
    </g>
  );
}

export function WindowPane() {
  const clip = `glass-${svgId(useId())}`;
  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <rect x="-104" y="-224" width="208" height="218" rx="4" />
        </clipPath>
      </defs>
      <rect x="-112" y="-232" width="224" height="234" rx="8" fill={CREAM} />
      <rect x="-104" y="-224" width="208" height="218" rx="4" fill="#cfe7ec" />
      <g clipPath={`url(#${clip})`}>
        <g className="hs-glint">
          <path d="M-60 -240 L-20 -240 L-120 20 L-160 20 Z" fill="#fff" opacity="0.75" />
          <path d="M-6 -240 L8 -240 L-92 20 L-106 20 Z" fill="#fff" opacity="0.55" />
        </g>
      </g>
      <path d="M0 -224 V-6 M-104 -115 H104" stroke={CREAM} strokeWidth="10" />
      <rect x="-122" y="-4" width="244" height="12" rx="4" fill={INK} opacity="0.85" />
    </g>
  );
}

export function Cloth({ color = TEAL }) {
  return (
    <g className="hs-wipe">
      <path d="M-56 -30 Q-28 -42 0 -30 T56 -30 L60 6 Q30 -6 0 6 T-60 6 Z" fill={color} />
      <path d="M-40 -28 L-44 2 M-14 -30 L-16 2 M12 -30 L14 2 M38 -30 L40 0" stroke="#fff" strokeOpacity="0.35" strokeWidth="4" />
    </g>
  );
}

export function Bucket({ body = BLUE, rim = "#8fbcc5" }) {
  return (
    <g>
      <path d="M-66 -124 Q0 -210 66 -124" stroke={INK} strokeWidth="6" fill="none" />
      <path d="M-70 -120 L70 -120 L56 0 L-56 0 Z" fill={body} />
      <path d="M-60 -110 L-44 -110 L-40 -8 L-48 -8 Z" fill="#fff" opacity="0.35" />
      <ellipse cx="0" cy="-122" rx="72" ry="12" fill={TEAL} />
      <rect x="-76" y="-128" width="152" height="12" rx="6" fill={rim} />
      <g className="hs-foam-top">
        <circle cx="-30" cy="-132" r="10" fill="#fff" />
        <circle cx="-12" cy="-138" r="13" fill="#fff" />
        <circle cx="10" cy="-134" r="9" fill="#fff" />
        <circle cx="28" cy="-136" r="11" fill="#fff" />
      </g>
    </g>
  );
}

export function ScrubBrush({ body = ORANGE }) {
  return (
    <g className="hs-scrub">
      <path d="M-44 -42 Q0 -96 44 -42" stroke={INK} strokeWidth="8" fill="none" strokeLinecap="round" />
      <rect x="-62" y="-44" width="124" height="28" rx="12" fill={body} />
      <path
        d={Array.from({ length: 12 }, (_, index) => `M${-54 + index * 9.8} -16 v16`).join(" ")}
        stroke={INK}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  );
}

export function Sponge() {
  return (
    <g>
      <rect x="-48" y="-46" width="96" height="30" rx="9" fill="#f2d45c" />
      <rect x="-48" y="-20" width="96" height="20" rx="7" fill="#6fae6a" />
      <circle cx="-22" cy="-32" r="4" fill="#d9b93d" />
      <circle cx="6" cy="-36" r="3" fill="#d9b93d" />
      <circle cx="26" cy="-28" r="4" fill="#d9b93d" />
    </g>
  );
}

export function Plate() {
  return (
    <g className="hs-swing">
      <circle cx="0" cy="-74" r="74" fill="#fff" />
      <circle cx="0" cy="-74" r="52" fill={PAPER} />
      <path className="hs-glint-arc" d="M-46 -112 A60 60 0 0 1 -6 -132" stroke="#fff" strokeWidth="9" strokeLinecap="round" fill="none" />
      <circle cx="0" cy="-74" r="74" fill="none" stroke={INK} strokeOpacity="0.08" strokeWidth="3" />
    </g>
  );
}

/* ---------- Laundry ---------- */

export function WashingMachine() {
  const clip = `door-${svgId(useId())}`;
  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <circle cx="0" cy="-104" r="58" />
        </clipPath>
      </defs>
      <rect x="-104" y="-240" width="208" height="240" rx="18" fill={CREAM} />
      <rect x="-104" y="-240" width="208" height="46" rx="18" fill="#e9e5da" />
      <rect x="-80" y="-226" width="64" height="16" rx="4" fill={INK} opacity="0.8" />
      <circle cx="54" cy="-217" r="10" fill={ORANGE} />
      <circle cx="80" cy="-217" r="7" fill={INK} opacity="0.5" />
      <circle cx="0" cy="-104" r="74" fill={INK} />
      <circle cx="0" cy="-104" r="58" fill={BLUE} />
      <g clipPath={`url(#${clip})`}>
        <path className="hs-liquid" d="M-180 -86 Q-160 -96 -140 -86 T-100 -86 T-60 -86 T-20 -86 T20 -86 T60 -86 T100 -86 T140 -86 V0 H-180 Z" fill={TEAL} opacity="0.8" />
        <g transform="translate(0 -104)">
          <g className="hs-tumble">
            <circle cx="-22" cy="-18" r="18" fill={ORANGE} />
            <path d="M8 6 Q30 -4 34 18 Q20 36 4 26 Z" fill={LIME} />
            <circle cx="20" cy="-26" r="12" fill="#fff" />
            <path d="M-34 14 Q-18 2 -6 18 Q-14 34 -32 30 Z" fill="#fff" opacity="0.85" />
          </g>
        </g>
      </g>
      <circle cx="-20" cy="-130" r="16" fill="#fff" opacity="0.3" />
    </g>
  );
}

export function TShirt({ color = ORANGE }) {
  return (
    <path d="M-40 -40 L-14 -52 Q0 -40 14 -52 L40 -40 L54 -16 L34 -8 L34 40 L-34 40 L-34 -8 L-54 -16 Z" fill={color} />
  );
}

/* ---------- Bags ---------- */

export function GarbageBag({ color = INK, tie = ORANGE }) {
  return (
    <g className="hs-bounce">
      <path d="M-72 -22 Q-94 -112 -40 -152 L-18 -170 L18 -170 L40 -152 Q94 -112 72 -22 Q60 0 0 0 Q-60 0 -72 -22 Z" fill={color} />
      <path d="M-46 -40 Q-62 -100 -28 -138" stroke="#fff" strokeOpacity="0.18" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M-18 -170 L-40 -204 L-4 -178 Z M18 -170 L40 -204 L4 -178 Z" fill={tie} />
      <rect x="-14" y="-178" width="28" height="12" rx="5" fill={tie} />
    </g>
  );
}

export function BagRoll({ color = INK }) {
  return (
    <g>
      <g className="hs-unroll">
        <rect x="40" y="-14" width="150" height="14" fill={color} opacity="0.85" />
        <path d="M80 -14 v14 M120 -14 v14 M160 -14 v14" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="3 3" />
      </g>
      <rect x="-80" y="-76" width="160" height="76" rx="38" fill={color} />
      <ellipse cx="62" cy="-38" rx="22" ry="38" fill="#2c3632" />
      <ellipse cx="62" cy="-38" rx="9" ry="16" fill={PAPER} />
      <rect x="-60" y="-66" width="90" height="10" rx="5" fill="#fff" opacity="0.15" />
    </g>
  );
}

/* ---------- Effects and symbols ---------- */

export function Shield({ color = LIME }) {
  return (
    <g>
      <circle className="hs-ring" cx="0" cy="-82" r="100" fill="none" stroke={color} strokeWidth="6" />
      <g className="hs-pulse">
        <path d="M0 -170 L92 -136 Q94 -46 0 0 Q-94 -46 -92 -136 Z" fill={color} />
        <path d="M0 -150 L72 -124 Q72 -56 0 -20 Z" fill="#fff" opacity="0.25" />
        <path d="M-34 -86 L-8 -60 L38 -112" stroke={INK} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </g>
  );
}

export function Germ({ x, y, r = 14, color = "#8bbf5a", delay = 0 }) {
  const spikes = Array.from({ length: 8 }, (_, index) => {
    const angle = (index / 8) * Math.PI * 2;
    return [Math.cos(angle) * (r + 5), Math.sin(angle) * (r + 5)];
  });
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="hs-germ" style={{ animationDelay: `${delay}s` }}>
        {spikes.map(([sx, sy], index) => (
          <circle key={index} cx={sx} cy={sy} r={r * 0.22} fill={color} />
        ))}
        <circle r={r} fill={color} />
        <circle cx={-r * 0.3} cy={-r * 0.25} r={r * 0.22} fill="#fff" opacity="0.5" />
        <circle cx={r * 0.3} cy={r * 0.2} r={r * 0.14} fill={INK} opacity="0.25" />
      </g>
    </g>
  );
}

export function Gear({ r = 56, teeth = 10, color = INK, opacity = 0.85, reverse = false }) {
  const points = [];
  for (let index = 0; index < teeth * 2; index += 1) {
    const angle = (index / (teeth * 2)) * Math.PI * 2;
    const radius = index % 2 === 0 ? r : r * 0.8;
    const spread = Math.PI / (teeth * 2.4);
    points.push([angle - spread, radius], [angle + spread, radius]);
  }
  const d =
    points
      .map(([angle, radius], index) =>
        `${index ? "L" : "M"}${(Math.cos(angle) * radius).toFixed(1)} ${(Math.sin(angle) * radius).toFixed(1)}`,
      )
      .join(" ") + "Z";
  return (
    <g className={`hs-gear${reverse ? " hs-gear-reverse" : ""}`} opacity={opacity}>
      <path d={d} fill={color} />
      <circle r={r * 0.34} fill={PAPER} />
    </g>
  );
}

export function OilDrop({ x, y, delay = 0, color = "#c79a3b" }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        className="hs-drip"
        style={{ animationDelay: `${delay}s` }}
        d="M0 -22 C8 -9 11 -2 11 4 A11 11 0 0 1 -11 4 C-11 -2 -8 -9 0 -22Z"
        fill={color}
      />
    </g>
  );
}

export function Flask({ liquid = LIME }) {
  const clip = `flask-${svgId(useId())}`;
  const shape = "M-15 -150 L15 -150 L15 -98 L62 -12 Q66 0 52 0 L-52 0 Q-66 0 -62 -12 L-15 -98 Z";
  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <path d={shape} />
        </clipPath>
      </defs>
      <path d={shape} fill="#fff" opacity="0.85" />
      <g clipPath={`url(#${clip})`}>
        <path className="hs-liquid" d="M-180 -56 Q-160 -64 -140 -56 T-100 -56 T-60 -56 T-20 -56 T20 -56 T60 -56 T100 -56 T140 -56 V10 H-180 Z" fill={liquid} />
        {[-24, 0, 18, 32].map((bx, index) => (
          <circle
            key={bx}
            className="hs-boil"
            cx={bx}
            cy="-10"
            r={4 + (index % 2) * 2}
            fill="#fff"
            style={{ animationDelay: `${index * 0.45}s` }}
          />
        ))}
      </g>
      <path d={shape} fill="none" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <rect x="-20" y="-160" width="40" height="12" rx="4" fill={INK} />
    </g>
  );
}

export function IbcTote({ liquid = "#f2e7b3" }) {
  return (
    <g>
      <rect x="-104" y="-22" width="208" height="22" rx="3" fill="#8a7a63" />
      <rect x="-96" y="-212" width="192" height="188" rx="14" fill="#fff" opacity="0.85" />
      <rect x="-96" y="-120" width="192" height="96" rx="12" fill={liquid} />
      <path
        d="M-100 -216 H100 V-22 H-100 Z M-100 -170 H100 M-100 -120 H100 M-100 -70 H100 M-50 -216 V-22 M0 -216 V-22 M50 -216 V-22"
        stroke="#7c847f"
        strokeWidth="5"
        fill="none"
      />
      <rect x="-20" y="-232" width="40" height="18" rx="4" fill={INK} />
    </g>
  );
}

export function Table({ width = 420 }) {
  return (
    <g>
      <rect x={-width / 2} y="0" width={width} height="18" rx="5" fill="#e3d6c0" />
      <rect x={-width / 2} y="14" width={width} height="10" rx="4" fill="#cbb999" />
      <rect x={-width / 2 + 20} y="24" width="14" height="70" fill="#cbb999" />
      <rect x={width / 2 - 34} y="24" width="14" height="70" fill="#cbb999" />
    </g>
  );
}

export function FloorShine({ width = 460 }) {
  const clip = `floor-${svgId(useId())}`;
  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <ellipse cx="0" cy="0" rx={width / 2} ry="34" />
        </clipPath>
      </defs>
      <ellipse cx="0" cy="0" rx={width / 2} ry="34" fill="#fff" opacity="0.55" />
      <g clipPath={`url(#${clip})`}>
        <g className="hs-glint hs-glint-floor">
          <path d="M-40 -40 L0 -40 L-60 40 L-100 40 Z" fill="#fff" />
        </g>
      </g>
    </g>
  );
}
