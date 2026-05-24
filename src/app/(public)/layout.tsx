import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import InfoBar from "@/components/InfoBar";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InfoBar />
      <Navbar />
      <CartDrawer />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
