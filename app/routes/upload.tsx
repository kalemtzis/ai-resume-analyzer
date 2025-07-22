import { useEffect, useState, type FormEvent } from 'react';
import Navbar from '../components/Navbar';
import FileUploader from '~/components/FileUploader';
import { usePuterStore } from '~/lib/puter';
import { useNavigate } from 'react-router';
import { convertPdfToImage } from '~/lib/pdf2image';
import { generateUUID } from '~/lib/utils';
import { prepareInstructions } from 'constants/index';

export const meta = () => ([
    { title: 'ioResume | Upload' },
    { name: 'description', content: 'Upload resume to analyze' },
])

const Upload = () => {
    const { auth, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, SetIsProcessing] = useState(false);
    const [statusText, SetStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (!auth.isAuthenticated) navigate('/auth?next=/')
    }, [auth.isAuthenticated])

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File}) => {
        SetIsProcessing(true);
        SetStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);

        if(!uploadedFile) return SetStatusText('Error: Failed to upload file');

        SetStatusText('Converting to image...');
        
        const imageFile = await convertPdfToImage(file);
        
        if(!imageFile.file) return SetStatusText('Error: Failed to convert PDF to image');

        SetStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);

        if (!uploadedImage) return SetStatusText('Error: Failed to upload image');

        SetStatusText('Preparing data...');

        const uuid = generateUUID();

        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName,
            jobTitle,
            jobDescription,
            feedback: '',
        }

        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        SetStatusText('Analyzing...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription }),
        );

        if (!feedback) return SetStatusText('Error: Failed to analyze the resume');

        const feedbackText = typeof feedback.message.content === 'string' ? feedback.message.content : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);

        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        SetStatusText('Analysis complete, redirecting...');

        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;

        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if (!file) return;
        
        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />

            <section className='main-section animate-in fade-in duration-1000'>
                <div className='page-heading py-16'>
                    <h1>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src='/images/resume-scan.gif' className='w-full'/>
                        </>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                    )}

                    {!isProcessing && (
                        <form id='upload-form' onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                            <div className='form-div'>
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" name='company-name' placeholder='Company Name' id='company-name' />
                            </div>
                            
                            <div className='form-div'>
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name='job-title' placeholder='Job Title' id='job-title' />
                            </div>
                            
                            <div className='form-div'>
                                <label htmlFor="company-description">Company Description</label>
                                <input type="text" name='company-description' placeholder='Company Description' id='company-description' />
                            </div>

                            <div className='form-div'>
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect}/>
                            </div>

                            <button className='primary-button' type='submit'>Analyze Resume</button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}

export default Upload;