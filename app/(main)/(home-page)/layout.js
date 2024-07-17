import HeroSection from '../_components/HeroSection/HeroSection';

const HomePageLayout = ({ category, course }) => {
    return (
        <>
            <HeroSection />
            {category}
            {course}
        </>
    );
};

export default HomePageLayout;
