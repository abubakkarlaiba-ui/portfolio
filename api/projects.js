const { sql } = require('./lib/db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const projects = await sql`
        SELECT * FROM projects WHERE active = TRUE ORDER BY sort_order ASC
      `;
      return res.status(200).json({ success: true, data: projects });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  if (req.method === 'POST') {
    const { title, subtitle, description, url, tech, stats, badge, sort_order } = req.body;

    if (!title || !url) {
      return res.status(400).json({ success: false, error: 'Title and URL are required' });
    }

    try {
      const result = await sql`
        INSERT INTO projects (title, subtitle, description, url, tech, stats, badge, sort_order)
        VALUES (
          ${title},
          ${subtitle || ''},
          ${description || ''},
          ${url},
          ${tech || []},
          ${stats || []},
          ${badge || null},
          ${sort_order || 0}
        )
        RETURNING *
      `;
      return res.status(201).json({ success: true, data: result[0] });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  if (req.method === 'PUT') {
    const { id, title, subtitle, description, url, tech, stats, badge, sort_order, active } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: 'ID is required' });
    }

    try {
      const result = await sql`
        UPDATE projects SET
          title = COALESCE(${title}, title),
          subtitle = COALESCE(${subtitle}, subtitle),
          description = COALESCE(${description}, description),
          url = COALESCE(${url}, url),
          tech = COALESCE(${tech}, tech),
          stats = COALESCE(${stats}, stats),
          badge = COALESCE(${badge}, badge),
          sort_order = COALESCE(${sort_order}, sort_order),
          active = COALESCE(${active}, active)
        WHERE id = ${id}
        RETURNING *
      `;
      return res.status(200).json({ success: true, data: result[0] });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: 'ID is required' });
    }

    try {
      await sql`DELETE FROM projects WHERE id = ${id}`;
      return res.status(200).json({ success: true, message: 'Project deleted' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
};
