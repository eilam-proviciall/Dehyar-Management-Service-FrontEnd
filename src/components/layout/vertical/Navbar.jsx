// Component Imports
import LayoutNavbar from '@layouts/components/vertical/Navbar'
import NavbarContent from './NavbarContent'
import {AuthProvider} from "@contexts/AuthContext";

const Navbar = () => {
    return (
        <AuthProvider>
            <LayoutNavbar>
                <NavbarContent/>
            </LayoutNavbar>
        </AuthProvider>
    )
}

export default Navbar
