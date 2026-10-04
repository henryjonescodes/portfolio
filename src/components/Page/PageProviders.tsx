import { ReactNode } from 'react';
import { ExperienceEntryModalProvider } from '@components/ExperienceEntry/ExperienceEntryModalProvider';
import { PageProvider } from '@context/PageProvider';

/**
 * Page-level context providers.
 * These providers are scoped to the Page component and its children.
 */
export function PageProviders({ children, embedded }: { children: ReactNode; embedded?: boolean }) {
  return (
    <PageProvider embedded={embedded}>
      <ExperienceEntryModalProvider>{children}</ExperienceEntryModalProvider>
    </PageProvider>
  );
}
