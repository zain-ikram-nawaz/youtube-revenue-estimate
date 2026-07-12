"use client"
import { useState } from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from 'next/link';

const contactSocials = [
  { label: "GitHub", href: "https://github.com/zain-ikram-nawaz" },
  { label: "LinkedIn", href: "https://pk.linkedin.com/in/zain-ikram-nawaz-65b5312a9" },
  { label: "Instagram", href: "https://www.instagram.com/zain_ikram_nawaz/" },
  { label: "Facebook", href: "https://www.facebook.com/zain.ikramnawaz" },
];

const ContactUs = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
    const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const guideFaqs = [
  {
    "q": "How can I grow my YouTube channel fast?",
    "a": "Focus on consistent uploads, high-quality content, audience engagement, and optimizing titles, thumbnails, and descriptions. Analyze your metrics and experiment with trends to increase growth."
  },
  {
    "q": "What are the best ways to increase watch time?",
    "a": "Create longer engaging videos, use playlists to keep viewers on your channel, add end screens and cards, and maintain a strong hook at the beginning of each video."
  },
  {
    "q": "How do I get more subscribers quickly?",
    "a": "Encourage viewers to subscribe in your videos, collaborate with other creators, interact with your audience through comments and community posts, and create content that solves problems or entertains your niche."
  },
  {
    "q": "How important are thumbnails and titles?",
    "a": "Thumbnails and titles are critical for click-through rates. Make them eye-catching, relevant, and optimized with keywords to attract viewers."
  },
  {
    "q": "Can I monetize my channel without 1,000 subscribers?",
    "a": "Direct monetization through YouTube requires 1,000 subscribers and 4,000 watch hours. However, alternative revenue streams include sponsorships, affiliate marketing, and selling products."
  },
  {
    "q": "What content niches earn the most on YouTube?",
    "a": "Popular high-CPM niches include finance, technology, business, education, health, and gaming. Audience location and engagement also influence revenue."
  },
  {
    "q": "How often should I upload videos?",
    "a": "Consistency is key. Upload at least once a week or set a schedule your audience can expect. This improves algorithmic favor and audience retention."
  },
  {
    "q": "Should I focus on short videos or long videos?",
    "a": "Both have advantages. Shorts increase reach and discovery, while long videos increase watch time and revenue potential. Use a mix based on your content strategy."
  },
  {
    "q": "How do I analyze which videos perform best?",
    "a": "Use YouTube Analytics to track metrics like watch time, audience retention, click-through rate, and engagement. Focus on content types that drive growth and revenue."
  },
  {
    "q": "Can AI tools help grow my YouTube channel?",
    "a": "Yes, AI tools can assist with video ideas, SEO optimization, thumbnail creation, and audience insights, but content should remain authentic and valuable."
  }
];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch("/api/send-support-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      alert("Your message has been sent successfully!");
      setFormData({ name: "", email: "", inquiryType: "", subject: "", message: "" });
    } else {
      alert("Something went wrong. Please try again later.");
    }
  } catch (error) {
    console.error(error);
    alert("Network error. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (

    <div className="min-h-screen bg-secondary py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-4">

        {/* Header Section */}
        <div className="bg-background rounded-3xl shadow-sm border border-border p-5 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-3 shadow-sm">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h1 className="font-display text-lg md:text-xl font-extrabold text-foreground mb-2 leading-snug">
            Contact ChannelIncome | YouTube Revenue Calculator Support & Partnerships
          </h1>
          <p className="text-xs text-muted leading-relaxed">
            Have questions about YouTube revenue estimates, channel optimization, or growth strategy? Our ChannelIncome experts respond within 24 hours. Also available for partnership and media inquiries.
          </p>
        </div>

        {/* Contact Information & Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Contact Information */}
          <div className="bg-background rounded-lg shadow-sm border border-border p-4">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-foreground mb-2">Contact ChannelIncome Directly</h2>
            <p className="text-xs text-muted leading-relaxed mb-2">
              Questions about YouTube revenue calculation, channel growth strategy, or feature requests? We value every inquiry and respond promptly. You can also reach out for media inquiries, partnerships, or business development opportunities.
            </p>
            <div className="space-y-3 mt-4">
              <div className="flex items-center text-xs">
                <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-foreground font-semibold">Zain Ikram Nawaz</span>
              </div>
              <div className="flex items-center text-xs">
                <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:support@channelincome.com" className="text-primary underline hover:opacity-80 transition">
                  support@channelincome.com
                </a>
              </div>
              <div className="flex items-center text-xs">
                <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-muted">Response within 24 hours</span>
              </div>
              <div className="pt-1">
                <p className="text-xs text-muted mb-2">Connect on social:</p>
                <div className="flex flex-wrap gap-2">
                  {contactSocials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-primary border border-border px-2.5 py-1 rounded-full hover:bg-secondary transition"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="bg-background rounded-lg shadow-sm border border-border p-4">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-foreground mb-2">Send a Quick Message</h2>
            <p className="text-xs text-muted leading-relaxed mb-3">
              Use the form below to ask about YouTube revenue estimates, channel optimization tips, partnership ideas, or any feature suggestions. We'll respond within 24 hours during business hours.
            </p>
            <Link
              href="#contact-form"
              className="inline-flex items-center text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              Fill Contact Form Below
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Detailed Contact Form */}
        <div id="contact-form" className="bg-background rounded-lg shadow-sm border border-border p-5">
          <h2 className="text-base font-bold text-foreground mb-3 text-center border-l-2 border-primary pl-3">
            ChannelIncome Support & Inquiry Form
          </h2>

          {/* Submission Status */}
          {submitStatus === 'success' && (
            <div className="bg-accent/10 border border-accent/40 rounded-2xl p-3 mb-4">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-accent-hover mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-accent-hover font-medium text-xs">Thank you for your message! We'll get back to you within 24 hours.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-primary/5 border border-primary/30 rounded-2xl p-3 mb-4">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-primary font-medium text-xs">There was an error sending your message. Please try again.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-foreground mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg text-xs focus:ring-2 focus:ring-accent focus:border-primary transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-foreground mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg text-xs focus:ring-2 focus:ring-accent focus:border-primary transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Inquiry Type */}
              <div>
                <label htmlFor="inquiryType" className="block text-xs font-bold text-foreground mb-1">
                  Inquiry Type *
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg text-xs focus:ring-2 focus:ring-accent focus:border-primary transition-colors"
                >
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-xs font-bold text-foreground mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg text-xs focus:ring-2 focus:ring-accent focus:border-primary transition-colors"
                  placeholder="Brief subject of your message"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-xs font-bold text-foreground mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg text-xs focus:ring-2 focus:ring-accent focus:border-primary transition-colors resize-vertical"
                placeholder="Please describe your inquiry in detail..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2.5 bg-primary text-white font-bold rounded-full text-xs transition-colors ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-primary-hover focus:ring-2 focus:ring-accent'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-background" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
              <p className="text-muted text-xs leading-relaxed">
                * Required fields. We respect your privacy and will never share your information with third parties.
              </p>
            </div>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="bg-background rounded-lg shadow-sm border border-border p-5">
          <h2 className="text-base font-bold text-foreground mb-4 text-center">
            Frequently Asked Questions About YouTube Revenue & Analytics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {guideFaqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-3 bg-secondary"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="font-semibold text-foreground text-xs">{faq.q}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-4 h-4 text-muted flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted flex-shrink-0 ml-2" />
                  )}
                </button>

                {openIndex === index && (
                  <p className="mt-2 text-muted text-xs leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-background rounded-lg shadow-sm border border-border p-5 text-center">
          <h2 className="text-base font-bold text-foreground mb-2">Ready to Analyze Your YouTube Channel Revenue?</h2>
          <p className="text-xs text-muted mb-4 max-w-lg mx-auto leading-relaxed">
            Use ChannelIncome's free YouTube revenue estimator to optimize your content strategy, track earning potential, and achieve your financial goals with accurate revenue projections.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-full transition-colors shadow-sm"
            >
              Try Revenue Estimator Now
              <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/about-us"
              className="inline-flex items-center px-5 py-2.5 bg-transparent border border-border text-foreground text-xs font-bold rounded-full hover:bg-secondary transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;