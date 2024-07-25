import HeroSection from '../_components/HeroSection/HeroSection';

const HomePageLayout = ({ category, course }) => {
    return (
        <>
            <HeroSection />
            {category}
            <div className='bg-gradient-to-b from-transparent via-[#E3F3FB] to-transparent dark:bg-gradient-to-b dark:from-transparent dark:via-[#19193C] dark:to-transparent'>
                {course}
            </div>
        </>
    );
};

export default HomePageLayout;
