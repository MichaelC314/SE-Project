import React from 'react';
import '../styles/Main.css'; // Ensure to link your updated CSS file

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>

      <div className="mascot">
        <h2>-Our Mascot-</h2>
        <img 
          src={require('../img/bitey.jpg')} 
          alt="Dinobytes Mascot" 
          className="mascot-image" 
        />
        <p>
          Meet our friendly dinosaur mascot, Bytey! Bytey is a creative and curious dinosaur who loves to explore the world of programming.
        </p>
      </div>

      <div className="team row justify-content-center">
        {/* Team Card 1 */}
        <div className="col-md-4">
        <div 
    className="custom-team-card" 
    style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  >
            <h5 className="card-title">Cooper: Frontend</h5>
            <img 
  src={require('../img/cooper.gif')} 
  alt="Cooper's chosen GIF" 
  className="team-gif" 
  
/>
          </div>
        </div>

        {/* Team Card 2 */}
        <div className="col-md-4">
          <div className="custom-team-card">
            <h5 className="card-title">Michael: Backend</h5>
            <img 
              src={require('../img/michael.gif')} 
              alt="Michael's chosen GIF" 
              className="team-gif" 
            />
          </div>
        </div>

        {/* Team Card 3 */}
        <div className="col-md-4">
          <div className="custom-team-card">
            <h5 className="card-title">Miguel: Frontend</h5>
            <img 
              src={require('../img/miguel.gif')} 
              alt="Miguel's chosen GIF" 
              className="team-gif" 
            />
          </div>
        </div>

        {/* Team Card 4 */}
        <div className="col-md-4 d-flex justify-content-center">
          <div className="custom-team-card">
            <h5 className="card-title">Philippe: Backend</h5>
            <img 
              src={require('../img/philipe.gif')} 
              alt="Philipe's chosen GIF" 
              className="team-gif" 
            />
          </div>
        </div>

        {/* Team Card 5 */}
        <div className="col-md-4 d-flex justify-content-center">
          <div className="custom-team-card">
            <h5 className="card-title">Rachel: Art and Lessons</h5>
            <img 
              src={require('../img/rachel.gif')} 
              alt="Rachel's chosen GIF" 
              className="team-gif" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;


