import Contact from "./Contact";
import ChangePassword from "../ChangePassword/ChangePassword";

const ContactInfo = ({ user }) => {

    return (
        <div className='p-5 transition-all duration-500 ease-in-out border rounded-md bg-background mt-7'>
            <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
                <Contact userId={user?.id} socialMediaData={user?.socialMedia} phone={user?.phone} />
                <ChangePassword userId={user?.id} />
            </div>
        </div>
    );
};

export default ContactInfo;