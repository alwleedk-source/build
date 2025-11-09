import { useRoute, Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from '@/lib/trpc';

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || '';
  
  const postQuery = trpc.blog.getBySlug.useQuery({ slug });

  if (postQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const post = postQuery.data;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artikel niet gevonden</h1>
          <Button asChild>
            <Link href="/blog">Terug naar blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('nl-NL', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-24">
        {/* Back Button */}
        <div className="container mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Terug naar blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <article className="container">
          <div className="max-w-4xl mx-auto">
            {/* Category */}
            <div className="mb-6">
              <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <button className="flex items-center gap-2 hover:text-primary transition-colors ml-auto">
                <Share2 className="w-5 h-5" />
                <span>Delen</span>
              </button>
            </div>

            {/* Featured Image */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA Section */}
            <div className="mt-16 p-8 bg-primary/5 rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Heeft u vragen over dit onderwerp?
              </h3>
              <p className="text-muted-foreground mb-6">
                Neem contact met ons op voor persoonlijk advies.
              </p>
              <Button asChild>
                <Link href="/#contact">
                  Neem contact op
                </Link>
              </Button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
