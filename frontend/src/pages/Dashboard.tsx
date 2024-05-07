import { LoginNavbar } from "../components/LoginNavbar"
import {Layout} from "../components/Layout"
import { Blogs } from "../components/Blogs"
import {Extras} from '../components/Extras';
export const Dashboard = () => {
    return(
        <>
        <LoginNavbar />
        <Layout PageLeft={<Blogs/>} PageRight={<Extras/>}/>
        </>
    )
}