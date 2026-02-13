'use client';

import GlareHover from '@/components/glare-hover';

const articles = [
  {
    id: 1,
    title: 'Worth A Thousand Words',
    date: 'Oct 17, 2008',
    image: '/products/garam-masala.jpg',
  },
  {
    id: 2,
    title: 'Elements',
    date: 'Sep 5, 2008',
    image: '/products/curry-powder.jpg',
  },
  {
    id: 3,
    title: 'More Tags',
    date: 'Jun 21, 2008',
    image: '/products/tandoori-masala.jpg',
  },
  {
    id: 4,
    title: 'Advanced Techniques',
    date: 'Jun 20, 2008',
    image: '/products/chaat-masala.jpg',
  },
  {
    id: 5,
    title: 'Premium Quality Tips',
    date: 'Jun 20, 2008',
    image: '/products/sambar-powder.jpg',
  },
  {
    id: 6,
    title: 'Farm to Table',
    date: 'Jun 20, 2008',
    image: '/products/rasam-powder.jpg',
  },
];

export function BlogSection() {
  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 animate-fadeInUp">
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-4">
            <span className="text-gray-400">NEWS </span>
            <span className="text-primary">AND ARTICLES</span>
          </h2>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <div
              key={article.id}
              className="group cursor-pointer animate-fadeInUp"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <GlareHover
                width="100%"
                height="100%"
                background="transparent"
                borderRadius="8px"
                borderColor="transparent"
                glareColor="#ffffff"
                glareOpacity={0.2}
                glareAngle={-45}
                glareSize={320}
                transitionDuration={600}
                playOnce={false}
                style={{ height: '256px', marginBottom: '16px' }}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Image */}
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 bg-primary text-white rounded-full px-4 py-2 font-bold text-sm shadow-lg">
                    <span className="block text-lg">{article.date.split(' ')[0]}</span>
                    <span className="text-xs">{article.date.split(' ')[1]}</span>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
                </div>
              </GlareHover>

              {/* Content */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Theme Admin</p>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
