import PersonalDetails from './_components/PersonalDetails/PersonalDetails';
import { getServerSession } from 'next-auth';
import { getUserByEmail } from '@/queries/users';
import ContactInfo from './_components/ContactInfo/ContactInfo';

const Profile = async () => {
    const { user } = await getServerSession();
    const loginUser = await getUserByEmail(user.email);

    return (
        <>
            <PersonalDetails user={loginUser} />
            <ContactInfo user={loginUser} />
        </>
    );
};

export default Profile;
