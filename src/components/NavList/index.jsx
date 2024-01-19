import navCategories from '../../utils/datas/navCategories.json'
import NavElt from '../NavElt'

const NavList = () => {
    return (
        <ul className="menu__list">
            {(navCategories).map((navCategory, id)=> NavElt(navCategory, id))}
        </ul>
    )
}

export default NavList