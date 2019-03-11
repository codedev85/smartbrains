import React , { Component } from 'react';
import './SignIn.css';

class SignIn extends Component {
 constructor(props){
 	super(props);
 	this.state =  {
       onEmailSignIn : '',
       onPasswordSignIn : ''
 	}
 }

	onEmailChange = (event) => {
       this.setState({onEmailSignIn : event.target.value});
	}

	onPasswordChange = (event) => {

		this.setState({onPasswordSignIn : event.target.value});

	}
	onButtonSubmit = () => {
		const url = 'http://localhost:3000/signin';
        fetch(url , {
        	method: 'post',
        	headers:{'Content-Type': 'application/json'},
        	body: JSON.stringify({
               email : this.state.onEmailSignIn,
               password: this.state.onPasswordSignIn
        	})
        })
       
        .then(response => response.json())
        .then(user => {
        	console.log(user)
        	if(user.id){
        		this.props.loadUser(user)
        		this.props.onRouteChange('home');
        	}
        })
        .catch(error => console.log(error))
		
	}

render(){

	const { onRouteChange } = this.props;

	   return (
   	<div>
   	 <article className="br3 ba dark-gray b--black-10 mv4 w-100  mw6 center shadow-5">
        <main className="pa4 black-80">
		     <div className="measure">
		          <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
			      <legend className="f1 fw6 ph0 mh0" >Sign In</legend>
			      <div className="mt3">
				  <label className="db fw6 lh-copy f6" htmlFor="email-address" >Email</label>
				  <input 
				  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				  type="email" 
				  name="email-address"  
				  id="email-address"
				  onChange = {this.onEmailChange}
				   />
				  </div>
				  <div className="mv3">
				  <label className="db fw6 lh-copy f6" htmlFor="password" >Password</label>
				  <input 
				  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				  type="password" 
				  name="password"  
				  id="password" 
				  onChange={this.onPasswordChange}
				  />
				  </div>
		          </fieldset>
				  <div className="">
			      <input 
			           onClick = {this.onButtonSubmit}
			           className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			           type="submit" 
			           value="Sign in" />
				  </div>
				  <div className="lh-copy mt3">
				  <p 
				       onClick={()=>onRouteChange('register')} 
				       className="f6 link dim black db pointer">Register</p>
				  </div>
		     </div>
        </main>
      </article>
     </div>
   	      );
 }

} 
export default SignIn;