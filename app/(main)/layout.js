import Footer from '@/components/globals/Footer/Footer';
import Navbar from '@/components/globals/Navbar/Navbar';

// Metadata
export const metadata = {
    title: 'Learn Pulse Edu'
};

const MainLayout = ({ children }) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <header className='fixed top-0 left-0 right-0 z-40 border-b bg-background/60 backdrop-blur-md'>
                <nav className='container flex items-center justify-between h-20 px-4 py-3 md:px-8 md:py-6'>
                    <Navbar />
                </nav>
            </header>
            <main className='flex flex-col flex-1 pt-20'>{children}</main>
            <footer className='border-t bg-background/60 backdrop-blur-md'>
                <Footer />
            </footer>
        </div>
    );
};
export default MainLayout;
