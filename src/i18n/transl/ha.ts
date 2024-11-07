import { Translations } from './en';

export default {
  appVersion: {
    newVersion: 'A new version of Coldtivate is available!', // TODO
    pleaseUpdate: 'Please update app before continuing.', // TODO
  },
  languages: {
    current: 'Turanci',
    label: 'Harshe',
    options: {
      en: 'Turanci',
      hi: 'Hindi',
      or: 'Oriya',
      gu: 'Gujarati',
      fr: 'Faransanci',
      pt: 'Fotigal',
      ig: 'Igbo', // TODO
      yo: 'Yoruba', // TODO
      ha: 'Hausa', // TODO
    },
  },
  gender: { female: 'Mace', male: 'Namiji', other: 'Sauran' },
  navigation: {
    error: {
      errorMessage: 'Kash...kamar wani abu yayi kuskure.',
      tryAgainMessage: 'Da fatan za a sake gwadawa daga baya.',
    },
    auth: {
      SignIn: 'Shiga',
      SignUp: 'Shiga',
      ForgotPassword: 'Manta Kalmar wucewa',
      PasswordReset: 'Sake saiti',
      AppInfo: 'Bayanin Manhaja',
      Logout: 'Fita',
    },
    management: {
      Root: 'Gudanarwa',
      CompanyDetails: 'Bayanan Kamfanin',
      RevenueAnalysis: 'Binciken kudaden shiga',
      UsageAnalysis: 'Binciken Amfani',
      Locations: 'Wurare',
      AddLocation: 'Ƙara Wuri',
      EditLocation: 'Gyara Wuri',
      CoolingUnits: 'Sashin naúrar sanyayawa',
      DisabledCoolingUnitsDescription: 'Ƙara aƙalla wuri ɗaya.',
      CoolingUsers: 'Masu amfani da naúrar sanyayawa',
      AddCoolingUser: 'Ƙara mai amfani da naúrar sanyayawa',
      EditCoolingUser: 'Shirya Mai Amfani da naúrar sanyayawa',
      AddCoolingUnit: 'Ƙara Rukunin Sanyi',
      EditCoolingUnit: 'Gyara sashin naúrar sanyayawa',
      Operators: 'Masu aiki',
      AddOperator: 'Ƙara Mai aiki',
      EditOperator: 'Gyara Mai aiki',
      RegisteredEmployee: "Ma'aikaci mai rijista",
      AddRegisteredEmployee: "Ƙara Ma'aikacin Rijista",
      RegisteredEmployeeDetails: "Cikakkun Bayanan Ma'aikata",
      DeliveryContacts: 'Delivery Contacts', // TODO
      AddUserBankAccount: '{{user}} Bank Account', // TODO
    },
    bottomTabs: {
      RootMainTabStack: "{{firstName}}'s Coldtivate",
      ProduceDetails: '{{produceCode}}',
      MarketplaceSettings: 'Saitunan kasuwa',
      PriceTrend: 'Yanayin farashi',
      PriceRanking: 'Matsayin farashi',
      Planner: 'Mai tsarawa',
      RoomConditions: 'YANAYIN DAKI',
      CratesInfo: 'BAYANIN CRATES',
      Dashboard: 'Dashboard',
      History: 'Tarihi',
      MarketPrice: 'Farashin Kasuwa',
      CoolingUnits: 'Sashin naúrar sanyayawa',
      Analytics: 'Bincike',
      CheckIn: 'Rajistan shiga',
      CheckOut: 'Duba fita',
      Maps: 'TASWIRORI',
    },
    dashboard: {
      AccountDetails: 'Bayanan asusun',
      PersonalDetails: 'Bayanan sirri',
      LocalizationPreferences: 'Abubuwan zaɓin wuri',
      ContactsSharing: 'Raba lambobin sadarwa',
      Coupons: 'Coupons',
      CouponsActiveTab: 'Mai aiki',
      CouponsRevokedTab: 'soke',
      Marketplace: 'Kasuwa',
      MarketplaceFilters: 'Tace',
      MarketplaceAllTab: 'Duka',
      MarketplaceFavoritesTab: 'Abubuwan da aka fi so',
      Orders: 'Umarni',
      MyOrders: 'Umarnina',
      OrderDetails: '{{orderCode}}',
      KnowledgeHub: 'Cibiyar Ilimi',
      QuitTutorial: 'Bar koyarwa',
      FAQ: 'FAQ',
      About: 'Game da',
      Management: 'Gudanarwa',
      Tutorial: 'Koyarwa',
      PayoutOptions: 'Zaɓuɓɓukan biyan kuɗi',
      PaymentMethods: 'Hanyoyin biyan kuɗi',
      Wallet: 'Walat',
      Transactions: "Ma'amaloli",
      Transaction: '{{id}}',
      ShoppingCart: 'Shopping Cart', // TODO
    },
    checkIn: {
      SelectCropType: "Zaɓi nau'in amfanin gona",
      CheckIn: 'Rajistan shiga :',
      CropList: '{{cropType}}',
      CrateSetup: 'Rajistan shiga :',
      CrateWeightAndPricing: 'Crate nauyi da farashi',
    },
    about: {
      comsolAgreement: 'Yarjejeniyar Lasisi na Runtime COMSOL 6.0',
      userLicense: 'Yarjejeniyar Lasisin Mai Amfani',
      aboutComsol: 'Game da COMSOL',
      privacyPolicy: 'takardar kebanta',
    },
    history: {
      EditCheckIn: '{{code}}',
      MarketSurvey: 'Binciken kasuwa na {{farmer}}',
      BaseSurvey: 'Sanyaya binciken mai amfani',
    },
    analytics: { methodology: 'Hanya' },
  },
  actions: {
    error: 'An sami tangarda',
    cancel: 'Soke',
    confirm: 'Tabbatar',
    import: 'Shigo da',
    yes: 'Ee',
    no: "A'a",
    select: 'Zaɓi',
    close: 'Kusa',
    delete: 'Share',
    ok: 'To',
    all: 'Duka',
    none: 'Babu',
    next: 'Na gaba',
    back: 'Baya',
    search: 'Bincika...',
    or: 'ko',
    add: 'Ƙara',
    edit: 'Gyara',
    go: 'Tafi',
    done: 'Anyi',
    'not-available': 'Babu',
    'complete-later': 'Kammala daga baya',
    'update-success': 'Nasarar sabuntawa',
    'save-changes': 'Ajiye canje-canje',
    save: 'Ajiye',
    continue: 'Ci gaba',
    update: 'update', // TODO
  },
  components: {
    datePicker: {
      clearButtonLabel: 'Share',
      confirmButtonLabel: 'Tabbatar',
      placeholder: 'dd/mm/yy',
      startDateSelection: 'Zaɓi ranar farawa:',
      endDateSelection: 'Zaɓi ranar ƙarshe:',
    },
  },
  Auth: {
    welcomePopup:
      "Barka da zuwa Coldtivate! Idan manomi ne, ɗan kasuwa, ko kuma kuna sha'awar siyan kayan amfanin gona da aka adana a cikin dakuna masu sanyi, da fatan za a yi rajista ta danna kan 'Yi rijista azaman mai amfani ko mai siye'. Idan kuna aiki don kamfanin sanyaya, tuntuɓi alhakin ku don bincika ko kamfanin ku yana da rajista. Idan haka ne, alhakinku ya kamata ya aiko muku da gayyatar SMS don yin rajista a matsayin ma'aikaci mai rijista ko a matsayin mai aiki. Idan ba haka ba, zaku iya shiga kamfani, kuma kuyi rijista azaman ma'aikaci mai rijista. Da fatan za a duba sashin 'Bayanin App' don FAQs.",
    Root: {
      welcome: 'Barka da zuwa Coldtivate',
      signIn: 'Shiga',
      signUpCompany: 'Yi rajista azaman kamfani',
      signUpCoolingUser: 'Yi rajista azaman Mai amfani mai sanyaya ko mai siye',
      appInfo: 'Bayanin Manhaja',
    },
    SignIn: {
      heading: 'Shiga',
      accounts: {
        registeredEmployee: {
          label: "Ma'aikaci mai rijista",
          description:
            "Wani ɓangare na ƙungiyar kula da masu bada dakin sanyi. Ma'aikaci mai rijista zai iya yin rijistar kamfani a cikin app kuma ya gayyaci sauran ma'aikata su shiga. Ma'aikata masu rijista zasu iya shiga tare da imel ko lambar waya.",
        },
        operator: {
          label: 'Mai aiki',
          description:
            "Ma'aikaci a jiki yana halarta a dakin sanyi kuma yana gudanar da ayyukan shigansa, dubawa. Ma'aikata masu rijista na iya gayyatar masu aiki don shiga cikin kamfani. Masu aiki zasu iya shiga tare da lambar waya.",
        },
        coolingUser: {
          label: 'Mai amfani da abin sanyayawa',
          description:
            "Mai amfani da dakin sanyi da mabukaci. Manoma, ’yan kasuwa, ’yan kasuwa da ke da damar yin amfani da wayar salula za su iya shiga nan. Masu amfani da dakin sanyi ba tare da wayowin komai ba na iya samun damar bayanan app ta hanyar ziyartar dakin sanyi da yin mu'amala da mai aiki. Masu saye za su iya shiga nan don kammala sayayya.",
        },
        toasts: {
          login:
            'Sunan mai amfani ko kalmar sirri ba daidai ba ne. Da fatan za a tabbatar cewa kun zaɓi aikin mai amfani daidai',
          success: 'An yi nasarar shiga',
        },
      },
      form: {
        user: {
          placeholder: 'Imel/Lambar Waya',
          description: {
            default: 'Da fatan za a ba da lambar waya mai aiki (tare da lambar ƙasa).',
            registeredEmployee:
              'Da fatan za a ba da ingantaccen email/lambar waya (with country code).',
          },
          messages: {
            default: 'Ana buƙatar lambar waya.',
            registeredEmployee: 'Ana buƙatar adireshin imel ko lambar waya.',
          },
        },
        password: {
          placeholder: 'Boyayin kalmomin siri',
          messages: { required: 'Ana buƙatar kalmar sirri' },
        },
        actions: { logIn: 'Shiga' },
      },
    },
    SignUp: {
      select: { header: 'Zaɓi {{fieldName}}', label: 'Bincika...', cancel: 'Soke', ok: 'To' },
      welcome: 'Barka da zuwa Coldtivate',
      schema: {
        passwordError:
          'Kalmar sirrin ku tana buƙatar zama aƙalla tsawon haruffa 8, ya ƙunshi babban baƙaƙe ɗaya da ƙananan haruffa ɗaya, da lamba.',
        confirmPasswordError: 'Tabbatar da kalmar wucewa ya zama tilas.',
        passwordsMismatchError: 'Kalmomin sirri ba su daidaita ba.',
        countryError: 'Zaɓin ƙasa ya zama dole.',
        firstNameError: 'Sunan farko ya zama dole.',
        lastNameError: 'Sunan ƙarshe ya zama dole.',
        phoneError: 'Lambar waya wajibi ne.',
        invalidPhoneError: 'Lambar waya bata aiki',
        languageError: 'Harshe ya zama wajibi.',
        genderError: 'Zaɓin jinsi ya zama dole.',
        termsError: 'Kuna buƙatar yarda da Sharuɗɗan Amfani.',
        companyError: 'Sunan kamfani ya zama dole.',
        currencyError: 'Zaɓin kuɗin kuɗi ya zama tilas.',
        emailError: 'Imel ya zama dole.',
        malformedEmailError: 'Imel mara inganci.',
      },
      commonForm: {
        firstNameLabel: 'Sunan rana',
        lastNameLabel: 'Sunan mahaifa',
        phoneLabel: 'Lambar waya (tare da lambar ƙasa)',
        passwordLabel: 'Boyayin kalmomin siri',
        confirmPasswordLabel: 'tabbatar da kalmar sirri ta shiga',
        countryFieldName: 'Ƙasa',
        genderFieldName: 'Jinsi',
        terms:
          'Na yarda da Ƙaddamar Yarjejeniyar Lasisin Mai Amfani, Manufar Sirri da Sharuɗɗan Amfani COMSOL',
        submit: 'Shiga',
      },
      SignUpCompany: {
        companyHeader: 'Kamfanin Shiga',
        userHeader: "Ma'aikacin Rajista",
        companyNameLabel: 'Sunan Kamfanin',
        emailLabel: 'Email',
        currencyFieldName: 'Kudi',
        modal: {
          warning: 'Idan kayi rajista ba tare da waya wasu ayyuka ba zasu yi aiki ba:',
          reasons: { '1': 'Sake saitin asusu', '2': 'Karbar shaida ta hanyar sakon waya' },
          buttons: { continue: 'Ci gaba ko ta yaya', addPhone: 'Ƙara Waya' },
        },
      },
      SignUpCoolingUser: {
        header: 'Yi rajista azaman Mai amfani mai sanyaya ko mai siye',
        languageFieldName: 'Harshe',
      },
      toasts: {
        error:
          'Please ensure your details are accurate and try again. Note that one phone number and email can only be used by one account.', // TODO
      },
    },
    ForgotPassword: {
      heading: 'Manta Kalmar wucewa',
      messageSentNotification:
        'Idan lambar wayar ta wanzu, an aika sms don sake saita kalmar wucewa.',
      instructions:
        'Domin sake saita kalmar wucewar ku, da fatan za a shigar da lambar waya tare da lambar ƙasa, wacce aka haɗa asusun.',
      phoneInputLabel: 'Lambar waya',
      resetButton: 'Sake saiti',
      requestLimitMessage: 'Request limit reached. Try again in 2 hours.', // TODO
    },
    ResetPassword: {
      schema: {
        passwordError:
          'Kalmar sirrin ku tana buƙatar zama aƙalla tsawon haruffa 8, ya ƙunshi babban baƙaƙe ɗaya da ƙananan haruffa ɗaya, da lamba.',
        confirmPasswordError: 'Tabbatar da kalmar wucewa ya zama tilas.',
        passwordsMismatchError: 'Kalmomin sirri ba su daidaita ba.',
      },
      passwordLabel: 'Sabuwar kalmar sirri ta budewa',
      confirmPasswordLabel: 'tabbatar da kalmar sirri ta shiga',
      resetButton: 'Sake saiti',
    },
    Invite: {
      heading: 'Barka da zuwa Coldtivate',
      employee:
        "An gayyace ku a matsayin Ma'aikaci. Da fatan za a cika fom don kammala rajistar ku.",
      operator:
        'An gayyace ku a matsayin Mai gudanarwa. Da fatan za a cika fom don kammala rajistar ku.',
      fields: {
        password:
          'Ƙananan haruffa takwas, aƙalla babban harafi ɗaya, ƙaramin harafi ɗaya da lamba ɗaya.',
      },
    },
  },
  Dashboard: {
    TemperatureAlert: {
      title: 'faɗakarwar yanayin zafin',
      subtitle: "Mun lura akwai canji. Waɗannan su ne kayayyakin da ke a ma'ajiya a halin yanzu.",
      edit: 'Kuna so ku gyara yanayin zafi?',
      temperature: 'Yanayin zafi',
      newTemperature: 'Sabon yanayin zafi',
      confirm: 'Tabbatar da sabon yanayin zafin',
      continueWithoutUpdate: 'Ci gaba ba tare da sabuntawa ba',
      sensorHint:
        'Ba za a iya ƙara yanayin zafin ba saboda an haɗa firikwensin zuwa naúrar sanyaya.',
      latestTemperature: 'An yi rijistar sabon yanayin zafi a {{date}}.',
    },
    emptyGeneral: 'A halin yanzu, babu bayanai da ake samu.',
    emptyCoolingUser:
      "Abubuwan da ke cikin ma'ajiya za su bayyana a cikin dashboard lokacin da kuka yi rajista aƙalla ɗaya a kowane ɗaki.",
    noCompanyAvailable: 'Babu kamfani samuwa',
    noCoolingUnitAvailable: 'Babu naúrar sanyaya da akwai',
    noLocationsAvailable:
      'Barka da zuwa Coldtivate. Fara ta hanyar ƙara wurare zuwa manhajar ku a cikin kwamitin gudanarwa.',
    MarketPrice: {
      emptyState: 'Babu farashin kasuwa a cikin ƙasar ku',
      commodityLabel: 'Kaya',
      commodityModalTitle: 'Zaɓi kaya.',
      Trend: {
        title: 'Zaɓi kayayyaki da jiha don samun hasashen farashin',
        emptyState: 'Babu kwanan wata da aka samo don wannan kasuwa da haɗin kayayyaki',
        pastLabel: 'Baya',
        stateLabel: 'Jiha',
        stateModalTitle: 'Zaɓi jiha',
        forecastLabel: 'Hasashen',
        chartLabel: 'Farashin a {{currency}}/KG',
      },
      Ranking: {
        filter: 'Tace ta wurin',
        monthLabel: 'Watanni',
        monthModalTitle: 'Zaɓi watanni',
        stateModalTitle: 'Zaɓi jihohi',
        stateLabel: 'Jihohi',
        table: {
          column1: 'Jiha',
          column2: 'kwanan wata',
          column3: 'Farashin a {{currency}}/KG',
          emptyState: 'Babu darajar samuwa',
        },
      },
    },
    CrateManagement: {
      userModalTitle: 'Zaɓi mai amfani da abin sanyayawa:',
      addUserLink:
        'Mai amfani da naúrar sanyayawa ba a cikin tsarin sunaye? Ƙara mai amfani daga Gudanarwa ➜ Masu amfani da naúrar sanyayawa ➜ +',
      coolingUserLabel: 'Mai amfani da abin sanyayawa',
      selectCoolingUnitLabel: 'Zaɓi sashin sanyayawa',
      coolingUnitLabel: 'Sashin naúrar sanyayawa',
      noUnitWarning: 'Da fatan za a zaɓi sashin naúrar sanyayawa',
      noCratesWarning:
        'Zaɓaɓɓen mai amfani da abin sanyayawa ba shi da wani akwati a cikin wannan sashin naúrar sanyayawa',
      operationError: 'Wani abu ya faru. Da fatan za a sake gwadawa daga baya.',
      FarmerSurvey: {
        warningMessage: 'Da fatan za a cika tushen bincike na {{ crop}}!',
        modal: {
          weeklyQuantityQuestion:
            'Menene adadin {{crop}} da kuke samarwa ko kasuwanci a cikin mako guda?',
          cropSpoilageQuestion: 'Menene babban dalilin lalacewa amfanin gona?',
          marketPriceQuestion:
            'Matsakaicin farashin kasuwa a kowane mako lokacin siyar da {{crop}}',
          quantityDistributionQuestion: 'Nawa ne:',
          selfConsumed: 'Wanda aka yi amfani/aka ci ({{unit}})',
          sold: 'Wanda aka sayar ({{unit}})',
          lost: 'Batattu ko aka sayar a ƙasa da farashin kasuwa ({{unit}})',
          totalQuantity: 'Jimillar adadin da aka samar a cikin mako guda',
          unitWeight: 'Kowane {{crate}} shine',
          selectSpoilageReasonsPlaceholder: 'Zaɓi duk dalilan da suka shafi',
          priceLabel: 'Farashin',
          priceUnit: 'kowace {{unit}}',
          commodityShortlist: 'Jerin sunayen Kayayyaki',
          unit: {
            kg: 'kg',
            crates: 'crates',
            boxes: 'Kwalaye',
            sacks: 'Buhuwa',
            baskets: 'Kwanduna',
            singular: {
              kg: 'kg',
              crates: 'Crate',
              boxes: 'akwati',
              sacks: 'buhu',
              baskets: 'kwando',
            },
          },
          reasonsForLoss: {
            improperHarvest: 'Girbi ko kulawa mara kyau',
            inappropriateStorage: "Ma'ajiyar da ba ta dace ba / rashin tsohuwar ajiya",
            overproduction: 'Yawan samarwa',
            transportationDamage: 'Lalacewar sufuri',
            pest: 'Kwari',
            diseases: 'Cututtuka',
            weather: 'Matsanancin yanayi',
            price: 'Farashin kasuwa yayi ƙasa sosai',
            other: 'Sauran',
          },
          errorMessages: {
            number: 'Dole ne ya zama mara mara amfani, tabbataccen lamba',
            reasonsForSpoilage: 'Da fatan za a gabatar da aƙalla dalili ɗaya.',
            totalMismatch:
              'Jimlar abin da ake ci, wanda aka sayar da wanda aka rasa ko aka sayar a ƙasa da farashin kasuwa ya kamata ya zama daidai da jimillar adadin da aka samar.',
            cropError: 'Da fatan za a zaɓi kaya',
          },
        },
      },
      CheckOut: {
        selectCrateMessage: 'Zaɓi crates da kuke son cirewa',
        selectAll: 'Zaɓi duka',
        checkIn: 'Rajistan shiga :',
        days: 'kwanaki',
        day: 'rana',
        daysLeft: '{{amount}} kwanakin da suka rage',
        ttp: 'TTP',
        numberOfCrates: 'Yawan crates',
        totalWeight: 'Jimillar nauyi',
        priceType: "Nau'in farashi",
        crate: 'Crate',
        pricePerProduct: 'Farashin kowane abin da aka samar',
        calculatedPrice: 'Farashin ƙididdiga',
        discount: 'Rangwame',
        priceWithDiscount: 'Jimillar farashi',
        paymentType: {
          label: "Nau'in Biyan Kuɗi",
          cash: 'Kuɗi',
          creditCard: 'Katin biya/cira kudi',
          bankTransfer: 'Bank Transfer', // TODO
        },
        bankTransfer: {
          title: "Receiver's Details", // TODO
          accountName: 'Account Name', // TODO
          accountNumber: 'Account Number', // TODO
          bankName: 'Bank Name', // TODO
        },
        paid: 'An biya',
      },
      CheckIn: {
        emptyState: 'Har yanzu ba a saka akwatuna ba',
        addCrates: 'Ƙara Crates',
        cratesAddedLabel: 'Crates Added', // TODO
        checkInWithCode: 'Shiga tare da lamba',
        estimatedCost: 'Ƙimar Kuɗi',
        pricing: 'Tayin farashi',
        day: 'rana',
        successMessage: 'An yi nasarar shiga cikin akwatuna',
        emptyMessage: 'Da fatan za a ƙara aƙalla akwati ɗaya a cikin rajistan shiga ku',
        noPlannedDaysMessage:
          'Rasa kwanakin da aka tsara akan wasu abubuwa. Ba za a iya ƙididdige ƙididdigan farashi ba.',
        seeMore: 'See more', // TODO
        seeLess: 'See less', // TODO
        listed: 'Listed', // TODO
        WithCode: {
          modalTitle: 'Ƙirƙiri Duba Shiga daga Dubawa na yanzu',
          modalDescription:
            "Kuna buƙatar lambar rajistan shiga don fara sabon rajistan shiga ta wannan hanyar. Idan ba ku da shi, yi la'akari da fara sabon rajistan shiga. Idan kun san tsawon lokacin da kuke shirin adanawa, la'akari da ƙara adadin kwanakin nan.",
          codeLabel: 'Ƙara lamba',
          codeErrorMessage: 'Ana buƙatar lamba',
          failedMessage:
            "Check in failed. Please make sure your code hasn't been used already or contact support.", // TODO
        },
        SelectCropType: {
          fruits: "Ya'yan itãcen marmari",
          vegetables: 'Kayan lambu',
          rootVegetables: 'Tushen Kayan lambu',
          other: 'Sauran Abubuwan',
        },
        SelectCrop: { additionalInfo: 'Ƙarin Bayani' },
        Setup: {
          selectedCrop: 'Amfanin gona da aka zaɓa',
          changeCropButton: 'Danna nan don canza amfanin gona',
          individualCrateWeightButton: 'Danna nan don gyara nauyin crate ɗaya',
          individualCrateIdButton: 'Danna nan don gyara ID na akwatuna ɗaya',
          numberOfCratesLabel: 'Yawan crates',
          crateWeightLabel: 'Janar nauyi na akwati',
          pricePerDayAndCrateLabel: 'Farashin kowace rana / akwati',
          pricePerDayAndKilogramLabel: 'Farashin kowace rana / kg',
          fixedPriceLabel: 'Kafaffen Farashi',
          totalPriceLabel: 'Jimillar farashi',
          plannedDaysLabel: 'Kwanakin ajiya',
          harvestDateLabel: 'An girbe wannan amfanin gona...',
          harvestDateValues: {
            today: 'Yau',
            yesterday: 'Jiya',
            dayBefore: 'Kwanaki biyu baya',
            evenBefore: 'Tun kafin haka',
          },
          crateWeightAndPricing: {
            applyAll: 'Apply to all', // TODO
            list: 'List for sale', // TODO
            addMore: 'Add more', // TODO
            sellingPrice: 'Listing selling price', // TODO
            potentialSellingPrice: 'Potential selling value', // TODO
            info: 'The price configuration refers to product sale, not cooling storage fee.', // TODO
          },
          cratesError: 'Da fatan za a saka lambar kwano tabbatacce',
          crateWeightError: "Da fatan za a saka ma'auni mai inganci",
          harvestDateError: 'Ana buƙatar ranar girbi',
          modals: {
            weight: 'Saita Nauyin ɗaya na Crates',
            id: 'Saita ID na Mutum na Crates',
            crateLabel: 'Crate',
            selectInitialId: 'Da fatan za a saita ID na akwatin farawa',
            serialize: 'Serialize',
          },
        },
      },
    },
    CoolingUnitsPlanner: {
      SelectCoolingUnit: {
        label: 'Sashin naúrar sanyayawa: {{name}}',
        header: 'Zaɓi sashin sanyayawa',
      },
      occupancy: 'Mamallakin sashin naúrar sanyayawa ta ke a halin yanzu',
      week: 'A wannan makon',
      today: 'Yau',
    },
    CoolingUnitsRoomConditions: {
      heading: 'Tarihin yanayin zafi',
      temperature: 'Yanayin zafi',
      lastUpdated: 'An sabunta ta ƙarshe a {{date}}',
      enterTemperature: 'Shigar da yanayin zafin',
      toasts: { confirmation: 'An canza yanayin zafi daidai' },
    },
    CoolingUnitsCratesInfo: {
      commodity: 'Kaya',
      percentage: 'Kashi',
      weight: 'Nauyi',
      crates: 'crates',
      optimalTemp: 'Mafi kyawun T°C',
      messages: {
        empty:
          'Zaman sashin naúrar sanyayawa da yanayin zafi zai bayyana a nan lokacin da kuka yi aƙalla rajista ɗaya a kowane ɗaki.',
      },
    },
    CoolingUnitsMaps: {
      singleCommodity: 'Dakin kaya guda ɗaya: {{crop}}',
      multiCommodity: 'Dakin kaya da yawa',
      publicMaker: "Sashin naúrar sanyayawa na jama'a",
      usedMarker: 'Naúrar sanyayawa da kuka riga kuka yi amfani da ita',
    },
    Company: { SelectCompany: { label: 'Sunan Kamfanin: {{name}}', header: 'Zaɓi kamfani' } },
    ProduceDetails: {
      seeDetails: 'Duba cikakkun bayanai',
      kilogram: 'kg',
      coolingUser: 'Mai amfani da abin sanyayawa',
      contact: 'Tuntuɓar',
      contactCopied: 'Kwafi!',
      crates: 'crates',
      crate: 'Crate',
      cropType: "Nau'in amfanin gona",
      numberOfCrates: 'Yawan crates',
      crateIds: 'Crate ID',
      combinedWeight: 'Haɗin nauyi',
      remainingTime: 'Lokacin da yayi saura a dauki',
      currentStorageDays: 'Kwanakin ajiya na yanzu',
      plannedDays: 'Kwanakin da aka tsara',
      pricePerDay: 'Farashin / rana',
      plannedStorageCost: 'Kudin ajiya da aka tsara',
      pickUp: 'Dauka cikin',
      days: 'kwanaki',
      noDTMessage: 'Babu samfurin shiryayyen-rayuwa don wannan kayan masarufi.',
      checkOutButton: 'Duba fita',
      cratesListedForSale: '{{amount}} crate(s) marked as listed for sale', // TODO
      preSaleErrorOperator:
        'Something went wrong. Please make sure the user has a valid Paystack account or contact support.', // TODO
      preSaleErrorUser:
        'Something went wrong. Please make sure you have a valid Paystack account or contact support.', // TODO
      operatorNoBankAccountWarning:
        "{{name}} doesn't have bank account details in order to receive payouts for their sales. Please add their Bank Account details in case they shared those with you.", // TODO
      farmerNoBankAccountWarning:
        "You don't have a Bank Account defined to receive payouts on your sales. Please add your Bank Account details", // TODO
      operatorNoCompanyBankAccount:
        "This cooling unit doesn't support marketplace listings. Please reach out to the company's manager to handle this matter.", // TODO
      employeeNoBankAccount:
        "This company doesn't have a Payouts Bank Account set up that enables receiving funds for both produces and cooling fees sold in the marketplace. Set it up to allow crates in your cooling units to be listed in the marketplace.", // TODO
      addBankAccountButton: 'Add bank account details', // TODO
      addBankAccountHeader:
        "You're setting up the bank account details on behalf of {{name}}. Please insert this data carefully as you'll not be able to make changes to it afterwards.", // TODO
    },
    SearchFilter: {
      detailsMessage:
        "Nemo rajista ta amfani da nau'in amfanin gona, sunan manomi, kwanakin da ake ajiya, kwanakin da suka rage a wurin ajiya, ko lambar rajista",
      idMessage:
        'Nemo akwati ta amfani da lambar ID da ake amfani da ita don gano takamaiman akwati',
      crateDetailsButton: 'Bincika Cikakkun Abubuwan Crate',
      crateIdButton: 'Nemo ID Crate',
      searchLabel: 'Bincika...',
    },
    SortMenu: {
      title: 'Jerantawa ta',
      options: {
        cropType: "Nau'in amfanin gona",
        timeToPick: 'Lokacin ɗauka',
        checkInDate: 'kwanan watan duba shiga (na farko zuwa na baya)',
        checkInDateReverse: 'kwanan watan duba shiga (na baya zuwa farko)',
        coolingUser: 'Sunan mai amfani da naurar sanyayawa',
      },
    },
    Management: {
      Delivery: {
        companyName: 'Company name', // TODO
        companyNamePlaceholder: 'Insert company name', // TODO
        companyNameError: 'Please insert the company name', // TODO
        contactName: 'Contact name', // TODO
        contactNamePlaceholder: 'Insert contact name', // TODO
        contactNameError: 'Please insert the contact name', // TODO
        phoneNumber: 'Phone number', // TODO
        phoneNumberPlaceholder: 'Insert phone number', // TODO
        emptyMessage: 'No contacts have been added yet', // TODO
        deleteContactMessage: 'Are you sure you want to delete this contact?', // TODO
        noAvailableContacts: 'There are no available contacts for this particular cooling unit.', // TODO
        contactedAddedSuccessfully: 'Contact added successfully.', // TODO
      },
      Location: {
        emptyState: 'Har yanzu ba a ƙara wasu wurare ba. Danna alamar + don ƙara ɗaya.',
        text: {
          invited: 'An gayyata ({{amount}})',
          registered: 'Wanda ke da Rajista ({{amount}})',
        },
        chips: {
          address: 'Adireshi',
          coordinates: 'Daidaitawa',
          geolocation: 'Wurin zama na waya',
        },
        fieldErrorMessages: {
          latitude: 'Enter a number between -90 and 90 (e.g., 34.0522)', // TODO
          longitude: 'Enter a number between -180 and 180 (e.g., -118.2437)', // TODO
        },
        fields: {
          name: 'Suna',
          latitude: 'Latitude',
          longitude: 'Longitude',
          country: 'Ƙasa',
          state: 'Jiha',
          city: 'Gari',
          zipCode: 'Lambar gidan waya',
          street: 'Titin',
          streetNumber: 'Lambar titi',
        },
        modal: {
          message:
            "Wannan aikin zai share duk na'urorin sanyayawa da ke da alaƙa da wannan wurin. Kuna so ku ci gaba?",
        },
        actions: { currentLocation: 'Zaɓi wurin yanzu' },
        toasts: {
          addLocationSuccess: 'An yi nasarar ƙara wurin',
          editLocationSuccess: 'An yi nasarar gyara wurin',
          removeLocationSuccess: 'An yi nasarar goge wurin {{name}}.',
          failedToFetchLocation:
            'Unable to retrieve the location. Please check the address and try again.', // TODO
          positionCancelled: 'Location request canceled.', // TODO
          positionUnauthorized: 'Location denied. Please grant permission to continue.', // TODO
          locationUnavailable: 'Location disabled. Please enable to continue.', // TODO
          locationSubmissionError: 'An error occurred. Please review your location and try again.', // TODO
        },
      },
      Operators: {
        banner:
          'Bayan ƙara mai amfani, za su samu sako tare da hanyar haɗin gayyata, inda za su iya kunna asusun su.',
        text: { gender: 'Jinsi', ma: 'Namiji', fe: 'Mace', ot: 'Sauran' },
        fields: {
          selectCoolingUnit: 'Zaɓi sashin sanyayawa',
          coolingUnits: 'Sashin naúrar sanyayawa',
        },
        actions: { invite: 'Gayyata', save: 'Ajiye canje-canje' },
      },
      AddOperator: {
        messages: {
          operator: "Don shiga cikin manhajar Coldtivate a matsayin ma'aikaci, je: zuwa: {{link}}",
        },
        toasts: {
          success: "An gayyace ma'aikaci cikin nasara",
        },
        phoneFormat: 'Tabbatar lambar wayar da aka shigar tana da lambar ƙasa.',
      },
      EditOperator: { toasts: { success: 'An yi nasarar gyara mai aiki' } },
      AddCoolingUser: { toasts: { add: 'Ƙara mai amfani da naúrar sanyayawa' } },
      CompanyDetails: {
        labels: {
          name: 'Suna',
          uploadLogo: 'Daura tambari',
          logo: 'Logo',
          country: 'Ƙasa',
          commodity: 'Jerin sunayen Kayayyaki',
          currency: 'Kudi',
        },
        headings: { country: 'Zaɓi ƙasa', commodity: 'Zaɓi kaya.', currency: 'Zaɓi kuɗi' },
        actions: { save: 'Ajiye canje-canje' },
        toasts: {
          success: 'Anyi nasarar gyarawa',
          photoLibrary: 'Permission Denied: Please enable access to your Photo Library.', // TODO
        },
      },
      RegisteredEmployee: {
        invited: 'An gayyata ({{amount}})',
        registered: 'Wanda ke da Rajista ({{amount}})',
      },
      RegisteredEmployeeDetails: {
        deletePersonal: 'Don share asusun ku, je zuwa Bayanan Asusu.',
        deleteOther: 'Idan kuna son share wannan asusun, tuntuɓi  {{contact}}',
      },
      AddRegisteredEmployee: {
        message:
          "Don shiga cikin manhajar Coldtivate a matsayin Ma'aikaci mai rijista, je zuwa: {{link}}",
        toasts: { success: "Anyi nasarar gayyatar ma'aikaci mai rijista" },
      },
      CoolingUsers: {
        modals: {
          selectMethod: 'Ta yaya kuke son ƙara mai amfani?',
          userCode: 'Shigar da lambar mai amfani',
          userCodeDesc:
            'Kuna iya nemo lambar a cikin cikakkun bayanan asusunku idan kun yi rajista azaman mai amfani da naúrar sanyayawa.',
          addByCode: 'Ƙara mai amfani ta lamba',
          addWithDetails: 'Ƙara mai amfani tare da cikakkun bayanai',
        },
        toasts: {
          notFound: 'Ba a sami mai amfani da naúrar sanyayawa mai wannan lambar ba.',
          taken:
            'Wannan mai amfani ya riga ya kasance cikin jerin masu amfani da naúrar sanyayawa.',
        },
      },
      EditCoolingUsers: {
        toasts: {
          warning:
            'Ba za a iya share wannan asusun ba saboda mai amfani yana da rajistan shiga mai aiki a cikin naúrar sanyayawa {{name}}. Da fatan za a sanar da mai amfani don zuwa ɗakin don ɗaukar waɗannan abubuwan kuma ya kammala rajistan shiga kafin share asusun!',
          confirmation:
            'Shin kun tabbata kuna son share wannan mai amfani daga jerin masu amfani da sanyaya? Wannan aikin zai share wannan mai amfani da naúrar sanyayawa kuma ba za a iya juya shi ba!',
          edit: 'An yi nasarar gyara mai amfani mai da naúrar sanyayawa',
          noCoolingUnits: 'Ba ku da sashin naúrar sanyayawa tukuna',
          updateSuccess: 'Anyi nasarar sabunta',
        },
        pdf: {
          dateRange: 'Iyakar kwanan wata',
          selectedUnits: 'Zaɓaɓɓen sashin sanyayawa',
          coolingUnit: 'Sashin naúrar sanyayawa',
        },
        actions: {
          downloadFarmers: 'Zazzage bayanan dashboard na manomi',
          completeLater: 'Kammala daga baya',
        },
      },
      CoolingUnit: {
        emptyState:
          "Babu raka'a mai sanyaya da aka saka a wannan wurin. Danna alamar + don ƙara ɗaya.",
      },
      AddCoolingUnit: {
        heading: 'Sashin abubuwan naúrar sanyayawa',
        fields: {
          name: 'ID na sashin naúrar sanyayawa',
          location: 'Wuri',
          coolingUnitType: 'Menene ya siffanta sashin naúrar sanyayawa sosai?',
          metricUnit: 'Sashin',
          price: 'Farashin',
          capacityInMetricTons: 'Jimillar girman fanko',
          foodCapacityInMetricTons: 'Makurar yawan adadin abinci',
          roomSizeHeading: 'Girman sashin sanyayawa',
          length: 'Tsayi',
          width: 'Faɗi',
          height: 'Zurfi',
          weight: 'Nauyi',
          roomInsulator: 'Insulator',
          capacityInNumberCrates: 'Makurar yawan adadin crates',
          crateWeight: 'Daidaitaccen girman crate',
          crateSizeHeading: 'Girman daidaitaccen akwati',
          editableCheckins: 'Sanya rajistan shiga ta masu aiki zasu iya gyarawa',
          sensorAvailable: 'Firikwensin da ke akwai',
          public:
            "Kuna son sanya na'urar sanyayawar ku ganuwa ga masu amfani da naúrar sanyayawa (location,type of room,capacity and price information)?",
          crops: 'Kayayyaki',
          selectCrops: 'Zaɓi kayayyaki',
          refrigerantType: "Nau'in firji da aka yi amfani da shi",
          amountRefrigerant: 'Adadin firiji',
          powerConsumptionInMt: 'Amfanin wutar lantarki na sashin sanyayawa kowace MT',
          dailyRoomWattage: 'Wuta na yau da kullun na ɗakin',
          powerSource: 'Yaya ake kunna sashin sanyayawar?',
          powerSourceDieselConsumptionKwh: 'Amfanin dizal na janareta a kowace kWh',
          pvPanelType: "Nau'in bangarori na PV",
          pvPanelCount: 'Adadin bangarorin PV',
          pvPanelSize: 'Girman bangare guda ɗaya',
          pvPanelWeight: 'Nauyin  bangare guda ɗaya',
          pvPanelMaxPower: 'Matsakaicin karfi na bangare guda ɗaya',
          powerSourceDieselPercent: 'Janareta Diesel',
          powerSourceGridPercent: 'Grid',
          powerSourcePvPercent: 'Bangarorin PV',
          powerSourceBiomassPercent: 'Biomass',
          electricityStorageSystem: 'Tsarin ajiyar wutar lantarki',
          thermalStorageMethod: 'Hanyar ajiya ta zafi',
          batteryCount: 'Yawan batura',
          batteryWeight: 'Girman baturi',
          batteryCapacity: 'Iyawar baturi daya',
          batteryMaxCurrent: 'Matsakaicin caji na baturi ɗaya',
          batteryPeakEnergyStorage: "Ma'ajiyar makamashi a matakin kololuwar baturi daya",
          batteryType: "Nau'in batura",
          selectSensorType: "Zaɓi nau'in firikwensin",
          addTempSensor: 'Ƙara firikwensin yanayin zafi zuwa sashin naúrar sanyayawar ku.',
          sensorDesc: {
            default: 'Nemi wannan bayanin daga mai bada firikwensin ku idan babu a hannu.',
            ubibot: 'Nemo waɗannan bayanan a cikin asusun ku na ubibot.',
          },
          ecozen: {
            username: 'Sunan mai amfani',
            password: 'Boyayin kalmomin siri',
            machineId: 'ID na inji',
          },
          ubibot: {
            accountKey: 'Mabudin Asusu',
            channelId: 'ID magudanar',
            sensorFieldTitle: 'Zaɓi filin firikwensin ku',
            sensorFieldDesc: 'Zaɓi filin firikwensin ku',
            field: 'Filin',
          },
          figorr: { apiKey: 'Maɓallin API', deviceTag: "Tag na na'ura" },
        },
        coolingUnitTypes: {
          FARM_GATE_STORAGE_ROOM: 'Dakin ajiya ne da ke a kofar gona',
          MARKET_STORAGE_ROOM: 'Dakin ajiya ne da ke a kasuwa',
          MOVABLE_UNIT: 'Naúrar ce mai motsi (misali, babbar mota mai firiji)',
          OTHER: 'Sauran',
        },
        pricing: {
          label: "Nau'in farashi",
          PERIODICITY: 'A rana',
          FIXED: 'Kafaffen',
          day: 'rana',
        },
        metricUnit: { label: 'Sashin', KILOGRAMS: 'kg', CRATES: 'Crate' },
        toasts: {
          addSuccess: 'Nasarar ƙara sashin naúrar sanyayawa',
          integrationError:
            'An kasa haɗawa da firikwensin. Tabbatar da bayanan ku ko tuntuɓi mai ba da firikwensin ku.',
          integrationSuccess: 'Nasarar tantance bayanan firikwensin.',
        },
      },
      EditCoolingUnit: {
        modal: {
          askDelete:
            'Wannan aikin zai share wannan sashin sanyayawa ciki har da tarihin sa. Kuna so ku ci gaba?',
        },
        buttons: { viewExisting: 'Duba wanda ke akwai', editPricing: 'Gyara Farashin' },
        toasts: {
          editSuccess: "Nasarar gyara sashin na'urar sanyayawa",
          cantDelete: 'Ba za a iya share wannan naúrar sanyayawa ba saboda tana da rajistan shiga.',
          successDelete: 'An yi nasarar goge sashin sanyayawa {{name}}',
        },
      },
      UsageAnalysis: {
        dateSelectionLabel: 'Zaɓi kwanaki:',
        empty:
          'duba-shiga ko duba-fita za su bayyana a cikin dashboard lokacin da kuka yi aƙalla duba-shiga ɗaya a kowane ɗaki.',
        downloadDataButton: 'Sauke bayanai',
        modal: { title: 'Saita tsari', coolingUnitSelection: 'Zaɓi naúrar sanyaya:' },
        summary: {
          totalCheckIns: 'Jimillar adadin rajistan shiga:',
          totalCrates: 'Jimillar adadin crates',
          totalWeight: 'Jimillar nauyi',
          totalUsers: 'Jimillar adadin masu amfani:',
          weightUnit: 'kg',
        },
      },
      RevenueAnalysis: {
        summary: { total: 'Jimillar kudaden shiga' },
        paymentType: {
          label: 'Zaɓi hanyoyin biyan kuɗi:',
          cash: 'Kuɗi',
          creditCard: 'Katin biya/cira kudi',
          bankTransfer: 'Bank Transfer', // TODO
        },
      },
      Coupons: {
        emptyMessage: 'Babu takardun shaida da aka kara har yanzu',
        addCoupon: 'Ƙara Coupon',
        code: 'Lambar kuɗi',
        percentage: 'Kashi na kwafin',
        revokeTitle: 'Shawarwarin Kuɗi',
        revoke: 'Revoke', // TODO
        revokeMessage:
          'Shin kun tabbata kuna son soke wannan takardar kuɗi? Da zarar an soke, ba za a iya sake amfani da shi ba kuma ba za a ƙara samun rangwamen ba. Wannan aikin na dindindin ne kuma ba za a iya soke shi ba.',
      },
    },
    Marketplace: {
      buyerSelection: {
        onBehalfOfCompany: 'Buy on behalf of company', // TODO
        forMyself: 'Buy for myself', // TODO
        label: 'Buyer', // TODO
      },
      sorting: {
        'price-asc': 'Price ascending', // TODO
        'price-desc': 'Price descending', // TODO
        'nearby-me': 'Near to me', // TODO
      },
      distance: {
        withing5Km: '1 to 5 KM away', // TODO
        within10Km: '5 to 10 KM away', // TODO
        within25Km: '10 to 25 KM away', // TODO
        beyond25Km: 'More than 25 KM away', // TODO
      },
      priceConfig: 'The price configuration refers to product sale, not cooling storage fee.', // TODO
      addToCart: {
        addToCartButton: 'Add to cart and continue shopping', // TODO
        buyFullCrate: 'Buy full crate', // TODO
        selectQuantity: 'Select quantity', // TODO
      },
      currentLocation: 'Current location', // TODO
      filterError:
        'Something went wrong. Please check for typos and make sure the entered city is located in Nigeria.', // TODO
      standardCrateWeight: 'Standard weight of crate is {{value}} kg', // TODO
      owner: 'Owner', // TODO
    },
    AccountDetails: {
      popups: {
        default: 'Shin kun tabbata cewa kuna son share asusun ku?',
        lastRegisteredEmployee:
          "Kai ne kawai Ma'aikaci mai rijista a cikin kamfanin, wannan aikin zai share kamfanin!",
        activeCheckInOP:
          "Naúrar sanyayawa {{name}} da aka sanya ka tana da rajistan shiga aiki kuma kai ne mai aiki na ƙarshe a ciki. Kuna buƙatar bincika duk samfuran ko sanar da Ma'aikacin Rajista don sanya ma'aikaci na daban zuwa wannan sashin sanyayawa kafin ku iya share asusunku!",
        activeCheckInRE:
          "Ba za ku iya share asusun ku ba idan kun kasance Ma'aikata na Ƙarshe mai Rajista kuma akwai masu shiga tsakani a kan wasu rukunin sanyayawa, saboda wannan aikin zai share kamfanin ku. Da fatan za a tabbatar an fara fara fara bincikar duk rajistan shiga cikin naúrorin sanyayawa {{names}}.",
        activeCheckInCU:
          'Ba za ku iya share asusunku ba saboda kuna da masu shiga tsakani a cikin naúrorin sanyayawa {{names}}. Da fatan za a fara duba waɗannan abubuwan, sannan a sake gwadawa don share asusunku!',
      },
      fields: { location: 'Wuri', userCode: 'Lambar Shigo Mai Amfani' },
      toasts: { success: 'An yi nasarar sabunta mai amfani' },
      sections: {
        sellerSettings: 'Saitunan mai siyarwa',
        buyerSettings: 'Saitunan siye',
        details: 'Cikakkun bayanai',
        companySellerSettings: 'Seller Settings (Company)', // TODO
      },
      ContactsSharing: {
        publicPhone: "Sanya lambar waya ga jama'a",
        publicEmail: "Yi imel ɗin jama'a",
      },
      PayoutSettings: {
        addTitle: 'Da fatan za a saka bayanan asusun bankin ku',
        editTitle: 'Bayanin asusun ajiyar ku na banki',
        addTittleForCompany: "Please insert you company's bank account information", // TODO
        editTitleForCompany: "Your company's bank account information", // TODO
        form: {
          nameLabel: 'Account name', // TODO
          namePlaceholder: 'Insert account name', // TODO
          accountNumberLabel: 'Lambar akant',
          accountNumberPlaceholder: 'Saka lambar asusun',
          bank: 'Bank', // TODO
          countryLabel: 'Country', // TODO
          nigeria: 'Nigeria', // TODO
          selectBank: 'Select bank from list', // TODO
          accountType: 'Account Type', // TODO
          selectAccountType: 'Select account type', // TODO
          accountTypes: {
            personal: 'Personal', // TODO
            business: 'Business', // TODO
          },
          errors: {
            accountName: 'Account name is required', // TODO
            accountType: 'Account type is required', // TODO
            account: 'Ana buƙatar lambar asusun',
            bank: 'Ana buƙatar sunan banki',
          },
        },
        successMessage: 'An ƙara asusun banki cikin nasara.',
        errorMessage: 'Wani abu ya faru. Da fatan za a sake gwadawa daga baya.',
      },
      PaymentSettings: {
        cards: 'Katuna',
        creditCard: {
          predefined: 'An riga an ƙayyade',
          owner: 'Sunan Mai Rike Kati',
          date: 'Ranar Karewa',
          cvv: 'CVV',
        },
        AddCreditCard: {
          title: 'Da fatan za a saka bayanin katin ku',
          form: {
            cardName: 'Sunan katin',
            cardNamePlaceholder: 'Saka sunan katin',
            cardNumber: 'Lambar kati',
            cardNumberPlaceholder: 'Saka lambar katin',
            expiryDate: 'Ranar ƙarewa',
            securityCode: 'Lambar tsaro',
            securityCodePlaceholder: 'Saka lambar tsaro na katin',
            predefinedMethod: 'Hanyar biyan kuɗi da aka ƙayyade',
            successMessage: 'An ƙara katin cikin nasara',
            cardNameError: 'Ana buƙatar sunan katin',
            cardNumberError: 'Ana buƙatar lambar kati',
            securityCodeError: 'Ana buƙatar lambar tsaro',
          },
        },
      },
    },
    About: {
      runtimeAgree: 'Yarjejeniyar Runtime Comsol',
      userLicense: 'Yarjejeniyar Lasisin Mai Amfani',
      privacyPolicy: 'takardar kebanta',
      comsolAbout: 'Game da Comsol',
    },
    KnowledgeHub: {
      comic: 'Tafiyar manomi: Tafiya mai ban dariya',
      cooling: 'Menene Sanyayawa-kamar-a-Hidima?',
      quality: 'Yadda ake haɓaka ingancin amfanin gona',
      optimal: 'Mafi kyawun yanayin ajiya a cikin ɗakunan sanyi na kayayyaki masu yawa',
      table: 'Tushen ajiya na amfanin gona',
      sensors: "Na'urori masu auna zafin jiki da samfurin Lokaci-zuwa-ɗaukarwa",
      tips: 'Nasihu don dubawa a cikin akwatuna',
      glitches: 'Yadda za a amsa ga glitches na fasaha a cikin dakin sanyi',
      source: "Tushen: da fatan za a koma zuwa littafin Ma'aikata don ƙarin bayani:",
      clickHere: 'Danna nan',
    },
    History: {
      priceLabel: 'Farashin',
      empty:
        'duba-shiga ko duba-fita za su bayyana a cikin dashboard lokacin da kuka yi aƙalla duba-shiga ɗaya a kowane ɗaki.',
      sortMenuOptions: {
        cropType: "Nau'in amfanin gona",
        movementDate: 'Kwanan motsi (na farko zuwa na baya)',
        movementDateReverse: 'Kwanan motsi (na baya zuwa farko)',
        checkInFirst: 'duba shigar farko',
        checkOutFirst: 'Duba farko',
        coolingUser: 'Sunan mai amfani da naurar sanyayawa',
      },
      optionsMenu: {
        common: { pdfReceipt: 'Sauke takardar sheda pdf' },
        checkOut: {
          seeDetails: 'Duba cikakkun bayanai',
          smsReceipt: 'Sauke takardar sheda ta sako',
          marketSurvey: 'Cika binciken kasuwa',
        },
        checkIn: { edit: 'Gyara rajistan shiga' },
      },
      detailsModal: {
        operatorNameLabel: 'Duba fita sunan mai aiki',
        operatorNumberLabel: 'Duba fita lambar mai aiki',
        checkOutDateLabel: 'Duba kwanan wata',
        marketSurveyLabel: 'An kammala binciken kasuwa',
        cratesLabel: 'crates',
        combinedWeightLabel: 'Haɗin nauyi',
        paymentMethodLabel: 'Hanyar biyan kuɗi',
        cropTypeLabel: "Nau'in amfanin gona",
        checkInCodeLabel: 'Duba A code',
        crateIdsLabel: 'Crate ID',
      },
      pdfModal: {
        coolingUserLabel: 'Mai amfani da abin sanyayawa',
        dateLabel: 'kwanan wata',
        weightLabel: 'Nauyi (kg)',
        downloadButton: 'Sauke daftari',
        downloadName: '{{code}}-rasit',
        successMessage: 'An saukar da rasidu!',
        errorMessage: 'Wani abu ya faru. Da fatan za a sake gwadawa daga baya.',
        checkOut: {
          title: 'Kamfanin',
          checkOutLabel: 'Duba lambar fita',
          idLabel: 'ID',
          itemLabel: 'Abu',
          calculatedPriceLabel: 'Farashin ƙididdiga',
          discountLabel: 'Rangwame',
          totalPrice: 'Jimillar farashi',
        },
        checkIn: {
          title: 'Takardar-shaidar-duba shiga',
          operatorLabel: 'Mai aiki',
          codeLabel: 'Lambar Duba-shiga',
          companyLabel: 'Kamfanin',
          coolingUnitLabel: 'Sashin naúrar sanyayawa',
          priceLabel: 'Farashin {{currency}} / Rana',
          cropLabel: 'Shuka amfanin gona',
          numberOfCratesLabel: 'Yawan crates',
          totalLabel: 'Jimillar',
        },
      },
      editCheckIn: {
        contactLabel: 'Tuntuɓar',
        coolingUserLabel: 'Mai amfani da abin sanyayawa',
        disclaimer: 'Disclaimer: Lokacin karba shine kiyasin adadin kwanaki.',
        disclaimerMessage:
          "Disclaimer. Lura cewa lokacin ɗauka shine kiyasin adadin kwanaki. Wannan ƙimar ta dogara ne akan ƙirar ƙira don nau'in 'ya'yan itace ko kayan lambu da simintin lamba. Ainihin lalacewar ingancin samfurin duk da haka kuma ya dogara da yanayin gida, yanayin girma, ranar girbi da sauransu. Saboda haka, ƙetare daga lokacin da aka annabta don ɗaukar kwanaki na iya faruwa.",
        selectCropLabel: 'Zaɓi kaya.',
        successMessage: 'An sabunta shigarwa cikin nasara!',
        errorMessage: 'An kasa sabunta rajistan shiga. Da fatan za a sake gwadawa.',
      },
      survey: {
        fillMessage: 'Da fatan za a cika binciken tushe don {{crop}}!',
        baseSurvey: {
          occupationQuestion: 'Me yafi bayyana Ka/Ki?',
          occupationFarmer: 'Manomi',
          occupationTrader: 'Karamin dillali/dan kasuwa/mai bada sari',
          usageQuestion: 'Shin kun yi amfani da dakin sanyi a baya?',
          newUser: "A'a, ni sabon mai amfani ne",
          oldUser: 'Ee, na yi amfani da dakin sanyi',
          mostUsedCommoditiesQuestion: 'Mafi yawan kayan girbi/kayayyakin kasuwa?',
          commodity: 'Kaya',
          newCommodity: 'Kaya {{index}}',
          fillCommoditiesMessage:
            'Da fatan za a cika tambayoyin da ke ƙasa don kayayyakin da kuke tsarawa akai-akai.',
          addCommodityButton: 'Ƙara Kayayyaki',
          genericFormError: 'Da fatan za a zaɓi zaɓi',
          experienceError: 'Da fatan za a gabatar da ƙima',
        },
        marketSurvey: {
          title: 'Da fatan za a amsa tambayoyin nan don akwatunan {{crop}} da kuka bincika.',
          locationQuestion: 'ina kuka sayar da kayan amfanin ku?',
          locations: {
            farm: 'Bakin gona/kofar gona',
            market: 'Kasuwar gida/kasuwar kauye',
            both: 'Duka-kofar gona da kasuwa',
          },
          priceQuestion: 'Wane farashi kuka samu?',
          spoiledProducesQuestion:
            'Nawa ne na abin da aka ajiye a makon da ya gabata ya lalace ko aka sayar da shi ƙasa da matsakaicin farashin kasuwa?',
          spoilageReasonsQuestion: 'Menene babban dalilin lalacewa amfanin gona?',
          formError: 'Da fatan za a zaɓi zaɓi',
        },
      },
      stringTemplates: {
        movementType: {
          checkOut: 'Duba fita',
          checkIn: 'Rajistan shiga',
          checkedOut: 'An duba-fita',
          checkedIn: 'An shiga',
        },
      },
    },
    MyOrders: {
      sort: {
        mostRecent: 'Most recent', // TODO
        oldest: 'Oldest', // TODO
        date: 'Date', // TODO
      },
      title: 'Order Overview', // TODO
      orderId: 'Order ID', // TODO
      cropType: 'Crop Type', // TODO
      coolingUnit: 'Cooling Unit', // TODO
      orderTotal: 'Order Total', // TODO
      backToTopButton: 'Back to the top', // TODO
    },
    ShoppingCart: {
      ownership: 'Change cart ownership', // TODO
      changeOwnership:
        'Change the shopping cart ownership to {{name}}. This may affect the contents of your cart, including the possible removal of certain crates that might not be available after this change. Are you sure you want to proceed?', // TODO
      empty: 'Your cart is empty', // TODO
      daysLeft: 'days left', // TODO
      weight: 'KG available', // TODO
      perKg: '/ KG', // TODO
      totalToPay: 'Total to pay', // TODO
      pay: 'Pay', // TODO
      orderHeader: 'Order', // TODO
      subtotal: 'Subtotal', // TODO
      produce: 'Produce', // TODO
      discount: 'Discount', // TODO
      fees: 'Service fees', // TODO
      marketFees: 'Marketplace fee', // TODO
      paymentFee: 'Payment fee', // TODO
      viewContacts: 'View contact(s)', // TODO
      contactsForDelivery: 'Contact(s) for delivery information', // TODO
      gotItButton: 'Got it!', // TODO
      pickupMethods: 'Pickup method', // TODO
      pickUpToday: 'Pickup today', // TODO
      keepInStorageDailyRate: 'Keep in storage ({{price}} / day)', // TODO
      keepInStorageFixedRate: 'Keep in storage ({{price}})', // TODO
      delivery: 'Delivery', // TODO
      contactName: 'Contact name', // TODO
      phoneNumber: 'Phone number', // TODO
      thankYouMessage: 'Thank You for Ordering', // TODO
      orderOverview: 'Order overview', // TODO
      products: 'Products', // TODO
      consultOrders: 'Consult My Orders', // TODO
      total: 'Total', // TODO
      couponQuestion: 'Have a discount coupon?', // TODO
      redeem: 'Redeem code.', // TODO
      redeemCoupon: 'Redeem coupon', // TODO
      couponPlaceholder: 'E.g. 20OFF', // TODO
      discountsApplied: 'Discounts Applied', // TODO
      pickupModal: {
        today: 'Please pick up your order at {{company}}, located at {{location}} today.', // TODO
        storage:
          'Your crates are now being stored at {{company}}, located at {{location}}. Please pick up your order before {{ttpu}}.', // TODO
        delivery:
          "Please contact the available numbers to arrange delivery. You can see the list of delivery options under 'Order details'.", // TODO
      },
      errors: {
        invalid: 'Invalid value', // TODO
        minimumCartValue: 'Order must be at least ₦100.', // TODO
      },
    },
    Analytics: {
      emptyState: 'Babu bayanai don nunawa',
      company: 'Kamfanin',
      aggregated: 'Haɗaɗɗe',
      comparison: 'Kwatanta',
      downloadDataButton: 'Sauke bayanai',
      users: 'Masu amfani',
      impact: 'Tasiri',
      maleLabel: '👨🏽 Namiji: {{amount}}',
      femaleLabel: '👩🏽  Mace: {{amount}}',
      otherLabel: 'Sauran',
      usersTotal: 'Jimillar adadin keɓaɓɓen masu amfani da sanyaya = {{amount}}',
      operatorsTotal: 'Jimillar adadin masu aiki = {{amount}}',
      beneficiariesTotal: 'Jimillar adadin masu amfana kai tsaye = {{amount}}',
      totalCratesLabel: 'Jimillar akwatuna',
      totalQuantityLabel: 'Jimillar yawa (kg)',
      totalOperations: 'Jimillar ayyuka',
      checkedInLabel: 'An shiga = {{amount}}',
      checkedOutLabel: 'An duba-fita= {{amount}}',
      methodologyButton: 'Duba Hanyar',
      farmersAnalytics: {
        coolingUserName: 'Sunan mai amfani da  naúrar sanyayawa',
        coolingUserType: "nau'in mai amfani da  naúrar sanyayawa",
        avgStorageTime: 'Matsakaicin Lokacin Ajiya',
        coldStorageCost: "kudin ma'ajiyar sanyi",
        days: 'kwanaki',
        baselineSurveyButton: 'Cika Binciken Baseline',
        baseLineSurveyMessage: 'Kuna da binciken binciken {{amount}} don kammala 😟',
        postCheckOutSurveyButton: 'Cika Binciken Bincike na Buga',
        postCheckOutSurveyMessage: 'Kuna da binciken binciken {{amount}} don kammala 😟',
        noChangeFoodLoss: 'Babu canji a asarar abinci',
        increaseInFoodLoss: 'Ƙara yawan asarar abinci',
        decreaseInFoodLoss: 'Rage asarar abinci',
        increaseInRevenue: 'Ƙara yawan kudaden shiga',
        decreaseInRevenue: 'Rage yawan kudaden shiga',
        foodLossEvolution: '🥗 Juyin Juyin Halittar Abinci akan amfanin gona (saman 5)',
        changePercentage: '% Canji',
        crops: 'Amfanin gona',
        foodLossLevels: 'Matakan asarar abinci',
        revenueEvolution: '💰 Matsakaicin juyin halittar kudaden shiga',
        revenueCropEvolution:
          '💰 Matsakaicin haɓakar haɓakar kudaden shiga ga amfanin gona ( saman 5)',
        noChangeRevenue: 'Babu canji a cikin kudaden shiga',
        revenueLevels: 'Matakan shiga',
        baselineSurveyLabel: 'adadin bincike na asali da aka kammala',
        postCheckoutSurveyLabel: 'adadin yawan binciken da aka biya da aka kammala',
        allPostCheckoutSurveysCompleted: 'An kammala duk binciken da aka yi bayan dubawa 🤝',
        allBaselineSurveysCompleted: 'duk tabbacin da aka kammala',
      },
      companyTab: {
        usersTab: {
          employeesTotal: "Jimillar adadin ma'aikatan da suka yi rajista = {{amount}}",
          usersType: "Nau'in masu amfani da sanyaya",
          farmersLabel: '🧑🏽‍🌾  Manoma: {{amount}}',
          tradersLabel: '👩🏽‍💼 Yan kasuwa: {{amount}}',
        },
        utilizationTab: {
          occupancyLabel: 'Matsakaicin zama na sassan sanyayawa',
          occupancyContent: '🏘️ {{amount}}%',
        },
        impactTab: {
          foodLossLabel: 'Juyin asarar abinci',
          revenueLabel: 'Sanyaya juyin halittar kudaden shiga mai amfani',
          co2Label: '💨 CO2e emission evolution',
          surveysAmountLabel:
            "A'a. na binciken da aka yi amfani da shi don ƙididdige asarar abinci da haɓakar kudaden shiga",
          co2Increase: 'CO2e watsi da kilogiram na samfur ya karu tare da sanyaya',
          co2Decrease: 'CO2e watsi da kilogiram na samfur ya ragu tare da sanyaya',
          co2WithoutCooling:
            'Kg na CO2e a kowace kilogiram na kayan da aka fitar ba tare da sanyaya ba',
          co2WithCooling: 'Kg na CO2e a kowace kilogiram na kayan da aka fitar tare da sanyaya',
          from: 'Daga',
          to: 'Zuwa',
        },
        downloadFileName: 'nazari-bayanai',
        utilization: 'Amfani',
        goBackButton: 'Komawa ga babba',
        companyNameLabel: 'Sunan Kamfanin',
        revenueLabel: 'Jimillar kudaden shiga',
        coolingUnitsLabel: "Nº na Raka'a mai sanyaya",
        singleCoolingUnitContent: "1 raka'a",
        coolingUnitsContent: "{{amount}} raka'a",
        capacityLabel: 'Jimillar iyawar sanyaya',
        capacityContent: '{{amount}} metric tonnes',
        coolingUnitTypeLabel: "Nau'in naúrar sanyaya",
        coolingUnitTypeMarket: '{{amount}} dakunan kasuwa',
        coolingUnitTypeFarmGate: '{{amount}} dakunan gona-kofa',
        coolingUnitTypeMovable: '{{amount}} dakuna masu motsi',
      },
      tabsShared: {
        configurationMessage:
          'Da fatan za a saita kwanakin wata da sashin sanyayawa don samun dama',
        configureButton: 'Sanya',
        crates: 'crates',
        dateRangeLabel: 'Iyakar kwanan wata',
        selectedUnitsLabel: 'Zaɓaɓɓen sashin sanyayawa',
        totalCo2Label: '💨 Jimlar CO2e da aka fitar:',
        roomRevenue: 'Kudin shigar da daki ya samar',
      },
      comparisonTab: {
        sortingLabel: 'Tsara',
        coolingUnit: 'Sashin naúrar sanyayawa',
        genderHeader: 'Namiji | Mace | Sauran',
        genderSecondaryHeader: 'Namiji | Mace',
        total: 'Jimillar',
        sortingMenuOptions: {
          descending: 'Saukowa',
          ascending: 'Hawan hawa',
          coolingUnitName: 'Sunan Rukunin Sanyi',
        },
        usersTab: {
          operators: 'Masu aiki',
          users: 'Masu amfani da sanyaya aiki',
          activeUsers: 'Masu amfani masu aiki',
          beneficiaries: 'Masu amfana kai tsaye',
        },
        cratesTab: {
          crates: 'crates',
          kg: 'kg',
          operations: 'Ayyuka',
          checkedIn: 'An shiga',
          checkedOut: 'An duba-fita',
          checkedInCropDistribution: 'Duba shigar-rarraba amfanin gona (crates)',
          checkedInKgDistribution: 'Duba shigar-rarraba amfanin gona (kg)',
          checkInCropDistribution: 'Duba-in raba amfanin gona',
          checkedOutCropDistribution: 'Duba fitar rarraba amfanin gona (crates)',
          checkedOutKgDistribution: 'Duba fitar-rarraba amfanin gona (kg)',
          checkOutCropDistribution: 'Duba rarraba amfanin gona',
          co2: '💨 CO2e da aka fitar don sanyaya',
          co2EmissionsLabel: 'CO2e watsi (kg)',
          co2DistributionLabel: 'CO2e rarraba amfanin gona',
          co2Kg: 'Kg CO2 emitted', // TODO
        },
        impactTab: {
          occupancyLabel: 'Matsakaicin zama na sassan sanyayawa',
          occupancy: 'Zama',
          foodLossLabel: 'Juyin asarar abinci',
          revenueLabel: 'Sanyaya juyin halittar kudaden shiga mai amfani',
          changePercentage: '% Canji',
          completePercentage: '% Cikakku',
          foodLossLevels: 'Matakan asarar abinci',
          revenueLevels: 'Matakan shiga',
          revenuePerRoomLabel: '📈 Harajin daki',
          co2Label: '💨 CO2e emission evolution',
          surveysAmountLabel:
            "A'a. na binciken da aka yi amfani da shi don ƙididdige asarar abinci da haɓakar kudaden shiga",
          co2EmissionsLabel: 'CO2e (kg)',
        },
      },
    },
    Notifications: {
      text: { notifications: 'Sanarwa' },
      sensorError:
        "Na'urar firikwensin dakin sanyi {{unitName}} bai aika da komai ba a cikin awanni 12 da suka gabata. Da fatan za a shigar da bayanai da hannu har sai an gyara shi.",
      survey: 'Da fatan za a cika binciken kasuwa don {{farmer}}, don motsi, {{movementCode}}.',
      link: 'Da fatan za a je nan don kammala shi',
      coolingUserSurvey:
        'Kun duba shiga {{crop}} amma ba ku kammala binciken wannan amfanin gona ba.',
      operatorSurvey:
        'Kun duba shiga {{ crop}} don {{farmer}} amma ba ku kammala binciken wannan amfanin gona ba.',
      pickup:
        'Yakamata a dauko akwatunanku na {{crop}} da wuri-wuri! (duba kwanan wata: {{checkIn}}, ID na naúrar sanyaya: {{unitId}}, duba ID: {{movementCode}}).',
      notifyCoolingUser:
        'Da fatan za a sanar da mai amfani {{farmer}} cewa ya kamata a ɗauko akwatunansa na {{crop}} da wuri-wuri! (duba kwanan wata: {{checkIn}}, ID na naúrar sanyaya: {{unitId}}, duba ID: {{movementCode}}).',
      checkIn: 'Mai aiki {{farmer}} ya gyara rajistan shiga {{movementCode}} akan {{date}}.',
      surveyAlreadyFilled: 'An riga an cika bincike',
    },
  },
  tutorial: {
    welcome: 'Barka da zuwa Coldtivate. Wannan tafiya ce ta ayyukan.',
    farmerWelcome:
      'Barka da zuwa Coldtivate! Wannan koyaswar zata taimaka muku fahimtar yadda ake amfani da app.',
    quit: 'Bar koyarwa',
    congratulations: 'Taya murna! Kun gama koyawa! Koma kan dashboard don fara amfani da app.',
    prev: 'Prev',
    next: 'Na gaba',
    start: 'Start Tutorial', // TODO
    final:
      'Congratulations! You have completed the tutorial! Go back to the dashboard to start using the app.', // TODO
    backToDashboard: 'Laghachi na Dashboard', // TODO
    steps: {
      openDrawer:
        'On the top left, you find a menu with the main functionalities. Go ahead and click it.', // TODO
      repeatTutorial: 'Idan kuna son sake kallon wannan koyawa, kuna iya samunsa a cikin menu.',
      managementNavigation:
        'A cikin menu, zaku iya kewayawa zuwa shafin "Management" kuma a can za ku ƙara sabbin Wurare, Rukunin sanyaya, Ma\'aikata masu rijista da Ma\'aikata.',
      addCoolingUser:
        'Ana iya ƙara masu amfani da sanyaya waɗanda ba su yi rajista ba akan Coldtivate ta saka bayanansu (suna, lambar waya). Ana iya ƙara masu amfani da sanyaya waɗanda suka riga sun yi rajista a cikin ƙa\'idar ta lamba. Za su iya nemo lambar su akan bayanan martabarsu -> "Bayanan asusu" -> "Lambar shigo da mai amfani mai sanyaya".',
      navigateToCoolingUser: 'Go ahead and click the Cooling Users tab', // TODO
      listCoolingUsers:
        'Ana gano masu amfani da sanyaya tare da wayar hannu ta alamar waya a gefen dama na allo. Sauran suna sanyaya masu amfani da wayar asali. A cikin lokuta biyu, zaku iya danna sunan don samun damar bayanan su da binciken mai sanyaya mai amfani.',
      navigateToAddCoolingUser: "Clicking the '+' sign allows you to add a new Cooling User.", // TODO
      coolingUnitStep: "Kuna iya kewaya rak'o'in sanyaya ta danna menu na zazzage a saman.",
      initiateCheckIn1:
        'Once you add a cooling user, you can make a check-in for that cooling user. Go ahead and click the activity button.', // TODO
      initiateCheckIn2: 'Now click on the check-in button (the one in green).', // TODO
      checkIn1:
        'To complete the check-in, you need to click on "Add Crates" and follow the instructions step by step. Click \'Continue\' to see what the result would look like.', // TODO
      checkIn2:
        'Bayan kammala duk matakan, za ku ga bayyani na akwatunan da kuke shirin bincika cikin ɗakin.',
      checkIn3:
        'Idan kun gamsu, za ku iya danna "Tabbatar" kuma za a ƙara sabon akwatuna a cikin Dashboard.',
      history:
        'Clicking on "History", you can see all the movements in the room. The check-outs for which the after-storage survey has not been completed are marked by a red dot.', // TODO
      coolingUnits:
        'Danna "Raka\'a sanyaya" don ganin ƙarfin naúrar sanyaya a cikin kwanaki 7 masu zuwa (Tsarin shirin) da zafin jiki na ɗakin (Shafin yanayin ɗaki).',
      roomConditions:
        'Kuna iya sabunta zafin dakin sanyaya da hannu a cikin "Yanayin ɗaki" idan ba ku da firikwensin haɗe da ƙa\'idar.',
      checkOut1:
        'Don fara rajistan shiga, danna maɓallin Aiki sannan a kan maɓallin ja. Sannan bi umarnin don kammala rajistan.',
      checkOut2: 'Kuna iya zaɓar sashin sanyaya da amfanin gona da kuke son dubawa.',
      checkOut3: 'Da zarar an biya kayan, danna maɓallin daban kuma kammala rajistan.',
      navigateToLocations:
        'The first thing you will need to do is add a location. Go ahead and click the locations tab.', // TODO
      locations:
        'You can add a location by selecting a name and adding its latitude and longitude, by sharing your GPS coordinates (if you are at the cold room location), or by typing the address.', // TODO
      navigateToCoolingUnits:
        'After a location has been added, you can add a cooling unit. Go ahead and click the cooling units tab.', // TODO
      addCoolingUnits:
        'A cooling unit can be added by completing the details above. If you have temperature sensors in the cooling unit and an API in place, you can input the credentials and automatically connect your sensors to the app.', // TODO
      addEmployeesOperators:
        'You can add Registered Employees and Operators through the Management screen. In order to add either role, you will need their phone number. They will receive an SMS with an invitation link. A phone number can be used for only one user.', // TODO
      employeeCoolingUnitsStep:
        'Once you have selected a cooling unit you will see an overview of: the crates currently in storage in the "Dashboard" tab, statistics about utilisation and impact in the "Analytics" tab, and the list of crates for sale in the "Marketplace" tab. Clicking on "More", you can also navigate to the "Crop Prices", "History", "Cooling Units", and "Orders" tab.', // TODO
      localizationPreferences:
        'You can change the language of the app by selecting "Localization Preferences". Make sure to click the "Save changes" button for the language to be changed!', // TODO
      accountDetailsNavigation:
        'In the menu, you can navigate to "Account Details" and tap there to view/edit a set of configurations related to your account. Go ahead and try it.', // TODO
      coolingUserSurvey:
        'Da farko da ka bude app, ana tambayarka don kammala ɗan gajeren bincike. Yana da matukar mahimmanci ku cika binciken don ƙa\'idar don samar muku da shawarwari na musamman. Idan ba za ku iya cika binciken a karon farko da kuka shiga ba, za ku iya samun damar binciken a cikin "Bayanan Asusu" -> "Binciken Mai Amfani". Na gode don ɗaukar lokaci don kammala binciken!',
      coolingUserCode:
        'The first time you arrive at a cold room to store your produce, the operator will ask you to provide her / him with your personal code, to add you to the list of cold room users. You can find this code in "Personal details" -> "Cooling User Import Code".', // TODO
      knowledgeHub:
        'A cikin menu, zaku iya samun "Cibiyar Ilimi", wanda ya ƙunshi shawarwari kan tsawon lokacin adana amfanin gona daban-daban, da mafi kyawun zafin jiki. Duba shi don fahimtar yadda ɗakin sanyi zai iya taimaka muku don adana ingancin \'ya\'yan itatuwa da kayan marmari daban-daban!',
      faq: "A cikin menu, zaku iya samun Tambayoyin Tambayoyi akai-akai (FAQ). Muna ba da shawarar ku duba su don ƙarin koyo game da ƙa'idar da fa'idar adana kayan amfanin ku a cikin dakuna masu sanyi.",
      dashboardStep1:
        'Da zarar mai aiki ya kammala rajistar ku, za ku iya ganin samfuran da ke cikin ajiya a cikin ɗakin a cikin sashin "Dashboard". Kowane kati ya ƙunshi saitin akwatuna na nau\'in amfanin gona iri ɗaya waɗanda aka bincika tare.',
      dashboardStep2:
        "Kowane katin da ke cikin dashboard ya ƙunshi bayanai game da: nau'in amfanin gona, adadin akwatunan da aka adana, kwanakin nawa aka ajiye su, farashin yau da kullun (na duk akwatuna tare), da ID ɗin rajista.",
      dashboardStep3:
        'Adadin kwanaki masu launi yana nuna "Lokacin da za a ɗauka" (TTPU), wanda ke nufin tsawon kwanaki nawa kayan aikin ku zai yi kyau, idan ya kasance a cikin firiji. Launi ja yana nufin cewa samfurin yana rasa ingancinsa kuma yakamata a ɗauke shi da wuri-wuri.',
      dashboardStep4:
        'Idan launi na katin rawaya ne (2-5 days bar) ko kore (fiye da kwanaki 5), ba kwa buƙatar damuwa game da akwatunan. Ana sake ƙididdige adadin kwanakin sau da yawa a kowace rana, don haka tabbatar da duba "Dashboard" akai-akai don ganin yadda ingancin akwatunan ku a cikin ɗakin ke haɓaka.',
      dashboardStep5:
        'Idan kuna da akwatunan da aka adana a ɗakuna da yawa, zaku iya canza ɗakin da kuke kallo ta zaɓi kamfani da sashin sanyaya daga jerin zaɓuka.',
      dashboardStep6:
        'When your crates are approaching the Time to pick up and the card turns red, you will receive a notification that advises you to go to the room, pick up those crates, and sell them. You can check your notifications by clicking the bell on the right.', // TODO
      farmerHistory:
        'In the tab "History" you can see a summary of all check-ins and check-outs that you have completed in each room. If you see a red dot next to a check out, please click on the three dots and "Fill in market survey". Here, we would like to understand at what price you have sold your produce, and if anything got spoiled. We use this information to improve the operations at the cold room, so it is important that you answer accurately.', // TODO
      farmersCoolingUnits:
        'To check for cooling units near you, you can navigate to the buttons on the bottom of the screens, clicking on the tab "More", "Cooling units" and selecting "Map". By clicking on each pin on the map, you can see the type of unit and the price of storage.', // TODO
      farmersUnitsPlanner:
        'A cikin shafin "Cooling Units" zaka iya samun Taswirar, zama na yanzu da na gaba na dakin (a cikin "Mai Tsara") da kuma yawan zafin jiki na ɗakin (a cikin "Yanayin ɗakin"). Wadannan allon suna taimaka muku saka idanu daga nesa abin da ke faruwa a dakunan sanyi, ba tare da zuwa wurin da mutum don dubawa ba!',
      marketPrice:
        'If you see a tab named "Crop Prices", you can check the prices of different fruits and vegetables across the country in the last days, and a forecast of the prices for the future. For now, this option is only available for selected countries.', // TODO
      farmerFinalStep:
        'Congratulations! You have completed the tutorial! If you have questions about the app, we recommend checking the FAQ, asking an operator of the cold room, or writing us at app@yourvcca.org.', // TODO
      more: 'Clicking on "More", you will be able to select the "History", "Crop Prices", "Cooling Units", and "Orders" screens.', // TODO
    },
  },
} satisfies Translations;
