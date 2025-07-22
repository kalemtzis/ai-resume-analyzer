import { useEffect } from "react";
import { useNavigate } from "react-router";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";

export const meta = () => ([
    { title: 'Resumind | Profile'},
    { name: 'description', content: 'Your profile'}
])

const Profile = () => {
    const { auth } = usePuterStore();
    const navigate = useNavigate(); 

    useEffect(() => {
        if (!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated])

    return (
        <main>
            <Navbar />
            <Footer />
        </main>
    )
}

export default Profile;