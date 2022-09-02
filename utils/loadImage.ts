const caches: [File, string][] = [];

export function loadImage(file: File) {
    return new Promise<string>((res, rej) => {
        const cachedItem = caches.find(item => item[0] === file);
        if (cachedItem) {
            res(cachedItem[1]);
            return;
        }

        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                if (!reader.result || typeof reader.result !== "string") {
                    rej(new Error("undefined error"));
                    return;
                }

                caches.push([file, reader.result]);
                res(reader.result);
            },
            false,
        );
        reader.addEventListener("error", () => {
            rej(reader.error);
        });

        reader.readAsDataURL(file);
    });
}
