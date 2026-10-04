import Result from '../models/resultModel.js';

// CREATE RESULT
export async function createResults(req, res) {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        const { title, technology, level, totalQuestions, correct, wrong } = req.body;

        if (!title || !technology || !level || totalQuestions === undefined || correct === undefined) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const total = Number(totalQuestions);
        const right = Number(correct);
        const computedWrong = wrong !== undefined ? Number(wrong) : Math.max(0, total - right);

        const created = await Result.create({
            title: String(title).trim(),
            technology: String(technology).toLowerCase().trim(),
            level: String(level).toLowerCase().trim(),
            totalQuestions: total,
            correct: right,
            wrong: computedWrong,
            user: req.user._id
        });

        return res.status(201).json({
            success: true,
            message: 'Result created successfully',
            result: created
        });
    } catch (err) {
        console.error('createResults error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

// LIST RESULTS
export async function listResults(req, res) {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        const { technology, level } = req.query;
        const query = { user: req.user._id };

        if (technology && technology.toLowerCase() !== 'all') {
            query.technology = technology.toLowerCase().trim();
        }
        if (level && level.toLowerCase() !== 'all') {
            query.level = level.toLowerCase().trim();
        }

        const items = await Result.find(query).sort({ createdAt: -1 }).lean();

        return res.status(200).json({ success: true, results: items });
    } catch (error) {
        console.error('Error in listResults:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}