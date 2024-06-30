import { HashRouter } from 'react-router-dom';
import Footer from 'Component/Footer';
import Header from 'Component/Header';
import Main from 'Component/Main';

export default function App() {
    return (
        <HashRouter>
            <Header />
            <Main />
            <Footer />
        </HashRouter>
    );
}
