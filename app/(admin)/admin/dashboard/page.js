import DashboardBarChart from '@/app/dashboard/_components/BarChart/BarChart';
import RecentEnrollCard from '@/app/dashboard/_components/RecentEnrollCard/RecentEnrollCard';
import TotalCard from '@/app/dashboard/_components/TotalCard/TotalCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchDashboardData } from '@/lib/dashboard-helper';
import { formatPrice } from '@/lib/formatPrice';
import { getUserData } from '@/lib/getUserData';
import { cn } from '@/lib/utils';
import { calculateSales } from '@/queries/admin';
import { getTotalCourse } from '@/queries/courses';
import { getMonthEnrollmentsSell } from '@/queries/enrollments';
import { getTotalInstructor } from '@/queries/instructor';
import { getTotalUsers } from '@/queries/users';
import { BookOpen, DollarSign, TrendingDown, TrendingUp, Users } from 'lucide-react';

const AdminDashboard = async () => {
    const user = await getUserData();
    const totalInstructor = await getTotalInstructor();
    const totalCourses = await getTotalCourse();
    const { totalSales, thisMonthSales, lastMonthSales, percentChange } = await calculateSales();
    const totalUser = await getTotalUsers();
    const reportData = await getMonthEnrollmentsSell();
    console.log(reportData);

    const { courses, totalEnroll, totalSalePrice, enrollByInstructorReports, recentEnrollments } =
        (await fetchDashboardData(user?.id)) ?? {};

    return (
        <div className='flex flex-col w-full'>
            <main className='flex flex-col flex-1 gap-4 p-4 md:gap-8 md:p-8'>
                <div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
                    <TotalCard
                        title={
                            <p className='flex items-center gap-3'>
                                Total Sales
                                <small
                                    className={cn(
                                        percentChange < 0 ? 'text-red-500' : 'text-green-500',
                                        'flex items-center gap-1'
                                    )}
                                >
                                    {percentChange < 0 ? <TrendingDown /> : <TrendingUp />}
                                    {percentChange} %
                                </small>
                            </p>
                        }
                        count={formatPrice(totalSales)}
                        icon={<DollarSign className='w-4 h-4 text-muted-foreground' />}
                    />
                    <TotalCard
                        title='This Month Sales'
                        count={formatPrice(thisMonthSales)}
                        icon={<DollarSign className='w-4 h-4 text-muted-foreground' />}
                    />
                    <TotalCard
                        title='Last Month Sales'
                        count={formatPrice(lastMonthSales)}
                        icon={<DollarSign className='w-4 h-4 text-muted-foreground' />}
                    />
                    <TotalCard
                        title='Total Course'
                        count={totalCourses}
                        icon={<BookOpen className='w-4 h-4 text-muted-foreground' />}
                    />
                    <TotalCard
                        title='Total Instructor'
                        count={totalInstructor}
                        icon={<Users className='w-4 h-4 text-muted-foreground' />}
                    />
                    <TotalCard
                        title='Total Users'
                        count={totalUser}
                        icon={<Users className='w-4 h-4 text-muted-foreground' />}
                    />
                </div>
                <div className='grid grid-cols-1 gap-4 md:gap-8 xl:grid-cols-3'>
                    <Card className='xl:col-span-2'>
                        <CardHeader className='flex flex-row items-center'>
                            <CardTitle>Transactions Charts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DashboardBarChart chartData={enrollByInstructorReports} />
                        </CardContent>
                    </Card>
                    <Card>
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
