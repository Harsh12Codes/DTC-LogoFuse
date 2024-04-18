/* eslint-disable react/prop-types */
import { useDropzone } from "react-dropzone";
import uploadIcon from "../assets/upload.svg";

const FileUpload = (props) => {
    const {
        baseFiles,
        setBaseFiles,
        uploadedFiles,
        setUploadedFiles,
        generatedFiles,
        setGeneratedFiles,
    } = props;
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setBaseFiles(URL.createObjectURL(acceptedFiles[0]));
            setUploadedFiles(URL.createObjectURL(acceptedFiles[0]));
            setGeneratedFiles(null);
        },
    });

    return (
        <div
            {...getRootProps()}
            className="h-full w-full p-3 bg-green-100 rounded-3xl border-dashed border-2 border-green-400 cursor-pointer flex items-center justify-center shadow-xl"
        >
            <input {...getInputProps()} />
            <div
                className={`w-full h-full flex flex-col gap-[20px] justify-center items-center ${
                    baseFiles !== null ? "hidden" : ""
                } `}
            >
                <img src={uploadIcon} className="w-[200px] h-[200px]" alt="uploadIcon" />
                <span className="text-2xl opacity-50 md:text-xl sm:text-lg text-center">
                    <span className="font-bold ">Choose a file</span> or drag it here
                </span>
            </div>

            {generatedFiles ? (
                <div className="w-full h-full">
                    <img
                        src={generatedFiles}
                        alt="preview"
                        className="object-contain w-full h-full rounded-2xl"
                    />
                </div>
            ) : uploadedFiles ? (
                <div className="w-full h-full">
                    <img
                        src={uploadedFiles}
                        alt="preview"
                        className="object-contain w-full h-full rounded-2xl"
                    />
                </div>
            ) : baseFiles ? (
                <div className="w-full h-full">
                    <img
                        src={baseFiles}
                        alt="preview"
                        className="object-contain w-full h-full rounded-2xl"
                    />
                </div>
            ) : null}
        </div>
    );
};

export default FileUpload;
