
import React, { useState } from "react";
import { useSelector } from 'react-redux'
import HeaderConnexion from "../HeaderConnexion";
import { selectProfil } from "../../utils/selectors";
import HeaderDate from "../HeaderDate";
import Menu from "../Menu";

const Header = () => {
    
    const [isShow, setIsShow] = useState(false);
    const profil = useSelector(selectProfil)
    let datasUser = profil.data
    if (isShow) {
        return(
            <header className="header">
                <Menu />
                <i className="fa-solid fa-bars" onClick={() => setIsShow(!isShow)}></i>
                <div className="header__invisible"></div>
                <h1 className="header__h1">Wellcome Home!</h1>
                <HeaderConnexion {...datasUser} />
                <HeaderDate />
            </header>
        );
    }

    return (
        <header className="header">
            <i className="fa-solid fa-bars" onClick={() => setIsShow(!isShow)}></i>
            <div className="header__invisible"></div>
            <h1 className="header__h1">Wellcome Home!</h1>
            <HeaderConnexion {...datasUser} />
            <HeaderDate />
        </header>
    )
}

export default Header