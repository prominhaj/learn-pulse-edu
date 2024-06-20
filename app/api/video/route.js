import { NextResponse } from 'next/server';

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const url = searchParams.get('url');

        if (!url) {
            return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
        }

        // Return the URL as a JSON response
        return NextResponse.json({ videoUrl: url });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
