export type Language = 'en' | 'es';
export type Page = 'language' | 'member' | 'info' | 'screening';

const en = {
  back: "Back",
  home: "Start Over",
  member: {
    title: "Are you an AltaMed member?",
    subtitle: "This helps us show you the right next steps.",
    yes: "Yes, I'm an AltaMed member",
    no: "No, I'm not a member",
  },
  info: {
    title: "Colon cancer: the cancer YOU can prevent.",
    subtitle: "Early testing saves lives. Here's what you need to know.",
    stats: [
      { big: "45–75", text: "Are you this age? It's time to get screened for colorectal cancer." },
      { big: "1 in 20", text: "people in the U.S. are diagnosed with colorectal cancer in their lifetime." },
      { big: "9 out of 10", text: "people survive colorectal cancer with early testing." },
    ],
    ageChange: {
      title: "Screening now starts at 45",
      text: "Recommendations changed from age 50 to age 45, so more people should get screened earlier.",
    },
    whatIsTitle: "What is colorectal cancer?",
    whatIs: "Colorectal cancer starts when cells in your colon or rectum grow in an abnormal way. Over time, they can form a growth called a polyp. Some polyps are harmless, but others can turn into cancer if they aren't removed. Screening can find polyps early, even before you feel sick.",
    symptomsTitle: "Never ignore new or worrying symptoms",
    symptomsIntro: "Tell your provider right away if you notice any of these, at any age:",
    symptoms: [
      "Blood in your stool or from your rectum",
      "A change in bowel habits",
      "A change in the shape or size of your stool",
      "Rectal or belly pain",
      "Unexplained weight loss",
    ],
    familyTitle: "Family history?",
    familyText: "A family history of colorectal cancer can change which tests are right for you. Talk with your provider about the best choice.",
    cta: "Click here to learn how to get screened",
  },
  screening: {
    title: "How to get screened",
    fit: {
      title: "FIT kit",
      what: "A FIT kit is a simple test you do at home. It checks for hidden blood in your stool.",
      steps: [
        "No prep needed. You can do it at home, on your own time.",
        "Follow the instructions in your kit to collect a small stool sample.",
        "Mail the test to the lab, or return it to AltaMed.",
        "Your doctor will contact you with the results.",
      ],
      frequency: "Every year if your result is normal",
      consider: "If your result is abnormal, you will need a colonoscopy.",
    },
    memberKit: {
      title: "Interested in getting a FIT kit?",
      text: "As an AltaMed member, you can get a FIT kit from AltaMed. Call this number to request one:",
      call: "Call to request a FIT kit",
    },
    nonMember: {
      joinTitle: "Interested in getting a FIT kit?",
      aboutTitle: "Become an AltaMed member",
      about: "AltaMed is a nonprofit community health care provider serving Southern California, including Santa Ana. Their motto is “Quality care without exception.” Once you're a member, you can get a FIT kit from AltaMed.",
      joinText: "To become an AltaMed patient, call:",
      call: "Call to become a member",
      otherTitle: "Other community health options in your area",
      otherIntro: "These community clinics serve the Santa Ana area. Call ahead to ask about the services they offer.",
      clinics: [
        {
          name: "Serve the People Community Health Center",
          detail: "1206 E. 17th St., Ste. 101, Santa Ana, CA 92701. Sliding-scale fees available.",
          phone: "714-352-2911",
        },
        {
          name: "Hurtt Family Health Clinic",
          detail: "1100 N. Tustin Ave., Suite A, Santa Ana, CA 92705. Low-cost care for people without insurance.",
          url: "https://www.hurttclinic.org/",
        },
      ],
    },
    otherOptionsTitle: "Interested in learning about other options?",
    tapToOpen: "Tap to learn more",
    whatLabel: "What is it?",
    howLabel: "How do I complete it?",
    considerLabel: "Things to consider",
    cologuard: {
      title: "Cologuard",
      what: "Checks your stool for blood and for DNA that is abnormal.",
      how: [
        "At-home test, delivered to your door.",
        "No prep needed.",
        "Collect a stool sample.",
        "Mail the kit to the lab.",
      ],
      frequency: "Every 3 years if your result is normal",
      consider: "You will need a colonoscopy if your result is abnormal.",
      guide: "See the Cologuard kit guide",
      guidePath: "cologuard-instructions-en.jpg",
    },
    colonoscopy: {
      title: "Colonoscopy",
      badge: "Gold standard in screening",
      what: "Checks for polyps (small growths) in your colon that can become cancer.",
      how: [
        "Outpatient procedure.",
        "Your provider will refer you to a trusted specialist near you.",
        "Prep needed: you must clear your colon with a laxative before the test.",
      ],
      frequency: "Every 10 years if your findings are normal",
      consider: [
        "Calls for anesthesia.",
        "The specialist will remove any small growths and send them for more testing.",
        "You will need transportation to and from the visit.",
      ],
      talkToDoctor: "Talk to your doctor about colonoscopy options.",
    },
    disclaimer: "Talk with your provider about the best choice for you. This guide is for information only and is not medical advice.",
  },
};

export type Content = typeof en;

const es: Content = {
  back: "Atrás",
  home: "Volver al inicio",
  member: {
    title: "¿Es usted miembro de AltaMed?",
    subtitle: "Esto nos ayuda a mostrarle los pasos correctos.",
    yes: "Sí, soy miembro de AltaMed",
    no: "No, no soy miembro",
  },
  info: {
    title: "Cáncer de colon: el cáncer que USTED puede prevenir.",
    subtitle: "Las pruebas tempranas salvan vidas. Esto es lo que necesita saber.",
    stats: [
      { big: "45–75", text: "¿Tiene esta edad? Es hora de hacerse una prueba de detección de cáncer colorrectal." },
      { big: "1 de cada 20", text: "personas en los EE. UU. son diagnosticadas con cáncer colorrectal a lo largo de su vida." },
      { big: "9 de cada 10", text: "personas sobreviven al cáncer colorrectal con pruebas tempranas." },
    ],
    ageChange: {
      title: "Ahora la detección empieza a los 45",
      text: "Las recomendaciones cambiaron de los 50 a los 45 años, para que más personas se hagan la prueba más temprano.",
    },
    whatIsTitle: "¿Qué es el cáncer colorrectal?",
    whatIs: "El cáncer colorrectal comienza cuando las células del colon o del recto crecen de forma anormal. Con el tiempo, pueden formar un crecimiento llamado pólipo. Algunos pólipos son inofensivos, pero otros pueden convertirse en cáncer si no se extirpan. La detección puede encontrar los pólipos temprano, incluso antes de que se sienta enfermo.",
    symptomsTitle: "Nunca ignore síntomas nuevos o preocupantes",
    symptomsIntro: "Avise a su proveedor de inmediato si nota alguno de estos, a cualquier edad:",
    symptoms: [
      "Sangre en las heces o en el recto",
      "Cambios en los hábitos intestinales",
      "Cambios en la forma o el tamaño de las heces",
      "Dolor rectal o abdominal",
      "Pérdida de peso sin explicación",
    ],
    familyTitle: "¿Antecedentes familiares?",
    familyText: "Los antecedentes familiares de cáncer colorrectal pueden cambiar qué pruebas son las adecuadas para usted. Hable con su proveedor sobre la mejor opción.",
    cta: "Haga clic aquí para saber cómo hacerse la prueba",
  },
  screening: {
    title: "Cómo hacerse la prueba",
    fit: {
      title: "Kit FIT",
      what: "Un kit FIT es una prueba sencilla que se hace en casa. Revisa si hay sangre oculta en las heces.",
      steps: [
        "No necesita preparación. Puede hacerla en casa, cuando quiera.",
        "Siga las instrucciones de su kit para recolectar una pequeña muestra de heces.",
        "Envíe la prueba por correo al laboratorio o devuélvala a AltaMed.",
        "Su médico se comunicará con usted para darle los resultados.",
      ],
      frequency: "Cada año si el resultado es normal",
      consider: "Si el resultado es anormal, necesitará una colonoscopia.",
    },
    memberKit: {
      title: "¿Le interesa recibir un kit FIT?",
      text: "Como miembro de AltaMed, puede recibir un kit FIT de AltaMed. Llame a este número para pedirlo:",
      call: "Llame para pedir un kit FIT",
    },
    nonMember: {
      joinTitle: "¿Le interesa recibir un kit FIT?",
      aboutTitle: "Hágase miembro de AltaMed",
      about: "AltaMed es un proveedor de atención médica comunitaria sin fines de lucro que atiende al sur de California, incluida Santa Ana. Su lema es «Alta calidad sin excepción». Cuando sea miembro, podrá recibir un kit FIT de AltaMed.",
      joinText: "Para ser paciente de AltaMed, llame al:",
      call: "Llame para hacerse miembro",
      otherTitle: "Otras opciones de salud comunitaria en su área",
      otherIntro: "Estas clínicas comunitarias atienden el área de Santa Ana. Llame antes para preguntar sobre los servicios que ofrecen.",
      clinics: [
        {
          name: "Serve the People Community Health Center",
          detail: "1206 E. 17th St., Ste. 101, Santa Ana, CA 92701. Tarifas según sus ingresos.",
          phone: "714-352-2911",
        },
        {
          name: "Hurtt Family Health Clinic",
          detail: "1100 N. Tustin Ave., Suite A, Santa Ana, CA 92705. Atención de bajo costo para personas sin seguro.",
          url: "https://www.hurttclinic.org/",
        },
      ],
    },
    otherOptionsTitle: "¿Le interesa conocer otras opciones?",
    tapToOpen: "Toque para saber más",
    whatLabel: "¿Qué es?",
    howLabel: "¿Cómo me hago la prueba?",
    considerLabel: "Lo que debe tener en cuenta",
    cologuard: {
      title: "Cologuard",
      what: "Analiza sus heces para detectar sangre y ADN que sea anormal.",
      how: [
        "Prueba en casa, enviada a su hogar.",
        "No requiere preparación.",
        "Recolecte una muestra de sus heces.",
        "Envíe el kit por correo al laboratorio.",
      ],
      frequency: "Cada 3 años si el resultado es normal",
      consider: "Necesitará una colonoscopia si el resultado es anormal.",
      guide: "Vea la guía del kit de Cologuard",
      guidePath: "cologuard-instructions-es.jpg",
    },
    colonoscopy: {
      title: "Colonoscopia",
      badge: "Estándar de oro en detección",
      what: "Detecta pólipos (pequeños crecimientos) en el colon que pueden convertirse en cáncer.",
      how: [
        "Procedimiento ambulatorio.",
        "Su proveedor le dará una referencia a un especialista confiable cerca de usted.",
        "Necesita preparación: debe limpiar su colon con un laxante antes del procedimiento.",
      ],
      frequency: "Cada 10 años si los resultados son normales",
      consider: [
        "Se requiere anestesia.",
        "El especialista extirpará cualquier crecimiento pequeño y lo enviará para más pruebas.",
        "Necesitará transporte para ir y volver de la visita.",
      ],
      talkToDoctor: "Hable con su médico sobre las opciones de colonoscopia.",
    },
    disclaimer: "Hable con su proveedor sobre la mejor opción para usted. Esta guía es solo informativa y no es consejo médico.",
  },
};

export const content: Record<Language, Content> = { en, es };
