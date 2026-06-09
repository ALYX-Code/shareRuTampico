import { useMemo, useState } from 'react';

import { SharePage } from './components/SharePage';
import { getShareTarget } from './routes';

export function App() {
  const target = useMemo(() => getShareTarget(window.location), []);
  const [showModal, setShowModal] = useState(target.kind !== 'home' && target.isValid);

  return <SharePage target={target} showModal={showModal} onCloseModal={() => setShowModal(false)} />;
}
