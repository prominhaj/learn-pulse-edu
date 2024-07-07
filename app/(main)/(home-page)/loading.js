import CategorySectionLoading from '../_components/CategorySection/CategorySectionLoading';
import CoursesSectionLoading from '../_components/CoursesSection/CoursesSectionLoading';
import HeroSectionLoading from '../_components/HeroSection/HeroSectionLoading';

const HomePageLoading = () => {
    return (
        <>
            <HeroSectionLoading />
            <CategorySectionLoading />
            <CoursesSectionLoading />
        </>
    );
};

export default HomePageLoading;
