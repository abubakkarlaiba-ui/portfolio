const { sql } = require('./lib/db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const [projects, testimonials, messages] = await Promise.all([
        sql`SELECT COUNT(*) as count FROM projects WHERE active = TRUE`,
        sql`SELECT COUNT(*) as count FROM testimonials WHERE active = TRUE`,
        sql`SELECT COUNT(*) as count FROM messages`,
      ]);

      return res.status(200).json({
        success: true,
        data: {
          projects: parseInt(projects[0].count),
          testimonials: parseInt(testimonials[0].count),
          messages: parseInt(messages[0].count),
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
};
