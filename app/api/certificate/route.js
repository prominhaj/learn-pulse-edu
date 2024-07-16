import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { getUserData } from '@/lib/getUserData';
import { getCourseDetails } from '@/queries/courses';
import { getAReport } from '@/queries/reports';
import { formatMyDate } from '@/lib/date';
import { getCourseProgress } from '@/lib/course';
import { NextResponse } from 'next/server';

// Fetch custom fonts
const fetchFont = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch font from ${url}`);
    }
    return response.arrayBuffer();
};

export const dynamic = 'force-dynamic';

export const GET = async (request) => {
    try {
        const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
        const searchParams = request.nextUrl.searchParams;
        const courseId = searchParams.get('courseId');
        const { course } = await getCourseDetails(courseId);
        const loggedInUser = await getUserData();
        const courseProgress = await getCourseProgress(course?.id);

        if (!loggedInUser || !course) {
            return NextResponse.json({ success: false, message: 'Unauthorized access' });
        }

        if (courseProgress !== 100) {
            return NextResponse.json({
                success: false,
                message: 'Course progress must be 100% to generate a certificate'
            });
        }

        const report = await getAReport({ course_id: courseId, user_id: loggedInUser.id });
        const completionDate = report?.completion_date
            ? formatMyDate(report?.completion_date)
            : formatMyDate(Date.now());

        const completionInfo = {
            name: `${loggedInUser?.firstName} ${loggedInUser?.lastName}`,
            completionDate,
            courseName: course.title,
            instructor: `${course?.instructor?.firstName} ${course?.instructor?.lastName}`,
            instructorDesignation: `${course?.instructor?.designation}`,
            sign: `${baseUrl}/sign.png`
        };

        const kalamFontBytes = await fetchFont(`${baseUrl}/fonts/kalam/Kalam-Regular.ttf`);
        const montserratItalicFontBytes = await fetchFont(
            `${baseUrl}/fonts/montserrat/Montserrat-Italic.ttf`
        );
        const montserratFontBytes = await fetchFont(
            `${baseUrl}/fonts/montserrat/Montserrat-Medium.ttf`
        );

        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit);

        const kalamFont = await pdfDoc.embedFont(kalamFontBytes);
        const montserratItalic = await pdfDoc.embedFont(montserratItalicFontBytes);
        const montserrat = await pdfDoc.embedFont(montserratFontBytes);

        const page = pdfDoc.addPage([841.89, 595.28]);
        const { width, height } = page.getSize();
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

        const drawCenteredText = (text, y, font, size, color) => {
            const textWidth = font.widthOfTextAtSize(text, size);
            page.drawText(text, {
                x: width / 2 - textWidth / 2,
                y,
                size,
                font,
                color
            });
        };

        const logoBytes = await fetchFont(`${baseUrl}/logo.png`);
        const logo = await pdfDoc.embedPng(logoBytes);
        const logoDimns = logo.scale(0.5);
        page.drawImage(logo, {
            x: width / 2 - logoDimns.width / 2,
            y: height - 120,
            width: logoDimns.width,
            height: logoDimns.height
        });

        drawCenteredText(
            'Certificate Of Completion',
            height - (logoDimns.height + 125),
            montserrat,
            30,
            rgb(0, 0.53, 0.71)
        );
        drawCenteredText(
            'This certificate is here by bestowed upon',
            height - (logoDimns.height + 170),
            montserratItalic,
            20,
            rgb(0, 0, 0)
        );
        drawCenteredText(
            completionInfo.name,
            height - (logoDimns.height + 230),
            kalamFont,
            40,
            rgb(0, 0, 0)
        );

        const detailsText = `This is to certify that ${completionInfo.name} successfully completed the ${completionInfo.courseName} course on ${completionInfo.completionDate} by ${completionInfo.instructor}`;
        page.drawText(detailsText, {
            x: width / 2 - 700 / 2,
            y: height - 330,
            size: 16,
            font: montserrat,
            color: rgb(0, 0, 0),
            maxWidth: 700,
            wordBreaks: [' ']
        });

        const signatureBoxWidth = 300;
        page.drawText(completionInfo.instructor, {
            x: width - signatureBoxWidth,
            y: 90,
            size: 16,
            font: timesRomanFont,
            color: rgb(0, 0, 0)
        });
        page.drawText(completionInfo.instructorDesignation, {
            x: width - signatureBoxWidth,
            y: 72,
            size: 10,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
            maxWidth: 250
        });
        page.drawLine({
            start: { x: width - signatureBoxWidth, y: 110 },
            end: { x: width - 60, y: 110 },
            thickness: 1,
            color: rgb(0, 0, 0)
        });

        const signBytes = await fetchFont(completionInfo.sign);
        const sign = await pdfDoc.embedPng(signBytes);
        page.drawImage(sign, {
            x: width - signatureBoxWidth,
            y: 100,
            width: 180,
            height: 54
        });

        const patternBytes = await fetchFont(`${baseUrl}/pattern.jpg`);
        const pattern = await pdfDoc.embedJpg(patternBytes);
        page.drawImage(pattern, {
            x: 0,
            y: 0,
            width: width,
            height: height,
            opacity: 0.2
        });

        const pdfBytes = await pdfDoc.save();
        return new NextResponse(pdfBytes, {
            headers: { 'Content-Type': 'application/pdf' }
        });
    } catch (error) {
        console.error(`Error generating PDF: ${error.message}`);
        return NextResponse.json({ status: 500, success: false, message: error.message });
    }
};
