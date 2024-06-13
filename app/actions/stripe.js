'use server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { getCourseDetails } from '@/queries/courses';
import { formatAmountForStripe } from '@/lib/formatAmountForStripe';

const CURRENCY = 'usd';

export const createCheckoutSession = async (courseId) => {
    const ui_mode = 'hosted';
    const origin = headers().get('origin');
    const { course } = await getCourseDetails(courseId);

    try {
        if (!course) return new Error(`Course not found`);

        const courseName = course?.title;
        const coursePrice = course?.price;

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: 'payment',
            submit_type: 'auto',
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: CURRENCY,

                        product_data: {
                            name: courseName
                        },

                        unit_amount: formatAmountForStripe(coursePrice, CURRENCY)
                    }
                }
            ],
            ...(ui_mode === 'hosted' && {
                success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,
                cancel_url: `${origin}/courses`
            }),
            ui_mode
        });

        // Return the checkout session
        return {
            client_secret: checkoutSession.client_secret,
            url: checkoutSession.url
        };
    } catch (error) {
        throw new Error(error);
    }
};

export const createPaymentIntent = async (_data) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: formatAmountForStripe(coursePrice, CURRENCY),
        automatic_payment_methods: { enabled: true },
        currency: CURRENCY
    });

    return { client_secret: paymentIntent.client_secret };
};
