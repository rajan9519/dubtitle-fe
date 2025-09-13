import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Contact Options */}
      <div className="container mx-auto px-6 py-12">
        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <ContactForm 
            title="Send Us a Message"
            description="Fill out the form below and we'll get back to you as soon as possible."
          />
        </div>
      </div>
    </div>
  );
}