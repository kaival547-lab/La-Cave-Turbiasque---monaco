"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Footer() {
  const pathname = usePathname()

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/auth")) {
    return null
  }

  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">La Cave Turbiasque</h3>
            <p className="text-sm opacity-90">Premium Italian-French cuisine in an intimate atmosphere.</p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-4">Hours</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Clock size={16} />
                <span>Tue-Thu: 6PM - 11PM</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} />
                <span>Fri-Sat: 6PM - 12AM</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} />
                <span>Sun: 6PM - 10PM</span>
              </li>
              <li>Closed Mondays</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+33123456789" className="hover:underline">
                  +33 (0)1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@lacaveturbiasque.com" className="hover:underline">
                  info@lacaveturbiasque.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>
                  123 Rue de Paris
                  <br />
                  75001 Paris, France
                </span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/menu" className="hover:underline">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="hover:underline">
                  Reservations
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:underline">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2025 La Cave Turbiasque. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
