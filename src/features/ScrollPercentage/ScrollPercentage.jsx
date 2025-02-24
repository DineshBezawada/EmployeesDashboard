import { useEffect, useRef, useState } from "react";

const ScrollPercentage = () => {
    const [flag, setFlag] = useState(false); 
    const cardRef = useRef(null); 

    const handleScroll = () => {
        if (cardRef.current) {
          const card = cardRef.current;
          const scrollHeight = card.scrollHeight;
          const scrollTop = card.scrollTop;
          const threshold = scrollHeight * 0.6; 
          if (scrollTop > threshold) {
            setFlag(true);
          } else {
            setFlag(false);
          }
        }
      };
    
      useEffect(() => {
        const card = cardRef.current;
        if (card) {
          card.addEventListener('scroll', handleScroll);
        }
        return () => {
          if (card) {
            card.removeEventListener('scroll', handleScroll);
          }
        };
      }, []);  

  return (
    <div
    ref={cardRef}
    className="card"
    style={{ overflowY: 'scroll', height: '300px' }} 
  >
    <div>Flag status: {flag ? 'True' : 'False'}</div>
    <div style={{ height: '800px' }}>
      Scroll this content.
    </div>
    
  </div>
  );
};
export default ScrollPercentage;
