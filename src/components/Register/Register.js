import React , { Component } from 'react';


class  Register extends Component {
	constructor(props){
	   super(props);
	   this.state = {
		   	 name : '',
		   	 email : '',
		   	 password : ''
		 }
	}
	 onNameInput = (event) =>{
	 	this.setState({name: event.target.value})

	 }
	 onEmailInput = (event)=>{
       this.setState({email : event.target.value})
	 }
	 onPasswordInput = (event) =>{
        this.setState({password : event.target.value})
	 }

	 onButtonSubmit = () =>{
	 	const  url = 'http://localhost:3000/register';
	 	fetch(url , {
	 		method : 'post',
	 		headers : {'Content-Type' : 'application/json'},
	 		body : JSON.stringify({
	 			name : this.state.name,
	 			email: this.state.email,
	 			password : this.state.password
	 		})
	 	})
	 	.then(response => response.json())
	 	.then(user => {
	 		if(user.id){
	 			this.props.loadUser(user)
	 			this.props.onRouteChange('home')
	 		}
	 	})
	 	.catch(error => console.log(error))
	 	
	 }

 render(){
 	return (
   	<div>
   	 <article className="br3 ba dark-gray b--black-10 mv4 w-100  mw6 center shadow-5">
        <main className="pa4 black-80">
		     <div className="measure">
		          <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
			      <legend className="f1 fw6 ph0 mh0" >Register</legend>
			      <div className="mt3">
				  <label className="db fw6 lh-copy f6" htmlFor="email-address" >Name</label>
				  <input 
				        onChange = { this.onNameInput}
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="text" 
				        name="name" 
				         id="name" />
				  </div>
			      <div className="mt3">
				  <label className="db fw6 lh-copy f6" htmlFor="email-address" >Email</label>
				  <input 
				        onChange = { this.onEmailInput }
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address" />
				  </div>
				  <div className="mv3">
				  <label className="db fw6 lh-copy f6" htmlFor="password" >Password</label>
				  <input 
				        onChange = { this.onPasswordInput }
				        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        type="password" 
				        name="password"  
				        id="password" />
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
				       onClick={ () => this.props.onRouteChange('signin')} 
				       className="f6 link dim black db pointer">SignIn</p>
				  </div>
		     </div>
        </main>
      </article>
     </div>
   	      );
 }
   
} 
export default Register ;