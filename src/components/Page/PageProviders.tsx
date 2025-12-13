import { ReactNode } from "react";
import { ModalProvider } from "@context/ModalContext";
import { PageProvider } from "@context/PageContext";

/**
 * Page-level context providers.
 * These providers are scoped to the Page component and its children.
 */
export function PageProviders({
  children,
  embedded,
}: {
  children: ReactNode;
  embedded?: boolean;
}) {
  return (
    <PageProvider embedded={embedded}>
      <ModalProvider>
        {children}
      </ModalProvider>
    </PageProvider>
  );
}
