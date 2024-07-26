import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Tiktok,
    Youtube,
    Snail,
} from 'lucide-react';

const socialMediaIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    tiktok: Tiktok,
    youtube: Youtube,
    snapchat: Snail,
};


const SocialMedia = ({ links }) => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
            {Object.entries(links).map(([key, url]) => {
                const Icon = socialMediaIcons[key];
                if (!Icon) return null;
                return (
                    <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                        <Icon size={24} />
                    </a>
                );
            })}
        </div>
    );
};

export default SocialMedia;