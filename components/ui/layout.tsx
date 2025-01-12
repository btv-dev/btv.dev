import { cn } from "../../lib/utils";
import { DotsBackground } from "./DotsBackground";

export const Section = ({
  children,
  className,
  id,
  withBackground = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  withBackground?: boolean;
}) => {
  const classesToApplyToInner = "max-w-4xl mx-auto px-4";
  return (
    <section id={id} className={cn("py-18", className)}>
      {withBackground ? (
        <DotsBackground className={classesToApplyToInner} fadeTop fadeBottom>
          {children}
        </DotsBackground>
      ) : (
        <div className={classesToApplyToInner}>{children}</div>
      )}
    </section>
  );
};
