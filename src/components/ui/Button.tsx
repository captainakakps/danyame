import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-rust text-white hover:bg-rust/90",
  secondary:
    "bg-white text-ink hover:bg-white/90",
  outline:
    "border border-white/30 bg-white/[0.01] text-white hover:bg-white/10",
};

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  type?: never;
  disabled?: never;
  onClick?: never;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

const baseClasses =
  "inline-flex h-[50px] items-center justify-center rounded-[100px] px-4 text-base font-medium transition-colors duration-150";

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        className={classes}
        style={{ fontFamily: "var(--font-body)" }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-60`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {children}
    </button>
  );
}
