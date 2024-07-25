
const Footer = () => {
    return (
        <footer className='py-4 mt-auto bg-muted text-muted-foreground'>
            <div className='container mx-auto text-sm text-center'>
                &copy; {new Date().getFullYear()} My Blog. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;