export interface BreadcrumbItemProps {
  href: string | null;
  children: React.ReactNode;
}

export interface BreadcrumbProps {
  items: Array<{ href: string | null; title: string }>;
}
