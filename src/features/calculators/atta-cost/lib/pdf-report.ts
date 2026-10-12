import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type {
  CostingResult,
  CostInputs,
} from "@/features/calculators/atta-cost/lib/calculator";
import type { PackRow } from "@/features/calculators/atta-cost/steps/step-5-results-process";

const INR = (n: number) =>
  "Rs " +
  n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const NUM = (n: number, d = 2) =>
  n.toLocaleString("en-IN", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function fitImage(img: HTMLImageElement, maxW: number, maxH: number) {
  const ratio = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight);
  return { w: img.naturalWidth * ratio, h: img.naturalHeight * ratio };
}

function imgToDataUrl(img: HTMLImageElement): string {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(img, 0, 0);
  return canvas.toDataURL("image/png");
}

// Some jsPDF builds don't expose setCharSpace — guard so a missing method
// never breaks the whole report.
function setCharSpaceSafe(doc: jsPDF, value: number) {
  const anyDoc = doc as unknown as { setCharSpace?: (v: number) => void };
  if (typeof anyDoc.setCharSpace === "function") anyDoc.setCharSpace(value);
}

// ---- Single professional accent palette ----
const ACCENT = [30, 64, 92] as [number, number, number]; // deep slate blue
const ACCENT_SOFT = [230, 236, 241] as [number, number, number];
const ACCENT_LIGHTER = [244, 247, 250] as [number, number, number]; // zebra rows
const TEXT_DARK = [51, 51, 51] as [number, number, number];
const TEXT_MUTED = [120, 120, 120] as [number, number, number];
const LINE = [222, 222, 222] as [number, number, number];
const LINE_SOFT = [235, 235, 235] as [number, number, number];
const WHITE: [number, number, number] = [255, 255, 255];
const GOLD = [178, 140, 60] as [number, number, number];

export interface ReportMeta {
  reportNo?: string;
  date?: string;
  preparedFor?: string;
  locale?: "en" | "hi";
}

export async function generateCostingPdf(
  inputs: CostInputs,
  costing: CostingResult,
  packRows: PackRow[],
  recommended: PackRow | undefined,
  meta: ReportMeta = {},
) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 40;
  let cursorY = 0;

  const reportNo =
    meta.reportNo ?? `AC-${new Date().getTime().toString().slice(-8)}`;
  const dateStr =
    meta.date ??
    new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  // ---------- Load logos ----------
  let leftLogo: { url: string; w: number; h: number } | null = null;
  let centerLogo: { url: string; w: number; h: number } | null = null;
  let rightLogo: { url: string; w: number; h: number } | null = null;
  try {
    const img = await loadImage("/logo-choyal.png");
    const size = fitImage(img, 118, 50);
    leftLogo = { url: imgToDataUrl(img), ...size };
  } catch {
    leftLogo = null;
  }
  try {
    const img = await loadImage("/logo-promiller.png");
    const size = fitImage(img, 68, 32);
    centerLogo = { url: imgToDataUrl(img), ...size };
  } catch {
    centerLogo = null;
  }
  try {
    const img = await loadImage("/logo-rschoyal.png");
    const size = fitImage(img, 92, 40);
    rightLogo = { url: imgToDataUrl(img), ...size };
  } catch {
    rightLogo = null;
  }

  // ================= OUTER FRAME + CORNER ACCENTS (drawn per page, below) =================
  function drawPageFrame() {
    // hairline outer border
    doc.setDrawColor(...LINE_SOFT);
    doc.setLineWidth(0.75);
    doc.rect(18, 18, pageW - 36, pageH - 36);

    // premium gold corner ticks — certificate-style accent at all 4 corners
    const tick = 14;
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(1.1);
    // top-left
    doc.line(18, 18, 18 + tick, 18);
    doc.line(18, 18, 18, 18 + tick);
    // top-right
    doc.line(pageW - 18 - tick, 18, pageW - 18, 18);
    doc.line(pageW - 18, 18, pageW - 18, 18 + tick);
    // bottom-left
    doc.line(18, pageH - 18 - tick, 18, pageH - 18);
    doc.line(18, pageH - 18, 18 + tick, pageH - 18);
    // bottom-right
    doc.line(pageW - 18 - tick, pageH - 18, pageW - 18, pageH - 18);
    doc.line(pageW - 18, pageH - 18 - tick, pageW - 18, pageH - 18);
  }
  drawPageFrame();

  // ================= HEADER (company letterhead style) =================
  // A center logo now sits above the letterhead text block, flanked by the
  // two brand logos — classic three-mark letterhead layout. LOGO_OFFSET
  // reserves vertical space for it whether or not it actually loads, so
  // the rest of the header never shifts/jumps if the file is missing.
  const LOGO_OFFSET = 36;
  const headerH = 168;
  doc.setFillColor(...WHITE);
  doc.rect(0, 0, pageW, headerH, "F");

  // top accent bar
  doc.setFillColor(...ACCENT);
  doc.rect(0, 0, pageW, 4, "F");
  doc.setFillColor(...GOLD);
  doc.rect(0, 4, pageW, 1, "F");

  const contentTop = 18;
  const textTop = contentTop + LOGO_OFFSET;
  const blockCenterX = pageW / 2;

  // ---- Center logo (new) — sits above the company name ----
  if (centerLogo) {
    doc.addImage(
      centerLogo.url,
      "PNG",
      blockCenterX - centerLogo.w / 2,
      contentTop,
      centerLogo.w,
      centerLogo.h,
    );
  }

  // ---- Flanking logos, vertically centered against the text block ----
  if (leftLogo) {
    doc.addImage(
      leftLogo.url,
      "PNG",
      marginX,
      contentTop + 16,
      leftLogo.w,
      leftLogo.h,
    );
  }
  if (rightLogo) {
    doc.addImage(
      rightLogo.url,
      "PNG",
      pageW - marginX - rightLogo.w,
      contentTop + 20,
      rightLogo.w,
      rightLogo.h,
    );
  }

  // ---- Company letterhead block (centered, between the two logos) ----
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...GOLD); // distinct company-name color, separate from report accent
  setCharSpaceSafe(doc, 1.1); // subtle letter-spacing — premium letterhead feel
  doc.text("CHOYAL GRINDING SOLUTIONS", blockCenterX, textTop + 14, {
    align: "center",
  });
  setCharSpaceSafe(doc, 0);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.8);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(
    "Unit - 2, Shri Vishvakarma (Emery Stones) Industries Pvt. Ltd.,",
    blockCenterX,
    textTop + 28,
    { align: "center" },
  );
  doc.text(
    "Opposite Jio-bp, Arjunpura Khalsa, Rajasthan 305206",
    blockCenterX,
    textTop + 39,
    { align: "center" },
  );

  // contact line — phone + website, separated by a bullet
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.8);
  doc.setTextColor(...ACCENT);
  const phoneText = "Ph: 9166336677";
  const siteText = "www.rschoyalgroup.com";
  const bulletGap = 14;
  const phoneW = doc.getTextWidth(phoneText);
  const siteW = doc.getTextWidth(siteText);
  const totalW = phoneW + bulletGap + siteW;
  const startX = blockCenterX - totalW / 2;

  doc.text(phoneText, startX, textTop + 52);
  doc.setTextColor(...GOLD);
  doc.text("•", startX + phoneW + bulletGap / 2, textTop + 52, {
    align: "center",
  });
  doc.setTextColor(...ACCENT);
  doc.text(siteText, startX + phoneW + bulletGap, textTop + 52);

  // ---- divider between letterhead and report title ----
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.5);
  doc.line(marginX, textTop + 64, pageW - marginX, textTop + 64);

  // ---- Report title ----
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.setTextColor(...ACCENT);
  setCharSpaceSafe(doc, 0.6);
  doc.text("Atta Costing & Pricing Report", pageW / 2, textTop + 82, {
    align: "center",
  });
  setCharSpaceSafe(doc, 0);

  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.75);
  doc.line(pageW / 2 - 26, textTop + 89, pageW / 2 + 26, textTop + 89);

  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.75);
  doc.line(marginX, headerH, pageW - marginX, headerH);

  cursorY = headerH + 24;

  // ================= META ROW =================
  doc.setFillColor(...ACCENT_LIGHTER);
  doc.setDrawColor(...LINE);
  doc.roundedRect(marginX, cursorY, pageW - marginX * 2, 40, 4, 4, "FD");

  const colW = (pageW - marginX * 2) / 3;
  const metaItems: [string, string][] = [
    ["REPORT NO.", reportNo],
    ["DATE", dateStr],
    ["PREPARED FOR", meta.preparedFor ?? "Management"],
  ];
  metaItems.forEach(([label, val], i) => {
    const x = marginX + 16 + i * colW;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...TEXT_MUTED);
    doc.text(label, x, cursorY + 15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...ACCENT);
    doc.text(val, x, cursorY + 30);
    if (i < 2) {
      doc.setDrawColor(...LINE);
      doc.setLineWidth(0.5);
      doc.line(
        marginX + (i + 1) * colW,
        cursorY + 8,
        marginX + (i + 1) * colW,
        cursorY + 32,
      );
    }
  });

  cursorY += 58;

  // ---- section title with numbered badge ----
  let sectionCount = 0;
  function sectionTitle(text: string) {
    sectionCount += 1;
    const badgeR = 9;
    const badgeX = marginX + badgeR;
    const badgeY = cursorY - 4;

    doc.setFillColor(...ACCENT);
    doc.circle(badgeX, badgeY, badgeR, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...WHITE);
    doc.text(String(sectionCount), badgeX, badgeY + 3, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(...ACCENT);
    doc.text(text, marginX + badgeR * 2 + 8, cursorY);

    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.5);
    doc.line(
      marginX + badgeR * 2 + 8 + doc.getTextWidth(text) + 10,
      cursorY - 3,
      pageW - marginX,
      cursorY - 3,
    );

    cursorY += 18;
  }

  const zebra = { fillColor: ACCENT_LIGHTER };

  // ================= SECTION 1: PROCESS INPUTS =================
  sectionTitle("Wheat Process & Yield Inputs");

  autoTable(doc, {
    startY: cursorY,
    theme: "grid",
    margin: { left: marginX, right: marginX },
    alternateRowStyles: zebra,
    styles: {
      font: "helvetica",
      fontSize: 9,
      cellPadding: 5.5,
      textColor: TEXT_DARK,
      lineColor: LINE_SOFT,
      lineWidth: 0.4,
    },
    headStyles: {
      fillColor: ACCENT,
      textColor: WHITE,
      fontStyle: "bold",
      fontSize: 8.5,
    },
    columnStyles: {
      1: { halign: "right" },
      3: { halign: "right" },
    },
    head: [["Parameter", "Value", "Parameter", "Value"]],
    body: [
      [
        "Wheat Price",
        `${INR(inputs.wheatPrice)}/kg`,
        "Unloading",
        `${INR(inputs.unloading)}/kg`,
      ],
      [
        "Milling Charges",
        `${INR(inputs.millingCharges)}/kg`,
        "Loading of Atta",
        `${INR(inputs.loadingOfAtta)}/kg`,
      ],
      [
        "Cleaning Loss",
        `${NUM(inputs.cleaningLossPct)}%`,
        "Grinding Loss",
        `${NUM(inputs.grindingLossPct)}%`,
      ],
      [
        "Process Loss",
        `${NUM(inputs.processLossPct)}%`,
        "Moisture Gain",
        `${NUM(inputs.moistureGainPct)}%`,
      ],
      [
        "Bran Refraction",
        `${NUM(inputs.branRefractionPct)}%`,
        "Feed Refraction",
        `${NUM(inputs.feedRefractionPct)}%`,
      ],
      [
        "Bran Sale Price",
        `${INR(inputs.branSalePrice)}/kg`,
        "Animal Feed Price",
        `${INR(inputs.feedSalePrice)}/kg`,
      ],
      [
        "Bran Packing Material",
        `${INR(inputs.branPackingMaterial)}/kg`,
        "Mill Margin",
        `${NUM(inputs.millMarginPct, 1)}%`,
      ],
    ],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cursorY = (doc as any).lastAutoTable.finalY + 24;

  // ================= SECTION 2: YIELD SUMMARY (fixed layout) =================
  const lossSum =
    inputs.cleaningLossPct +
    inputs.grindingLossPct +
    inputs.branRefractionPct +
    inputs.feedRefractionPct +
    inputs.processLossPct;

  sectionTitle("Yield Summary");

  const yieldBoxH = 64;
  doc.setFillColor(...ACCENT_SOFT);
  doc.setDrawColor(...ACCENT);
  doc.setLineWidth(0.6);
  doc.roundedRect(marginX, cursorY, pageW - marginX * 2, yieldBoxH, 4, 4, "FD");

  // Row 1: the formula, small and muted, auto-fitted
  const formulaText = `100 - ${NUM(lossSum)}%  +  ${NUM(inputs.moistureGainPct)}%  =  ${NUM(costing.yieldPct)}%`;
  const maxFormulaWidth = pageW - marginX * 2 - 32;
  let formulaFontSize = 12;
  doc.setFont("courier", "bold");
  doc.setFontSize(formulaFontSize);
  while (
    doc.getTextWidth(formulaText) > maxFormulaWidth &&
    formulaFontSize > 7
  ) {
    formulaFontSize -= 0.5;
    doc.setFontSize(formulaFontSize);
  }
  doc.setTextColor(...TEXT_DARK);
  doc.text(formulaText, pageW / 2, cursorY + 24, { align: "center" });

  // thin divider between formula and result
  doc.setDrawColor(...ACCENT);
  doc.setLineWidth(0.4);
  doc.line(pageW / 2 - 60, cursorY + 32, pageW / 2 + 60, cursorY + 32);

  // Row 2: the final yield, large and bold
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...ACCENT);
  doc.text(`${NUM(costing.yieldPct)}%  Atta Yield`, pageW / 2, cursorY + 52, {
    align: "center",
  });

  cursorY += yieldBoxH + 24;

  // ================= SECTION 3: COST BREAKDOWN =================
  if (cursorY > pageH - 240) {
    doc.addPage();
    drawPageFrame();
    cursorY = 40;
  }

  sectionTitle("Cost Breakdown (per kg)");

  const boldRow = { fontStyle: "bold" as const };
  const accentRow = { fontStyle: "bold" as const, textColor: ACCENT };

  const costBody = [
    ["Wheat Cost", INR(costing.wheatCostPerKg)],
    ["Unloading", INR(costing.unloadingPerKg)],
    ["Milling Charges", INR(costing.millingChargesPerKg)],
    ["Loading", INR(costing.loadingPerKg)],
    [
      { content: "Product Base Cost", styles: boldRow },
      { content: INR(costing.productCostBasePerKg), styles: boldRow },
    ],
    ["Less: Bran Income", `- ${INR(costing.branIncomePerKg)}`],
    ["Less: Feed Income", `- ${INR(costing.feedIncomePerKg)}`],
    ["Less: Other Income", `- ${INR(costing.otherIncomePerKg)}`],
    [
      { content: "Cost at Mill Gate (per kg wheat)", styles: boldRow },
      { content: INR(costing.costAtMillGatePerKgWheat), styles: boldRow },
    ],
    [
      { content: "Cost at Mill Gate (per kg atta)", styles: accentRow },
      { content: INR(costing.costAtMillGatePerKgAtta), styles: accentRow },
    ],
    ["Mill Margin", INR(costing.millMarginPerKg)],
    [
      { content: "MILL SALE PRICE", styles: { ...accentRow, fontSize: 10.5 } },
      {
        content: INR(costing.millSalePricePerKg),
        styles: { ...accentRow, fontSize: 10.5 },
      },
    ],
  ];

  autoTable(doc, {
    startY: cursorY,
    theme: "grid",
    margin: { left: marginX, right: marginX },
    alternateRowStyles: zebra,
    styles: {
      font: "helvetica",
      fontSize: 9.5,
      cellPadding: 5.5,
      textColor: TEXT_DARK,
      lineColor: LINE_SOFT,
      lineWidth: 0.4,
    },
    headStyles: {
      fillColor: ACCENT,
      textColor: WHITE,
      fontStyle: "bold",
      fontSize: 9,
    },
    columnStyles: {
      1: { halign: "right", cellWidth: 140 },
    },
    head: [["Cost Component", "Amount"]],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: costBody as any,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cursorY = (doc as any).lastAutoTable.finalY + 24;

  // ================= SECTION 4: PACKING & PRICING =================
  if (cursorY > pageH - 240) {
    doc.addPage();
    drawPageFrame();
    cursorY = 40;
  }

  sectionTitle("Pack-wise Final Pricing");

  autoTable(doc, {
    startY: cursorY,
    theme: "grid",
    margin: { left: marginX, right: marginX },
    alternateRowStyles: zebra,
    styles: {
      font: "helvetica",
      fontSize: 9,
      cellPadding: 5.5,
      textColor: TEXT_DARK,
      lineColor: LINE_SOFT,
      lineWidth: 0.4,
      halign: "right",
    },
    headStyles: {
      fillColor: ACCENT,
      textColor: WHITE,
      fontStyle: "bold",
      fontSize: 8.5,
      halign: "right",
    },
    columnStyles: {
      0: { halign: "left", fontStyle: "bold" },
    },
    head: [["Pack Size", "Material", "Before Tax", "GST", "Ex-Factory", "MRP"]],
    body: packRows.map((p) => {
      const isRec = p.key === recommended?.key;
      const style = isRec
        ? {
            fillColor: ACCENT_SOFT as [number, number, number],
            fontStyle: "bold" as const,
          }
        : {};
      return [
        { content: p.label, styles: style },
        { content: INR(p.material), styles: style },
        { content: INR(p.costBeforeTax), styles: style },
        { content: INR(p.gst), styles: style },
        { content: INR(p.exFactory), styles: style },
        {
          content: INR(p.marketPrice),
          styles: { ...style, textColor: ACCENT, fontStyle: "bold" as const },
        },
      ];
    }),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cursorY = (doc as any).lastAutoTable.finalY + 26;

  // ================= RECOMMENDED PRICE CALLOUT =================
  if (cursorY > pageH - 150) {
    doc.addPage();
    drawPageFrame();
    cursorY = 40;
  }

  const boxH = 72;
  doc.setFillColor(...LINE_SOFT);
  doc.roundedRect(
    marginX + 2,
    cursorY + 2,
    pageW - marginX * 2,
    boxH,
    6,
    6,
    "F",
  );

  doc.setFillColor(...ACCENT_SOFT);
  doc.setDrawColor(...ACCENT);
  doc.setLineWidth(0.8);
  doc.roundedRect(marginX, cursorY, pageW - marginX * 2, boxH, 6, 6, "FD");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(
    `RECOMMENDED RETAIL PRICE  —  ${recommended?.label ?? ""}`,
    pageW / 2,
    cursorY + 22,
    { align: "center" },
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(...ACCENT);
  doc.text(INR(recommended?.marketPrice ?? 0), pageW / 2, cursorY + 54, {
    align: "center",
  });

  cursorY += boxH + 22;

  // ================= FOOTER (every page) =================
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const footY = pageH - 50;

    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.5);
    doc.line(marginX, footY, pageW - marginX, footY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...TEXT_MUTED);
    doc.text(
      "This is a system-generated internal costing estimate. Figures are indicative and subject to market fluctuation in wheat, packing material and freight.",
      marginX,
      footY + 15,
      { maxWidth: pageW - marginX * 2 - 90 },
    );
    doc.text(`Page ${i} of ${pageCount}`, pageW - marginX, footY + 15, {
      align: "right",
    });

    if (i === pageCount) {
      const sigY = footY - 24;
      doc.setDrawColor(...TEXT_MUTED);
      doc.setLineWidth(0.5);
      doc.line(pageW - marginX - 150, sigY, pageW - marginX, sigY);
      doc.setFontSize(8);
      doc.setTextColor(...TEXT_MUTED);
      doc.text("Authorised Signatory", pageW - marginX, sigY + 12, {
        align: "right",
      });
    }
  }

  doc.save(`Costing-Report-${reportNo}.pdf`);
}
