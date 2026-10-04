import TypewriterText from '@components/TypewriterText';
import type { Point } from '@components/ExperienceEntry/ExperienceEntryModalContext';
import styles from './efforts.module.scss';

const MENTION = /\{\{([\w-]+)(?:\/([\w-]+))?\|([^}]+)\}\}/g;

type Segment = { text: string; mention?: { entryId: string; effortId: string | null } };

function parseMentions(text: string): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const m of text.matchAll(MENTION)) {
    if (m.index > last) out.push({ text: text.slice(last, m.index) });
    out.push({ text: m[3], mention: { entryId: m[1], effortId: m[2] ?? null } });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}

type RichTextProps = {
  text: string;
  /** Mentions become buttons; without it they read as highlighted text (inside a tile, say). */
  onMention?: (entryId: string, effortId: string | null, origin?: Point) => void;
  staggerChildren?: number;
};

/** Typed-in prose whose `{{entry|text}}` and `{{entry/effort|text}}` mentions open what they name. */
const RichText = ({ text, onMention, staggerChildren }: RichTextProps) => (
  <>
    {parseMentions(text).map(({ text: part, mention }, i) => {
      const typed = <TypewriterText text={part} staggerChildren={staggerChildren} />;
      if (!mention) return <span key={i}>{typed}</span>;
      if (!onMention)
        return (
          <span key={i} className={styles.mention}>
            {typed}
          </span>
        );
      return (
        <button
          key={i}
          type="button"
          className={styles.mention}
          onClick={(e) => {
            e.stopPropagation();
            const r = e.currentTarget.getBoundingClientRect();
            onMention(mention.entryId, mention.effortId, {
              x: r.left + r.width / 2,
              y: r.top + r.height / 2,
            });
          }}
        >
          {typed}
        </button>
      );
    })}
  </>
);

export default RichText;
