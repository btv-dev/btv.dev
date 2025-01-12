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
  return (
    <section id={id} className={cn("py-18", className)}>
      {withBackground ? (
        <DotsBackground className="max-w-5xl mx-auto px-4" fadeTop fadeBottom>
          {children}
        </DotsBackground>
      ) : (
        <div className="max-w-5xl mx-auto px-4">{children}</div>
      )}
    </section>
  );
};
