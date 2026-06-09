import { buildAppDeepLink, buildWebFallbackUrl, type ShareTarget } from '../routes';
import { DownloadLinks } from './DownloadLinks';
import { Logo } from './Logo';
import { OpenAppModal } from './OpenAppModal';

type SharePageProps = {
  target: ShareTarget;
  showModal: boolean;
  onCloseModal: () => void;
};

export function SharePage({ target, showModal, onCloseModal }: SharePageProps) {
  const isError = !target.isValid;
  const appDeepLink = buildAppDeepLink(target);
  const webFallbackUrl = buildWebFallbackUrl(target);

  return (
    <main className="page-shell">
      <section className="share-panel" aria-labelledby="page-title">
        <Logo />

        <div className="hero-copy">
          <p className={`status-pill ${isError ? 'status-pill--error' : ''}`}>
            {isError ? 'Enlace no disponible' : target.kind === 'home' ? 'RuTampico Share' : target.label}
          </p>
          <h1 id="page-title">
            {isError ? 'No pudimos abrir esta ruta' : 'Abre la ruta compartida en RuTampico'}
          </h1>
          <p>
            {isError
              ? 'El link no tiene los parametros necesarios. Puedes abrir RuTampico o volver a intentarlo con un enlace valido.'
              : 'Consulta el recorrido y los detalles de transporte desde la app. Si prefieres, tambien puedes continuar con la version web.'}
          </p>
        </div>

        <div className="route-card" aria-label="Resumen del enlace compartido">
          <div className="route-card__map" aria-hidden="true">
            <span className="route-card__line route-card__line--blue" />
            <span className="route-card__line route-card__line--green" />
            <span className="route-card__line route-card__line--orange" />
            <span className="route-card__pin route-card__pin--start" />
            <span className="route-card__pin route-card__pin--end" />
          </div>
          <div className="route-card__copy">
            <span>Ruta compartida</span>
            <strong>{isError ? 'Parametros incompletos' : target.label}</strong>
          </div>
        </div>

        <div className="action-stack" aria-label="Acciones principales">
          <a className="button button--primary" href={appDeepLink}>
            Abrir en aplicacion
          </a>
          <a className="button button--secondary" href={webFallbackUrl}>
            Continuar en web
          </a>
        </div>

        <DownloadLinks />
      </section>

      {showModal ? <OpenAppModal target={target} onClose={onCloseModal} /> : null}
    </main>
  );
}
