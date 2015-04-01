"use strict";

angular.module('app', ['duScroll'])
    .value('duScrollOffset', 160)
    .controller('MainController', ['$scope',
        function ($scope) {

            $scope.showDemo= true;

            $scope.experienceCards = [
                {
                    logo: 'images/logo/bdt.jpeg',
                    title: 'Big Data Technologies',
                    subtitle: 'Impresa specializzata nello sviluppo, produzione e commercializzazione di applicativi software/web (KMS, CMS, Big Data)',
                    link: '',
                    period: 'da aprile \'13 a oggi',
                    description: 'Progettazione e sviluppo di Web Application (AngularJS, HTML5, CSS3, Javascript, Scala). Gestione e manutenzione degli ambienti di test (Ubuntu Server). Web Framework: RESTful Web Services, Django, Play Framework.'
                },
                {
                    logo: 'images/logo/altran.png',
                    title: 'Altran',
                    subtitle: 'Consulenza in innovazione e in ingegneria high-tech; leader Europeo nel settore di riferimento',
                    link: 'http://www.altran.it/',
                    period: 'da aprile \'11 a aprile \'13',
                    description: 'Progettazione e sviluppo software (Python, .NET, HTML). Utilizzo dei principali sistemi di Test Automation in ambito Digital TV (S3 StormTest, NDS IEX). Analisi dei requisiti e stime di progetto. Validazione e manutenzione software'
                },
                {
                    logo: 'images/logo/franchini.png',
                    title: 'F.lli Franchini',
                    subtitle: 'Progettazione e installazione di impianti elettrici, termoidraulici e da fonti rinnovabili',
                    link: 'http://www.fllifranchini.com/',
                    period: 'da giugno \'10 a aprile \'11',
                    description: 'Analisi e progettazione di interfacce hardware di un prototipo elettronico per applicazioni domotiche. Progettazione AUTOCAD (2D, 3D), ETS (Konnex). Analisi e studio di sistemi SCADA. Studio normative CEI (64-8/60898/60950/23-48). Monitoraggio e stime di produzione (ENEA/UNI) di impianti fotovoltaici'
                }
            ];

            $scope.skills = [
                {
                    title: 'Esperto',
                    list: [
                        {
                            title: 'AngularJS',
                            logo: 'images/logo/angular-logo.png'
                        },
                        {
                            title: 'HTML5',
                            logo: 'images/logo/html5-logo.png'
                        },
                        {
                            title: 'CSS3',
                            logo: 'images/logo/css3-logo.png'
                        },
                        {
                            title: 'jQuery',
                            logo: 'images/logo/jquery-logo.png'
                        },
                        {
                            title: 'Coffescript',
                            logo: 'images/logo/coffeescript-logo.png'
                        },
                        {
                            title: 'Bootstrap',
                            logo: 'images/logo/bootstrap-logo.jpeg'
                        }
                    ]
                },
                {
                    title: 'Ottimo',
                    list: [
                        {
                            title: 'ReactJS',
                            logo: 'images/logo/react-logo.png'
                        },
                        {
                            title: 'GruntJS',
                            logo: 'images/logo/grunt-logo.png'
                        },
                        {
                            title: 'Less',
                            logo: 'images/logo/less-logo.png'
                        },
                        {
                            title: 'Scala',
                            logo: 'images/logo/scala-logo.jpeg'
                        },
                        {
                            title: 'Python',
                            logo: 'images/logo/python-logo.jpeg'
                        },
                        {
                            title: 'Git',
                            logo: 'images/logo/git-logo.jpeg'
                        }
                    ]
                },
                {
                    title: 'Buono',
                    list: [
                        {
                            title: 'Elasticsearch',
                            logo: 'images/logo/elasticsearch-logo.png'
                        },
                        {
                            title: 'PostgresSQL',
                            logo: 'images/logo/postgresql-logo.png'
                        },
                        {
                            title: 'Django',
                            logo: 'images/logo/django-logo.png'
                        },

                        {
                            title: 'Mezzanine',
                            logo: 'images/logo/mezzanine-logo.jpeg'
                        },
                        {
                            title: 'C#',
                            logo: 'images/logo/c-logo.jpeg'
                        },
                        {
                            title: 'Ionic',
                            logo: 'images/logo/ionic-logo.png'
                        }
                    ]
                }
            ];

            $scope.projects = [{
                title: "vivaifrappi.com",
                link: "http://www.vivaifrappi.com",
                img: "images/vivaifrappi.jpeg",
                skills: [
                    {
                        title: 'Django',
                        logo: 'images/logo/django-logo.png'
                    },
                    {
                        title: 'Mezzanine',
                        logo: 'images/logo/mezzanine-logo.jpeg'
                    },
                    {
                        title: 'PostgresSQL',
                        logo: 'images/logo/postgresql-logo.png'
                    },                      {
                        title: 'Python',
                        logo: 'images/logo/python-logo.jpeg'
                    },
                    {
                        title: 'Bootstrap',
                        logo: 'images/logo/bootstrap-logo.jpeg'
                    }

                ]
            }];

        }
    ]);

