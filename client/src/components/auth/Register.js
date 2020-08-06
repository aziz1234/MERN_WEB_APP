import React, { Fragment, useState } from 'react'

const Register = () =>{
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const {name, email, password, password2} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        if(password !== password2){
            console.log("passwords don't match");
        }
        else{
            console.log("success");
    }
}; 

    return <Fragment>
        <form style={{padding:"5% 20% "}} onSubmit={e => onSubmit(e)}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" placeholder="Enter Name" value={name} onChange={e => onChange(e)} required />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" placeholder="Enter email" value={email} onChange={e => onChange(e)} required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Enter Password" value={password} onChange={e => onChange(e)} required/>
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" name="password2" placeholder="Re-enter Password" value={password2} onChange={e => onChange(e)} required/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                {/* <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p> */}
            </form>
    </Fragment>
};

export default Register;