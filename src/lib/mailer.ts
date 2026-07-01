import nodemailer from "nodemailer";

export function isEmailConfigured(): boolean {
  return !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

export interface LeadData {
  name: string;
  phone: string;
  email?: string;
  address: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  description?: string;
  region: "losangeles" | "ventura";
}

export async function sendLeadEmail(data: LeadData): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const regionLabel = data.region === "losangeles" ? "Los Angeles" : "Ventura County";
  const to = process.env.BOOKING_TO ?? "info@theplumbingstars.com";

  await transporter.sendMail({
    from: `"The Plumbing Stars" <${process.env.GMAIL_USER}>`,
    to,
    subject: `New Booking Request — ${regionLabel}`,
    html: `
      <h2 style="color:#0b2a55">New Booking Request — ${regionLabel}</h2>
      <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
        <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
        <tr><td><strong>Email</strong></td><td>${data.email ?? "—"}</td></tr>
        <tr><td><strong>Address / ZIP</strong></td><td>${data.address}</td></tr>
        <tr><td><strong>Service</strong></td><td>${data.service}</td></tr>
        <tr><td><strong>Preferred Date</strong></td><td>${data.preferredDate ?? "—"}</td></tr>
        <tr><td><strong>Preferred Time</strong></td><td>${data.preferredTime ?? "—"}</td></tr>
        <tr><td><strong>Description</strong></td><td>${data.description ?? "—"}</td></tr>
      </table>
      <hr style="margin-top:24px"/>
      <p style="color:#888;font-size:12px">Submitted via theplumbingstars.com/${data.region}</p>
    `,
  });
}
