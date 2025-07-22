import { Link, useLocation } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
    const { auth } = usePuterStore();
    const location = useLocation();

    return (
        <nav className="navbar">
            <Link to='/'>
                <p className="text-2xl font-bold text-gradient">ioResume</p>
            </Link>
            <section className="flex flex-row items-center justify-center gap-4">
                {auth.isAuthenticated && location.pathname !== '/profile' &&
                    <Link to='/profile' className="primary-button w-fit">Profile</Link>
                }
                {location.pathname !== '/upload' &&
                    <Link className="primary-button w-fit" to='/upload'>
                        Upload Resume
                    </Link>
                }
                {auth.isAuthenticated && location.pathname !== '/contact' &&
                    <Link to='/contact' className="primary-button w-fit">
                        Contact Us
                    </Link>
                }
                {auth.isAuthenticated ?
                    <button className="primary-button w-fit" onClick={auth.signOut}>
                        <p className="font-semibold">Log Out</p>
                    </button>
                :
                    <button className="primary-button w-fit" onClick={auth.signIn}>
                        <p className="font-semibold">Log In</p>
                    </button>
                }
            </section>
        </nav>
    )
}

export default Navbar;