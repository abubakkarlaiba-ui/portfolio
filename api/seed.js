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
    // Seed projects
    const projects = [
      { title: 'Black Wolf Media', subtitle: 'Video Production Agency · Lahore, Pakistan', description: 'A full-service video editing and production agency. Cinematic portfolio showcase, client testimonials, service booking, and AI-powered content solutions. 500+ projects delivered.', url: 'https://blackwolfmediame.vercel.app', tech: ['Next.js', 'React', 'Tailwind', 'Web Design'], stats: ['500+ Projects', '6+ Years', '50+ Clients'], badge: '★Flagship', sort_order: 1 },
      { title: 'Zyro', subtitle: 'AI Web Platform · SaaS', description: 'AI-powered web development platform. Conversion architecture, business automation, payment infrastructure, and custom SaaS solutions.', url: 'https://zyro-steel.vercel.app', tech: ['Next.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Tailwind'], stats: ['6 Live Tools', '100/100 CWV', '9 Products'], sort_order: 2 },
      { title: 'GrimZone', subtitle: 'Gaming · Real-time Tournaments', description: "Pakistan's premier Free Fire tournament platform. Players compete in 1v1 and 2v2 tournaments, earn tokens, and win real prizes with live world chat.", url: 'https://grimzone.vercel.app', tech: ['Next.js', 'React', 'Real-time', 'Gaming'], stats: ['348+ Players', '4 Tournaments', '4.9 Rating'], sort_order: 3 },
      { title: 'VoxClone', subtitle: 'Voice AI · Real-time Cloning', description: 'Advanced voice cloning platform with real-time synthesis. Upload a voice sample and generate natural-sounding speech in any language.', url: 'https://voxclone-mu.vercel.app', tech: ['Next.js', 'Python', 'AI/ML', 'Web Audio'], stats: ['Real-time AI', 'Multi-language', 'Neural TTS'], sort_order: 4 },
      { title: 'ERP System', subtitle: 'Enterprise · Resource Planning', description: 'Full-stack enterprise resource planning dashboard. Inventory management, employee scheduling, financial reporting, and real-time analytics.', url: 'https://erp-system-frontend-azure.vercel.app/dashboard', tech: ['React', 'Node.js', 'PostgreSQL', 'Charts', 'REST API'], stats: ['Dashboard', 'Real-time Data', 'Multi-module'], sort_order: 5 },
    ];

    for (const p of projects) {
      await sql`
        INSERT INTO projects (title, subtitle, description, url, tech, stats, badge, sort_order)
        VALUES (${p.title}, ${p.subtitle}, ${p.description}, ${p.url}, ${p.tech}, ${p.stats}, ${p.badge || null}, ${p.sort_order})
      `;
    }

    // Seed testimonials
    const testimonials = [
      { quote: "You have the ones that simply do the bare minimum, and then you have this man that goes above and beyond. His consistency and effort is unmatched.", author: 'Enterprise Client', rating: 5.0, featured: true },
      { quote: "He never once said what you're asking is out of scope. He makes very complex things look easy and solvable.", author: 'Full-Stack Client', rating: 5.0, featured: false },
      { quote: "He executed the project with excellent quality and exceeded my expectations. He met the deadline weeks earlier than what I set. I would rate more than 5 stars if I could.", author: 'SaaS Client', rating: 5.0, featured: false },
      { quote: "Delivery time? Wow. Update times? Even faster. Many thanks for all the late nights and early mornings working on bugs and fixing lines of code.", author: 'Web Platform Client', rating: 5.0, featured: false },
      { quote: "He stayed with me half an hour, solved every problem, and refused to get paid because he didn't work on it. In my book he is a very honest person.", author: 'Game Dev Client', rating: 5.0, featured: false },
    ];

    for (const t of testimonials) {
      await sql`
        INSERT INTO testimonials (quote, author, rating, featured)
        VALUES (${t.quote}, ${t.author}, ${t.rating}, ${t.featured})
      `;
    }

    return res.status(200).json({ success: true, message: 'Database seeded successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
