import DashboardBarChart from '@/app/dashboard/_components/BarChart/BarChart';
import RecentEnrollCard from '@/app/dashboard/_components/RecentEnrollCard/RecentEnrollCard';
import TotalCard from '@/app/dashboard/_components/TotalCard/TotalCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchDashboardData } from '@/lib/dashboard-helper';
import { formatPrice } from '@/lib/formatPrice';
import { getUserData } from '@/lib/getUserData';
import { Activity, DollarSign, Users } from 'lucide-react';

const AdminDashboard = async () => {
    const user = await getUserData();

    const { courses, totalEnroll, totalSalePrice, enrollByInstructorReports, recentEnrollments } =
        (await fetchDashboardData(user?.id)) ?? {};

    return (
        <div className='flex flex-col w-full'>
            <main className='flex flex-col flex-1 gap-4 p-4 md:gap-8 md:p-8'>
                <div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
                    {/* total Revenue */}
                    <TotalCard
                        title='Total Sells'
                        count={formatPrice(totalSalePrice)}
                        icon={<DollarSign className='w-4 h-4 text-muted-foreground' />}
                    />
                    {/* total enrollments */}
                    <TotalCard
                        title='Total Instructor'
                        count={totalEnroll}
                        icon={<Users className='w-4 h-4 text-muted-foreground' />}
                    />
                    {/* total courses */}
                    <TotalCard
                        title='Total Courses'
                        count={courses?.length}
                        icon={<Activity className='w-4 h-4 text-muted-foreground' />}
                    />
                    {/* total courses */}
                    <TotalCard
                        title={
                            <p className=''>
                                Total Profits <small className='text-red-500'>(15%)</small>
                            </p>
                        }
                        count={formatPrice(totalSalePrice)}
                        icon={<DollarSign className='w-4 h-4 text-muted-foreground' />}
                    />
                    {/* total courses */}
                    <TotalCard
                        title='Pending Instructor'
                        count={courses?.length}
                        icon={<Users className='w-4 h-4 text-muted-foreground' />}
                    />
                    {/* total courses */}
                    <TotalCard
                        title='Total Students'
                        count={courses?.length}
                        icon={<Users className='w-4 h-4 text-muted-foreground' />}
                    />
                </div>
                <div className='grid grid-cols-1 gap-4 md:gap-8 xl:grid-cols-3'>
                    <Card className='xl:col-span-2' x-chunk='dashboard-01-chunk-4'>
                        <CardHeader className='flex flex-row items-center'>
                            <CardTitle>Transactions Charts</CardTitle>
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
    );
};

export default AdminDashboard;
