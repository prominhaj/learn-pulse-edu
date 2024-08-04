import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cookies } from 'next/headers';

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
                <Tabs defaultValue='active' className='max-w-sm mx-auto'>
                    <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='active'>Active</TabsTrigger>
                        <TabsTrigger value='pending'>Pending</TabsTrigger>
                    </TabsList>
                    <TabsContent value='active'></TabsContent>
                    <TabsContent value='pending'></TabsContent>
                </Tabs>
            </div>
        </>
    );
};

export default AdminDashboardInstructorPage;
