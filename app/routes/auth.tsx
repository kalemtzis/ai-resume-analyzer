import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import AuthNavbar from "~/components/AuthNavbar";
import { usePuterStore } from "~/lib/puter";
import Footer from '~/components/Footer';

export const meta = () => ([
    { title: 'ioResume | Auth' },
    { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])
    
    return (
        <div>
            <AuthNavbar />
            
            <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center animate-in fade-in duration-1000">
                <div className="gradient-border shadow-lg bg-gray-100">
                    <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <h1>Welcome</h1>
                            <h2>Log In to Continue Your Job Journey</h2>
                        </div>
                        <div>
                            {isLoading ? (
                                <button className="auth-button animate-pulse">
                                    <p>Signing you in...</p>
                                </button>
                            ) : (
                                <>
                                    {auth.isAuthenticated ? (
                                        <button className="auth-button" onClick={auth.signOut}>
                                            <p>Log Out</p>
                                        </button>
                                    ) : (
                                        <button className="auth-button" onClick={auth.signIn}>
                                            <p>Log In</p>
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Auth;