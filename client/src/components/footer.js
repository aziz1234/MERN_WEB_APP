import React, { Component } from 'react';
import './footer.css';

class AppFooter extends Component{
    render(){
        return(
            <div>
                <footer  style={{backgroundColor: "teal"}} dark="true" expand="md" className="footer">
                    <p>Something about Copyrights</p>
                </footer>
            </div>
        )   
    };
}

export default AppFooter;