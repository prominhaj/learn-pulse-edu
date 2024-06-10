import CategoryCardLoading from './_components/CategoryCardLoading/CategoryCardLoading';

const CategorySectionLoading = () => {
    return (
        <div className='grid justify-center grid-cols-2 gap-4 mx-auto md:grid-cols-3 2xl:grid-cols-4'>
            {Array.from({ length: 8 }).map((_, index) => (
                <CategoryCardLoading key={index} />
            ))}
        </div>
    );
};

export default CategorySectionLoading;
