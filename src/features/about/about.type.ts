export interface Feature {
  icon: string;
  title: string;
  description: string;
  scatter: {
    x: number;
    y: number;
    rotate: number;
    scale: number;
  };
}
