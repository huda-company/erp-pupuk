export type StoryIcon = {
  label: string;
  name: string;
  height: number;
  width: number;
};

export type IconProps = {
  src: string;
  height: number;
  width: number;
  className?: string;
  onClick?: () => void;
  unoptimized?: boolean;
};
