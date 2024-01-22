import React, { useRef, useState } from "react";
import { Button } from "./ui/button";

interface FileDropzoneProps {
    fileHandler: (file: File | null) => void;
    onFileSelect: (file: File) => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ fileHandler, onFileSelect }) => {
    const [files, setFiles] = useState<File | null>();
    const [error, setError] = useState<string | null>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const droppedFiles = Array.from(e.dataTransfer.files) as File[];

        if (droppedFiles[0] && droppedFiles.length === 1 && fileHandler) {
            if (droppedFiles[0].type === "application/pdf") {
                setFiles(droppedFiles[0]);
                fileHandler(droppedFiles[0]);
                setError("");
            } else {
                setFiles(null);
                fileHandler(null);
                setError("Drop .PDF files only");
            }
        } else {
            setFiles(null);
            fileHandler(null);
            setError("Select one file at a time");
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            onFileSelect(selectedFile);
            setFiles(selectedFile);
        }
    };

    return (
        <>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`w-full h-28 border-dashed 
                ${ error ? "border-red-500" : (files ? "border-green-500" : "border-slate-400")}
                border-2 rounded cursor-pointer flex px-4 items-center gap-4`}
            >
                <svg
                    className="w-10 h-10 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.6"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                </svg>
                <div className="flex items-center justify-between w-full">
                    <div>
                        <p>Drag and drop PDF files here</p>
                        <p className="text-slate-400">Limit One file.PDF per request</p>
                    </div>
                    <div>
                        <Button onClick={handleButtonClick} className="border rounded text-slate-700 bg-slate-200 hover:bg-slate-500">
                            Browse Files
                        </Button>
                        <input
                            type="file"
                            accept=".pdf"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
            </div>

            {files && !error && (
                <p className="mt-2">Selected files: &nbsp; {files.name}</p>
            )}
            {error && !files && <p className="text-red-500 mt-2">{error}</p>}
        </>
    );
};

export default FileDropzone;
