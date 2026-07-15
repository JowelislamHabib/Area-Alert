import { ContactHero } from "@/components/contact/ContactHero";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact Us | AreaAlert",
  description: "Get in touch with the AreaAlert team for any questions or support.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ContactHero />
      
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-24">
        <div className="grid w-full gap-8 md:grid-cols-2 items-start">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </div>
  );
}