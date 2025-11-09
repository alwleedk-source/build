import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import { trpc } from '@/lib/trpc';

export default function BlogSection() {
  const { data: blogPosts = [] } = trpc.blog.getPublished.useQuery();

  if (blogPosts.length === 0) {
    return null;
  }

  // Show only first 3 posts on homepage
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Ons Blog
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Laatste nieuws en inzichten
            </h2>
            <p className="text-lg text-muted-foreground">
              Blijf op de hoogte van de laatste trends en ontwikkelingen in de bouwsector.
            </p>
          </div>
        </ScrollReveal>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.15}>
              <Link
                to={`/blog/${post.slug}`}
                className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category & Date */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.createdAt}>
                        {new Date(post.createdAt).toLocaleDateString('nl-NL', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                    <span>Lees meer</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Button */}
        {blogPosts.length > 3 && (
          <ScrollReveal>
            <div className="text-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-lg"
              >
                Bekijk alle artikelen
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
