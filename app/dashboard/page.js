import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/formatPrice';
import RecentEnrollCard from './_components/RecentEnrollCard';
import TotalCard from './_components/TotalCard';
import { getUserData } from '@/lib/getUserData';
import { fetchDashboardData } from '@/lib/dashboard-helper';
import NoAccess from '@/components/globals/NoAccess/NoAccess';
import { Activity, DollarSign, Users } from 'lucide-react';
import DashboardBarChart from './_components/BarChart';

export const dynamic = 'force-dynamic';

const DashboardPage = async () => {
    const user = await getUserData();

    if (!user || user?.role !== 'Teacher') {
        return <NoAccess />;
    }

    const { courses, totalEnroll, totalSalePrice, enrollByInstructorReports, recentEnrollments } =
        (await fetchDashboardData(user?.id)) ?? {};

    return (
        <>
            <div className='flex flex-col w-full'>
                <main className='flex flex-col flex-1 gap-4 p-4 md:gap-8 md:p-8'>
                    <div className='grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-3'>
                        {/* total Revenue */}
                        <TotalCard
                            title='Total Revenue'
                            count={formatPrice(totalSalePrice)}
                            icon={<DollarSign className='w-4 h-4 text-muted-foreground' />}
                        />
                        {/* total enrollments */}
                        <TotalCard
                            title='Total Enrollments'
                            count={totalEnroll}
                            icon={<Users className='w-4 h-4 text-muted-foreground' />}
                        />
                        {/* total courses */}
                        <TotalCard
                            title='Total Courses'
                            count={courses?.length}
                            icon={<Activity className='w-4 h-4 text-muted-foreground' />}
                        />
                    </div>
                    <div className='grid grid-cols-1 gap-4 md:gap-8 xl:grid-cols-3'>
                        <Card className='xl:col-span-2' x-chunk='dashboard-01-chunk-4'>
                            <CardHeader className='flex flex-row items-center'>
                                <div className='grid gap-2'>
                                    <CardTitle>Transactions Charts</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <DashboardBarChart chartData={enrollByInstructorReports} />
                            </CardContent>
                        </Card>
                        <Card x-chunk='dashboard-01-chunk-5'>
                            <CardHeader>
                                <CardTitle>Recent Enrollments</CardTitle>
                            </CardHeader>
                            <CardContent className='grid gap-5 md:gap-8'>
                                {recentEnrollments?.length === 0 ? (
                                    <p className='text-lg font-medium text-center text-muted-foreground'>
                                        No Recent Enroll Course
                                    </p>
                                ) : (
                                    recentEnrollments?.map((enroll) => (
                                        <RecentEnrollCard key={enroll.id} enroll={enroll} />
                                    ))
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </>
    );
};

export default DashboardPage;
