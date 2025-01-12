import { cn } from "../../lib/utils";

export const Section = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <section id={id} className={cn("py-28", className)}>
      <div className="max-w-5xl mx-auto px-4">{children}</div>
    </section>
  );
};

//  mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 className="max-w-5xl mx-auto px-4"
