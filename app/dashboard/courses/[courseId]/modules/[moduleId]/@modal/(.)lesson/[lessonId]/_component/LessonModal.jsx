"use client";

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import LessonModalContent from '../../../../_components/lesson-modal-content';

const LessonModal = ({ courseId, moduleId, lesson }) => {
    const router = useRouter();

    const modalClose = () => {
        router.back()
    }

    return (
        <Dialog defaultOpen={true} open={true} onOpenChange={modalClose}>
            <DialogContent
                className='sm:max-w-[1200px] w-[96%] max-h-[90vh]'
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
            >
                <>
                    <LessonModalContent
                        lesson={lesson}
                        courseId={courseId}
                        moduleId={moduleId}
                        modalClose={modalClose} />
                </>
            </DialogContent>
        </Dialog>
    );
};

export default LessonModal;