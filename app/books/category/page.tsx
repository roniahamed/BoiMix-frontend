import Link from "next/link";
import Image from "next/image";
import { MainLayout } from "@/components/layout/main-layout";
import {
  BookOpenIcon,
  Building2Icon,
  GraduationCapIcon,
  SparklesIcon,
  UsersRoundIcon,
} from "lucide-react";

// Duplicated from home page for simplicity, normally would sit in a shared constants file
const categories = [
  {
    title: "Fiction",
    href: "/books/category/fiction",
    icon: BookOpenIcon,
    image: "/categories/fiction.png",
  },
  {
    title: "Academic",
    href: "/books/category/academic",
    icon: GraduationCapIcon,
    image: "/categories/academic.png",
  },
  {
    title: "Self Help",
    href: "/books/category/self-help",
    icon: SparklesIcon,
    image: "/categories/self-help.png",
  },
  {
    title: "Business",
    href: "/books/category/business",
    icon: Building2Icon,
    image: "/categories/business.png",
  },
  {
    title: "Community",
    href: "/community",
    icon: UsersRoundIcon,
    image: "/categories/community.png",
  },
  {
    title: "Biography",
    href: "/books/category/biography",
    icon: UsersRoundIcon,
    image: "/categories/community.png",
  },
  {
    title: "History",
    href: "/books/category/history",
    icon: BookOpenIcon,
    image: "/categories/fiction.png",
  },
  {
    title: "Science",
    href: "/books/category/science",
    icon: SparklesIcon,
    image: "/categories/self-help.png",
  },
  {
    title: "Technology",
    href: "/books/category/technology",
    icon: Building2Icon,
    image: "/categories/business.png",
  },
  {
    title: "Poetry",
    href: "/books/category/poetry",
    icon: BookOpenIcon,
    image: "/categories/fiction.png",
  },
  {
    title: "Drama",
    href: "/books/category/drama",
    icon: UsersRoundIcon,
    image: "/categories/community.png",
  },
  {
    title: "Thriller",
    href: "/books/category/thriller",
    icon: SparklesIcon,
    image: "/categories/self-help.png",
  },
];

export default function CategoryIndexPage() {
  return (
    <MainLayout>
      <div className="boimix-container py-8 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-foreground text-3xl font-bold md:text-4xl">
            All Categories
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Browse our extensive collection by your favorite genres.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="bg-card hover:border-primary border-border group flex flex-col items-center gap-3 rounded-xl border p-6 text-center transition-all duration-300 hover:shadow-md"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-full sm:h-20 sm:w-20">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-foreground group-hover:text-primary font-semibold transition-colors">
                {category.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
