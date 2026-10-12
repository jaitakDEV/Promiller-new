import Navbar from "@/features/public/components/navbar";
import Footer from "@/features/public/components/footer";

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
