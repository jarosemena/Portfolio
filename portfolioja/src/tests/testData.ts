// src/tests/testData.ts

export const mockPortfolioData = {
  aboutMe: {
      title: 'Professional Software Developer',
      paragraphs: [
        'Passionate developer with 5+ years of experience',
        'Specialized in React and TypeScript'
      ],
      contact: {
        email: "developer@example.com",
        phone: "+1234567890",
        location: "San Francisco, CA",
        website: "https://myportfolio.com",
        github: "https://github.com/devuser",
        linkedin: "https://linkedin.com/in/devuser",
        twitter: "https://twitter.com/devuser"
      }
    },
    experience: [
      {
        id: "exp1",
        period: "2020-2023",
        position: "Senior Frontend Developer",
        company: "Tech Corp Inc.",
        description: "Led frontend team building React applications",
        technologies: [
          {
            name: "TypeScript",
            proficiency: "expert",
            yearsOfExperience: 4,
            category: "language",
            lastUsed: "2023"
          },
          {
            name: "React",
            proficiency: "expert",
            yearsOfExperience: 5,
            category: "framework",
            lastUsed: "2023"
          }
        ],
        link: "https://techcorp.com",
        highlights: [
          "Improved performance by 40%",
          "Mentored junior developers"
        ]
      }
    ],
    education: [
      {
        id: "edu1",
        institution: "Stanford University",
        degree: "Master of Computer Science",
        fieldOfStudy: "Artificial Intelligence",
        period: "2018-2020",
        description: "Specialized in Machine Learning",
        link: "https://stanford.edu",
        achievements: [
          "Graduated with honors",
          "Published research paper on NLP"
        ]
      }
    ],
    skills: {
      title: "Technical Skills",
      categories: [
        {
          category: "Programming Languages",
          items: [
            {
              name: "JavaScript",
              proficiency: "expert",
              yearsOfExperience: 7,
              category: "language",
              icon: "js-icon.svg",
              featured: true
            }
          ]
        }
      ],
      technicalSummary: "Full-stack developer with focus on modern web technologies"
    },
    projects: {
      title: "Featured Projects",
      items: [
        {
          id: "proj1",
          name: "E-commerce Platform",
          description: "Modern online shopping solution",
          detailedDescription: "Built with microservices architecture and React frontend",
          technologies: [
            {
              name: "Node.js",
              proficiency: "advanced",
              category: "framework"
            }
          ],
          repoUrl: "https://github.com/devuser/ecommerce",
          liveUrl: "https://ecommerce.example.com",
          imageUrl: "https://example.com/proj1.jpg",
          screenshots: [
            "https://example.com/proj1-1.jpg",
            "https://example.com/proj1-2.jpg"
          ],
          featured: true,
          year: "2022",
          client: "Retail Client Inc.",
          role: "Lead Developer"
        }
      ]
    }
  };