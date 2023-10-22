import React, { useEffect, useRef } from 'react'

const features = [
  {
    id: 1,
    title: 'Never forget to complete your tasks again',
    text: 'Organize and priorities your tasks at ease.',
  },
  {
    id: 2,
    title: 'Ease of access',
    text: 'Access and update your tasks quickly,anytime,anywhere.',
  },
  {
    id: 3,
    title: 'Always on the roll',
    text: 'New features being added regularly so that you get a smooth user experience',
  },
]
const Features = () => {
  const featuresContainerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const element = featuresContainerRef.current;
  //     if (element && isElementInViewport(element)) {
  //       element.classList.remove('animate-slide-left')
  //       setTimeout(() => {
  //         element.classList.add('animate-slide-left');
  //       }, 1)

  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // const isElementInViewport = (el: HTMLElement | null) => {
  //   if (!el) return false;

  //   const rect = el.getBoundingClientRect();
  //   return (
  //     rect.top >= 0 &&
  //     rect.left >= 0 &&
  //     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
  //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  //   );
  // };
  return (
    <div className="container w-100 mt-5" ref={featuresContainerRef}>
      <div className="row">
        {
          features.map((feature) => (
            <div className="col-md-4 mb-4" key={feature.id}>
              <div className="card feature-card bg-black text-white">
                <div className="card-body">
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text">
                    {feature.text}
                  </p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>


  )
}

export default Features