
import './App.css';
import { useEffect, useState, useRef } from "react";
import {useRive} from "@rive-app/react-canvas";
import { Document, Page, pdfjs } from 'react-pdf';
import { FlipWords } from './components/flipwords';
import { SignupFormDemo } from './components/form';
import AccordionComponents from './components/accordion'
import Navigation from './components/navigation';
const { Accordion, AccordionItem, AccordionTrigger, AccordionContent } = AccordionComponents

const useScrollScale = (scaleRef, minScale = 1) => {
 useEffect(() => {
  const handleScroll = () => {
    // Get scroll position
    const scrollY = window.scrollY;
    
    // Get viewport height
    const viewportHeight = window.innerHeight;
    
    // Calculate total scrollable area
    const totalScrollable = document.body.scrollHeight - viewportHeight;
    
    // Check if we're in the initial state (before scaling starts)
    if (scrollY <= 300) {
      // We're above or at the starting threshold - keep minimum scale
      if (scaleRef.current) {
        scaleRef.current.style.transform = `scale(${minScale})`;
      }
      return;
    }
    
    // Define the scaling up phase (300px to 1200px)
    const scaleUpEnd = 1200;
    
    if (scrollY <= scaleUpEnd) {
      // We're in the scale-up phase (between 300px and 1200px)
      const scrolledPortion = (scrollY - 300) / ((scaleUpEnd - 300)/2);
      const scale = 1 + (scrolledPortion * 3); // Scale up to 3x
      const finalScale = Math.max(scale, minScale);
      
      if (scaleRef.current) {
        scaleRef.current.style.transform = `scale(${finalScale})`;
      }
    } else {
      // We're in the scale-down phase (after 1200px)
      // Calculate how much we've scrolled past the scale-up end point
      const scrolledPastPeak = scrollY - scaleUpEnd;
      
      // Calculate how much more we can scroll
      const remainingScroll = totalScrollable - scaleUpEnd;
      
      if (remainingScroll <= 0) {
        // Not enough content to scroll beyond peak
        if (scaleRef.current) {
          // Keep the maximum scale at the peak
          scaleRef.current.style.transform = `scale(7)`;  // peak scale value
        }
        return;
      }

      // Define the scale-down threshold (2500px)
      const scaleDownStart = 2500;
      const scaleDownEnd = 3000; // You can adjust this based on your needs
      
      // Check if we're in the scale-down phase beyond 2500px
      if (scrollY > scaleDownStart) {
        // Calculate how much we've scrolled past the scale-down start point
        const scrolledPastDown = scrollY - scaleDownStart;
        // Calculate how far through the scale-down we are (0 to 1)
        const scaleDownProgress = Math.min(scrolledPastDown / (scaleDownEnd - scaleDownStart), 1);
        // Calculate the scale value: start at peak (7) and go down to minScale
        const scale = 1 - ((1 - minScale) * scaleDownProgress);
        
        if (scaleRef.current) {
          scaleRef.current.style.transform = `scale(${Math.max(scale, 0.5)})`;
        }
      } else {
        // Original scale-down calculation for between 1200px and 2500px
        const scaleDownProgress = Math.min(scrolledPastPeak / (remainingScroll/20), 1);
        const scale = 7 - ((7 - minScale) * scaleDownProgress);
        
        if (scaleRef.current) {
          scaleRef.current.style.transform = `scale(${Math.max(scale, minScale)})`;
        }
      }
    }
  };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scaleRef, minScale]);
};
export default function App() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apply.devfolio.co/v2/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
}, []);


  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
 
 
  const words = ["Developer", "Designer","Innovator","Engineer","Problem-Solver"];
  const { rive, RiveComponent } = useRive({
    src: 'map_loadingscreentemp3.riv',
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  const [visible, setVisible] = useState(false);
  const scaleRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 10000); // 4000 milliseconds = 4 seconds

    return () => clearTimeout(timer);
  }, []);

  useScrollScale(scaleRef);



  
  return (
    <>
      <Navigation/>
      
      <div className='containers '>   
      
        <RiveComponent />
      </div>
      <div className='flex justify-between'>
        <p className='z-10 font-[tech] text-white mt-40 mb-[400px] text-center mx-auto'>CODE CONQUER CONQUEST</p>
      </div>
      <div className="z-4 fixed inset-0 flex items-center justify-center">
        <img 
        ref={scaleRef} 
        src="bgtest.webp" 
        className="absolute top-1/4 2 mx-auto  w-80 h-80"
        />
</div>      
     
      
      <div>
  <div id="about" className='flex flex-col md:flex-row mt-[200px] md:mt-[400px] gap-5 mx-5 md:mx-[40vh]'>
    <div className='text-white text-2xl md:text-lg font-[tech] z-10 w-full md:w-1/4 text-left md:text-left'>
      Who are we?
    </div>
    <div className='text-white font-[tech] text-xl md:text-xl z-10 w-full md:w-2/3'>
      HackWave is the ultimate hackathon for tech enthusiasts, organized by. Whether you're a:
      <br /><br />
      <p className='text-3xl md:text-4xl'><FlipWords words={words} /></p> 
      <br />
      you’ll collaborate, learn, and build groundbreaking solutions. Ride the wave of innovation with us! 🌊
    </div>
  </div>

  <div className='flex flex-col md:flex-row mt-10 gap-5 mx-5 md:mx-[40vh]'>
    <div className='text-2xl md:text-lg text-white font-[tech] z-10 w-full md:w-1/4 text-left'>
      Mark Your Calendar
    </div>
    <div className='text-white font-[tech] text-xl md:text-xl z-10 w-full md:w-2/3'>
      April 2025, New Delhi
    </div>
  </div>

  <div className='flex flex-col md:flex-row mt-10 gap-5 mx-5 md:mx-[40vh]'>
    <div className='text-white font-[tech] z-10 w-full md:w-1/4 text-left'>
      Register Now
    </div>
    <div className='z-10 w-full md:w-2/3'>
      <p className='text-white font-[tech] text-xl md:text-xl z-10 text-left'>
        Ready to make waves with your ideas? Join us and build something incredible! 🌊🚀
      </p>
      <div 
	      className='bg-white px-4  py-3 md:px-5 md:py-4 font-[tech] text-lg md:text-lg z-10 mt-5 w-full md:w-auto'
        >REGISTER NOW</div>
    </div>
  </div>
</div>
        

       <div id="timeline" className='mt-20vh md:mt-[50vh] mt-[20vh] text-white z-10 text-4xl md:text-7xl flex gap-10 mx-20vh md:mx-[40vh]'>
    <p className='z-10 font-[tech] text-8vw md:text-[10vw] text-center mx-auto'>TIMELINE</p>
</div>

<div className='bg-black z-10 flex mx-20vh md:mx-[40vh] text-center justify-center  '>
    <div className='text-white z-10 font-[tech] text-lg md:text-2xl text-center'>
        To be released soon
    </div>
</div>
        

        
        <div className='bg-gradient-to-b from-transparent via-black  via-black via-black to-black backdrop-blur-[2px] py-[10vh] w-screen z-10  text-center justify-center'>
        <div>
  <h1 id="sponsors" className='text-white z-10 font-[tech] text-[10vw] md:text-[10vw] mb-[80px] md:mb-0 text-center mx-auto mt-[40vh]'>
    SPONSORS
  </h1> 
  <div className='mx-auto gap-8 md:gap-10 mx-4 md:mx-[40vh] '>
<div className='grid grid-cols-2 md:grid-cols-3 mx-auto items'>
  <div className='flex items-center justify-center  p-4 rounded-lg'>
    <img src="/devfolio.png" alt="Devfolio" className='w-[20vh]' />
  </div>
  <div className='flex items-center justify-center  p-4 rounded-lg'>
    <img src="/ethindia.png" alt="EthIndia" className='w-[20vh]' />
  </div>
  <div className='flex items-center justify-center  p-4 rounded-lg'>
    <img src="/refact.png" alt="HackWave" className='w-[20vh]' />
  </div>
  
  <div className='flex items-center justify-center  p-4 rounded-lg'>
  <img src="/kgen.jpg" alt="kgen" className='w-[20vh]' />
  </div>

  <div className='flex items-center justify-center  p-4 rounded-lg'>
    <img src="/xyz.webp" alt="xyz" className='w-[20vh]' />
  </div>
  
  <div className='text-center m-auto'>
  <img src="/interview.svg" alt="kgen" className='w-[20vh] text-center' />
  </div>
  <div className='text-center m-auto'>
  <img src="/cybervajra.png" alt="cybervajra" className='w-[20vh] text-center' />
  </div>


</div>
  </div>
  <div className='pt-[40vh] flex flex-col md:flex-row mt-10 gap-5 mx-5 md:mx-[60vh] z-10 '>
    <div className='text-white font-[tech] z-10 w-full md:w-1/4 text-center md:text-left my-auto'>
      BECOME A SPONSOR
    </div>
    <div className='text-white text-center md:text-left font-[tech] text-lg md:text-2xl z-10 w-full md:w-2/3'>
      Interested in sponsoring?<br/>
      Reach out to us at connect@hackwave.tech
        
    </div>
  </div>

  <div className='flex flex-col md:flex-row mt-10 gap-5 mx-5 md:mx-[60vh] z-10 mb-[40vh]'>
    <div className='text-white font-[tech] z-10 w-full md:w-1/4 md:text-left text-center my-auto'>
      GOT QUESTIONS?
    </div>
    <div className='z-10 w-full md:w-2/3 flex justify-center md:justify-start'>
    <a href="#faq">
    <button className='bg-white px-4 py-3 md:px-5 md:py-4 font-[tech] text-lg md:text-lg z-10 mt-5 w-full md:w-fit'>
        VISIT THE FAQ
      </button>
    </a>
      
    </div>
  </div>
  
  <h1 id="sponsors" className='text-white z-10 font-[tech] text-[10vw] md:text-[5vw] mb-[80px] md:mb-0 text-center mx-auto mt-[40vh]'>
    HACKATHON PROPOSAL
  </h1> 
  <div className='block md:flex gap-8 md:gap-10 mx-4 md:mx-[70vh] mb-[40vh] mt-[7vh] mx-auto'>
    <p className='font-[tech] md:text-left text-white '>Get all the details about our upcoming hackathon, including objectives, problem statements, timelines, and sponsorship opportunities. Download the proposal now and be part of the innovation!</p>
    <a href='https://drive.google.com/file/d/1qyl9XAr3I212bzFsHrsAyBj3y-QKzmMs/view?usp=sharing'>
  <button className='bg-white px-4 py-3 md:px-5 md:py-4 font-[tech] text-lg md:text-lg z-10 mt-5 w-full md:w-[10vw]'>
        SEE THE PROPOSAL
      </button>
      </a>
  </div>

  

  
</div>

        <div>
        <h1 id="team" className='text-white z-10 font-[tech] text-[10vw] text-center mx-auto'>
          OUR TEAM
        </h1> 
        <div className='grid text-white grid-cols-1 md:grid-cols-2 my-10 mx-0 md:mx-[34vh] gap-x-[10vh] gap-y-8'>
    {/* Eshaa Bhasin */}
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-white'>
        <img className='w-[150px]  h-[150px] mx-auto md:w-[200px] md:h-[200px] grayscale' src="/eshaa_bhasin.webp" alt="Eshaa Bhasin"/>
        <div className="text-center md:text-left text-white">
            <h2 className='text-3xl md:text-4xl my-3'>Eshaa Bhasin</h2>
            <p className='text-lg font-[tech]'>LEAD </p>
            <div className='text-lg font-[tech] my-3 bg-white text-black rounded-xl text-center mx-auto md:mx-0 w-[40%] md:w-[60%]'>GDG GTBIT</div>
        </div>
    </div>

    {/* Avi Kapoor */}
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <img className='w-[150px] h-[150px] mx-auto  md:w-[200px] md:h-[200px] grayscale' src="/avi_kapoor.webp" alt="Avi Kapoor"/>
        <div className="text-center md:text-left">
            <h2 className='text-3xl md:text-4xl my-3'>Avi Kapoor</h2>
            <p className='text-lg font-[tech]'>CO-LEAD</p>
            <div className='text-lg font-[tech] my-3 bg-white text-black rounded-xl text-center mx-auto md:mx-0 w-[40%] md:w-[60%]'>GDG GTBIT</div>
        </div>
    </div>

    {/* Harshpreet Singh */}
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <img className='w-[150px] h-[150px] mx-auto  md:w-[200px] md:h-[200px] grayscale' src="/harshpreet_singh.webp" alt="Harshpreet Singh"/>
        <div className="text-center md:text-left">
            <h2 className='text-3xl md:text-4xl my-3'>Harshpreet Singh</h2>
            <p className='text-lg font-[tech]'>EXECUTIVE LEAD</p>
            <div className='text-lg font-[tech] my-3 bg-white text-black rounded-xl text-center mx-auto md:mx-0 w-[40%] md:w-[60%]'>GDG GTBIT</div>
        </div>
    </div>

    {/* Mukal Dadhwal */}
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <img className='w-[150px] h-[150px] mx-auto  md:w-[200px] md:h-[200px] grayscale' src="/mukal.jpg" alt="Mukal Dadhwal"/>
        <div className="text-center md:text-left">
            <h2 className='text-3xl md:text-4xl my-3'>Mukal Dadhwal</h2>
            <p className='text-lg font-[tech]'>TECH LEAD</p>
            <div className='text-lg font-[tech] my-3 bg-white text-black rounded-xl text-center mx-auto md:mx-0 w-[40%] md:w-[60%]'>GDG GTBIT</div>
        </div>
    </div>

    {/* Brahamdeep Singh */}
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <img className='w-[150px] h-[150px] mx-auto  md:w-[200px] md:h-[200px] grayscale' src="/brahamdeep_singh.webp" alt="Brahamdeep Singh"/>
        <div className="text-center md:text-left">
            <h2 className='text-3xl md:text-4xl my-3'>Brahamdeep Singh</h2>
            <p className='text-lg font-[tech]'>OPERATIONS LEAD</p>
            <div className='text-lg font-[tech] my-3 bg-white text-black rounded-xl text-center mx-auto md:mx-0 w-[40%] md:w-[60%]'>GDG GTBIT</div>
        </div>
    </div>

    {/* Gursheel Kaur */}
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <img className='w-[150px] h-[150px] mx-auto  md:w-[200px] md:h-[200px] grayscale' src="/gursheel_kaur.jpg" alt="Gursheel Kaur"/>
        <div className="text-center md:text-left">
            <h2 className='text-3xl md:text-4xl my-3'>Gursheel Kaur</h2>
            <p className='text-lg font-[tech]'>DESIGN LEAD</p>
            <div className='text-lg font-[tech] my-3 bg-white text-black rounded-xl text-center mx-auto md:mx-0 w-[40%] md:w-[60%]'>GDG GTBIT</div>
        </div>
    </div>

    {/* Ishwardeep Singh */}
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <img className='w-[150px] h-[150px] mx-auto  md:w-[200px] md:h-[200px] grayscale' src="/ishwardeep_singh.webp" alt="Ishwardeep Singh"/>
        <div className="text-center md:text-left">
            <h2 className='text-3xl md:text-4xl my-3'>Ishwardeep Singh</h2>
            <p className='text-lg font-[tech] capitalize'>GROWTH AND INNOVATION LEAD</p>
            <div className='text-lg font-[tech] my-3 bg-white text-black rounded-xl text-center mx-auto md:mx-0 w-[40%] md:w-[60%]'>GDG GTBIT</div>
        </div>
    </div>
</div>
        </div>


        <h1 id="faq" className='text-white z-10 font-[tech] text-5xl md:text-7xl text-center mx-auto capitalize mt-[20vh] md:mt-[40vh]'>
  YOU HAVE QUESTIONS<br/> WE HAVE ANSWERS
</h1> 
<div className='my-12 md:my-20 text-white z-10 font-[tech] text-xl md:text-2xl text-center mx-0 md:mx-[20%] capitalize'>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-2">
      <AccordionTrigger className='text-white text-center md:text-left'>
        What is a hackathon?
      </AccordionTrigger>
      <AccordionContent className='text-white text-center md:text-left text-lg'>
        <p>A hackathon can be best described as an "invention marathon", or in simple words, hackathons are about bringing your crazy ideas to reality. It's an event where any tech-enthusiast, regardless of their individual field, can come & participate to learn, build & share their creations over the course of a weekend, in a relaxed & productive environment. Hackathons are simply a venue for self-expression & creativity, where people come together & transform their thoughts into reality through technology.</p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-3">
      <AccordionTrigger className='text-white text-center md:text-left'>
        How big a team can be?
      </AccordionTrigger>
      <AccordionContent className='text-white text-center md:text-left text-lg'>
        <p>The minimum team size is two and the maximum team size is four.</p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-4">
      <AccordionTrigger className='text-white text-center md:text-left'>
        Who all can participate?
      </AccordionTrigger>
      <AccordionContent className='text-white text-center md:text-left text-lg'>
        <p>This is a student hackathon and only students are allowed to participate. You will be required to verify at the event by showing your student ID card.</p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-5">
      <AccordionTrigger className='text-white text-center md:text-left'>
        Do I need to have any specific qualifications to be a participant for the hackathon?
      </AccordionTrigger>
      <AccordionContent className='text-white text-center md:text-left text-lg'>
        <p>If you love to code, you are more than welcome to participate in the hackathon.</p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-6">
      <AccordionTrigger className='text-white text-center md:text-left'>
        I'm not a citizen of India. Can I participate?
      </AccordionTrigger>
      <AccordionContent className='text-white text-center md:text-left text-lg'>
        <p>There is only one eligibility for this hackathon and that is Motivation. If you love to code and have an innovative brain, then you are more than welcome. So yes, if you are an International Participant, you are always welcome to our hackathon.</p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-7">
      <AccordionTrigger className='text-white text-center md:text-left'>
        I am a newbie, can I hack?
      </AccordionTrigger>
      <AccordionContent className='text-white text-center md:text-left text-lg'>
        <p>Of course you can! We at Hack Wave ensure that no one is left behind during the hacking, thanks to our mentors and volunteers who help us achieve the same. We make sure that you learn the best you can alongside having fun and experiencing what it feels to belong to a community.</p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-8">
      <AccordionTrigger className='text-white text-center md:text-left'>
        Is there any registration fees for participation?
      </AccordionTrigger>
      <AccordionContent className='text-white text-center md:text-left text-lg'>
        <p>We don't want to monetize learning, community, and innovation. So, there is <b>no</b> participation/registration fees.</p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-9">
      <AccordionTrigger className='text-white text-center md:text-left'>
        Can I start working on my hack before the event?
      </AccordionTrigger>
      <AccordionContent className='text-white text-center md:text-left text-lg'>
        <p>No. In the interest of fairness, students should not be working on their projects before Hack Wave begins, and we do not allow participants to work on pre-existing projects. However, you can familiarize yourself with all the tools and technologies you intend to use beforehand.</p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-10">
      <AccordionTrigger className='text-white text-center md:text-left'>
        What to bring to the hackathon?
      </AccordionTrigger>
      <AccordionContent className='text-white text-center md:text-left text-lg'>
        <p>Please bring a valid university ID (or any student ID if in high school), a computer (preferably a laptop), chargers, and any hardware you will use for your hack. No firearms, weapons, alcohol, or illegal drugs are allowed on campus.</p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-11">
      <AccordionTrigger className='text-white text-center md:text-left'>
        Does Hack Wave provide Internet facility during the hackathon?
      </AccordionTrigger>
      <AccordionContent className='text-white text-center md:text-left text-lg'>
        <p>You're advised to bring your own broadband/hotspot device as we can arrange for at most one connection per team.</p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-12">
      <AccordionTrigger className='text-white text-center md:text-left'>
        What is the shortlisting procedure?
      </AccordionTrigger>
      <AccordionContent className='text-white text-center md:text-left text-lg'>
        <p>Based on the info provided in the registration form, teams will be shortlisted for the hackathon.</p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-13">
      <AccordionTrigger className='text-white text-center md:text-left'>
        I am below 18 or a high school student. Can I attend the hackathon?
      </AccordionTrigger>
      <AccordionContent className='text-white text-center md:text-left text-lg'>
        <p>Yes, you are most welcome but you will need to have your parent's consent to stay in the premises from 9th to 10th.</p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-14">
      <AccordionTrigger className='text-white text-center md:text-left'>
        Error 404 question not found?
      </AccordionTrigger>
      <AccordionContent className='text-white text-center md:text-left text-lg'>
        <p>Drop us a mail at <a href="mailto:connect@hackwave.tech" target="_blank"><u>connect@Hack Wave.tech</u></a> and we would be more than happy to answer your queries. Also, feel free to write if you'd like to volunteer for the event or be a mentor or judge!</p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>
<div id="contact" className='my-auto px-4 sm:px-8'>
  <div className='max-w-7xl mx-auto'>
    <h1 className='text-white z-10 font-[tech] text-4xl sm:text-7xl text-center mx-auto capitalize mt-20 sm:mt-[40vh]'>
      CONTACT US
    </h1>
    <p className='text-white z-10 font-[tech] text-lg sm:text-xl text-center mx-auto capitalize mt-10'>
      Reach out to us at connect@hackwave.tech
    </p>
    <div className='flex flex-col sm:flex-row justify-center items-center mt-10'>
      <div className='w-full sm:w-1/2'>
        <SignupFormDemo />
      </div>
    </div>
    <div className='text-center mt-20'>
      <div className='text-white bg-transparent backdrop-blur font-[tech] text-center text-lg sm:text-xl mb-5'>
        Designed with ❤️ by Team HACKWAVE
      </div>
    </div>
  </div>
</div>

      </div>
      
      
    
    </>
  );
}