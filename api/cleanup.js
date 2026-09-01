const { sql } = require('./lib/db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'POST only' });
  }

  const { secret } = req.body;
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    // Delete duplicate projects - keep only the first of each title
    await sql`
      DELETE FROM projects
      WHERE id NOT IN (
        SELECT MIN(id) FROM projects GROUP BY title
      )
    `;

    // Delete duplicate testimonials - keep only the first of each quote+author
    await sql`
      DELETE FROM testimonials
      WHERE id NOT IN (
        SELECT MIN(id) FROM testimonials GROUP BY quote, author
      )
    `;

    const [projects, testimonials] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM projects`,
      sql`SELECT COUNT(*) as count FROM testimonials`,
    ]);

    return res.status(200).json({
      success: true,
      message: 'Duplicates cleaned',
      data: {
        projects: parseInt(projects[0].count),
        testimonials: parseInt(testimonials[0].count)
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
