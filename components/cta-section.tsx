"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
    return (
        <section className="py-12 md:py-16 bg-primary text-primary-foreground shadow-xl">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-2">Ready for an Unforgettable Meal?</h2>
                    <p className="text-primary-foreground/90 text-lg">
                        Reserve your table today and experience culinary excellence.
                    </p>
                </div>
                <div className="flex gap-4 shrink-0">
                    <Link href="/reservations">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="rounded-full px-8 shadow-md font-semibold hover:scale-105 transition-transform"
                        >
                            Book a Table
                        </Button>
                    </Link>
                    <Link href="/menu">
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                        >
                            View Menu
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
