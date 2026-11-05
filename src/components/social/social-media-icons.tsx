"use client";

import { useInView } from "motion/react";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { SiGithub, SiInstagram, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { config } from "@/data/config";
import Link from "next/link";

interface SocialButton {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const BUTTONS: SocialButton[] = [
  config.social.github && {
    name: "Github",
    href: config.social.github,
    icon: <SiGithub size={"24"} color={"#fff"} />,
  },
  config.social.linkedin && {
    name: "LinkedIn",
    href: config.social.linkedin,
    icon: <FaLinkedin size={"24"} color={"#fff"} />,
  },
  config.social.twitter && {
    name: "Twitter",
    href: config.social.twitter,
    icon: <SiX size={"24"} color={"#fff"} />,
  },
  config.social.instagram && {
    name: "Instagram",
    href: config.social.instagram,
    icon: <SiInstagram size={"24"} color={"#fff"} />,
  },
].filter(Boolean) as SocialButton[];

const SocialMediaButtons = () => {
  const ref = useRef<HTMLDivElement>(null);
  const show = useInView(ref, { once: true });
  return (
    <div ref={ref} className="z-10">
      {show &&
        BUTTONS.map((button) => (
          <Link href={button.href} key={button.name} target="_blank">
            <Button variant={"ghost"}>{button.icon}</Button>
          </Link>
        ))}
    </div>
  );
};

export default SocialMediaButtons;
