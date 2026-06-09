import "server-only";
import { sendGmailEmail } from "@/lib/email";
import type { SessionRequest } from "@/lib/sessions";

type Person = { full_name: string; email: string };

function escape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function details(session: SessionRequest, student: Person, mentor: Person) {
  return `
    <p><strong>Student:</strong> ${escape(student.full_name)}</p>
    <p><strong>Mentor:</strong> ${escape(mentor.full_name)}</p>
    <p><strong>Topic:</strong> ${escape(session.title)}</p>
    <p><strong>Session Type:</strong> ${escape(session.session_type)}</p>
    <p><strong>Track:</strong> ${escape(session.technical_track)}</p>
    <p><strong>Date & Time:</strong> ${escape(session.scheduled_at ?? "")}</p>
    <p><strong>Meeting Link:</strong> <a href="${escape(session.meeting_link ?? "")}">${escape(session.meeting_link ?? "")}</a></p>
  `;
}

export async function sendSessionScheduledEmails(
  session: SessionRequest,
  student: Person,
  mentor: Person,
) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const sends = [
    sendGmailEmail({
      to: student.email,
      subject: "Your Instant Mentor session has been scheduled",
      html: `<p>Hi ${escape(student.full_name)},</p><p>Your Instant Mentor session has been scheduled.</p>${details(session, student, mentor)}<p>Please join on time and keep your doubt/topic ready.</p><p>Regards,<br>Team Instant Mentor</p>`,
    }),
    sendGmailEmail({
      to: mentor.email,
      subject: "Instant Mentor session scheduled",
      html: `<p>Hi ${escape(mentor.full_name)},</p><p>A session has been scheduled with a student.</p>${details(session, student, mentor)}<p>Please review the pre-session chat before joining.</p><p>Regards,<br>Team Instant Mentor</p>`,
    }),
  ];

  if (adminEmail) {
    sends.push(
      sendGmailEmail({
        to: adminEmail,
        subject: "New Instant Mentor session scheduled",
        html: `<p>A session has been scheduled.</p>${details(session, student, mentor)}`,
      }),
    );
  }

  await Promise.all(sends);
}

export function sendNewSessionAdminEmail(session: SessionRequest, student: Person) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) throw new Error("ADMIN_EMAIL is not configured.");

  return sendGmailEmail({
    to: adminEmail,
    subject: "New session request received",
    html: `<p>A new session request has been received.</p><p><strong>Student:</strong> ${escape(student.full_name)} (${escape(student.email)})</p><p><strong>Topic:</strong> ${escape(session.title)}</p><p><strong>Track:</strong> ${escape(session.technical_track)}</p>`,
  });
}

export function sendSessionAssignedEmail(session: SessionRequest, mentor: Person) {
  return sendGmailEmail({
    to: mentor.email,
    subject: "New session request assigned",
    html: `<p>Hi ${escape(mentor.full_name)},</p><p>A new Instant Mentor session request has been assigned to you.</p><p><strong>Topic:</strong> ${escape(session.title)}</p><p><strong>Track:</strong> ${escape(session.technical_track)}</p><p>Sign in to review and respond.</p>`,
  });
}

export function sendSessionRejectedEmail(
  session: SessionRequest,
  student: Person,
) {
  return sendGmailEmail({
    to: student.email,
    subject: "Update on your Instant Mentor session request",
    html: `<p>Hi ${escape(student.full_name)},</p><p>Your session request was not accepted.</p><p><strong>Topic:</strong> ${escape(session.title)}</p><p><strong>Reason:</strong> ${escape(session.rejection_reason ?? "The mentor was unavailable.")}</p><p>You can request another mentor or session from your dashboard.</p>`,
  });
}
