import { useEffect } from "react";
import Loader from "@/components/Loader/Loader";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Projects from "@/components/Projects/Projects";
import Certifications from "@/components/Certifications/Certifications";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Chatbot from "@/components/Chatbot/Chatbot";

const Index = () => {
  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll(".rv:not(.in)").forEach((el) => {
        if ((el as HTMLElement).getBoundingClientRect().top < window.innerHeight - 55) {
          el.classList.add("in");
        }
      });
    };
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("load", reveal);
    return () => {
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("load", reveal);
    };
  }, []);

  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
};

export default Index;
