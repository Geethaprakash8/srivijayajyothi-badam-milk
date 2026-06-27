import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChefHat,
  Leaf,
  PackageCheck,
  Sparkles,
  Star,
  Tag,
  Timer,
  Truck,
} from "lucide-react";
import heroImg from "@/assets/hero-bottles.jpg";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Srivijayajyothi Badam Milk — Fresh Traditional Milk, Delivered" },
      {
        name: "description",
        content:
          "Hand-prepared Badam, Pista and Rose Milk delivered chilled to your door, fresh every day.",
      },
      { property: "og:title", content: "Srivijayajyothi Badam Milk" },
      {
        property: "og:description",
        content: "Hand-prepared Badam, Pista and Rose Milk, delivered fresh.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Featured />
      <Why />
      <Reviews />
      <Delivery />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream via-background to-background" />
      <div
        className="absolute -top-40 right-[-10%] -z-10 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--gold-soft), transparent 70%)" }}
      />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-12 md:grid-cols-2 md:gap-8 md:px-8 md:pt-16 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-deep-green">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Freshness in every bottle
          </span>
          <h1 className="mt-6 font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight text-deep-green sm:text-5xl lg:text-6xl">
            Fresh traditional milk beverages,{" "}
            <span className="gold-text italic">delivered to your door.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Enjoy hand-crafted Badam, Pista and Rose Milk — prepared fresh every morning with
            premium ingredients and traditional recipes passed down for generations.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2 rounded-full bg-deep-green px-6 py-3.5 text-sm font-medium text-cream transition-transform hover:scale-[1.03]"
            >
              Order Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-sm font-medium text-foreground hover:border-gold"
            >
              View Menu
            </Link>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {[
              { k: "100%", v: "Pure Milk" },
              { k: "30–45m", v: "Delivery" },
              { k: "4.9★", v: "Rated by 2k+" },
            ].map((s) => (
              <div key={s.v} className="border-l border-border pl-4 first:border-l-0 first:pl-0">
                <dt className="font-display text-2xl font-semibold text-deep-green">{s.k}</dt>
                <dd className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[5/6] overflow-hidden rounded-[36px] border border-border bg-cream shadow-[0_40px_80px_-30px_rgba(15,81,50,0.35)]">
            <img
              src={heroImg}
              alt="Three premium milk bottles — almond, pistachio and rose"
              width={1600}
              height={1920}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep-green/40 to-transparent p-6 text-cream">
              <p className="text-[11px] uppercase tracking-[0.28em] opacity-90">Today's batch</p>
              <p className="font-display text-xl">Bottled fresh at sunrise</p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="glass-card absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl p-3 shadow-lg md:-left-8"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-deep-green text-cream">
              <Leaf className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Natural</p>
              <p className="text-sm font-semibold text-deep-green">No preservatives</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="glass-card absolute -right-3 top-8 flex items-center gap-3 rounded-2xl p-3 shadow-lg md:-right-6"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-deep-green">
              <Star className="h-4 w-4 fill-current" />
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Reviews</p>
              <p className="text-sm font-semibold text-deep-green">Loved by locals</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-8">
      <SectionHeader
        eyebrow="Our Bottles"
        title="Three signature beverages."
        subtitle="A small, focused menu — each bottle hand-prepared with care and bottled the same morning."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

const WHY = [
  { Icon: Timer, title: "Fresh Daily", body: "Bottled at dawn and delivered within hours." },
  { Icon: Leaf, title: "100% Pure Milk", body: "Sourced from trusted local dairies." },
  { Icon: ChefHat, title: "Premium Ingredients", body: "Real almonds, pistachios and rose essence." },
  { Icon: Truck, title: "Fast Delivery", body: "Average doorstep arrival in 30 to 45 minutes." },
  { Icon: PackageCheck, title: "Safe Packaging", body: "Insulated, leak-proof, chilled bottles." },
  { Icon: Tag, title: "Honest Price", body: "Just ₹60 a bottle. No hidden charges." },
];

function Why() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeader
          eyebrow="Why Royal Milk"
          title="Crafted with care, served with pride."
          subtitle="Every detail considered — from the dairy to the doorstep."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group rounded-3xl border border-border bg-white p-7 transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_30px_60px_-30px_rgba(15,81,50,0.2)]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cream text-deep-green transition-colors group-hover:bg-deep-green group-hover:text-cream">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl text-deep-green">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  {
    name: "Anjali R.",
    city: "Bengaluru",
    text: "The Badam Milk tastes exactly like homemade. The bottles arrive perfectly chilled.",
  },
  {
    name: "Rohan M.",
    city: "Hyderabad",
    text: "Fast delivery, excellent packaging, and the Pista Milk is unreal. My new morning ritual.",
  },
  {
    name: "Sneha K.",
    city: "Chennai",
    text: "Best Rose Milk in town. You can tell the ingredients are real. Worth every rupee.",
  },
];

function Reviews() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-8">
      <SectionHeader
        eyebrow="Loved by 2,000+"
        title="What our customers are saying."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <motion.figure
            key={r.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="flex flex-col gap-5 rounded-3xl border border-border bg-white p-8 shadow-[0_4px_30px_-20px_rgba(15,81,50,0.2)]"
          >
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="font-display text-lg leading-snug text-deep-green">
              “{r.text}”
            </blockquote>
            <figcaption className="flex items-center gap-3 border-t border-border pt-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-cream font-display text-deep-green">
                {r.name[0]}
              </span>
              <div>
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.city}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

const STEPS = [
  { title: "Order", body: "Pick your bottles and check out in seconds." },
  { title: "Confirm", body: "We receive your order and confirm instantly." },
  { title: "Prepare", body: "Each bottle is hand-prepared and capped." },
  { title: "Dispatch", body: "Insulated, chilled bottles head your way." },
  { title: "Delivered", body: "At your door in 30 to 45 minutes." },
];

function Delivery() {
  return (
    <section className="bg-deep-green py-24 text-cream">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">How it works</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
            From our kitchen <span className="gold-text">to your hands.</span>
          </h2>
        </div>
        <ol className="mt-14 grid gap-5 md:grid-cols-5">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative rounded-3xl border border-cream/15 bg-cream/[0.04] p-6 backdrop-blur"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 font-display text-sm text-gold">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-xl">{s.title}</h3>
              <p className="mt-1 text-sm text-cream/70">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-8">
      <div className="relative overflow-hidden rounded-[36px] border border-border bg-gradient-to-br from-cream via-white to-cream p-10 md:p-16">
        <div
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--gold-soft), transparent 70%)" }}
        />
        <div className="relative grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl tracking-tight text-deep-green sm:text-5xl">
              Ready for a sip of <span className="gold-text italic">tradition</span>?
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Order three bottles and start your week with freshness on tap.
            </p>
            <Link
              to="/menu"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-deep-green px-6 py-3.5 text-sm font-medium text-cream"
            >
              Order Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid gap-3 text-sm">
            {["Free chilled packaging", "No preservatives, ever", "Same-day fresh delivery"].map((t) => (
              <li key={t} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4">
                <CheckCircle2 className="h-5 w-5 text-deep-green" />
                <span className="font-medium text-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl tracking-tight text-deep-green sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
