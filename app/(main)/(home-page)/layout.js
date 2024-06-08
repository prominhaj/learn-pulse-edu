const HomePageLayout = ({ children, categories, courses }) => {
    return (
        <>
            {children}
            {categories}
            {courses}
        </>
    );
};

export default HomePageLayout;
