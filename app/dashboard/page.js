import BarChart from '@/components/globals/BarChart/BarChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/formatPrice';
import RecentEnrollCard from './_components/RecentEnrollCard';
formatPrice;

const DashboardPage = async () => {
    return (
        <div className='p-6 font-poppins'>
            <div className='grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-3'>
                {/* total courses */}
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                        <CardTitle className='text-lg font-medium tracking-wide'>
                            Total Courses
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>15</div>
                    </CardContent>
                </Card>
                {/* total enrollments */}
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                        <CardTitle className='text-lg font-medium tracking-wide'>
                            Total Enrollments
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>1000</div>
                    </CardContent>
                </Card>
                {/* total Revinue */}
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                        <CardTitle className='text-lg font-medium tracking-wide'>
                            Total Revenue
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>{formatPrice(12000)}</div>
                    </CardContent>
                </Card>
            </div>
            <div className='grid grid-cols-1 gap-5 pt-3 md:pt-5 xl:grid-cols-3'>
                <Card className='py-3 xl:col-span-2'>
                    <BarChart />
                </Card>
                <Card className='p-3'>
                    <CardTitle className='text-xl font-medium tracking-wide'>
                        Recent Enrollments
                    </CardTitle>
                    <div className='pt-5'>
                        <RecentEnrollCard />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
