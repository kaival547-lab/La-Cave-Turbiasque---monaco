import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChefHat, Award, Users } from "lucide-react"
import { CTASection } from "@/components/cta-section"

export default function About() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Our Story</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Founded in 2010, La Cave Turbiasque began with a simple vision: to create a sanctuary for food and wine
              lovers seeking authentic cuisine and genuine hospitality.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-6">A Passion Born in Two Cultures</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Our restaurant was born from the unique collaboration between Chef Marco Rossi, trained in the kitchens
                of Florence and Rome, and his partner Sophie Laurent, a passionate sommelier and custodian of French
                wine traditions. What started as a dream became a reality when they discovered the perfect location in
                the heart of Paris—a historic wine cellar with over a century of character.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The name "La Cave Turbiasque" is a tribute to the building's rich heritage and its remarkable stone wine
                cellars that date back to the 19th century. Every dish and wine pairing tells a story of craftsmanship,
                tradition, and an unwavering commitment to excellence.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/chef-in-professional-kitchen-preparing-italian-dsh.jpg"
                alt="Chef Marco Rossi in the kitchen"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <ChefHat className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3">Culinary Excellence</h3>
              <p className="text-muted-foreground">
                We believe in using only the finest ingredients, sourced from trusted suppliers who share our commitment
                to quality and sustainability.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3">Genuine Hospitality</h3>
              <p className="text-muted-foreground">
                Our staff is trained not just to serve, but to create meaningful connections with every guest. Your
                comfort and satisfaction is our highest priority.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Award className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3">Timeless Tradition</h3>
              <p className="text-muted-foreground">
                We honor centuries of culinary heritage while embracing innovative techniques and contemporary flavors
                to craft something truly unique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="relative h-72 rounded-lg overflow-hidden mb-6">
                <Image
                  src="/portrait-of-professional-chef-in-white-chef-coat.jpg"
                  alt="Chef Marco Rossi"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2">Chef Marco Rossi</h3>
              <p className="text-primary mb-3 font-medium">Executive Chef & Co-founder</p>
              <p className="text-muted-foreground leading-relaxed">
                With over 25 years of experience in Michelin-starred kitchens across Italy and France, Chef Marco brings
                uncompromising standards and innovative techniques to every plate. His philosophy: simplicity and purity
                of flavors.
              </p>
            </div>

            <div>
              <div className="relative h-72 rounded-lg overflow-hidden mb-6">
                <Image
                  src="/professional-sommelier-in-wine-cellar-holding-wine.jpg"
                  alt="Sophie Laurent"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2">Sophie Laurent</h3>
              <p className="text-primary mb-3 font-medium">Sommelier & Co-founder</p>
              <p className="text-muted-foreground leading-relaxed">
                Sophie's passion for wine has taken her to vineyards across France, Italy, Spain, and beyond. She
                curates our wine list with the same precision and artistry that Chef Marco brings to the kitchen,
                creating perfectly balanced pairings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Michelin Bib Gourmand (2023)",
              "Best Wine List - Paris Gourmet Awards",
              "Top 50 Restaurants in Paris - Le Figaro",
              "Chef's Choice Award - European Culinary Forum",
              "Sommelier Excellence Recognition",
              "Sustainability Leader in Fine Dining",
            ].map((award, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 text-center">
                <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-serif font-bold">{award}</p>
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
