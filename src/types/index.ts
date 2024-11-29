export interface TimerConfig {
  interval: number;
  repetitions: number | 'unlimited';
  task: string;
}

export interface NavItem {
  label: string;
  icon: string;
  href: string;
}