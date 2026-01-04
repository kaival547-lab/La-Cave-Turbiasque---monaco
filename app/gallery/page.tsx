"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { CTASection } from "@/components/cta-section"

interface GalleryItem {
  id: number
  title: string
  category: string
  image: string
  description: string
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Dining Room",
      category: "ambiance",
      image: "/elegant-dining-room-with-warm-lighting-and-stone-w.jpg",
      description: "Our intimate dining room with historic stone walls and warm ambiance",
    },
    {
      id: 2,
      title: "Wine Cellar",
      category: "ambiance",
      image: "/historic-wine-cellar-with-wooden-racks-and-vintage.jpg",
      description: "Our exceptional wine cellar featuring over 500 carefully curated bottles",
    },
    {
      id: 3,
      title: "Chef's Table",
      category: "ambiance",
      image: "/upscale-kitchen-with-professional-equipment-and-stone.jpg",
      description: "Private chef's table experience overlooking the kitchen",
    },
    {
      id: 4,
      title: "Risotto al Tartufo",
      category: "cuisine",
      image: "/gourmet-italian-risotto-with-black-truffle-shavings-a.jpg",
      description: "Our signature creamy risotto with fresh black truffle",
    },
    {
      id: 5,
      title: "Ossobuco Milanese",
      category: "cuisine",
      image: "/braised-veal-shank-ossobuco-with-saffron-risotto.jpg",
      description: "Tender braised veal shank with saffron risotto and gremolata",
    },
    {
      id: 6,
      title: "Dover Sole",
      category: "cuisine",
      image: "/whole-fish-dover-sole-prepared-with-brown-butter-a.jpg",
      description: "Perfectly pan-fried Dover sole with brown butter and seasonal vegetables",
    },
    {
      id: 7,
      title: "Chocolate Soufflé",
      category: "cuisine",
      image: "/decadent-dark-chocolate-souffl-with-grand-marnier.jpg",
      description: "Our signature chocolate soufflé with Grand Marnier sauce",
    },
    {
      id: 8,
      title: "Wine Selection",
      category: "wine",
      image: "/curated-wine-bottles-in-wine-cellar-display.jpg",
      description: "Premium Italian and French wines carefully selected by our sommelier",
    },
    {
      id: 9,
      title: "Sommelier Experience",
      category: "wine",
      image: "/sommelier-presenting-wine-to-guests-in-dining-room.jpg",
      description: "Our sommelier presenting wine pairings to enhance your meal",
    },
  ]

  const categories = ["all", "ambiance", "cuisine", "wine"]
  const filteredItems =
    selectedCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-12 md:py-16 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the elegance, cuisine, and wine that define La Cave Turbiasque
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square bg-muted"
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <h3 className="text-white font-serif font-bold text-lg">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>

            <div className="bg-background rounded-lg overflow-hidden">
              <div className="relative w-full aspect-video md:aspect-auto md:h-96 lg:h-[500px]">
                <Image
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="p-6">
                <h2 className="text-3xl font-serif font-bold mb-2">{selectedImage.title}</h2>
                <p className="text-muted-foreground mb-4">{selectedImage.description}</p>
                <div className="inline-block px-3 py-1 bg-muted rounded-full text-sm font-medium">
                  {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
