import { motion } from 'framer-motion'
import { Users, Building2, Gamepad2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import CTAButton from '../components/CTAbutton'
import React from 'react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-indigo-900 to-purple-900 text-white">
      <Navbar />

      {/* Hero Section */}
      <main className="pt-16">
        <div className="relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 z-0">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-300 text-transparent bg-clip-text">
                Enter Your Virtual World
              </h1>
              <p className="text-xl sm:text-2xl mb-8 text-purple-100 max-w-2xl mx-auto">
                Create, collaborate, and connect in an immersive 2D space that feels just like being together in person.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <CTAButton to="/signin" variant="primary">Get Started</CTAButton>
              <CTAButton variant="secondary">Take a Tour</CTAButton>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
              >
                <Users className="h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Virtual Meetings</h3>
                <p className="text-purple-100">
                  Host team meetings, workshops, and social gatherings in customizable spaces.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
              >
                <Building2 className="h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Custom Spaces</h3>
                <p className="text-purple-100">
                  Design your perfect virtual environment with our intuitive tools.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
              >
                <Gamepad2 className="h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Interactive Games</h3>
                <p className="text-purple-100">
                  Build team spirit with built-in games and activities.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

