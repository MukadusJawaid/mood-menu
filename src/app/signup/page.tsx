"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Smile } from "lucide-react";
// import { supabase } from '@/lib/supabaseClient'; // Ready for API integration
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { setUser } from "@/redux/slices/authSlice";

const STRONG_PASSWORD = {
  minLength: 8,
  hasUpper: /[A-Z]/,
  hasLower: /[a-z]/,
  hasNumber: /\d/,
  hasSpecial: /[!@#$%^&*(),.?":{}|<>]/,
};

function validatePassword(password: string): string | null {
  if (password.length < STRONG_PASSWORD.minLength) {
    return `At least ${STRONG_PASSWORD.minLength} characters`;
  }
  if (!STRONG_PASSWORD.hasUpper.test(password)) return "One uppercase letter";
  if (!STRONG_PASSWORD.hasLower.test(password)) return "One lowercase letter";
  if (!STRONG_PASSWORD.hasNumber.test(password)) return "One number";
  if (!STRONG_PASSWORD.hasSpecial.test(password))
    return "One special character (!@#$%^&* etc.)";
  return null;
}

export default function SignUpPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPasswordError("");

    const pwdErr = validatePassword(password);
    if (pwdErr) {
      setPasswordError(`Password must include: ${pwdErr}`);
      return;
    }

    setLoading(true);
    try {
      console.log("Submitting signup", { email, username });
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          fullName: username,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Sign up failed.");
      }

      if (data.user) {
        dispatch(
          setUser({
            id: data.user.id,
            email: data.user.email,
            full_name: data.user.user_metadata?.full_name ?? null,
          }),
        );
      }

      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center bg-background px-4 py-12">
      <Card className="max-w-md w-full p-8 shadow-xl bg-card-bg">
        <div className="flex flex-col items-center justify-center mb-8 gap-4">
          <div className="p-4 rounded-full bg-primary/10 text-primary">
            <Smile size={48} />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MoodMenu
            </h1>
            <p className="text-gray-500 mt-2">
              Create an account to get started.
            </p>
          </div>
        </div>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <Input
            label="Username"
            type="text"
            placeholder="johndoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full"
            autoComplete="username"
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
            autoComplete="email"
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            required
            className="w-full"
            error={passwordError || undefined}
            autoComplete="new-password"
          />
          <p className="text-xs text-gray-500 -mt-2">
            Min 8 characters, one uppercase, one lowercase, one number, one
            special character.
          </p>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
