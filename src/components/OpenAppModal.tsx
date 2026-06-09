import { useEffect, useRef } from 'react';

import { buildAppDeepLink, buildWebFallbackUrl, type ShareTarget } from '../routes';

type OpenAppModalProps = {
  target: ShareTarget;
  onClose: () => void;
};

export function OpenAppModal({ target, onClose }: OpenAppModalProps) {
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const deepLink = buildAppDeepLink(target);
  const webFallbackUrl = buildWebFallbackUrl(target);

  useEffect(() => {
    openButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  function handleOpenApp() {
    window.location.href = deepLink;
  }

  function handleContinueWeb() {
    onClose();
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="open-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shared-route-title"
        aria-describedby="shared-route-description"
      >
        <div className="sheet-handle" aria-hidden="true" />
        <div className="modal-icon" aria-hidden="true">
          <span className="modal-icon__road" />
        </div>
        <div className="modal-copy">
          <p className="modal-kicker">{target.label}</p>
          <h1 id="shared-route-title">Te compartieron esta ruta</h1>
          <p id="shared-route-description">
            Visualizala dentro de la app RuTampico para ver el recorrido, detalles y opciones de
            transporte.
          </p>
        </div>
        <div className="modal-actions">
          <button
            ref={openButtonRef}
            className="button button--primary"
            type="button"
            onClick={handleOpenApp}
          >
            Abrir en aplicacion
          </button>
          <button
            className="button button--ghost"
            type="button"
            onClick={handleContinueWeb}
          >
            Continuar en web
          </button>
        </div>
        <a className="modal-fallback-link" href={webFallbackUrl}>
          Ir a la version web de RuTampico
        </a>
      </section>
    </div>
  );
}
