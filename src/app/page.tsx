import { HeroSection } from "@/components/home/hero";
import { IssuesGrid } from "@/components/home/issues";
import { KintsugiPhilosophySection } from "@/components/home/kintsugi-philosophy";
import { ServicesSection } from "@/components/home/services";
import { BlogPreviewSection } from "@/components/home/blog-preview";
import { ReviewsSection } from "@/components/home/reviews";
import { FaqSection } from "@/components/home/faq";
import { getDemoParams } from "@/lib/demo-params";
import { getPublishedPosts } from "@/lib/blog-service";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HomePage(props: Props) {
  const [params, posts] = await Promise.all([
    getDemoParams(props.searchParams),
    getPublishedPosts(),
  ]);

  return (
    <div className="flex flex-col w-full h-full">
      <HeroSection field={params.fieldDisplay} />
      <IssuesGrid />
      <KintsugiPhilosophySection />
      <ServicesSection />
      <BlogPreviewSection posts={posts} />
      <ReviewsSection />
      <FaqSection />
    </div>
  );
}
