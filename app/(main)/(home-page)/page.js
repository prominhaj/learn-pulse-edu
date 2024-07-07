import CategorySection from '../_components/CategorySection/CategorySection';
import CoursesSection from '../_components/CoursesSection/CoursesSection';
import HeroSection from '../_components/HeroSection/HeroSection';
import { unstable_noStore as noStore } from 'next/cache';

const HomePage = () => {
    noStore();
    return (
        <>
            <HeroSection />
            <CategorySection />
            <CoursesSection />
        </>
    );
};

export default HomePage;
