import { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { CaptainSymbol } from '../brand/CaptainSymbol';
import { ServiceIcon } from '../ui/ServiceIcon';
import { introSatellites } from '../../data/scenes';
import { useSceneProgress } from '../../hooks/useSceneProgress';
import type { SceneNode } from '../../types/content';

const W = 600;
const H = 440;
const CX = 300;
const CY = 220;
const ROWS = [80, 220, 360];

function pathFor(index: number): {d: string;x: number;y: number;} {
  const left = index < 3;
  const y = ROWS[index % 3];
  const x = left ? 70 : 530;
  const end = left ? 100 : 500;
  const c1 = left ? 210 : 390;
  const c2 = left ? 190 : 410;
  return { d: `M${CX} ${CY} C ${c1} ${CY}, ${c2} ${y}, ${end} ${y}`, x, y };
}

/** Applications connecting to APIs, databases, cloud, AI, security and users — drawn by scroll. */
export function SystemDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress, reduce } = useSceneProgress(ref, ['start end', 'center center']);
  const coreScale = useTransform(progress, [0, 0.4], [0.9, 1]);
  const packetOpacity = useTransform(progress, [0.85, 1], [0, 1]);

  return (
    <div ref={ref} className="relative mx-auto aspect-[15/11] w-full max-w-[720px]">
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        {introSatellites.map((node, i) =>
        <DiagramLine key={node.id} d={pathFor(i).d} index={i} progress={progress} />
        )}
        {!reduce &&
        <motion.g style={{ opacity: packetOpacity }}>
            {introSatellites.map((node, i) =>
          <g key={node.id}>
                <circle r="3.5" className="fill-forest-500">
                  <animateMotion dur="2.6s" repeatCount="indefinite" path={pathFor(i).d} begin={`${i * 0.35}s`} />
                </circle>
                <circle r="3" className="fill-lemon-600">
                  <animateMotion
                dur="2.6s"
                repeatCount="indefinite"
                path={pathFor(i).d}
                keyPoints="1;0"
                keyTimes="0;1"
                calcMode="linear"
                begin={`${1.3 + i * 0.35}s`} />
              
                </circle>
              </g>
          )}
          </motion.g>
        }
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          style={{ scale: coreScale }}
          className="flex items-center gap-3 rounded-2xl bg-forest-800 py-3 pl-3 pr-5 text-white shadow-[0_24px_48px_-24px_rgba(14,74,50,0.6)] md:py-4 md:pl-4 md:pr-6">
          
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 md:h-10 md:w-10">
            <CaptainSymbol size={22} className="text-white" />
          </span>
          <span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-white/60 md:text-[10px]">Core</span>
            <span className="block font-display text-[15px] font-semibold tracking-[-0.01em] md:text-lg">Application</span>
          </span>
        </motion.div>
      </div>

      {introSatellites.map((node, i) =>
      <Satellite key={node.id} node={node} index={i} progress={progress} position={pathFor(i)} />
      )}
    </div>);

}

function DiagramLine({ d, index, progress }: {d: string;index: number;progress: MotionValue<number>;}) {
  const start = 0.15 + index * 0.07;
  const pathLength = useTransform(progress, [start, start + 0.3], [0, 1]);
  return (
    <>
      <path d={d} fill="none" stroke="#E3E7E1" strokeWidth={1.25} />
      <motion.path d={d} fill="none" stroke="#16734D" strokeWidth={1.5} style={{ pathLength }} />
    </>);

}

interface SatelliteProps {
  node: SceneNode;
  index: number;
  progress: MotionValue<number>;
  position: {x: number;y: number;};
}

function Satellite({ node, index, progress, position }: SatelliteProps) {
  const start = 0.3 + index * 0.07;
  const opacity = useTransform(progress, [start, start + 0.15], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.15], [0.9, 1]);
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position.x / W * 100}%`, top: `${position.y / H * 100}%` }}>
      
      <motion.div
        style={{ opacity, scale }}
        className="flex flex-col items-center gap-1.5 md:flex-row md:gap-2 md:rounded-full md:border md:border-line md:bg-white md:py-1.5 md:pl-1.5 md:pr-4 md:shadow-[0_8px_24px_-14px_rgba(11,21,17,0.25)]">
        
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-forest-200 bg-white text-forest-700 md:border-0 md:bg-forest-50">
          <ServiceIcon name={node.icon} className="h-4 w-4" strokeWidth={2} />
        </span>
        <span className="whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink md:text-[11px]">
          {node.label}
        </span>
      </motion.div>
    </div>);

}