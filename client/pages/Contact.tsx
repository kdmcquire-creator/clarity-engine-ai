import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with tRPC endpoint to save contact form submission
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">Clarity Engine</Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition">Home</Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 transition">About</Link>
            <Link href="/tools" className="text-slate-600 hover:text-slate-900 transition">Tools</Link>
            <Link href="/resources" className="text-slate-600 hover:text-slate-900 transition">Resources</Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition font-semibold">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Have a question about our tools? Want to suggest a new feature? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container py-24">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Mail className="h-8 w-8 text-blue-600" />,
              title: "Email",
              content: "hello@seotoolkit.com",
              description: "Send us an email and we'll respond within 24 hours."
            },
            {
              icon: <Phone className="h-8 w-8 text-blue-600" />,
              title: "Support",
              content: "Chat with us live",
              description: "Get instant help from our support team during business hours."
            },
            {
              icon: <MapPin className="h-8 w-8 text-blue-600" />,
              title: "Community",
              content: "Join our community",
              description: "Connect with other marketers and SEO professionals."
            },
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white rounded-lg border border-slate-200 text-center hover:shadow-lg transition">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-blue-600 font-medium mb-2">{item.content}</p>
              <p className="text-slate-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg border border-slate-200 p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Send us a Message</h2>
          
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <p className="text-green-800 font-medium">Thank you for your message! We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Subject</label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more..."
                  rows={6}
                  required
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-blue-600 text-white py-16 mt-12">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8 opacity-90">
            Subscribe to our newsletter for SEO tips, new tools, and industry insights.
          </p>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              className="bg-white text-slate-900"
            />
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-12">
        <div className="container text-center">
          <p>&copy; 2025 Clarity Engine. All rights reserved. Built by a team of SEO experts.</p>
        </div>
      </footer>
    </div>
  );
}
