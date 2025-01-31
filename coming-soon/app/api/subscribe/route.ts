import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase"

export async function POST(request: Request) {
  const { email } = await request.json()

  try {
    const { data, error } = await supabase.from("subscribers").insert([{ email }])

    if (error) throw error

    return NextResponse.json({ message: "Subscription successful" })
  } catch (error) {
    console.error("Error inserting email:", error)
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 })
  }
}

