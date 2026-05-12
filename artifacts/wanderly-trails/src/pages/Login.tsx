import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { Compass, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
const signupSchema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6), confirm: z.string().min(6) }).refine((d) => d.password === d.confirm, { message: "Passwords must match", path: ["confirm"] });

type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;

export default function Login() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [showPass, setShowPass] = useState(false);
  const { toast } = useToast();

  const loginForm = useForm<LoginForm>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });
  const signupForm = useForm<SignupForm>({ resolver: zodResolver(signupSchema), defaultValues: { name: "", email: "", password: "", confirm: "" } });

  const onLogin = (data: LoginForm) => {
    toast({ title: "Login Successful", description: "Welcome back to Wanderly Trails!" });
    loginForm.reset();
  };

  const onSignup = (data: SignupForm) => {
    toast({ title: "Account Created!", description: "Welcome to Wanderly Trails. Start exploring!" });
    signupForm.reset();
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Panel */}
      <div className="hidden lg:flex relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1200&q=80" alt="Login" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 to-primary/60" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-serif font-bold">Wanderly<span className="text-accent">Trails</span></span>
          </Link>
          <div>
            <h2 className="text-4xl font-serif font-bold mb-4">Your Next Adventure<br />Awaits You</h2>
            <p className="text-white/70 text-lg">Join thousands of travelers who trust us to make their journey unforgettable.</p>
            <div className="flex items-center gap-6 mt-8">
              {[{ num: "5000+", label: "Travelers" }, { num: "4.9", label: "Rating" }, { num: "120+", label: "Destinations" }].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-serif font-bold">{s.num}</p>
                  <p className="text-white/60 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center p-8 pt-24 lg:pt-8 bg-background">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center"><Compass className="w-4 h-4 text-white" /></div>
            <span className="text-lg font-serif font-bold">Wanderly<span className="text-accent">Trails</span></span>
          </div>

          <h1 className="text-2xl font-serif font-bold mb-1">{tab === "login" ? "Welcome Back" : "Create Account"}</h1>
          <p className="text-muted-foreground text-sm mb-6">{tab === "login" ? "Sign in to access your trips and bookings" : "Join us and start your travel journey"}</p>

          <div className="flex bg-muted rounded-xl p-1 mb-6">
            {(["login", "signup"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} data-testid={`tab-auth-${t}`}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === t ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}>
                {t === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          {tab === "login" ? (
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Email</label>
                <input {...loginForm.register("email")} type="email" data-testid="input-login-email" placeholder="your@email.com"
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background" />
                {loginForm.formState.errors.email && <p className="text-red-500 text-xs mt-1">Valid email required</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Password</label>
                <div className="relative">
                  <input {...loginForm.register("password")} type={showPass ? "text" : "password"} data-testid="input-login-password" placeholder="••••••••"
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background pr-10" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {loginForm.formState.errors.password && <p className="text-red-500 text-xs mt-1">Min 6 characters</p>}
              </div>
              <div className="text-right">
                <button type="button" className="text-xs text-primary hover:text-primary/80 font-semibold">Forgot Password?</button>
              </div>
              <button type="submit" data-testid="btn-login-submit" className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors">Sign In</button>
              <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div><div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground">or continue with</span></div></div>
              <button type="button" data-testid="btn-google-login" className="w-full border border-border py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-muted transition-colors text-sm font-semibold">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>
            </form>
          ) : (
            <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Full Name</label>
                <input {...signupForm.register("name")} data-testid="input-signup-name" placeholder="Your name"
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Email</label>
                <input {...signupForm.register("email")} type="email" data-testid="input-signup-email" placeholder="your@email.com"
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Password</label>
                <input {...signupForm.register("password")} type="password" data-testid="input-signup-password" placeholder="Min 6 characters"
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Confirm Password</label>
                <input {...signupForm.register("confirm")} type="password" data-testid="input-signup-confirm" placeholder="Repeat password"
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background" />
                {signupForm.formState.errors.confirm && <p className="text-red-500 text-xs mt-1">{signupForm.formState.errors.confirm.message}</p>}
              </div>
              <button type="submit" data-testid="btn-signup-submit" className="w-full bg-accent text-white font-bold py-3.5 rounded-xl hover:bg-accent/90 transition-colors">Create Account</button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
