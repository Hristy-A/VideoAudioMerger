import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'overlayscrollbars/overlayscrollbars.css';
import '~/global.css';

export function renderPage(app: ReactNode) {
  const root = createRoot(document.getElementById('root')!);

  root.render(
    <StrictMode>
      <OverlayScrollbarsComponent style={{ height: '100vh' }}>{app}</OverlayScrollbarsComponent>
    </StrictMode>,
  );
}
