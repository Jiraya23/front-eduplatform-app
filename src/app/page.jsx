import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedCourses from "@/components/FeaturedCourses";
import { courses } from "@/lib/data";

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <Features />
      <FeaturedCourses courses={courses} />
    </div>
  );
}
