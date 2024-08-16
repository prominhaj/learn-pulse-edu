import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import ThemeProvider from '@/Providers/ThemeProvider';
import { dbConnect } from '@/service/mongo';
import SessionProvider from '@/Providers/SessionProvider';
import { GoogleAnalytics } from '@next/third-parties/google';

// Font Family
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins'
});

// Metadata
export const metadata = {
    manifest: '/manifest.json',
    title: 'Learn Pulse Edu',
    description: 'Explore || Learn || Build || Share',
    generator: 'Next.js',
    applicationName: 'Learn Pulse Edu',
    keywords: [
        'Next.js',
        'React',
        'JavaScript',
        'Learn Pulse Edu',
        'Pulse',
        'Edu',
        'Course',
        'Learn'
    ],
    authors: [{ name: 'Pro Minhaj', url: process.env.BASE_URL }],
    creator: 'Pro Minhaj',
    openGraph: {
        title: 'Learn Pulse Edu',
        description: 'Explore || Learn || Build || Share',
        url: process.env.BASE_URL,
        type: 'website',
        images: [
            {
                url: `${process.env.BASE_URL}/open-grash-image.png`,
                width: 800,
                height: 600,
                alt: 'Learn Pulse Edu Image'
            }
        ]
    }
};

export const viewport = {
    themeColor: '#FFFFFF'
};

export default async function RootLayout({ children }) {
    // Connect to MongoDB
    const conc = await dbConnect();

    return (
        <html lang='en'>
            <body className={cn(inter.variable, poppins.variable)}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                    disableTransitionOnChange
                >
                    <SessionProvider>{children}</SessionProvider>
                </ThemeProvider>
                <Toaster richColors position='top-center' />
            </body>
            <GoogleAnalytics gaId={process.env.GoogleAnalytics_KEY} />
        </html>
    );
}
