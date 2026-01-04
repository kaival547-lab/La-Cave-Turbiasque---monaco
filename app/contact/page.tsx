"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Clock, CheckCircle, Navigation } from "lucide-react"
import { CTASection } from "@/components/cta-section"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Contact form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 5000)
  }

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-12 md:py-16 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions or special requests? We'd love to hear from you. Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-12 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-8">Contact Information</h2>
              </div>

              {/* Location */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                    <MapPin size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Location</h3>
                  <p className="text-muted-foreground mb-3">
                    123 Rue de Paris
                    <br />
                    75001 Paris, France
                  </p>
                  <a
                    href="https://www.google.com/maps/place/La+Cave+Turbiasque/@43.7455029,7.3573273,13z/data=!4m10!1m2!2m1!1s123+Rue+de+la+Cave,+06320+La+Turbie,+France!3m6!1s0x12cdc2569c77f583:0x1f6c30d1dae82d1c!8m2!3d43.7455029!4d7.400682!15sCisxMjMgUnVlIGRlIGxhIENhdmUsIDA2MzIwIExhIFR1cmJpZSwgRnJhbmNlWisiKTEyMyBydWUgZGUgbGEgY2F2ZSAwNjMyMCBsYSB0dXJiaWUgZnJhbmNlkgERZnJlbmNoX3Jlc3RhdXJhbnTgAQA!16s%2Fg%2F1tczmkm5?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm"
                  >
                    <Navigation size={16} />
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                    <Phone size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Phone</h3>
                  <a href="tel:+33123456789" className="text-primary hover:underline">
                    +33 (0)1 23 45 67 89
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                    <Mail size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Email</h3>
                  <a href="mailto:info@lacaveturbiasque.com" className="text-primary hover:underline">
                    info@lacaveturbiasque.com
                  </a>
                  <br />
                  <a href="mailto:reservations@lacaveturbiasque.com" className="text-primary hover:underline text-sm">
                    reservations@lacaveturbiasque.com
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                    <Clock size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Hours of Operation</h3>
                  <div className="text-muted-foreground space-y-1">
                    <p>
                      <strong>Tuesday - Thursday:</strong> 6:00 PM - 11:00 PM
                    </p>
                    <p>
                      <strong>Friday - Saturday:</strong> 6:00 PM - 12:00 AM
                    </p>
                    <p>
                      <strong>Sunday:</strong> 6:00 PM - 10:00 PM
                    </p>
                    <p className="pt-2">
                      <strong>Closed Mondays</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Special Inquiries */}
              <div className="bg-card border border-border rounded-lg p-6 mt-8">
                <h3 className="text-lg font-bold mb-3">Special Inquiries</h3>
                <p className="text-muted-foreground mb-4">
                  For catering, private events, or group reservations, please contact us directly or use the form below.
                </p>
                <a href="mailto:events@lacaveturbiasque.com" className="text-primary hover:underline font-medium">
                  events@lacaveturbiasque.com
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8">Send us a Message</h2>

              {submitted ? (
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-serif font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-4">
                    Thank you for reaching out. We'll get back to you as soon as possible. Check your email for
                    confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your inquiry..."
                      rows={5}
                      required
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Send Message
                  </Button>

                  <p className="text-xs text-muted-foreground">We'll respond to your message within 24 hours.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 md:py-24 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="bg-background rounded-lg p-6 border border-border">
              <h3 className="text-lg font-bold mb-2">How far in advance should I make a reservation?</h3>
              <p className="text-muted-foreground">
                We recommend booking at least 24 hours in advance. For larger parties (8+ guests), we recommend 2-3
                weeks notice.
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 border border-border">
              <h3 className="text-lg font-bold mb-2">Do you accommodate dietary restrictions?</h3>
              <p className="text-muted-foreground">
                Please mention any dietary restrictions when making your reservation. Our chef can prepare vegetarian,
                vegan, gluten-free, and other dietary accommodations with advance notice.
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 border border-border">
              <h3 className="text-lg font-bold mb-2">Do you offer private dining?</h3>
              <p className="text-muted-foreground">
                Yes, we offer private dining experiences for special occasions and group events. Contact us at
                events@lacaveturbiasque.com for more details.
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 border border-border">
              <h3 className="text-lg font-bold mb-2">What is the dress code?</h3>
              <p className="text-muted-foreground">
                Smart casual to business casual is required. We ask that guests avoid sportswear, athletic wear, and
                flip-flops.
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 border border-border">
              <h3 className="text-lg font-bold mb-2">Do you have a wine list available?</h3>
              <p className="text-muted-foreground">
                Our wine list is available on our Menu page. For detailed descriptions and sommelier recommendations,
                please visit us or contact our team.
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 border border-border">
              <h3 className="text-lg font-bold mb-2">Can I arrange a special event?</h3>
              <p className="text-muted-foreground">
                We'd love to host your special event! For birthdays, anniversaries, corporate events, and more, please
                reach out to events@lacaveturbiasque.com.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
