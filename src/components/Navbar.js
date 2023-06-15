import React,{useContext} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = ()=>{
  const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate();
  const renderList = () =>{
    if(state){
      return [<li><Link to="/profile">Profile</Link></li> ,
      <li><Link to="/createpost">Upload</Link></li>,
      <li>
      <button onClick={()=>{
                            localStorage.clear()
                            dispatch({type:"CLEAR"})
                            navigate('/signin')
                          }
                      } 
              className="btn waves-effect waves-light" id='logout'>Logout</button>
      </li>]
    }else{
      return [<li><Link to="/signup">Signup</Link></li> ,
      <li><Link to="/signin">Signin</Link></li>]
    }
  }
    return(
        <nav>
        <div className="nav-wrapper #009688 teal">
          <Link to={state?"/":"/signin"} className="brand-logo left">Pixlink</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
            
          </ul>
        </div>
      </nav>
    
    )
}

export default Navbar;