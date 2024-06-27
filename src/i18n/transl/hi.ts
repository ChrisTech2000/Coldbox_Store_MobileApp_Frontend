import type { Translations } from './en';

export default {
  languages: {
    current: 'हिन्दी',
    label: 'भाषा',
    options: {
      en: 'अंग्रेज़ी',
      hi: 'हिन्दी',
      or: 'ओरिया',
      gu: 'गुजराती',
      fr: 'फ़्रेंच',
      pt: 'पुर्तगाली',
    },
  },
  actions: {
    error: 'एक त्रुटि हुई',
    cancel: 'रद्द करें',
    confirm: 'पुष्टि करें',
    import: 'आयात',
    yes: 'हाँ',
    no: 'नहीं',
    select: 'चुनिए',
    close: 'बंद करें',
    delete: 'मिटाएं',
    ok: 'ओके',
    all: 'सभ',
    none: 'कोई नहीं',
    next: 'अगला',
    back: 'वापस',
    search: 'खोजा जा रहा है...',
    or: 'या',
    'not-available': 'अभी उपलब्ध नहीं है',
    'complete-later': 'बाद में पूरा करें',
    'update-success': 'सफलतापूर्वक उत्परिवर्तित',
  },
  Auth: {
    Root: {
      welcome: 'स्वागतम',
      signIn: 'साइन इन करें',
      signUpCompany: 'अस कंपनी साइन अप करें',
      signUpCoolingUser: 'કૂલિંગ યુઝર તરીકે સાઇન અપ કરો',
      appInfo: 'सामान्यतःपूछे जाने वाले प्रश्न',
    },
    SignIn: {
      heading: 'साइन इन करें',
      accounts: {
        registeredEmployee: {
          label: 'सर्विस प्रोवाइडर',
          description:
            'कोल्ड रूम प्रदाता प्रबंधन टीम का हिस्सा। एक पंजीकृत कर्मचारी कंपनी को ऐप में पंजीकृत कर सकता है और अन्य कर्मचारियों को शामिल होने के लिए आमंत्रित कर सकता है। पंजीकृत कर्मचारी ईमेल या फोन नंबर से लॉग इन कर सकते हैं।",',
        },
        operator: {
          label: 'ऑपरेटर',
          description:
            'कर्मचारी शारीरिक रूप से कोल्ड रूम में मौजूद है और इसके चेक-इन, चेक-आउट संचालन का प्रबंधन करता है। पंजीकृत कर्मचारियों द्वारा कंपनी में शामिल होने के लिए ऑपरेटरों को आमंत्रित किया जा सकता है। ऑपरेटर फोन नंबर से लॉग इन कर सकते हैं।"',
        },
        coolingUser: {
          label: 'किसान',
          description:
            'कोल्ड रूम उपयोगकर्ता। किसान, व्यापारी, खुदरा विक्रेता जिनके पास स्मार्टफोन है, वे यहां लॉग इन कर सकते हैं। स्मार्टफोन के बिना कोल्ड रूम के उपयोगकर्ता कोल्ड रूम में जाकर और ऑपरेटर के साथ बातचीत करके ऐप की जानकारी तक पहुंच सकते हैं',
        },
      },
      form: {
        user: {
          placeholder: 'ईमेल/ फ़ोन नंबर',
          description: {
            default: 'कृपया वैध ईमेल या फोन नंबर प्रदान करें', // TODO: review this
            registeredEmployee: 'कृपया वैध ईमेल या फोन नंबर प्रदान करें',
          },
          messages: {
            default: 'पता, ईमेल या फोन नंबर डालना आवश्यक है|', // TODO: review this
            registeredEmployee: 'पता, ईमेल या फोन नंबर डालना आवश्यक है|',
          },
        },
        password: {
          placeholder: 'पासवर्ड',
          messages: {
            required: 'पासवर्ड डालना अनिवार्य है',
          },
        },
        actions: {
          logIn: 'लॉगिन',
        },
      },
    },
    SignUp: {
      select: {
        header: 'एक चयन करें {{fieldName}}',
        label: 'खोज...',
        cancel: 'रद्द करें',
        ok: 'ओके',
      },
      welcome: 'Coldtivate में आपका स्वागत है',
      schema: {
        passwordError:
          'आपका पासवर्ड कम से कम 8 अक्षर लंबा होना चाहिए, जिसमें एक अपरकेस और एक लोअरकेस अक्षर और एक संख्या होनी चाहिए।',
        confirmPasswordError: 'पासवर्ड की पुष्टि अनिवार्य है।',
        passwordsMismatchError: 'पासवर्ड मेल नहीं खाते।',
        countryError: 'देश का चयन अनिवार्य है।',
        firstNameError: 'पहला नाम अनिवार्य है।',
        lastNameError: 'अंतिम नाम अनिवार्य है।',
        phoneError: 'फ़ोन नंबर अनिवार्य है।',
        invalidPhoneError: 'फ़ोन नंबर अमान्य है।',
        languageError: 'भाषा अनिवार्य है।',
        genderError: 'लिंग चयन अनिवार्य है।',
        termsError: 'आपको उपयोग की शर्तों से सहमत होना आवश्यक है।',
        companyError: 'कंपनी का नाम अनिवार्य है।',
        currencyError: 'मुद्रा चयन अनिवार्य है।',
        emailError: 'ईमेल अनिवार्य है।',
        malformedEmailError: 'अमान्य ईमेल।',
      },
      commonForm: {
        firstNameLabel: 'पहला नाम',
        lastNameLabel: 'अंतिम नाम',
        phoneLabel: 'फोन नंबर (देश कोड के साथ)',
        passwordLabel: 'पासवर्ड',
        confirmPasswordLabel: 'पासवर्ड की पुष्टि करें',
        countryFieldName: 'देश',
        genderFieldName: 'लिंग',
        terms:
          'मैं Coldtivate उपयोगकर्ता लाइसेंस समझौते, गोपनीयता नीति और COMSOL उपयोग की शर्तों से सहमत हूँ',
      },
      SignUpCompany: {
        companyHeader: 'कंपनी का साइन अप करें',
        userHeader: 'रजिस्टर्ड कर्मचारी का साइन अप करें',
        companyNameLabel: 'कंपनी का नाम',
        emailLabel: 'ईमेल',
        currencyFieldName: 'मुद्रा',
        submit: 'साइन अप',
        modal: {
          warning:
            'अगर आप बिना फ़ोन नंबर के रजिस्टर करते हैं तो कुछ कार्यक्षमताएँ काम नहीं करेंगी:',
          reasons: {
            1: 'खाता रीसेट करना',
            2: 'एसएमएस रसीद प्राप्त करना',
          },
          buttons: {
            continue: 'फिर भी जारी रखें',
            addPhone: 'फोन जोड़ें',
          },
        },
      },
      SignUpCoolingUser: {},
    },
    ForgotPassword: {
      heading: 'पासवर्ड भूल गए',
    },
  },
} satisfies Translations;
