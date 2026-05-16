import { ReactNode } from "react";
import PageHeader from "@/components/PageHeader";

interface HeroSectionWithHeaderProps {
  backHref: string;
  breadcrumbs: { label: string; href?: string }[];
  currentTitle?: string;
  children: ReactNode;
}

export default function HeroSectionWithHeader({
  backHref,
  breadcrumbs,
  currentTitle,
  children,
}: HeroSectionWithHeaderProps) {
  return (
    <>
      <div className="pt-20">
        <PageHeader
          backHref={backHref}
          breadcrumbs={breadcrumbs}
          currentTitle={currentTitle}
        />
        {children}
      </div>
    </>
  );
}

