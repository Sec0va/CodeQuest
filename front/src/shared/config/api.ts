const explicitApiBase = import.meta.env.VITE_API_BASE;
const localApiBase = 'http://localhost:8080';

export const API_BASE = explicitApiBase ?? (import.meta.env.PROD ? '' : localApiBase);
