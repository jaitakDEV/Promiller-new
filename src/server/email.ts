import { Resend } from "resend";
import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

const APP_NAME = "Promiller";
const FROM = `Promiller <${env.FROM_EMAIL}>`;

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Verify your email — ${APP_NAME}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2>Verify your email address</h2>
        <p>Click the button below to verify your email. This link expires in 24 hours.</p>
        <a href="${verifyUrl}" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 16px 0;">
          Verify email
        </a>
        <p style="color: #666; font-size: 14px;">
          If you did not create an account, you can safely ignore this email.
        </p>
        <p style="color: #666; font-size: 12px;">Or copy this link: ${verifyUrl}</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Reset your password — ${APP_NAME}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2>Reset your password</h2>
        <p>Click the button below to set a new password. This link expires in 15 minutes.</p>
        <a href="${resetUrl}" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 16px 0;">
          Reset password
        </a>
        <p style="color: #666; font-size: 14px;">
          If you did not request a password reset, ignore this email. Your password will not change.
        </p>
        <p style="color: #666; font-size: 12px;">Or copy this link: ${resetUrl}</p>
      </div>
    `,
  });
}
