import { BookOpen, Users, Award, Clock } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: BookOpen,
      title: "Formations de Qualité",
      description: "Des formations créées par des experts dans les domaines de la technologie, design et marketing."
    },
    {
      icon: Users,
      title: "Communauté Active",
      description: "Rejoignez une communauté d'apprenants passionnés du Cameroun et d'ailleurs."
    },
    {
      icon: Clock,
      title: "Apprenez à Votre Rythme",
      description: "Suivez les formations selon votre disponibilité, 24h/24, 7j/7."
    },
    {
      icon: Award,
      title: "Certificats Reconnus",
      description: "Obtenez des certificats qui valorisent votre apprentissage professionnel."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pourquoi choisir EduPlattform ?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nous rendons l'éducation de qualité accessible à tous, peu importe où vous êtes au Cameroun.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 rounded-full">
                    <Icon className="text-green-600" size={32} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
