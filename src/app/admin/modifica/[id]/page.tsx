import { verifyAdminSession } from "@/app/actions/admin-blog";
import { getPostByIdAdmin } from "@/lib/blog-service";
import { redirect, notFound } from "next/navigation";
import { AdminPostEditor } from "@/components/admin/post-editor";
import { AutumnBranch } from "@/components/decorations/autumn-decorations";

export const metadata = {
  title: "Modifica Articolo | Portale Medico",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ModificaArticoloPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const post = await getPostByIdAdmin(id);

  if (!post) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-[#F5EBE1] pt-10 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 translate-x-6 -translate-y-6 pointer-events-none z-0">
        <AutumnBranch className="w-36 sm:w-48 h-44 sm:h-56 opacity-40 sm:opacity-50" flipped />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <AdminPostEditor post={post} />
      </div>
    </div>
  );
}
