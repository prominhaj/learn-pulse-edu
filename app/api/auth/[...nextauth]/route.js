import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/service/mongo';
import User from '@/modals/users-modal';

const options = NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                await dbConnect();

                const { email, password } = credentials;

                const user = await User.findOne({ email });

                if (!user) {
                    throw new Error('Email Not Found');
                }

                const isPasswordMatched = await bcrypt.compare(password, user.password);

                if (!isPasswordMatched) {
                    throw new Error('Password does not match');
                }

                return user;
            }
        })
    ],
    // callbacks: {
    //     async signIn({ account, profile }) {
    //         if (account.provider === 'google' || account.provider === 'facebook') {
    //             await connectDB();
    //             try {
    //                 const user = await User.findOne({ email: profile.email });

    //                 if (!user) {
    //                     const newUser = {
    //                         name: profile.name,
    //                         email: profile.email
    //                     };

    //                     await User.create(newUser);
    //                 }
    //             } catch (error) {
    //                 return false;
    //             }
    //             return true;
    //         }
    //         return true;
    //     },
    //     async session({ session }) {
    //         return session;
    //     }
    // },

    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    }
});

export { options as GET, options as POST };
