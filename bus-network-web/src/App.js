import React from "react";
import Navbar from "./screens/Navbar/Navbar";
import HeroSection from "./screens/Home/Home";
import InputForm from "./screens/InputForm/InputForm";
import HowItWorks from "./screens/HowItWorks/HowItWorks";
import ContactUs from "./screens/ContactUs/ContactUs";
import Footer from "./screens/Footer/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <InputForm />
      <HowItWorks />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default App;
