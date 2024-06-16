import { CircleDollarSign, LayoutDashboard, ListChecks } from 'lucide-react';
import { CategoryForm } from './_components/category-form';
import { DescriptionForm } from './_components/description-form';
import { ImageForm } from './_components/image-form';
import { ModulesForm } from './_components/module-form';
import { PriceForm } from './_components/price-form';
import { TitleForm } from './_components/title-form';
import { CourseActions } from './_components/course-action';
import AlertBanner from '@/components/globals/AlertBanner/AlertBanner';
import { QuizSetForm } from './_components/quiz-set-form';
import { IconBadge } from '@/components/globals/IconBadge/IconBadge';

const EditCourse = () => {
    return (
        <>
            <AlertBanner
                label='This course is unpublished. It will not be visible in the course.'
                variant='warning'
            />
            <div className='p-6'>
                <div className='flex items-center justify-end'>
                    <CourseActions />
                </div>
                <div className='grid grid-cols-1 gap-6 mt-16 md:grid-cols-2'>
                    <div>
                        <div className='flex items-center gap-x-2'>
                            <IconBadge icon={LayoutDashboard} />
                            <h2 className='text-xl'>Customize your course</h2>
                        </div>
                        <TitleForm
                            initialData={{
                                title: 'Reactive Accelerator'
                            }}
                            courseId={1}
                        />
                        <DescriptionForm courseId={1} />
                        <ImageForm courseId={1} />
                        <CategoryForm courseId={1} />

                        <QuizSetForm courseId={1} />
                    </div>
                    <div className='space-y-6'>
                        <div>
                            <div className='flex items-center mb-6 gap-x-2'>
                                <IconBadge icon={ListChecks} />
                                <h2 className='text-xl'>Course Modules</h2>
                            </div>

                            <ModulesForm />
                        </div>
                        <div>
                            <div className='flex items-center gap-x-2'>
                                <IconBadge icon={CircleDollarSign} />
                                <h2 className='text-xl'>Sell you course</h2>
                            </div>
                            <PriceForm courseId={1} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EditCourse;
