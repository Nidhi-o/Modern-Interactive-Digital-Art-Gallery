import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Palette, Users, Award, Globe, Zap, Code, Lightbulb, Target } from 'lucide-react';

const About: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll({
    // target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  const stats = [
    { icon: Palette, label: 'Artworks', value: '500+', color: 'from-purple-500 to-pink-500' },
    { icon: Users, label: 'Artists', value: '50+', color: 'from-blue-500 to-cyan-500' },
    { icon: Award, label: 'Awards', value: '25+', color: 'from-orange-500 to-red-500' },
    { icon: Globe, label: 'Countries', value: '15+', color: 'from-green-500 to-emerald-500' }
  ];

  const features = [
    {
      icon: Zap,
      title: "Cutting-Edge Technology",
      description: "Harnessing AI, machine learning, and advanced algorithms to create unprecedented digital art experiences."
    },
    {
      icon: Code,
      title: "Creative Coding",
      description: "Where programming meets artistry, creating generative masterpieces that evolve and adapt in real-time."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "Pushing boundaries with experimental techniques and emerging technologies in digital art creation."
    },
    {
      icon: Target,
      title: "Curated Excellence",
      description: "Each piece is carefully selected for its artistic merit, technical innovation, and emotional impact."
    }
  ];

  

  return (
    <section id="about" className="py-32 bg-white dark:bg-black transition-colors duration-700 overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 items-center">
          {/* Content Section */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div 
              className="text-sm tracking-[0.2em] text-purple-600 dark:text-purple-400 font-medium uppercase mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our Story
            </motion.div>
            
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 leading-none">
              About Our
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Vision
              </span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                We are a collective of visionary artists, innovative designers, and pioneering technologists 
                united by a singular mission: to redefine the boundaries of creative expression in the digital age.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Our platform showcases groundbreaking artworks that emerge from the intersection of human 
                creativity and artificial intelligence, where traditional artistic techniques merge seamlessly 
                with cutting-edge digital technologies.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                From AI-generated masterpieces to interactive installations that respond to human emotion, 
                we curate experiences that challenge perceptions and inspire new ways of thinking about 
                art, technology, and the future of creative expression.
              </motion.p>
            </div>
            
            {/* Enhanced Stats Grid */}
            <motion.div
              className="grid grid-cols-2 gap-6 mt-12"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="group relative p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 cursor-pointer border border-gray-100 dark:border-gray-800"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ duration: 0.3 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  custom={index}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            {/* Main Image */}
            <motion.div 
              className="relative overflow-hidden rounded-3xl shadow-2xl"
              style={{ y }}
            >
              <div className="aspect-[4/5] relative">
                <img
                  src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Digital Art Studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-transparent to-pink-600/30" />
              </div>
            </motion.div>
            
            {/* Floating Card */}
            <motion.div
              className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="font-bold text-xl text-gray-900 dark:text-white">Digital Artistry</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Award-winning collective</div>
                </div>
              </div>
            </motion.div>

            {/* Background Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-xl" />
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-xl" />
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          className="mt-32"
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6">
              What Sets Us Apart
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
              Discover the pillars of innovation that drive our digital art revolution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 border border-gray-100 dark:border-gray-800"
                whileHover={{ 
                  scale: 1.02, 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;