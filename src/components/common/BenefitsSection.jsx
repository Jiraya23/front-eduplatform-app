'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function BenefitsSection() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-32">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="font-headline font-extrabold text-4xl mb-6">Une expérience conçue pour l&apos;excellence</h2>
          <p className="text-lg text-on-surface">Nous avons repensé l&apos;apprentissage en ligne pour offrir un accompagnement personnalisé et des résultats concrets.</p>
        </motion.div>

        {/* Feature 1 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
        >
          <motion.div variants={itemVariants} className="flex-1 space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804C9 4.393 9.448 4 10 4s1 .393 1 .804v4.392c0 .411-.448.804-1 .804s-1-.393-1-.804V4.804z"></path>
              </svg>
            </div>
            <h3 className="text-3xl font-extrabold font-headline">Contenu de classe mondiale</h3>
            <p className="text-lg text-on-surface leading-relaxed">
              Accédez à des programmes rigoureux conçus par des leaders d&apos;industrie. Chaque cours est optimisé pour les besoins du marché africain et international.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3 font-medium text-on-surface">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Mises à jour mensuelles des programmes
              </li>
              <li className="flex items-center gap-3 font-medium text-on-surface">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Projets pratiques basés sur des cas réels
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="flex-1 w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-premium group">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8vCgKarY8TI7LukyPOB6lt9tML1YNCl55jnFsmcasb3RMo8M7Ls7ltoP-CKrFEsM52YP1UKTboAbMzVz-dVqg-cnIXLAAiBUu4TzZyzVHhT7q9489H9HtSbyuqvh99yBrslgBL4LoiUrA2F-XL75iRjHT7j9zc5TKsf2AJ7qTBxp222fDdV0L9YLelds8gHqZxQW_fjJ9zJsOQ6YW8EtXkpO_ilFkKJFM5R5zdCD-qdqbCLI67V6_AeM-4hYhFHwLt9GQiUeHTaM"
                alt="Learning"
                width={500}
                height={300}
                className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24"
        >
          <motion.div variants={itemVariants} className="flex-1 space-y-6">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-8">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <h3 className="text-3xl font-extrabold font-headline">Mentorat Personnalisé</h3>
            <p className="text-lg text-on-surface leading-relaxed">
              Bénéficiez de sessions privées avec des mentors qui ont déjà réussi là où vous voulez aller. Un accompagnement sur-mesure pour briser vos plafonds de verre.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3 font-medium text-on-surface">
                <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Support 24/7 via la communauté
              </li>
              <li className="flex items-center gap-3 font-medium text-on-surface">
                <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Revues de code et de design individuelles
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="flex-1 w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-premium group">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmCevlJiEcFL_g0-a4ZOUP5bycdg0bzC1GuBUN3WJ4CJrRvG1QFpvUTMH7Aa-PiotH-q0Srl7AxLHnQEuWVOrn6Iq6gkDqGvK0JJ62avBI4aH4us_h4BkFU4AMaLGG3AwDAnwnvUnoouTCIdJ4aF4BQ12-GituyDh2_ufWuJtsI1AhjDQ-Dk3wS28QOd7lZT-ME08xAWpWY_SSHQXkgr4L7jngdj40UdXyl22na6gRcAE59H2J6ZgsqOwzgwKjteKdxEjAMOH_Maw"
                alt="Mentoring"
                width={500}
                height={300}
                className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
