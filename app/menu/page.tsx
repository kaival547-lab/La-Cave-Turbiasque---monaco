"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { menuAPI } from "@/lib/api"
import { CTASection } from "@/components/cta-section"

interface MenuItem {
  name: string
  description: string
  price: string
  image?: string
  dietary?: string[]
}

interface MenuCategory {
  name: string
  items: MenuItem[]
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("appetizers")
  const [menuData, setMenuData] = useState<Record<string, MenuCategory>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMenu() {
      try {
        const items = await menuAPI.getAll()

        // Group items by category
        const grouped: Record<string, MenuCategory> = {}

        // Define category display names
        const categoryNames: Record<string, string> = {
          appetizers: "Appetizers",
          soups: "Soups",
          mains: "Main Courses",
          sides: "Sides",
          desserts: "Desserts",
          wines: "Wine Selection"
        }

        items.forEach((item: any) => {
          if (!grouped[item.category]) {
            grouped[item.category] = {
              name: categoryNames[item.category] || item.category,
              items: []
            }
          }
          grouped[item.category].items.push(item)
        })

        setMenuData(grouped)
      } catch (error) {
        console.error("Error fetching menu:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMenu()
  }, [])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading menu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-12 md:py-16 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Our Menu</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of Italian and French cuisine, paired with exceptional wines from
            our cellar
          </p>
        </div>
      </section>

      {/* Menu Tabs */}
      <section className="py-12 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-muted p-1 rounded-lg">
              {Object.entries(menuData).map(([key, category]) => (
                <TabsTrigger key={key} value={key} className="text-sm md:text-base">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(menuData).map(([key, category]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <div className="space-y-6">
                  {category.items.map((item, index) => (
                    <div key={index} className="border-b border-border pb-6 last:border-0 flex gap-6">
                      <div className="h-24 w-24 flex-shrink-0 relative overflow-hidden rounded-md bg-muted">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200'
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <div className="flex-1">
                            <h3 className="text-xl font-serif font-bold">{item.name}</h3>
                            {item.dietary && (
                              <div className="flex gap-2 mt-2">
                                {item.dietary.map((tag) => (
                                  <span key={tag} className="text-xs font-medium text-primary">
                                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <p className="text-lg font-bold text-primary whitespace-nowrap">${parseFloat(item.price).toFixed(2)}</p>
                        </div>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Wine Pairing Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">Wine Pairings</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our sommelier carefully selects wines that complement each dish perfectly. Ask our staff for personalized
              pairing recommendations.
            </p>
          </div>
          <div className="bg-background rounded-lg p-8 border border-border">
            <h3 className="text-2xl font-serif font-bold mb-6">Sommelier's Recommendations</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">Light & Fresh Pairings</p>
                  <p className="text-muted-foreground text-sm">Perfect for seafood and appetizers</p>
                </div>
                <p className="text-primary font-bold">€15-€25 per glass</p>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">Classic & Balanced Pairings</p>
                  <p className="text-muted-foreground text-sm">Ideal for pasta and poultry dishes</p>
                </div>
                <p className="text-primary font-bold">€20-€35 per glass</p>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">Full-Bodied & Complex Pairings</p>
                  <p className="text-muted-foreground text-sm">Best with meat and game courses</p>
                </div>
                <p className="text-primary font-bold">€25-€50 per glass</p>
              </div>
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
