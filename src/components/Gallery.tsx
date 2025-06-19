import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useInView as useIntersectionObserver } from 'react-intersection-observer';
import { Filter, Grid, Heart, Share2, Download, X, ChevronLeft, ChevronRight, Eye, Expand } from 'lucide-react';

interface Artwork {
  id: number;
  title: string;
  artist: string;
  category: string;
  image: string;
  likes: number;
  description: string;
  year: string;
  medium: string;
  tags: string[];
}

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const { ref, inView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const categories = ['All', 'Abstract', 'Portrait', 'Landscape', 'Conceptual', 'Minimalist', 'Generative'];

  useEffect(() => {
    const mockArtworks: Artwork[] = [
      {
        id: 1,
        title: "Cosmic Resonance",
        artist: "Elena Vasquez",
        category: "Abstract",
        image: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800",
        likes: 342,
        description: "An exploration of cosmic phenomena through algorithmic generation, where digital brushstrokes mimic the birth and death of stars in distant galaxies.",
        year: "2024",
        medium: "Generative AI, Digital Painting",
        tags: ["cosmic", "algorithmic", "stars", "digital"]
      },
      {
        id: 2,
        title: "Neural Networks",
        artist: "Marcus Chen",
        category: "Conceptual",
        image: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800",
        likes: 189,
        description: "A visualization of human consciousness through interconnected digital pathways, exploring the boundary between artificial and organic intelligence.",
        year: "2024",
        medium: "Interactive Installation, Code",
        tags: ["neural", "consciousness", "AI", "interactive"]
      },
      {
        id: 3,
        title: "Digital Persona",
        artist: "Aria Thompson",
        category: "Portrait",
        image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800",
        likes: 456,
        description: "A haunting portrayal of identity in the digital age, where traditional portraiture meets cutting-edge facial recognition algorithms.",
        year: "2023",
        medium: "Neural Style Transfer, Photography",
        tags: ["identity", "portrait", "algorithm", "recognition"]
      },
      {
        id: 4,
        title: "Ethereal Landscapes",
        artist: "Kai Nakamura",
        category: "Landscape",
        image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800",
        likes: 523,
        description: "Imaginary worlds born from the intersection of natural beauty and artificial intelligence, creating landscapes that exist only in digital dreams.",
        year: "2024",
        medium: "Procedural Generation, 3D Rendering",
        tags: ["landscape", "procedural", "3D", "dreams"]
      },
      {
        id: 5,
        title: "Geometric Infinity",
        artist: "Sophie Laurent",
        category: "Minimalist",
        image: "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800",
        likes: 278,
        description: "Pure mathematical beauty expressed through minimal geometric forms, where each line and curve follows precise algorithmic rules.",
        year: "2024",
        medium: "Parametric Design, Vector Graphics",
        tags: ["geometric", "minimal", "mathematical", "parametric"]
      },
      {
        id: 6,
        title: "Fluid Dynamics",
        artist: "Diego Morales",
        category: "Abstract",
        image: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=800",
        likes: 391,
        description: "A mesmerizing dance of color and form inspired by fluid simulation algorithms and particle systems.",
        year: "2023",
        medium: "Particle Simulation, Digital Art",
        tags: ["fluid", "simulation", "particles", "dynamic"]
      },
      {
        id: 7,
        title: "Quantum Entanglement",
        artist: "Dr. Sarah Kim",
        category: "Conceptual",
        image: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800",
        likes: 612,
        description: "A visual representation of quantum physics principles, where particles exist in multiple states simultaneously until observed.",
        year: "2024",
        medium: "Scientific Visualization, WebGL",
        tags: ["quantum", "physics", "particles", "science"]
      },
      {
        id: 8,
        title: "Algorithmic Poetry",
        artist: "Luca Rossi",
        category: "Generative",
        image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
        likes: 267,
        description: "Where code becomes poetry and algorithms write visual verses, creating unique compositions with each iteration.",
        year: "2024",
        medium: "Generative Code, Creative Coding",
        tags: ["generative", "code", "poetry", "algorithmic"]
      },
      {
        id: 9,
        title: "Digital Metamorphosis",
        artist: "Zara Al-Rashid",
        category: "Abstract",
        image: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800",
        likes: 445,
        description: "A continuous transformation of digital matter, exploring themes of change and evolution in the virtual realm.",
        year: "2023",
        medium: "Motion Graphics, AI-Assisted",
        tags: ["metamorphosis", "transformation", "evolution", "motion"]
      }
    ];
    setArtworks(mockArtworks);
  }, []);

  const filteredArtworks = filter === 'All' 
    ? artworks 
    : artworks.filter(artwork => artwork.category === filter);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section id="gallery" className="py-32 bg-gray-50 dark:bg-gray-900 transition-colors duration-700">
      <div className="max-w-8xl mx-auto px-6 sm:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-20"
        >
          <motion.div 
            className="text-sm tracking-[0.2em] text-purple-600 dark:text-purple-400 font-medium uppercase mb-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Curated Collection
          </motion.div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-8 tracking-tight leading-none">
            Featured
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Discover extraordinary digital artworks from visionary artists pushing the boundaries of creative technology
          </p>
        </motion.div>

        {/* Enhanced Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16"
        >
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-500 cursor-pointer overflow-hidden ${
                  filter === category
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm'
                }`}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.4 }}
                data-cursor-text={category}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ display: filter === category ? 'none' : 'block' }}
                />
                <span className="relative z-10 flex items-center text-sm">
                  <Filter className="mr-1.5 opacity-60" size={12} />
                  {category}
                </span>
              </motion.button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1 border border-gray-200/50 dark:border-gray-700/50">
            <motion.button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-purple-600'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Grid size={16} />
            </motion.button>
            <motion.button
              onClick={() => setViewMode('masonry')}
              className={`p-2 rounded-full transition-all duration-300 ${
                viewMode === 'masonry' 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-purple-600'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Expand size={16} />
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Gallery Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                variants={item}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="group cursor-pointer"
                onClick={() => setSelectedArtwork(artwork)}
                onMouseEnter={() => setHoveredId(artwork.id)}
                onMouseLeave={() => setHoveredId(null)}
                data-cursor-text="View Details"
              >
                <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-700 transform group-hover:-translate-y-6">
                  <div className={`${viewMode === 'masonry' && index % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[4/5]'} overflow-hidden relative`}>
                    <motion.img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      initial={{ scale: 1.1 }}
                      animate={{ 
                        scale: hoveredId === artwork.id ? 1.2 : 1.1 
                      }}
                      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                    
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredId === artwork.id ? 1 : 0 
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: hoveredId === artwork.id ? 1 : 0,
                        scale: hoveredId === artwork.id ? 1 : 0.8
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                        <Eye className="text-white" size={28} />
                      </div>
                    </motion.div>

                    {/* Artwork Tags */}
                    <motion.div 
                      className="absolute top-4 left-4 flex flex-wrap gap-1"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ 
                        opacity: hoveredId === artwork.id ? 1 : 0,
                        y: hoveredId === artwork.id ? 0 : -20
                      }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      {artwork.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span 
                          key={tag}
                          className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="p-6 space-y-4"
                    animate={{ 
                      y: hoveredId === artwork.id ? -8 : 0 
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white leading-tight">
                          {artwork.title}
                        </h3>
                        <p className="text-purple-600 dark:text-purple-400 font-semibold">
                          {artwork.artist}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          {artwork.year} • {artwork.medium}
                        </p>
                      </div>
                      <motion.div 
                        className="flex items-center space-x-2 text-gray-500 dark:text-gray-400"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Heart size={18} className="text-red-500" />
                        <span className="text-sm font-semibold">{artwork.likes}</span>
                      </motion.div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 px-3 py-1.5 rounded-full">
                        {artwork.category}
                      </span>
                      
                      <motion.div 
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center space-x-2"
                      >
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          className="p-2 text-gray-400 hover:text-purple-600 transition-colors cursor-pointer"
                        >
                          <Share2 size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: -5 }}
                          className="p-2 text-gray-400 hover:text-purple-600 transition-colors cursor-pointer"
                        >
                          <Download size={16} />
                        </motion.button>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Artwork Modal */}
        <AnimatePresence>
          {selectedArtwork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
              onClick={() => setSelectedArtwork(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ 
                  type: "spring", 
                  damping: 25, 
                  stiffness: 300,
                  duration: 0.6
                }}
                className="max-w-7xl w-full bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
                  <div className="relative">
                    <img
                      src={selectedArtwork.image}
                      alt={selectedArtwork.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setSelectedArtwork(null)}
                      className="absolute top-6 right-6 w-12 h-12 bg-black/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/40 transition-all duration-300 cursor-pointer"
                    >
                      <X size={20} />
                    </button>
                    
                    <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                      {selectedArtwork.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12 flex flex-col justify-center space-y-8">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 px-4 py-2 rounded-full">
                          {selectedArtwork.category}
                        </span>
                        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                          <Heart className="text-red-500" size={18} />
                          <span className="font-semibold">{selectedArtwork.likes}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight">
                        {selectedArtwork.title}
                      </h3>
                      
                      <div className="space-y-3">
                        <p className="text-2xl lg:text-3xl text-purple-600 dark:text-purple-400 font-bold">
                          {selectedArtwork.artist}
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                          {selectedArtwork.year} • {selectedArtwork.medium}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                      {selectedArtwork.description}
                    </p>
                    
                    <div className="flex space-x-4 pt-6">
                      <motion.button
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Heart className="inline mr-2" size={18} />
                        Like Artwork
                      </motion.button>
                      
                      <motion.button
                        className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 cursor-pointer"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Share2 className="inline mr-2" size={18} />
                        Share
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;