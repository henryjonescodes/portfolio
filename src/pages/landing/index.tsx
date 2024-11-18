import { ColorsProvider } from "@context/ColorsContext";
import { LoadingProvider } from "@context/LoadingContext";
import { SettingsProvider } from "@context/SettingsContext";
import { ZoomProvider } from "@context/ZoomContext";
import { lazy } from "react";

const LandingPage = lazy(() => import("./LandingPage"));

export const Landing = () => {
  return (
    <LoadingProvider>
      <SettingsProvider>
        <ZoomProvider>
          <ColorsProvider>
            <LandingPage />
          </ColorsProvider>
        </ZoomProvider>
      </SettingsProvider>
    </LoadingProvider>
  );
};

export default Landing;
