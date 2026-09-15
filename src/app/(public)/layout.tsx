// import { Navbar } from "@/features/public/components/navbar";
// import { MarqueeBar } from "@/features/public/components/MarqueeBar";

// export default function PublicLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       <MarqueeBar />
//       {/* <Navbar /> */}
//       <main style={{ paddingTop: "80px" }}>{children}</main>
//     </>
//   );
// }

import { Navbar } from "@/features/public/components/navbar";

import { Footer } from "@/features/public/components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "0px" }}>{children}</main>
      <Footer />
    </>
  );
}
