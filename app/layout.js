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
    title: 'Learn Pulse Edu',
    description: 'Explore || Learn || Build || Share'
};

export default async function RootLayout({ children }) {
    // Connect to MongoDB
    const conc = await dbConnect();

    return (
        <html lang='en'>
            <body className={cn(inter.variable, poppins.variable)}>
                <>
                    <ThemeProvider
                        attribute='class'
                        defaultTheme='system'
                        enableSystem
                        disableTransitionOnChange
                    >
                        <SessionProvider>{children}</SessionProvider>
                    </ThemeProvider>
                </>
                <Toaster richColors position='top-center' />
            </body>
            <GoogleAnalytics gaId={process.env.GoogleAnalytics_KEY} />
        </html>
    );
}
