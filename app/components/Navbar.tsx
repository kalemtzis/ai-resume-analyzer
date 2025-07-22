import { useEffect } from "react";
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
    const { auth } = usePuterStore();

    return (
        <nav className="navbar">
            <Link to='/'>
                <p className="text-2xl font-bold text-gradient">RESUMIND</p>
            </Link>
            <Link to='/upload' className="primary-button w-fit">
                Upload Resume
            </Link>
            {auth.isAuthenticated ? (
                <button className="primary-button w-fit h-fit" onClick={auth.signOut}>
                    Log Out
                </button>
            ) : (
                <button className="primary-button w-fit h-fit" onClick={auth.signIn}>
                    Log In
                </button>
            )}
        </nav>
    )
}

export default Navbar;