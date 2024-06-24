import { unstable_noStore as noStore } from 'next/cache';
import HeroSection from './_components/HeroSection/HeroSection';
import CategorySection from './_components/CategorySection/CategorySection';
import CoursesSection from './_components/CoursesSection/CoursesSection';
import { getCategories } from '@/queries/categories';
import { getCourses } from '@/queries/courses';

const HomePage = async () => {
    noStore();
    const [categories, courses] = await Promise.all([getCategories(), getCourses()]);

    return (
        <>
            <HeroSection />
            <CategorySection categories={categories} />
            <CoursesSection courses={courses} />
        </>
    );
};

export default HomePage;
