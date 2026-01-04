"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CTASection } from "@/components/cta-section"

interface Review {
  id: number
  name: string
  date: string
  rating: number
  title: string
  text: string
  verified: boolean
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Marie Dubois",
      date: "December 20, 2024",
      rating: 5,
      title: "An Absolutely Unforgettable Evening",
      text: "We celebrated our anniversary at La Cave Turbiasque and it was beyond exceptional. From the moment we arrived, the service was impeccable. Each course was a masterpiece of flavor and presentation. The wine pairings were perfectly executed. We cannot recommend this restaurant highly enough.",
      verified: true,
    },
    {
      id: 2,
      name: "Giovanni Romano",
      date: "December 15, 2024",
      rating: 5,
      title: "Authentic Italian Excellence",
      text: "As someone who grew up in Italy, I can confidently say that Chef Marco brings authentic Italian flavors to Paris with genuine respect for tradition. The Ossobuco was cooked to perfection, and the risotto was creamy and luxurious. The atmosphere transported me back to my family's kitchen. Bellissimo!",
      verified: true,
    },
    {
      id: 3,
      name: "Sophie Laurent",
      date: "December 10, 2024",
      rating: 5,
      title: "The Best Celebration Dinner",
      text: "We booked a private dining experience for our daughter's graduation, and every single detail was impeccable. The team personalized the menu to her preferences, and the presentation was stunning. The sommelier paired wines that elevated each course beautifully. A truly memorable evening.",
      verified: true,
    },
    {
      id: 4,
      name: "Claude Bernard",
      date: "December 5, 2024",
      rating: 5,
      title: "French Gastronomy at Its Best",
      text: "I was impressed by the classical French techniques combined with Italian influences. The Coq au Vin was tender and flavorful, with a sauce that showed careful attention to detail. The wine list is exceptional and the sommelier's knowledge is impressive. Truly fine dining.",
      verified: true,
    },
    {
      id: 5,
      name: "Elena Moretti",
      date: "November 28, 2024",
      rating: 5,
      title: "Exquisite Culinary Experience",
      text: "Every aspect of our dinner was carefully curated. The appetizers were delicate and flavorful, the mains were perfectly cooked, and desserts were artistic. The sommelier recommended wines that perfectly complemented each course. This is dining at the highest level.",
      verified: true,
    },
    {
      id: 6,
      name: "Pierre Lefevre",
      date: "November 20, 2024",
      rating: 5,
      title: "Worth Every Euro",
      text: "La Cave Turbiasque delivers exceptional value for the quality of cuisine and service. The intimate atmosphere, attentive staff, and impeccable food justify the price point. We've already booked our next reservation!",
      verified: true,
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newReview, setNewReview] = useState({
    name: "",
    title: "",
    text: "",
    rating: 5,
  })

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => reviews.filter((r) => r.rating === rating).length)

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    const review: Review = {
      id: reviews.length + 1,
      name: newReview.name,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      rating: newReview.rating,
      title: newReview.title,
      text: newReview.text,
      verified: false,
    }
    setReviews([review, ...reviews])
    setNewReview({ name: "", title: "", text: "", rating: 5 })
    setShowForm(false)
    console.log("[v0] New review submitted:", review)
  }

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-12 md:py-16 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-center">Guest Reviews</h1>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={24} className="fill-accent text-accent" />
                ))}
              </div>
              <span className="text-3xl font-bold">{averageRating}</span>
            </div>
            <p className="text-muted-foreground">Based on {reviews.length} verified reviews</p>
          </div>
        </div>
      </section>

      {/* Rating Distribution */}
      <section className="py-12 md:py-16 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-serif font-bold mb-6 text-center">Rating Breakdown</h2>
            {[5, 4, 3, 2, 1].map((rating, idx) => (
              <div key={rating} className="flex items-center gap-4 mb-4">
                <div className="flex gap-1 w-20">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-accent text-accent" />
                  ))}
                </div>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{
                      width: `${(ratingCounts[idx] / reviews.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium w-12 text-right">{ratingCounts[idx]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Review Button */}
      <section className="py-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {!showForm ? (
            <Button size="lg" onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90">
              Share Your Experience
            </Button>
          ) : null}
        </div>
      </section>

      {/* Review Form */}
      {showForm && (
        <section className="py-12 bg-card border-b border-border">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-serif font-bold mb-6">Write a Review</h2>
            <form onSubmit={handleSubmitReview} className="space-y-6 bg-background p-6 rounded-lg border border-border">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="rating" className="block text-sm font-medium mb-3">
                  Rating *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        size={32}
                        className={`${star <= newReview.rating ? "fill-accent text-accent" : "text-border"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Review Title *
                </label>
                <Input
                  id="title"
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  placeholder="Summarize your experience in a few words"
                  required
                />
              </div>

              <div>
                <label htmlFor="text" className="block text-sm font-medium mb-2">
                  Your Review *
                </label>
                <textarea
                  id="text"
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  placeholder="Share your experience... What did you love? What stood out?"
                  rows={5}
                  required
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Submit Review
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Reviews List */}
      <section className="py-12 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold mb-8">What Our Guests Say</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-serif font-bold">{review.name}</h3>
                      {review.verified && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                          Verified Guest
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-accent text-accent" />
                    ))}
                  </div>
                </div>

                <h4 className="font-bold text-lg mb-2">{review.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
