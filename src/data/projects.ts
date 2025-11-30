export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string[]; // Short description for the card
  about: string; // Long description for the modal
  useCase: string;
  sponsor?: string;
  role: string;
  technicalSections: {
    title: string;
    content: string;
  }[];
  techStack: string[];
  links: {
    demo?: string;
    demoLabel?: string;
    repo?: string;
  };
  media: {
    videoUrl?: string; // YouTube embed URL or local video
    heroImage?: string;
    gallery: {
      url: string;
      caption?: string;
      type: 'image' | 'video';
    }[];
  };
}

export const projects: Project[] = [
  {
    id: 'qoltbot',
    title: 'Breast Cancer Research RAG Chatbot',
    tagline: 'Democratizing Access to Medical Research',
    role: 'Full Stack Developer',
    sponsor: 'Quality of Life Technologies (QoLT) Lab',
    description: [
      "Integrated OpenAI-based LLM models with FastAPI to offer quick, data-backed responses.",
      "Built a secure React front end connected to AWS S3 for knowledge base."
    ],
    about: "The chatbot is intended for those interested in the Quality of Life Technologies Lab (QoLT). It offers insights into the lab's projects and its founder, Professor Tamil. The chatbot contains a custom knowledge base uploader, where the professor can upload new and more relevant information about the lab, and the chatbot will immediately be able to discuss this new information.\n\nFrom the QoLT lab website itself: \"Quality of Life Technology Laboratory’s mission is to explore technological advancements, to develop innovative methods, and to design intelligent systems for personalized health care, vital signs monitoring and disease prevention. Teaching and training students to become creative professionals in engineering innovations for health care field is an integral part of our strategy. We foster methodologies, which in collaboration with other educational, research, medical, and industrial institutions, will lead to commercial products for public use.\"",
    useCase: "Medical researchers and students need to synthesize vast amounts of literature. QoltBot reduces literature review time by providing instant, cited summaries of specific topics. It also serves as an interactive guide to the lab's work, allowing visitors to query specific details about ongoing research and methodologies.",
    technicalSections: [
      {
        title: "Chatbot Functionalities",
        content: "This section explores the chatbot's key features, including its core functionality, voice interaction, custom knowledge base integration, and user authentication system, detailing the technical processes and architectures underlying each."
      },
      {
        title: "The Chatbot Architecture",
        content: "The chatbot utilizes an OpenAI API key to facilitate text-based interactions with the GPT 3.5 Turbo model. This offers a straightforward approach to implementing a text-to-text model. For enhanced information retrieval, it integrates a retrieval-augmented generation (RAG) system, allowing the chatbot to access a custom knowledge base.\n\nThe system employs Langchain to transform uploaded documents into actionable data. This process involves two key steps: Langchain's CharacterTextSplitter segments documents into manageable sections, and an embedding process translates these segments into numerical vectors (capturing their meaning) using a small LLM called all-MiniLM-L6-v2. These vectors are stored in ChromaDB for efficient query handling.\n\nOnce setup is complete, users can query the chatbot. Langchain's QA_CHAIN_PROMPT ensures contextually aware responses, providing accurate and relevant answers."
      },
      {
        title: "Voice Based Interaction",
        content: "To enable voice interaction, the chatbot uses AWS Transcribe to convert an MP3 voice file into text.\n\nHere's how it works: a websocket connection (via AWS API Gateway) is established between the app frontend and backend. The user records their voice, which is saved as an MP3 blob and sent over the websocket to an AWS Lambda function. The Lambda converts the blob to MP3, uploads it to S3, and initiates an AWS Transcribe job. EventBridge monitors the job and triggers another Lambda (Using SNS) to retrieve the transcribed text from S3 and send it back to the frontend via the websocket. Finally, the transcribed question is sent to the chatbot as if it were regular text."
      },
      {
        title: "Adding a Custom Knowledgebase",
        content: "Admin users can enrich the chatbot's knowledge by uploading a custom knowledge base, enabling the lab members to update the chatbot with new advances made in the QoLT lab. This feature supports the chatbot's growth and adaptability to new information.\n\nThe process is straightforward: within the chatbot's side panel, an 'upload knowledge base' section is provided. Users are prompted to upload files, either by drag-and-drop or through file navigation, accepting .txt or .pdf formats. Through API Gateway, the selected file is sent as a blob to a Lambda function, which then processes and stores it in an S3 bucket. Consequently, as users pose new questions, the chatbot dynamically retrieves and incorporates this uploaded information from the S3 bucket to generate informed responses."
      },
      {
        title: "User Authentication",
        content: "The webapp incorporates a login/signup feature to distinguish admin users, utilizing a PostgreSQL database hosted on Amazon RDS for user management. During account creation or login, passwords are encrypted with bcrypt and securely transmitted to Lambda functions via API Gateway for storage or authentication against the RDS database. Additionally, the signup process enforces input validation criteria."
      },
      {
        title: "Cloud-Hosted Backend Strategy",
        content: "One of the foremost challenges was minimizing costs, rendering the option of hosting a dedicated server for our backend infeasible. To address this, we leveraged Lambda's \"serverless\" architecture, which allows code to execute in response to events without the need for a full-fledged server. This approach significantly reduced our operational overhead.\n\nHosting the retrieval-augmented generation (RAG) system on Lambda posed a hurdle due to Lambda's 500MB code size limit. Fortunately, Lambda's support for attaching Docker containers via AWS ECR provided a workaround. By packaging the chatbot's backend into a Docker container, we achieved a lower cost and eliminated the need for server management. However, this setup introduces latency during cold starts, a challenge we are actively exploring solutions for."
      }
    ],
    techStack: ["React", "FastAPI", "OpenAI API", "Langchain", "ChromaDB", "AWS Lambda", "Docker", "PostgreSQL"],
    links: {
      demo: "https://qoltbot.netlify.app/",
      demoLabel: "View Live Website"
    },
    media: {
      heroImage: "/assets/qoltbot/thumbnail.png",
      gallery: [
        {
          url: "/assets/qoltbot/text-to-text.gif",
          type: "image",
          caption: "Text-to-text interaction with the chatbot"
        },
        {
          url: "/assets/qoltbot/thumbnail.png",
          type: "image",
          caption: "Chatbot interaction interface"
        },
        {
          url: "/assets/qoltbot/voice-to-text.gif",
          type: "image",
          caption: "Voice interaction via AWS Transcribe"
        },
        {
          url: "/assets/qoltbot/knowledge-base-uploading.gif",
          type: "image", // It's a GIF, so treat as image
          caption: "Uploading a custom knowledge base"
        }
      ]
    }
  },
  {
    id: 'aura-finance',
    title: 'Aura Finance',
    tagline: 'Personal Finance Management',
    role: 'Lead Architect',
    description: [
      "Architected a local-first personal finance dashboard using React, Dexie.js, and Firebase.",
      "Implemented offline-first data sync, real-time analytics, and a beautiful design."
    ],
    about: "Aura Finance is a modern personal finance management application built with React, featuring a local-first architecture for instant interactions and offline capability. It allows users to track net worth, categorize transactions, and visualize spending habits with data stored securely on their device and synced to the cloud.",
    useCase: "Users want a clean, ad-free way to manage their money that works instantly even without internet. Aura provides a 'single pane of glass' for all financial accounts with powerful categorization rules and export capabilities.",
    technicalSections: [
      {
        title: "Financial Management",
        content: "Monitor income and expenses with detailed categorization. Multiple account support with balance tracking. Real-time net worth calculation and trends. Beautiful charts and analytics powered by Recharts."
      },
      {
        title: "Modern Design",
        content: "Clean, modern interface with glassmorphism effects. Seamless theme switching (Dark/Light) with persistent preferences. Responsive design optimized for desktop, tablet, and mobile devices."
      },
      {
        title: "Local-First Architecture",
        content: "Built on a Local-First architecture using Dexie.js (IndexedDB) for instant client-side storage and Firebase for background synchronization. This ensures the app works perfectly offline and feels native-app fast, while still keeping data backed up across devices."
      }
    ],
    techStack: ["React", "Vite", "Tailwind CSS", "Zustand", "Dexie.js", "Firebase", "Recharts", "Vitest"],
    links: {
      demo: "https://aura-finance-tool.vercel.app/",
      demoLabel: "View Live Website"
    },
    media: {
      heroImage: "/assets/aura-finance/thumbnail.png",
      gallery: [
        {
          url: "/assets/aura-finance/Add transaction demo.mp4",
          type: "video",
          caption: "Adding a transaction demo"
        },
        {
          url: "/assets/aura-finance/analytics.png",
          type: "image",
          caption: "Analytics Dashboard"
        },
        {
          url: "/assets/aura-finance/budgets.png",
          type: "image",
          caption: "Budget Management"
        },
        {
          url: "/assets/aura-finance/thumbnail.png",
          type: "image",
          caption: "Dashboard Overview"
        }
      ]
    }
  },
  {
    id: 'motherboard-inspector',
    title: 'Motherboard Identifier',
    tagline: 'Automated Hardware Inspection CLI',
    role: 'Computer Vision Engineer',
    sponsor: 'SMS InfoComm',
    description: [
      "Engineered an automated inspection tool in Python using OpenCV and Tesseract.",
      "Achieved 100% text‑recognition accuracy on 300+ motherboard images."
    ],
    about: "This tool automates the quality assurance process for refurbished motherboards. It identifies model numbers and detects physical defects (bent pins, missing capacitors) using computer vision.",
    useCase: "Technicians at SMS InfoComm were manually inspecting thousands of boards. This tool reduced inspection time by 90% and eliminated human error in model identification.",
    technicalSections: [
      {
        title: "Computer Vision Pipeline",
        content: "The pipeline uses OpenCV for image preprocessing (adaptive thresholding, contour detection) and Tesseract OCR for text extraction. Custom template matching algorithms verify component placement."
      }
    ],
    techStack: ["Python", "OpenCV", "Tesseract OCR", "NumPy", "CLI"],
    links: {
      demo: "https://tinyurl.com/motherboard-inspector",
      demoLabel: "View Project Poster"
    },
    media: {
      heroImage: "/assets/motherboard-inspector/motherboard_id_main_page.png",
      gallery: [
        {
          url: "/assets/motherboard-inspector/Motherboard Identification.mp4",
          type: "video",
          caption: "Automated inspection process demonstration"
        },
        {
          url: "/assets/motherboard-inspector/motherboard_id_main_page.png",
          type: "image",
          caption: "Main interface showing inspection status"
        },
        {
          url: "/assets/motherboard-inspector/yolov8.png",
          type: "image",
          caption: "YOLOv8 object detection model results"
        },
        {
          url: "/assets/motherboard-inspector/motherboard_id_winjfif.jpg",
          type: "image",
          caption: "Defect detection close-up"
        }
      ]
    }
  }
];
