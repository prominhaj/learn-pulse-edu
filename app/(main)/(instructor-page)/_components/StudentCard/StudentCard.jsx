import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import moment from 'moment';

const StudentCard = ({ student }) => {
    const { firstName, lastName, enrollment_date, designation, createdAt, bio, updatedAt } = student;

    return (
        <>
            <div className='p-3 transition-all duration-500 ease-in-out border rounded-md md:p-5 bg-background'>
                <div className='flex flex-col items-center justify-center gap-3 pb-2 border-b'>
                    <Avatar className='w-16 h-16'>
                        <AvatarImage className="object-cover" src={student?.profilePicture?.url} />
                        <AvatarFallback>{firstName}</AvatarFallback>
                    </Avatar>
                    <div className='space-y-1 text-center'>
                        <h3 className='text-xl font-semibold'>
                            {firstName + " " + lastName}
                        </h3>
                        <div className='text-sm text-muted-foreground'>
                            {designation}
                        </div>
                        <p className='text-muted-foreground'>
                            <small>
                                Joined: {moment(createdAt).format('ll')}
                            </small>
                        </p>
                    </div>
                </div>
                <div className='pt-2 space-y-1.5 text-muted-foreground'>
                    <p>
                        Enrollment Date: {moment(enrollment_date).startOf('hour').fromNow()}
                    </p>
                    <p>
                        Last Updated: {moment(updatedAt).startOf('hour').fromNow()}
                    </p>
                    {
                        bio && (
                            <div className='mt-2 border-t'>
                                <p className='mt-1 italic text-center'>
                                    <small>
                                        &#39; {bio} &rsquo;
                                    </small>
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default StudentCard;