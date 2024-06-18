"use client";

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import LessonModalContent from '../../../../_components/lesson-modal-content';

const LessonModal = ({ courseId, lesson }) => {
    const router = useRouter();

    return (
        <Dialog defaultOpen={true} open={true} onOpenChange={() => router.back()}>
            <DialogContent
                className='sm:max-w-[1200px] w-[96%] overflow-y-auto max-h-[90vh]'
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
            >
                <>
                    <LessonModalContent lesson={lesson} courseId={courseId} />
                </>
            </DialogContent>
        </Dialog>
    );
};

export default LessonModal;