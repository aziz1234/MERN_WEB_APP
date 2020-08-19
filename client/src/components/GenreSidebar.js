import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';

const GenreSidebar = () =>{
   const genres = {
        "Fantasy": "fantasy",
        "Science Fiction": "science fiction",
        "Romance": "romance",
        "Horror": "horror",
        "Biography": "biography",
        "Young Adult":"young adult"
    }
    
    return<Fragment>
            <ListGroup flush >
                {Object.keys(genres).map(key => 
                    <Link to ={`/booksin/${genres[key]}`} key={key} style={{color:"teal"}}>
                        <ListGroupItem href="#" style={{color:"teal"}}>{key}</ListGroupItem>
                    </Link>    
                )}
            </ListGroup>
          </Fragment>
}
 export default GenreSidebar