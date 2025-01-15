// api/utils/contentManager.js
export const saveContent = (content) => {
    localStorage.setItem('siteContent', JSON.stringify(content));
};

export const loadContent = () => {
    const saved = localStorage.getItem('siteContent');
    return saved ? JSON.parse(saved) : null;
};