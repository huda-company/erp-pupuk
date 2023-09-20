import { useRouter } from "next/navigation";

import { BreadcrumbItemProps } from "./config";

const CustomBreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  href = null,
  children,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <span onClick={handleClick}>
      {href ? (
        <a>{children}</a>
      ) : (
        <span className="text-red-100">{children}</span>
      )}
    </span>
  );
};

export default CustomBreadcrumbItem;
