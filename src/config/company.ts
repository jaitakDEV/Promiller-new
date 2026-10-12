/** Placeholder marker. Must not appear on the live site (checked in task J-02). */
export const tbc = (what: string) => `[TO BE CONFIRMED: ${what}]`;

export const COMPANY = {
  brandName: "Choyal Grinding Solutions",
  legalName: tbc("legal name of the company that operates this platform"),
  address:
    "Unit - 2, Shri Vishvakarma (Emery Stones) Industries Pvt. Ltd., Opposite Jio-bp, Arjunpura Khalsa, Rajasthan 305206",
  phone: "9166336677",
  website: "www.rschoyalgroup.com",
  supportEmail: tbc("support email address"),
  grievance: {
    officerName: tbc("name and designation of the grievance officer"),
    email: tbc("grievance email address"),
    responseTime: tbc("response time, for example within 15 days"),
  },
  courtsCity: tbc("city whose courts have jurisdiction"),
  retention: {
    consentRecords: tbc("retention period for consent records"),
    securityLogs: tbc("retention period for security logs"),
  },
} as const;
