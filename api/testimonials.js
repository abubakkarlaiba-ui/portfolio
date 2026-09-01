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
      const testimonials = await sql`
        SELECT * FROM testimonials WHERE active = TRUE ORDER BY featured DESC, created_at DESC
      `;
      return res.status(200).json({ success: true, data: testimonials });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  if (req.method === 'POST') {
    const { quote, author, rating, featured } = req.body;

    if (!quote || !author) {
      return res.status(400).json({ success: false, error: 'Quote and author are required' });
    }

    try {
      const result = await sql`
        INSERT INTO testimonials (quote, author, rating, featured)
        VALUES (${quote}, ${author}, ${rating || 5.0}, ${featured || false})
        RETURNING *
      `;
      return res.status(201).json({ success: true, data: result[0] });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  if (req.method === 'PUT') {
    const { id, quote, author, rating, featured, active } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: 'ID is required' });
    }

    try {
      const result = await sql`
        UPDATE testimonials SET
          quote = COALESCE(${quote}, quote),
          author = COALESCE(${author}, author),
          rating = COALESCE(${rating}, rating),
          featured = COALESCE(${featured}, featured),
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
      await sql`DELETE FROM testimonials WHERE id = ${id}`;
      return res.status(200).json({ success: true, message: 'Testimonial deleted' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
};
