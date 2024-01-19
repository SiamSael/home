import { Link } from "react-router-dom"
import { resetConnexion } from "../../features/authentification";
import { useDispatch } from "react-redux";
import { resetProfil } from "../../features/profil";

const HeaderConnexion = (datas) => {

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(resetConnexion);
        dispatch(resetProfil);
    }

    if(Object.keys(datas).length === 0) {
        return (
            <Link className="header__sign" to="/sign-in/">
                <i className="fa fa-user-circle"></i>
                <p>Sign In</p>
            </Link>
        )
    }

    if(datas.length !== 0) {
        return (
            <div className="header__sign">
                <Link to="/user/" className="header__sign--in">
                    <i className="fa fa-user-circle"></i>
                    <p>{datas.userName}</p>
                </Link>
                <Link to="/" className="header__sign--out" onClick={() => handleLogOut()}>
                    <i className="fa fa-sign-out"></i>
                    <p>Sign out</p>
                </Link>
            </div>
        )
    }
}

export default HeaderConnexion