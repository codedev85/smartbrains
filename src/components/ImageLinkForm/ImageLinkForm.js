import React from  'react';
import './ImageLinkForm.css';



const ImageLinkForm = ({onInput , onButtonSubmit}) => {

	return (
            <div>
            <p className= 'f3'>
             {'This  Magic Brain will help you detect faces in your pictures. Give it a try !'}
            </p>
            <div className='center'>
            <div className='pa4  formWidth br4 shadow-5'>
	            <input className='f3 pa2 w-70' type="text"  onChange = {onInput}/>
	            <button 
                     className='grow w-30 pa7 ph3 pv2 f4 link dib white bg-light-purple' 
                     onClick = { onButtonSubmit } 
                     >Detect</button>
	         </div>
	        </div>
            </div>
		   );
}
export default ImageLinkForm ;