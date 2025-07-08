import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionItemProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function AccordionItem({ title, children, className }: AccordionItemProps) {
  return (
    <Disclosure>
      {({ open }) => (
        <div className={cn("border-b", className)}>
          <Disclosure.Button
            className={cn(
              "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline",
              open && "text-primary"
            )}
          >
            {title}
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 transform transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel
            className="overflow-hidden text-sm transition-all animate-accordion-down pb-4 pt-0"
          >
            {children}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

export function Accordion({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
