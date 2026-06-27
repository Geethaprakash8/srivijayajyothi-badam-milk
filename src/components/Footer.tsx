import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-to-b from-cream to-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <h3 className="font-display text-3xl tracking-tight text-deep-green">Srivijayajyothi Badam Milk</h3>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Freshness in every bottle. Traditional Indian milk beverages, hand-prepared daily and
            delivered chilled to your door.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Instagram, href: "https://www.instagram.com/srivijayajyothi_badammilk?igsh=MTl4dW5zN3o2dnJvdA==", label: "Instagram" },
              { Icon: MessageCircle, href: "#", label: "WhatsApp" },
              { Icon: Mail, href: "mailto:hello@royalmilk.in", label: "Email" },
              { Icon: Phone, href: "tel:+910000000000", label: "Phone" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-deep-green transition-all hover:border-gold hover:bg-cream"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/menu", label: "Menu" },
              { to: "/about", label: "About" },
              { to: "/reviews", label: "Reviews" },
              { to: "/contact", label: "Contact" },
              { to: "/faq", label: "FAQ" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-foreground/80 transition-colors hover:text-deep-green">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Legal</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#" className="text-foreground/80 hover:text-deep-green">Privacy Policy</a></li>
            <li><a href="#" className="text-foreground/80 hover:text-deep-green">Terms</a></li>
            <li><a href="#" className="text-foreground/80 hover:text-deep-green">Refunds</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Srivijayajyothi Badam Milk. All rights reserved.</p>
          <p className="font-display italic">Freshness in every bottle.</p>
        </div>
      </div>
    </footer>
  );
}