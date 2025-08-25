import { Header } from "@/components/student/header";
import { Footer } from "@/components/student/footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <section>{children}</section>
      <Footer />
    </>
  );
}
