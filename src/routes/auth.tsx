import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lock, Mail, Phone, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import heroImg from "@/assets/hero-bottles.jpg";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Login or Sign Up — Royal Milk Beverages" },
      { name: "description", content: "Sign in to track orders and reorder your favourites." },
    ],
  }),
  component: AuthPage,
});

type Mode = "login" | "signup" | "forgot" | "otp";

function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");

  return (
    <section className="mx-auto grid min-h-[80vh] max-w-7xl gap-12 px-6 py-12 md:px-8 lg:grid-cols-2 lg:py-20">
      <div className="relative hidden overflow-hidden rounded-[36px] border border-border lg:block">
        <img src={heroImg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-green/80 via-deep-green/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-10 text-cream">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Royal Milk</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight">Welcome back.</h2>
          <p className="mt-3 max-w-sm text-cream/80">
            Reorder your favourites, track every bottle, and unlock member-only drops.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex gap-2 rounded-full border border-border bg-cream p-1">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`relative flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                mode === m || (mode === "forgot" && m === "login") || (mode === "otp" && m === "signup")
                  ? "text-cream"
                  : "text-muted-foreground"
              }`}
            >
              {(mode === m || (mode === "forgot" && m === "login") || (mode === "otp" && m === "signup")) && (
                <motion.span layoutId="auth-pill" className="absolute inset-0 -z-10 rounded-full bg-deep-green" />
              )}
              <span className="relative">{m === "login" ? "Login" : "Sign Up"}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-8 rounded-3xl border border-border bg-white p-8 shadow-[0_4px_30px_-20px_rgba(15,81,50,0.2)]"
          >
            {mode === "login" && <LoginForm onForgot={() => setMode("forgot")} />}
            {mode === "signup" && <SignupForm onOtp={() => setMode("otp")} />}
            {mode === "forgot" && <ForgotForm onBack={() => setMode("login")} />}
            {mode === "otp" && <OtpForm onDone={() => setMode("login")} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function FieldI({
  label,
  type = "text",
  Icon,
  placeholder,
}: {
  label: string;
  type?: string;
  Icon: typeof Mail;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <span className="mt-2 flex items-center gap-3 rounded-2xl border border-input bg-white px-4 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <input
          type={type}
          required
          placeholder={placeholder}
          className="w-full bg-transparent py-3 text-sm outline-none"
        />
      </span>
    </label>
  );
}

function PrimaryBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-deep-green px-6 py-3.5 text-sm font-medium text-cream transition-transform hover:scale-[1.01]"
    >
      {children} <ArrowRight className="h-4 w-4" />
    </button>
  );
}

function LoginForm({ onForgot }: { onForgot: () => void }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); toast.success("Welcome back!"); }}>
      <h1 className="font-display text-3xl text-deep-green">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">Sign in to your account.</p>
      <div className="mt-6 space-y-4">
        <FieldI label="Email" type="email" Icon={Mail} placeholder="you@example.com" />
        <FieldI label="Password" type="password" Icon={Lock} placeholder="••••••••" />
      </div>
      <button type="button" onClick={onForgot} className="mt-3 text-xs font-medium text-deep-green hover:text-gold">
        Forgot password?
      </button>
      <PrimaryBtn>Sign in</PrimaryBtn>
    </form>
  );
}

function SignupForm({ onOtp }: { onOtp: () => void }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onOtp(); }}>
      <h1 className="font-display text-3xl text-deep-green">Create an account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Join the freshest milk club in town.</p>
      <div className="mt-6 space-y-4">
        <FieldI label="Full Name" Icon={ShieldCheck} placeholder="Your name" />
        <FieldI label="Mobile" type="tel" Icon={Phone} placeholder="+91" />
        <FieldI label="Email" type="email" Icon={Mail} placeholder="you@example.com" />
        <FieldI label="Password" type="password" Icon={Lock} placeholder="••••••••" />
      </div>
      <PrimaryBtn>Send OTP</PrimaryBtn>
    </form>
  );
}

function ForgotForm({ onBack }: { onBack: () => void }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); toast.success("Reset link sent."); onBack(); }}>
      <h1 className="font-display text-3xl text-deep-green">Reset password</h1>
      <p className="mt-1 text-sm text-muted-foreground">We'll email you a reset link.</p>
      <div className="mt-6">
        <FieldI label="Email" type="email" Icon={Mail} placeholder="you@example.com" />
      </div>
      <PrimaryBtn>Send reset link</PrimaryBtn>
      <button type="button" onClick={onBack} className="mt-4 w-full text-xs font-medium text-muted-foreground hover:text-deep-green">
        Back to login
      </button>
    </form>
  );
}

function OtpForm({ onDone }: { onDone: () => void }) {
  const [vals, setVals] = useState(["", "", "", "", "", ""]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Verified! Account created.");
        onDone();
      }}
    >
      <h1 className="font-display text-3xl text-deep-green">Verify your number</h1>
      <p className="mt-1 text-sm text-muted-foreground">Enter the 6-digit code we sent you.</p>
      <div className="mt-6 flex justify-between gap-2">
        {vals.map((v, i) => (
          <input
            key={i}
            maxLength={1}
            value={v}
            onChange={(e) => {
              const next = [...vals];
              next[i] = e.target.value.replace(/\D/, "");
              setVals(next);
              const nextEl = document.getElementById(`otp-${i + 1}`);
              if (e.target.value && nextEl) (nextEl as HTMLInputElement).focus();
            }}
            id={`otp-${i}`}
            inputMode="numeric"
            className="h-14 w-12 rounded-2xl border border-input bg-white text-center font-display text-2xl outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
        ))}
      </div>
      <PrimaryBtn>Verify</PrimaryBtn>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Didn't get the code? <button type="button" className="font-medium text-deep-green">Resend</button>
      </p>
    </form>
  );
}