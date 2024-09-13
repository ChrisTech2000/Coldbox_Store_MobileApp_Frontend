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
  gender: {
    female: 'महिला',
    male: 'पुरुष',
    other: 'अन्य',
  },
  navigation: {
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
      DisabledCoolingUnitsDescription: 'कम से कम एक स्थान जोड़ें',
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
      RootMainTabStack: '{{firstName}} का Coldtivate',
      ProduceDetails: '{{produceCode}}',
      MarketplaceSettings: 'Marketplace settings', // TODO
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
    },
    dashboard: {
      AccountDetails: 'अकाउंट डिटेल्स',
      PersonalDetails: 'Personal details', // TODO
      LocalizationPreferences: 'Localization preferences', // TODO
      ContactsSharing: 'Contacts sharing', // TODO
      Coupons: 'Coupons', // TODO
      CouponsActiveTab: 'Active', // TODO
      CouponsRevokedTab: 'Revoked', // TODO
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
      CrateWeightAndPricing: 'Crate weight and pricing', // TODO
    },
    about: {
      comsolAgreement: 'COMSOL Runtime License Agreement 6.0',
      userLicense: 'END USER LICENSE AGREEMENT',
      aboutComsol: 'About COMSOL',
      privacyPolicy: 'Privacy Policy',
    },
    history: {
      EditCheckIn: '{{code}}',
      MarketSurvey: '{{farmer}} के लिए बाजार सर्वेक्षण',
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
    add: 'ऐड',
    edit: 'एडिट',
    search: 'खोजा जा रहा है...',
    or: 'या',
    go: 'चलो!',
    done: 'पूर्ण',
    'not-available': 'अभी उपलब्ध नहीं है',
    'complete-later': 'बाद में पूरा करें',
    'update-success': 'सफलतापूर्वक उत्परिवर्तित',
    'save-changes': 'बदलाव सहेजें',
    continue: 'जारी रखना',
  },
  components: {
    datePicker: {
      clearButtonLabel: 'साफ़ करें',
      confirmButtonLabel: 'पुष्टि करें',
      placeholder: 'dd/mm/yyyy',
      startDateSelection: 'प्रारंभ तिथि चुनें:',
      endDateSelection: 'समाप्ति तिथि चुनें:',
    },
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
        toasts: {
          login: 'उपयोगकर्ता नाम या पासवर्ड सही नहीं हैं',
          success: 'सफलतापूर्वक लॉग इन',
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
        header: 'कूलिंग उपयोगकर्ता साइन अप करें',
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
        partOne: 'अपना पासवर्ड रीसेट करने के लिए इस लिंक पर क्लिक करें {{baseLink}}',
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
    },
    emptyGeneral: 'इस समय, कोई उपलब्ध डेटा नहीं है।',
    emptyCoolingUser:
      'किसी भी कमरे में कम से कम एक चेक-इन करने पर भंडारण में रखे आइटम डैशबोर्ड में दिखाई देंगे।',
    noCompanyAvailable: 'कोई कंपनी उपलब्ध नहीं है',
    noCoolingUnitAvailable: 'कोई कूलिंग यूनिट उपलब्ध नहीं है',
    noLocationsAvailable:
      'Coldtivate में आपका स्वागत है। प्रबंधन पैनल में अपने ऐप में स्थान जोड़कर शुरुआत करें।',
    MarketPrice: {
      emptyState: 'आपके देश में बाजार मूल्य उपलब्ध नहीं हैं',
      commodityLabel: 'वस्तु',
      commodityModalTitle: 'एक वस्तु का चयन करें',
      Trend: {
        title: 'मूल्य पूर्वानुमान प्राप्त करने के लिए एक वस्तु और एक राज्य का चयन करें',
        stateLabel: 'राज्य',
        stateModalTitle: 'एक राज्य का चयन करें',
        emptyState: 'इस बाजार और वस्तु संयोजन के लिए कोई डेटा नहीं मिला',
        pastLabel: 'पिछला',
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
            inappropriateStorage: 'अप्रयुक्त भंडारण / ठंडे भंडारण की कमी',
            overproduction: 'अधिक उत्पादन',
            transportationDamage: 'परिवहन क्षति',
            pest: 'कीट',
            diseases: 'बीमारियाँ',
            weather: 'अत्यधिक मौसम की स्थिति',
            price: 'बाजार की कीमतें बहुत कम',
            other: 'अन्य',
          },
          errorMessages: {
            reasonsForSpoilage: 'कृपया कम से कम एक कारण दर्ज करें।',
            number: 'एक गैर-शून्य, सकारात्मक संख्या होनी चाहिए',
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
        pricing: 'मूल्य निर्धारण',
        day: 'दिन',
        successMessage: 'क्रेट्स सफलतापूर्वक चेक इन किए गए',
        emptyMessage: 'कृपया अपने चेक इन में कम से कम एक क्रेट जोड़ें',
        noPlannedDaysMessage:
          'कुछ वस्तुओं पर नियोजित दिनों की कमी है। अनुमानित लागत की गणना नहीं कर सकते।',
        WithCode: {
          modalTitle: 'मौजूदा चेक आउट से नया चेक इन बनाएं',
          modalDescription:
            'इस तरह से नया चेक इन शुरू करने के लिए आपको चेक आउट कोड की आवश्यकता होगी। यदि आपके पास नहीं है, तो नया चेक इन शुरू करने पर विचार करें। यदि आप जानते हैं कि आप कितने दिनों तक भंडारण करने की योजना बना रहे हैं, तो यहां दिनों की संख्या जोड़ने पर विचार करें।',
          codeLabel: 'कोड जोड़ें',
          codeErrorMessage: 'कोड आवश्यक है',
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
          crateWeightLabel: 'क्रेट का सामान्य वजन',
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
          error: 'Phone already assigned. Try a different one',
          success: 'ऑपरेटर को सफलतापूर्वक आमंत्रित किया गया',
        },
        phoneFormat: 'फोन नंबर में कंट्री कोड ज़रूर होना चाहिए।',
      },
      EditOperator: {
        toasts: {
          success: 'परिचालक को सफलतापूर्वक संपादित किया गया',
        },
      },
      AddCoolingUser: {
        toasts: {
          add: 'किसान जोड़ें',
        },
      },
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
        actions: {
          save: 'सेव चंगेस',
        },
        toasts: {
          success: 'सफलतापूर्वक संपादित किया गया',
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
        toasts: {
          warning:
            'इस खाते को हटाया नहीं जा सकता क्योंकि प्रयोक्ता ने कूलिंग यूनिट(इकाइयों) {{names}} में सक्रिय चेक-इन किया है। कृपया उपयोगकर्ता को इन वस्तुओं को लेने के लिए कमरे में आने और खाता हटाने से पहले चेक-आउट पूरा करने के लिए सूचित करें!',
          confirmation:
            'क्या आप वाकई इस उपयोगकर्ता को कूलिंग उपयोगकर्ताओं की सूची से हटाना चाहते हैं? यह ऑपरेशन इस कूलिंग यूजर को हटा देगा और इसे वापस नहीं किया जा सकता है!',
          edit: 'कूलिंग उपयोगकर्ता को सफलतापूर्वक संपादित किया गया',
          noCoolingUnits: 'आपके पास अभी तक कोई प्रशीतलन इकई नही है',
          updateSuccess: 'सफलतापूर्वक उत्परिवर्तित',
        },
        pdf: {
          dateRange: 'तारीख की अबधि',
          selectedUnits: 'चयनित शीतलन कक्ष',
          coolingUnit: 'प्रशीतलन इकई',
        },
        actions: {
          downloadFarmers: "Download farmer's dashboard data",
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
          ubibot: {
            accountKey: 'खाता कुंजी',
            channelId: 'चैनल आईडी',
            sensorFieldTitle: 'अपना सेंसर क्षेत्र चुनें',
            sensorFieldDesc: 'केवल तापमान क्षेत्र समर्थित हैं',
            field: 'खेत',
          },
          figorr: {
            apiKey: 'API Key',
            deviceTag: 'Device Tag',
          },
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
          editPricing: 'Edit Pricing',
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
        },
      },
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
        fillMessage: 'कृपया {{crop}} के लिए बेस सर्वे भरें!',
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
        sendSMS: `{{companyName}} - {{movementType}} प्राप्ति:
          गतिविधि कोड: {{code}}
          फसलें: {{crops}}
          कुल वजन: {{weight}} किलोग्राम
          {{movementTypeForDate}}: {{date}}
          मूल्य: {{price}}
          द्वारा भुगतान: {{farmersName}}
          `,
        movementType: {
          checkOut: 'चेक आउट',
          checkIn: 'चेक इन',
          checkedOut: 'चेक आउट किया गया',
          checkedIn: 'चेक इन किया गया',
        },
      },
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
      operatorsTotal: 'कुल ऑपरेटरों की संख्या = {{amount}}',
      usersTotal: 'अलग-अलग ठंडक उपयोगकर्ताओं की कुल संख्या = {{amount}}',
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
        allBaselineSurveysCompleted: 'सभी आधारभूत सर्वेक्षण पूरे हो गए 🤝',
        allPostCheckoutSurveysCompleted: 'सभी पोस्ट-चेकआउट सर्वेक्षण पूरे हो गए 🤝',
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
          co2WithCooling: 'कूलिंग के साथ उत्पाद के प्रति किलोग्राम CO2e उत्सर्जित',
          co2WithoutCooling: 'कूलिंग के बिना उत्पाद के प्रति किलोग्राम CO2e उत्सर्जन',
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
          crates: 'पेटियाँ',
          kg: 'किलो',
          operations: 'संचालन',
          checkedIn: 'चेक इन',
          checkedOut: 'चेक आउट',
          checkedInCropDistribution: '🧺 चेक-इन फसल वितरण (पेटियाँ)',
          checkedInKgDistribution: '⚖️ चेक-इन फसल वितरण (किलो)',
          checkInCropDistribution: 'चेक-इन फसल वितरण',
          checkedOutCropDistribution: '🧺 चेक-आउट फसल वितरण (पेटियाँ)',
          checkedOutKgDistribution: '⚖️ चेक-आउट फसल वितरण (किलो)',
          checkOutCropDistribution: 'चेक-आउट फसल वितरण',
          co2: '💨 शीतलन के लिए CO2e उत्सर्जित',
          co2EmissionsLabel: 'CO2e उत्सर्जन (किलो)',
          co2DistributionLabel: 'CO2e फसल वितरण',
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
      survey: 'कृपया गतिविधि के लिए बाज़ार के बारे में सर्वेक्षण.',
      link: 'कृपया इसे पूरा करने के लिए यहां जाएं.',
      coolingUserSurvey:
        'आपने {{crop}} में चेक इन कर लिया है लेकिन आपने इस फसल के लिए सर्वेक्षण पूरा नहीं किया है।.',
      operatorSurvey:
        'आपने {{farmer}} के लिए {{crop}} में चेक इन कर लिया है लेकिन आपने इस फसल के लिए सर्वेक्षण पूरा नहीं किया है।.',
      pickup:
        'आपके टोकरे {{crop}} के टोकरी को जल्द से जल्द उठाया जाना चाहिए! (चेक-इन तिथि: {{checkIn}}, कूलिंग यूनिट आईडी: {{unitId}}, ପ୍ରବେଶ ପରିଚୟ ସଂଖ୍ୟା: {{movementCode}}).',
      notifyCoolingUser:
        'कृपया उपयोगकर्ता {{farmer}} को सूचित करें कि उसके {{crop}} के टोकरी को जल्द से जल्द उठाया जाना चाहिए! (चेक-इन तिथि: {{checkIn}}, कूलिंग यूनिट आईडी: {{unitId}}, ପ୍ରବେଶ ପରିଚୟ ସଂଖ୍ୟା: {{movementCode}}).',
      checkIn: 'Operator {{farmer}} has edited check-in {{movementCode}} on {{date}}.',
      surveyAlreadyFilled: 'सर्वेक्षण पहले ही भरा जा चुका है',
    },
  },
} satisfies Translations;
