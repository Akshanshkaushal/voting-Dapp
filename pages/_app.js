import '../styles/globals.css';
import { Votingprovider } from '../context/voter';
import NavBar from "../components/NavBar/NavBar";
const MyApp= ({Component, pageProps})=>(
    <Votingprovider>
<div>
    <NavBar/><div><component{...pageProps}/>;
</div>
</div>
</Votingprovider>
);
    

export default MyApp;