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
  navigation: {
    auth: {
      SignIn: 'लॉगिन',
      SignUp: 'साईन अप',
      ForgotPassword: 'पासवर्ड भूल गए',
      PasswordReset: 'रीसेट',
      AppInfo: 'App info',
    },
    management: {
      Root: 'प्रबंधन',
      CompanyDetails: 'कंपनी डिटेल्स',
      RevenueAnalysis: 'राजस्व विश्लेषण',
      UsageAnalysis: 'उपयोग विश्लेषण',
      Locations: 'स्थान',
      AddLocation: 'स्थान जोड़ें',
      EditLocation: 'स्थान बदले',
      CoolingUnits: 'शीतलन इकाइयाँ',
      CoolingUsers: 'किसान',
      AddCoolingUser: 'किसान जोड़ें',
      EditCoolingUser: 'किसानबदले',
      AddCoolingUnit: 'प्रशीतलन इकाई डालें',
      EditCoolingUnit: 'एडिट प्रशीतलन इकई',
      Operators: 'ऑपरेटर्स',
      AddOperator: 'ऑपरेटर जोड़ें',
      EditOperator: 'ऑपरेटर बदले',
      RegisteredEmployee: 'पंजीकृत कर्मचारी',
      AddRegisteredEmployee: 'कर्मचारी जोड़ें',
      RegisteredEmployeeDetails: 'पंजीकृत कर्मचारी विवरण',
    },
    bottomTabs: {
      RootMainTabStack: '{{firstName}} Coldtivate',
      ProduceDetails: '{{produceCode}}',
      PriceTrend: 'मूल्य प्रवृत्ति',
      PriceRanking: 'मूल्य रैंकिंग',
      Planner: 'प्लानर',
      RoomConditions: 'कमरे की स्थिति',
      CratesInfo: 'क्रेट जानकारी',
      Dashboard: 'डैशबोर्ड',
      History: 'से. मैनेजर',
      MarketPrice: 'बाजार कीमत',
      CoolingUnits: 'शीतलन इकाइयाँ',
      Analytics: 'वैश्लेषिकी',
      CheckIn: 'चेक इन',
      CheckOut: 'चेक आउट',
    },
    dashboard: {
      AccountDetails: 'अकाउंट डिटेल्स',
      KnowledgeHub: 'नॉलेज हब',
      QuitTutorial: 'ट्यूटोरियल छोड़ें',
      FAQ: 'अधिकतर पूछे जाने वाले सवाल',
      About: 'विषय',
      Management: 'प्रबंधन',
      Tutorial: 'ट्यूटोरियल',
    },
    checkIn: {
      SelectCropType: 'फसल प्रकार चुनें',
      CheckIn: 'चेक इन',
      CropList: '{{cropType}}',
      CrateSetup: 'चेक इन',
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
    add: 'ऐड',
    edit: 'एडिट',
    search: 'खोजा जा रहा है...',
    or: 'या',
    'not-available': 'अभी उपलब्ध नहीं है',
    'complete-later': 'बाद में पूरा करें',
    'update-success': 'सफलतापूर्वक उत्परिवर्तित',
    'save-changes': 'बदलाव सहेजें',
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
        submit: 'साइन अप',
      },
      SignUpCompany: {
        companyHeader: 'कंपनी का साइन अप करें',
        userHeader: 'रजिस्टर्ड कर्मचारी का साइन अप करें',
        companyNameLabel: 'कंपनी का नाम',
        emailLabel: 'ईमेल',
        currencyFieldName: 'मुद्रा',
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
      SignUpCoolingUser: {
        header: 'रजिस्टर्ड कर्मचारी का साइन अप करें',
        languageFieldName: 'भाषा',
      },
    },
    ForgotPassword: {
      heading: 'पासवर्ड भूल गए',
      messageSentNotification:
        'अगर फोन नंबर मौजूद है, तो आपके पासवर्ड रीसेट करने के लिए एक एसएमएस भेजा गया है।',
      instructions:
        'अपना पासवर्ड रीसेट करने के लिए, कृपया फोन नंबर दर्ज करें जिसके साथ देश कोड है, जिससे खाता जुड़ा हुआ है।',
      phoneInputLabel: 'फोन नंबर',
      resetButton: 'रीसेट',
      link: {
        partOne:
          'अपना पासवर्ड रीसेट करने के लिए इस लिंक पर क्लिक करें https://app.coldtivate.org/auth/reset/?resetcode=',
        partTwo: '&phoneNumber={{phone}}  यदि URL काम नहीं कर रहा है, तो https:// जोड़ें',
      },
    },
    ResetPassword: {
      schema: {
        passwordError:
          'आपका पासवर्ड कम से कम 8 अक्षर लंबा होना चाहिए, जिसमें एक अपरकेस और एक लोअरकेस अक्षर और एक संख्या होनी चाहिए।',
        confirmPasswordError: 'पासवर्ड की पुष्टि अनिवार्य है।',
        passwordsMismatchError: 'पासवर्ड मेल नहीं खा रहे हैं।',
      },
      passwordLabel: 'नया पासवर्ड',
      confirmPasswordLabel: 'पासवर्ड की पुष्टि करें',
      resetButton: 'रीसेट',
    },
  },
  Dashboard: {
    CrateManagement: {
      userModalTitle: 'कूलिंग उपयोगकर्ता चुनें',
      coolingUserLabel: 'कूलिंग उपयोगकर्ता',
      selectCoolingUnitLabel: 'कूलिंग यूनिट चुनें',
      coolingUnitLabel: 'कूलिंग यूनिट',
      noUnitWarning: 'कृपया एक कूलिंग यूनिट चुनें',
      noCratesWarning: 'चुने गए कूलिंग उपयोगकर्ता के पास इस कूलिंग यूनिट में कोई क्रेट्स नहीं हैं',
      operationError: 'कुछ गलत हो गया। कृपया बाद में पुनः प्रयास करें।',
      CheckOut: {
        selectCrateMessage: 'वे क्रेट्स चुनें जिन्हें आप हटाना चाहते हैं',
        selectAll: 'सभी चुनें',
        checkIn: 'चेक-इन',
        days: 'दिन',
        day: 'दिन',
        ttp: 'टीटीपी',
        numberOfCrates: 'क्रेट्स की संख्या',
        totalWeight: 'कुल वजन',
        priceType: 'मूल्य प्रकार',
        crate: 'क्रेट',
        pricePerProduct: 'प्रति उत्पाद मूल्य:',
        calculatedPrice: 'गणना किया गया मूल्य',
        discount: 'छूट',
        priceWithDiscount: 'कुल मूल्य',
        paymentType: {
          label: 'भुगतान प्रकार',
          cash: 'नकद',
          creditCard: 'क्रेडिट कार्ड',
        },
        paid: 'भुगतान किया गया',
      },

      CheckIn: {
        emptyState: 'अभी तक कोई बॉक्स नहीं जोड़ा गया',
        addCrates: 'क्रेट जोड़ें',
        checkInWithCode: 'कोड के साथ चेक इन करें',
        estimatedCost: 'अनुमानित लागत',
        day: 'दिन',
        successMessage: 'क्रेट सफलतापूर्वक चेक इन किए गए',
        SelectCropType: {
          fruits: 'फल',
          vegetables: 'सब्जियां',
          rootVegetables: 'मूल सब्जियां',
          other: 'अन्य वस्तुएं',
        },
        SelectCrop: {
          additionalInfo: 'अतिरिक्त जानकारी',
        },
        Setup: {
          selectedCrop: 'चयनित फसल',
          changeCropButton: 'यहाँ क्लिक करें फसल बदलने के लिए',
          individualCrateWeightButton: 'यहाँ क्लिक करें व्यक्तिगत क्रेट वजन संपादित करने के लिए',
          individualCrateIdButton: 'यहाँ क्लिक करें व्यक्तिगत क्रेट आईडी संपादित करने के लिए',
          numberOfCratesLabel: 'क्रेटों की संख्या',
          crateWeightLabel: 'क्रेट का सामान्य वजन',
          pricePerDayLabel: 'प्रति दिन / क्रेट की कीमत',
          totalPriceLabel: 'कुल मूल्य',
          plannedDaysLabel: 'भंडार में रखने की योजना की गई दिनों की संख्या',
          harvestDateLabel: 'फसल कब काटी गई थी?',
          harvestDateValues: {
            today: 'आज',
            yesterday: 'कल',
            dayBefore: 'दो दिन पहले',
            evenBefore: 'और पहले',
          },
          cratesError: 'कृपया एक सकारात्मक क्रेट संख्या डालें',
          crateWeightError: 'कृपया एक सकारात्मक क्रेट वजन डालें',
          harvestDateError: 'फसल की कटाई की तारीख आवश्यक है',
          modals: {
            weight: 'क्रेट्स का व्यक्तिगत वजन सेट करें',
            id: 'क्रेट्स का व्यक्तिगत आईडी सेट करें',
            crateLabel: 'क्रेट',
            selectInitialId: 'कृपया प्रारंभिक क्रेट आईडी सेट करें',
            serialize: 'सीरियलाइज करें',
          },
        },
      },
    },
    CoolingUnitsPlanner: {
      SelectCoolingUnit: {
        label: 'शीत कक्ष: {{name}}',
        header: 'एक शीतलन इकाई का चयन करें',
      },
      occupancy: 'शीतलन इकाई का वर्तमान अधिभोग',
      week: 'इस सप्ताह',
    },
    CoolingUnitsRoomConditions: {
      heading: 'पिछले तापमान को ट्रैक करें',
      temperature: 'तापमान',
      lastUpdated: 'पिछली बार {{date}} पर अपडेट किया गया',
      enterTemperature: 'तापमान दर्ज करें',
    },
    CoolingUnitsCratesInfo: {
      commodity: 'सामग्री',
      percentage: 'प्रतिशत',
      weight: 'वज़न',
      crates: 'टोकरी',
      optimalTemp: 'इष्टतम तापमान ° C',
    },
    Company: {
      SelectCompany: {
        label: 'कंपनी: {{name}}',
        header: 'कंपनी का चयन करें',
      },
    },
    ProduceDetails: {
      kilogram: 'किग्रा',
      coolingUser: 'ठंडाई उपयोगकर्ता',
      contact: 'संपर्क',
      contactCopied: 'कॉपी किया गया!',
      crates: 'बक्से',
      crate: 'बक्सा',
      cropType: 'फसल प्रकार',
      numberOfCrates: 'बक्सों की संख्या',
      crateIds: 'बक्से की पहचान',
      combinedWeight: 'सम्मिलित वजन',
      remainingTime: 'बची हुई समय पिकअप के लिए',
      currentStorageDays: 'वर्तमान भंडारण दिन',
      plannedDays: 'नियोजित दिन',
      pricePerDay: 'दिनांक प्रति मूल्य',
      plannedStorageCost: 'नियोजित भंडारण लागत',
      pickUp: 'पिक अप में',
      days: 'दिन',
      noDTMessage: 'इस विशेष वस्त्र के लिए एक शेल्फ-लाइफ मॉडल उपलब्ध नहीं है।',
    },
    SearchFilter: {
      detailsMessage:
        'फसल प्रकार, किसान का नाम, भंडारण में दिन, भंडारण में बचे दिन, या चेक-इन कोड का उपयोग करके चेक-इन खोजें',
      idMessage:
        'किसी विशिष्ट क्रेट की पहचान के लिए उपयोग किए गए क्रेट आईडी नंबर का उपयोग करके क्रेट खोजें',
      crateDetailsButton: 'क्रेट विवरण खोजें',
      crateIdButton: 'क्रेट आईडी खोजें',
      searchLabel: 'खोजें',
    },
    SortMenu: {
      title: 'सॉर्ट करें',
      options: {
        cropType: 'फसल का प्रकार',
        timeToPick: 'उठाने का समय',
        checkInDate: 'चेक-इन तिथि (पहले से नवीनतम)',
        checkInDateReverse: 'चेक-इन तिथि (नवीनतम से पहले)',
      },
    },
    Management: {
      Location: {
        text: {
          invited: 'आमंत्रित ({{amount}})',
          registered: 'पंजीकृत ({{amount}})',
        },
        chips: {
          address: 'पता',
          coordinates: 'निर्देशांक',
          geolocation: 'फोन जियोलोकेशन',
        },
        fields: {
          name: 'नाम',
          latitude: 'अक्षांश',
          longitude: 'देशान्तर',
          country: 'देश',
          state: 'राज्य',
          city: 'शहर',
          zipCode: 'डाक कोड',
          street: 'गली',
          streetNumber: 'गली नंबर',
        },
        modal: {
          message:
            'यह कार्रवाई इस स्थान से संबद्ध सभी शीतलन इकाइयों को हटा देगी। क्या आप जारी रखना चाहते हैं?',
        },
        actions: {
          currentLocation: 'वर्त्तमान स्थान चुनिए',
        },
      },
      Operators: {
        banner:
          'आपको एक परिचालक के रूप में Coldtivate ऐप में शामिल होने के लिए आमंत्रित किया गया था। पंजीकरण पूरा करने के लिए, यहां जाएं:',
        text: {
          gender: 'लिंग',
          ma: 'पुरुष',
          fe: 'महिला',
          ot: 'अन्य',
        },
        fields: {
          selectCoolingUnit: 'एक शीतलन इकाई का चयन करें',
          coolingUnits: 'शीतलन इकाई (ओं)',
        },
        actions: {
          invite: 'आमंत्रित करना',
          save: 'सेव चंगेस',
        },
      },
    },
  },
} satisfies Translations;
