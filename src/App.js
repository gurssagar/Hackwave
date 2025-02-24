import logo from './logo.svg';
import './App.css';
import { useEffect } from "react";
import { useState } from "react";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";
import Rive from "@rive-app/react-canvas";


export default function App() {
  const { rive, RiveComponent } = useRive({
    src: 'map_loadingscreen.riv',
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 4000); // 4000 milliseconds = 4 seconds

    return () => clearTimeout(timer);
  }, [visible]);
  return (
    <>
    
    <div className='containers'>
    
    
    <RiveComponent
      onMouseEnter={() => rive && rive.play()}
      onMouseLeave={() => rive && rive.pause()}
    />
    
    </div>
    </>
  );
}
