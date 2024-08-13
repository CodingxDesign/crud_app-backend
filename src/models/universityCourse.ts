import { UniversityCourseType } from "../types/universityCourse";
import mongoose from "mongoose";

// create a schema to enforce what fields of the type are needed for the universityClass resource in the db
const UniversityCourseSchema = new mongoose.Schema({
    // no need for _id bc the Schema takes care of that by default
    CourseID: { type: Number, required: true },
    CourseName: { type: String, required: true },
    College: { type: String, required: true },
    Department: {type: String, required: true},
    Year: { type: Number, required: true },
    Semester: { type: Number, required: true },
    CourseCode: { type: String, required: true},
    Instructor: {type: String, required: true },
    StudentIDs: {type: Array<Number>, required: true }
});

// add the resource that the User model should be linked to
const UniversityCourse = mongoose.model<UniversityCourseType>("User", UniversityCourseSchema);

export default UniversityCourse;