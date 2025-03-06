import { ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '~/global.css';

export function renderPage(app: ReactNode) {
  const root = createRoot(document.getElementById('root')!);

  root.render(<StrictMode>{app}</StrictMode>);
}
