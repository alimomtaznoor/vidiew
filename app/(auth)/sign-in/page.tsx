"use client";

import Link from "next/link";
import Image from "next/image";
import { Video } from "lucide-react";

import { authClient } from "@/lib/auth-client";



const SignIn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] opacity-50"></div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-8">
          {/* Logo */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-3 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Video className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Vidiew
              </span>
            </Link>
          </div>

          {/* Welcome Text */}
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
            <p className="text-slate-600 leading-relaxed">
              Create and share your very first{" "}
              <span className="font-semibold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                Vidiew video
              </span>{" "}
              in no time!
            </p>
          </div>

          {/* Sign In Button */}
          <div className="space-y-4">
            <button
              onClick={async () => {
                return await authClient.signIn.social({
                  provider: "google",
                  callbackURL: "/media",
                });
              }}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 rounded-xl px-6 py-4 transition-all duration-200 hover:shadow-lg group"
            >
              <Image
                src="/assets/icons/google.svg"
                alt="Google Icon"
                width={24}
                height={24}
                className="group-hover:scale-110 transition-transform duration-200"
              />
              <span className="font-semibold text-slate-700">
                Continue with Google
              </span>
            </button>

            <button
              onClick={async () => {
                return await authClient.signIn.social({
                  provider: "github",
                  callbackURL: "/media",
                });
              }}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 rounded-xl px-6 py-4 transition-all duration-200 hover:shadow-lg group"
            >
              <Image
                src="/assets/icons/github.svg"
                alt="GitHub Icon"
                width={24}
                height={24}
                className="group-hover:scale-110 transition-transform duration-200"
              />
              <span className="font-semibold text-slate-700">
                Continue with GitHub
              </span>
            </button>
          </div>

          {/* Features */}
          <div className="pt-6 border-t border-slate-200">
            <div className="grid grid-cols-1 gap-4 text-center">
              <div className="space-y-2">
                <div className="flex justify-center space-x-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-xs">★</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-600">
                  Trusted by thousands of creators
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            © 2025 Vidiew. All rights reserved.
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
    </div>
  );
};

export default SignIn;
