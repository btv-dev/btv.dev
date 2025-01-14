import { cn } from "../../lib/utils";
import { DotsBackground } from "./DotsBackground";

export const Section = ({
  children,
  className,
  id,
  fade,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fade?: "top" | "bottom" | "all";
}) => {
  const classesToApplyToInner = "max-w-4xl mx-auto px-4";
  return (
    <section id={id} className={cn("py-18", className)}>
      {fade ? (
        <DotsBackground
          className={classesToApplyToInner}
          fadeTop={fade === "all" || fade === "top"}
          fadeBottom={fade === "all" || fade === "bottom"}
        >
          {children}
        </DotsBackground>
      ) : (
        <div className={classesToApplyToInner}>{children}</div>
      )}
    </section>
  );
};
