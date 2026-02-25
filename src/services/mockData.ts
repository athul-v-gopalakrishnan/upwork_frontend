import type { Job } from '../types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Full-Stack Developer for SaaS Dashboard',
    description:
      'We are looking for a skilled full-stack developer to build a modern SaaS dashboard application. The project involves creating a responsive UI with React and Tailwind CSS on the frontend, and a RESTful API with Node.js and PostgreSQL on the backend.\n\nKey Requirements:\n- Build a responsive dashboard with data visualization (charts, tables, KPI cards)\n- Implement user authentication and role-based access control\n- Create RESTful API endpoints for CRUD operations\n- Integrate with third-party payment gateway (Stripe)\n- Write unit and integration tests\n- Deploy on AWS (EC2/ECS, RDS, S3)\n\nThe ideal candidate should have 3+ years of experience with React and Node.js, and be comfortable working in an agile environment.',
    budget: '$3,000 - $5,000',
    type: 'Fixed',
    experienceLevel: 'Intermediate',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'AWS'],
    clientInfo: {
      name: 'TechVentures Inc.',
      location: 'United States',
      paymentVerified: true,
      totalSpent: '$45K+',
      jobsPosted: 23,
      hireRate: 78,
      memberSince: 'Mar 2020',
      rating: 4.8,
    },
    postedAt: '2 hours ago',
    proposalCount: 'Less than 5',
    duration: '1 to 3 months',
    category: 'Web Development',
  },
  {
    id: '2',
    title: 'Python Automation Script for Data Pipeline',
    description:
      'Need an experienced Python developer to create an automated data pipeline that extracts data from multiple APIs, transforms it, and loads it into our data warehouse.\n\nScope of Work:\n- Connect to 5 different REST APIs and extract JSON data\n- Clean and transform data using pandas\n- Load processed data into BigQuery\n- Schedule automated runs using Apache Airflow\n- Implement error handling, logging, and alerting\n- Write documentation for the pipeline\n\nMust have experience with ETL processes, cloud data warehouses, and Python automation.',
    budget: '$50 - $80',
    type: 'Hourly',
    experienceLevel: 'Expert',
    skills: ['Python', 'Pandas', 'Apache Airflow', 'BigQuery', 'REST API', 'ETL'],
    clientInfo: {
      name: 'DataFlow Analytics',
      location: 'Canada',
      paymentVerified: true,
      totalSpent: '$120K+',
      jobsPosted: 56,
      hireRate: 85,
      memberSince: 'Jan 2019',
      rating: 4.9,
    },
    postedAt: '5 hours ago',
    proposalCount: '5 to 10',
    duration: 'Less than 1 month',
    hoursPerWeek: '30+ hrs/week',
    category: 'Data Science',
  },
  {
    id: '3',
    title: 'Mobile App UI/UX Design – Fitness Tracker',
    description:
      'We need a talented UI/UX designer to create a modern, clean design for our fitness tracking mobile application.\n\nDeliverables:\n- User research and persona development\n- Wireframes for 15+ screens\n- High-fidelity mockups in Figma\n- Interactive prototype\n- Design system with reusable components\n- Handoff-ready assets and specs\n\nThe app should feel premium, motivational, and easy to use. We love the aesthetics of apps like Strava, Nike Training Club, and Apple Fitness+.',
    budget: '$1,500 - $2,500',
    type: 'Fixed',
    experienceLevel: 'Intermediate',
    skills: ['Figma', 'UI Design', 'UX Design', 'Mobile Design', 'Prototyping'],
    clientInfo: {
      name: 'FitTech Solutions',
      location: 'United Kingdom',
      paymentVerified: true,
      totalSpent: '$18K+',
      jobsPosted: 12,
      hireRate: 67,
      memberSince: 'Jun 2021',
      rating: 4.6,
    },
    postedAt: '1 day ago',
    proposalCount: '10 to 15',
    duration: '1 to 3 months',
    category: 'Design & Creative',
  },
  {
    id: '4',
    title: 'WordPress E-Commerce Website Customization',
    description:
      'Looking for an experienced WordPress developer to customize our WooCommerce store. The site is already set up with a theme, but we need several custom modifications.\n\nTasks:\n- Customize product pages with additional fields and layout changes\n- Implement a custom checkout flow with multi-step form\n- Add a subscription/recurring payments feature\n- Optimize site speed (currently scoring 45 on PageSpeed)\n- Fix responsive issues on mobile devices\n- Integrate with our inventory management system via API\n\nMust have strong experience with WooCommerce, PHP, and WordPress theme development.',
    budget: '$1,000 - $2,000',
    type: 'Fixed',
    experienceLevel: 'Intermediate',
    skills: ['WordPress', 'WooCommerce', 'PHP', 'CSS', 'JavaScript', 'REST API'],
    clientInfo: {
      name: 'StyleHub',
      location: 'Australia',
      paymentVerified: true,
      totalSpent: '$8K+',
      jobsPosted: 9,
      hireRate: 55,
      memberSince: 'Sep 2022',
      rating: 4.3,
    },
    postedAt: '3 hours ago',
    proposalCount: '5 to 10',
    duration: 'Less than 1 month',
    category: 'Web Development',
  },
  {
    id: '5',
    title: 'AI/ML Engineer – NLP Chatbot Development',
    description:
      'We are building a customer support chatbot powered by large language models and need an experienced ML engineer to lead the development.\n\nResponsibilities:\n- Fine-tune an open-source LLM on our domain-specific data\n- Build a RAG (Retrieval Augmented Generation) pipeline\n- Implement conversation memory and context management\n- Create evaluation metrics and testing framework\n- Deploy the model with a scalable inference API\n- Integrate with our existing support ticketing system\n\nRequired: Strong experience with transformers, LangChain/LlamaIndex, vector databases (Pinecone/Weaviate), and cloud deployment (GCP or AWS).',
    budget: '$80 - $120',
    type: 'Hourly',
    experienceLevel: 'Expert',
    skills: ['Python', 'Machine Learning', 'NLP', 'LLM', 'LangChain', 'Docker', 'AWS'],
    clientInfo: {
      name: 'NextGen AI Corp',
      location: 'United States',
      paymentVerified: true,
      totalSpent: '$250K+',
      jobsPosted: 89,
      hireRate: 90,
      memberSince: 'Feb 2018',
      rating: 5.0,
    },
    postedAt: '30 minutes ago',
    proposalCount: 'Less than 5',
    duration: '3 to 6 months',
    hoursPerWeek: '30+ hrs/week',
    category: 'AI & Machine Learning',
  },
  {
    id: '6',
    title: 'Technical Content Writer – Developer Documentation',
    description:
      'We need a technical writer to create comprehensive developer documentation for our open-source CLI tool.\n\nScope:\n- Getting started guide and installation instructions\n- API reference documentation\n- Tutorial series (5 tutorials covering common use cases)\n- Troubleshooting guide and FAQ\n- Migration guide from v1 to v2\n- Contributing guidelines\n\nMust have experience writing developer-facing documentation, familiarity with Markdown/MDX, and basic understanding of CLI tools and APIs. Experience with docs-as-code workflows (Git, CI/CD for docs) is a plus.',
    budget: '$800 - $1,200',
    type: 'Fixed',
    experienceLevel: 'Entry',
    skills: ['Technical Writing', 'Documentation', 'Markdown', 'API Documentation', 'Git'],
    clientInfo: {
      name: 'OpenSource Labs',
      location: 'Germany',
      paymentVerified: true,
      totalSpent: '$32K+',
      jobsPosted: 18,
      hireRate: 72,
      memberSince: 'Nov 2020',
      rating: 4.7,
    },
    postedAt: '1 day ago',
    proposalCount: '15 to 20',
    duration: 'Less than 1 month',
    category: 'Writing',
  },
  {
    id: '7',
    title: 'React Native Developer – Cross-Platform App',
    description:
      'Looking for a React Native developer to build a cross-platform mobile application for our food delivery service.\n\nFeatures Required:\n- User registration and authentication (phone OTP + social login)\n- Restaurant browsing with search and filters\n- Menu viewing and cart management\n- Real-time order tracking with map integration\n- Payment integration (Stripe + Apple Pay + Google Pay)\n- Push notifications for order updates\n- Rating and review system\n\nThe app should support both iOS and Android. We have Figma designs ready. Backend API is already built with Node.js.',
    budget: '$5,000 - $8,000',
    type: 'Fixed',
    experienceLevel: 'Expert',
    skills: ['React Native', 'TypeScript', 'Redux', 'Firebase', 'Stripe', 'Maps API'],
    clientInfo: {
      name: 'QuickBite',
      location: 'India',
      paymentVerified: true,
      totalSpent: '$15K+',
      jobsPosted: 7,
      hireRate: 71,
      memberSince: 'Apr 2023',
      rating: 4.5,
    },
    postedAt: '8 hours ago',
    proposalCount: '10 to 15',
    duration: '3 to 6 months',
    category: 'Mobile Development',
  },
  {
    id: '8',
    title: 'DevOps Engineer – CI/CD Pipeline & Infrastructure',
    description:
      'We need a DevOps engineer to set up and optimize our CI/CD pipeline and cloud infrastructure.\n\nScope:\n- Set up GitHub Actions CI/CD pipeline for monorepo (3 services)\n- Containerize applications with Docker and Docker Compose\n- Set up Kubernetes cluster on AWS EKS\n- Implement infrastructure as code using Terraform\n- Configure monitoring and alerting (Prometheus + Grafana)\n- Set up centralized logging (ELK stack or CloudWatch)\n- Implement secrets management\n- Create staging and production environments\n\nMust have hands-on experience with AWS, Kubernetes, Terraform, and CI/CD tools.',
    budget: '$60 - $100',
    type: 'Hourly',
    experienceLevel: 'Expert',
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Linux'],
    clientInfo: {
      name: 'CloudScale Systems',
      location: 'Netherlands',
      paymentVerified: true,
      totalSpent: '$95K+',
      jobsPosted: 34,
      hireRate: 82,
      memberSince: 'Jul 2019',
      rating: 4.8,
    },
    postedAt: '12 hours ago',
    proposalCount: '5 to 10',
    duration: '1 to 3 months',
    hoursPerWeek: '10-30 hrs/week',
    category: 'DevOps & IT',
  },
];

export const generateMockProposal = (jobTitle: string): string => {
  return `Dear Hiring Manager,

I am writing to express my strong interest in your "${jobTitle}" position. After carefully reviewing your job description, I am confident that my skills and experience make me an excellent fit for this role.

With over 5 years of relevant experience, I have successfully delivered similar projects for clients across various industries. Here's why I'm the right candidate:

• Proven Track Record: I have completed 50+ projects with a 98% client satisfaction rate
• Technical Expertise: My skill set aligns perfectly with your requirements
• Communication: I believe in transparent, regular updates and am available during your business hours
• Quality Assurance: I follow best practices including code reviews, testing, and documentation

My approach to this project would be:
1. Understanding Phase – Deep dive into your requirements and ask clarifying questions
2. Planning Phase – Create a detailed project plan with milestones and deliverables
3. Development Phase – Build iteratively with regular check-ins and demos
4. Testing & QA – Thorough testing to ensure quality and reliability
5. Delivery & Support – Smooth handoff with documentation and post-delivery support

I am available to start immediately and can dedicate the required hours to ensure timely delivery. I'd love to discuss this opportunity further and answer any questions you may have.

Looking forward to hearing from you.

Best regards`;
};
