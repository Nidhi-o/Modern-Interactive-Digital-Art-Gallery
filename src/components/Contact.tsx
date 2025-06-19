import React, { useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Linkedin, Clock, MessageCircle, User, AtSign } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { 
      icon: Mail, 
      label: 'Email', 
      value: 'hello@artistry.com', 
      href: 'mailto:hello@artistry.com',
      description: 'Drop us a line anytime'
    },
    { 
      icon: Phone, 
      label: 'Phone', 
      value: '+1 (555) 123-4567', 
      href: 'tel:+15551234567',
      description: 'Call during business hours'
    },
    { 
      icon: MapPin, 
      label: 'Location', 
      value: 'New York, NY', 
      href: '#',
      description: 'Visit our digital studio'
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', color: 'from-pink-500 to-rose-500' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'from-blue-500 to-cyan-500' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'from-blue-600 to-blue-700' }
  ];

  return (
    <section id="contact" className="py-32 bg-gray-50 dark:bg-gray-900 transition-colors duration-700 overflow-hidden">
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
            Let's Connect
          </motion.div>
          
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-8 leading-none">
            Get In
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto font-light leading-relaxed">
            Ready to collaborate on groundbreaking digital art projects or have questions about our curated collection? 
            We'd love to hear from visionary minds like yours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-16">
          {/* Contact Form */}
          <motion.div
            className="xl:col-span-3"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 font-medium"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <AtSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 font-medium"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Subject
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 font-medium"
                    placeholder="What's this about?"
                    required
                  />
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 resize-none font-medium"
                  placeholder="Tell us about your vision, project, or questions..."
                  required
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-5 px-8 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                data-cursor-text="Send Message"
              >
                <motion.div
                  className="flex items-center justify-center"
                  animate={isSubmitting ? { opacity: 0.7 } : { opacity: 1 }}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Send className="mr-2" size={20} />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.div>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="xl:col-span-2 space-y-12"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ y }}
          >
            {/* Contact Info Cards */}
            <div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="group flex items-start space-x-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-100 dark:border-gray-700"
                    whileHover={{ scale: 1.02, x: 8 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    data-cursor-text={item.label}
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                        {item.label}
                      </div>
                      <div className="text-purple-600 dark:text-purple-400 font-semibold mb-1">
                        {item.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8">
                Follow Our Journey
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className={`w-14 h-14 bg-gradient-to-r ${social.color} rounded-2xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1 + index * 0.1 }}
                    data-cursor-text={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Studio Hours */}
            <motion.div
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.3 }}
            >
              <div className="flex items-center mb-6">
                <Clock className="w-6 h-6 text-purple-600 mr-3" />
                <h4 className="font-bold text-xl text-gray-900 dark:text-white">
                  Studio Hours
                </h4>
              </div>
              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Saturday</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sunday</span>
                  <span className="font-semibold text-red-500">Closed</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;