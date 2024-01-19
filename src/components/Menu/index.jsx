import NavList from "../NavList"
import { motion } from 'framer-motion'

const Menu = () => {
    return (
        <motion.nav initial={{transform: "translateX(-100px)"}} whileInView={{transform: "translateX(0px)"}} transition={{duration: 0.8}} className="menu"> 
            <NavList/>
        </motion.nav>
    )
}

export default Menu