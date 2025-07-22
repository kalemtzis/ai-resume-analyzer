import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";

export const meta = () => ([
    { title: 'ioResume | Profile'},
    { name: 'description', content: 'Your profile'}
])

const Profile = () => {
    const { auth, kv } = usePuterStore();
    const navigate = useNavigate(); 
    const [loadingResumes, setLoadingResumes] = useState(false);
    const [resumes, setResumes] = useState<Resume[]>([]);

    useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
        JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

      loadResumes();
    }, [])

    useEffect(() => {
        if (!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated])

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover flex flex-col justify-between">
            <Navbar />

            <section className="main-section shadow-lg bg-gray-300 rounded-lg">
                {loadingResumes && (
                    <div className="flex flex-col items-center justify-center">
                        <img src="/images/resume-scan-2.gif" className="w-[200px]" alt="scan" />
                    </div>
                )}

                {!loadingResumes && resumes.length > 0 && (
                    <div className="resumes-section">
                        {resumes.map((resume) => (
                            <ResumeCard key={resume.id} resume={resume} />
                        ))}
                    </div>
                )}

                {!loadingResumes && resumes.length === 0 && (
                    <div className="flex flex-col items-center gap-8">
                        <h2>You don't have any uploaded resumes.</h2>
                        <Link to='/upload' className="primary-button w-fit font-semibold">Upload Resume</Link>
                    </div>
                )}
            </section>

            <Footer />
        </main>
    )
}

export default Profile;