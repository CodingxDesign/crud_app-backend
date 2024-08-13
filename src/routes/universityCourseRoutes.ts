import express, { Request, Response } from 'express';
import UniversityCourse from '../models/universityCourse';
import mongoose from 'mongoose';

const router = express.Router();

// logic for endpoint: /users/register
router.put("/:id/register", async (req: Request, res: Response) => {
    try {
        const courseID = req.params.id;
        const { student } = req.body;

        // Validate that the studentId is provided
        if (!student || !mongoose.Types.ObjectId.isValid(student.id)) {
            return res.status(400).json({ message: 'Valid student ID is required' });
        }

        // Find the course by ID
        const course = await UniversityCourse.findById(courseID);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the student is already registered
        if (course.StudentIDs.includes(student.id)) {
            return res.status(400).json({ message: 'Student is already registered for this course' });
        }

        // Register the student by adding the studentId to the StudentIDs array
        course.StudentIDs.push(student.id);

        // For now we'll ignore updating a user's registered courses or similar.
        // and focus on adding to a course by adding the student's ID to 
        // Save the updated course document
        await course.save();

        return res.status(200).json({ message: `Successful registration for ${course.CourseName}` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while trying to register for the course'});
    }
});

export default router;