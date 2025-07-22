import { type FormEvent } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const ContactForm = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const ACCESS_KEY = 'c2f7b7bc-fe38-4d1d-8b30-feb4fe53fca9';

        formData.append('access_key', ACCESS_KEY);

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            body: json
        }).then((res) => res.json());

        if(res.success) {
            Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success"
            });
            navigate('/')
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900 shadow-lg rounded-4xl max-w-screen-md py-8 px-4 mx-auto">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                    Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
                </p>
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
                    <div className="form-div">
                        <label htmlFor="email">Your email <span className="text-red-600">*</span></label>
                        <input name='email' type="email" id="email" placeholder="name@gmail.com" required />
                    </div>
                    <div className="form-div">
                        <label htmlFor="subject">Subject <span className="text-red-600">*</span></label>
                        <input name='subject' type="text" id="subject" placeholder="Let us know how we can help you" required />
                    </div>
                    <div className="form-div">
                        <label htmlFor="message">Your message</label>
                        <textarea name="message" id="message" placeholder="Leave a comment..."></textarea>
                    </div>
                    <button type="submit" className="primary-button">Send message</button>
                </form>
        </section>
    )
}

export default ContactForm;