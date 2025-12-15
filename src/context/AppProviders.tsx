import { ReactNode } from "react";
import { WindowDimensionProvider } from "./WindowDimensionContext";
import { LoadingProvider } from "./LoadingContext";
import { SettingsProvider } from "./SettingsContext";
import { ZoomProvider } from "./ZoomContext";
import { ColorsProvider } from "./ColorsContext";
import { InteractionProvider } from "./InteractionContext";
import { AnimationProvider } from "./AnimationContext";

/**
 * Application context providers in dependency order.
 *
 * Provider Hierarchy & Dependencies:
 *
 * WindowDimensionProvider (no deps)
 * └── SettingsProvider (uses: useLocation, useNavigate from React Router)
 *     └── AnimationProvider (uses: Leva - only active in debug mode, uses: useSettings)
 *         └── LoadingProvider (uses: useAnimations for Loading component animations)
 *             └── ZoomProvider (uses: useLoading, useSettings, useWindowDimensions)
 *                 └── ColorsProvider (uses: useSettings)
 *                     └── InteractionProvider (no deps)
 *
 * Context Dependencies Explained:
 * - WindowDimensionProvider: Provides screen size and responsive zoom positions
 * - SettingsProvider: Handles debug mode and animation toggles
 * - AnimationProvider: Provides animation timing constants (with Leva controls in debug mode)
 * - LoadingProvider: Manages 3D asset loading state and lite mode fallback (Loading component uses useAnimations)
 * - ZoomProvider: Controls camera zoom levels (depends on loading, settings, dimensions)
 * - ColorsProvider: Manages dynamic color theming (depends on settings for debug logging)
 * - InteractionProvider: Tracks active 3D objects (no dependencies)
 *
 * Important Notes:
 * - Providers must be in this exact order due to hook dependencies
 * - Each provider that uses a context hook from above must be nested below it
 * - AnimationProvider must be above LoadingProvider since Loading component uses useAnimations
 * - Debug mode controls (Leva) only render when SettingsProvider enables debug mode
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
                </InteractionProvider>
              </ColorsProvider>
            </ZoomProvider>
          </LoadingProvider>
        </AnimationProvider>
      </SettingsProvider>
    </WindowDimensionProvider>
  );
}
