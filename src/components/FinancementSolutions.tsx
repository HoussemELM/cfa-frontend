const FinancingSolutions = () => {
    const financingOptions = [
      {
        id: 1,
        title: "Le Compte Personnel de Formation (CPF)",
        description: "Le CPF vous permet de financer tout ou partie de nos formations certifiées. Accessible aux salariés, indépendants, et demandeurs d'emploi, c'est un dispositif simple et efficace pour monter en compétences."
      },
      {
        id: 2,
        title: "Aide Individuelle à la Formation (AIF)",
        description: "Pôle emploi propose l'AIF pour accompagner les demandeurs d'emploi dans leur projet de formation. Nos équipes vous accompagnent dans la constitution de votre dossier."
      },
      {
        id: 3,
        title: "Le Plan de Développement des Compétences",
        description: "Votre employeur peut financer votre formation dans le cadre de ce dispositif destiné à développer les compétences des salariés."
      },
      {
        id: 4,
        title: "Dispositifs spécifiques",
        description: "Vous êtes intérimaire ou travailleur indépendant ? Pas d'inquiétude, d'autres solutions existent et nos conseillers sont là pour vous orienter."
      }
    ];
  
    return (
      <section className="container mx-auto h-auto px-4 py-12 md:py-16 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-primary mb-8">
            Les solutions de financement adaptées à votre situation
          </h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
            {financingOptions.map((option) => (
              <div 
                key={option.id}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {option.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
  
        </div>
      </section>
    );
  };
  
  export default FinancingSolutions;