import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import FileDropzone from "./components/FileDropzone";

// generative AI
import { GoogleGenerativeAI } from "@google/generative-ai";

function App(): JSX.Element {
    const [files, setFiles] = useState<File | null>();
    const [text, setText] = useState<String | null>();
    const [jobDescription, setJobDescription] = useState<string | undefined>();
    const [response, setResponse] = useState<string | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

    const pdf2text = (file: File) => {
        try {
            const reader = new FileReader();

            reader.onload = (event) => {
                if (event.target?.result) {
                    const text: string = event.target.result.toString();
                    setText(text);
                } else {
                    setText("");
                }
            };
            reader.readAsText(file);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (files) pdf2text(files);
    }, []);

    const handleJobDescriptionChange = (
        event: ChangeEvent<HTMLTextAreaElement>
    ) => {
        setJobDescription(event.target.value);
    };

    const prompt = `
  Hey Act Like a skilled or very experience ATS(Application Tracking System)
  with a deep understanding of tech field,software engineering,data science ,data analyst
  and big data engineer. Your task is to evaluate the resume based on the given job description.
  You must consider the job market is very competitive and you should provide 
  best assistance for improving thr resumes. Assign the percentage Matching based 
  on Jd and
  the missing keywords with high accuracy
  resume:${text}
  description:${jobDescription}

  I want the response in one single string having the structure
  {{"JD Match":"%","MissingKeywords:[]","Profile Summary":""}}`;

    const getResponse = async () => {
        setResponse("");
        setIsLoading(true);

        if (!files || !jobDescription) {
            setIsLoading(false);
            return setResponse("Fill the necessary data and try again.");
        }

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);
            const response = result.response.text();

            setResponse(response);
        } catch (error) {
            console.log(error);
            setResponse("Reload this page to get responses");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="dark flex justify-center items-center xl:w-[1250px] lg:w-[1100px] md:w-[700px] mx-auto min-h-dvh py-10">
                <div className="flex gap-7 flex-col w-full px-5">
                    <h1 className="md:text-4xl sm:text-2xl  font-bold">
                        Smart ATS
                    </h1>
                    <p className="md:text-lg sm:text-base font-mono text-slate-500">
                        Improve your Resume ATS
                    </p>
                    <Textarea
                        placeholder="Paste the Job Description"
                        className="rounded resize-none"
                        value={jobDescription}
                        onChange={handleJobDescriptionChange}
                    />

                    <div>
                        <p className="md:text-lg sm:text-base font-mono text-slate-500 mb-3">
                            Upload your Resume
                        </p>
                        <FileDropzone
                            onFileSelect={setFiles}
                            fileHandler={setFiles}
                        />
                    </div>
                    <div className="w-full">
                        <Button
                            onClick={getResponse}
                            variant={"destructive"}
                            className="border rounded bg-slate-500 hover:bg-slate-400"
                        >
                            Submit
                        </Button>
                    </div>

                    {isLoading
                        ? "Loading..."
                        : response && (
                              <p className="md:text-lg text-base mb-10">
                                  {response}
                              </p>
                          )}
                </div>
            </div>
        </>
    );
}

export default App;
