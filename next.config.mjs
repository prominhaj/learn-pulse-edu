/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**'
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/account/**'
            }
        ]
    }
};

export default nextConfig;
