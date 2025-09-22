import { Link, useParams } from "react-router-dom";
import "./FormationDetails.scss";
import CoursDetailsTabs from "@/components/CoursDetailsTabs";
import { FaFacebook, FaInstagram, FaLinkedin, FaPlay, FaTwitter } from "react-icons/fa";
import { a1 } from "@/utils/assets";
import TReviewBar from "@/components/TReviewBar";
import { useState, useEffect, Suspense, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Clock, BarChart2, Users, Globe, Award, Bookmark, Share2, Star, PlayCircle, ChevronUp, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { CourseModel } from "@/models/CourseModel";
import FloatingActionButton from "@/components/FloatingActionButton";
import { CourseService } from "@/services/CourseService";
import { LockClosedIcon } from "@radix-ui/react-icons";

import CategoryService from "@/services/CategoryService";
import {  FILE_URL } from "@/utils/constants";
import FormationDetailsSkeleton from "@/components/FormationDetailsSkeleton";
import TabSkeleton from "@/components/TabSkeleton";
import { useCachedCourse } from "@/hooks/useCachedCourse";
import SingupDialog from "@/components/dialogs/SingupDialog";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ApercuTab = ({ formation }: { formation: CourseModel }) => {
  return (
    <motion.div
      className="apercu p-2 md:p-3 lg:p-4 max-w-4xl mx-auto"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={staggerChildren}
    >
      <motion.div className="space-y-4 mb-8"
      variants={fadeIn}
      dangerouslySetInnerHTML={{ __html: formation.apercu }} />
    </motion.div>
  );
};

const CoursTab = ({ formation }: { formation: CourseModel }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  useEffect(() => {
    setExpandedSections(formation.sections.map(section => section.id));
  }, [formation.sections]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const totalDuration = formation.sections.reduce((total, section) => {
    return total + section.lectures.reduce((sectionTotal, lecture) =>
      sectionTotal + (lecture.duration || 0), 0);
  }, 0);
  const [expandedLectures, setExpandedLectures] = useState<Record<string, boolean>>({});

  const toggleDescription = (lectureId:string) => {
    setExpandedLectures(prev => ({
      ...prev,
      [lectureId]: !prev[lectureId]
    }));
  };
  return (
    <motion.div
      className="cours-tab w-full px-2 sm:px-3 md:px-4 lg:px-6 max-w-4xl mx-auto"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={staggerChildren}
    >
      <motion.div variants={fadeIn} className="mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Contenu du cours</h2>
          <div className="text-xs sm:text-sm text-gray-600 flex flex-wrap gap-2">
            <span>{formation.sections.length} Chapitres</span>
            <span className="hidden sm:inline mx-2">•</span>
            <span>{formation.sections.reduce((total, section) => total + section.lectures.length, 0)} leçons</span>
            <span className="hidden sm:inline mx-2">•</span>
            <span>Durée: {Math.floor(totalDuration / 60)}h {totalDuration % 60}min</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="space-y-3 md:space-y-4"
        variants={fadeIn}
      >
        {formation.sections.map((section, index) => (
          <div
            key={section.id}
            className="border rounded-lg overflow-hidden bg-white shadow-sm"
          >
            <div
              className="w-full cursor-pointer bg-slate-300 p-3 sm:p-4 flex items-center justify-between hover:bg-slate-200 transition-colors"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <span className="text-primary font-medium text-sm sm:text-base whitespace-nowrap">
                  Chapitre {index + 1}:
                </span>
                <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">
                  {section.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 ml-2 whitespace-nowrap">
                <span className="text-xs sm:text-sm text-gray-600">
                  {section.lectures.length} leçons
                </span>
                {expandedSections.includes(section.id) ?
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /> :
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                }
              </div>
            </div>

            {expandedSections.includes(section.id) && (
              <div className="border-t">
                {section.lectures.map((lecture) => (
                  <div
                    key={lecture.id}
                    className="border-b last:border-b-0"
                  >
                    <div
                      className={`
                        p-3 sm:p-4 flex items-center justify-between
                        hover:bg-gray-50 transition-colors
                      `}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                        <span className="text-gray-900 text-sm sm:text-base truncate">
                          {lecture.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 ml-2">
                        <div className="flex items-center text-gray-600 whitespace-nowrap">
                          <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">
                            {Math.floor(lecture.duration / 60)}:{String(lecture.duration % 60).padStart(2, '0')}
                          </span>
                        </div>
                          {!false  && (
                          <LockClosedIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                        <button 
                          onClick={() => toggleDescription(lecture.id)}
                          className="text-primary bg-transparent hover:bg-transparent text-xs sm:text-sm flex items-center ml-2 focus:outline-none hover:underline"
                          aria-expanded={expandedLectures[lecture.id]}
                        >
                          <span className="mr-1">Voir description</span>
                          {expandedLectures[lecture.id] ? (
                            <ChevronUp className="w-4 h-4 transition-transform duration-300" />
                          ) : (
                            <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div 
                      className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${expandedLectures[lecture.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                      `}
                    >
                      <div className="bg-gray-50 p-3 sm:p-4 text-sm text-gray-700">
                        {lecture.description || "Aucune description disponible."}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {formation.sections.length === 0 && (
        <motion.div
          variants={fadeIn}
          className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base"
        >
          Aucune section n'est disponible pour ce cours pour le moment.
        </motion.div>
      )}
    </motion.div>
  );
};

const FormateurTab = ({ formation, categoryName }: { formation: CourseModel, categoryName: string }) => {
  return (
    <motion.div
      className="formateur-tab w-full  mx-auto px-4 sm:px-6 lg:px-8 py-8"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={staggerChildren}
    >
      {formation.teacher.map((teacher) => (
        <motion.div
          key={teacher.id}
          variants={fadeIn}
          className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl mb-8 last:mb-0"
        >
          <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-8">
            {/* Teacher Image Section  cert*/}
            <div className="w-1/3 lg:w-1/6 mx-auto">
              <div className="relative aspect-square rounded-full overflow bg-gray-100">
                {formation.teacher[0].avatar ? (
                  <img
                    src={`${FILE_URL}/${formation.teacher[0].collectionId}/${formation.teacher[0].id}/${formation.teacher[0].avatar}`}
                    alt={`${teacher.name} ${teacher.secondname}`}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <img src={a1} alt={`${teacher.name} ${teacher.secondname}`} className="w-full rounded-full h-full object-cover" />
                )}
                {teacher.verified && (
                  <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg">
                    <Award className="w-6 h-6" />
                  </div>
                )}
              </div>
            </div>

            {/* Teacher Info Section */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {teacher.name} {teacher.secondname}
                  </h2>
                  <p className="text-primary text-lg font-semibold">
                    {teacher.role === 'teacher' ? 'Formateur' : teacher.role}
                  </p>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-gray-50 rounded-xl p-1 md:p-4 lg:p-6">
                <h3 className="text-xl font-bold text-primary mb-4">À propos du formateur</h3>
                <p className="text-gray-700 leading-relaxed">
                  {teacher.description ||
                    `${teacher.name} est un formateur passionné spécialisé dans ${categoryName}. 
                    Avec une vaste expérience dans le domaine, il s'engage à fournir une éducation de qualité 
                    et à aider ses étudiants à atteindre leurs objectifs d'apprentissage.`
                  }
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};


const ReviewTab = ({ formation }: { formation: CourseModel }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="review-tab p-4 md:p-6 lg:p-8 max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 mb-12 text-center shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 to-primary"/>
        <div className="text-4xl md:text-5xl font-bold text-primary mb-4">
          {formation.review.rating}
        </div>
        <div className="flex justify-center gap-1 mb-3">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className="w-6 h-6 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>
        <div className="text-sm md:text-base text-gray-600 font-medium">
          Basé sur <span className="text-primary">{formation.review.count}</span> avis vérifiés
        </div>
      </motion.div>

      <motion.div
        className="space-y-8"
        variants={containerVariants}
      >
        {formation.reviews.map((review, index) => (
          <motion.div
          key={index}
          variants={itemVariants}
          className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 relative"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
            <div className="flex gap-1">
              {[...Array(review.rating)].map((_, idx) => (
                <Star
                  key={idx}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-800 md:ml-2 md:border-l md:border-gray-200 md:pl-4">
              {review.user.name}
            </span>
          </div>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed italic">
            "{review.review}"
          </p>
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -z-10"/>
        </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const FormationDetails = () => {
  const { id } = useParams();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const courseService = CourseService.getInstance();
  const categoryService = CategoryService.getInstance();
  
  const { formation, category, courseLoading, categoryLoading, courseError } = useCachedCourse(
    id!, 
    courseService,
    categoryService
  );

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const threshold = 300;
    setShowFloatingButton(scrollPosition > threshold);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const openDialog = useCallback(() => setDialogOpen(true), []);
  const closeDialog = useCallback(() => setDialogOpen(false), []);

  if (courseLoading || categoryLoading) {
    return <FormationDetailsSkeleton />;
  }

  if (courseError) {
    return (
      <div className="error-container">
        <h2>Error loading course</h2>
        <p>{courseError.message}</p>
      </div>
    );
  }

  if (!formation) {
    return <div>Course not found</div>;
  }

  const tabs = [
    {
      element: (
        <Suspense fallback={<TabSkeleton />}>
          <ApercuTab formation={formation} />
        </Suspense>
      ),
      title: "Aperçu"
    },
    {
      element: (
        <Suspense fallback={<TabSkeleton />}>
          <CoursTab formation={formation} />
        </Suspense>
      ),
      title: "Cours"
    },
    {
      element: (
        <Suspense fallback={<TabSkeleton />}>
          <FormateurTab
            formation={formation}
            categoryName={category?.name ?? ""}
          />
        </Suspense>
      ),
      title: "Formateur"
    },
    {
      element: (
        <Suspense fallback={<TabSkeleton />}>
          <ReviewTab formation={formation} />
        </Suspense>
      ),
      title: "Review"
    }
  ];
  return (
    <div id="formation_details">
      <SingupDialog onClose={closeDialog} isOpen={isDialogOpen}/>
      {/* <IncrireDialog courseName={formation.title} courseId={formation.id} open={isDialogOpen} onClose={closeDialog} /> */}
      <div className="mobile-hero-section" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${FILE_URL}/${formation.collectionId}/${formation.id}/${formation.thumbnail})`
      }}>
        <div className="container">
          <div className="hero-actions">
            <Button variant="ghost" size="icon" className="action-button">
              <Bookmark className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="action-button">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          <div className="course-meta">
            <span className="category-badge">{category?.name}</span>
            <div className="rating-badge">
              <Star className="w-4 h-4 fill-current" />
              <span>{formation.review.rating}</span>
            </div>
          </div>

          <h1 className="course-title">{formation.title}</h1>
          <p className="course-description">
            {formation.subtitle}
          </p>
        </div>
      </div>

      <div className="mobile-quick-info">
        <div className="instructor-info">
          <div className="instructor-avatars">
            {formation.teacher[0].avatar ? (
              <img
                src={`${FILE_URL}/${formation.teacher[0].collectionId}/${formation.teacher[0].id}/${formation.teacher[0].avatar}`}
                alt="Instructor 1"
              />
            ) : (
              <img src={a1} alt="Instructor 1" />
            )}
          </div>
{/* mobile */}
          <div>
            <span className="label">Créé par</span>
            <h3 className="names">{formation.teacher[0].name}</h3>
            <span className="credentials">Experts en {category?.name}</span>
          </div>
        </div>

        <div className="course-stats">
          <div className="stat-item">
            <Users className="stat-icon" />
            <div>
              <span className="value">{formation.students_enrolled ?? 50}</span>
              <span className="label">Étudiants</span>
            </div>
          </div>
          <div className="stat-item">
            <Clock className="stat-icon" />
            <div>
              <span className="value">{formation.duration ?? "N/A"}</span>
              <span className="label">Durée</span>
            </div>
          </div>
        </div>

        <div className="key-features">
          <div className="feature-item">
            <Globe className="feature-icon" />
            <span>{formation.language}</span>
          </div>
          <div className="feature-item">
            <Award className="feature-icon" />
            <span>{(formation.certification || true) ? "Certificat inclus" : "N/A"}</span>
          </div>
          <div className="feature-item">
            <BarChart2 className="feature-icon" />
            <span>Tous niveaux</span>
          </div>
        </div>
      </div>

      <div className="desktop-hero-section">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Accueil</Link>
            <Link to="/formations">Formations</Link>
            <Link to="/formations">{category?.name}</Link>
            <span>{formation.title}</span>
          </div>

          <div className="course-intro">
            <h1>{formation.title}</h1>
            <p className="description">
              {formation.subtitle}
            </p>

            <div className="meta-row">
              <div className="instructors">
                <div className="avatar-stack">
                  {formation.teacher[0].avatar ? (
                    <img
                      src={`${FILE_URL}/${formation.teacher[0].collectionId}/${formation.teacher[0].id}/${formation.teacher[0].avatar}`}
                      alt="Instructor 1"
                    />
                  ) : (
                    <img src={a1} alt="Instructor 1" />
                  )}
                </div>
                <div className="info">
                  <span>Formateur</span>
                  <h6>{formation.teacher[0].name}</h6>
                </div>
              </div>

              <div className="rating-info">
                <TReviewBar rating={formation.review.rating} />
                <span>
                  <strong>{formation.review.rating}</strong>
                  <span className="count">({formation.review.count})</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="container">
          <div className="content-grid">
            <div className="course-content">
              <CoursDetailsTabs tabs={tabs} />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="course-sidebar"
            >
              <div className="preview-card lg:-translate-y-64 lg:translate-x-8">
                <div className="video-preview">
                  <img src={`${FILE_URL}/${formation.collectionId}/${formation.id}/${formation.thumbnail}`} alt={formation.title} />
                  <button className="play-button flex items-center justify-center">
                    <FaPlay />
                  </button>
                </div>
                <div className="course-info">
                  <div className="features-list">
                    <div className="feature">
                      <Clock className="feature-icon" />
                      <div>
                        <span>La durée du cours</span>
                        <strong>{formation.duration ?? "N/A"}</strong>
                      </div>
                    </div>
                    <div className="feature">
                      <BarChart2 className="feature-icon" />
                      <div>
                        <span>Niveau d'études</span>
                        <strong>{formation.requirements.map((r)=>r.name).join(", ")}</strong>
                      </div>
                    </div>
                    <div className="feature">
                      <Users className="feature-icon" />
                      <div>
                        <span>Students Enrolled</span>
                        <strong>{formation.students_enrolled}</strong>
                      </div>
                    </div>
                    <div className="feature">
                      <Globe className="feature-icon" />
                      <div>
                        <span>Langage</span>
                        <strong>{formation.language}</strong>
                      </div>
                    </div>
                    <div className="feature">
                      <Award className="feature-icon" />
                      <div>
                        <span>Certification</span>
                        <strong>{formation.certification ?? "Oui"}</strong>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="enroll-button"
                    onClick={openDialog}
                    size="lg"
                  >
                    S'inscrire maintenant
                  </Button>

                  <div className="share-section">
                    <span>Partager ce cours:</span>
                    <div className="social-links">
                      <Button variant="outline" size="icon"><FaFacebook /></Button>
                      <Button variant="outline" size="icon"><FaLinkedin /></Button>
                      <Button variant="outline" size="icon"><FaInstagram /></Button>
                      <Button variant="outline" size="icon"><FaTwitter /></Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="floating-enroll-button"
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: showFloatingButton ? 0 : 100,
          opacity: showFloatingButton ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={openDialog}
          className="enroll-now"
          size="lg"
        >
          S'inscrire maintenant
          <span className="price">€{formation.price}</span>
        </Button>
      </motion.div>
      <FloatingActionButton/>
    </div>
  );
};

export default FormationDetails;
