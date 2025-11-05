import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight } from "lucide-react";
import { trpc } from '@/lib/trpc';
import { Link } from "wouter";

const categories = ["Alle", "Nieuwbouw", "Renovatie", "Duurzaamheid", "Architectuur", "Advies"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  
  const blogPostsQuery = trpc.blog.getPublished.useQuery();
  
  const filteredPosts = useMemo(() => {
    if (!blogPostsQuery.data) return [];
    
    if (selectedCategory === "Alle") {
      return blogPostsQuery.data;
    }
    
    return blogPostsQuery.data.filter(post => post.category === selectedCategory);
  }, [blogPostsQuery.data, selectedCategory]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('nl-NL', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (blogPostsQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Blog laden...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="container mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Blog
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Nieuws & Inzichten
            </h1>
            <p className="text-lg text-muted-foreground">
              Blijf op de hoogte van de laatste trends, tips en ontwikkelingen in de bouwwereld.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="container mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'bg-card border border-border text-foreground hover:border-primary hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="h-full rounded-2xl overflow-hidden bg-card border border-border hover:border-primary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="mt-4 flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Lees meer
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                Geen artikelen gevonden in deze categorie.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
