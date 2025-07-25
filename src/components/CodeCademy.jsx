import { curve, heroBackgroundNew, image3 } from "../assets";
import Section from "./Section";
import { BackgroundCircles, Gradient } from "./design/Hero";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const parallaxRef = useRef(null);
  const navigate = useNavigate();
  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="ByteLearn"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="mb-6 h1">
            Otkrijte mogućnosti {` `}
            <span className="relative inline-block">
              ByteLearn-a{" "}
              <img
                src={curve}
                className="absolute left-0 w-full top-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="max-w-3xl mx-auto mb-6 body-1 text-n-2 lg:mb-8">
            Započni svoje programersko putovanje uz platformu koja učenje čini
            jednostavnim i zanimljivim.
          </p>
          <div className="flex items-center justify-center sm:hidden">
            <div className="flex flex-col space-y-4 ">
              <button
                className="px-6 py-2 text-white border border-purple-600 rounded-md bg-opacity-90"
                onClick={() => navigate("/login")}
              >
                Prijavi se
              </button>
              <button
                className="px-6 py-2 text-white border border-purple-600 rounded-md g-opacity-90 "
                onClick={() => navigate("/register")}
              >
                Registruj se
              </button>
            </div>
          </div>
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <img
                  src={image3}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[13%]"
                  width={1024}
                  height={490}
                  alt="AI"
                />
                <ScrollParallax isAbsolutelyPositioned>
                  {/* ovo je za onaj deo koji prelazi preko slike (ne ptreba mi) */}
                  {/* <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                    {heroIcons.map((icon, index) => (
                      <li className="p-5" key={index}>
                        <img src={icon} width={24} height={25} alt={icon} />
                      </li>
                    ))}
                  </ul> */}
                </ScrollParallax>
              </div>
            </div>
            <Gradient />
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={heroBackgroundNew}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>
          <BackgroundCircles />
        </div>
      </div>
    </Section>
  );
}

export default Hero;
