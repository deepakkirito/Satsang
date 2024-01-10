import '../styles/global.css'
import Footer from "../components/footer/index";
import Navbar from "../components/Navbar/index";
import Context from "../context/context";


function MyApp({ Component, pageProps }) {
    return <>
        <Context>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
        </Context>

    </>

}

export default MyApp