'use client';
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Opinion from "./Opinion";
import SectionHeading from "./SectionHeading";

const Testimonial = () => {

  const opinions = [
    {
      testimonial: "During his tenure at Revertech, Gokul Krishnan demonstrated exceptional dedication and initiative, consistently delivering high-quality work with a positive attitude. His contributions greatly enriched our marketing efforts, and I wholeheartedly endorse Gokul for his future endeavors.",
      author: "Midhun",
      position: "Director",
      company: "ReverTech"
    },
    {
      testimonial: "Gokul's innovative approach and commitment to excellence have made a significant impact on our projects. He is a reliable and talented professional who always goes above and beyond.",
      author: "Jane Doe",
      position: "Project Manager",
      company: "Tech Solutions"
    }
    // Add more opinions as needed
  ];

  const [opinionVisibility, setOpinionVisibility] = useState([true, false, false]);
  const testimonialRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const testimonialSection = testimonialRef.current;
      const opinions = testimonialSection.querySelectorAll('.opinionSection');
      
      let visibleIndex = -1;
      opinions.forEach((opinion, index) => {
        const rect = opinion.getBoundingClientRect();
        if (rect.top + 200 >= 0 && rect.bottom - 200 <= window.innerHeight) {
          visibleIndex = index;
        }
      });
      
      if (visibleIndex !== -1) {
        const newVisibility = opinionVisibility.map((_, index) => index === visibleIndex);
        setOpinionVisibility(newVisibility);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [opinionVisibility]);

  return (<>
         <SectionHeading heading="What they said"/>
    <div ref={testimonialRef} className='bg-background min-h-screen relative flex items-start justify-center testimonialSection'>
       <div>
         {opinions.map((opinion, index) => (
          <Opinion
            key={index}
            testimonial={opinion.testimonial}
            author={opinion.author}
            position={opinion.position}
            company={opinion.company}
         />
      ))}
       </div>
       <div className="stickySection">
        <motion.div
          className="testimonialImage"
          style={{ filter: opinionVisibility[0] ? "brightness(100%)" : "brightness(30%)" }}
          transition={{ duration: 2 }}
        >
          <Image
            src="/peter-smart.jpg"
            width={90}
            height={90}
            alt=""
          />
            {opinionVisibility[0] && <span className="arrow"/>}
        </motion.div>
        <motion.div
          className="testimonialImage"
          style={{ filter: opinionVisibility[1] ? "brightness(100%)" : "brightness(30%)" }}
          transition={{ duration: 2 }}
        >
          <Image
            src="/peter-smart.jpg"
            width={90}
            height={90}
            alt=""
          />
               {opinionVisibility[1] && <span className="arrow"/>}
        </motion.div>
        <motion.div
          className="testimonialImage"
          style={{ filter: opinionVisibility[2] ? "brightness(100%)" : "brightness(30%)" }}
          transition={{ duration: 2 }}
        >
          <Image
            src="/peter-smart.jpg"
            width={90}
            height={90}
            alt=""
          />
             {opinionVisibility[2] && <span className="arrow"/>}
        </motion.div>
       </div>
    </div>
    </>
  );
};

export default Testimonial;