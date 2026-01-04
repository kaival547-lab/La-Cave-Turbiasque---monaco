"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, ChefHat, Utensils, Award, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleButton } from "@/components/ui/particle-button"
import { CTASection } from "@/components/cta-section"
import { menuAPI } from "@/lib/api"

export default function Home() {
  const [popularItems, setPopularItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPopularItems() {
      try {
        const items = await menuAPI.getPopular()
        setPopularItems(items)
      } catch (error) {
        console.error("Error fetching popular items:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPopularItems()
  }, [])
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-orange-50">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-orange-100 opacity-20 blur-2xl" />
        <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-red-100 opacity-20 blur-2xl" />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-yellow-100 opacity-20 blur-2xl" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          {/* Left Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full w-fit mb-6 font-medium text-sm">
              <ChefHat className="w-4 h-4" />
              <span>Fresh Daily Specials</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
              Your Favorite Food Delivered <span className="text-primary">Hot & Delicious</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
              Keep it easy with these simple but delicious recipes. From make-ahead lunches and midweek meals to
              fuss-free sides.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link href="/reservations">
                <ParticleButton
                  size="lg"
                  className="hover:bg-primary/90 rounded-full px-8 border-2 border-primary text-primary bg-transparent"
                >
                  Get Started
                </ParticleButton>
              </Link>
              <a
                href="https://www.google.com/maps/place/La+Cave+Turbiasque/@43.7455029,7.3625732,14z/data=!4m10!1m2!2m1!1s123+Rue+de+la+Cave,+06320+La+Turbie,+France!3m6!1s0x12cdc2569c77f583:0x1f6c30d1dae82d1c!8m2!3d43.7455029!4d7.400682!15sCisxMjMgUnVlIGRlIGxhIENhdmUsIDA2MzIwIExhIFR1cmJpZSwgRnJhbmNlWisiKTEyMyBydWUgZGUgbGEgY2F2ZSAwNjMyMCBsYSB0dXJiaWUgZnJhbmNlkgERZnJlbmNoX3Jlc3RhdXJhbnTgAQA!16s%2Fg%2F1tczmkm5?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8 bg-transparent"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Get Directions
                </Button>
              </a>
            </div>
          </div>

          {/* Right Image - Dynamic floating food */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2">
            {/* Generated floating food image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/images/bf29ed6a-09d4-4680-97cb-86545a9c4a3e-photoroom.png"
                alt="Deconstructed gourmet cuisine with floating ingredients"
                width={600}
                height={600}
                className="object-contain drop-shadow-2xl tracking-tighter leading-10 rounded-none shadow-none opacity-100 text-9xl font-normal text-background"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black mb-1">250+</div>
              <div className="text-sm opacity-90">Dishes Available</div>
            </div>
            <div>
              <div className="text-3xl font-black mb-1">10K+</div>
              <div className="text-sm opacity-90">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-black mb-1">30min</div>
              <div className="text-sm opacity-90">Average Prep Time</div>
            </div>
            <div>
              <div className="text-3xl font-black mb-1">4.9★</div>
              <div className="text-sm opacity-90">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-muted-foreground text-lg">Simple steps to enjoy amazing food</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group hover:transform hover:-translate-y-2 transition-transform">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Utensils className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Choose Your Dish</h3>
              <p className="text-muted-foreground">
                Browse our extensive menu featuring authentic Italian & French cuisine with detailed descriptions
              </p>
            </div>

            <div className="text-center group hover:transform hover:-translate-y-2 transition-transform">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <ChefHat className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">We Prepare Fresh</h3>
              <p className="text-muted-foreground">
                Our expert chefs prepare your meal with the finest ingredients and traditional techniques
              </p>
            </div>

            <div className="text-center group hover:transform hover:-translate-y-2 transition-transform">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Clock className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Enjoy Your Meal</h3>
              <p className="text-muted-foreground">
                Dine in our intimate ambiance or reserve for takeout - ready when you are
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-orange-50" id="featured">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Popular <span className="text-primary">Menu</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most celebrated creations that perfectly blend Italian and French culinary traditions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-2 text-muted-foreground">Loading popular items...</p>
              </div>
            ) : popularItems.length > 0 ? (
              popularItems.map((dish: any, index: number) => (
                <div
                  key={dish._id || index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={dish.image || "/placeholder.svg"}
                      alt={dish.name}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-sm">{dish.rating}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{dish.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{dish.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-primary">€{dish.price}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-muted-foreground">
                No popular items found. Check back soon!
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/menu">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
              >
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Customer <span className="text-primary">Reviews</span>
            </h2>
            <p className="text-muted-foreground text-lg">See what food lovers are saying about us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Marie Dubois",
                text: "An absolutely unforgettable evening. The food was exquisite and the wine pairings were perfection.",
                rating: 5,
                avatar: "MD",
              },
              {
                name: "Giovanni Romano",
                text: "The authentic Italian flavors transported me back to my family's kitchen. Bellissimo!",
                rating: 5,
                avatar: "GR",
              },
              {
                name: "Sophie Laurent",
                text: "The best celebration dinner we could have asked for. Every detail was impeccable.",
                rating: 5,
                avatar: "SL",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {/* Call to Action */}
      {/* Call to Action */}
      <CTASection />
    </div>
  )
}
