import { useEffect, useRef, useState } from "react";

const ScrollPercentage = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const cardRef = useRef(null);
 console.log(isCardVisible,"isCardVisible");
  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const cardRect = cardRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const cardVisiblePercentage = (viewportHeight - cardRect.top) / cardRect.height;
        console.log(cardRect,"cardRect");
  
        if (cardVisiblePercentage >= 0.6 && !isCardVisible) {
          setIsCardVisible(true);
        } else if (cardVisiblePercentage < 0.6 && isCardVisible) {
          setIsCardVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isCardVisible]);

  return (
    <>
    <div style={{ height: '100vh', backgroundColor: 'lightblue' }}>
      
      Header
    </div>
    <div ref={cardRef} style={{ padding: '20px', border: '1px solid gray', margin: '20px' }}>
 
      Card Content
      <p>Card is 60% visible!</p>
      <p>Card is 60% visible!</p>
      <p>Card is 60% visible!</p>
      <p>Card is 60% visible!</p>
      <p>Card is 60% visible!</p>
      <p>Card is 60% visible!</p>
      <p>Card is 60% visible!</p>
      <p>Card is 60% visible!</p>
      <p>Card is 60% visible!</p>
      <p>Card is 60% visible!</p>
    </div>
  </>
  );
};
export default ScrollPercentage;
