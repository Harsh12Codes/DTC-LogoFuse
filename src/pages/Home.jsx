import { useEffect, useRef, useState } from "react";
import FileUpload from "../components/FileUpload";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import logo5 from "../assets/logo5.png";
import resetIcon from "../assets/reset.svg";
import {
    cropToCircle,
    cropToSquare,
    downloadImage,
    handleImageProcessing,
} from "../utils/ImageProcessing";
import Hero from "../components/Hero";

const Home = () => {
    const [baseFiles, setBaseFiles] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState(null);
    const [overlayFiles, setOverlayFiles] = useState(null);
    const [generatedFiles, setGeneratedFiles] = useState(null);
    const [shape, setShape] = useState(null);

    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleUploadFileChange = (event) => {
        setUploadedFiles(URL.createObjectURL(event.target.files[0]));
    };

    useEffect(() => {
        if (uploadedFiles !== null && overlayFiles !== null) {
            handleImageProcessing(uploadedFiles, overlayFiles)
                .then((dataUrl) => {
                    // Use the data URL to update the state
                    setGeneratedFiles(dataUrl);
                })
                .catch((error) => {
                    console.error("Error processing image:", error);
                });
        }
    }, [uploadedFiles, overlayFiles]);

    const handleOriginalCrop = () => {
        setUploadedFiles(baseFiles);
        setGeneratedFiles(null);
        setOverlayFiles(null);
    };

    const handleSquareCrop = () => {
        cropToSquare(baseFiles)
            .then((croppedImage) => {
                setUploadedFiles(croppedImage);
                setGeneratedFiles(null);
                setOverlayFiles(null);
            })
            .catch((error) => {
                console.error("Failed to crop image:", error);
            });
    };

    const handleCircleCrop = () => {
        cropToCircle(baseFiles)
            .then((croppedImage) => {
                setUploadedFiles(croppedImage);
                setGeneratedFiles(null);
                setOverlayFiles(null);
            })
            .catch((error) => {
                console.error("Failed to crop image:", error);
            });
    };

    return (
        <div className="w-full min-h-screen h-full flex flex-col items-center">
            <div className="w-full  h-full flex justify-between items-center bg-white font-inter p-4 flex-1 max-1000:flex-col max-1000:gap-8">
                <div className="flex justify-center items-center">
                    <Hero />
                </div>
                <div className="w-[500px] h-full rounded-3xl p-3 flex items-center justify-center gap-4  max-md:gap-4 flex-col max-1000:max-w-[500px] max-1000:w-full">
                    <div className="w-full flex flex-col h-[350px] ">
                        <FileUpload
                            uploadedFiles={uploadedFiles}
                            setUploadedFiles={setUploadedFiles}
                            generatedFiles={generatedFiles}
                            setGeneratedFiles={setGeneratedFiles}
                            baseFiles={baseFiles}
                            setBaseFiles={setBaseFiles}
                        />
                    </div>
                    <div className="w-full flex flex-col justify-center px-6 p-3 rounded-3xl bg-gray-200 shadow-xl h-[302px]">
                        <span>Shape</span>
                        <div className="py-4 w-full flex items-center justify-center ">
                            <div className="max-w-[200px] w-full flex gap-1 justify-between items-center">
                                <button
                                    onClick={() => {
                                        setShape("original");
                                        handleOriginalCrop();
                                    }}
                                    className={`h-[50px] w-[50px] bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer ${
                                        shape !== "original"
                                            ? "transition-all duration-300 transofrm hover:scale-105 "
                                            : "bg-green-100"
                                    }`}
                                >
                                    <img
                                        className={`h-[30px] w-[30px] animate-spin-reverse ${
                                            shape !== "original"
                                                ? "opacity-60 transition-all duration-300 transofrm hover:scale-105  "
                                                : ""
                                        }   `}
                                        src={resetIcon}
                                    />
                                </button>
                                <button
                                    onClick={() => {
                                        setShape("square");
                                        handleSquareCrop();
                                    }}
                                    className={`h-[50px] w-[50px] bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer ${
                                        shape !== "square"
                                            ? "transition-all duration-300 transofrm hover:scale-105 "
                                            : "bg-green-100"
                                    }`}
                                >
                                    <div
                                        className={`h-[30px] w-[30px] bg-orange-500 ${
                                            shape !== "square"
                                                ? "opacity-60 transition-all duration-300 transofrm hover:scale-105  "
                                                : ""
                                        }   `}
                                    />
                                </button>
                                <button
                                    onClick={() => {
                                        setShape("circle");
                                        handleCircleCrop();
                                    }}
                                    className={`h-[50px] w-[50px] bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer ${
                                        shape !== "circle"
                                            ? "transition-all duration-300 transofrm hover:scale-105 "
                                            : "bg-green-100"
                                    }`}
                                >
                                    <div
                                        className={`h-[30px] w-[30px] bg-orange-500 rounded-full ${
                                            shape !== "circle"
                                                ? "opacity-60 transition-all duration-300 transofrm hover:scale-105  "
                                                : ""
                                        }   `}
                                    />
                                </button>
                            </div>
                        </div>
                        <span>Logo</span>
                        <div className="py-4 w-full flex items-center justify-center">
                            <div className="max-w-[300px] w-full flex gap-1 justify-between items-center">
                                <div
                                    onClick={() => setOverlayFiles(logo1)}
                                    className={`h-[50px] w-[50px] bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer ${
                                        overlayFiles !== logo1
                                            ? "transition-all duration-300 transofrm hover:scale-105 "
                                            : "bg-green-100"
                                    }`}
                                >
                                    <img
                                        className={`h-[40px] w-[40px] rounded-lg ${
                                            overlayFiles !== logo1
                                                ? "opacity-60 transition-all duration-300 transofrm hover:scale-105   "
                                                : ""
                                        }   `}
                                        src={logo1}
                                        alt="logo1"
                                    />
                                </div>
                                <div
                                    onClick={() => setOverlayFiles(logo2)}
                                    className={`h-[50px] w-[50px] bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer ${
                                        overlayFiles !== logo2
                                            ? "transition-all duration-300 transofrm hover:scale-105 "
                                            : "bg-green-100"
                                    }`}
                                >
                                    <img
                                        className={`h-[40px] w-[40px] rounded-lg ${
                                            overlayFiles !== logo2
                                                ? "opacity-60 transition-all duration-300 transofrm hover:scale-105  "
                                                : ""
                                        }   `}
                                        src={logo2}
                                        alt="logo2"
                                    />
                                </div>
                                <div
                                    onClick={() => setOverlayFiles(logo3)}
                                    className={`h-[50px] w-[50px] bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer ${
                                        overlayFiles !== logo3
                                            ? "transition-all duration-300 transofrm hover:scale-105 "
                                            : "bg-green-100"
                                    }`}
                                >
                                    <img
                                        className={`h-[40px] w-[40px] rounded-lg ${
                                            overlayFiles !== logo3
                                                ? "opacity-60 transition-all duration-300 transofrm hover:scale-105  "
                                                : ""
                                        }   `}
                                        src={logo3}
                                        alt="logo3"
                                    />
                                </div>
                                <div
                                    onClick={() => setOverlayFiles(logo4)}
                                    className={`h-[50px] w-[50px] bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer ${
                                        overlayFiles !== logo4
                                            ? "transition-all duration-300 transofrm hover:scale-105 "
                                            : "bg-green-100"
                                    }`}
                                >
                                    <img
                                        className={`w-[30px]  ${
                                            overlayFiles !== logo4
                                                ? "opacity-60 transition-all duration-300 transofrm hover:scale-105  "
                                                : ""
                                        }   `}
                                        src={logo4}
                                        alt="logo4"
                                    />
                                </div>
                                <div
                                    onClick={() => setOverlayFiles(logo5)}
                                    className={`h-[50px] w-[50px] bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer ${
                                        overlayFiles !== logo5
                                            ? "transition-all duration-300 transofrm hover:scale-105 "
                                            : "bg-green-100"
                                    }`}
                                >
                                    <img
                                        className={`w-[30px]  ${
                                            overlayFiles !== logo5
                                                ? "opacity-60 transition-all duration-300 transofrm hover:scale-105  "
                                                : ""
                                        }   `}
                                        src={logo5}
                                        alt="logo5"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full pt-4 pb-3 flex justify-center items-center ">
                            <div className="flex gap-5">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleUploadFileChange}
                                    accept="image/*"
                                />
                                <button
                                    className="rounded-3xl cursor-pointer bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 transition-all duration-300 transform hover:scale-105 disabled:opacity-40"
                                    onClick={handleUploadClick}
                                >
                                    Upload
                                </button>
                                <button
                                    disabled={!uploadedFiles || !overlayFiles}
                                    className="rounded-3xl cursor-pointer bg-red-500 hover:bg-red-400 text-white py-2 px-4 transition-all duration-300 transform hover:scale-105 disabled:opacity-40"
                                    onClick={() => downloadImage(generatedFiles)}
                                >
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span className="font-mono text-sm mb-2.5 mx-4 text-center">
                Crafted with 💜 by{" "}
                <a
                    className="underline underline-offset-1"
                    href="https://twitter.com/harsh12codes"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    @harsh12codes
                </a>{" "}
                for{" "}
                <a
                    className="underline underline-offset-1"
                    href="https://twitter.com/DominateXclub"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    @DominateXclub
                </a>
            </span>
        </div>
    );
};

export default Home;
