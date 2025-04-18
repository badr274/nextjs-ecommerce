/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmailTemplate } from "@/app/_components/email-template";
import { ReactNode } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: any) {
  const data: any = await req.json();
  const email = data.email;
  const username = data.username;
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "Hello world",
      react: EmailTemplate({ username }) as ReactNode,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
