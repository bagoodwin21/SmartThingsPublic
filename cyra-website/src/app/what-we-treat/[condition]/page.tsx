import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { conditions } from "@/lib/conditions";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: { condition: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(conditions).map((condition) => ({ condition }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const info = conditions[params.condition];
  if (!info) return {};
  return buildMetadata({
    title: info.title,
    description: `${info.description} Physician-led ${info.title.toLowerCase()} care via telemedicine in California from CYRA Wellness.`,
    path: `/what-we-treat/${params.condition}`,
  });
}

export default function ConditionPage({ params }: PageProps) {
  const info = conditions[params.condition];
  if (!info) notFound();

  return (
    <PagePlaceholder
      label="What We Treat"
      title={info.title}
      description={`${info.description} Full condition details coming soon.`}
    />
  );
}
