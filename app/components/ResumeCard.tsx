import { useEffect, useState } from "react";
import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume}) => {
    const { fs, kv } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');
    const [hovered, setHovered] = useState(false);
    
    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath)
            if (!blob) return;

            let url = URL.createObjectURL(blob);

            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath])

    const handleDelete = () => {

    }

    return (
            <Link to={`/resume/${id}`} className="resume-card amimate-in fade-in duration-1000 on-hover" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} >
                <div className="resume-card-header">
                    <div className="flex flex-col gap-2">
                        {companyName && 
                            <h2 className="!text-black font-bold break-words">
                                {companyName}
                            </h2>
                        }
                        {jobTitle &&
                            <h3 className="text-lg break-words text-gray-500">
                                {jobTitle}
                            </h3>
                        }
                        {!companyName && !jobTitle &&
                            <h2 className="!text-black font-bold">Resume</h2>
                        }
                        {hovered &&
                            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer w-fit" onClick={handleDelete}>
                                Delete
                            </button>
                        }
                    </div>
                    <div className="flax-shrink-0">
                        <ScoreCircle score={feedback.overallScore} />
                    </div>
                </div>
                {resumeUrl &&
                    <div className="gradient-border animate-in fade-in duration-1000">
                        <div className="w-full h-full">
                            <img src={resumeUrl} alt="resume" className="w-full h-[350px] max-sm:h-[200px] object-cover object-top" />
                        </div>
                    </div>
                
                }
            </Link>
    )
}

export default ResumeCard;