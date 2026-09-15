"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/app";
import { LayoutDashboard, Users, User, Settings, Shield } from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Overview", href: ROUTES.admin, icon: LayoutDashboard },
  { label: "Users", href: ROUTES.adminUsers, icon: Users },
  { label: "Profile", href: ROUTES.adminProfile, icon: User },
  { label: "Settings", href: ROUTES.adminSettings, icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "240px",
        flexShrink: 0,
        borderRight: "1px solid #e2e8f0",
        background: "#CFE0F5",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Image src="/mdssc-logo.svg" alt="MDSSC" width={180} height={180} />
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "1rem 0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <p
          style={{
            fontSize: "15px",
            fontWeight: 900,
            color: "#111111",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "0 0.75rem",
            margin: "0 0 6px",
          }}
        >
          Management
        </p>
        {navItems.map((item) => {
          const isActive =
            item.href === ROUTES.admin
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 12px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#06438a" : "#475569",
                background: isActive ? "#fef2f2" : "transparent",
                textDecoration: "none",
                transition: "all 0.15s",
              }}
            >
              <item.icon size={16} />

              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Admin Badge */}
      <div
        style={{
          padding: "1rem 1.25rem",
          borderTop: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "#fef2f2",
            border: "1.5px solid #fecaca",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            flexShrink: 0,
          }}
        >
          <Shield size={16} color="#dc2626" />
        </div>
        <div>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#0f172a",
              margin: 0,
            }}
          >
            Administrator
          </p>
          <p style={{ fontSize: "10px", color: "#94a3b8", margin: 0 }}>
            Full access
          </p>
        </div>
      </div>
    </aside>
  );
}
