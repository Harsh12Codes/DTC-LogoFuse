import { saveAs } from "file-saver";

export const handleImageProcessing = (baseImage, overlayImage) => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let baseImg = new Image();
        let overlayImg = new Image();

        baseImg.onload = () => {
            canvas.width = baseImg.width;
            canvas.height = baseImg.height;
            ctx.drawImage(baseImg, 0, 0);

            overlayImg.onload = () => {
                const minValue = Math.min(baseImg.width, baseImg.height);
                const overlayWidth = minValue * 0.2;
                const overlayHeight = minValue * 0.2;
                const x = (baseImg.width - overlayWidth) / 2;
                const y = baseImg.height - overlayHeight - 0.02 * baseImg.height;

                ctx.drawImage(overlayImg, x, y, overlayWidth, overlayHeight);

                // Convert canvas to data URL and resolve the promise
                resolve(canvas.toDataURL());
            };

            overlayImg.onerror = reject;
            overlayImg.src = overlayImage;
        };

        baseImg.onerror = reject;
        baseImg.src = baseImage;
    });
};

export const downloadImage = (dataUrl, filename = "image.png") => {
    // Convert data URL to blob
    const byteString = atob(dataUrl.split(",")[1]);
    const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: mimeString });

    // Download blob as file
    saveAs(blob, filename);
};

export const cropToSquare = (imageSrc) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const size = Math.min(img.width, img.height);
            const canvas = document.createElement("canvas");
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(
                img,
                (img.width - size) / 2,
                (img.height - size) / 2,
                size,
                size,
                0,
                0,
                size,
                size,
            );
            canvas.toBlob(
                (blob) => {
                    resolve(URL.createObjectURL(blob));
                },
                "image/jpeg",
                1,
            );
        };
        img.onerror = () => {
            reject(new Error("Failed to load image"));
        };
        img.src = imageSrc;
    });
};

export const cropToCircle = (imageSrc) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const size = Math.min(img.width, img.height);
            const canvas = document.createElement("canvas");
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(
                img,
                (img.width - size) / 2,
                (img.height - size) / 2,
                size,
                size,
                0,
                0,
                size,
                size,
            );
            ctx.restore();
            canvas.toBlob(
                (blob) => {
                    resolve(URL.createObjectURL(blob));
                },
                "image/png",
                1,
            );
        };
        img.onerror = () => {
            reject(new Error("Failed to load image"));
        };
        img.src = imageSrc;
    });
};
