// "use client";
// import WorldMap from "@/components/ui/world-map";
// import { motion } from "motion/react";

// export default function WorldMapDemo() {
//   return (
//     <div className=" py-10 dark:bg-black bg-white w-full">
//       <div className="max-w-7xl mx-auto text-center">
//         <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
//           Remote{" "}
//           <span
//             className="bg-clip-text text-transparent"
//             style={{
//               backgroundImage:
//                 "linear-gradient(to left, #6dd5fa, #59bfea, #47aadb, #3795ca, #2980b9)",
//             }}
//           >
//             {"Connectivity".split("").map((word, idx) => (
//               <motion.span
//                 key={idx}
//                 className="inline-block"
//                 initial={{ x: -10, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.5, delay: idx * 0.04 }}
//               >
//                 {word}
//               </motion.span>
//             ))}
//           </span>
//         </p>
//         <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
//           Break free from traditional boundaries. Work from anywhere, at the
//           comfort of your own studio apartment. Perfect for Nomads and
//           Travellers.
//         </p>
//       </div>
//       <WorldMap
//         dots={[
//           {
//             start: {
//               lat: 64.2008,
//               lng: -149.4937,
//             }, // Alaska (Fairbanks)
//             end: {
//               lat: 34.0522,
//               lng: -118.2437,
//             }, // Los Angeles
//           },
//           {
//             start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
//             end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
//           },
//           {
//             start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
//             end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
//           },
//           {
//             start: { lat: 51.5074, lng: -0.1278 }, // London
//             end: { lat: 28.6139, lng: 77.209 }, // New Delhi
//           },
//           {
//             start: { lat: 28.6139, lng: 77.209 }, // New Delhi
//             end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
//           },
//           {
//             start: { lat: 28.6139, lng: 77.209 }, // New Delhi
//             end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
//           },
//         ]}
//       />
//     </div>
//   );
// }

"use client";

import WorldMap from "@/components/ui/world-map";
import { motion } from "motion/react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function WorldMapDemo() {
  return (
    <div className={`${poppins.className} w-full bg-white py-16 md:py-24`}>
      <div className="mx-auto max-w-7xl px-4 text-center">
        <span
          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
          style={{
            borderColor: "rgba(41, 128, 185, 0.25)",
            background: "rgba(41, 128, 185, 0.1)",
            color: "#2980b9",
          }}
        >
          Pan-India Presence
        </span>

        <p className="mt-5 text-2xl font-semibold leading-tight text-[#102f56] md:text-4xl">
          Connecting Mills{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #1f6fa5 0%, #2980b9 45%, #22a5dd 100%)",
            }}
          >
            {"Across India".split("").map((char, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ y: -8, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </p>

        <p className="mx-auto max-w-2xl py-4 text-sm leading-relaxed text-[#4f6a87] md:text-lg">
          From remote flour mills to major processing hubs, ProMiller brings
          real-time visibility and control to operations nationwide — wherever
          your mill is located.
        </p>
      </div>

      <WorldMap
        dots={[
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
        ]}
      />
    </div>
  );
}
