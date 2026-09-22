import { ActivityIcon, BotIcon, BrainIcon, BriefcaseIcon, ClapperboardIcon, CloudIcon, CodeIcon, CompassIcon, CpuIcon, DatabaseIcon, FileTextIcon, GaugeIcon, GitBranchIcon, GlobeIcon, HeadsetIcon, LayersIcon, LayoutGridIcon, LightbulbIcon, LockIcon, MailIcon, MessageSquareIcon, MonitorIcon, PackageIcon, PenToolIcon, PlugIcon, RefreshCwIcon, RocketIcon, ScanSearchIcon, SearchIcon, ServerIcon, SettingsIcon, ShieldCheckIcon, SmartphoneIcon, SparklesIcon, TargetIcon, TrendingUpIcon, UsersIcon, WalletIcon, WorkflowIcon, WrenchIcon, ZapIcon, BoxIcon } from "lucide-react";
import type { IconKey } from "../../types/content";
const ICONS: Record<IconKey, typeof BoxIcon> = {
  code: CodeIcon,
  globe: GlobeIcon,
  bot: BotIcon,
  shield: ShieldCheckIcon,
  cloud: CloudIcon,
  layout: LayoutGridIcon,
  smartphone: SmartphoneIcon,
  monitor: MonitorIcon,
  cpu: CpuIcon,
  plug: PlugIcon,
  refresh: RefreshCwIcon,
  search: SearchIcon,
  clapperboard: ClapperboardIcon,
  database: DatabaseIcon,
  users: UsersIcon,
  file: FileTextIcon,
  brain: BrainIcon,
  gauge: GaugeIcon,
  zap: ZapIcon,
  mail: MailIcon,
  headset: HeadsetIcon,
  briefcase: BriefcaseIcon,
  wallet: WalletIcon,
  package: PackageIcon,
  settings: SettingsIcon,
  message: MessageSquareIcon,
  lock: LockIcon,
  server: ServerIcon,
  workflow: WorkflowIcon,
  sparkles: SparklesIcon,
  activity: ActivityIcon,
  target: TargetIcon,
  scan: ScanSearchIcon,
  trending: TrendingUpIcon,
  layers: LayersIcon,
  rocket: RocketIcon,
  wrench: WrenchIcon,
  lightbulb: LightbulbIcon,
  pen: PenToolIcon,
  branch: GitBranchIcon,
  compass: CompassIcon
};
interface ServiceIconProps {
  name: IconKey;
  className?: string;
  strokeWidth?: number;
}
export function ServiceIcon({
  name,
  className,
  strokeWidth = 1.75
}: ServiceIconProps) {
  const Icon = ICONS[name];
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}