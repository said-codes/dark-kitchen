import BusinessHours from "./BusinessHours";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-neutral-200 py-8 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 text-sm text-neutral-600">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="font-semibold text-lg text-neutral-800 mb-2">Dark Kitchen Curumaní</div>
            <div>Cra. 17 # 9A-68, Curumaní, Cesar</div>
            <div className="mt-1">Pedidos: +57 313 6467910</div>
          </div>
          <div>
            <BusinessHours />
          </div>
        </div>
      </div>
    </footer>
  );
}