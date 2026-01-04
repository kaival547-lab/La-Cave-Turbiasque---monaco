"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { reservationAPI } from "@/lib/api"

export default function Reservations() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await reservationAPI.create(formData)
      setSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "2",
        specialRequests: "",
      })
    } catch (err: any) {
      console.error("Reservation error:", err)
      setError(err.message || "Failed to submit reservation. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-12 md:py-16 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Reserve Your Table</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Secure your seat at La Cave Turbiasque and prepare for an unforgettable culinary experience
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Reservation Form */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8">Book Your Experience</h2>

              {submitted ? (
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-serif font-bold mb-2">Reservation Confirmed!</h3>
                  <p className="text-muted-foreground mb-4">
                    Thank you for your reservation. A confirmation email has been sent to {formData.email}. Our team
                    will contact you shortly if we need any additional information.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Date:</strong> {formData.date} at {formData.time}
                    <br />
                    <strong>Party Size:</strong> {formData.guests}{" "}
                    {Number.parseInt(formData.guests) === 1 ? "Guest" : "Guests"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-destructive/15 text-destructive p-4 rounded-md flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  )}
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

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+33 (0)1 23 45 67 89"
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium mb-2">
                        Date *
                      </label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium mb-2">
                        Time *
                      </label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Number of Guests */}
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium mb-2">
                      Number of Guests *
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium mb-2">
                      Special Requests
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      placeholder="Dietary restrictions, special occasion, seating preferences, etc."
                      rows={4}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Confirm Reservation"
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground">
                    By submitting this form, you agree to our reservation policy and terms of service.
                  </p>
                </form>
              )}
            </div>

            {/* Information Section */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-serif font-bold mb-4">Reservation Policies</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold mb-1">Minimum Notice</p>
                      <p className="text-sm text-muted-foreground">
                        Reservations should be made at least 24 hours in advance.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold mb-1">Cancellation Policy</p>
                      <p className="text-sm text-muted-foreground">
                        Cancellations must be made 48 hours before your reservation to avoid a 50% charge.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold mb-1">Dining Time</p>
                      <p className="text-sm text-muted-foreground">
                        Dinner service is typically 2-3 hours. Please arrive 10 minutes early.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold mb-1">Dress Code</p>
                      <p className="text-sm text-muted-foreground">
                        Smart casual to business casual. No sportswear or flip-flops.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold mb-4">Contact Information</h3>
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <div>
                    <p className="font-bold mb-1">Phone</p>
                    <a href="tel:+33123456789" className="text-primary hover:underline">
                      +33 (0)1 23 45 67 89
                    </a>
                  </div>
                  <div>
                    <p className="font-bold mb-1">Email</p>
                    <a href="mailto:reservations@lacaveturbiasque.com" className="text-primary hover:underline">
                      reservations@lacaveturbiasque.com
                    </a>
                  </div>
                  <div>
                    <p className="font-bold mb-1">Hours</p>
                    <p className="text-sm text-muted-foreground">
                      Tue-Thu: 6PM - 11PM
                      <br />
                      Fri-Sat: 6PM - 12AM
                      <br />
                      Sun: 6PM - 10PM
                      <br />
                      Closed Mondays
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold mb-4">Special Occasions</h3>
                <p className="text-muted-foreground mb-4">
                  Celebrating a milestone? Our team can arrange special touches including custom wine selections,
                  personalized menus, and private dining options for groups.
                </p>
                <a
                  href="mailto:info@lacaveturbiasque.com"
                  className="inline-block text-primary hover:underline font-medium"
                >
                  Contact us for details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
