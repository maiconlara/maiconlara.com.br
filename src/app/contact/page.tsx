import Link from "next/link";

import { RiArrowLeftLine } from "@remixicon/react";
import { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Social } from "@/components/contact/social";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="container pb-16 md:pb-0 pt-10">
      <div className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <RiArrowLeftLine className="w-4 h-4" />
          Back
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect!</h1>
        <p className="text-muted-foreground max-w-2xl">
          Have a project in mind or just want to chat? I'd love to hear from
          you. Feel free to reach out through any of the channels below.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <ContactForm />

        <Social />
      </div>
    </div>
  );
}
