import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import Clarifai from 'clarifai';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';



import './App.css';
const particlesOptions = {
            particles: {
              number:{
                value:150,
                density:{
                  enable:true,
                  value_area:800
                }
              }  
            }
          }

const app = new Clarifai.App({
    apiKey: 'd678a2a706a1427fb9550cd5d5851652'
});

const initialstate = {
      input : '',
      imageUrl: '',
      box: {},
      route : 'signin',
      isSignedIn : false,
      user : {
        id: '',
        name : '',
        email: ' ',
        entries: 0,
        joined : ' '
      }
    }
class App extends Component {
  constructor(){
    super();
    this.state = initialstate
  }

 

  //calculate face 
  CalculateFaceLocation = (data) => {
    const ClarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(ClarifaiFace);
    const Image = document.getElementById('inputimage');
    const width = Number(Image.width);
    const height = Number(Image.width);
    console.log(width, height);
    return {
            leftCol : ClarifaiFace.left_col * width,
            topRow   : ClarifaiFace.top_row * height,
            rightCol : width - (ClarifaiFace.right_col * width),
            bottomRow : height - (ClarifaiFace.bottom_row * height)
          }
    }

   //detect faces 
  detectFaces = (box) => {
    this.setState({box : box});
    console.log(box);

   }

  //fetch data on input 
  onInput = (event) => {
     this.setState({input:event.target.value});
   
   }


  //on button submit fetch faces via clarifai Api
  onButtonSubmit = () => {
    this.setState({imageUrl : this.state.input });
    app.models
         .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
         .then(response => { 
          if(response){
            const url = 'http://localhost:3000/image';
            fetch( url , {
                 method : 'put',
                 headers : {'Content-Type': 'application/json'},
                 body : JSON.stringify({
                        id:this.state.user.id
                 })
                 })
            .then(response => response.json())
            .then(count => {
              console.log(count)
              this.setState(Object.assign(this.state.user , {entries :count }))
            })

              }
               this.detectFaces(this.CalculateFaceLocation(response)) 

             })
         .catch(err => console.log(err));   
    }

  onRouteChange = (route) => {
   
    if(route === 'signout'){

      this.setState(initialstate);

    }else if (route === 'home'){

      this.setState({isSignedIn : true});
    }
    
    this.setState({route : route});
  }

  loadUser = (data) =>{
  this.setState({user : {
        id: data.id,
        name : data.name,
        email: data.email,
        entries: 0,
        joined : data.joined
      }
   })
  }
  render() {
    return (
      <div className="App">
      <Particles 
          className='particles'
          params={particlesOptions}
        />
         <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
        {this.state.route === 'home'
         ?  <div>
            <Logo />

            <Rank 
                 name = {this.state.user.name}
                 entries ={this.state.user.entries}/>

            <ImageLinkForm  onInput = {this.onInput}  
                          onButtonSubmit = { this.onButtonSubmit } 
                          />

            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>

          </div>
        : this.state.route === 'signin'
          ? <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/> : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange} />}
      </div>
    );
  }
}

export default App;
