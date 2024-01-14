const Footer = () => {

    const titleApp = "Home";
    const law ="Copyright 2024";
    const owner = "par G.Chevet & ABi";

    return (
        <footer className="footer">
            <h2 className="footer__p"><>{ titleApp }</> <br></br> <i className="fa-regular fa-copyright"></i>{ law } <br></br> { owner }</h2>
        </footer>
    )
}

export default Footer