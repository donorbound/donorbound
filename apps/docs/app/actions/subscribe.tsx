"use server";

import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

const GOOGLE_FORM_ID = process.env.GOOGLE_FORM_ID;
const EMAIL_FIELD_ID = process.env.GOOGLE_FORM_EMAIL_FIELD_ID;

export async function subscribe(formData: FormData) {
  const email = formData.get("email");
  const result = schema.safeParse({ email });

  if (!result.success) {
    return { message: "Invalid email address", success: false };
  }

  try {
    const formUrl = `https://docs.google.com/forms/u/1/d/e/${GOOGLE_FORM_ID}/formResponse`;

    const response = await fetch(formUrl, {
      body: new URLSearchParams({
        [EMAIL_FIELD_ID as string]: result.data.email,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      mode: "no-cors",
    });

    console.log(response);
    return {
      message: "Thank you for subscribing!",
      success: true,
    };
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return {
      message: "Failed to add you to the waitlist. Please try again later.",
      success: false,
    };
  }
}
