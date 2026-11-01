import type { Experience } from "./experience";

export const leadership: Experience[] = [
  {
    start: "Spring 2022",
    end: "Spring 2024",
    role: "Vice President",
    company: "Tau Beta Pi (Xi Chapter)",
    description: [
      "Selected among the top eighth of the junior class and major department (ECS) for acceptance into the engineering honor society.",
      "Led a board of 5 officers to organize and run professional development events, managing the chapter budget and boosting engagement among 40+ active members.",
    ],
    skills: ["Leadership", "Budgeting", "Event Planning"],
    link: "https://www.tbp.org/home.cfm",
  },
  {
    start: "Spring 2022",
    end: "Spring 2023",
    role: "Technical Director",
    company: "IEEE at UTD",
    description: [
      'Established the organizational structure for "The Forge," a technical incubator fostering a culture of innovation.',
      "Supervised a team of 4 Project Managers, providing technical direction to keep program delivery timely and high quality.",
      "Facilitated communication between program managers and faculty advisors to align project goals with the IEEE mission.",
    ],
    skills: ["Technical Leadership", "Program Management"],
    link: "https://www.ieeeutd.org/",
  },
  {
    start: "Spring 2021",
    end: "Spring 2022",
    role: "Project Manager",
    company: "IEEE at UTD",
    description: [
      "Facial Security System (IoT): led a team of 5 engineering students to design a microcontroller-based security system, overseeing the SDLC with the Magic Mirror library and OpenCV for real-time facial detection.",
      "Arduino Robotic Arm: directed the design and assembly of a 4-axis robotic arm in C++ on an Arduino Mega 2650, with Bluetooth (HC-05) control from an Android joystick app.",
    ],
    skills: ["C++", "Arduino", "OpenCV", "IoT"],
    link: "https://www.ieeeutd.org/",
  },
];
