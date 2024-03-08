"use client";
import { monomaniac, play } from "@/app/fonts";
import { SkillSection } from "@/components/global/Skills";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import React, { ReactElement, useEffect, useState } from "react";

export default function StoryPage() {
    return (
        <>
            <div className="relative flex h-[90vh] w-full items-center justify-center">
                <div className="absolute h-[555px] w-full md:h-[800px] lg:right-0 lg:h-full  lg:w-1/2 ">
                    <Spline scene="https://prod.spline.design/jEsawKZEsxEwrEN5/scene.splinecode" />
                </div>
                <div className="absolute left-0 w-full  p-8 md:w-1/2 lg:left-40 lg:w-1/3 lg:p-0">
                    <h1
                        className={`${monomaniac.className} leading-0  mb-6 text-8xl uppercase text-gray-200  lg:text-9xl`}
                    >
                        We Design Worlds
                    </h1>
                    <p className=" w-full text-xl leading-6  text-gray-300 lg:w-3/4">
                        In a world full of challenges, it calls for visionaries
                        — individuals who don't just recognize what is essential
                        today but are also dedicated to sculpting the solutions
                        of tomorrow.
                    </p>
                </div>
            </div>

            <div className="flex h-auto flex-col items-center justify-center py-20">
                <div className="flex w-full flex-col  items-center  justify-between gap-12 px-6 lg:px-40">
                    <p className="w-full text-3xl leading-7  text-gray-300 lg:w-2/3">
                        We're on a path less traveled, demanding resilience and
                        an unwavering commitment to innovation.
                        <br />
                        <br />
                    </p>
                    <p className=" w-full text-lg leading-6  text-gray-400 lg:w-2/3">
                        The world is evolving rapidly, and it's crucial to be
                        prepared for the future. This includes everything from
                        how we develop our brands and conduct business, to how
                        we cultivate a mindset of continuous growth and
                        intentional creation. Let us help you navigate these
                        changes and build a future that's ready for what comes
                        next.
                        <br />
                        <br />
                        Our mission is to empower creators through a diverse set
                        of intuitive services. We equip you with the tools and
                        insights necessary to make an impact in the new world.
                        From immersive 3D animations that tell your story to
                        dynamic web solutions that drive engagement, our
                        expertise is your advantage. At Reality Designers, we
                        believe in the power of transformation—transforming
                        ideas into impact, visions into reality.
                    </p>
                </div>
            </div>

            <div className="w-full ">
                <ServiceSection />
            </div>
            <div className="flex h-auto flex-col items-center justify-center py-32">
                <div className="flex w-full flex-col items-center justify-between  gap-12 px-6 lg:flex-row lg:px-40">
                    <h1
                        className={`${monomaniac.className} w-full pr-20 text-6xl uppercase text-gray-200 lg:w-1/2`}
                    >
                        PREPARED FOR THE NEW DIGITAL SOCIETY
                    </h1>
                    <p className=" w-full text-lg  text-gray-400 lg:w-1/2">
                        At Reality Designers, we're more than a service
                        provider; we're your partner in the digital journey. By
                        understanding your unique challenges and aspirations, we
                        tailor our approach to align with your goals. Together,
                        we can create a digital ecosystem that not only meets
                        the demands of today but is also ready for the
                        opportunities of tomorrow.
                    </p>
                </div>
            </div>
            <div>
                <SkillSection />
            </div>
            <div>
                <VideoSection />
            </div>
        </>
    );
}
const VideoSection = () => {
    return (
        <div>
            <div className="flex w-full items-center justify-center">
                <h2
                    className={`${monomaniac.className} w-3/4 text-center text-5xl uppercase text-gray-200 md:text-7xl lg:w-1/2`}
                >
                    The Next Generation Of Integrated Design
                </h2>
            </div>
            <div className="grid h-screen gap-6 p-6 lg:grid-cols-3 lg:p-20">
                <div className="flex">
                    <VideoComponent />
                </div>
                <div className="flex">
                    <VideoComponent />
                </div>
                <div className="flex">
                    <VideoComponent />
                </div>
            </div>
        </div>
    );
};

const VideoComponent = () => {
    return <div className="h-full w-full bg-gray-600/25 p-4" />;
};

const Services = [
    {
        label: "3D Animation",
        icon: "lock",
        desc: "Craft compelling narratives with our bespoke 3D animations designed to transport your audience to another dimension of storytelling, ideal for educational content, brand stories, and interactive experiences.",
    },
    {
        label: "Web Development",
        icon: "lock",
        desc: "Build the digital future with our avant-garde web development services, utilizing the latest frameworks and technologies to create fast, responsive, and intuitive websites that stand the test of time.",
    },
    {
        label: "Brand Identity & Design",
        icon: "lock",
        desc: "Forge a visual identity that echoes your brand’s essence. From logos to color palettes, our design services create a cohesive and memorable brand identity that differentiates you in the marketplace.",
    },
    {
        label: "Headless CMS",
        icon: "lock",
        desc: "Elevate your user engagement through tailor-made interactive experiences. Our designs captivate and intrigue, offering novel ways for your audience to connect with your brand.",
    },
    {
        label: "Conscious Copywriting",
        icon: "lock",
        desc: "Our copywriting goes beyond words, weaving in your brand's purpose and vision into every line, ensuring your message resonates with clarity and impact, and drives conscious engagement.",
    },
    {
        label: "Accessibility and UX Design",
        icon: "lock",
        desc: "Craft user experiences where accessibility meets elegance. Our UX design ensures your digital assets are intuitive and inclusive, catering to all audiences with ease and sophistication.",
    },
    {
        label: "VR / AR Environments",
        icon: "lock",
        desc: "Step into the future with VR environments that defy convention. We create immersive worlds that enhance your brand’s narrative, inviting users to experience your story in full 360 degrees.",
    },

    {
        label: "Strategic Brand Consultation",
        icon: "lock",
        desc: "Navigate the ever-evolving brand landscape with our strategic consultation services. We provide insights and action plans that align with your long-term vision and market trends.",
    },
    {
        label: "Digital Storytelling",
        icon: "lock",
        desc: "Tell your story in a way that captivates and endures. Our digital storytelling techniques combine narrative prowess with multimedia elements to leave a lasting impression.",
    },
];

const ServiceSection = () => {
    const [activeService, setActiveService] = useState<string | null>(null);
    const [isDetailVisible, setIsDetailVisible] = useState(false);

    useEffect(() => {
        setIsDetailVisible(!!activeService);
    }, [activeService]);

    const handleServiceClick = (label: string) => {
        setActiveService(activeService !== label ? label : null);
    };

    return (
        <div className="flex w-full flex-row flex-wrap px-4 py-10 text-white md:px-40 ">
            <div className="flex w-full flex-col p-12">
                <h2
                    className={`${monomaniac.className} mb-4 text-3xl uppercase `}
                >
                    Our Services
                </h2>
                <p className="mb-4 text-lg leading-6 text-gray-400">
                    Each service we offer is a building block towards crafting a
                    resilient and adaptable digital identity.
                </p>
            </div>
            <div
                className={`transition-all duration-200 ease-in-out ${
                    isDetailVisible
                        ? "w-full lg:w-1/6 lg:grid-cols-1"
                        : "w-full lg:grid-cols-4"
                }`}
            >
                <ul
                    className={`grid ${
                        isDetailVisible
                            ? "grid-cols-2 lg:grid-cols-1"
                            : "grid-cols-2 md:grid-cols-4"
                    } gap-1`}
                >
                    {Services.map(({ label, icon, desc }) => (
                        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                        <li
                            key={label}
                            className={`w-full cursor-pointer border border-gray-600/50 p-4 ${
                                activeService === label
                                    ? "bg-gray-600/25"
                                    : "bg-black hover:bg-gray-600/25"
                            } flex items-center transition duration-200 ease-in-out`}
                            onClick={() => handleServiceClick(label)}
                        >
                            {getIcon(icon)}
                            <div
                                className={`${monomaniac.className} ml-2 text-xl uppercase leading-none`}
                            >
                                {label}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {isDetailVisible && (
                <div
                    className="lg:-16 ml-0 mt-4 h-[80vh] flex-grow overflow-hidden border border-gray-600/25 p-8 transition-opacity duration-200 ease-in-out lg:ml-4 lg:mt-0 lg:w-3/4"
                    style={{
                        maxHeight: isDetailVisible ? "100%" : "0",
                        opacity: isDetailVisible ? 1 : 0,
                    }}
                >
                    <h2
                        className={`${monomaniac.className} mb-4 text-4xl uppercase leading-none text-gray-200 lg:text-5xl`}
                    >
                        {activeService}
                    </h2>
                    <p className="text-xl text-gray-400">
                        {
                            Services.find(
                                (service) => service.label === activeService,
                            )?.desc
                        }
                    </p>
                </div>
            )}
        </div>
    );
};
type IconName = "lock";

const icons: Record<IconName, ReactElement> = {
    lock: (
        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
        <svg
            width="20"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1 11C1 9.11438 1 8.17157 1.58579 7.58579C2.17157 7 3.11438 7 5 7H13C14.8856 7 15.8284 7 16.4142 7.58579C17 8.17157 17 9.11438 17 11V13C17 15.8284 17 17.2426 16.1213 18.1213C15.2426 19 13.8284 19 11 19H7C4.17157 19 2.75736 19 1.87868 18.1213C1 17.2426 1 15.8284 1 13V11Z"
                stroke="#444"
                strokeWidth="2"
            />
            <path
                d="M13 6V5C13 2.79086 11.2091 1 9 1V1C6.79086 1 5 2.79086 5 5V6"
                stroke="#444"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <circle cx="9" cy="13" r="2" fill="#444" />
        </svg>
    ),
};

const getIcon = (name: string): ReactElement => {
    if (name in icons) {
        return icons[name as IconName];
    }
    return <svg />;
};
