// Common type definitions for the mni-archive-v2 project

export interface Archive {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

// Add more types as needed
