import { cn } from "../../lib/utils";
import { DotsBackground } from "./DotsBackground";

export const Section = ({
  children,
  className,
  innerClassname,
  id,
  fade,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassname?: string;
  id?: string;
  fade?: "top" | "bottom" | "all";
}) => {
  const baseInnerClassName = "max-w-4xl mx-auto px-4";
  return (
    <section id={id} className={cn("py-18", className)}>
      {fade ? (
        <DotsBackground
          className={cn(baseInnerClassName, innerClassname)}
          fadeTop={fade === "all" || fade === "top"}
          fadeBottom={fade === "all" || fade === "bottom"}
        >
          {children}
        </DotsBackground>
      ) : (
        <div className={cn(baseInnerClassName, innerClassname)}>{children}</div>
      )}
    </section>
  );
};
