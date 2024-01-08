import '../styles/global.css'
import Footer from "../components/footer/index";


function MyApp({ Component, pageProps }) {
    return <>
        <Component {...pageProps} />
        <Footer />

    </>

}

export default MyApp