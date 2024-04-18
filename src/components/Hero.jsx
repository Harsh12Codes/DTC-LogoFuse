import accountPhoto from "../assets/account.png";
import TwitterLogo from "../assets/twitter.svg";

function Hero() {
    return (
        <div className="h-full p-3 flex flex-col items-center justify-center gap-12  max-1447:gap-14  max-1240:gap-16">
            <div className=" flex flex-col">
                <span className="w-full font-extrabold text-5xl gradient-text2 animate-gradient max-1447:text-4xl max-1240:text-3xl max-578:text-2xl max-458:text-xl max-340:text-lg">
                    Want to be a part of
                </span>
                <span className="font-extrabold text-8xl max-1447:text-7xl max-1240:text-6xl max-578:text-5xl max-458:text-4xl max-340:text-3xl">
                    #Dominate<span className="text-[#01ADD9] ">Twitter</span>
                </span>
                <span className="text-sm text-gray-600 text-end max-578:text-sm max-340:text-xs">
                    Add the #dt tag on your{" "}
                    <span className="underline underline-offset-1 max-578:text-sm max-340:text-xs ">
                        profile
                    </span>{" "}
                    using this tool🔥
                </span>
            </div>

            <div className="flex flex-col justify-center items-center gap-3">
                <button
                    onClick={() => (window.location.href = "https://twitter.com/dominateXclub")}
                    className="button-twitter"
                >
                    <div className="flex gap-1 justify-center items-center">
                        <img
                            src={TwitterLogo}
                            className="text-white w-6 h-6"
                            alt="twitter-x-logo"
                        />
                        <span className="font-mono">@DominateXclub</span>
                    </div>
                </button>
                <div className="w-full flex justify-center max-1447:w-[600px]  max-1240:w-[500px] max-578:w-[400px] max-458:w-[300px] max-340:w-[250px] ">
                    <img src={accountPhoto} className="max-w-[700px] w-full" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Hero;
