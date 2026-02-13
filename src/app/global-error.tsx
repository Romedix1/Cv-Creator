"use client"

import Button from "@/components/ui/Button"
import "@/app/globals.css"

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen text-center bg-black/90">
        <h1 className="text-2xl font-bold mb-6 text-white">Something went wrong / Coś poszło nie tak</h1>
        <Button variant="primary" className="px-6" text="Try again / Spróbuj ponownie" onClick={() => reset()} />
      </body>
    </html>
  )
}