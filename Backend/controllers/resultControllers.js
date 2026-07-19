import Result from "../models/resultModel.js";

export async function createResults(req, res) {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                 success: false,
                  message: 'Not authorized' 
                });
            }
             
            const { title, technology, level, totalQuestions, correct, wrong } = req.body;
              if(!technology || !level || !totalQuestions || correct === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields'
                });
            }
            //computer wrong
             const computedWrong = wrong !== undefined ? Number(wrong) : Math.max(0, Number(totalQuestions) - Number(correct));
            if(!title){
                return res.status(400).json({
                    success: false,
                    message: ' missing Title'
                });
            }
            const payload = {
      title: String(title).trim(),
      technology,
      level,
      totalQuestions: Number(totalQuestions),
      correct: Number(correct),
      wrong: computedWrong,
      user: req.user.id// for a particular user
    };
    const created=await Result.create(payload);
    return res.status(201).json({
        success: true,
        message: 'Result created successfully',
        result: created
    });


        }
        catch (err) {
  console.error(err);

  return res.status(500).json({
    success: false,
    message: err.message,
    error: err
  });
}

    }

    // List THE RESULT
    export async function listResults(req, res) {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "Not authorized"
            });
        }

        const { technology, level } = req.query;

        const query = {
            user: req.user._id
        };

        if (technology && technology.toLowerCase() !== "all") {
            query.technology = technology;
        }

        if (level && level.toLowerCase() !== "all") {
            query.level = level;
        }

        const items = await Result.find(query)
            .sort({ createdAt: -1 })
            .lean();

        return res.status(200).json({
            success: true,
            results: items
        });

    } catch (error) {
        console.error("Error in listResults:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}