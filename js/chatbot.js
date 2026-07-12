const knowledgeBase = {
  name: "abubakkar",
  fullName: "abubakkar",
  title: "Full-Stack Developer & Creative Problem Solver",
  location: "Remote / Worldwide",
  email: "hello@abubakkar.dev",
  socials: {
    github: "github.com/abubakkar",
    linkedin: "linkedin.com/in/abubakkar",
    twitter: "@abubakkar_dev"
  },
  about: [
    "I'm a full-stack developer with 4+ years of experience building fast, intuitive digital products.",
    "I specialize in React, Node.js, TypeScript, and modern web technologies.",
    "I'm passionate about performance, clean code, and bold design.",
    "When not coding, I explore new frameworks, contribute to open-source, and perfect my pour-over coffee."
  ],
  skills: {
    frontend: ["React", "Next.js", "TypeScript", "CSS/Sass", "Tailwind"],
    backend: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis"],
    devops: ["Docker", "AWS", "CI/CD", "Kubernetes"],
    mobile: ["React Native"],
    tools: ["Git", "WebSocket", "WebRTC"]
  },
  experience: [
    {
      role: "Senior Full-Stack Developer",
      company: "TechCorp Inc.",
      period: "2024 — Present",
      description: "Leading development of microservices architecture serving 1M+ users. Built real-time analytics dashboard and CI/CD pipeline."
    },
    {
      role: "Full-Stack Developer",
      company: "StartupXYZ",
      period: "2022 — 2024",
      description: "Developed core product features using React, Node.js, and MongoDB. Reduced load times by 40% and led 3 major releases."
    },
    {
      role: "Junior Developer",
      company: "WebAgency Co.",
      period: "2020 — 2022",
      description: "Built 15+ client websites and web apps. Migrated legacy jQuery codebase to React."
    }
  ],
  projects: [
    {
      name: "Black Wolf Media",
      description: "A full-service video editing and production agency website for Lahore, Pakistan. Features cinematic portfolio showcase, client testimonials, service booking, and AI-powered content solutions.",
      tech: ["Next.js", "React", "Tailwind", "Web Design"],
      url: "https://blackwolfmediame.vercel.app"
    },
    {
      name: "Zyro",
      description: "AI-powered web development platform that lets businesses launch websites in hours. Features conversion architecture, business automation, payment infrastructure, and custom SaaS solutions.",
      tech: ["Next.js", "TypeScript", "AI", "SaaS"],
      url: "https://zyro-steel.vercel.app"
    },
    {
      name: "GrimZone",
      description: "Pakistan's premier Free Fire tournament platform. Players compete in 1v1 and 2v2 tournaments, earn tokens, and win real prizes with a live world chat feature.",
      tech: ["Next.js", "React", "Real-time", "Gaming"],
      url: "https://grimzone.vercel.app"
    }
  ],
  stats: {
    yearsExperience: "4+",
    projectsDelivered: "30+",
    happyClients: "20+"
  }
};

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
}

function getGreeting() {
  const greetings = [
    "Hey there! 👋 I'm abubakkar's AI assistant. What would you like to know about him?",
    "Hi! I can tell you all about abubakkar — his skills, projects, experience, and more. Ask away!",
    "Hello! I'm here to help you learn about abubakkar. What are you curious about?"
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}

function getFallback() {
  const fallbacks = [
    "I'm not sure I understand. You can ask me about abubakkar's skills, projects, experience, or contact info!",
    "Hmm, I don't have an answer for that. Try asking about his tech stack, work history, or how to get in touch!",
    "I couldn't find that in my knowledge base. Feel free to ask about his skills, projects, experience, or background!"
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

function findAnswer(query) {
  const q = normalize(query);

  // Greetings
  if (/^(hi|hello|hey|howdy|sup|yo)\b/.test(q)) {
    return getGreeting();
  }

  // Name
  if (/\b(name|who are you|who is)\b/.test(q) && /(you|this)/.test(q)) {
    return `I'm an AI assistant here to tell you about <span class="highlight">abubakkar</span> — a full-stack developer and creative problem solver. Ask me anything about him!`;
  }

  // Who is / about
  if (/\b(who is|tell me about|about)\b/.test(q) && /\b(abubakkar|him|he|his|you)\b/.test(q)) {
    return `<span class="highlight">abubakkar</span> is a Full-Stack Developer & Creative Problem Solver with 4+ years of experience. He specializes in React, Node.js, and TypeScript. He's delivered 30+ projects for 20+ happy clients. He believes great code is just the beginning — the real magic happens when performance meets purpose.`;
  }

  // Skills / tech stack
  if (/\b(skill|tech|stack|technolog|know|language|tool|expert)\b/.test(q)) {
    const allSkills = [
      ...knowledgeBase.skills.frontend,
      ...knowledgeBase.skills.backend,
      ...knowledgeBase.skills.devops,
      ...knowledgeBase.skills.mobile,
      ...knowledgeBase.skills.tools
    ];
    return `<span class="highlight">abubakkar's</span> tech stack includes:\n\n` +
      `🔷 <b>Frontend:</b> ${knowledgeBase.skills.frontend.join(', ')}\n` +
      `🖥️ <b>Backend:</b> ${knowledgeBase.skills.backend.join(', ')}\n` +
      `☁️ <b>DevOps:</b> ${knowledgeBase.skills.devops.join(', ')}\n` +
      `📱 <b>Mobile:</b> ${knowledgeBase.skills.mobile.join(', ')}\n` +
      `🔧 <b>Tools:</b> ${knowledgeBase.skills.tools.join(', ')}`;
  }

  // Frontend specifically
  if (/\bfrontend\b|\bfront-end\b/.test(q)) {
    return `<span class="highlight">abubakkar's</span> frontend skills: ${knowledgeBase.skills.frontend.join(', ')}.`;
  }

  // Backend specifically
  if (/\bback\s*end\b|\bbackend\b/.test(q)) {
    return `<span class="highlight">abubakkar's</span> backend skills: ${knowledgeBase.skills.backend.join(', ')}.`;
  }

  // Experience / work
  if (/\b(experience|work|job|career|employ|position|role|company)\b/.test(q)) {
    let exp = `<span class="highlight">abubakkar's</span> work experience:\n\n`;
    knowledgeBase.experience.forEach(e => {
      exp += `<b>${e.role}</b> @ ${e.company} (${e.period})\n${e.description}\n\n`;
    });
    return exp.trim();
  }

  // Projects
  if (/\b(project|build|made|create|portfolio|work)\b/.test(q)) {
    let proj = `<span class="highlight">abubakkar's</span> featured projects:\n\n`;
    knowledgeBase.projects.forEach(p => {
      proj += `<b>${p.name}</b> — ${p.description}\nTech: ${p.tech.join(', ')}\n\n`;
    });
    return proj.trim();
  }

  // Specific project
  if (/\bnovapay\b/i.test(q)) {
    const p = knowledgeBase.projects.find(x => x.name === "NovaPay");
    return `<b>${p.name}</b> — ${p.description} Built with ${p.tech.join(', ')}.`;
  }
  if (/\bflux\b.*\bstudio\b|\bflux\b/i.test(q)) {
    const p = knowledgeBase.projects.find(x => x.name === "Flux Studio");
    return `<b>${p.name}</b> — ${p.description} Built with ${p.tech.join(', ')}.`;
  }
  if (/\borbit\b.*\bcli\b|\borbit\b/i.test(q)) {
    const p = knowledgeBase.projects.find(x => x.name === "Orbit CLI");
    return `<b>${p.name}</b> — ${p.description} Built with ${p.tech.join(', ')}.`;
  }

  // Contact / email / reach
  if (/\b(contact|email|reach|message|connect|hire|get in touch)\b/.test(q)) {
    return `You can reach <span class="highlight">abubakkar</span> at:\n\n📧 <b>Email:</b> hello@abubakkar.dev\n🐦 <b>Twitter:</b> @abubakkar_dev\n🐙 <b>GitHub:</b> github.com/abubakkar\n🔗 <b>LinkedIn:</b> linkedin.com/in/abubakkar\n\nHe's based remotely and open to interesting opportunities worldwide!`;
  }

  // Location
  if (/\b(location|where|based|remote|live|located)\b/.test(q)) {
    return `<span class="highlight">abubakkar</span> works remotely from anywhere in the world. 🌍`;
  }

  // Years / experience years
  if (/\b(how long|years|experience)\b/.test(q) && /\b(work|coding|dev|job)\b/.test(q)) {
    return `<span class="highlight">abubakkar</span> has <b>4+ years</b> of professional development experience.`;
  }

  // Stats
  if (/\b(stat|achievement|accomplish|deliver|client|project.*count|how many)\b/.test(q)) {
    return `<span class="highlight">abubakkar's</span> stats:\n\n📦 <b>${knowledgeBase.stats.projectsDelivered}</b> projects delivered\n😊 <b>${knowledgeBase.stats.happyClients}</b> happy clients\n💼 <b>${knowledgeBase.stats.yearsExperience}</b> years experience`;
  }

  // React
  if (/\breact\b/.test(q) && /\b(skill|know|use|work|experience)\b/.test(q)) {
    return `<span class="highlight">abubakkar</span> is highly skilled in React and uses it as his primary frontend framework. He's built complex SPAs, dashboards, and interactive UIs with React, Next.js, and React Native.`;
  }

  // Node.js
  if (/\bnode\b/.test(q) && /\b(skill|know|use|work|experience)\b/.test(q)) {
    return `<span class="highlight">abubakkar</span> uses Node.js extensively for backend development — REST APIs, microservices, real-time applications with WebSockets, and CLI tools.`;
  }

  // TypeScript
  if (/\btypescript\b/.test(q)) {
    return `<span class="highlight">abubakkar</span> uses TypeScript daily across both frontend and backend for type-safe, maintainable code.`;
  }

  // Docker
  if (/\bdocker\b/.test(q)) {
    return `<span class="highlight">abubakkar</span> uses Docker for containerization and development environments. He also works with Kubernetes for orchestration.`;
  }

  // AWS / cloud
  if (/\b(aws|cloud|deploy)\b/.test(q)) {
    return `<span class="highlight">abubakkar</span> has experience with AWS services including EC2, Lambda, S3, and RDS for cloud deployment and infrastructure.`;
  }

  // Current / present
  if (/\b(current|now|present|today|working on)\b/.test(q)) {
    const current = knowledgeBase.experience[0];
    return `Currently, <span class="highlight">abubakkar</span> is working as <b>${current.role}</b> at ${current.company}. ${current.description}`;
  }

  // Coffee / interests
  if (/\b(coffee|hobby|interest|fun|outside|free time)\b/.test(q)) {
    return `When he's not coding, <span class="highlight">abubakkar</span> enjoys exploring new frameworks, contributing to open-source projects, and perfecting his pour-over coffee technique! ☕`;
  }

  // Help
  if (/\b(help|what can you|what do you know|capabilities)\b/.test(q)) {
    return "I can tell you about <span class='highlight'>abubakkar's</span> skills, projects, work experience, contact info, and background. Just ask me anything!";
  }

  // Goodbye
  if (/\b(bye|goodbye|see you|thanks|thank you)\b/.test(q)) {
    return "You're welcome! Feel free to ask more about <span class='highlight'>abubakkar</span> anytime. 😊";
  }

  return null;
}

class ChatbotAI {
  constructor() {
    this.apiKey = localStorage.getItem('gemini_api_key') || '';
    this.useAI = false;
    this.body = document.getElementById('chatbotBody');
    this.input = document.getElementById('chatbotInput');
    this.sendBtn = document.getElementById('chatbotSend');
    this.fab = document.getElementById('chatbotFab');
    this.closeBtn = document.getElementById('chatbotClose');
    this.overlay = document.getElementById('chatbotOverlay');
    this.chatbot = document.getElementById('chatbot');
    this.suggestionChips = document.getElementById('suggestionChips');
  }

  init() {
    this.sendBtn.addEventListener('click', () => this.handleSend());
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleSend();
    });
    this.fab.addEventListener('click', () => this.toggle());
    this.closeBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());

    this.suggestionChips.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.input.value = chip.dataset.query;
        this.handleSend();
      });
    });

    document.getElementById('chatCTA')?.addEventListener('click', () => {
      this.open();
      this.input.focus();
    });
  }

  toggle() {
    if (this.chatbot.classList.contains('active')) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.chatbot.classList.add('active');
    this.overlay.classList.add('active');
    this.fab.classList.add('open');
    this.fab.querySelector('.fab-icon').textContent = '✕';
    this.scrollToBottom();
    setTimeout(() => this.input.focus(), 300);
  }

  close() {
    this.chatbot.classList.remove('active');
    this.overlay.classList.remove('active');
    this.fab.classList.remove('open');
    this.fab.querySelector('.fab-icon').textContent = '💬';
  }

  handleSend() {
    const msg = this.input.value.trim();
    if (!msg) return;
    this.input.value = '';
    this.addMessage(msg, 'user');

    const loadingId = this.showTyping();

    setTimeout(() => {
      this.hideTyping(loadingId);
      const answer = this.getAnswer(msg);
      this.addMessage(answer, 'bot');
    }, 400 + Math.random() * 300);
  }

  getAnswer(query) {
    const local = findAnswer(query);
    if (local) return local;

    // If no local match, try AI if configured
    if (this.apiKey) {
      this.fetchAIResponse(query, this.apiKey);
      return "Let me think about that...";
    }

    return getFallback();
  }

  addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `chat-message ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'chat-avatar';
    avatar.textContent = sender === 'user' ? '👤' : '🤖';

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = text;

    div.appendChild(avatar);
    div.appendChild(bubble);
    this.body.appendChild(div);
    this.scrollToBottom();
  }

  showTyping() {
    const id = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.className = 'chat-message bot';
    div.id = id;

    const avatar = document.createElement('div');
    avatar.className = 'chat-avatar';
    avatar.textContent = '🤖';

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = '<div class="chat-typing"><span></span><span></span><span></span></div>';

    div.appendChild(avatar);
    div.appendChild(bubble);
    this.body.appendChild(div);
    this.scrollToBottom();
    return id;
  }

  hideTyping(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.body.scrollTop = this.body.scrollHeight;
    }, 50);
  }

  async fetchAIResponse(query, apiKey) {
    this.hideTyping(this._loadingId);

    const context = this.buildContext();
    const prompt = `You are an AI assistant for a portfolio website. You represent ${knowledgeBase.fullName}. Answer questions about him based on this context. Be friendly, concise, and use "he/him" when referring to ${knowledgeBase.fullName}. If unsure, say you don't know.\n\nContext:\n${context}\n\nQuestion: ${query}`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        this.addMessage(data.candidates[0].content.parts[0].text, 'bot');
      } else {
        this.addMessage(getFallback(), 'bot');
      }
    } catch (err) {
      this.addMessage("I'm having trouble connecting to the AI service. Here's what I know: " + getFallback(), 'bot');
    }
  }

  buildContext() {
    return JSON.stringify(knowledgeBase, null, 2);
  }

  setApiKey(key) {
    this.apiKey = key;
    localStorage.setItem('gemini_api_key', key);
  }
}

const chatbotAI = new ChatbotAI();
document.addEventListener('DOMContentLoaded', () => chatbotAI.init());
