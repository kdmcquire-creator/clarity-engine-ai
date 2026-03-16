import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Loader2, Sparkles, BookOpen, Trash2, Copy, Download, Search, Calendar, Eye } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { formatDistanceToNow } from "date-fns";

export default function BriefLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "keyword">("date");

  // Fetch briefs using tRPC
  const { data: briefs = [], isLoading, refetch } = (trpc as any).contentBrief.list.useQuery();
  const deleteMutation = (trpc as any).contentBrief.delete.useMutation();
  const duplicateMutation = (trpc as any).contentBrief.duplicate.useMutation();

  // Filter and sort briefs
  const filteredBriefs = useMemo(() => {
    let filtered = briefs.filter((brief: any) =>
      brief.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brief.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === "keyword") {
      filtered.sort((a: any, b: any) => a.keyword.localeCompare(b.keyword));
    } else {
      filtered.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return filtered;
  }, [briefs, searchQuery, sortBy]);

  const handleDelete = async (briefId: number) => {
    if (!confirm("Are you sure you want to delete this brief?")) return;

    try {
      await deleteMutation.mutateAsync({ briefId });
      toast.success("Brief deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete brief");
    }
  };

  const handleDuplicate = async (briefId: number) => {
    try {
      await duplicateMutation.mutateAsync({ briefId });
      toast.success("Brief duplicated successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to duplicate brief");
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Brief copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-slate-900">
            Clarity Engine
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/content-brief-generator" className="text-slate-600 hover:text-slate-900 transition">
              Generator
            </Link>
            <Link to="/" className="text-slate-600 hover:text-slate-900 transition">
              Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="container max-w-6xl py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Brief Library</h1>
              <p className="text-slate-600 mt-1">Manage and organize your content briefs</p>
            </div>
            <Link to="/content-brief-generator">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate New Brief
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Search Briefs</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search by keyword or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "keyword")}
                className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 font-medium"
              >
                <option value="date">Newest First</option>
                <option value="keyword">Keyword (A-Z)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Briefs Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : filteredBriefs.length === 0 ? (
          <Card className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Briefs Yet</h3>
            <p className="text-slate-600 mb-6">
              {searchQuery ? "No briefs match your search." : "Create your first content brief to get started."}
            </p>
            <Link to="/content-brief-generator">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate First Brief
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredBriefs.map((brief: any) => (
              <Card key={brief.id} className="p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{brief.title || brief.keyword}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-medium">{brief.keyword}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDistanceToNow(new Date(brief.createdAt), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/brief/${brief.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-300 text-slate-900 hover:bg-slate-100"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Brief Preview */}
                <div className="mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-600 line-clamp-3">{brief.briefContent}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(brief.briefContent)}
                    className="border-slate-300 text-slate-900 hover:bg-slate-100"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDuplicate(brief.id)}
                    className="border-slate-300 text-slate-900 hover:bg-slate-100"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Duplicate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-300 text-slate-900 hover:bg-slate-100"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(brief.id)}
                    className="border-red-300 text-red-600 hover:bg-red-50 ml-auto"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
