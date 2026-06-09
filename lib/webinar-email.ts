import "server-only";
import { emailShell, escapeHtml, sendGmailEmail } from "@/lib/email";

type WebinarPerson = { full_name: string; email: string };
type WebinarInfo = {
  title: string;
  technical_track: string;
  scheduled_at: string;
  meeting_link?: string | null;
};

export async function sendWebinarRegistrationEmails(input: {
  student: WebinarPerson;
  mentor: WebinarPerson;
  webinar: WebinarInfo;
  finalPrice: number;
  paymentStatus: string;
}) {
  await Promise.all([
    sendGmailEmail({
      to: input.student.email,
      subject: "Your Instant Mentor webinar registration is received",
      html: emailShell(`
        <p>Hi ${escapeHtml(input.student.full_name)},</p>
        <p>Your registration for the webinar has been received.</p>
        <p><strong>Title:</strong> ${escapeHtml(input.webinar.title)}</p>
        <p><strong>Track:</strong> ${escapeHtml(input.webinar.technical_track)}</p>
        <p><strong>Date & Time:</strong> ${escapeHtml(new Date(input.webinar.scheduled_at).toLocaleString("en-IN"))}</p>
        <p><strong>Price:</strong> ₹${input.finalPrice}</p>
        <p><strong>Payment Status:</strong> ${escapeHtml(input.paymentStatus)}</p>
        <p>The meeting link will be shared once your access is confirmed.</p>
        <p>Regards,<br><strong>Team Instant Mentor</strong></p>
      `),
    }),
    sendGmailEmail({
      to: input.mentor.email,
      subject: "New student registered for your webinar",
      html: emailShell(`
        <p>Hi ${escapeHtml(input.mentor.full_name)},</p>
        <p>A student has registered for your webinar.</p>
        <p><strong>Student:</strong> ${escapeHtml(input.student.full_name)}</p>
        <p><strong>Webinar:</strong> ${escapeHtml(input.webinar.title)}</p>
        <p><strong>Track:</strong> ${escapeHtml(input.webinar.technical_track)}</p>
        <p><strong>Final Price:</strong> ₹${input.finalPrice}</p>
        <p>Regards,<br><strong>Team Instant Mentor</strong></p>
      `),
    }),
  ]);
}

export function sendWebinarAccessConfirmedEmail(input: {
  student: WebinarPerson;
  webinar: WebinarInfo;
}) {
  return sendGmailEmail({
    to: input.student.email,
    subject: "Your Instant Mentor webinar access is confirmed",
    html: emailShell(`
      <p>Hi ${escapeHtml(input.student.full_name)},</p>
      <p>Your access to the webinar is confirmed.</p>
      <p><strong>Title:</strong> ${escapeHtml(input.webinar.title)}</p>
      <p><strong>Track:</strong> ${escapeHtml(input.webinar.technical_track)}</p>
      <p><strong>Date & Time:</strong> ${escapeHtml(new Date(input.webinar.scheduled_at).toLocaleString("en-IN"))}</p>
      <p><strong>Meeting Link:</strong> <a href="${escapeHtml(input.webinar.meeting_link ?? "")}">${escapeHtml(input.webinar.meeting_link ?? "")}</a></p>
      <p>Please join on time.</p>
      <p>Regards,<br><strong>Team Instant Mentor</strong></p>
    `),
  });
}
