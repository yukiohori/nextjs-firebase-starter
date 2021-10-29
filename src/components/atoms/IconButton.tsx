export type Props = {
  color?: string;
  textFormat?: string;
  borderFormat?: string;
  size?: "small" | "medium" | "large";
  label?: string;
  Icon: React.ReactNode;
  onClick?: () => void;
};

const IconButton = ({
  size = "medium",
  color = "gray",
  label,
  textFormat = "font-bold",
  borderFormat = "rounded-none",
  Icon,
  onClick,
}: Props) => {
  const sizeFormat = () => {
    switch (size) {
      case "small":
        return "py-1.5 px-4 text-xs";
      case "medium":
        return "py-2 px-5 text-sm";
      case "large":
        return "py-3 px-6 text-base";
      default:
        return "py-1.5 px-4 text-xs";
    }
  };
  return (
    <button
      onClick={onClick}
      className={`${sizeFormat()} bg-${color}-200 hover:bg-${color}-300 text-${color}-darkest ${textFormat} ${borderFormat} inline-flex items-center`}
    >
      {Icon}
      <span>{label}</span>
    </button>
  );
};

export default IconButton;
