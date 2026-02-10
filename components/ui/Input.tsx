import { clsx } from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ className, label, id, ...props }: Props) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={clsx(
          "w-full rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-sm shadow-soft outline-none focus:ring-2 focus:ring-[var(--color-primary)]",
          className
        )}
        {...props}
      />
    </div>
  );
}