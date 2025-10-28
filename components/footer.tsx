import Link from "next/link"
import { Leaf } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-primary mb-4">
              <Leaf className="w-5 h-5" />
              <span>FloraCare</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered plant care community helping you nurture your green space.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/identify" className="text-muted-foreground hover:text-primary transition-colors">
                  Plant Identification
                </Link>
              </li>
              <li>
                <Link href="/diagnose" className="text-muted-foreground hover:text-primary transition-colors">
                  Health Diagnosis
                </Link>
              </li>
              <li>
                <Link href="/my-garden" className="text-muted-foreground hover:text-primary transition-colors">
                  My Garden
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-muted-foreground hover:text-primary transition-colors">
                  Community Forum
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools" className="text-muted-foreground hover:text-primary transition-colors">
                  Tools & Recommendations
                </Link>
              </li>
              <li>
                <Link href="/finder" className="text-muted-foreground hover:text-primary transition-colors">
                  Store Finder
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 FloraCare. All rights reserved. Nurturing green spaces, one plant at a time.
          </p>
        </div>
      </div>
    </footer>
  )
}
