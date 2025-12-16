import type { Translations } from './en';

export default {
  appVersion: {
    newVersion: 'कोल्ड्टिवेट का एक नया संस्करण उपलब्ध है!',
    pleaseUpdate: 'कृपया जारी रखने से पहले ऐप को अपडेट करें।',
  },
  languages: {
    current: 'हिन्दी',
    label: 'भाषा',
    options: {
      en: 'अंग्रेज़ी',
      hi: 'हिन्दी',
      or: 'ओड़िया',
      gu: 'गुजराती',
      fr: 'फ्रेंच',
      pt: 'पुर्तगाली',
      ig: 'इग्बो',
      yo: 'योरूबा',
      ha: 'हौसा',
      ar: 'अरबी',
    },
  },
  gender: {
    female: 'महिला',
    male: 'पुरुष',
    other: 'अन्य',
  },
  navigation: {
    error: {
      errorMessage: 'अरे... लगता है कुछ गलत हो गया है।',
      tryAgainMessage: 'कृपया बाद में फिर से प्रयास करें।',
      serverErrorMessage:
        'उफ़! लगता है हमारी तरफ़ से कुछ गड़बड़ हो गई है। कृपया बाद में पुनः प्रयास करें या सहायता से संपर्क करें।',
    },
    auth: {
      SignIn: 'लॉगिन',
      SignUp: 'साईन अप',
      ForgotPassword: 'पासवर्ड भूल गए',
      PasswordReset: 'रीसेट',
      AppInfo: 'सामान्यतःपूछे जाने वाले प्रश्न',
      Logout: 'लॉग आउट',
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
      DisabledCoolingUnitsDescription: 'कम से कम एक स्थान जोड़ें',
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
      DeliveryContacts: 'डिलीवरी संपर्क',
      AddUserBankAccount: '{{user}} का बैंक खाता',
      LegacyContacts: 'पुराने संपर्क',
    },
    bottomTabs: {
      RootMainTabStack: '{{firstName}} का Coldtivate',
      ProduceDetails: '{{produceCode}}',
      MarketplaceSettings: 'मार्केटप्लेस सेटिंग्स',
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
      Maps: 'नक्शा',
      More: 'अधिक',
    },
    dashboard: {
      AccountDetails: 'अकाउंट डिटेल्स',
      PersonalDetails: 'व्यक्तिगत विवरण',
      LocalizationPreferences: 'स्थानीयकरण प्राथमिकताएँ',
      ContactsSharing: 'संपर्क साझा करना',
      Coupons: 'कूपन',
      CouponsActiveTab: 'सक्रिय',
      CouponsRevokedTab: 'रद्द किए गए',
      Marketplace: 'बाज़ार',
      MarketplaceFilters: 'फिल्टर',
      MarketplaceAllTab: 'सभी',
      MarketplaceFavoritesTab: 'पसंदीदा',
      Orders: 'ऑर्डर',
      MyOrders: 'मेरे ऑर्डर',
      MySales: 'मेरी बिक्री',
      OrderDetails: '{{orderCode}}',
      KnowledgeHub: 'नॉलेज हब',
      QuitTutorial: 'ट्यूटोरियल छोड़ें',
      FAQ: 'अधिकतर पूछे जाने वाले सवाल',
      About: 'विषय',
      Management: 'प्रबंधन',
      Tutorial: 'ट्यूटोरियल',
      PayoutOptions: 'भुगतान विकल्प',
      PaymentMethods: 'भुगतान विधियाँ',
      Wallet: 'वॉलेट',
      Transactions: 'लेनदेन',
      Transaction: '{{id}}',
      ShoppingCart: 'शॉपिंग कार्ट',
    },
    checkIn: {
      SelectCropType: 'फसल प्रकार चुनें',
      CheckIn: 'चेक इन',
      CropList: '{{cropType}}',
      CrateSetup: 'चेक इन',
      CrateWeightAndPricing: 'क्रेट का वजन और मूल्य निर्धारण',
    },
    about: {
      comsolAgreement: 'COMSOL रनटाइम लाइसेंस समझौता 6.0',
      userLicense: 'अंतिम उपयोगकर्ता लाइसेंस समझौता',
      aboutComsol: 'COMSOL के बारे में',
      privacyPolicy: 'गोपनीयता नीति',
    },
    history: {
      EditCheckIn: '{{code}}',
      MarketSurvey: '{{farmer}} के भंडारण-के-बाद सर्वेक्षण',
      BaseSurvey: 'कूलिंग उपयोगकर्ता सर्वेक्षण',
    },
    analytics: {
      methodology: 'कार्यप्रणाली',
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
    add: 'ऐड',
    edit: 'एडिट',
    go: 'चलो!',
    done: 'पूर्ण',
    'not-available': 'अभी उपलब्ध नहीं है',
    'complete-later': 'बाद में पूरा करें',
    'update-success': 'सफलतापूर्वक उत्परिवर्तित',
    'save-changes': 'बदलाव सहेजें',
    save: 'सहेजें',
    continue: 'जारी रखना',
    update: 'अपडेट करें',
    clearAll: 'सभी हटाएँ',
    apply: 'लागू करें',
    assign: 'असाइन करें',
  },
  components: {
    datePicker: {
      heading: 'एक तारीख़ चुनें',
      clearButtonLabel: 'साफ़ करें',
      confirmButtonLabel: 'पुष्टि करें',
      placeholder: 'dd/mm/yyyy',
      startDateSelection: 'प्रारंभ तिथि चुनें:',
      endDateSelection: 'समाप्ति तिथि चुनें:',
      startDateError: 'प्रारंभ तिथि अंतिम तिथि से बाद की नहीं हो सकती।',
      endDateError: 'अंतिम तिथि प्रारंभ तिथि से पहले की नहीं हो सकती।',
    },
  },
  Auth: {
    welcomePopup:
      "Coldtivate में आपका स्वागत है! यदि आप किसान, व्यापारी हैं, या कोल्ड रूम में संग्रहीत उत्पाद खरीदने में रुचि रखते हैं, तो कृपया 'शीतलन उपयोगकर्ता या उपभोक्ता के रूप में साइन अप करें' पर क्लिक करके साइन अप करें। यदि आप किसी शीतलन कंपनी में काम करते हैं, तो कृपया अपने उत्तरदायी व्यक्ति से संपर्क करें और जांचें कि आपकी कंपनी पंजीकृत है या नहीं। यदि हां, तो आपका उत्तरदायी व्यक्ति आपको एक एसएमएस आमंत्रण भेजेगा ताकि आप पंजीकृत कर्मचारी या ऑपरेटर के रूप में साइन अप कर सकें। यदि नहीं, तो आप कंपनी को पंजीकृत कर सकते हैं और पंजीकृत कर्मचारी के रूप में साइन अप कर सकते हैं। कृपया 'ऐप जानकारी' अनुभाग में अक्सर पूछे जाने वाले प्रश्नों की जाँच करें।",
    Root: {
      welcome: 'स्वागतम',
      signIn: 'साइन इन करें',
      signUpCompany: 'अस कंपनी साइन अप करें',
      signUpCoolingUser: 'शीतलन उपयोगकर्ता या उपभोक्ता के रूप में साइन अप करें',
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
            'कोल्ड रूम उपयोगकर्ता और उपभोक्ता। किसान, व्यापारी, और खुदरा विक्रेता, जिनके पास स्मार्टफोन है, वे यहां लॉग इन कर सकते हैं। जिनके पास स्मार्टफोन नहीं है, वे कोल्ड रूम जाकर और ऑपरेटर से संपर्क करके ऐप की जानकारी प्राप्त कर सकते हैं। उपभोक्ता यहां लॉग इन करके खरीदारी पूरी कर सकते हैं।',
        },
        toasts: {
          login: 'उपयोगकर्ता नाम या पासवर्ड सही नहीं हैं',
          success: 'सफलतापूर्वक लॉग इन',
        },
      },
      form: {
        user: {
          placeholder: 'ईमेल/ फ़ोन नंबर',
          description: {
            default: 'कृपया वैध ईमेल या फोन नंबर प्रदान करें',
            registeredEmployee: 'कृपया वैध ईमेल या फोन नंबर प्रदान करें',
          },
          messages: {
            default: 'पता, ईमेल या फोन नंबर डालना आवश्यक है|',
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
        invalidPhoneError:
          'फ़ोन नंबर अमान्य है। सुनिश्चित करें कि एरिया कोड शामिल है (उदाहरण: +910000000000)।',
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
        submit: 'साइन अप',
        terms: {
          agree: 'मैं कोल्ड्टीवेट से सहमत हूं',
          license: 'अंत उपयोगकर्ता लाइसेंस समझौता',
          privacy: 'गोपनीयता नीति',
          and: 'तथा',
          comsol: 'COMSOL उपयोग की शर्तें',
        },
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
        header: 'शीतलन उपयोगकर्ता या उपभोक्ता के रूप में साइन अप करें',
        languageFieldName: 'भाषा',
      },
      toasts: {
        error:
          'कृपया सुनिश्चित करें कि आपकी जानकारी सही है और पुनः प्रयास करें। ध्यान दें कि एक फ़ोन नंबर और ईमेल केवल एक ही खाते के लिए उपयोग किए जा सकते हैं।',
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
      requestLimitMessage: 'अनुरोध सीमा पूरी हो गई है। कृपया 2 घंटे बाद पुनः प्रयास करें।',
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
    Invite: {
      heading: 'Coldtivate में आपका स्वागत है',
      employee:
        'आपको कर्मचारी के रूप में आमंत्रित किया गया है। कृपया अपना पंजीकरण पूरा करने के लिए फ़ॉर्म भरें।',
      operator:
        'आपको ऑपरेटर के रूप में आमंत्रित किया गया है। कृपया अपना पंजीकरण पूरा करने के लिए फ़ॉर्म भरें।',
      fields: {
        password:
          'कम से कम आठ अक्षर, कम से कम एक बड़ा अक्षर, एक छोटा अक्षर, एक संख्या और एक विशेष वर्ण',
      },
    },
  },
  Dashboard: {
    TemperatureAlert: {
      title: 'तापमान की चेतावज',
      subtitle: 'हमने देखा कि एक बदलाव आया था। वर्तमान ये वस्तुएं भंडारण में हैं',
      edit: 'क्या आपको तापमान बदलना है?',
      temperature: 'तापमान',
      newTemperature: 'नया तापमान',
      confirm: 'नए तापमान की पुष्टि करें',
      continueWithoutUpdate: 'अपडेट के बिना जारी रखें',
      sensorHint: 'तापमान नहीं जोड़ा जा सकता क्योंकि एक सेंसर शीतलन इकाई से जुड़ा है।',
      latestTemperature: '{{date}} को नवीनतम तापमान दर्ज किया गया था.',
    },
    emptyGeneral: 'इस समय, कोई उपलब्ध डेटा नहीं है।',
    emptyCoolingUser:
      'किसी भी कमरे में कम से कम एक चेक-इन करने पर भंडारण में रखे आइटम डैशबोर्ड में दिखाई देंगे।',
    noCompanyAvailable: 'कोई कंपनी उपलब्ध नहीं है',
    noCoolingUnitAvailable: 'कोई कूलिंग यूनिट उपलब्ध नहीं है',
    noLocationsAvailable:
      'Coldtivate में आपका स्वागत है। प्रबंधन पैनल में अपने ऐप में स्थान जोड़कर शुरुआत करें।',
    coolingUserNavigateToMarketplace:
      'कोल्ड रूम में रखी उपज खरीदने में रुचि है? नीचे दाईं ओर स्थित मार्केटप्लेस टैब पर जाएं!',
    MarketPrice: {
      emptyState: 'आपके देश में बाजार मूल्य उपलब्ध नहीं हैं',
      'no-data-found': 'इस बाज़ार और कमोडिटी संयोजन के लिए कोई डेटा नहीं मिला',
      commodityLabel: 'वस्तु',
      commodityModalTitle: 'एक वस्तु का चयन करें',
      Trend: {
        title: 'मूल्य पूर्वानुमान प्राप्त करने के लिए एक वस्तु और एक राज्य का चयन करें',
        emptyState: 'इस बाजार और वस्तु संयोजन के लिए कोई डेटा नहीं मिला',
        pastLabel: 'पिछला',
        stateLabel: 'राज्य',
        stateModalTitle: 'एक राज्य का चयन करें',
        forecastLabel: 'पूर्वानुमान',
        chartLabel: 'कीमत {{currency}}/किग्रा में',
      },
      Ranking: {
        filter: 'स्थान द्वारा फ़िल्टर करें',
        monthLabel: 'महीने',
        monthModalTitle: 'महीनों का चयन करें',
        stateModalTitle: 'राज्यों का चयन करें',
        stateLabel: 'राज्य',
        table: {
          column1: 'राज्य',
          column2: 'तारीख',
          column3: 'कीमत {{currency}}/किलोग्राम में',
          emptyState: 'कोई मूल्य उपलब्ध नहीं है',
        },
        'location-placeholder': 'राज / जिला / बाजार',
        'market-district-state': 'बाजार / जिला / राज्य',
        'district-label': 'एक जिले का चयन करें',
        'district-placeholder': 'ज़िला',
        'market-label': 'एक बाजार का चयन करें',
        'market-placeholder':
          'मूल्य पूर्वानुमान प्राप्त करने के लिए एक वस्तु और एक राज्य का चयन करें',
        'select-warning': 'कृपया प्रत्येक क्षेत्र के लिए चयन करें',
      },
    },
    CrateManagement: {
      userModalTitle: 'कूलिंग उपयोगकर्ता चुनें',
      addUserLink:
        'सूची में उपयोगकर्ता नहीं है? उपयोगकर्ता को जोड़ने के लिए प्रबंधन ➜ कूलिंग उपयोगकर्ता ➜ + पर जाएं।',
      coolingUserLabel: 'कूलिंग उपयोगकर्ता',
      selectCoolingUnitLabel: 'कूलिंग यूनिट चुनें',
      coolingUnitLabel: 'कूलिंग यूनिट',
      noUnitWarning: 'कृपया एक कूलिंग यूनिट चुनें',
      noCratesWarning: 'चुने गए कूलिंग उपयोगकर्ता के पास इस कूलिंग यूनिट में कोई क्रेट्स नहीं हैं',
      operationError: 'कुछ गलत हो गया। कृपया बाद में पुनः प्रयास करें।',
      FarmerSurvey: {
        warningMessage: 'कृपया {{crop}} के लिए प्रारंभिक सर्वेक्षण भरें!',
        modal: {
          weeklyQuantityQuestion: 'आप एक सप्ताह में कितनी अमरूद का उत्पादन या व्यापार करते हैं?',
          cropSpoilageQuestion: 'फसल खराब होने का मुख्य कारण क्या है?',
          marketPriceQuestion: 'सप्ताह में {{crop}} बेचने पर औसत बाजार मूल्य क्या है?',
          quantityDistributionQuestion: 'उसमें से कितना:',
          selfConsumed: 'स्वयं उपभोगित ({{unit}})',
          sold: 'बिक गया ({{unit}})',
          lost: 'बाजार मूल्य से कम पर बिक गया या खो गया ({{unit}})',
          totalQuantity: 'एक सप्ताह में कुल उत्पादन मात्रा',
          unitWeight: 'प्रत्येक {{crate}} का वजन है',
          selectSpoilageReasonsPlaceholder: 'सभी लागू कारणों का चयन करें',
          priceLabel: 'मूल्य',
          priceUnit: '{{unit}} के लिए',
          commodityShortlist: 'वस्तुओं की सूची',
          unit: {
            kg: 'किलो',
            crates: 'टोकरियां',
            boxes: 'बक्से',
            sacks: 'बोरियां',
            baskets: 'टोकरी',
            singular: {
              kg: 'किलो',
              crates: 'टोकरा',
              boxes: 'डिब्बा',
              sacks: 'बोरा',
              baskets: 'टोकरी',
            },
          },
          reasonsForLoss: {
            improperHarvest: 'गलत कटाई या संभाल',
            inappropriateStorage: 'अनुचित भंडारण / ठंडे भंडारण की कमी',
            overproduction: 'अधिक उत्पादन',
            transportationDamage: 'परिवहन क्षति',
            pest: 'कीट',
            diseases: 'बीमारियाँ',
            weather: 'अत्यधिक मौसम की स्थिति',
            price: 'बाजार की कीमतें बहुत कम',
            other: 'अन्य',
          },
          errorMessages: {
            number: 'एक गैर-शून्य, सकारात्मक संख्या होनी चाहिए',
            reasonsForSpoilage: 'कृपया कम से कम एक कारण दर्ज करें।',
            totalMismatch:
              'स्व-उपभोग, बेचा और खोया या बाजार मूल्य से नीचे बेचा का योग कुल उत्पादित मात्रा के बराबर होना चाहिए।',
            cropError: 'कृपया एक माल का चयन करें',
          },
        },
      },
      CheckOut: {
        selectCrateMessage: 'वे क्रेट्स चुनें जिन्हें आप हटाना चाहते हैं',
        selectAll: 'सभी चुनें',
        checkIn: 'चेक-इन',
        days: 'दिन',
        day: 'दिन',
        daysLeft: '{{amount}} दिन बचे',
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
          bankTransfer: 'बैंक ट्रांसफर',
        },
        bankTransfer: {
          title: 'प्राप्तकर्ता का विवरण',
          accountName: 'खाते का नाम',
          accountNumber: 'खाता संख्या',
          bankName: 'बैंक का नाम',
        },
        paid: 'भुगतान किया गया',
        lockedWithinPendingOrders:
          'लंबित ऑर्डरों में लॉक की गई क्रेट्स को चेक आउट नहीं किया जा सकता।',
        transactionFeeDetails: 'लेनदेन शुल्क विवरण',
        coolingFeesAlreadyPaid: 'कूलिंग शुल्क पहले ही भुगतान किए गए',
        coolingFeesAlreadyPaidTooltip:
          'इस ऑपरेशन में शामिल एक या अधिक क्रेट्स मार्केटप्लेस पर बेचे गए थे। उनके संबंधित कूलिंग शुल्क पहले ही आपके भुगतान से काटे जा चुके हैं।',
      },
      CheckIn: {
        emptyState: 'अभी तक कोई बॉक्स नहीं जोड़ा गया',
        addCrates: 'क्रेट जोड़ें',
        cratesAddedLabel: 'टोकरियाँ जोड़ी गईं',
        checkInWithCode: 'कोड के साथ चेक इन करें',
        estimatedCost: 'अनुमानित लागत',
        pricing: 'मूल्य निर्धारण',
        day: 'दिन',
        successMessage: 'क्रेट्स सफलतापूर्वक चेक इन किए गए',
        emptyMessage: 'कृपया अपने चेक इन में कम से कम एक क्रेट जोड़ें',
        noPlannedDaysMessage:
          'कुछ वस्तुओं पर नियोजित दिनों की कमी है। अनुमानित लागत की गणना नहीं कर सकते।',
        seeMore: 'और देखें',
        seeLess: 'कम देखें',
        listed: 'सूचीबद्ध',
        WithCode: {
          modalTitle: 'मौजूदा चेक आउट से नया चेक इन बनाएं',
          modalDescription:
            'इस तरह से नया चेक इन शुरू करने के लिए आपको चेक आउट कोड की आवश्यकता होगी। यदि आपके पास नहीं है, तो नया चेक इन शुरू करने पर विचार करें। यदि आप जानते हैं कि आप कितने दिनों तक भंडारण करने की योजना बना रहे हैं, तो यहां दिनों की संख्या जोड़ने पर विचार करें।',
          codeLabel: 'कोड जोड़ें',
          codeErrorMessage: 'कोड आवश्यक है',
          failedMessage:
            'चेक-इन विफल रहा। कृपया सुनिश्चित करें कि आपका कोड पहले से इस्तेमाल नहीं हुआ है या सहायता के लिए सपोर्ट से संपर्क करें।',
        },
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
          crateWeightLabel: 'टोकरे का वजन और बाज़ार सूची',
          pricePerDayAndCrateLabel: 'प्रति दिन / क्रेट की कीमत',
          pricePerDayAndKilogramLabel: 'प्रति दिन / किलोग्राम की कीमत',
          fixedPriceLabel: 'नियत मूल्य',
          totalPriceLabel: 'कुल मूल्य',
          plannedDaysLabel: 'भंडार में रखने की योजना की गई दिनों की संख्या',
          harvestDateLabel: 'फसल कब काटी गई थी?',
          harvestDateValues: {
            today: 'आज',
            yesterday: 'कल',
            dayBefore: 'दो दिन पहले',
            evenBefore: 'और पहले',
          },
          crateWeightAndPricing: {
            applyAll: 'सभी पर लागू करें',
            list: 'विक्रय के लिए सूचीबद्ध करें',
            addMore: 'और जोड़ें',
            sellingPrice: 'विक्रय मूल्य सूचीबद्ध करें',
            potentialSellingPrice: 'संभावित विक्रय मूल्य',
            info: 'मूल्य कॉन्फ़िगरेशन उत्पाद की बिक्री को संदर्भित करता है, ठंडे भंडारण शुल्क को नहीं।',
            unavailableId: 'ID सेट नहीं है',
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
      today: 'आज',
    },
    CoolingUnitsRoomConditions: {
      heading: 'पिछले तापमान को ट्रैक करें',
      temperature: 'तापमान',
      lastUpdated: 'पिछली बार {{date}} पर अपडेट किया गया',
      enterTemperature: 'तापमान दर्ज करें',
      toasts: {
        confirmation: 'तापमान और आर्द्रता सही ढंग से संशोधित हो गए है',
      },
    },
    CoolingUnitsCratesInfo: {
      commodity: 'सामग्री',
      percentage: 'प्रतिशत',
      weight: 'वज़न',
      crates: 'टोकरी',
      optimalTemp: 'इष्टतम तापमान ° C',
      messages: {
        empty:
          'जब आप किसी भी कक्ष में कम से कम एक बार चेक-इन करेंगे तो शीतल भंडार का अधिभोग और तापमान यहां दिखाई देगा।',
      },
    },
    CoolingUnitsMaps: {
      singleCommodity: 'सिंगल कमोडिटी रूम:  {{crop}}',
      multiCommodity: 'मल्टी कमोडिटी रूम',
      publicMaker: 'सार्वजनिक शीतलन इकाई',
      usedMarker: 'आपके द्वारा पहले से उपयोग की जा रही कूलिंग यूनिट',
    },
    Company: {
      SelectCompany: {
        label: 'कंपनी: {{name}}',
        header: 'कंपनी का चयन करें',
      },
    },
    ProduceDetails: {
      seeDetails: 'विवरण देखें',
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
      checkOutButton: 'चेक आउट',
      cratesListedForSale: '{{amount}} क्रेट बिक्री के लिए सूचीबद्ध की गई हैं',
      preSaleError:
        'कृपया ध्यान दें: लंबित ऑर्डर वाली क्रेट्स की सूची स्थिति नहीं बदली जा सकती। यदि यह स्थिति आप पर लागू नहीं होती है, तो सहायता के लिए सपोर्ट से संपर्क करें।',
      operatorNoBankAccountWarning:
        '{{name}} के पास बिक्री से भुगतान प्राप्त करने के लिए बैंक खाता विवरण उपलब्ध नहीं हैं। यदि उन्होंने आपके साथ ये विवरण साझा किए हैं तो कृपया जोड़ें।',
      farmerNoBankAccountWarning:
        'बिक्री की राशि प्राप्त करने के लिए आपका बैंक खाता परिभाषित नहीं है। कृपया अपने बैंक खाते की जानकारी जोड़ें।',
      operatorNoCompanyBankAccount:
        'यह कूलिंग यूनिट मार्केटप्लेस लिस्टिंग का समर्थन नहीं करता है। कृपया इस मामले में कंपनी के मैनेजर से संपर्क करें।',
      employeeNoBankAccount:
        'इस कंपनी के पास मार्केटप्लेस में बेचे गए उत्पादों और कूलिंग शुल्क दोनों के लिए भुगतान प्राप्त करने हेतु कोई बैंक खाता सेट नहीं है। इसे सेट करें ताकि आपके कूलिंग यूनिट की क्रेट्स मार्केटप्लेस में सूचीबद्ध हो सकें।',
      addBankAccountButton: 'बैंक खाता विवरण जोड़ें',
      addBankAccountHeader:
        'आप {{name}} की ओर से बैंक खाता विवरण सेट कर रहे हैं। कृपया यह जानकारी सावधानी से दर्ज करें क्योंकि बाद में इसे संशोधित नहीं किया जा सकेगा।',
      userWithoutPhone:
        'इस खाते की क्रेट्स बिक्री के लिए सूचीबद्ध नहीं की जा सकती क्योंकि फ़ोन नंबर के बिना उपयोगकर्ता से कोई बैंक खाता लिंक नहीं किया जा सकता।',
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
        coolingUser: 'कूलिंग उपयोगकर्ता का नाम',
      },
    },
    Management: {
      Delivery: {
        companyName: 'कंपनी का नाम',
        companyNamePlaceholder: 'कंपनी का नाम डालें',
        companyNameError: 'कृपया कंपनी का नाम डालें',
        contactName: 'संपर्क नाम',
        contactNamePlaceholder: 'संपर्क नाम डालें',
        contactNameError: 'कृपया संपर्क नाम डालें',
        phoneNumber: 'फोन नंबर',
        phoneNumberPlaceholder: 'फोन नंबर डालें',
        emptyMessage: 'अभी तक कोई संपर्क नहीं जोड़ा गया है',
        deleteContactMessage: 'क्या आप सुनिश्चित हैं कि आप इस संपर्क को हटाना चाहते हैं?',
        noAvailableContacts: 'इस विशेष कूलिंग यूनिट के लिए कोई उपलब्ध संपर्क नहीं है।',
        contactedAddedSuccessfully: 'संपर्क सफलतापूर्वक जोड़ा गया।',
        contactStatusChangedSuccessfully: 'संपर्क स्थिति सफलतापूर्वक बदल गई',
        contactUpdatedSuccessfully: 'संपर्क सफलतापूर्वक अपडेट हुआ',
        show: 'दिखाएँ',
        hide: 'छुपाएँ',
        unassigned: 'असाइन नहीं',
        roomContacts: 'रूम संपर्क',
        rooms: 'रूम',
        addContact: 'संपर्क जोड़ें',
        editContact: 'संपर्क संपादित करें',
        selectRoom: 'रूम चुनें',
        legacyContactsModal: {
          title: 'रूम-विशिष्ट संपर्क अपडेट करें',
          description:
            'हमने डिलीवरी संपर्कों को रूम-विशिष्ट बना दिया है। आपके पास {{count}} पुराने संपर्क हैं जिन्हें किसी रूम में असाइन करना है।',
          descriptionPrefix: 'हमने डिलीवरी संपर्कों को रूम-विशिष्ट बना दिया है। ',
          descriptionBold: 'आपके पास {{count}} पुराने संपर्क हैं',
          descriptionSuffix: ' जिन्हें किसी रूम में असाइन करना है।',
          important: 'महत्वपूर्ण',
          importantMessage:
            'यह आपकी कंपनी के प्रत्येक रूम के लिए सही डिलीवरी जानकारी सुनिश्चित करता है।',
          remindMeLater: 'मुझे बाद में याद दिलाएँ',
          assignNow: 'अभी असाइन करें',
        },
        legacyContactsBanner: {
          title: '{{count}} बिना असाइन किए पुराने संपर्क',
          title_one: '{{count}} बिना असाइन किया पुराना संपर्क',
          title_other: '{{count}} बिना असाइन किए पुराने संपर्क',
          description: 'इन संपर्कों को विशिष्ट रूम में असाइन करना है।',
          link: 'रूम में संपर्क असाइन करें →',
        },
        legacyContactsScreen: {
          warningTitle: '{{count}} संपर्क रूम में असाइन करें',
          warningTitle_one: '{{count}} संपर्क रूम में असाइन करें',
          warningTitle_other: '{{count}} संपर्क रूम में असाइन करें',
          warningMessage:
            'प्रत्येक संपर्क के लिए रूम चुनें, फिर "Assign Selected" क्लिक करें या एक-एक करके असाइन करें।',
          assignToRoom: 'रूम में असाइन करें',
          allRooms: 'सभी रूम',
          contactAssignedSuccessfully: 'संपर्क सफलतापूर्वक असाइन हुआ',
          contactDeletedSuccessfully: 'संपर्क सफलतापूर्वक हटाया गया',
          allAssignedMessage: 'सभी पुराने संपर्क असाइन हो चुके हैं!',
          roomLocation: 'रूम लोकेशन',
          assignSelected: 'चयनित असाइन करें',
        },
      },
      Location: {
        emptyState: 'अभी तक कोई स्थान नहीं जोड़ा गया है। एक जोड़ने के लिए + चिह्न पर क्लिक करें।',
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
        fieldErrorMessages: {
          latitude: 'कृपया -90 से 90 के बीच की संख्या दर्ज करें (उदा. 34.0522)',
          longitude: 'कृपया -180 से 180 के बीच की संख्या दर्ज करें (उदा. -118.2437)',
        },
        modal: {
          message:
            'यह कार्रवाई इस स्थान से संबद्ध सभी शीतलन इकाइयों को हटा देगी। क्या आप जारी रखना चाहते हैं?',
        },
        actions: {
          currentLocation: 'वर्त्तमान स्थान चुनिए',
        },
        toasts: {
          addLocationSuccess: 'स्थान सफलतापूर्वक जोड़ा गया',
          editLocationSuccess: 'स्थान सफलतापूर्वक संपादित किया गया',
          removeLocationSuccess: 'स्थान {{name}} सफलतापूर्वक हटा दिया गया था।',
          failedToFetchLocation:
            'स्थान प्राप्त करने में असमर्थ। कृपया पता जाँचें और पुनः प्रयास करें।',
          positionCancelled: 'स्थान अनुरोध रद्द किया गया।',
          positionUnauthorized:
            'स्थान की अनुमति अस्वीकृत। कृपया जारी रखने के लिए अनुमति प्रदान करें।',
          locationUnavailable: 'स्थान अक्षम है। कृपया जारी रखने के लिए सक्षम करें।',
          locationSubmissionError:
            'कुछ त्रुटि हुई। कृपया अपना स्थान पुनः जाँचकर दोबारा प्रयास करें।',
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
      AddOperator: {
        messages: {
          operator: 'एक ऑपरेटर के रूप में Coldtivate ऐप में शामिल होने के लिए, यहां जाएं: {{link}}',
        },
        toasts: {
          success: 'ऑपरेटर को सफलतापूर्वक आमंत्रित किया गया',
        },
        phoneFormat: 'फोन नंबर में कंट्री कोड ज़रूर होना चाहिए।',
      },
      EditOperator: {
        toasts: {
          success: 'परिचालक को सफलतापूर्वक संपादित किया गया',
        },
      },
      AddCoolingUser: { toasts: { add: 'किसान जोड़ें' } },
      CompanyDetails: {
        labels: {
          name: 'नाम',
          uploadLogo: 'लोगो अपलोड करें',
          logo: 'लोगो',
          country: 'देश',
          commodity: 'सामग्री',
          currency: 'मुद्रा',
        },
        headings: {
          country: 'देश चुनें',
          commodity: 'उपज को चयन करें',
          currency: 'एक मुद्रा चुनें',
        },
        actions: { save: 'सेव चंगेस' },
        toasts: {
          success: 'सफलतापूर्वक संपादित किया गया',
          photoLibrary: 'अनुमति अस्वीकृत: कृपया अपनी फ़ोटो लाइब्रेरी तक पहुँच सक्षम करें।',
        },
      },
      RegisteredEmployee: {
        invited: 'आमंत्रित ({{amount}})',
        registered: 'पंजीकृत ({{amount}})',
      },
      RegisteredEmployeeDetails: {
        deletePersonal: 'अपना अकाउंट डिलीट करने के लिए अकाउंट डिटेल्स में जाएं',
        deleteOther:
          'अगर आप इस खाते को हटाना चाहते हैं, तो कृपया app@yourvcca.org पर संपर्क करें। {{contact}}',
      },
      AddRegisteredEmployee: {
        message:
          'एक पंजीकृत कर्मचारी के रूप में कोल्डटिवेट ऐप में शामिल होने के लिए, यहां जाएं: {{link}}',
        toasts: {
          success: 'पंजीकृत कर्मचारी को सफलतापूर्वक आमंत्रित किया गया',
        },
      },
      CoolingUsers: {
        modals: {
          selectMethod: 'आप उपयोगकर्ता को कैसे जोड़ना चाहते हैं?',
          userCode: 'एक उपयोगकर्ता कोड दर्ज करें',
          userCodeDesc:
            'यदि आप कूलिंग उपयोगकर्ता के रूप में पंजीकृत हैं तो आप अपने खाते के विवरण में कोड पा सकते हैं।',
          addByCode: 'उपयोगकर्ता को कोड द्वारा जोड़ें',
          addWithDetails: 'उपयोगकर्ता को विवरण के साथ जोड़ें',
        },
        toasts: {
          notFound: 'इस उपयोगकर्ता कोड वाला कोई कूलिंग उपयोगकर्ता नहीं मिला।',
          taken: 'यह उपयोगकर्ता पहले से ही आपके कूलिंग उपयोगकर्ताओं की सूची में है।',
        },
      },
      EditCoolingUsers: {
        accountDetails: 'भुगतान विवरण',
        toasts: {
          warning:
            'इस खाते को हटाया नहीं जा सकता क्योंकि प्रयोक्ता ने कूलिंग यूनिट(इकाइयों) {{names}} में सक्रिय चेक-इन किया है। कृपया उपयोगकर्ता को इन वस्तुओं को लेने के लिए कमरे में आने और खाता हटाने से पहले चेक-आउट पूरा करने के लिए सूचित करें!',
          confirmation:
            'क्या आप वाकई इस उपयोगकर्ता को कूलिंग उपयोगकर्ताओं की सूची से हटाना चाहते हैं? यह ऑपरेशन इस कूलिंग यूजर को हटा देगा और इसे वापस नहीं किया जा सकता है!',
          edit: 'कूलिंग उपयोगकर्ता को सफलतापूर्वक संपादित किया गया',
          noCoolingUnits: 'आपके पास अभी तक कोई प्रशीतलन इकई नही है',
          noSurveys: 'अभी तक कोई सर्वेक्षण पूरा नहीं किया गया है।',
          updateSuccess: 'सफलतापूर्वक उत्परिवर्तित',
        },
        pdf: {
          dateRange: 'तारीख की अबधि',
          selectedUnits: 'चयनित शीतलन कक्ष',
          coolingUnit: 'प्रशीतलन इकई',
        },
        actions: {
          downloadFarmers: 'किसान के डैशबोर्ड डेटा डाउनलोड करें',
          completeLater: 'बाद में पूरा करें',
        },
      },
      CoolingUnit: {
        emptyState:
          'इस स्थान पर कोई शीतलन इकाई नहीं जोड़ी गई है। एक जोड़ने के लिए + चिह्न पर क्लिक करें।',
      },
      AddCoolingUnit: {
        heading: 'प्रशीतलन इकई के गुण',
        fields: {
          name: 'प्रशीतलन इकई ID',
          location: 'स्थान',
          coolingUnitType: 'शीतलन इकाई का सबसे अच्छा वर्णन क्या करता है?',
          metricUnit: 'मापीय',
          price: 'मूल्य',
          capacityInMetricTons: 'कुल खाली मात्रा (मीट्रिक टन)',
          foodCapacityInMetricTons: 'भोजन की अधिकतम मात्रा (मीट्रिक टन)',
          roomSizeHeading: 'शीतलन कक्ष का आकार',
          length: 'लंबाई',
          width: 'चौड़ाई',
          height: 'ऊंचाई',
          weight: 'वज़न',
          roomInsulator: 'विसंवाहक',
          capacityInNumberCrates: 'टोकरियों की अधिकतम संख्या',
          crateWeight: 'एक टोकरा का मानक आकार',
          crateSizeHeading: 'Dimensions of a standard crate',
          editableCheckins: 'Make check-ins editable by operators',
          sensorAvailable: 'सेंसर मौजूद है',
          public:
            'क्या आप अपनी कूलिंग यूनिट को संभावित कूलिंग उपयोगकर्ताओं (स्थान, कमरे का प्रकार, क्षमता और कीमत की जानकारी) के लिए दृश्यमान बनाना चाहते हैं?',
          crops: 'फल और सबजीया',
          selectCrops: 'उपजों को चयन करें',
          refrigerantType: 'उपयोग किए गए प्रशीतक का प्रकार',
          amountRefrigerant: 'प्रशीतक की मात्रा',
          powerConsumptionInMt: 'शीतल कक्ष में प्रति टन में हो रही बिजली की खपत',
          dailyRoomWattage: 'प्रकोष्ठ की दैनिक बिजली खपत',
          powerSource: 'शीत भंडार किस से संचालित होती है?',
          powerSourceDieselConsumptionKwh: 'प्रति यूनिट जनरेटर की डीजल खपत',
          pvPanelType: 'सोलर पैनलों के प्रकार ',
          pvPanelCount: 'सोलर पैनलों की संख्या ',
          pvPanelSize: 'पैनल का आकार',
          pvPanelWeight: 'एक पैनल का वजन  ',
          pvPanelMaxPower: 'एक पैनल की अधिकतम क्षमता ',
          powerSourceDieselPercent: 'डीजल जनरेटर',
          powerSourceGridPercent: 'ग्रिड लाइन ',
          powerSourcePvPercent: 'सोलर पैनल',
          powerSourceBiomassPercent: 'बायो गैस',
          electricityStorageSystem: 'बिजली संरक्षण व्यवस्था ',
          thermalStorageMethod: 'तापीय भण्डारण विधि',
          batteryCount: 'बैटरियों की संख्या',
          batteryWeight: 'बैटरी का आकार',
          batteryCapacity: 'एक बैटरी की क्षमता',
          batteryMaxCurrent: 'एक बैटरी का अधिकतम चार्जिंग करंट',
          batteryPeakEnergyStorage: 'एक बैटरी के चरम स्तर पर ऊर्जा भंडारण',
          batteryType: 'बैटरियों का प्रकार',
          selectSensorType: 'एक सेंसर प्रकार का चयन करें',
          emptySensorListError:
            'ऐसा लगता है कि आपके {{type}} खाते से कोई सेंसर कनेक्ट नहीं है। कृपया कम-से-कम एक सेंसर कनेक्ट करें और पुनः प्रयास करें।',
          selectSensor: 'एक सेंसर चुनें',
          addTempSensor: 'अपनी प्रशीतलन इकाई में इकोज़ेन सेंसर डालें',
          sensorDesc: {
            default: 'अगर जानकारी उपलब्ध नहीं है, कृपया अपने इकोज़ेन प्रदाता से अनुरोध करें',
            ubibot: 'इन सूचनाओं को अपने ubibot खाते में खोजें।',
          },
          ecozen: {
            username: 'उपयोगकर्ता का नाम',
            password: 'पासवर्ड',
            machineId: 'मशीन आईडी',
          },
          genericSensorForm: {
            username: 'उपयोगकर्ता नाम/ईमेल',
            password: 'पासवर्ड',
          },
          unknownSensor: 'अज्ञात',
          hybridFields: 'प्रकोष्ठ का कितना प्रतिशत विभिन्न स्रोतों से संचालित होता है?',
          cropSpecificPricing: 'फसल-अनुरूप  मूल्य निर्धारण',
          value: 'मूल्य',
          machineId: 'मशीन आईडी',
          channelId: 'चैनल आईडी',
          deviceTag: 'डिवाइस टैग',
          dateAdded: 'जोड़े जाने की तारीख',
          sensorType: 'सेंसर प्रकार',
        },
        coolingUnitTypes: {
          FARM_GATE_STORAGE_ROOM: 'यह फार्म-गेट पर रखा गया भंडारण कक्ष है',
          MARKET_STORAGE_ROOM: 'यह बाज़ार में रखा गया भंडारण कक्ष है',
          MOVABLE_UNIT: 'यह एक जंगम इकाई है (उदाहरण के लिए, एक प्रशीतित ट्रक)',
          OTHER: 'अन्य',
        },
        pricing: {
          label: 'मूल्य का प्रकार',
          PERIODICITY: 'प्रतिदिन',
          FIXED: 'फिक्स्ड',
          day: 'दिन',
        },
        metricUnit: {
          label: 'मापीय',
          KILOGRAMS: 'किलोग्राम',
          CRATES: 'टोकरी',
        },
        toasts: {
          addSuccess: 'शीतलन इकाई को सफलतापूर्वक जोड़ा गया',
          integrationError:
            'सेंसर से कनेक्ट करने में असमर्थ। अपने डेटा की पुष्टि करें या अपने सेंसर प्रदाता से संपर्क करें',
          integrationSuccess: 'सेंसर क्रेडेंशियल्स को सफलतापूर्वक प्रमाणित किया गया',
        },
      },
      EditCoolingUnit: {
        modal: {
          askDelete:
            'यह कार्रवाई इसके इतिहास सहित इस शीतलन इकाई को हटा देगी। क्या आप जारी रखना चाहते हैं?',
        },
        buttons: {
          viewExisting: 'मौजूदा देखें',
          editPricing: 'मूल्य संपादित करें',
        },
        toasts: {
          editSuccess: 'शीतलन इकाई को सफलतापूर्वक संपादित किया गया',
          cantDelete: 'इस शीतलन इकाई को हटाया नहीं जा सकता क्योंकि इसमें सक्रिय चेक-इन हैं।',
          successDelete: 'कूलिंग यूनिट {{name}} को सफलतापूर्वक मिटा दिया गया।',
        },
      },
      UsageAnalysis: {
        dateSelectionLabel: 'दिनों का चयन करें:',
        empty:
          'किसी भी कक्ष में कम से कम एक चेक-इन करने पर चेक-इन और चेक-आउट डैशबोर्ड में दिखाई देंगे।',
        downloadDataButton: 'डेटा डाउनलोड करें',
        modal: {
          title: 'कॉन्फ़िगरेशन सेट करें',
          coolingUnitSelection: 'कूलिंग यूनिट चुनें:',
        },
        summary: {
          totalCheckIns: 'कुल चेक-इन की संख्या:',
          totalCrates: 'कुल क्रेट्स की संख्या:',
          totalWeight: 'कुल वजन:',
          totalUsers: 'अलग-अलग उपयोगकर्ताओं की कुल संख्या:',
          weightUnit: 'किग्रा',
        },
      },
      RevenueAnalysis: {
        summary: {
          total: 'कुल राजस्व',
        },
        paymentType: {
          label: 'भुगतान विधियाँ चुनें:',
          cash: 'नकद',
          creditCard: 'क्रेडिट कार्ड',
          bankTransfer: 'बैंक ट्रांसफर',
        },
      },
      Coupons: {
        title: 'रियायती कूपन',
        emptyMessage: 'अभी तक कोई कूपन नहीं जोड़ा गया है',
        addCoupon: 'कूपन जोड़ें',
        code: 'कूपन कोड',
        percentage: 'कूपन प्रतिशत',
        revokeTitle: 'कूपन रद्द करना',
        revoke: 'रद्द करें',
        revokeMessage:
          'क्या आप सुनिश्चित हैं कि आप इस कूपन को रद्द करना चाहते हैं? एक बार रद्द होने पर, इसे फिर से इस्तेमाल नहीं किया जा सकता और छूट उपलब्ध नहीं होगी। यह कार्रवाई स्थायी है और इसे पूर्ववत नहीं किया जा सकता।',
        messages: {
          codeField: 'यह अधिकतम 25 अक्षरों का होना चाहिए और इसमें केवल अक्षर और अंक ही होने चाहिए',
        },
      },
    },
    Marketplace: {
      buyerSelection: {
        onBehalfOfCompany: 'कंपनी की ओर से खरीदें',
        forMyself: 'अपने लिए खरीदें',
        label: 'खरीदार',
      },
      sorting: {
        'price-asc': 'कीमत बढ़ती हुई',
        'price-desc': 'कीमत घटती हुई',
        'nearby-me': 'मेरे करीब',
      },
      distance: {
        withing5Km: '1 से 5 किमी दूर',
        within10Km: '5 से 10 किमी दूर',
        within25Km: '10 से 25 किमी दूर',
        beyond25Km: '25 किमी से अधिक दूर',
      },
      priceConfig: 'कीमत कॉन्फ़िगरेशन उत्पाद बिक्री से संबंधित है, कूलिंग भंडारण शुल्क नहीं।',
      addToCart: {
        addToCartButton: 'कार्ट में जोड़ें और खरीदारी जारी रखें',
        buyFullCrate: 'पूर्ण क्रेट खरीदें',
        selectQuantity: 'मात्रा चुनें',
        goToCart: 'कार्ट सारांश पर जाएं',
      },
      currentLocation: 'वर्तमान स्थान',
      invalidFormatWarning:
        'चेतावनी: शहर के नाम का स्वरूप अमान्य है। परिणाम सटीक नहीं हो सकते हैं।',
      unresolvedCityFormatWarning:
        'चेतावनी: निर्दिष्ट शहर को सही ढंग से पहचाना नहीं जा सका। परिणाम सटीक नहीं हो सकते हैं।',
      lowConfidenceWarning:
        'चेतावनी: शहर को विश्वासपूर्वक पहचाना नहीं जा सका। परिणाम सटीक नहीं हो सकते हैं।',
      filterGeneralWarning:
        'चेतावनी: स्थान पहचानने के दौरान कोई समस्या हुई। परिणाम सटीक नहीं हो सकते हैं।',
      standardCrateWeight: 'क्रेट का मानक वजन {{value}} किलोग्राम है',
      owner: 'मालिक',
      priceRange: 'कीमत सीमा / किलोग्राम',
      Filters: {
        min: 'न्यूनतम',
        max: 'अधिकतम',
        label: 'फ़िल्टर',
        coolingUnitLabel: 'कूलिंग यूनिट',
        coolingUnitHeading: 'कूलिंग यूनिट्स चुनें',
        cropTypeLabel: 'उत्पाद / फसल प्रकार',
        cropTypeHeading: 'फसलें चुनें',
        companyLabel: 'कंपनी',
        companyHeading: 'कंपनियां चुनें',
      },
      maxDistance: 'अधिकतम दूरी',
    },
    AccountDetails: {
      popups: {
        default: 'क्या आप सुनिश्चित हैं कि आप अपना खाता हटाना चाहते हैं?',
        lastRegisteredEmployee:
          'आप कंपनी में एकमात्र पंजीकृत कर्मचारी हैं, यह कार्रवाई कंपनी को हटा देगी!',
        activeCheckInOP:
          'कूलिंग यूनिट (एस) {{names}} जिसे आपको सौंपा गया है, सक्रिय चेक-इन है और आप इसमें अंतिम ऑपरेटर हैं। इससे पहले कि आप अपना खाता हटा सकें, आपको सभी उत्पादों की जांच करनी होगी या एक पंजीकृत कर्मचारी को इस कूलिंग यूनिट (यूनिटों) के लिए एक अलग ऑपरेटर असाइन करने के लिए सूचित करना होगा!',
        activeCheckInRE:
          'यदि आप अंतिम पंजीकृत कर्मचारी हैं और कुछ कूलिंग इकाइयों पर सक्रिय चेक-इन हैं, तो आप अपना खाता नहीं हटा सकते, क्योंकि यह कार्रवाई आपकी कंपनी को हटा देगी। कृपया सुनिश्चित करें कि शीतलन इकाई (इकाइयों) {{names}} में सभी सक्रिय चेक-इन पहले चेक आउट हो गए हैं।',
        activeCheckInCU:
          'आप अपना खाता नहीं हटा सकते क्योंकि कूलिंग यूनिट(इकाइयों) {{names}} में आपके सक्रिय चेक-इन हैं। कृपया पहले इन मदों की जाँच करें, और फिर अपना खाता हटाने के लिए पुनः प्रयास करें!',
      },
      fields: {
        location: 'स्थान',
        userCode: 'शीतलक उपयोगकर्ता आयात कोड',
      },
      toasts: {
        success: 'उपयोगकर्ता को सफलतापूर्वक अद्यतन किया गया',
      },
      sections: {
        sellerSettings: 'विक्रेता सेटिंग्स',
        companySellerSettings: 'बेचने वाले की सेटिंग्स (कंपनी)',
        buyerSettings: 'खरीदार सेटिंग्स',
        details: 'विवरण',
      },
      ContactsSharing: {
        publicPhone: 'फोन नंबर सार्वजनिक करें',
        publicEmail: 'ई-मेल सार्वजनिक करें',
      },
      PayoutSettings: {
        addTitle: 'कृपया अपना बैंक खाता विवरण डालें',
        editTitle: 'आपका बैंक खाता विवरण',
        addTittleForCompany: 'कृपया अपनी कंपनी के बैंक खाता विवरण दर्ज करें',
        editTitleForCompany: 'आपकी कंपनी का बैंक खाता विवरण',
        form: {
          nameLabel: 'खाता नाम',
          namePlaceholder: 'खाता नाम डालें',
          accountNumberLabel: 'खाता संख्या',
          accountNumberPlaceholder: 'खाता संख्या डालें',
          countryLabel: 'देश',
          nigeria: 'नाइजीरिया',
          selectBank: 'सूची से बैंक चुनें',
          bank: 'बैंक',
          accountType: 'खाता प्रकार',
          selectAccountType: 'खाता प्रकार चुनें',
          accountTypes: {
            personal: 'व्यक्तिगत',
            business: 'व्यापार',
          },
          errors: {
            accountName: 'खाता नाम आवश्यक है',
            account: 'खाता संख्या आवश्यक है',
            accountType: 'खाता प्रकार आवश्यक है',
            bank: 'बैंक चयन आवश्यक है',
          },
        },
        successMessage: 'बैंक खाता सफलतापूर्वक जोड़ा गया।',
        errorMessage:
          'हम खाता विवरण सत्यापित नहीं कर सके। कृपया खाता संख्या और बैंक का नाम किसी भी संभावित गलती के लिए जांचें।',
      },
      PaymentSettings: {
        cards: 'कार्ड्स',
        creditCard: {
          predefined: 'पूर्व निर्धारित',
          owner: 'कार्ड धारक का नाम',
          date: 'समाप्ति तिथि',
          cvv: 'CVV',
        },
        AddCreditCard: {
          title: 'कृपया अपने कार्ड की जानकारी दर्ज करें',
          form: {
            cardName: 'कार्ड का नाम',
            cardNamePlaceholder: 'कार्ड का नाम दर्ज करें',
            cardNumber: 'कार्ड नंबर',
            cardNumberPlaceholder: 'कार्ड नंबर दर्ज करें',
            expiryDate: 'समाप्ति तिथि',
            securityCode: 'सुरक्षा कोड',
            securityCodePlaceholder: 'कार्ड का सुरक्षा कोड दर्ज करें',
            predefinedMethod: 'पूर्वनिर्धारित भुगतान विधि',
            successMessage: 'कार्ड सफलतापूर्वक जोड़ा गया',
            cardNameError: 'कार्ड का नाम आवश्यक है',
            cardNumberError: 'कार्ड नंबर आवश्यक है',
            securityCodeError: 'सुरक्षा कोड आवश्यक है',
          },
        },
      },
    },
    About: {
      runtimeAgree: 'कॉमसोल रनटाइम समझौता',
      userLicense: 'अंत उपयोगकर्ता लाइसेंस समझौता',
      privacyPolicy: 'गोपनीयता नीति',
      comsolAbout: 'कॉमसोल के बारे में',
    },
    KnowledgeHub: {
      comic: 'किसान की यात्रा: कॉमिक स्ट्रिप',
      cooling: 'शीतलन-की-सेवा (CaaS) क्या होता हे ?',
      quality: 'फसल की गुणवत्ता अधिकतम कैसे करें',
      optimal: 'बहुमुखी उत्पादों से भरा शीत भंडार में सर्वोत्तम भंडारण की स्थिति',
      table: 'फसल भंडारण तालिका',
      sensors: 'तापमान सेंसर और टाइम-टू-पिक-अप मॉडल',
      tips: 'क्रेटों की जाँच के लिए सुझाव ',
      glitches: 'शीत कक्ष में तकनीकी खराबी पर कैसे प्रतिक्रिया दें',
      source: 'स्रोत: कृपया अधिक जानकारी के लिए चालक की नियमावली देखें:',
      clickHere: 'Click यहां',
    },
    History: {
      cropsLabel: '{{crop}} और {{amount}} और',
      priceLabel: 'कीमत',
      empty:
        'किसी भी कक्ष में कम से कम एक चेक-इन करने पर चेक-इन और चेक-आउट डैशबोर्ड में दिखाई देंगे।',
      sortMenuOptions: {
        cropType: 'फसल का प्रकार',
        movementDate: 'आवागमन की तिथि (पहले से नवीनतम)',
        movementDateReverse: 'आवागमन की तिथि (नवीनतम से पहले)',
        checkInFirst: 'पहले चेक इन',
        checkOutFirst: 'पहले चेक आउट',
        coolingUser: 'कूलिंग उपयोगकर्ता का नाम',
      },
      optionsMenu: {
        common: {
          pdfReceipt: 'पीडीएफ रसीद डाउनलोड करें',
          seeMovement: 'मूवमेंट देखें',
        },
        checkOut: {
          seeDetails: 'विवरण देखें',
          smsReceipt: 'एसएमएस रसीद डाउनलोड करें',
          marketSurvey: 'बाजार सर्वेक्षण भरें',
        },
        checkIn: {
          edit: 'चेक इन संपादित करें',
        },
      },
      detailsModal: {
        operatorNameLabel: 'चेक आउट ऑपरेटर का नाम',
        operatorNumberLabel: 'चेक आउट ऑपरेटर नंबर',
        checkOutDateLabel: 'चेक आउट तिथि',
        marketSurveyLabel: 'बाजार सर्वेक्षण पूर्ण',
        cratesLabel: 'क्रेट्स',
        combinedWeightLabel: 'संयुक्त वजन',
        paymentMethodLabel: 'भुगतान का तरीका',
        cropTypeLabel: 'फसल का प्रकार',
        checkInCodeLabel: 'चेक इन कोड',
        crateIdsLabel: 'क्रेट आईडी',
      },
      pdfModal: {
        coolingUserLabel: 'कूलिंग उपयोगकर्ता',
        dateLabel: 'तारीख',
        weightLabel: 'वजन (किलोग्राम)',
        downloadButton: 'चालान डाउनलोड करें',
        downloadName: '{{code}}-रसीद',
        successMessage: 'रसीद डाउनलोड हो गई!',
        errorMessage: 'कुछ गड़बड़ हो गया। कृपया बाद में पुनः प्रयास करें।',
        checkOut: {
          title: 'कंपनी',
          checkOutLabel: 'चेक-आउट कोड',
          idLabel: 'आईडी',
          itemLabel: 'वस्तु',
          calculatedPriceLabel: 'गणित मूल्य',
          discountLabel: 'छूट',
          totalPrice: 'कुल मूल्य',
        },
        checkIn: {
          title: 'चेक-इन रसीद',
          operatorLabel: 'ऑपरेटर',
          codeLabel: 'चेक-इन कोड',
          companyLabel: 'कंपनी',
          coolingUnitLabel: 'कूलिंग इकाई',
          priceLabel: 'मूल्य {{currency}} / दिन',
          cropLabel: 'फसल',
          numberOfCratesLabel: 'क्रेटों की संख्या',
          totalLabel: 'कुल',
        },
      },
      editCheckIn: {
        contactLabel: 'संपर्क',
        coolingUserLabel: 'कूलिंग उपयोगकर्ता',
        disclaimer: 'अस्वीकरण: उठाने का समय अनुमानित दिनों की मात्रा है।',
        disclaimerMessage:
          'अस्वीकरण: ध्यान दें कि उठाने का समय अनुमानित दिनों की मात्रा है। यह अनुमान फल या सब्जी की प्रजातियों के लिए कैलिब्रेटेड मॉडलों और एक संख्यात्मक सिमुलेशन पर आधारित था। हालांकि, उत्पाद की वास्तविक गुणवत्ता का ह्रास स्थानीय मौसम की स्थिति, बढ़ती स्थिति, कटाई की तारीख और अन्य कारकों पर भी निर्भर करता है। इसलिए, हमारे पूर्वानुमानित दिनों से विचलन हो सकता है।',
        selectCropLabel: 'एक वस्तु का चयन करें',
        successMessage: 'चेक-इन सफलतापूर्वक अपडेट किया गया!',
        errorMessage: 'चेक-इन अपडेट करने में विफल रहा। कृपया पुनः प्रयास करें।',
      },
      survey: {
        fillMessage:
          'कृपया {{crop}} के लिए <0>कूलिंग उपयोगकर्ता सर्वेक्षण</0> (आधार सर्वेक्षण) पूरा करें!',
        baseSurvey: {
          occupationQuestion: 'आपको सबसे अच्छा क्या परिभाषित करता है?',
          occupationFarmer: 'एक किसान',
          occupationTrader: 'एक छोटे विक्रेता/व्यापारी/थोक विक्रेता',
          usageQuestion: 'क्या आपने पहले ठंडे कमरे का उपयोग किया है?',
          newUser: 'नहीं, मैं एक नया उपयोगकर्ता हूँ',
          oldUser: 'हाँ, मैंने ठंडे कमरे का उपयोग किया है',
          mostUsedCommoditiesQuestion: 'सबसे अधिक फसल/व्यापार की गई वस्तुएं?',
          commodity: 'कमोडिटी',
          newCommodity: 'कमोडिटी {{index}}',
          fillCommoditiesMessage:
            'कृपया नीचे दिए गए प्रश्नों को उन वस्तुओं के लिए भरें जिन्हें आप कमरे में अधिक बार लाने की योजना बना रहे हैं।',
          addCommodityButton: 'वस्तु जोड़ें',
          genericFormError: 'कृपया एक विकल्प चुनें',
          experienceError: 'कृपया एक मान दर्ज करें',
        },
        marketSurvey: {
          title: 'कृपया जाँच की गई {{crop}} की पेटियों के लिए निम्नलिखित प्रश्नों का उत्तर दें।',
          locationQuestion: 'आपने अपनी उपज कहाँ बेची?',
          locations: {
            farm: 'खेत का फाटक',
            market: 'स्थानीय बाजार',
            both: 'दोनों खेत का फाटक और बाजार',
          },
          priceQuestion: 'आपको इसके लिए क्या कीमत मिली?',
          spoiledProducesQuestion:
            'पिछले सप्ताह भंडारण में कितना खराब हो गया था या औसत बाजार मूल्य से नीचे बिक गया था?',
          spoilageReasonsQuestion: 'फसल खराब होने का मुख्य कारण क्या है?',
          formError: 'कृपया एक विकल्प चुनें',
        },
      },
      stringTemplates: {
        movementType: {
          checkOut: 'चेक आउट',
          checkIn: 'चेक इन',
          checkedOut: 'चेक आउट किया गया',
          checkedIn: 'चेक इन किया गया',
        },
      },
    },
    MyOrders: {
      coolingFees: 'कूलिंग शुल्क',
      soldFor: 'बेचा गया',
      amountReceived: 'प्राप्त राशि',
      transactionDetails: 'लेन-देन का विवरण',
      soldTo: '{{buyerName}} को बेचा गया',
      soldForDescription: 'वस्तुओं का विक्रय मूल्य',
      coolingFeeDescription:
        'कूलिंग यूनिट में आपकी फसलों को स्टोर करने की लागत। यह राशि भुगतान से पहले बिक्री मूल्य से काट ली जाती है और आपके कूलिंग शुल्क को कवर करने के लिए कूलिंग कंपनी को स्थानांतरित की जा रही है। आपकी ओर से कोई अन्य कार्रवाई की आवश्यकता नहीं है।',
      amountReceivedDescription:
        'यह कूलिंग शुल्क के बाद आपके बैंक खाते में स्थानांतरित की गई वास्तविक राशि है।',
      ownedBy: 'मालिक',
      you: 'आप',
      sort: {
        mostRecent: 'सबसे हाल का',
        oldest: 'सबसे पुराना',
        date: 'तारीख',
      },
      status: {
        'payment-pending': 'भुगतान लंबित',
        'payment-expired': 'भुगतान समाप्त',
        cancelled: 'रद्द किया गया',
        paid: 'भुगतान किया गया',
      },
      title: 'आदेश का अवलोकन',
      orderId: 'आदेश आईडी',
      cropType: 'फसल का प्रकार',
      coolingUnit: 'कूलिंग यूनिट',
      orderTotal: 'आदेश कुल',
      backToTopButton: 'ऊपर वापस जाएं',
    },
    ShoppingCart: {
      cartUpdatedMessage:
        'कुछ उत्पादों को आपके कार्ट से हटा दिया गया है क्योंकि वे अब खरीद के लिए उपलब्ध नहीं हैं।',
      ownership: 'कार्ट की स्वामित्व को {{name}} में बदलें',
      changeOwnership:
        'कार्ट की स्वामित्व को {{name}} में बदलें। यह आपके कार्ट की सामग्री को प्रभावित कर सकता है, जिसमें कुछ क्रेट्स का हटाना भी शामिल हो सकता है जो इस परिवर्तन के बाद उपलब्ध नहीं हो सकते। क्या आप निश्चित रूप से आगे बढ़ना चाहते हैं?',
      empty: 'आपकी गाड़ी खाली है',
      daysLeft: 'दिन बचे हैं',
      weight: 'केजी उपलब्ध',
      perKg: '/ केजी',
      totalToPay: 'कुल भुगतान',
      pay: 'भुगतान करें',
      orderHeader: 'आदेश',
      subtotal: 'उप-योग',
      produce: 'उत्पाद',
      discount: 'छूट',
      fees: 'सेवा शुल्क',
      marketFees: 'मार्केटप्लेस शुल्क',
      paymentFees: 'भुगतान शुल्क',
      coolingFees: 'कूलिंग शुल्क',
      viewContacts: 'संपर्क देखें',
      contactsForDelivery: 'डिलीवरी जानकारी के लिए संपर्क',
      gotItButton: 'समझ गया!',
      pickupMethods: 'पिकअप विधि',
      selectPickupMethod: 'पिकअप विधि चुनें',
      selectPickupMethodInfo: 'हर कूलिंग यूनिट के लिए पिकअप विधि का चयन आवश्यक है।',
      pickupMethodSelectionMissing: '{{amount}} कूलिंग यूनिट्स के लिए पिकअप विधि चयन गायब है।',
      pickUpToday: 'आज पिकअप',
      keepInStorageDailyRate: 'संग्रह में रखें ({{price}} / दिन)',
      keepInStorageFixedRate: 'संग्रह में रखें ({{price}})',
      delivery: 'डिलीवरी',
      contactName: 'संपर्क नाम',
      phoneNumber: 'फोन नंबर',
      thankYouMessage: 'ऑर्डर देने के लिए धन्यवाद',
      orderOverview: 'ऑर्डर अवलोकन',
      products: 'उत्पाद',
      consultOrders: 'मेरे ऑर्डर देखें',
      total: 'कुल',
      couponQuestion: 'क्या आपके पास छूट कूपन है?',
      redeem: 'कोड भुनाएं।',
      redeemCoupon: 'कूपन भुनाएं',
      couponPlaceholder: 'उदाहरण: 20OFF',
      discountsApplied: 'लागू की गई छूट',
      method: 'विधि:',
      deliveryInfo:
        'कृपया ध्यान दें कि डिलीवरी शुल्क प्रदाता पर निर्भर करता है। यदि डिलीवरी कल के लिए निर्धारित है, तो एक कूलिंग शुल्क {{value}} भी लागू किया जाएगा।',
      pickUpTodayInfo:
        'कृपया सुनिश्चित करें कि आप दिन के अंत तक अपने उत्पादों को पिकअप कर लें ताकि अतिरिक्त कूलिंग शुल्क से बच सकें।',
      keepInStorageInfo: 'जब आप अपना ऑर्डर पिकअप करेंगे तो कूलिंग शुल्क लागू होगा।',
      orderOverviewSubtitle:
        "आप इस जानकारी को 'My Orders' टैब में 'Marketplace' स्क्रीन के तहत पुनः देख सकते हैं।",
      pickupModal: {
        today: 'कृपया आज अपना ऑर्डर {{company}}, जो {{location}} में स्थित है, से पिकअप करें।',
        storage:
          'आपके क्रेट्स अब {{company}}, जो {{location}} में स्थित है, में संग्रहित किए जा रहे हैं।',
        delivery:
          "कृपया डिलीवरी की व्यवस्था के लिए उपलब्ध नंबरों से संपर्क करें। आप 'Order details' में डिलीवरी विकल्पों की सूची देख सकते हैं।",
      },
      errors: { invalid: 'अमान्य मूल्य', minimumCartValue: 'ऑर्डर कम से कम ₦100 होना चाहिए।' },
      legacyContactsWarning:
        '{{companyName}} ने इस रूम के लिए डिलीवरी संपर्क असाइन नहीं किए हैं। यह {{companyName}} के सभी डिलीवरी संपर्कों की सूची है।',
      contacts: 'संपर्क',
    },
    Analytics: {
      emptyState: 'प्रदर्शित करने के लिए कोई डेटा नहीं',
      company: 'कंपनी',
      aggregated: 'एकत्रित',
      comparison: 'तुलना',
      downloadDataButton: 'डेटा डाउनलोड करें',
      users: 'उपयोगकर्ता',
      impact: 'प्रभाव',
      maleLabel: '👨🏽 पुरुष: {{amount}}',
      femaleLabel: '👩🏽 महिला: {{amount}}',
      otherLabel: 'अन्य: {{amount}}',
      usersTotal: 'अलग-अलग ठंडक उपयोगकर्ताओं की कुल संख्या = {{amount}}',
      operatorsTotal: 'कुल ऑपरेटरों की संख्या = {{amount}}',
      beneficiariesTotal: 'अप्रत्यक्ष लाभार्थियों की कुल संख्या = {{amount}}',
      totalCratesLabel: '🧺 कुल क्रेट्स',
      totalQuantityLabel: '📦 कुल मात्रा (किलोग्राम)',
      totalOperations: '👷🏽‍♂️ कुल संचालन',
      checkedInLabel: 'चेक इन: {{amount}}',
      checkedOutLabel: 'चेक आउट: {{amount}}',
      methodologyButton: 'कार्यप्रणाली देखें',
      farmersAnalytics: {
        coolingUserName: 'कूलिंग उपयोगकर्ता नाम',
        coolingUserType: 'कूलिंग उपयोगकर्ता प्रकार',
        avgStorageTime: 'औसत भंडारण समय',
        coldStorageCost: 'कोल्ड स्टोरेज लागत',
        days: 'दिन',
        baselineSurveyButton: 'बेसलाइन सर्वेक्षण भरें',
        baseLineSurveyMessage: 'आपको {{amount}} सर्वेक्षण पूरे करने हैं 😟',
        postCheckOutSurveyButton: 'पोस्ट चेकआउट सर्वेक्षण भरें',
        postCheckOutSurveyMessage: 'आपको {{amount}} सर्वेक्षण पूरे करने हैं 😟',
        noChangeFoodLoss: 'खाद्य नुकसान में कोई परिवर्तन नहीं',
        increaseInFoodLoss: 'खाद्य नुकसान में वृद्धि',
        decreaseInFoodLoss: 'खाद्य नुकसान में कमी',
        increaseInRevenue: 'राजस्व में वृद्धि',
        decreaseInRevenue: 'राजस्व में कमी',
        foodLossEvolution: '🥗 फसल के अनुसार खाद्य नुकसान का विकास (शीर्ष 5)',
        changePercentage: '% परिवर्तन',
        crops: 'फसलें',
        foodLossLevels: 'खाद्य नुकसान के स्तर',
        revenueEvolution: '💰 औसत राजस्व का विकास',
        revenueCropEvolution: '💰 फसल के अनुसार औसत राजस्व का विकास (शीर्ष 5)',
        noChangeRevenue: 'राजस्व में कोई परिवर्तन नहीं',
        revenueLevels: 'राजस्व के स्तर',
        baselineSurveyLabel: '📊 पूर्ण किए गए बेसलाइन सर्वेक्षण की संख्या',
        postCheckoutSurveyLabel: '📊 पूर्ण किए गए पोस्ट-चेकआउट सर्वेक्षण की संख्या',
        allPostCheckoutSurveysCompleted: 'सभी पोस्ट-चेकआउट सर्वेक्षण पूरे हो गए 🤝',
        allBaselineSurveysCompleted: 'सभी आधारभूत सर्वेक्षण पूरे हो गए 🤝',
      },
      companyTab: {
        usersTab: {
          employeesTotal: 'कुल पंजीकृत कर्मचारियों की संख्या = {{amount}}',
          usersType: 'ठंडक उपयोगकर्ताओं का प्रकार',
          farmersLabel: '🧑🏽‍🌾 किसान: {{amount}}',
          tradersLabel: '👩🏽‍💼 व्यापारी: {{amount}}',
        },
        utilizationTab: {
          occupancyLabel: 'ठंडक इकाइयों की औसत अधिभोगिता:',
          occupancyContent: '🏘️ {{amount}}%',
        },
        impactTab: {
          foodLossLabel: '🥗 खाद्य हानि विकास',
          revenueLabel: '💰 कूलिंग उपयोगकर्ता राजस्व विकास',
          co2Label: '💨 CO2e उत्सर्जन विकास',
          surveysAmountLabel:
            '📊 खाद्य हानि और राजस्व विकास की गणना के लिए उपयोग किए गए सर्वेक्षणों की संख्या',
          co2Increase: 'कूलिंग के साथ उत्पाद के प्रति किलोग्राम CO2e उत्सर्जन',
          co2Decrease: 'कूलिंग के साथ प्रति किलोग्राम उत्पादन पर CO2e उत्सर्जन में कमी आई है',
          co2WithoutCooling: 'कूलिंग के बिना उत्पाद के प्रति किलोग्राम CO2e उत्सर्जन',
          co2WithCooling: 'कूलिंग के साथ उत्पाद के प्रति किलोग्राम CO2e उत्सर्जित',
          from: 'से',
          to: 'तक',
        },
        downloadFileName: 'एनालिटिक्स-डाटा',
        utilization: 'उपयोग',
        goBackButton: 'मुख्य पर लौटें',
        companyNameLabel: 'कंपनी का नाम',
        revenueLabel: 'कुल राजस्व',
        coolingUnitsLabel: 'ठंडक यूनिट्स की संख्या',
        singleCoolingUnitContent: '1 यूनिट',
        coolingUnitsContent: '{{amount}} यूनिट्स',
        capacityLabel: 'कुल ठंडक क्षमता',
        capacityContent: '{{amount}} मीट्रिक टन',
        coolingUnitTypeLabel: 'ठंडक यूनिट प्रकार',
        coolingUnitTypeMarket: '{{amount}} मार्केट कमरे',
        coolingUnitTypeFarmGate: '{{amount}} फार्म-गेट कमरे',
        coolingUnitTypeMovable: '{{amount}} मूवेबल कमरे',
      },
      tabsShared: {
        configurationMessage:
          'कृपया अपनी तिथियों और कूलिंग यूनिट्स को कॉन्फ़िगर करें ताकि आपको पहुँच मिल सके।',
        configureButton: 'कॉन्फ़िगर करें',
        crates: 'क्रेट्स',
        dateRangeLabel: 'तारीख सीमा:',
        selectedUnitsLabel: 'चयनित शीतलन इकाइयाँ:',
        totalCo2Label: '💨 कुल CO2e उत्सर्जित:',
        roomRevenue: '📈 कमरे की आय',
      },
      comparisonTab: {
        sortingLabel: 'क्रमबद्ध करें',
        coolingUnit: 'शीतलन इकाई',
        genderHeader: 'पुरुष | महिला | अन्य',
        genderSecondaryHeader: 'पुरुष | महिला',
        total: 'कुल',
        sortingMenuOptions: {
          descending: 'घटते क्रम में',
          ascending: 'बढ़ते क्रम में',
          coolingUnitName: 'कूलिंग यूनिट का नाम',
        },
        usersTab: {
          operators: 'ऑपरेटर्स',
          users: 'सक्रिय शीतलन उपयोगकर्ता',
          activeUsers: 'सक्रिय उपयोगकर्ता',
          beneficiaries: 'अप्रत्यक्ष लाभार्थी',
        },
        cratesTab: {
          crates: 'क्रेट',
          kg: 'किलोग्राम',
          operations: 'ऑपरेशन्स',
          checkedIn: 'चेक-इन किया गया',
          checkedOut: 'चेक-आउट किया गया',
          checkedInCropDistribution: '🧺 चेक-इन फसल वितरण (क्रेट)',
          checkedInKgDistribution: '⚖️ चेक-इन फसल वितरण (किलोग्राम)',
          checkInCropDistribution: 'चेक-इन फसल वितरण',
          checkedOutCropDistribution: '🧺 चेक-आउट फसल वितरण (क्रेट)',
          checkedOutKgDistribution: '⚖️ चेक-आउट फसल वितरण (किलोग्राम)',
          checkOutCropDistribution: 'चेक-आउट फसल वितरण',
          co2: '💨 कूलिंग के लिए CO2e उत्सर्जित',
          co2EmissionsLabel: 'CO2e उत्सर्जन (किलोग्राम)',
          co2DistributionLabel: 'CO2e फसल वितरण',
          co2Kg: 'किलोग्राम CO2 उत्सर्जित',
        },
        impactTab: {
          occupancyLabel: '🏘️ कूलिंग यूनिट्स का औसत अधिभोग',
          occupancy: 'अधिभोग',
          foodLossLabel: '🥗 खाद्य नुकसान की प्रगति',
          revenueLabel: '💰 कूलिंग उपयोगकर्ता राजस्व की प्रगति',
          changePercentage: '% परिवर्तन',
          completePercentage: '% पूर्ण',
          foodLossLevels: 'खाद्य नुकसान के स्तर',
          revenueLevels: 'राजस्व स्तर',
          revenuePerRoomLabel: '📈 प्रति कमरे का राजस्व',
          co2Label: '💨 CO2e उत्सर्जन की प्रगति',
          surveysAmountLabel:
            '📊 खाद्य नुकसान और राजस्व प्रगति की गणना के लिए उपयोग किए गए सर्वेक्षणों की संख्या',
          co2EmissionsLabel: 'CO2e (किलो)',
        },
      },
    },
    Notifications: {
      text: {
        notifications: 'अधिसूचना',
      },
      sensorError:
        'कोल्ड रूम के सेंसर ने {{unitName}} पिछले 12 घंटों में कोई जानकारी नहीं भेजा है। कृपया सेंसर ठीक होने तक \n हाथ से दर्ज करें।.',
      survey: 'कृपया {{farmer}} के लिए, {{crop}} से संबंधित भंडारण-के-बाद सर्वेक्षण पूरा करें।',
      link: 'कृपया इसे पूरा करने के लिए यहां जाएं.',
      coolingUserSurvey:
        'आपने {{crop}} में चेक इन कर लिया है लेकिन आपने इस फसल के लिए सर्वेक्षण पूरा नहीं किया है।.',
      operatorSurvey:
        'आपने {{farmer}} के लिए {{crop}} में चेक इन कर लिया है लेकिन आपने इस फसल के लिए सर्वेक्षण पूरा नहीं किया है।.',
      pickup:
        'आपके टोकरे {{crop}} के टोकरी को जल्द से जल्द उठाया जाना चाहिए! (चेक-इन तिथि: {{checkIn}}, कूलिंग यूनिट आईडी: {{unitId}}, ପ୍ରବେଶ ପରିଚୟ ସଂଖ୍ୟା: {{movementCode}}).',
      notifyCoolingUser:
        'कृपया उपयोगकर्ता {{farmer}} को सूचित करें कि उसके {{crop}} के टोकरी को जल्द से जल्द उठाया जाना चाहिए! (चेक-इन तिथि: {{checkIn}}, कूलिंग यूनिट आईडी: {{unitId}}, ପ୍ରବେଶ ପରିଚୟ ସଂଖ୍ୟା: {{movementCode}}).',
      checkIn: 'ऑपरेटर {{farmer}} ने {{date}} को चेक-इन {{movementCode}} में संपादन किया।',
      surveyAlreadyFilled: 'सर्वेक्षण पहले ही भरा जा चुका है',
      orderRequiresMovement:
        'कार्गो को क्रेट्स के बीच पुनर्वितरित करने की आवश्यकता है। किन वस्तुओं को स्थानांतरित करना है, इसके विवरण के लिए क्लिक करें।',
      listingPriceUpdated:
        '{{crop}} की टोकरी का सूचीबद्ध मूल्य {{unitName}} में अपडेट किया गया है: {{priceTag}}',
    },
  },
  tutorial: {
    welcome: 'कोल्टिवेट में आपका स्वागत है। यह कार्यों की प्रक्रिया है।',
    farmerWelcome:
      'Coldtivate में आपका स्वागत है! यह ट्यूटोरियल आपको ऐप का उपयोग समझने में मदद करेगा।',
    quit: 'ट्यूटोरियल छोड़ें',
    congratulations:
      'बधाई हो! आपने ट्यूटोरियल पूरा कर लिया है! ऐप का उपयोग करने के लिए डैशबोर्ड पर वापस जाएं।',
    prev: 'पिछला चरण',
    next: 'अगला',
    start: 'ट्यूटोरियल शुरू करें',
    final:
      'बधाई हो! आपने ट्यूटोरियल पूरा कर लिया है! ऐप का उपयोग करने के लिए डैशबोर्ड पर वापस जाएं।',
    backToDashboard: 'डैशबोर्ड पर वापस जाएं',
    steps: {
      openDrawer:
        'ऊपर बाईं ओर, आपको मुख्य कार्यों के साथ एक मेनू मिलेगा। आगे बढ़ें और इसे क्लिक करें।',
      repeatTutorial:
        'यदि आप इस ट्यूटोरियल को फिर से देखना चाहते हैं, तो आप इसे मेनू में भी पा सकते हैं।',
      managementNavigation:
        'मेनू में, आप "प्रबंधन" पर नेविगेट कर सकते हैं और वहां टैप करके कूलिंग उपयोगकर्ताओं को जोड़ सकते हैं या संपादित कर सकते हैं। आगे बढ़ें और इसे आजमाएं।',
      operatorManagementNavigation:
        'मेन्‍यू में, आप "मैनेजमेंट" पर जा सकते हैं और वहां जाकर कूलिंग उपयोगकर्ताओं को जोड़ने या संपादित करने के लिए टैप कर सकते हैं।',
      addCoolingUser:
        'जो कूलिंग उपयोगकर्ता कोल्टिवेट पर पंजीकृत नहीं हैं, उन्हें उनके विवरण (नाम, फोन नंबर) दर्ज करके जोड़ा जा सकता है। जो कूलिंग उपयोगकर्ता पहले से ऐप में साइन अप कर चुके हैं, उन्हें कोड द्वारा जोड़ा जा सकता है। वे अपना कोड अपने प्रोफ़ाइल में -> "खाता विवरण" -> "कूलिंग उपयोगकर्ता आयात कोड" पर पा सकते हैं।',
      navigateToCoolingUser: 'आगे बढ़ें और कूलिंग उपयोगकर्ता टैब पर क्लिक करें।',
      listCoolingUsers:
        'स्मार्टफोन वाले कूलिंग उपयोगकर्ताओं की पहचान स्क्रीन के दाईं ओर फोन आइकन से होती है। अन्य कूलिंग उपयोगकर्ता साधारण फोन वाले होते हैं। दोनों मामलों में, आप विवरण और कूलिंग उपयोगकर्ता सर्वेक्षण तक पहुंचने के लिए किसी नाम पर क्लिक कर सकते हैं।',
      navigateToAddCoolingUser: "नया कूलिंग उपयोगकर्ता जोड़ने के लिए '+' चिन्ह पर क्लिक करना।",
      coolingUnitStep:
        'आप शीर्ष पर ड्रॉपडाउन मेनू पर क्लिक करके कूलिंग इकाइयों के बीच नेविगेट कर सकते हैं।',
      initiateCheckIn1:
        'एक बार जब आप एक कूलिंग उपयोगकर्ता जोड़ते हैं, तो आप उस कूलिंग उपयोगकर्ता के लिए चेक-इन कर सकते हैं। आगे बढ़ें और गतिविधि बटन पर क्लिक करें।',
      initiateCheckIn2: 'अब चेक-इन बटन (जो हरा है) पर क्लिक करें।',
      checkIn1:
        'चेक-इन पूरा करने के लिए, आपको "क्रेट जोड़ें" पर क्लिक करना होगा और कदम दर कदम निर्देशों का पालन करना होगा। परिणाम कैसा दिखेगा यह देखने के लिए "जारी रखें" पर क्लिक करें।',
      checkIn2:
        'सभी चरणों को पूरा करने के बाद, आपको उस कमरे में चेक-इन करने के लिए तैयार क्रेट्स का अवलोकन मिलेगा।',
      checkIn3:
        'यदि आप संतुष्ट हैं, तो आप "पुष्टि करें" पर क्लिक कर सकते हैं और नए क्रेट्स डैशबोर्ड में जोड़े जाएंगे।',
      history: '"इतिहास" पर क्लिक करके, आप कमरे में सभी आंदोलनों को देख सकते हैं।',
      coolingUnits:
        '"कूलिंग इकाइयों" पर क्लिक करें ताकि आप अगले 7 दिनों में कूलिंग इकाई की क्षमता (योजनाकार टैब में) और कमरे का तापमान (कमरे की स्थिति टैब में) देख सकें।',
      roomConditions:
        'आप मैन्युअल रूप से "कमरे की स्थिति" में कूलिंग कमरे का तापमान अपडेट कर सकते हैं, यदि आपके पास ऐप से जुड़े कोई सेंसर नहीं हैं।',
      checkOut1:
        'चेक-आउट शुरू करने के लिए, गतिविधि बटन पर क्लिक करें और फिर लाल बटन पर। फिर चेक-आउट पूरा करने के लिए निर्देशों का पालन करें।',
      checkOut2: 'आप चेक-आउट करने के लिए कूलिंग इकाई और फसलों का चयन कर सकते हैं।',
      checkOut3:
        'एक बार जब वस्तुओं का भुगतान हो जाए, तो संबंधित बटन पर क्लिक करें और चेक-आउट को अंतिम रूप दें।',
      navigateToLocations:
        'आपको जो पहला काम करने की आवश्यकता होगी वह एक स्थान जोड़ना है। आगे बढ़ें और स्थान टैब पर क्लिक करें।',
      locations:
        'आप एक नाम चुनकर और इसके अक्षांश और देशांतर को जोड़कर, अपने जीपीएस स्थानांतरित करके (यदि आप ठंडे कमरे के स्थान पर हैं), या पते को टाइप करके एक स्थान जोड़ सकते हैं।',
      navigateToCoolingUnits:
        'एक बार जब एक स्थान जोड़ दिया गया है, तो आप एक कूलिंग इकाई जोड़ सकते हैं। आगे बढ़ें और कूलिंग इकाइयों के टैब पर क्लिक करें।',
      addCoolingUnits:
        'एक कूलिंग इकाई को ऊपर दिए गए विवरण को पूरा करके जोड़ा जा सकता है। यदि आपके पास कूलिंग इकाई में तापमान सेंसर हैं और एक एपीआई स्थापित है, तो आप क्रेडेंशियल दर्ज कर सकते हैं और अपने सेंसर को ऐप से स्वचालित रूप से कनेक्ट कर सकते हैं।',
      addEmployeesOperators:
        'आप प्रबंधन स्क्रीन के माध्यम से पंजीकृत कर्मचारियों और ऑपरेटरों को जोड़ सकते हैं। किसी भी भूमिका को जोड़ने के लिए, आपको उनका फोन नंबर चाहिए होगा। उन्हें एक आमंत्रण लिंक के साथ एक एसएमएस प्राप्त होगा। एक फोन नंबर का उपयोग केवल एक उपयोगकर्ता के लिए किया जा सकता है।',
      employeeCoolingUnitsStep:
        'एक बार जब आप एक कूलिंग इकाई चुन लेते हैं, तो आपको "डैशबोर्ड" टैब में चेक-इन, "इतिहास" टैब में आंदोलन और "कूलिंग इकाइयों" टैब में नियोजित उपयोग दर और कमरे के तापमान का अवलोकन मिलेगा।',
      localizationPreferences:
        'आप "स्थानीयकरण प्राथमिकताएं" का चयन करके ऐप की भाषा बदल सकते हैं। भाषा बदलने के लिए "परिवर्तन सहेजें" बटन पर क्लिक करना सुनिश्चित करें!',
      accountDetailsNavigation:
        'मेनू में, आप "खाता विवरण" पर नेविगेट कर सकते हैं और वहां टैप करके अपने खाते से संबंधित कॉन्फ़िगरेशन के सेट को देख/संपादित कर सकते हैं। आगे बढ़ें और इसे आजमाएं।',
      coolingUserSurvey:
        'जब आप पहली बार ऐप खोलते हैं, तो आपसे एक छोटा सर्वे पूरा करने के लिए कहा जाता है। यह बहुत महत्वपूर्ण है कि आप सर्वे को पूरा करें ताकि ऐप आपको कस्टमाइज्ड सिफारिशें दे सके। अगर आप पहले लॉग इन करते समय सर्वे पूरा नहीं कर पाते हैं, तो आप "खाता विवरण" -> "कूलिंग उपयोगकर्ता सर्वे" में जाकर सर्वे तक पहुँच सकते हैं। सर्वे पूरा करने के लिए समय देने के लिए धन्यवाद!',
      coolingUserCode:
        'जब आप अपने उत्पाद को संग्रहित करने के लिए पहली बार एक ठंडे कमरे में पहुंचते हैं, तो ऑपरेटर आपसे अपना व्यक्तिगत कोड देने के लिए कहेगा, ताकि आपको ठंडे कमरे के उपयोगकर्ताओं की सूची में जोड़ा जा सके। आप यह कोड "व्यक्तिगत विवरण" -> "कूलिंग उपयोगकर्ता आयात कोड" में पा सकते हैं।',
      knowledgeHub:
        'मेनू में, आप "ज्ञान हब" पा सकते हैं, जिसमें विभिन्न फसलों को कितनी देर तक संग्रहीत किया जा सकता है और उनका इष्टतम तापमान के बारे में सलाह है। इसे देखें ताकि आप समझ सकें कि ठंडा कमरा विभिन्न फलों और सब्जियों की गुणवत्ता को बनाए रखने में आपकी कैसे मदद कर सकता है!',
      faq: 'मेनू में, आप अक्सर पूछे जाने वाले प्रश्न (FAQ) भी पा सकते हैं। हम आपको सलाह देते हैं कि ऐप और ठंडे कमरों में अपने उत्पादों को संग्रहित करने के लाभ के बारे में अधिक जानने के लिए उन्हें देखें।',
      dashboardStep1:
        'एक बार जब ऑपरेटर आपके लिए चेक-इन पूरा कर लेता है, तो आप "डैशबोर्ड" अनुभाग में कमरे में संग्रहीत उत्पाद देख सकेंगे। प्रत्येक कार्ड में एक ही प्रकार के फसलों के एक सेट के क्रेट्स होते हैं जो एक साथ चेक-इन किए गए थे।',
      dashboardStep2:
        'डैशबोर्ड में प्रत्येक कार्ड में जानकारी होती है: फसल का प्रकार, संग्रहीत क्रेट्स की संख्या, कितने दिन पहले से वे संग्रहीत हैं, दैनिक मूल्य (सभी क्रेट्स के लिए), और चेक-इन आईडी।',
      dashboardStep3:
        'रंगीन दिनों की संख्या "उठाने का समय" (TTPU) को इंगित करती है, जिसका अर्थ है कि आपकी फसल कितने दिनों तक अच्छी रहेगी, यदि यह ठंडा रहता है। लाल रंग का अर्थ है कि उत्पाद अपनी गुणवत्ता खो रहा है और इसे जल्द से जल्द उठाना चाहिए।',
      dashboardStep4:
        'यदि कार्ड का रंग पीला (2-5 दिन बचे) या हरा (5 से अधिक दिन) है, तो आपको क्रेट्स की चिंता करने की आवश्यकता नहीं है। दिनों की संख्या दिन में कई बार फिर से गणना की जाती है, इसलिए सुनिश्चित करें कि आप नियमित रूप से "डैशबोर्ड" की जांच करें ताकि यह देख सकें कि कमरे में आपके क्रेट्स की गुणवत्ता कैसे विकसित हो रही है।',
      dashboardStep5:
        'यदि आपके पास कई कमरों में क्रेट्स संग्रहीत हैं, तो आप ड्रॉपडाउन से कंपनी और कूलिंग इकाई का चयन करके जिस कमरे को आप देख रहे हैं, उसे बदल सकते हैं।',
      dashboardStep6:
        'When your crates are approaching the Time to pick up and the card turns red, you will receive a notification that advise you to go to the room, pick up those crates, and sell them. You can check your notifications by clicking the bell on the right.',
      farmerHistory:
        'टैब "इतिहास" में, आप प्रत्येक कमरे में किए गए सभी चेक-इन और चेक-आउट का सारांश देख सकते हैं। यदि आप किसी चेक-आउट के बगल में एक लाल बिंदु देखते हैं, तो कृपया तीन बिंदुओं पर क्लिक करें और "बाजार सर्वेक्षण भरें" चुनें। यहां, हम जानना चाहते हैं कि आपने अपने उत्पाद को किस कीमत पर बेचा है, और क्या कुछ खराब हो गया है। हम इस जानकारी का उपयोग ठंडे कमरे के संचालन में सुधार के लिए करते हैं, इसलिए महत्वपूर्ण है कि आप सही उत्तर दें।',
      farmersCoolingUnits:
        'अपने पास कूलिंग यूनिट्स देखने के लिए, आप स्क्रीन के नीचे दिए गए बटनों पर जा सकते हैं, "More" टैब पर क्लिक करें, "Cooling units" पर क्लिक करें और "Map" चुनें। मानचित्र पर प्रत्येक पिन पर क्लिक करके, आप यूनिट का प्रकार और भंडारण का मूल्य देख सकते हैं।',
      farmersUnitsPlanner:
        'टैब "कूलिंग इकाइयाँ" में आप मानचित्र, कमरे की वर्तमान और भविष्य की भरी हुई स्थिति ("योजनाकार" में) और कमरे का तापमान ("कमरे की स्थिति" में) देख सकते हैं। ये स्क्रीन आपको दूर से यह देखने में मदद करती हैं कि ठंडे कमरों में क्या हो रहा है, बिना वहां व्यक्तिगत रूप से जाने की आवश्यकता के!',
      marketPrice:
        'यदि आप "बाजार मूल्य" नामक टैब देखते हैं, तो आप पिछले दिनों में देश भर में विभिन्न फलों और सब्जियों के मूल्य और भविष्य के लिए कीमतों का पूर्वानुमान देख सकते हैं। फिलहाल, यह विकल्प केवल चयनित देशों के लिए उपलब्ध है।',
      farmerFinalStep:
        'बधाई हो! आपने ट्यूटोरियल पूरा कर लिया है! यदि आपके पास ऐप के बारे में कोई प्रश्न हैं, तो हम आपको सुझाव देते हैं कि आप FAQ की जांच करें, ठंडे कमरे के एक ऑपरेटर से पूछें, या हमें app@yourvcca.org पर लिखें।',
      more: '"अधिक" पर क्लिक करने से, आप "इतिहास", "फसल के मूल्य", "कूलिंग यूनिट्स", और "आदेश" स्क्रीन का चयन कर सकते हैं।',
      marketplaceStep1:
        'यह Coldtivate का डिजिटल मार्केटप्लेस है, जहाँ सभी उपयोगकर्ता कोल्ड रूम में संग्रहीत उत्पादों को खरीद और बेच सकते हैं। बिक्री के लिए प्रत्येक क्रेट यहाँ सूचीबद्ध है, और आप कोई भी मात्रा (किलोग्राम में) या पूरा क्रेट खरीद सकते हैं।',
      marketplaceStep2:
        'खरीदने के लिए आइटम चुनने के बाद, अपनी कार्ट में मौजूद आइटम देखने के लिए शॉपिंग कार्ट आइकन पर क्लिक करें।',
      shoppingCart:
        "अपनी खरीदारी पूरी करने के लिए, आप अपनी शॉपिंग कार्ट में मौजूद आइटम की समीक्षा कर सकते हैं और ऑर्डर पूरा करने के लिए चरण-दर-चरण निर्देशों का पालन करते हुए 'जारी रखें' पर क्लिक कर सकते हैं।",
      marketplaceStep3:
        "मुख्य मार्केटप्लेस टैब पर आप 'मेरे ऑर्डर' और 'मेरी बिक्री' पेज के ज़रिए अपने ऑर्डर और बिक्री का संक्षिप्त इतिहास भी देख सकते हैं। अधिक जानने के लिए 'मेरे ऑर्डर' पर क्लिक करें।",
      myOrders:
        'यहाँ आप मार्केटप्लेस के माध्यम से किए गए प्रत्येक ऑर्डर को देख सकते हैं, हर ऑर्डर का विवरण कार्ड में दर्ज है - प्रत्येक ऑर्डर के बारे में और अधिक जानने के लिए दाईं ओर वाले तीर पर क्लिक करें।',
      operatorListForSale:
        'आप एक कोल्ड रूम उपयोगकर्ता को मार्केटप्लेस में आइटम बिक्री के लिए सूचीबद्ध करने में सहायता कर सकते हैं। विवरण देखने के लिए दाईं ओर वाले तीर पर क्लिक करें।',
      coolingUserListForSale:
        'आप यह प्रबंधित कर सकते हैं कि कौन-कौन से क्रेट्स को मार्केटप्लेस में बिक्री के लिए सूचीबद्ध किया जाए। विवरण देखने के लिए दाईं ओर वाले तीर पर क्लिक करें।',
      commonListForSale:
        '"बिक्री के लिए सूचीबद्ध करें" पर क्लिक करें ताकि क्रेट #1 को बिक्री के लिए डाला जा सके।',
      commonListForSalePrice:
        'क्रेट को बिक्री के लिए सूचीबद्ध करने के बाद, आप नीचे बिक्री मूल्य भी दर्ज कर सकते हैं! इन सेटिंग्स को कभी भी बदला जा सकता है।',
    },
  },
} satisfies Translations;
