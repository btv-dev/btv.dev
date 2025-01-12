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
          {/* <div className="bg-[#ffffff8c]">{children}</div> */}
          {children}
        </DotsBackground>
      ) : (
        <div className="max-w-5xl mx-auto px-4">{children}</div>
      )}
    </section>
  );
};

//  mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 className="max-w-5xl mx-auto px-4"
