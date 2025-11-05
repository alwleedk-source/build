import { useRoute } from "wouter";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPostData {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Temporary static data - will be replaced with API call
    const posts: BlogPostData[] = [
      {
        id: 1,
        title: "5 Tips voor een Succesvolle Nieuwbouw",
        slug: "5-tips-voor-succesvolle-nieuwbouw",
        excerpt: "Bent u van plan om een nieuw huis te bouwen? Deze 5 essentiële tips helpen u om uw nieuwbouwproject tot een succes te maken.",
        content: `
# Introductie

Het bouwen van een nieuw huis is een opwindend maar complex proces. Met de juiste voorbereiding en kennis kunt u veel stress en kosten besparen. In dit artikel delen wij vijf essentiële tips die uw nieuwbouwproject tot een succes maken.

## 1. Begin met een Duidelijk Plan

Een gedetailleerd bouwplan is de basis van elk succesvol project. Neem de tijd om uw wensen en behoeften op papier te zetten. Denk na over:

- Het aantal kamers en hun indeling
- Toekomstige uitbreidingsmogelijkheden
- Energiezuinige voorzieningen
- Budget en tijdlijn

## 2. Kies de Juiste Locatie

De locatie van uw nieuwe huis is net zo belangrijk als het ontwerp zelf. Overweeg factoren zoals:

- Bereikbaarheid van werk, scholen en voorzieningen
- Bodemgesteldheid en bouwmogelijkheden
- Toekomstige ontwikkelingen in de buurt
- Zonoriëntatie voor optimaal daglicht

## 3. Werk met Ervaren Professionals

Een betrouwbaar bouwteam is cruciaal. Zorg ervoor dat u werkt met:

- Gecertificeerde en ervaren aannemers
- Architecten met een bewezen track record
- Transparante communicatie en duidelijke afspraken
- Goede referenties van eerdere klanten

## 4. Focus op Duurzaamheid

Duurzaam bouwen is niet alleen goed voor het milieu, maar bespaart u ook geld op lange termijn:

- Hoogwaardige isolatie
- Zonnepanelen en warmtepompen
- Waterbesparende voorzieningen
- Duurzame materialen

## 5. Plan voor de Toekomst

Denk vooruit en bouw flexibel:

- Aanpasbare ruimtes voor veranderende behoeften
- Smart home technologie
- Toegankelijkheid voor alle levensfasen
- Onderhoudsvriendelijke materialen

## Conclusie

Met deze vijf tips bent u goed voorbereid om uw nieuwbouwproject succesvol te maken. Neem de tijd voor goede voorbereiding en werk samen met ervaren professionals. Het resultaat is een huis waar u jarenlang met plezier zult wonen.

Heeft u vragen over nieuwbouw? Neem gerust contact met ons op voor een vrijblijvend adviesgesprek.
        `,
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop",
        category: "Nieuwbouw",
        author: "Jan de Vries",
        date: "2024-10-15",
      },
    ];

    const foundPost = posts.find(p => p.slug === params?.slug);
    setPost(foundPost || null);
    setLoading(false);
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artikel niet gevonden</h1>
          <Button asChild>
            <a href="/blog">Terug naar blog</a>
          </Button>
        </div>
      </div>
    );
  }

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
        {/* Back Button */}
        <div className="container mb-8">
          <Button variant="ghost" asChild>
            <a href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Terug naar blog
            </a>
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
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.date)}</span>
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
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                // Handle headings
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-3xl font-bold text-foreground mt-12 mb-6">
                      {paragraph.replace('# ', '')}
                    </h1>
                  );
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-foreground mt-10 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                // Handle lists
                if (paragraph.includes('- ')) {
                  const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                  return (
                    <ul key={index} className="space-y-2 my-6">
                      {items.map((item, i) => (
                        <li key={i} className="text-muted-foreground">
                          {item.replace('- ', '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                // Regular paragraphs
                if (paragraph.trim()) {
                  return (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            {/* CTA Section */}
            <div className="mt-16 p-8 bg-primary/5 rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Heeft u vragen over dit onderwerp?
              </h3>
              <p className="text-muted-foreground mb-6">
                Neem contact met ons op voor persoonlijk advies.
              </p>
              <Button asChild>
                <a href="/#contact">
                  Neem contact op
                </a>
              </Button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
