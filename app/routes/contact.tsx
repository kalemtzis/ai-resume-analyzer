import { useEffect } from "react";
import { useNavigate } from "react-router";
import ContactForm from "~/components/ContactForm";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";

export const meta = () => ([
    { title: 'Resumind | Contact' },
    { name: 'description', content: 'Contact Us' },
])

const Contact = () => {
    const { auth } = usePuterStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated) navigate('/auth?next=/')
    }, [auth.isAuthenticated])
    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            
            <section className="min-h-screen flex items-center justify-center animate-in fade-in duration-1000">
                <ContactForm />
            </section>

            <Footer />
        </main>
    )
}

export default Contact;