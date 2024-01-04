import React, { useState } from 'react';
import { awrapper } from '../../dummydata';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger'; // Correct import statement

const AWrapper = () => {
  const [counterStart, setCounterStart] = useState(false);
  return (
    <>
      <section className='awrapper'>
        <div className="container grid">
          {awrapper.map((val, index) => (
            <div className="box flex" key={index}>
              <div className="img">
                <img src={val.cover} alt="" />
              </div>
              <ScrollTrigger
                onEnter={() => setCounterStart(true)}
                onExit={() => setCounterStart(false)}
              >
                <div className="text">
                  <h1>{counterStart && <CountUp start={0} end={val.data} duration={2} delay={0} />}</h1>
                  <h3>{val.title}</h3>
                </div>
              </ScrollTrigger>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AWrapper;
