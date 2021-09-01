import {
  Accordion,
  AccordionItem,
} from "@/components/atoms/accordion/accordion";

import styles from "./ProductSpecs.module.scss";

type SpecsProps = {
  fields: {
    internalName: string;
    header: string;
    copy: string;
  };
};

export const ProductSpecs: React.FC<any> = ({ component }) => {
  const fields = component?.parameters?.entry?.value?.fields || {};
  const { smallIntroHeader, header, benefits } = fields || {};
  return (
    <article className={styles["product-specs"]}>
      <h3 className={styles["product-specs__title"]}>
        <span className={styles["product-specs__tag"]}>
          {smallIntroHeader}
        </span>
        {header}
      </h3>
      <aside className={styles["product-specs__supporting"]}>
        <Accordion>
          {benefits && benefits.map((item: SpecsProps, index: number) => {
            return (
              <AccordionItem
                title={item.fields.header}
                desc={item.fields.copy}
                key={index}
                ariaControls={`accordion-${index}`}
              />
            );
          })}
        </Accordion>
      </aside>
    </article>
  );
};