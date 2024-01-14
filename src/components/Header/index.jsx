const Header = () => {

    let dateperso = new Date().toLocaleString('fr-FR',{
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'});

    return (
        <header className="header">
            <i className="fa-solid fa-bars"></i>
            <h1 className="header__h1">Bonjour</h1>
            <p className="header__p"><i className="fa-regular fa-calendar"></i>{ dateperso }</p>
        </header>
    )
}

export default Header