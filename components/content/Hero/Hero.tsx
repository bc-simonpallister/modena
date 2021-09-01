import Image from "next/image";
import styles from "./Hero.module.scss";

export const Hero: React.FC<any> = ({ component }) => {
  const fields = component?.parameters?.entry?.value?.fields || {};
  const { verticalTitle, header, shortCopy, image } = fields || {};
  const imageSrc = image?.fields?.file?.url;
  const imageAlt = image?.fields?.title;
  return (
    <div className={styles["hero"]}>
      <section className={styles["hero__inner"]}>
        <span className={styles["hero__tag"]}>{verticalTitle}</span>
        <div className={styles["hero__content"]}>
          <h1 className={styles["hero__title"]}>{header}</h1>
          <p className={styles["hero__text"]}>{shortCopy}</p>
        </div>
        {imageSrc && (
          <div className={styles["hero__img"]}>
            <Image
              src={imageSrc.replace("//", "https://")}
              alt={imageAlt}
              width={420}
              height={574}
              quality="60"
              loading="eager"
            />
          </div>
        )}
      </section>
    </div>
  );
};
