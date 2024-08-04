import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cookies } from 'next/headers';
import ActiveInstructor from './_components/ActiveInstructor';
import PendingInstructor from './_components/PendingInstructor';

// items
const items = [
    {
        label: 'Dashboard',
        href: '/admin/dashboard'
    },
    {
        label: 'Instructors',
        current: true
    }
];

const AdminDashboardInstructorPage = () => {
    cookies();
    return (
        <>
            <BreadcrumbSection items={items} />
            <div className='px-6 py-3'>
                <Tabs defaultValue='active' className='w-full'>
                    <TabsList className='grid max-w-sm grid-cols-2 mx-auto'>
                        <TabsTrigger value='active'>Active</TabsTrigger>
                        <TabsTrigger value='pending'>Pending</TabsTrigger>
                    </TabsList>
                    <TabsContent value='active'>
                        <ActiveInstructor />
                    </TabsContent>
                    <TabsContent value='pending'>
                        <PendingInstructor />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
};

export default AdminDashboardInstructorPage;
