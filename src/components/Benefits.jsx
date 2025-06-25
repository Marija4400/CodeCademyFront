import { benefits } from "../constants";
import Section from "./Section";
import Heading from "./Heading";
import { GradientLight } from "./design/Benefits";
const Benefits = () => {
  return (
    <Section id="content">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Uči lakše uz ByteLearn aplikaciju"
        />

        <div className="flex flex-wrap gap-10 mb-10">
          {benefits.map((item) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none border border-purple-600 rounded-xl">
                <h5 className="mb-5 h5">{item.title}</h5>
                <p className="mb-6 body-2 text-n-3">{item.text}</p>
                <div className="flex items-center mt-auto">
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  />
                </div>
              </div>
              {item.light && <GradientLight />}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
