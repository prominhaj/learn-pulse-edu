import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

const BreadcrumbSection = ({ items }) => {
    return (
        <Breadcrumb className='px-6 pt-3'>
            <BreadcrumbList>
                {
                    items?.map(item => (
                        <>
                            <BreadcrumbItem key={item.label}>
                                {item?.href ? (
                                    <Link href={item.href}>
                                        {item.label}
                                    </Link>
                                ) : (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                            {
                                !item?.current && <BreadcrumbSeparator />
                            }
                        </>
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbSection;