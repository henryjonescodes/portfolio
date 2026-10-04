import { ReactNode } from 'react';
import { WindowDimensionProvider } from './WindowDimensionProvider';
import { LoadingProvider } from './LoadingProvider';
import { SettingsProvider } from './SettingsProvider';
import { ZoomProvider } from './ZoomProvider';
import { ColorsProvider } from './ColorsProvider';
import { InteractionProvider } from './InteractionProvider';
import { AnimationProvider } from './AnimationProvider';
import { DebugTools } from '../debug';

/**
 * Global providers, ordered by dependency: each may use any provider above it.
 * Loading reads timeouts from Animation; Zoom reads Loading, Settings and dimensions.
 * DebugTools mounts the lazily loaded Leva panel only under `?debug=true`.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <WindowDimensionProvider>
      <SettingsProvider>
        <AnimationProvider>
          <LoadingProvider>
            <ZoomProvider>
              <ColorsProvider>
                <InteractionProvider>
                  {children}
                  <DebugTools />
                </InteractionProvider>
              </ColorsProvider>
            </ZoomProvider>
          </LoadingProvider>
        </AnimationProvider>
      </SettingsProvider>
    </WindowDimensionProvider>
  );
}
