import { ReactNode } from "react";

export type BusinessDetailsContent = {
  title: string;
  description: string;
  country: string;
  category: string;
  latitude: string;
  longitude: string;
  establishedAt: string;
  instagram: string;
  website: string;
  asHtmlString: string;
  media: BusinessDetailsMedia;
  markerIcon: string;
};

export type BusinessDetailsMedia = {
  featuredImageUrl?: string;
};

export type BusinessDetailsProps = {
  children?: ReactNode;
  content: BusinessDetailsContent;
};
