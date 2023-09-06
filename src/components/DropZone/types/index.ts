export type DropzoneProps = {
  className?: string;
  hasError?: boolean;
  value?: string;
  maxSize: number | 0;
  errorMessage?: string;
  onChange?: (acceptedFiles: File) => void;
  onDrop?: () => void;
  onClick?: () => void;
};
