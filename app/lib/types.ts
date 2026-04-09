export interface SectionContent {
  _id: string;
  pageSlug: string;
  sectionApiId: string;
  sectionIndex: number;
  itemIndex: number;
  values: Record<string, any>;
}

export interface PageData {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  isPublished: boolean;
  sections: {
    sectionIndex: number;
    title: string;
    apiIdentifier: string;
    description?: string;
    fields: {
      name: string;
      label?: string;
      type: string;
      placeholder?: string;
      options?: string[];
      required?: boolean;
    }[];
  }[];
}

export interface PageResponse {
  page: PageData;
  content: SectionContent[];
}
