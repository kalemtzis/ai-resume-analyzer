import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        subject: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;

        const formData = new FormData(form);

        if(!formData) return;

        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        console.log(email, subject, message)

        navigate('/')
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
                        <input type="email" id="email" placeholder="name@gmail.com" required />
                    </div>
                    <div className="form-div">
                        <label htmlFor="subject">Subject <span className="text-red-600">*</span></label>
                        <input type="text" id="subject" placeholder="Let us know how we can help you" required />
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