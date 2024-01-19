
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectAuthentification } from '../../utils/selectors'
import Home from '../../pages/Home';
//import User from '../../pages/User';
import Authentification from '../../pages/Authentification'

const Roads = () => {

    const authentification = useSelector(selectAuthentification)
    const links = [
        {path:"/", element:<Home />, private:false},
        {path:"/sign-in/", element:<Authentification />, private:false},
        //{path:"/user/", element:<User />, private:true},
    ]
  
    const routes = links.map((link, id) => (
        <Route path={link.path} element={link.private && authentification.data == null ? <Authentification /> : link.element} key={id}/>
    ))

    return (
        <Routes>
            {routes}
        </Routes>
    )
}

export default Roads