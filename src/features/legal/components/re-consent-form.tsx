"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  acceptLegalUpdate,
  declineLegalUpdate,
} from "@/features/legal/actions/accept-consent";

type Doc = { document: string; title: string; href: string; version: string };

export function ReConsentForm({
  documents,
  next,
}: {
  documents: Doc[];
  next?: string;
}) {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function onAccept() {
    setError(null);
    startTransition(async () => {
      const result = await acceptLegalUpdate(next);
      if (result) setError(result.error);
    });
  }

  return (
    <div
      style={{
        maxWidth: "480px",
        margin: "0 auto",
        padding: "2rem",
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: "14px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#0b3a5b",
            margin: 0,
          }}
        >
          We&apos;ve updated our legal terms
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "#475569",
            margin: "8px 0 0",
            lineHeight: 1.6,
          }}
        >
          Please review and accept the following to continue.
        </p>
      </div>

      <ul
        style={{
          margin: 0,
          paddingLeft: "18px",
          fontSize: "14px",
          color: "#334155",
          lineHeight: 1.8,
        }}
      >
        {documents.map((d) => (
          <li key={d.document}>
            <Link
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#0951a5",
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              {d.title}
            </Link>{" "}
            <span style={{ color: "#64748b" }}>(version {d.version})</span>
          </li>
        ))}
      </ul>

      <label
        htmlFor="agree"
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          fontSize: "13px",
          lineHeight: 1.5,
          color: "#334155",
          cursor: "pointer",
        }}
      >
        <input
          id="agree"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          style={{
            marginTop: "3px",
            width: "16px",
            height: "16px",
            flexShrink: 0,
          }}
        />
        <span>I have read and agree to the above.</span>
      </label>

      {error && (
        <p
          role="alert"
          style={{ fontSize: "13px", color: "#dc2626", margin: 0 }}
        >
          {error}
        </p>
      )}

      <Button
        type="button"
        onClick={onAccept}
        disabled={!agreed || isPending}
        style={{
          height: "44px",
          background: "#0951a5",
          color: "#fff",
          fontWeight: 600,
          borderRadius: "10px",
        }}
      >
        {isPending ? "Saving…" : "Accept and continue"}
      </Button>

      <form action={declineLegalUpdate}>
        <Button
          type="submit"
          variant="outline"
          disabled={isPending}
          style={{ height: "44px", width: "100%", borderRadius: "10px" }}
        >
          Decline and sign out
        </Button>
      </form>
    </div>
  );
}
