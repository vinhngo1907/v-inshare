import { useState } from "react";
function ProgressBar({ percentage, label
    , startUpload,
    // getIsUploaded
}) {
    const [isUploaded, setIsUploaded] = useState(false);
    const scaleX = `scaleX(${percentage / 100})`;
    return (
        <>
            <div className="progress-container"
                style={{
                    display: startUpload? 'block' : 'none'
                }}
            >
                <div className="bg-progress" style={{ transform: scaleX }}></div>

                <div className="inner-container">
                    {/* <div className="status">{(percentage && percentage < 100) ? "Uploading..." : "Uploaded"}</div> */}
                    <div className="status">{(percentage && percentage / 100 !== 1) ? "Uploading..." : "Uploaded"}</div>
                    <div className="percent-container">
                        <span className="percentage" id="progressPercent">
                            {label}
                        </span>
                    </div>
                    <div className="progress-bar" style={{ transform: scaleX }} ></div>
                </div>
            </div>
        </>
    )
}

export default ProgressBar