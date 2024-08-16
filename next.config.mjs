import withPlaiceholder from '@plaiceholder/next';
import withPWA from '@ducanh2912/next-pwa';

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
                hostname: 'res.cloudinary.com'
            }
        ]
    }
};

export default withPWA({
    dest: 'public',
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    disable: false,
    workboxOptions: {
        disableDevLogs: true
    }
})(withPlaiceholder(nextConfig));
