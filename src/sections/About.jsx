import React, { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import Button from "../components/Button.jsx";

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("bhabishya.k.shrestha@gmail.com");

    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  const [arcsData, setArcsData] = useState([]);

  useEffect(() => {
    const N = 30;
    const arcs = Array.from({ length: N }).map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: ["red", "green", "blue", "yellow"][Math.floor(Math.random() * 4)],
    }));
    setArcsData(arcs);
  }, []);

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src="assets/grid1.png"
              alt="grid-1"
              className="w-full sm:h-[276px] h-fit object-contain"
            />

            <div>
              <p className="grid-headtext">About Me</p>
              <p className="grid-subtext">
                I am a graduate student in Computer Engineering student with
                multiple software engineering internships, I've honed my skills
                in front-end and mobile development, focusing on creating
                accessible and dynamic user interfaces.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src="assets/grid2.png"
              alt="grid-2"
              className="w-full sm:h-[276px] h-fit object-contain"
            />

            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I specialize in JavaScript/TypeScript with a focus on React and
                Jetpack Compose ecosystems.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[426px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.jpg"
                arcsData={arcsData}
                arcColor="color"
                arcStroke={0.5}
                arcAltitude={0.2}
                arcDashLength={0.5}
                arcDashGap={0.5}
                arcDashAnimateTime={1000}
                showAtmosphere={true}
                atmosphereAltitude={0.15}
                labelsData={[
                  {
                    lat: 32,
                    lng: -96,
                    text: "I'm here!",
                    color: "white",
                    size: 50,
                  },
                ]}
              />
            </div>
            <div>
              <p className="grid-headtext">I am based in Texas</p>
              <p className="grid-subtext">
                I am currently looking for full-time opportunities and can work
                on-site and remote within the U.S.
              </p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <img
              src="assets/grid3.png"
              alt="grid-3"
              className="w-full sm:h-[266px] h-fit object-contain"
            />

            <div>
              <p className="grid-headtext">Why Coding?</p>
              <p className="grid-subtext">
                I love learning new technologies and have a strong sense of
                responsibility to get things done properly. For me, coding isn't
                just a hobby, it's a passion.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[176px] sm:h-[276px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <div className="copy-container" onClick={handleCopy}>
                <img
                  src={hasCopied ? "assets/tick.svg" : "assets/copy.svg"}
                  alt="copy"
                />
                <p className="lg:text-xl md:text-l font-medium text-gray_gradient text-white">
                  bhabishya.k.shrestha@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
