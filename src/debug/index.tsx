import { lazy, Suspense } from 'react';
import { useSettings } from '@context/SettingsContext';

const DebugPanel = lazy(() => import('./DebugPanel'));

export function DebugTools() {
  const { isDebugMode } = useSettings();
  if (!isDebugMode) return null;
  return (
    <Suspense fallback={null}>
      <DebugPanel />
    </Suspense>
  );
}
