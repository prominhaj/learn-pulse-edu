"use client";

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { usePathname, useRouter } from 'next/navigation';
import LessonModalContent from '../../../../_components/lesson-modal-content';

const LessonModal = ({ courseId, moduleId, lesson }) => {
    const router = useRouter();
    const pathname = usePathname();

    const modalOpen = pathname === `/dashboard/courses/${courseId}/modules/${moduleId}/lesson/${lesson?.id}`;

    const modalClose = () => {
        router.push(`/dashboard/courses/${courseId}/modules/${moduleId}`);
    };

    return (
        <Dialog open={modalOpen} onOpenChange={modalClose}>
            <DialogContent
                className='sm:max-w-[1200px] w-[96%] max-h-[90vh]'
                onInteractOutside={(e) => e.preventDefault()}
            >
                <LessonModalContent
                    lesson={lesson}
                    courseId={courseId}
                    moduleId={moduleId}
                    modalClose={modalClose}
                />
            </DialogContent>
        </Dialog>
    );
};

export default LessonModal;
