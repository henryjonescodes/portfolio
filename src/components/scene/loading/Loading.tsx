import Styles from "./loading.module.scss";

const Loading = ({
  title,
  subTitle,
  src,
  progress,
  item,
}: {
  title: string;
  subTitle: string;
  progress: number;
  item: string;
  src: string;
}) => {
  return (
    <aside className={Styles.loading}>
      <div className={Styles.loading__content}>
        <div className={Styles.loading__content__text}>
          <h1 className={Styles.loading__content__text__header}>{title}</h1>
          <h2 className={Styles.loading__content__text__subtitle}>
            {subTitle}
          </h2>
        </div>
        <img className={Styles.loading__content__img} src={src} />
        <div className={Styles.loading__content__slider}>
          <progress value={progress} max={100} />
          <h1 className={Styles.loading__content__slider__percentage}>
            {Math.ceil(progress)}%
          </h1>
        </div>
        <h1 className={Styles.loading__content__text}>Loading: {item}</h1>
      </div>
    </aside>
  );
};

export default Loading;
