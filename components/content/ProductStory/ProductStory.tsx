import styles from "./ProductStory.module.scss";
import { ComponentProps } from "@uniformdev/upm-react";
import Image from "next/image";

type StoryBlockProps = ComponentProps<{
  fields: { introHeader: string; header: string; copy: string };
}>;

export const ProductStory: React.FC<any> = ({ component }) => {
  const fields = component?.parameters?.entry?.value?.fields || {};
  const { title, tagLine, intro, backgroundImage } = fields;
  const stories: Array<StoryBlockProps> | undefined = fields.stories;
  const imageSrc = backgroundImage?.fields?.file?.url;
  const imageAlt = backgroundImage?.fields?.title;
  return (
    <div className={styles["story"]}>
      <section className={styles["story__inner"]}>
        <div className={styles["story__banner"]}>
          {imageSrc && (
            <Image
              src={imageSrc.replace("//", "https://")}
              alt={imageAlt}
              layout="fill"
              objectFit="cover"
              loading="eager"
              quality="75"
              className={styles["story__img"]}
            />
          )}
          <h2 className={styles["story__title"]}>
            {tagLine ? (
              <span
                className={`${styles["story__tagline"]} ${styles["story__tagline--spaced"]}`}
              >
                {tagLine}
              </span>
            ) : null}
            {title}
          </h2>
        </div>
        <div className={styles["story__container"]}>
          <p className={styles["story__text"]}>{intro}</p>
          <aside className={styles["story__supporting"]}>
            {stories && stories.map((s, i) => <StoryBlock key={i} {...s} />)}
          </aside>
        </div>
      </section>
    </div>
  );
};

const StoryBlock: React.FC<StoryBlockProps> = ({ fields }) => (
  <section className={styles["story__card"]}>
    <h3 className={styles["story__subtitle"]}>
      <span className={styles["story__tagline"]}>{fields.introHeader}</span>
      {fields.header}
    </h3>
    <p className={styles["story__text"]}>{fields.copy}</p>
  </section>
);
