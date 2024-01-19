import { motion } from 'framer-motion'

const NavElt = (navCategory, id) => {
    return (
        <motion.li whileHover={{ scale: 1.2 }} key={id} className="menu__list--li">
            <a href={navCategory.id} className="menu__list--a">{navCategory.title}</a>
        </motion.li>
    )
} 

export default NavElt