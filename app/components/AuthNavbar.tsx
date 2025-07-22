import { usePuterStore } from "~/lib/puter";

const AuthNavbar = () => {
    const { auth } = usePuterStore();

    return (
        <nav className="navbar gradient-border shadow-lg">
            <p className="text-2xl font-bold flex flex-col items-center justify-center text-gradient">
                RESUMIND
            </p>
            <p className="text-sm h-fit italic font-semibold">
                Track your Applications & Resume Ratings
            </p>
            {!auth.isAuthenticated ?
                <button className="primary-button w-fit" onClick={auth.signIn}>
                    <p className="font-semibold">Log In</p>
                </button>
            :
                <button className="primary-button w-fit" onClick={auth.signOut}>
                    <p className="font-semibold">Log Out</p>
                </button>
            }
        </nav>
    )
}

export default AuthNavbar;