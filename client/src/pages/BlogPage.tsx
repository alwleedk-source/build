import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
}

// Temporary static data - will be replaced with API calls
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "5 Tips voor een Succesvolle Nieuwbouw",
    slug: "5-tips-voor-succesvolle-nieuwbouw",
    excerpt: "Bent u van plan om een nieuw huis te bouwen? Deze 5 essentiële tips helpen u om uw nieuwbouwproject tot een succes te maken.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
    category: "Nieuwbouw",
    author: "Jan de Vries",
    date: "2024-10-15",
  },
  {
    id: 2,
    title: "Duurzaam Bouwen: De Toekomst van Constructie",
    slug: "duurzaam-bouwen-toekomst",
    excerpt: "Ontdek waarom duurzaam bouwen niet alleen goed is voor het milieu, maar ook voor uw portemonnee op lange termijn.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    category: "Duurzaamheid",
    author: "Sophie van Dam",
    date: "2024-10-10",
  },
  {
    id: 3,
    title: "Renovatie vs Nieuwbouw: Wat is de Beste Keuze?",
    slug: "renovatie-vs-nieuwbouw",
    excerpt: "Twijfelt u tussen renoveren of nieuw bouwen? Wij zetten de voor- en nadelen voor u op een rij.",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    category: "Renovatie",
    author: "Mark Jansen",
    date: "2024-10-05",
  },
  {
    id: 4,
    title: "De Nieuwste Trends in Moderne Architectuur",
    slug: "trends-moderne-architectuur",
    excerpt: "Van minimalisme tot biofiele ontwerpen - ontdek de architectuurtrends die 2024 domineren.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    category: "Architectuur",
    author: "Lisa Peters",
    date: "2024-09-28",
  },
  {
    id: 5,
    title: "Hoe Kiest u de Juiste Aannemer?",
    slug: "juiste-aannemer-kiezen",
    excerpt: "Het kiezen van de juiste aannemer is cruciaal voor het succes van uw bouwproject. Lees onze tips.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
    category: "Advies",
    author: "Jan de Vries",
    date: "2024-09-20",
  },
  {
    id: 6,
    title: "Energiezuinig Bouwen: Investering die zich Terugbetaalt",
    slug: "energiezuinig-bouwen",
    excerpt: "Ontdek hoe energiezuinig bouwen uw energierekening drastisch kan verlagen en de waarde van uw woning verhoogt.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    category: "Duurzaamheid",
    author: "Sophie van Dam",
    date: "2024-09-15",
  },
];

const categories = ["Alle", "Nieuwbouw", "Renovatie", "Duurzaamheid", "Architectuur", "Advies"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  const filteredPosts = selectedCategory === "Alle"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
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
              <a
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
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="mt-4 flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Lees meer
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              </a>
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
