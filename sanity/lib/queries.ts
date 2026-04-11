import { groq } from "next-sanity";

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    brandStory,
    processSteps[] {
      title,
      description,
      image
    }
  }
`;

export const lookbookListQuery = groq`
  *[_type == "lookbookEntry"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    materialStory,
    "coverImage": images[0],
    publishedAt,
    "relatedProduct": relatedProduct-> {
      _id,
      name,
      slug,
      status
    }
  }
`;

export const lookbookEntryQuery = groq`
  *[_type == "lookbookEntry" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    materialStory,
    images,
    publishedAt,
    "relatedProduct": relatedProduct-> {
      _id,
      name,
      slug,
      price,
      status,
      "coverImage": images[0]
    }
  }
`;

export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true] | order(_createdAt desc) [0...4] {
    _id,
    name,
    slug,
    price,
    status,
    "coverImage": images[0]
  }
`;

export const productListQuery = groq`
  *[_type == "product"] | order(status asc, _createdAt desc) {
    _id,
    name,
    slug,
    price,
    salePrice,
    status,
    "coverImage": images[0]
  }
`;

export const lookbookLineQuery = groq`
  *[_type == "product" && line == $line] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    salePrice,
    status,
    line,
    "coverImage": images[0]
  }
`;

export const productDetailQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    material,
    price,
    salePrice,
    images,
    inventory,
    status
  }
`;
