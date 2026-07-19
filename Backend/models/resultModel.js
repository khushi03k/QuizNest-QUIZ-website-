import mongoose from "mongoose";
 

const performanceEnum = [
  "Excellent",
  "Good",
  "Average",
  "Needs Work"
];

const resultSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',required:false
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
        technology: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "html",
        "css",
        "js",
        "react",
        "node",
        "mongodb",
        "java",
        "python",
        "cpp",
        "bootstrap"
      ]
    },
        level: { type: String, required: true, enum: ["basic", "intermediate", "advanced"] },
    totalQuestions: { type: Number, required: true, min: 0 },
    correct: { type: Number, required: true, min: 0, default: 0 },
    wrong: { type: Number, required: true, min: 0, default: 0 },
    score: { type: Number, min: 0, max: 100, default: 0 },
    performance: { type: String, enum: performanceEnum, default: "Needs Work" },
  
},{
    timestamps:true
});

// COMPUTE SCORE AND PERFORMANCE
resultSchema.pre("save", function () {
    const total = Number(this.totalQuestions) || 0;
    const correct = Number(this.correct) || 0;

    this.score = total
        ? Math.round((correct / total) * 100)
        : 0;

    if (this.score >= 85) {
        this.performance = "Excellent";
    } else if (this.score >= 70) {
        this.performance = "Good";
    } else if (this.score >= 50) {
        this.performance = "Average";
    } else {
        this.performance = "Poor";
    }

    if (this.wrong === undefined || this.wrong === null) {
        this.wrong = Math.max(0, total - correct);
    }
});

const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);
export default Result;