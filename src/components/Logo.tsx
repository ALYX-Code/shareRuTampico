import { shareConfig } from '../config';

export function Logo() {
  return (
    <a className="brand" href="/" aria-label="Ir al inicio de RuTampico Share">
      <img className="brand__mark" src={shareConfig.logoUrl} alt="" width="64" height="64" />
      <span className="brand__copy">
        <span className="brand__eyebrow">RuTampico</span>
        <span className="brand__name">Rutas compartidas</span>
      </span>
    </a>
  );
}
