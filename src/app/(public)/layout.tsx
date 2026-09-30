// import { Navbar } from "@/features/public/components/Navbar";
import Footer from "@/features/public/components/fotter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Navbar /> */}
      <main style={{ paddingTop: "0px" }}>{children}</main>
      <Footer />
    </>
  );
}
