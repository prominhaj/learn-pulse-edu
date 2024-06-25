import HeroSection from './_components/HeroSection/HeroSection';
import CategorySection from './_components/CategorySection/CategorySection';
import CoursesSection from './_components/CoursesSection/CoursesSection';
import { getCategories } from '@/queries/categories';
import { getCourses } from '@/queries/courses';

const HomePage = async () => {
    const categories = await getCategories()

    return (
        <>
            <HeroSection />
            <CategorySection categories={categories} />
            <CoursesSection />
        </>
    );
};

export default HomePage;
