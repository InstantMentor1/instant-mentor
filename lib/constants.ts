export const domains = [
  "Commerce",
  "MBA",
  "Engineering",
  "Coding",
  "Digital Marketing",
  "AI Tools",
  "Finance",
  "Design",
  "Entrepreneurship",
  "Data Analytics",
] as const;

export type Domain = (typeof domains)[number];

export function isDomain(value: string): value is Domain {
  return domains.includes(value as Domain);
}

export const technicalTracks = [
  "Full Stack Development",
  "AI & Machine Learning",
  "Data Analytics",
  "Cloud & DevOps",
  "Cybersecurity",
  "UI/UX for Technical Students",
  "Core Engineering Support",
  "Placement Preparation",
  "Resume & Interview Support",
  "Career Roadmap Guidance",
] as const;

export type TechnicalTrack = (typeof technicalTracks)[number];

export const sessionTypes = [
  "Doubt-solving",
  "Career guidance",
  "Resume/interview support",
  "Career roadmap support",
] as const;

export type SessionType = (typeof sessionTypes)[number];

export const personalEmailDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "protonmail.com",
  "live.com",
  "rediffmail.com",
] as const;

export const approvedInstitutionDomains = [
  "iitb.ac.in",
  "iitd.ac.in",
  "iitm.ac.in",
  "iitk.ac.in",
  "iisc.ac.in",
  "bits-pilani.ac.in",
] as const;

export function isTechnicalTrack(value: string): value is TechnicalTrack {
  return technicalTracks.includes(value as TechnicalTrack);
}

export function isSessionType(value: string): value is SessionType {
  return sessionTypes.includes(value as SessionType);
}
