import { COMPANY } from "@/config/company";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalContent = {
  title: string;
  intro: string[];
  sections: LegalSection[];
};

const {
  brandName,
  legalName,
  address,
  phone,
  website,
  supportEmail,
  grievance,
} = COMPANY;

// ─────────────────────────────────────────────
// Privacy Policy
// ─────────────────────────────────────────────
export const PRIVACY_POLICY: LegalContent = {
  title: "Privacy Policy",
  intro: [
    `This Privacy Policy explains how ${brandName} ("we", "us") collects, uses and protects your personal data when you use this platform and its calculators.`,
    "By creating an account you confirm that you have read this policy and agree to it.",
  ],
  sections: [
    {
      id: "who-we-are",
      title: "1. Who we are",
      paragraphs: [
        `This platform is operated by ${legalName}, trading as ${brandName}, ${address}.`,
        `Phone: ${phone}. Website: ${website}. Support: ${supportEmail}.`,
      ],
    },
    {
      id: "data-we-collect",
      title: "2. What data we collect",
      bullets: [
        "Account data: your name, email address, phone number and password. The password is stored only as a one-way hash, never in readable form.",
        "Company details (optional): company or mill name, city, state and GST number.",
        "Calculator data: the values you enter into a calculator, the results, and the reports you generate (report number, report name and notes you add).",
        "Consent records: which version of the Terms and this policy you accepted, the time, a hashed form of your IP address and a shortened browser identifier.",
        "Technical data: IP address, browser and device information, and security logs needed to keep the platform safe.",
      ],
    },
    {
      id: "why-we-use-it",
      title: "3. Why we use your data",
      bullets: [
        "To create and manage your account and verify your email address.",
        "To provide the calculators and save your reports so you can view them later.",
        "To print your company details on your reports.",
        "To let others check that a report is genuine (see section 5).",
        "To protect the platform against misuse and to respond to support requests.",
        "To meet legal obligations.",
      ],
      paragraphs: [
        "We do not sell your personal data. We will not send you marketing messages unless you separately agree to that.",
      ],
    },
    {
      id: "legal-basis",
      title: "4. Basis for using your data",
      paragraphs: [
        "We use your data based on the consent you give when you create your account, and for uses that the law permits without consent. You can withdraw consent at any time as described in section 9.",
      ],
    },
    {
      id: "report-verification",
      title: "5. Report verification",
      paragraphs: [
        "Each report carries a QR code and a verification code. Anyone who holds them can open a public page that confirms the report is genuine.",
        "That page shows only the report number, calculator name, issue date and time, calculator version and a partly hidden name of the issuer. It never shows your inputs, results, notes, phone number or email address.",
      ],
    },
    {
      id: "sharing",
      title: "6. Who we share data with",
      paragraphs: [
        "We use trusted service providers to run the platform. They process data only on our instructions:",
      ],
      bullets: [
        "Hosting and delivery (Vercel).",
        "Database (Neon). The database is currently located in the United States (AWS us-east-2).",
        "Email delivery (Resend).",
        "File and image uploads (UploadThing).",
        "Error monitoring (Sentry), configured not to receive phone numbers, email addresses or calculation data.",
        "Rate limiting to prevent abuse (Upstash), which may hold IP addresses or email addresses for short periods.",
      ],
    },
    {
      id: "transfers",
      title: "7. Storage outside India",
      paragraphs: [
        "Because some of our providers operate outside India, your data may be stored or processed in other countries. We choose providers with appropriate security practices and will follow the legal requirements that apply to such transfers.",
      ],
    },
    {
      id: "retention",
      title: "8. How long we keep data",
      bullets: [
        "Account data and company details: until you delete your account.",
        "Reports: until you delete them. A deleted report disappears from your list immediately and is permanently removed after 30 days.",
        `Consent records: ${COMPANY.retention.consentRecords}.`,
        `Security logs: ${COMPANY.retention.securityLogs}.`,
        "When you delete your account it is first deactivated for a 30-day grace period and then permanently removed together with your company details and reports.",
      ],
    },
    {
      id: "your-rights",
      title: "9. Your rights",
      bullets: [
        "See and correct your name, phone number and company details on your Profile page.",
        "Delete your account and data from your account settings.",
        "Withdraw your consent by writing to us. Withdrawing consent may mean we can no longer provide the service, and your account will be closed.",
        "Ask for a copy of the personal data we hold about you.",
        "Make a complaint (see section 12).",
        "Nominate another person to exercise your rights if you die or become unable to do so.",
      ],
    },
    {
      id: "security",
      title: "10. Security",
      paragraphs: [
        "We protect data with encrypted connections, hashed passwords, access controls and signed reports. No system is completely secure, so we cannot guarantee absolute security, but we will act promptly if something goes wrong.",
      ],
    },
    {
      id: "children-cookies",
      title: "11. Children and cookies",
      paragraphs: [
        "This platform is meant for business users aged 18 or over. We do not knowingly collect data from children.",
        "We use a secure session cookie to keep you signed in. We do not use advertising cookies.",
      ],
    },
    {
      id: "contact",
      title: "12. Changes, contact and grievances",
      paragraphs: [
        "When we change this policy we publish a new version with its date and ask you to accept it again before you continue.",
        `For questions or complaints contact our grievance officer: ${grievance.officerName}, email ${grievance.email}. We aim to respond ${grievance.responseTime}.`,
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Terms of Service
// ─────────────────────────────────────────────
export const TERMS: LegalContent = {
  title: "Terms of Service",
  intro: [
    `These Terms govern your use of the ${brandName} platform and its calculators. By creating an account or using the platform you agree to them.`,
  ],
  sections: [
    {
      id: "eligibility",
      title: "1. Who can use the platform",
      paragraphs: [
        "You must be at least 18 years old and use the platform for business purposes. If you register for a company you confirm that you are authorised to do so.",
      ],
    },
    {
      id: "account",
      title: "2. Your account",
      bullets: [
        "Give correct information, including a working email address and phone number, and keep it up to date.",
        "One account per email address and per phone number.",
        "Keep your password secret. You are responsible for activity under your account.",
        "We may suspend or close accounts that break these Terms or put the platform at risk.",
      ],
    },
    {
      id: "calculators",
      title: "3. The calculators",
      paragraphs: [
        "The calculators give estimates based on the values you enter and the calculation model version shown on each report. Results depend on the accuracy of your inputs.",
        "Actual costs, yields, prices, capacities and savings may differ with operating conditions, raw material quality and market prices. The results are not professional, financial or engineering advice.",
        "We may improve a calculator over time. Each report shows the version it was created with.",
      ],
    },
    {
      id: "reports",
      title: "4. Reports",
      bullets: [
        "A report is a record of an estimate created from your inputs. It is not a quotation, offer, warranty or contractual commitment.",
        "Each report has a unique number and verification code. Verification confirms that the platform issued the report. It does not confirm that the estimate is right for your business.",
        "You can delete your reports. A deleted report can no longer be verified.",
        "We may withdraw (revoke) a report if it was issued by mistake or misused. A revoked report shows as no longer valid.",
      ],
    },
    {
      id: "acceptable-use",
      title: "5. Acceptable use",
      paragraphs: ["You agree not to:"],
      bullets: [
        "Use the platform unlawfully or to mislead others, for example by presenting an estimate as an official quotation.",
        "Try to access other users' accounts or reports, or guess report numbers or verification codes.",
        "Bypass access controls or rate limits, scrape the platform, or probe it for weaknesses without our written permission.",
        "Copy, reverse engineer or resell the calculators or their formulas.",
      ],
    },
    {
      id: "ip",
      title: "6. Ownership",
      paragraphs: [
        `The platform, the calculators, their formulas, designs and logos belong to ${brandName} or its licensors. We give you a limited, personal right to use them while your account is active.`,
        "You keep ownership of the data you enter. You allow us to process it to provide the service as described in the Privacy Policy.",
      ],
    },
    {
      id: "availability",
      title: "7. Availability and changes",
      paragraphs: [
        "We try to keep the platform available but do not promise uninterrupted service. We may change, add or remove features, including calculators that are marked as coming soon.",
      ],
    },
    {
      id: "warranty",
      title: "8. No warranty",
      paragraphs: [
        'The platform is provided "as is" and "as available". To the extent the law allows, we give no warranty that it will be error-free or that results will be accurate for your purposes.',
      ],
    },
    {
      id: "liability",
      title: "9. Limit of liability",
      paragraphs: [
        "To the extent the law allows, we are not liable for indirect or consequential losses, loss of profit, or decisions you make relying on an estimate. Our total liability for any claim is limited to the amount, if any, you paid us for the service in the 12 months before the claim.",
      ],
    },
    {
      id: "termination",
      title: "10. Ending your use",
      paragraphs: [
        "You can delete your account at any time from your account settings. We may suspend or end your access if you break these Terms. Sections that by their nature should continue (for example ownership and liability) continue after your account ends.",
      ],
    },
    {
      id: "law",
      title: "11. Governing law",
      paragraphs: [
        `These Terms are governed by the laws of India. The courts at ${COMPANY.courtsCity}, Rajasthan have exclusive jurisdiction, subject to any rights you have under law.`,
      ],
    },
    {
      id: "changes-contact",
      title: "12. Changes and contact",
      paragraphs: [
        "When we change these Terms we publish a new version with its date and ask you to accept it again before you continue.",
        `Questions: ${supportEmail}, ${phone}.`,
      ],
    },
  ],
};
