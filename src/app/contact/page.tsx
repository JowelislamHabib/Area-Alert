import { ContactHero } from "@/components/pages/contact/ContactHero";
import { ContactInfo } from "@/components/pages/contact/ContactInfo";
import { ContactForm } from "@/components/pages/contact/ContactForm";

export const metadata = {
  title: "Contact Us | AreaAlert",
  description: "Get in touch with the AreaAlert team for any questions or support.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ContactHero />
      
      <section className="container mx-auto px-4 pb-24">
        <div className="grid max-w-5xl mx-auto gap-8 md:grid-cols-2 items-start">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </div>
  );
}