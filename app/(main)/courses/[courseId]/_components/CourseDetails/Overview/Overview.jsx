import { CheckCheck } from "lucide-react";

const Overview = ({ overView }) => {
    const { learning, description } = overView;
    return (
        <>
            <h3 className='text-2xl '>Course Description</h3>
            <p className='mt-4'>
                {description}
            </p>
            <div className='p-8 mt-8 space-y-6 border rounded-lg bg-background'>
                <h4 className='text-2xl'>What You will Learn?</h4>
                <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                    {
                        learning?.map((learning, index) => <li key={index} className='flex space-x-3'>
                            <div className='relative flex-none top-1'>
                                <CheckCheck />
                            </div>
                            <div className='flex-1 capitalize'>
                                {learning}
                            </div>
                        </li>)
                    }

                </ul>
            </div>
        </>
    );
};

export default Overview;