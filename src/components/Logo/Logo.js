import React from  'react';
import './Logo.css';
import brain from './brain.png'
import Tilt from 'react-tilt';

const Logo = () => {

	return (
            <div className='ma4 mt0' >
              <Tilt className="Tilt br2 shadow-2" options={{ max : 65 }} style={{ height: 150, width: 150 }} >
				 <div className="Tilt-inner pa3"> 
				     <img  style={{paddingTop: '4px'}}src={brain} alt=''/> 
				  </div>
			  </Tilt>
            </div>
		   );
}
export default Logo ;