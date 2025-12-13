import { ReactNode } from "react";
import { ModalProvider } from "@context/ModalContext";

/**
 * Page-level context providers.
 * These providers are scoped to the Page component and its children.
 */
export function PageProviders({ children }: { children: ReactNode }) {
  return (
    <ModalProvider>
      {children}
    </ModalProvider>
  );
}
