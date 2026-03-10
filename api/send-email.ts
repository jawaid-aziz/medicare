import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  console.log('coming')
  try {

    const { name, clinic, email, message, phone } = req.body;

    if (!name || !clinic || !email || !message || !phone) {
    return res.status(400).json({ error: "Missing required fields" })
}

    const data = await resend.emails.send({
      from: "Demo Request <onboarding@resend.dev>",
      to: ["javaidmemon24@gmail.com"],
      subject: "New Demo Request",
      html: `
        <h2>New Demo Request</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Clinic:</strong> ${clinic}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error });
  }
}