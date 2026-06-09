import { shareConfig } from '../config';

export function DownloadLinks() {
  return (
    <div className="download-links" aria-label="Descargar RuTampico">
      <a className="store-link" href={shareConfig.appStoreUrl} rel="noreferrer">
        <span className="store-link__label">Descargar en</span>
        <span className="store-link__store">App Store</span>
      </a>
      <a className="store-link" href={shareConfig.googlePlayUrl} rel="noreferrer">
        <span className="store-link__label">Disponible en</span>
        <span className="store-link__store">Google Play</span>
      </a>
    </div>
  );
}
