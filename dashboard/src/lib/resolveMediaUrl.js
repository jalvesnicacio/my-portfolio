const API_HOST =
    import.meta.env.VITE_API_URL || "http://localhost:5001";

export function resolveMediaUrl(url) {
    if (!url) return "";

    // Já é absoluta → normaliza host
    if (url.startsWith("http")) {
        return url
            .replace("http://server:5001", API_HOST)
            .replace("http://localhost:5001", API_HOST);
    }

    // É relativa → prefixa com host
    if (url.startsWith("/uploads")) {
        return `${API_HOST}${url}`;
    }

    // Fallback defensivo
    return `${API_HOST}/uploads/${url}`;
}