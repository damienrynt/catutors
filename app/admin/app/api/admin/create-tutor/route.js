import { executeQuery } from '../../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { adminPassword, tutorData } = await request.json();
    
    // Verify admin password
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Hash the temporary password
    const hashedPassword = await bcrypt.hash(tutorData.temporaryPassword, 12);
    
    // Insert tutor into database
    await executeQuery(
      `INSERT INTO tutors (email, password_hash, name, subjects, bio, hourly_rate, contact_email, contact_phone, is_active) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        tutorData.email,
        hashedPassword,
        tutorData.name,
        tutorData.subjects,
        tutorData.bio,
        tutorData.hourly_rate,
        tutorData.contact_email,
        tutorData.contact_phone,
        true
      ]
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error creating tutor:', error);
    return Response.json({ error: 'Failed to create tutor' }, { status: 500 });
  }
}