import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { FAQItem } from "@/components/ui/faq-item";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "FAQ",
    description:
      "Answers to common questions about CYRA Wellness menopause telehealth: insurance, licensing, HRT and testosterone, labs, and appointments.",
    path: "/faq",
  });
}

const faqs = [
  {
    question: "Do you accept insurance?",
    answer:
      "CYRA Wellness is a cash-pay practice. This lets us spend real time on your care instead of insurance paperwork. We can provide superbills that you may submit to your insurer for possible out-of-network reimbursement.",
  },
  {
    question: "Where are you licensed?",
    answer:
      "Dr. Mondona Goodwin, DO is licensed in California and Arizona. All visits take place over secure video telemedicine.",
  },
  {
    question: "Do you prescribe testosterone for women?",
    answer:
      "Yes, when clinically appropriate. Testosterone can be an important part of an individualized hormone plan, and we monitor labs carefully throughout treatment.",
  },
  {
    question: "How do labs work with telemedicine?",
    answer:
      "We order labs at a draw site convenient to you. Results come directly to Dr. Goodwin, who reviews them with you during your video visit.",
  },
  {
    question: "What happens at the free consult?",
    answer:
      "The free consult is a short call to understand your symptoms and goals, explain how the practice works, and make sure CYRA is the right fit before you commit to anything.",
  },
];

export default function FAQPage() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <SectionLabel>FAQ</SectionLabel>
          <h1 className="heading-section">Frequently asked questions</h1>
        </div>
        <div className="mt-10">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </Section>
  );
}
