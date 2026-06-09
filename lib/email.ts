import "server-only";
import nodemailer from "nodemailer";
import type { VerificationMethod, VerificationStatus, WaitlistInput } from "@/lib/waitlist";

export type WaitlistEmailUser = WaitlistInput & {
  verificationMethod: VerificationMethod;
  verificationStatus: VerificationStatus;
};

function escapeHtml(value?: string) {
  return (value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function emailShell(content: string) {
  return `
    <div style="background:#f8fafc;padding:32px 16px;font-family:Arial,sans-serif;color:#102a36">
      <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:32px">
        ${content}
      </div>
    </div>
  `;
}

export { emailShell, escapeHtml };

export async function sendAccountSignupEmails(user: {
  fullName: string;
  email: string;
  role: string;
  collegeOrCompany: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://instant-mentor.vercel.app").replace(/\/$/, "");
  const dashboardPath =
    user.role === "Admin"
      ? "/admin/dashboard"
      : user.role === "Mentor"
        ? "/mentor/dashboard"
        : "/student/dashboard";
  const loginLink = `${siteUrl}/login`;
  const dashboardLink = `${siteUrl}${dashboardPath}`;
  const messages = [
    sendGmailEmail({
      to: user.email,
      subject: "Welcome to Instant Mentor",
      html: emailShell(`
        <p>Hi ${escapeHtml(user.fullName)},</p>
        <p>Welcome to Instant Mentor.</p>
        <p>Your Instant Mentor account has been created successfully.</p>
        <p><strong>Login Details:</strong></p>
        <p><strong>Registered Email:</strong> ${escapeHtml(user.email)}</p>
        <p><strong>Role:</strong> ${escapeHtml(user.role)}</p>
        <p><strong>Login Link:</strong> <a href="${escapeHtml(loginLink)}">${escapeHtml(loginLink)}</a></p>
        <p><strong>Dashboard:</strong> <a href="${escapeHtml(dashboardLink)}">${escapeHtml(dashboardLink)}</a></p>
        <p>For security reasons, we do not send or store your password in email. Please use the password you created during signup to log in.</p>
        <p>Regards,<br><strong>Team Instant Mentor</strong></p>
      `),
    }),
  ];

  if (adminEmail) {
    messages.push(
      sendGmailEmail({
        to: adminEmail,
        subject: "New Instant Mentor account",
        html: emailShell(`
          <p>A new platform account was created.</p>
          <p><strong>Name:</strong> ${escapeHtml(user.fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>
          <p><strong>Role:</strong> ${escapeHtml(user.role)}</p>
          <p><strong>Organization:</strong> ${escapeHtml(user.collegeOrCompany)}</p>
        `),
      }),
    );
  }

  await Promise.all(messages);
}

function createGmailTransporter() {
  if (process.env.EMAIL_MODE !== "gmail") {
    throw new Error("EMAIL_MODE must be set to gmail.");
  }

  const user = process.env.GMAIL_USER;
  const password = process.env.GMAIL_APP_PASSWORD;

  if (!user) throw new Error("GMAIL_USER is not configured.");
  if (!password) throw new Error("GMAIL_APP_PASSWORD is not configured.");

  return {
    transporter: nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user,
        pass: password,
      },
    }),
    from: `"Instant Mentor" <${user}>`,
  };
}

export async function sendGmailEmail(message: {
  to: string;
  subject: string;
  html: string;
}) {
  const { transporter, from } = createGmailTransporter();
  return transporter.sendMail({ from, ...message });
}

export function sendWaitlistConfirmationEmail(user: WaitlistEmailUser) {
  return sendGmailEmail({
    to: user.email,
    subject: "Welcome to the Instant Mentor Waitlist",
    html: emailShell(`
      <p>Hi ${escapeHtml(user.fullName)},</p>
      <p>Thank you for joining the Instant Mentor waitlist.</p>
      <p>Your request has been submitted successfully.</p>
      <p>Instant Mentor is India's verified student mentorship and doubt-clearing platform where students connect with faculty and industry experts for doubts, webinars, and career guidance.</p>
      <p>Your current verification status is: <strong>${escapeHtml(user.verificationStatus)}</strong>.</p>
      <p>We'll contact you soon with the next steps.</p>
      <p>Regards,<br><strong>Team Instant Mentor</strong></p>
    `),
  });
}

export function sendAdminNotificationEmail(user: WaitlistEmailUser) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) throw new Error("ADMIN_EMAIL is not configured.");

  return sendGmailEmail({
    to: adminEmail,
    subject: "New Instant Mentor Waitlist Signup",
    html: emailShell(`
      <p>New waitlist signup received.</p>
      <p><strong>Name:</strong> ${escapeHtml(user.fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(user.phone)}</p>
      <p><strong>Role:</strong> ${escapeHtml(user.role)}</p>
      <p><strong>College/Company:</strong> ${escapeHtml(user.collegeOrCompany)}</p>
      <p><strong>Domain:</strong> ${escapeHtml(user.domainOfInterest)}</p>
      <p><strong>LinkedIn/Portfolio:</strong> ${escapeHtml(user.linkedinOrPortfolio) || "Not provided"}</p>
      <p><strong>Verification Method:</strong> ${escapeHtml(user.verificationMethod)}</p>
      <p><strong>Verification Status:</strong> ${escapeHtml(user.verificationStatus)}</p>
      <p><strong>Message:</strong> ${escapeHtml(user.message) || "Not provided"}</p>
    `),
  });
}

export function sendVerificationEmail(user: WaitlistEmailUser, verificationLink: string) {
  return sendGmailEmail({
    to: user.email,
    subject: "Verify your Instant Mentor email",
    html: emailShell(`
      <p>Hi ${escapeHtml(user.fullName)},</p>
      <p>Please verify your email to continue your Instant Mentor verification process.</p>
      <p style="margin:28px 0">
        <a href="${escapeHtml(verificationLink)}" style="background:#006460;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:bold">Verify email</a>
      </p>
      <p>If the button does not work, open this link:<br>${escapeHtml(verificationLink)}</p>
      <p>Regards,<br><strong>Team Instant Mentor</strong></p>
    `),
  });
}
