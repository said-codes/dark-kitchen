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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className={clsx("glass relative w-full max-w-xl scale-100 transform rounded-2xl p-6 text-neutral-900 opacity-100 shadow-2xl transition-all")}>
        <div className="mb-4 flex items-center justify-between">
          {title && <h3 className="text-xl font-bold">{title}</h3>}
          <button onClick={onClose} className="rounded-full p-1 hover:bg-neutral-100/50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
