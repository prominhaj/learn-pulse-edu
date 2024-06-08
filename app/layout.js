import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import ThemeProvider from '@/Providers/ThemeProvider';

// Font Family
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins'
});

// Metadata
export const metadata = {
    title: 'Learn Pulse Edu',
    description: 'Explore || Learn || Build || Share'
};

export default function RootLayout({ children }) {
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
                        {children}
                    </ThemeProvider>
                </>
                <Toaster richColors position='top-center' />
            </body>
        </html>
    );
}
