import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';
import styles from './striped-panel.module.scss';

type StripedPanelProps = HTMLAttributes<HTMLDivElement> & {
  /** A small label pinned to the top-left corner. */
  tag?: ReactNode;
};

/** A styled wrapper: dashed inner frame over wide, faint stripes. Lay out its children freely. */
const StripedPanel = ({ tag, className, children, ...rest }: StripedPanelProps) => (
  <div className={cn(styles.panel, className)} {...rest}>
    {tag && <span className={styles.tag}>{tag}</span>}
    {children}
  </div>
);

export default StripedPanel;
