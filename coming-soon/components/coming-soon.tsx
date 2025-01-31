// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useToast } from "@/components/ui/use-toast"

// export default function ComingSoon() {
//   const [email, setEmail] = useState("")
//   const { toast } = useToast()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const response = await fetch("/api/subscribe", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       })

//       if (response.ok) {
//         toast({
//           title: "Success!",
//           description: "You've been added to our waitlist.",
//         })
//         setEmail("")
//       } else {
//         throw new Error("Subscription failed")
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Something went wrong. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       className="text-center"
//     >
//       <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
//       <p className="text-xl mb-8">We're working on something exciting. Stay tuned!</p>
//       <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//         <Input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="flex-grow"
//         />
//         <Button type="submit">Notify Me</Button>
//       </form>
//     </motion.div>
//   )
// }
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function ComingSoon() {
  const [email, setEmail] = useState<string>("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      console.log("Submitting email:", email) // Debugging log
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json() // Parse the JSON response
      console.log("API Response:", data) // Debugging log

      if (response.ok) {
        toast({
          title: "Success!",
          description: "You've been added to our waitlist.",
        })
        setEmail("") // Clear the input field
      } else {
        throw new Error(data.message || "Subscription failed")
      }
    } catch (error) {
      console.error("Subscription error:", error) // Debugging log
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
      <p className="text-xl mb-8">We're working on something exciting. Stay tuned!</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-grow"
        />
        <Button type="submit">Notify Me</Button>
      </form>
    </motion.div>
  )
}
