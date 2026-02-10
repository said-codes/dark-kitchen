import { clsx } from "clsx";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

export default function Card({ className, hover, ...props }: Props) {
  return (
    <div
      className={clsx(
        "rounded-2xl bg-white shadow-soft ring-1 ring-black/5",
        hover && "transition hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      {...props}
    />
  );
}