const HeaderDate = () => {

    let dateperso = new Date().toLocaleString('fr-FR',{
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'});
        
    return (
        <p className="header__p"><i className="fa-regular fa-calendar"></i>{ dateperso }</p>
    )
}

export default HeaderDate