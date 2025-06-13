import { ExperienceItem } from './types';

export const experiences: ExperienceItem[] = [
  {
    id: '1',
    period: 'Nov 2022 – Present',
    position: 'Solution Architect',
    company: 'COPA Airlines, Panama',
    description: `
      • Designed scalable microservices using .NET Core and deployed them on Azure Kubernetes Service (AKS), improving system resiliency for 2M+ monthly users.
      • Led end-to-end cloud migrations, reducing deployment costs by 25% through Azure resource optimization.
      • Enforced security protocols for high-concurrency APIs, achieving 99.9% uptime.
    `,
    technologies: [
      { name: '.NET Core' },
      { name: 'Azure Kubernetes' },
      { name: 'Microservices' },
      { name: 'Cloud Architecture' }
    ],
    link: 'https://www.copaair.com'
  },
  {
    id: '2',
    period: 'Jul 2019 – Oct 2022',
    position: 'Sr. Software Developer',
    company: 'Seguros SURA, Panama',
    description: `
      • Architected a health insurance microservices platform using Oracle OSB and .NET Core, boosting processing efficiency by 40%.
      • Automated ETL workflows with Python, cutting data load times by 30%.
      • Mentored 15+ developers in Agile practices, ensuring on-time delivery of 10+ mission-critical projects.
    `,
    technologies: [
      { name: '.NET Core' },
      { name: 'Oracle OSB' },
      { name: 'Python' },
      { name: 'ETL' },
      { name: 'Agile Coaching' }
    ],
    link: 'https://www.segurossura.com'
  },
  {
    id: '3',
    period: 'Feb 2018 – Jun 2019',
    position: 'Software Developer',
    company: 'Fidanque Comunicaciones Industriales',
    description: `
      • Built cloud-first systems using Azure and WebSockets for real-time industrial data visualization.
      • Developed a Xamarin-based mobile app with push notifications, replacing legacy systems and improving response times by 50%.
    `,
    technologies: [
      { name: 'Azure' },
      { name: 'WebSockets' },
      { name: 'Xamarin' },
      { name: 'Mobile Development' }
    ]
  }
];