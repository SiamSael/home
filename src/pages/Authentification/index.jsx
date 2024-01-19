import { Navigate } from 'react-router-dom'
import { useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthentification, selectLogin } from '../../utils/selectors'
import { fetchOrUpdateAuthentification } from '../../features/authentification'
import { saveLoginDatas } from '../../features/login'

const Authentification = () => {

    const form = useRef()

    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault(); 
        dispatch(fetchOrUpdateAuthentification(form.current.username.value, form.current.password.value))
        dispatch(saveLoginDatas(form.current.rememberMe.checked, form.current.username.value, form.current.password.value))
    }
        
    const authentification = useSelector(selectAuthentification)

    const login = useSelector(selectLogin)

    if (authentification.data !== null) {
        return (<Navigate to="/user/" />)
    }
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form  id="authentification" method="post" onSubmit={(event) => handleSubmit(event)} ref={form}>
                    <span className="error-form">{authentification.status === 'rejected' ? 'Authentification rejected' : ''}</span>
                    <div className="input-wrapper">
                        <label htmlFor="username">Email</label>
                        <input type="text" id="username" defaultValue={login.data === null ? "" : login.data.email}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" defaultValue={login.data === null ? "" : login.data.password}/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="rememberMe" />
                        <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <input type="submit" className="sign-in-button" value="Sign In"/>
                </form>
            </section>
      </main>
    )
}

export default Authentification