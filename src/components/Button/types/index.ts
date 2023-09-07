export enum ButtonVariant {
  "primary",
  "secondary",
}

export enum ButtonSize {
  "xs",
  "sm",
  "md",
  "lg",
}

export type ButtonProps = {
  isLoading?: boolean;
  variant?: keyof typeof ButtonVariant;
  size?: keyof typeof ButtonSize;
} & React.ComponentPropsWithRef<"button">;
