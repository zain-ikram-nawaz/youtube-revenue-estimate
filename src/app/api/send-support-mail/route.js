import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, inquiryType, subject, message } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zainikram704@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD, // make sure this is set in .env.local
      },
    });

await transporter.sendMail({
  from: `"${name}" <zainikram704@gmail.com>`,
  replyTo: email,
  to: "support@channelincome.com", // direct Gmail, skip forwarding
  subject: `[${inquiryType}] ${subject}`,
  html: `
  <h2>New Support Request</h2>
  <p><b>Name:</b> ${name}</p>
  <p><b>Email:</b> ${email}</p>
  <p><b>Inquiry Type:</b> ${inquiryType}</p>
  <p><b>Subject:</b> ${subject}</p>
  <p><b>Message:</b></p>
  <p>${message}</p>
`,
});


    return Response.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return Response.json({ success: false, message: "Error sending email" }, { status: 500 });
  }
}
