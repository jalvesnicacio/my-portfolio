import fs from "fs";
import path from "path";

/**
 * Remove arquivos físicos do diretório uploads
 * @param {Array<{ url: string }>} mediaList
 */
export function removeMediaFiles(mediaList = []) {
    mediaList.forEach(media => {
        if (!media?.url) return;

        const filename = media.url.split("/uploads/")[1];
        if (!filename) return;

        const filePath = path.join(process.cwd(), "uploads", filename);

        fs.unlink(filePath, err => {
            if (err) {
                console.warn("⚠️ File not found or already removed:", filePath);
            }
        });
    });
}