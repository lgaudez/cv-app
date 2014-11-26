
angular.module('cvApp')
    .service('I18nService', [ '$translate' ,'tmhDynamicLocale', function($translate, tmhDynamicLocale){
        var self = this;

        this.changeI18n = function (langKey) {
            $translate.use(langKey);
            tmhDynamicLocale.set(langKey);
        };
    }])

    .run(['tmhDynamicLocale', function(tmhDynamicLocale){
        //Set detfault locale to french
        tmhDynamicLocale.set("fr");
    }])

    .config(['tmhDynamicLocaleProvider', function(tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider.localeLocationPattern('/bower_components/angular-i18n/angular-locale_{{locale}}.js');
    }])

    .config(['$translateProvider' , function($translateProvider) {
        $translateProvider.translations('en', {
            'header.about_me': 'About me',
            'header.work': 'Work',
            'header.education' : 'Education',
            'header.skills' : 'Skills',
            'header.contact' : 'Contact',

            /** me **/

            'me.nationality' : 'French',
            'me.title' : 'About me',
            'me.job' : 'Engineer - Developer',
            'me.desc' : 'Full Stack Developer (Java /javascript). I like to develop project from cratch TODO',
            'me.born_on' : 'Born on',
            'me.phone' : '+33635129106',

            /** Education **/

            'education.title' : 'Education',

            'education.education1.start' : '2012',
            'education.education1.end' : 'Present',
            'education.education1.desc' : '... TODO',
            'education.education1.title' : 'Computer Engineering Degree, Major in Computer Science',
            'education.education1.institute' : 'INSA de Lyon, Engineering school',

            'education.education2.start' : '2013',
            'education.education2.end' : '2014',
            'education.education2.place' : 'Chennai, Inde',
            'education.education2.desc' : '... TODO',
            'education.education2.title' : 'Student exchange program, Master in computer science',
            'education.education2.institute' : 'Indian Institute of Technology Madras',

            'education.education3.start' : '2008',
            'education.education3.end' : '2011',
            'education.education3.place' : 'Paris, France',
            'education.education3.desc' : '... TODO',
            'education.education3.title' : 'Licence in Mathematics and Computer Science (three-year university program) with distinction',
            'education.education3.institute' : 'Paris Diderot University',

            'education.education4.start' : '2008',
            'education.education4.place' : 'Paris, France',
            'education.education4.desc' : '... TODO',
            'education.education4.title' : 'Scientific Baccalauréat (A-level)',
            'education.education4.institute' : 'Lycée Lamartine, Highschool',

            /** work **/

            'work.title' : 'Work',

            'work.work1.start' : 'March 2014',
            'work.work1.end' : 'Present',
            'work.work1.place' : 'Paris',
            'work.work1.title' : 'Developer full stack',
            'work.work1.company' : 'Tripndrive',
            'work.work1.desc': 'Spring, java , angular javascript....' ,


            /** contact **/

            'contact.contact_details' : 'Contact details',
            'contact.send_message' : 'Send me a message',

            /** skills **/
            'skills.system' : 'Système d\'exploitation',
            'skills.bdd' : 'Base de données',
            'skills.management' : 'Gestion de projets',
            'skills.frontend' : 'Frontend',
            'skills.backend' : 'Backend',
            'skills.others' : 'Autre'

        })
            .translations('fr', {
                'header.about_me': 'A propos de moi',
                'header.work': 'Expériences',
                "header.education" : 'Formation',
                'header.skills' : 'Compétences',
                'header.contact' : 'Contact',

                /** me **/

                'me.nationality' : 'Français',
                'me.title' : 'A propos de moi',
                'me.job' : 'Ingénieur - Développeur',
                'me.desc' : 'Developpeur Full Stack (Java / javascript). J\'aime à developper des projets TODO',
                'me.born_on' : 'Née le',
                'me.phone' : '+33635129106',

                /** Education **/

                'education.title' : 'Formation',

                'education.education1.start' : '2011',
                'education.education1.end' : '2014',
                'education.education1.place' : 'Lyon, France',
                'education.education1.desc' : '... TODO',
                'education.education1.title' : 'Filière informatique',
                'education.education1.institute' : 'INSA de Lyon, Ecole d\'ingénieur',

                'education.education2.start' : '2013',
                'education.education2.end' : '2014',
                'education.education2.place' : 'Chennai, Inde',
                'education.education2.desc' : '... TODO',
                'education.education2.title' : 'Semestre d\'échange',
                'education.education2.institute' : 'Indian Institute of Technology Madras',

                'education.education3.start' : '2008',
                'education.education3.end' : '2011',
                'education.education3.place' : 'Paris, France',
                'education.education3.desc' : '... TODO',
                'education.education3.title' : 'Licence Mathématiques et informatique, mention bien',
                'education.education3.institute' : 'Université Paris Diderot',

                'education.education4.start' : '2008',
                'education.education4.place' : 'Paris, France',
                'education.education4.desc' : '... TODO',
                'education.education4.title' : 'Bachalauréat scientifique, option Maths',
                'education.education4.institute' : 'Lycée Lamartine',

                /** work **/
                'work.title' : 'Expériences',


                'work.work1.start' : 'Mars 2014',
                'work.work1.end' : 'Aujourd\'hui',
                'work.work1.place' : 'Paris, France',
                'work.work1.title' : 'Developpeur full stack',
                'work.work1.company' : 'Tripndrive',
                'work.work1.desc': 'Spring, java , angular javascript.... TODO' ,

                'work.work2.start' : 'Eté 2013',
                'work.work2.end' : '',
                'work.work2.place' : 'Ile de France, France',
                'work.work2.title' : 'Stage 4 mois',
                'work.work2.company' : 'E.T.A.I',
                'work.work2.desc': 'Receuil des besoins, conception et developpment d\'un POC. Simulation d\'impact en 3D sur carosserie automobile et génération d\'un devis. Intégration au produit existant (solution SAAS). Utilisation et developpement de la partie 3D avec Unity3D. Intégration dans project Java (Struts, maven, Hibernate).',

                'work.work3.start' : 'Eté 2012',
                'work.work3.end' : '',
                'work.work3.place' : 'Ile de France, France',
                'work.work3.title' : 'Stage 3 mois',
                'work.work3.company' : 'Thales Communications & Security',
                'work.work3.desc': 'Etude et conception LDAP d\'un système de séurité billétique. Mise en place d\'un serveur d\'enrolement utilisant EJBCA (open source). Test de montée en charge (Jmeter) et unitaires. Etude et spécification du protocole SCEP pour implémentation d\'un client C++.',

                'work.work4.start' : 'Eté 2008',
                'work.work4.end' : '',
                'work.work4.place' : 'Ile de France, France',
                'work.work4.title' : 'Stage 2 mois',
                'work.work4.company' : 'Flouss.com',
                'work.work4.desc': 'Etude de différentes solutions d\'envoi d\'emails. Installation et adaptation du logiciel choisi (PhpList) sur le réseau de l\'entreprise. Suivi client.',

                /** Contact **/

                'contact.contact_details' : 'Détails',
                'contact.send_message' : 'Envoyez moi un message',

                /** skills **/

                'skill.title' : 'Compétences',

                'skill.system' : 'Système d\'exploitation',
                'skill.bdd' : 'Base de données',
                'skill.management' : 'Gestion de projets',
                'skill.frontend' : 'Frontend',
                'skill.backend' : 'Backend',
                'skill.others' : 'Autre',

                /** Skills **/

                //system
                'skill.system.skill1.title': 'Debian',
                'skill.system.skill1.percent': '75',
                'skill.system.skill2.title': 'Windows 7',
                'skill.system.skill2.percent': '80',

                //Front
                'skill.frontend.skill1.title': 'HTML',
                'skill.frontend.skill1.percent': '85',

                'skill.frontend.skill2.title': 'JS',
                'skill.frontend.skill2.percent': '90',
                'skill.frontend.skill2.desc': 'AngularJs, Jquery',

                'skill.frontend.skill3.title': 'CSS',
                'skill.frontend.skill3.percent': '90',
                'skill.frontend.skill3.desc': 'LESS, SASS',

                //BDD
                'skill.bdd.skill1.title' : 'MySql',
                'skill.bdd.skill1.percent' : '80',
                'skill.bdd.skill2.title' : 'PostgreSql',
                'skill.bdd.skill2.percent' : '80',
                'skill.bdd.skill3.title' : 'OpenLdap',
                'skill.bdd.skill3.percent' : '70',
                'skill.bdd.skill4.title' : 'MongoDb',
                'skill.bdd.skill4.percent' : '75',

                //Back
                'skill.backend.skill1.title' : 'Java',
                'skill.backend.skill1.percent' : '80',
                'skill.backend.skill1.desc': 'JEE, Spring, Struts',
                'skill.backend.skill2.title' : 'PostgreSql',
                'skill.backend.skill2.percent' : '80',
                'skill.backend.skill3.title' : 'OpenLdap',
                'skill.backend.skill3.percent' : '70',
                'skill.backend.skill4.title' : 'MongoDb',
                'skill.backend.skill4.percent' : '75',

                'skill.skill2.title': 'Javascript',
                'skill.skill3.title': 'C / C++',
                'skill.skill4.title': 'HTML'

            });

        $translateProvider.useUrlLoader("http://localhost/translations");

        $translateProvider.preferredLanguage('fr');

    }]);