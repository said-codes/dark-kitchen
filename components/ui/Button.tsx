import { clsx } from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export default function Button({ className, variant = "primary", ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-[var(--color-primary)] text-white hover:opacity-90 focus:ring-[var(--color-primary)]",
    secondary: "bg-[var(--color-secondary)] text-white hover:opacity-90 focus:ring-[var(--color-secondary)]",
    ghost: "bg-transparent text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-400"
  };
  return <button className={clsx(base, variants[variant], className)} {...props} />;
}