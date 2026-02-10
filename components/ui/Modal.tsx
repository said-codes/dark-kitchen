import { clsx } from "clsx";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export default function Modal({ open, onClose, children, title }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className={clsx("glass w-full max-w-xl rounded-2xl p-6 text-neutral-900")}> 
          {title && <h3 className="mb-4 text-lg font-semibold">{title}</h3>}
          {children}
        </div>
      </div>
    </div>
  );
}