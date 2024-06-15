import { replaceMongoIdInObject } from '@/lib/convertData';
import Assessment from '@/modals/assessment-model';
import Report from '@/modals/report-model';

export const getAReport = async (filter) => {
    try {
        const report = await Report.findOne(filter)
            .populate({
                path: 'quizAssessment',
                model: Assessment
            })
            .lean();
        return replaceMongoIdInObject(report);
    } catch (error) {
        throw new Error(error);
    }
};
