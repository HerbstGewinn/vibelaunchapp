
export interface AuthDesignTemplate {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  prompt: string;
  style: 'modern' | 'minimal' | 'glassmorphic';
}
