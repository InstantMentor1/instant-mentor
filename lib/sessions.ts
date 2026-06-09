export const sessionStatuses = [
  "pending",
  "assigned",
  "accepted",
  "rejected",
  "scheduled",
  "completed",
  "cancelled",
] as const;

export type SessionStatus = (typeof sessionStatuses)[number];

export type SessionRequest = {
  id: string;
  student_id: string;
  mentor_id: string | null;
  technical_track: string;
  session_type: string;
  title: string;
  description: string;
  preferred_date: string;
  preferred_time: string;
  attachment_link?: string | null;
  status: SessionStatus;
  meeting_link: string | null;
  scheduled_at: string | null;
  rejection_reason: string | null;
  price: number;
  platform_commission_percent: number;
  mentor_payout_percent: number;
  created_at: string;
};

export function canSeeMeetingLink(session: SessionRequest) {
  return (
    Boolean(session.meeting_link) &&
    (session.status === "accepted" || session.status === "scheduled")
  );
}
