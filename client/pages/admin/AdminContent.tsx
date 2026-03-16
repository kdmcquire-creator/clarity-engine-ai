import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Plus, Edit, Trash2, Eye, FileText, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminContent() {
  const { user, isAuthenticated } = useAuth();
  const [pages, setPages] = useState([
    {
      id: 1,
      title: "Home",
      slug: "/",
      status: "published",
      updated: "2026-03-09",
      views: 12450,
      author: "John Doe",
    },
    {
      id: 2,
      title: "Tools",
      slug: "/tools",
      status: "published",
      updated: "2026-03-08",
      views: 8920,
      author: "Sarah Johnson",
    },
    {
      id: 3,
      title: "Pricing",
      slug: "/pricing",
      status: "published",
      updated: "2026-03-07",
      views: 4230,
      author: "John Doe",
    },
    {
      id: 4,
      title: "Resources",
      slug: "/resources",
      status: "published",
      updated: "2026-03-05",
      views: 2150,
      author: "Emma Wilson",
    },
    {
      id: 5,
      title: "About",
      slug: "/about",
      status: "draft",
      updated: "2026-03-04",
      views: 0,
      author: "Mike Chen",
    },
  ]);

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Access Denied</h1>
          <Button asChild>
            <Link href="/admin">Return to Admin Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleDeletePage = (id: number) => {
    setPages(pages.filter((p) => p.id !== id));
    toast.success("Page deleted");
  };

  const handlePublish = (id: number) => {
    setPages(pages.map((p) => (p.id === id ? { ...p, status: "published" } : p)));
    toast.success("Page published");
  };

  const publishedCount = pages.filter((p) => p.status === "published").length;
  const draftCount = pages.filter((p) => p.status === "draft").length;
  const totalViews = pages.reduce((sum, p) => sum + p.views, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-slate-900">Content Management</h1>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Page
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Published</h3>
            <p className="text-3xl font-bold text-slate-900">{publishedCount}</p>
            <p className="text-xs text-slate-500 mt-2">Live pages</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Drafts</h3>
            <p className="text-3xl font-bold text-slate-900">{draftCount}</p>
            <p className="text-xs text-slate-500 mt-2">Unpublished</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Views</h3>
            <p className="text-3xl font-bold text-slate-900">{totalViews.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-2">All pages</p>
          </div>
        </div>

        {/* Pages Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Title</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Slug</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Views</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Author</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Updated</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <tr key={page.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-slate-900">{page.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{page.slug}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          page.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {page.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{page.views.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{page.author}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{page.updated}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded transition" title="View">
                          <Eye className="h-4 w-4 text-slate-600" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded transition" title="Edit">
                          <Edit className="h-4 w-4 text-slate-600" />
                        </button>
                        {page.status === "draft" && (
                          <button
                            onClick={() => handlePublish(page.id)}
                            className="p-2 hover:bg-green-100 rounded transition"
                            title="Publish"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeletePage(page.id)}
                          className="p-2 hover:bg-red-100 rounded transition"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
